import { useEffect, useRef, useState } from 'react'
import Features from './Features.jsx'
import {
  PLAY_STORE_URL, INSTAGRAM_URL, CONTACT, NAV, HERO, DRIVERS, RIDERS,
  SAFETY, ABOUT, MISSION, FAQ,
} from './content.js'

/* ---------- small pieces ---------- */

function PlayBadge() {
  return (
    <a className="play" href={PLAY_STORE_URL} aria-label="Get it on Google Play">
      <svg viewBox="0 0 24 26" width="24" height="26" aria-hidden="true">
        <path d="M1.5 1.2 13 13 1.5 24.8c-.3-.3-.5-.8-.5-1.4V2.6c0-.6.2-1.1.5-1.4Z" fill="#00D2FF" />
        <path d="m16.9 9.1-3.9 3.9L1.5 1.2c.5-.5 1.3-.5 2.1-.1l13.3 8Z" fill="#00F076" />
        <path d="m16.9 16.9-13.3 8c-.8.4-1.6.4-2.1-.1L13 13l3.9 3.9Z" fill="#FF3A44" />
        <path d="m22 11.9-5.1-2.8L13 13l3.9 3.9 5.1-2.8c1.3-.8 1.3-1.5 0-2.2Z" fill="#FFC800" />
      </svg>
      <span><small>GET IT ON</small>Google Play</span>
    </a>
  )
}

/* ---------- header ---------- */

function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const filled = solid || open

  return (
    <header className={'hdr' + (filled ? ' solid' : '')}>
      <div className="hdr-in">
        <a className="hdr-logo" href="#top" aria-label="Pickhop home" onClick={() => setOpen(false)}>
          <img src="/logo.png" width="88" height="42" alt="Pickhop" />
        </a>
        <nav className="hdr-nav" aria-label="Main">
          {NAV.map((n) => <a key={n.id} href={'#' + n.id}>{n.label}</a>)}
        </nav>
        <a className="b a hdr-cta" href={PLAY_STORE_URL}>Get the app</a>
        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="drawer">
          {NAV.map((n) => (
            <a key={n.id} href={'#' + n.id} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a className="b a" href={PLAY_STORE_URL}>Get the app</a>
        </div>
      )}
    </header>
  )
}

/* ---------- sections ---------- */

function Hero() {
  const video = useRef(null)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) video.current?.pause()
  }, [])
  return (
    <div className="hero" id="top">
      <video ref={video} autoPlay muted loop playsInline preload="auto" poster="/hero-poster.jpg" aria-hidden="true">
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      <div className="hero-in">
        <a className="logo" href="#top" aria-label="Pickhop home">
          <img src="/logo.png" width="176" height="84" alt="Pickhop" />
        </a>
        <h1>{HERO.title.split('ride-hailing')[0]}<span className="nb">ride-hailing</span>{HERO.title.split('ride-hailing')[1]}</h1>
        <p className="lede">{HERO.lede}</p>
        <p>
          <a className="b a" href={PLAY_STORE_URL}>{HERO.riderButton}</a>
          <a className="b" href={PLAY_STORE_URL}>{HERO.driverButton}</a>
        </p>
      </div>
    </div>
  )
}

function Drivers() {
  return (
    <section id="drivers" className="grey">
      <div className="wrap center">
        <h2>{DRIVERS.title}</h2>
        <div className="car">
          <img src="/sedan-cutout.png" width="848" height="306" alt="Silver sedan car for Pickhop drivers" loading="lazy" />
        </div>
        <p className="best">{DRIVERS.best}</p>
        <ul className="ck">
          {DRIVERS.types.map((t) => (
            <li key={t.name}><span><strong>{t.name}:</strong> {t.text}</span></li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function Riders() {
  return (
    <section id="riders">
      <div className="wrap split">
        <img className="rider-img" src="/rider.jpg" width="320" height="320" alt="Two Pickhop riders smiling as they look at a phone in the back seat of a car" loading="lazy" />
        <div>
          <h2>{RIDERS.title}</h2>
          <p className="intro">{RIDERS.intro}</p>
          <ul className="pl">
            {RIDERS.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
          <p><a className="b d" href={PLAY_STORE_URL}>{RIDERS.button}</a></p>
        </div>
      </div>
    </section>
  )
}

function Safety() {
  return (
    <section id="safety">
      <div className="wrap split top">
        <div>
          <h2>{SAFETY.title}</h2>
          <p className="intro">{SAFETY.sub}</p>
        </div>
        <ul className="pl">
          {SAFETY.points.map((p) => (
            <li key={p.t}>{p.b && <strong>{p.b} </strong>}{p.t}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function AboutVideo() {
  const ref = useRef(null)
  // Plays only while on screen (saves data); reduced-motion users get the still poster.
  useEffect(() => {
    const v = ref.current
    if (!v || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [])
  return (
    <video
      ref={ref}
      className="about-media"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/about.jpg"
      width="960"
      height="636"
      aria-label="Pickhop logo animation"
    >
      <source src="/about.mp4" type="video/mp4" />
    </video>
  )
}

function About() {
  return (
    <section id="about" className="grey">
      <div className="wrap split">
        <AboutVideo />
        <div>
          <h2>{ABOUT.title}</h2>
          {ABOUT.paragraphs.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </section>
  )
}

function Mission() {
  return (
    <section id="mission" className="mis">
      <div className="wrap">
        <h2>{MISSION.title}</h2>
        <div className="cols">
          <div>
            <h3>Mission</h3>
            <ul>{MISSION.mission.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
          <div>
            <h3>Vision</h3>
            <ul>{MISSION.vision.map((m) => <li key={m}>{m}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section id="faq">
      <div className="wrap split top">
        <h2>{FAQ.title}</h2>
        <div className="faq">
          {FAQ.items.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const rows = [
    ['Email', CONTACT.email, 'mailto:' + CONTACT.email],
    ['Phone', CONTACT.phoneLabel, 'tel:' + CONTACT.phone],
    ['Pickhop', CONTACT.siteLabel, CONTACT.site],
    ['Instagram', CONTACT.instagramLabel, INSTAGRAM_URL],
    ['Rollyadams Techworld Limited', CONTACT.companyLabel, CONTACT.company],
  ]
  return (
    <section id="contact" className="grey">
      <div className="wrap split top">
        <h2>Contact</h2>
        <dl>
          {rows.map(([k, label, href]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd><a href={href}>{label}</a></dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <img src="/logo.png" width="120" height="57" alt="Pickhop" loading="lazy" />
          <p className="foot-note">Pickhop.com.ng is part of the Rollyadams Techworld Limited family.</p>
        </div>
        <nav aria-label="Footer">
          {NAV.map((n) => <a key={n.id} href={'#' + n.id}>{n.label}</a>)}
        </nav>
        <div className="foot-app">
          <PlayBadge />
          <a className="ig" href={INSTAGRAM_URL}>Instagram {CONTACT.instagramLabel}</a>
        </div>
      </div>
      <div className="wrap">
        <p className="legal">© {new Date().getFullYear()} Rollyadams Techworld Limited. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#drivers">Skip to content</a>
      <Header />
      <Hero />
      <main>
        <Drivers />
        <Riders />
        <Features />
        <Safety />
        <About />
        <Mission />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
