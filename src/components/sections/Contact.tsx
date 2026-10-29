import { ArrowUpRight, Github, Mail } from 'lucide-react'
import { siteConfig } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'

export function Contact() {
  const { t } = useLanguage()
  return <section id="contact" className="section contact-section container" aria-label={t.contact}>
    <SectionHeading number="06" eyebrow={t.contactEyebrow} title={t.contactHeading} />
    <div className="contact-grid"><ScrollReveal className="contact-art" ><div role="img" aria-label={t.contactGraphic}><span className="envelope-orbit" /><span className="contact-star" aria-hidden="true">✳</span><svg viewBox="0 0 300 220" aria-hidden="true"><g transform="rotate(-12 150 110)"><rect x="30" y="35" width="240" height="150" rx="5" /><path d="m30 35 120 90L270 35M30 185l85-86m155 86-85-86" /></g><path className="letter-trail" d="M240 40q50-35 50 10t-45 25" /></svg><span className="envelope-at" aria-hidden="true">@</span></div></ScrollReveal><ScrollReveal className="contact-copy" delay={0.1}><h3>{t.contactLead}</h3><p>{t.contactCopy}</p><a className="button button-primary" href={`mailto:${siteConfig.email}`} aria-label={t.emailLabel}>{t.sendEmail}<ArrowUpRight size={18} /></a><div className="contact-links"><a href={`mailto:${siteConfig.email}`}><Mail size={17} strokeWidth={1.5} /><span>{siteConfig.email}</span><ArrowUpRight size={15} /></a><a href={siteConfig.github} target="_blank" rel="noopener noreferrer" aria-label={`${t.githubProfile} (${t.external})`}><Github size={17} strokeWidth={1.5} /><span>github.com/duynk02</span><ArrowUpRight size={15} /></a></div></ScrollReveal></div>
  </section>
}
