/* global document, window, DOMMatrixReadOnly, getComputedStyle */
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const basePath = process.env.TEST_BASE_PATH || '/'
const origin = new URL(basePath, 'http://127.0.0.1:4173').href
const executablePath = process.env.CHROME_PATH
  || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const pause = (duration) => new Promise((resolve) => setTimeout(resolve, duration))
const failures = []
const checks = []
let serverOutput = ''
let browser
let server

function recordPageErrors(page) {
  page.on('pageerror', (error) => failures.push(`Page error: ${error.message}`))
  page.on('console', (message) => {
    if (message.type() === 'error') failures.push(`Console error: ${message.text()}`)
  })
  page.on('requestfailed', (request) => {
    // Reloads and deliberate navigation can cancel an in-flight request normally.
    const error = request.failure()?.errorText ?? 'unknown failure'
    if (!error.includes('ERR_ABORTED')) failures.push(`Request failed: ${request.url()} (${error})`)
  })
  page.on('response', (response) => {
    if (response.status() >= 400) failures.push(`HTTP ${response.status()}: ${response.url()}`)
  })
}

async function waitForServer() {
  const deadline = Date.now() + 20_000
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Preview exited early:\n${serverOutput}`)
    try {
      const response = await fetch(origin)
      if (response.ok) return
    } catch { /* Preview is starting. */ }
    await pause(200)
  }
  throw new Error(`Preview did not become ready:\n${serverOutput}`)
}

async function assertNoOverflow(page, width) {
  await page.setViewportSize({ width, height: 900 })
  await page.evaluate(() => document.fonts.ready)
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }))
  assert.ok(dimensions.document <= dimensions.viewport + 1, `Document overflows at ${width}px: ${JSON.stringify(dimensions)}`)
  assert.ok(dimensions.body <= dimensions.viewport + 1, `Body overflows at ${width}px: ${JSON.stringify(dimensions)}`)
  checks.push(`Responsive width ${width}px`)
}

async function expectAttribute(locator, attribute, expected) {
  await locator.waitFor()
  const deadline = Date.now() + 3000
  while (Date.now() < deadline) {
    if (await locator.getAttribute(attribute) === expected) return
    await pause(40)
  }
  assert.equal(await locator.getAttribute(attribute), expected, `${attribute} should become ${expected}`)
}

async function readProgress(page) {
  return page.getByTestId('timeline-progress').evaluate((element) => {
    const transform = getComputedStyle(element).transform
    return transform === 'none' ? 1 : new DOMMatrixReadOnly(transform).m22
  })
}

async function scrollTimeline(page, fraction) {
  await page.getByTestId('timeline-progress').evaluate((element, value) => {
    const track = element.parentElement.getBoundingClientRect()
    const top = track.top + window.scrollY + value * track.height - window.innerHeight * 0.72
    window.scrollTo({ top: Math.max(0, top), behavior: 'instant' })
  }, fraction)
  await page.waitForFunction((expected) => {
    const element = document.querySelector('[data-testid="timeline-progress"]')
    if (!element) return false
    const transform = getComputedStyle(element).transform
    const scale = transform === 'none' ? 1 : new DOMMatrixReadOnly(transform).m22
    const target = Math.max(0, Math.min(1, expected))
    // The last node activates at 0.9999; wait for the spring to settle at an end.
    const tolerance = target === 0 || target === 1 ? 0.00005 : 0.015
    return Math.abs(scale - target) < tolerance
  }, fraction, { timeout: 5000 })
  await pause(120)
  return {
    progress: await readProgress(page),
    active: await page.locator('[data-testid="timeline-node"][data-active="true"]').count(),
  }
}

try {
  assert.ok(existsSync(path.join(root, 'dist', 'index.html')), 'Build the website with npm run build before browser checks.')
  assert.ok(existsSync(executablePath), 'Chrome executable was not found. Set CHROME_PATH to a local Chromium/Chrome executable.')
  await mkdir(path.join(root, '.qa'), { recursive: true })
  server = spawn(process.execPath, [
    path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'),
    'preview', '--host', '127.0.0.1', '--port', '4173', '--strictPort', '--base', basePath,
  ], { cwd: root, stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true })
  server.stdout.on('data', (chunk) => { serverOutput += chunk.toString() })
  server.stderr.on('data', (chunk) => { serverOutput += chunk.toString() })
  await waitForServer()
  browser = await chromium.launch({ executablePath, headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  recordPageErrors(page)
  await page.goto(origin, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)

  assert.equal(await page.locator('html').getAttribute('lang'), 'vi')
  assert.match(await page.title(), /Nguyễn Khắc Duy/)
  assert.equal((await page.locator('h1').count()), 1, 'A single primary heading is required.')
  assert.match(await page.locator('#home').innerText(), /Xin chào, mình là Duy/)
  for (const [id, heading] of Object.entries({
    about: 'về mình.', experience: 'hành trình.', projects: 'dự án.', contact: 'kết nối.',
  })) {
    assert.ok((await page.locator(`#${id} h2`).innerText()).includes(heading), `Vietnamese heading: ${id}`)
  }
  assert.equal(await page.getByTestId('timeline-node').count(), 4)
  const resumeLink = page.locator('a[download]')
  assert.equal(await resumeLink.count(), 1, 'The current CV should be available to download.')
  assert.equal(await resumeLink.innerText(), 'Tải CV')
  const resumeHref = await resumeLink.getAttribute('href')
  const resumePath = 'cv/CV_BackendDeveloper_NguyenKhacDuy.pdf'
  assert.equal(resumeHref, `${basePath}${resumePath}`)
  const resumeResponse = await page.request.get(new URL(resumeHref, origin).href)
  assert.ok(resumeResponse.ok(), 'The resume URL should return a successful response.')
  const resumeBytes = await resumeResponse.body()
  assert.equal(resumeBytes.subarray(0, 5).toString(), '%PDF-', 'The download must serve a PDF, not an HTML fallback.')
  assert.deepEqual(resumeBytes, readFileSync(path.join(root, 'public', resumePath)), 'The served CV should match the current configured PDF.')
  const hrefProblems = await page.locator('a').evaluateAll((anchors) => anchors.flatMap((anchor) => {
    const href = anchor.getAttribute('href')
    if (!href || href.trim() === '#' || href.startsWith('javascript:')) return [`Invalid href: ${href}`]
    if (href.startsWith('#') && !document.getElementById(decodeURIComponent(href.slice(1)))) return [`Missing anchor target: ${href}`]
    return []
  }))
  assert.deepEqual(hrefProblems, [])
  assert.ok(await page.locator('a[href="mailto:nkduy02contact@gmail.com"]').count() >= 1)
  checks.push('Vietnamese default, semantic structure, real links and current CV download')

  // First keyboard interaction must make the skip link available and focus main content.
  await page.keyboard.press('Tab')
  const skipHref = await page.evaluate(() => document.activeElement?.getAttribute('href'))
  assert.ok(skipHref?.startsWith('#'), 'First Tab should focus the skip link.')
  await page.keyboard.press('Enter')
  assert.ok(await page.evaluate(() => {
    const main = document.querySelector('main')
    return main === document.activeElement || main?.contains(document.activeElement)
  }), 'Activating the skip link should focus main content.')
  checks.push('Keyboard skip link focuses the main content')

  await page.locator('header').getByRole('button', { name: 'English', exact: true }).click()
  await expectAttribute(page.locator('html'), 'lang', 'en')
  assert.equal(await page.title(), 'Nguyen Khac Duy — Backend Engineer')
  assert.match(await page.locator('meta[name="description"]').getAttribute('content'), /The portfolio of Nguyen Khac Duy/)
  assert.match(await page.locator('#home').innerText(), /Hi, I'm Duy/)
  assert.match(await page.locator('#about').innerText(), /I'm a Backend Engineer/)
  assert.match(await page.locator('#experience').innerText(), /Personal project/i)
  assert.match(await page.locator('#experience').innerText(), /08\/2025 — 08\/2026/)
  assert.doesNotMatch(await page.locator('#experience').innerText(), /End date to confirm/)
  assert.equal(await resumeLink.innerText(), 'Download CV')
  assert.match(await page.locator('#contact').innerText(), /Looking for a Backend Engineer/)
  assert.equal(await page.evaluate(() => localStorage.getItem('duy-portfolio-language')), 'en')
  await page.reload({ waitUntil: 'networkidle' })
  await expectAttribute(page.locator('html'), 'lang', 'en')
  assert.match(await page.locator('#home').innerText(), /Hi, I'm Duy/)
  checks.push('English content and metadata update; choice persists through reload')

  for (const width of [375, 430, 768, 1024, 1440]) await assertNoOverflow(page, width)
  await page.setViewportSize({ width: 375, height: 812 })
  const menuButton = page.locator('button[aria-controls="mobile-navigation"]')
  await menuButton.click()
  await expectAttribute(menuButton, 'aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expectAttribute(menuButton, 'aria-expanded', 'false')
  await menuButton.click()
  await page.locator('#mobile-navigation a[href="#projects"]').click()
  await expectAttribute(menuButton, 'aria-expanded', 'false')
  assert.equal(new URL(page.url()).hash, '#projects')
  checks.push('Mobile navigation opens, closes with Escape and closes after navigation')

  await page.setViewportSize({ width: 1440, height: 1000 })
  const projectButtons = page.locator('#projects button[aria-expanded]')
  const projectCount = await page.locator('#projects article').count()
  assert.ok(projectCount > 0, 'The portfolio should contain projects.')
  assert.equal(await projectButtons.count(), projectCount, 'Each project needs engineering details.')
  for (let index = 0; index < projectCount; index += 1) {
    const button = projectButtons.nth(index)
    await button.click()
    await expectAttribute(button, 'aria-expanded', 'true')
    const controlledId = await button.getAttribute('aria-controls')
    assert.ok(controlledId, 'Project detail buttons should identify the controlled content.')
    assert.ok((await page.locator(`[id="${controlledId}"]`).innerText()).trim().length > 40, 'Project details must contain substantive content.')
    await button.click()
    await expectAttribute(button, 'aria-expanded', 'false')
  }
  checks.push(`All ${projectCount} project engineering details expand and collapse`)

  const start = await scrollTimeline(page, 0.02)
  const middle = await scrollTimeline(page, 0.55)
  const end = await scrollTimeline(page, 1.05)
  const reverse = await scrollTimeline(page, 0.02)
  assert.ok(middle.progress > start.progress + 0.35)
  assert.ok(end.progress > middle.progress + 0.3)
  assert.equal(end.active, 4, 'The complete timeline activates every node.')
  assert.ok(middle.active > start.active, 'Milestones activate as the line reaches them.')
  assert.ok(reverse.active < end.active, 'Milestones deactivate when scrolling back.')
  assert.ok(Math.abs(reverse.progress - start.progress) < 0.04, 'Reverse scroll restores the corresponding progress.')
  checks.push(`Bidirectional timeline: ${[start, middle, end, reverse].map((sample) => `${sample.progress.toFixed(2)}/${sample.active} nodes`).join(' → ')}`)

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await pause(700)
  await page.screenshot({ path: path.join(root, '.qa', 'desktop.png') })
  await page.locator('header').getByRole('button', { name: 'Tiếng Việt', exact: true }).click()
  await expectAttribute(page.locator('html'), 'lang', 'vi')
  await page.setViewportSize({ width: 375, height: 812 })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await pause(500)
  await page.screenshot({ path: path.join(root, '.qa', 'mobile.png') })
  checks.push('Switching back to Vietnamese works without reloading')

  const reducedContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce',
  })
  const reducedPage = await reducedContext.newPage()
  recordPageErrors(reducedPage)
  await reducedPage.goto(origin, { waitUntil: 'networkidle' })
  assert.equal(await readProgress(reducedPage), 1, 'Reduced motion uses the full static timeline.')
  assert.equal(await reducedPage.locator('[data-testid="timeline-node"][data-active="true"]').count(), 4)
  const timelineOpacity = await reducedPage.locator('.career-content').evaluateAll((elements) => elements.map((element) => Number(getComputedStyle(element).opacity)))
  assert.ok(timelineOpacity.every((opacity) => opacity === 1), 'Every milestone is readable with reduced motion.')
  for (const section of await reducedPage.locator('main > section').all()) await section.scrollIntoViewIfNeeded()
  const brokenImages = await reducedPage.locator('img').evaluateAll((images) => images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src))
  assert.deepEqual(brokenImages, [])
  await reducedPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await reducedPage.screenshot({ path: path.join(root, '.qa', 'full-page.png'), fullPage: true })
  checks.push('Reduced motion shows all career content; images load; full-page screenshot saved')

  assert.deepEqual(failures, [], `Browser errors:\n${failures.join('\n')}`)
  checks.push('No browser console errors, page errors, HTTP errors or failed asset requests')
  console.log(JSON.stringify({ passed: checks, screenshots: ['.qa/desktop.png', '.qa/mobile.png', '.qa/full-page.png'] }, null, 2))
} catch (error) {
  console.error(error)
  if (failures.length) console.error(failures.join('\n'))
  process.exitCode = 1
} finally {
  await browser?.close()
  if (server && server.exitCode === null) {
    server.kill()
    await Promise.race([
      new Promise((resolve) => server.once('exit', resolve)),
      pause(2000).then(() => { if (server.exitCode === null) server.kill('SIGKILL') }),
    ])
  }
}
