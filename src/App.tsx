import { ArrowUp } from 'lucide-react'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Education } from './components/sections/Education'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { CareerTimeline } from './components/timeline/CareerTimeline'
import { SectionHeading } from './components/ui/SectionHeading'
import { useLanguage } from './i18n/LanguageProvider'

export default function App() {
  const { t } = useLanguage()
  return <><Header /><main id="main" tabIndex={-1}><Hero /><About /><section id="experience" className="section container" aria-label={t.experience}><SectionHeading number="02" eyebrow={t.experienceEyebrow} title={t.experienceHeading} description={t.experienceIntro} /><CareerTimeline /></section><Skills /><Projects /><Education /><Contact /></main><footer className="container site-footer"><a href="#home" className="wordmark">khacduy<span>.</span></a><p>© 2026 Nguyen Khac Duy<span className="footer-divider">/</span>{t.footer}</p><a className="back-to-top" href="#home" aria-label={t.backToTop}><ArrowUp size={19} /></a></footer></>
}
