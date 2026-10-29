import { useEffect, useState, type ReactNode } from 'react'
import type { Language } from '../content/portfolio'
import { LanguageContext } from './language-context'
import { translations } from './translations'

// Re-export preserves the small public API for section components.
// eslint-disable-next-line react-refresh/only-export-components
export { useLanguage } from './language-context'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, updateLanguage] = useState<Language>(() => {
    try { return localStorage.getItem('duy-portfolio-language') === 'en' ? 'en' : 'vi' } catch { return 'vi' }
  })
  const t = translations[language]
  useEffect(() => {
    document.documentElement.lang = language
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDescription)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.metaDescription)
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language === 'vi' ? 'vi_VN' : 'en_US')
    document.querySelector('meta[property="og:locale:alternate"]')?.setAttribute('content', language === 'vi' ? 'en_US' : 'vi_VN')
  }, [language, t])
  function setLanguage(next: Language) {
    const position = window.scrollY
    updateLanguage(next)
    try { localStorage.setItem('duy-portfolio-language', next) } catch { /* Works when storage is disabled. */ }
    requestAnimationFrame(() => window.scrollTo({ top: position, behavior: 'instant' }))
  }
  return <LanguageContext.Provider value={{ language, setLanguage, text: (value) => value[language], t }}>{children}</LanguageContext.Provider>
}
