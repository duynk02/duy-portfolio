import { Braces, Database, GitBranch, LayoutTemplate, Workflow } from 'lucide-react'
import { skills } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { ScrollReveal } from '../ui/ScrollReveal'
import { SectionHeading } from '../ui/SectionHeading'

const icons = [Braces, LayoutTemplate, Database, Workflow, GitBranch]
export function Skills() {
  const { t, text } = useLanguage()
  return <section id="skills" className="section container" aria-label={t.skillsHeading}>
    <SectionHeading number="03" eyebrow={t.skillsEyebrow} title={t.skillsHeading} description={t.skillsIntro} />
    <div className="skills-grid">{skills.map((group, i) => { const Icon = icons[i]; return <ScrollReveal key={group.id} delay={(i % 3) * 0.08}><div className="skill-group"><Icon size={25} strokeWidth={1.3} /><h3>{text(group.title)}</h3><ul>{group.technologies.map((tech) => <li key={tech} className="tech-tag">{tech}</li>)}</ul></div></ScrollReveal> })}</div>
  </section>
}
