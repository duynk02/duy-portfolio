import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { existsSync, statSync } from 'node:fs'
import { resolve, sep } from 'node:path'
import { siteConfig } from './src/content/portfolio.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredUrl = env.VITE_SITE_URL || siteConfig.siteUrl
  let siteUrl: string | null = null
  if (configuredUrl) {
    const url = new URL(configuredUrl)
    if (!['https:', 'http:'].includes(url.protocol)) throw new Error('VITE_SITE_URL must use HTTP or HTTPS')
    siteUrl = url.href.replace(/\/?$/, '/')
  }
  const publicDirectory = resolve('public')
  const resumeFile = siteConfig.resumePath ? resolve(publicDirectory, siteConfig.resumePath.replace(/^\/+/, '')) : ''
  const validResume = !!resumeFile && resumeFile.startsWith(publicDirectory + sep) && resumeFile.endsWith('.pdf') && existsSync(resumeFile) && statSync(resumeFile).isFile()
  const metadata: Plugin = {
    name: 'configured-static-metadata',
    transformIndexHtml(html) {
      const escaped = siteUrl?.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
      return html.replace('<!-- configured-site-metadata -->', escaped ? `<link rel="canonical" href="${escaped}" /><meta property="og:url" content="${escaped}" />` : '')
        .replace(/(<meta property="og:image" content=")[^"]+/, siteUrl ? `$1${new URL('og-image.svg', siteUrl).href}` : '$&')
    },
    generateBundle() {
      if (!siteUrl) return
      const escaped = siteUrl.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escaped}</loc></url></urlset>` })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n` })
    },
  }
  return { base: env.VITE_BASE_PATH || '/', plugins: [react(), tailwindcss(), metadata], define: { __HAS_RESUME__: JSON.stringify(validResume) } }
})
