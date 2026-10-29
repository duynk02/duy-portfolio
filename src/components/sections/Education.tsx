import { ArrowUpRight, Award, GraduationCap } from 'lucide-react'
import { certifications, education } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'

export function Education() {
  const { t, text } = useLanguage()
  return <section id="education" className="section container" aria-label={t.educationEyebrow}>
    <SectionHeading number="05" eyebrow={t.educationEyebrow} title={t.educationHeading} />
    <div className="education-grid"><ScrollReveal className="education-main"><div className="education-label"><GraduationCap size={21} strokeWidth={1.4} /><span>{t.educationLabel}</span></div><p className="education-period">{education.period}</p><h3>{text(education.school)}</h3><p>{text(education.degree)}</p><span className="gpa">GPA <strong>{education.gpa}</strong></span><ArrowUpRight size={34} strokeWidth={1} className="education-arrow" /></ScrollReveal><ScrollReveal className="certifications" delay={0.1}><div className="education-label"><Award size={21} strokeWidth={1.4} /><span>{t.certificatesLabel}</span></div>{certifications.map((certificate, i) => <div className="certificate" key={i}><h3>{text(certificate.title)}</h3><p>{certificate.issuer}{certificate.issuer && text(certificate.date) ? ' · ' : ''}{text(certificate.date)}</p></div>)}</ScrollReveal></div>
  </section>
}
