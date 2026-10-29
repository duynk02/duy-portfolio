import { ArrowUpRight, Braces, Database, Workflow } from 'lucide-react'
import { profile } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionHeading } from '../ui/SectionHeading'

const focusIcons = [Braces, Database, Workflow]
export function About() {
  const { text, t } = useLanguage()
  return <section id="about" className="section about-section container" aria-label={t.about}>
    <SectionHeading number="01" eyebrow={t.aboutEyebrow} title={t.aboutHeading} />
    <div className="about-grid"><ScrollReveal><p className="about-lead">{t.aboutLead}</p><ArrowUpRight size={44} strokeWidth={1} className="about-arrow" /></ScrollReveal><ScrollReveal delay={0.1} className="about-copy">{profile.about.map((paragraph, i) => <p key={i}>{text(paragraph)}</p>)}</ScrollReveal></div>
    <div className="focus-grid">{profile.focus.map((focus, i) => { const Icon = focusIcons[i]; return <ScrollReveal key={i} delay={i * 0.08}><div className="focus-item"><span className="focus-number">0{i + 1}</span><Icon size={23} strokeWidth={1.3} /><span>{text(focus)}</span></div></ScrollReveal> })}</div>
  </section>
}
