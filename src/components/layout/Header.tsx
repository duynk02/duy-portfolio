import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Github, Menu, X } from 'lucide-react'
import { siteConfig } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const menuButton = useRef<HTMLButtonElement>(null)
  const links = [ ['home', t.home], ['about', t.about], ['experience', t.experience], ['projects', t.projects], ['contact', t.contact] ]
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
    }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 })
    document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useEffect(() => {
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus() }
    }
    function onResize() { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('keydown', onEscape)
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('keydown', onEscape); window.removeEventListener('resize', onResize) }
  }, [open])
  return <>
    <a href="#main" className="skip-link">{t.skip}</a>
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="wordmark" onClick={() => setOpen(false)}>khacduy<span>.</span></a>
        <nav className="desktop-navigation" aria-label={t.navigation}>
          {links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="icon-link github-header" href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label={`${t.githubProfile} (${t.external})`}><Github size={19} strokeWidth={1.7} /></a>
          <div className="language-switch" role="group" aria-label={t.language}>
            <button type="button" lang="vi" aria-label="Tiếng Việt" aria-pressed={language === 'vi'} onClick={() => setLanguage('vi')}>VI</button><span aria-hidden="true">/</span><button type="button" lang="en" aria-label="English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button ref={menuButton} type="button" className="menu-button icon-link" aria-label={open ? t.closeMenu : t.openMenu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X size={23} /> : <Menu size={23} />}</button>
        </div>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation container" aria-label={t.navigation} hidden={!open}>
        {links.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={17} /></a>)}
      </nav>
    </header>
  </>
}
