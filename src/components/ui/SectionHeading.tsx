import { ScrollReveal } from './ScrollReveal'

export function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description?: string }) {
  return <ScrollReveal className="section-heading">
    <div className="section-eyebrow"><span>{number}</span><span>{eyebrow}</span></div>
    <div className="section-heading-row"><h2>{title}</h2>{description && <p>{description}</p>}</div>
  </ScrollReveal>
}
