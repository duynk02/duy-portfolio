import { ArrowLeftRight, Check, Database, FileText, Fingerprint, MapPin, Route, Server, ShieldCheck } from 'lucide-react'
import type { Project } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'

export function ProjectGraphic({ graphic }: { graphic: Project['graphic'] }) {
  const { t } = useLanguage()
  if (graphic === 'map') return <div className="project-art map-art" role="img" aria-label={t.mapGraphic}>
    <svg viewBox="0 0 600 340" className="map-lines" aria-hidden="true"><path d="M-20 260 Q130 290 220 170 T620 130M30-20 Q200 60 155 200 T260 370M-10 95 Q170 35 340 175 T610 250M440-10 Q325 120 420 220 T520 370" /><path d="M110 250 C180 260 175 90 290 115 S350 270 460 130" className="map-route" /><circle cx="110" cy="250" r="8" /><circle cx="460" cy="130" r="8" /></svg>
    <div className="map-brand"><Route size={27} strokeWidth={1.5} /><span>wandermap<span className="map-brand-dot">.</span></span></div>
    <div className="map-location"><MapPin size={20} fill="currentColor" stroke="var(--map-bg)" /></div>
    <span className="map-coordinate" aria-hidden="true">10°02′ N — 105°47′ E</span><span className="art-index" aria-hidden="true">01 / WANDER</span>
  </div>
  if (graphic === 'sync') return <div className="project-art sync-art" role="img" aria-label={t.syncGraphic}>
    <span className="art-topline">DH—EMR / SYNC ENGINE</span>
    <div className="sync-diagram"><div><Database size={31} strokeWidth={1.3} /><strong>HIS</strong></div><div className="sync-connection"><span /><ArrowLeftRight size={28} strokeWidth={1.4} /><span /></div><div><Server size={31} strokeWidth={1.3} /><strong>EMR</strong></div></div>
    <div className="sync-bottom"><span className="tiny-dot" />LISTEN → TRANSFORM → NOTIFY</div><span className="art-index" aria-hidden="true">02 / CONNECT</span>
  </div>
  if (graphic === 'hospital') return <div className="project-art hospital-art" role="img" aria-label={t.hospitalGraphic}>
    <span className="art-topline">HOSPITAL BRIEFING / SYSTEM</span>
    <div className="hospital-graphic"><div className="hospital-sheet"><FileText size={27} strokeWidth={1.3} /><div className="sheet-lines"><i /><i /><i /></div><span className="sheet-check"><Check size={17} /></span></div><span className="hospital-cross">+</span><div className="hospital-sheet back-sheet"><Database size={27} strokeWidth={1.3} /><div className="sheet-lines"><i /><i /></div></div></div>
    <span className="art-index" aria-hidden="true">03 / ORGANIZE</span>
  </div>
  return <div className="project-art signature-art" role="img" aria-label={t.signatureGraphic}>
    <span className="art-topline">EVOLIS / DIGITAL SIGNATURE BRIDGE</span>
    <div className="signature-graphic"><Fingerprint size={77} strokeWidth={0.9} /><div className="signature-line" /><ShieldCheck size={36} strokeWidth={1.1} /></div>
    <span className="signature-label">device → bridge → HIS</span><span className="art-index" aria-hidden="true">04 / VERIFY</span>
  </div>
}
