import { ArrowDown, ArrowDownRight, ArrowUpRight, Download, Plus } from 'lucide-react'
import { motion } from 'motion/react'
import { profile, siteConfig } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import { ScrollReveal } from '../ui/ScrollReveal'

export function Hero() {
  const { text, t } = useLanguage()
  const [titleFirst, ...titleRest] = text(profile.headline).split(' ')
  return <section id="home" className="hero container" aria-labelledby="hero-title">
    <div className="hero-main">
      <ScrollReveal className="hero-copy">
        <p className="eyebrow hero-eyebrow"><span className="tiny-dot" />{t.heroEyebrow}</p>
        <p className="hero-greeting">{text(profile.greeting)}</p>
        <h1 id="hero-title">{titleFirst}<br /><span>{titleRest.join(' ')}</span><span className="hero-period">.</span></h1>
        <p className="hero-description">{text(profile.description)}</p>
        <div className="hero-buttons">
          <a className="button button-primary" href="#projects">{t.explore}<ArrowUpRight size={18} /></a>
          <a className="text-link" href="#contact">{t.getInTouch}<ArrowUpRight size={17} /></a>
          {__HAS_RESUME__ && siteConfig.resumePath && <a className="text-link resume-link" href={`${import.meta.env.BASE_URL}${siteConfig.resumePath.replace(/^\//, '')}`} download>{t.download}<Download size={16} /></a>}
        </div>
      </ScrollReveal>
      <ScrollReveal className="hero-visual" delay={0.12}>
        <div className="portrait-orbit" />
        <motion.div className="portrait-frame" whileHover={{ rotate: -1.5 }} transition={{ duration: 0.5 }}>
          <img src={`${import.meta.env.BASE_URL}${siteConfig.portraitPath}`} width="800" height="1000" fetchPriority="high" alt={t.portraitAlt} />
        </motion.div>
        <div className="portrait-pluses" aria-hidden="true"><Plus size={28} strokeWidth={2.8} /><Plus size={19} strokeWidth={2.8} /><Plus size={14} strokeWidth={2.8} /></div>
        <span className="portrait-slashes" aria-hidden="true">/////</span>
        <span className="portrait-label"><span className="tiny-dot" />Node.js · PostgreSQL · NestJS</span>
        <span className="portrait-code" aria-hidden="true">{'{ }'}</span>
      </ScrollReveal>
    </div>
    <div className="hero-bottom"><a href="#about"><ArrowDown size={16} />{t.scroll}</a><span>{t.heroNote}<ArrowDownRight size={20} /></span></div>
  </section>
}
