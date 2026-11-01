import { useLayoutEffect, useRef } from 'react'
import { FEATURES } from './content.js'

// Splits text into words so each one can light up on scroll.
function Words({ text }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="w">{w}</span>{' '}
    </span>
  ))
}

function Item({ h, p }) {
  return (
    <div className="rv">
      <h3><Words text={h} /></h3>
      {p ? <p><Words text={p} /></p> : null}
    </div>
  )
}

export default function Features() {
  const root = useRef(null)

  // As you scroll, the words of each point go from faint to bold, one by one.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.classList.add('reveal-on')
    const blocks = [...el.querySelectorAll('.rv')]
    const words = blocks.map((b) => [...b.querySelectorAll('.w')])
    let ticking = false

    const update = () => {
      ticking = false
      const vh = window.innerHeight
      blocks.forEach((b, i) => {
        const r = b.getBoundingClientRect()
        const p = Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.45 + r.height * 0.5)))
        const n = Math.ceil(p * words[i].length)
        words[i].forEach((w, k) => w.classList.toggle('on', k < n))
      })
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', update)
      el.classList.remove('reveal-on')
    }
  }, [])

  return (
    <section id="features" className="grey">
      <div className="wrap" ref={root}>
        <h2 className="center">{FEATURES.title}</h2>
        <div className="feat-grid">
          <div className="feat-col">
            {FEATURES.drivers.map((f) => <Item key={f.h} {...f} />)}
          </div>
          <div className="feat-col">
            {FEATURES.riders.map((f) => <Item key={f.h} {...f} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
