import { useState } from 'react'
import { ArrowUpRight, ChevronDown, Github } from 'lucide-react'
import { projects, type Project } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { SectionHeading } from '../ui/SectionHeading'
import { ScrollReveal } from '../ui/ScrollReveal'
import { ProjectGraphic } from './ProjectGraphic'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { text, t } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  return <ScrollReveal delay={(index % 2) * 0.1} className={`project-card ${index === 0 ? 'featured-project' : ''}`}>
    <article>
      <ProjectGraphic graphic={project.graphic} />
      <div className="project-meta"><span>{text(project.category)}</span><span className="project-status">{index === 0 && <span className="tiny-dot" />}{text(project.status)}</span></div>
      <div className="project-title-row"><h3>{project.title}</h3><span className="project-number">/{project.number}</span></div>
      <p className="project-subtitle">{text(project.subtitle)}</p>
      <p className="project-description">{text(project.description)}</p>
      <ul className="project-technologies" aria-label={text({ vi: 'Công nghệ dự án', en: 'Project technologies' })}>{project.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>
      <div className="project-card-bottom">
        <button type="button" className="project-detail-button" aria-expanded={expanded} aria-controls={`details-${project.id}`} onClick={() => setExpanded(!expanded)}>{expanded ? t.closeDetails : t.projectDetails}<ChevronDown size={15} /></button>
        <div className="project-links">{project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${t.sourceCode} ${project.title} (${t.external})`}><Github size={15} /><span>{t.sourceCode}</span><ArrowUpRight size={14} /></a>}{project.demo && <a href={project.demo} target="_blank" rel="noopener noreferrer">{t.liveDemo}<ArrowUpRight size={14} /></a>}</div>
      </div>
      <div id={`details-${project.id}`} className="project-details" hidden={!expanded}><h4>{t.engineering}</h4><ul>{project.highlights.map((highlight, i) => <li key={i}>{text(highlight)}</li>)}</ul></div>
    </article>
  </ScrollReveal>
}

export function Projects() {
  const { t } = useLanguage()
  return <section id="projects" className="section container" aria-label={t.projects}>
    <SectionHeading number="04" eyebrow={t.projectsEyebrow} title={t.projectsHeading} description={t.projectsIntro} />
    <div className="projects-grid">{projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}</div>
  </section>
}
