import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from 'motion/react'
import { timeline } from '../../content/portfolio'
import { useLanguage } from '../../i18n/LanguageProvider'
import './career-timeline.css'

type Milestone = (typeof timeline)[number]

interface TrackGeometry {
  top: number
  height: number
  thresholds: number[]
}

interface MilestoneProps {
  item: Milestone
  progress: MotionValue<number>
  threshold: number
  reducedMotion: boolean
  nodeRef: (node: HTMLSpanElement | null) => void
}

function CareerMilestone({
  item,
  progress,
  threshold,
  reducedMotion,
  nodeRef,
}: MilestoneProps) {
  const { text } = useLanguage()
  // A boolean snapshot only causes a render when this node's threshold is crossed.
  const subscribe = useCallback((notify: () => void) => progress.on('change', notify), [progress])
  const getSnapshot = useCallback(() => {
    const value = progress.get()
    return reducedMotion || (value > 0.0001 && value >= threshold - 0.0001)
  }, [progress, reducedMotion, threshold])
  const active = useSyncExternalStore(subscribe, getSnapshot, () => reducedMotion)

  return (
    <li className="career-milestone" data-active={active}>
      <div className="career-period">{text(item.period)}</div>
      <span
        ref={nodeRef}
        className="career-node"
        aria-hidden="true"
        data-testid="timeline-node"
        data-active={active}
      >
        <span />
      </span>
      <motion.div
        className="career-content"
        initial={reducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: active ? 1 : 0, y: active || reducedMotion ? 0 : 20 }}
        transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="career-kind">{text(item.kind)}</span>
        <h3>{text(item.title)}</h3>
        <p className="career-organization">{text(item.organization)}</p>
        <ul className="career-description">
          {item.description.map((description, index) => (
            <li key={index}>{text(description)}</li>
          ))}
        </ul>
        <ul className="career-technologies" aria-label={text({ vi: 'Công nghệ sử dụng', en: 'Technologies used' })}>
          {item.technologies.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </motion.div>
    </li>
  )
}

/** The track's scroll target is its measured first-to-last node span. */
export function CareerTimeline() {
  const { language } = useLanguage()
  const reducedMotion = Boolean(useReducedMotion())
  const listRef = useRef<HTMLOListElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<(HTMLSpanElement | null)[]>([])
  const [geometry, setGeometry] = useState<TrackGeometry>({
    top: 14,
    height: 1,
    thresholds: timeline.map(() => 0),
  })

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 72%', 'end 72%'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 30, mass: 0.35 })

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    let frame = 0
    let cancelled = false

    const measure = () => {
      if (cancelled) return
      const listTop = list.getBoundingClientRect().top
      const centers = nodesRef.current.map((node) => {
        if (!node) return 0
        const bounds = node.getBoundingClientRect()
        return bounds.top - listTop + bounds.height / 2
      })
      const top = centers[0] ?? 0
      const height = Math.max(1, (centers.at(-1) ?? top) - top)
      const thresholds = centers.map((center) => (center - top) / height)
      // Locale/font changes can move the track without firing a scroll event.
      const currentProgress = (window.innerHeight * 0.72 - listTop - top) / height
      scrollYProgress.set(Math.max(0, Math.min(1, currentProgress)))
      setGeometry((previous) => {
        if (
          Math.abs(previous.top - top) < 0.1
          && Math.abs(previous.height - height) < 0.1
          && thresholds.every((value, index) => Math.abs(value - (previous.thresholds[index] ?? -1)) < 0.0001)
        ) return previous
        return { top, height, thresholds }
      })
    }

    const queueMeasure = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }

    measure()
    const observer = new ResizeObserver(queueMeasure)
    observer.observe(list)
    void document.fonts.ready.then(queueMeasure)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [language, scrollYProgress])

  return (
    <div className="career-timeline">
      <div
        ref={trackRef}
        className="career-track"
        style={{ top: geometry.top, height: geometry.height }}
        aria-hidden="true"
      >
        <motion.div
          className="career-progress"
          data-testid="timeline-progress"
          style={{ scaleY: reducedMotion ? 1 : smoothProgress }}
        />
      </div>
      <ol className="career-list" ref={listRef}>
        {timeline.map((item, index) => (
          <CareerMilestone
            key={item.id}
            item={item}
            progress={smoothProgress}
            threshold={geometry.thresholds[index] ?? 0}
            reducedMotion={reducedMotion}
            nodeRef={(node) => { nodesRef.current[index] = node }}
          />
        ))}
      </ol>
    </div>
  )
}
