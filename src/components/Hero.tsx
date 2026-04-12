'use client'
import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// FloatingGeometry only — ParticleField replaced with CSS to eliminate TBT on desktop
const FloatingGeometry = dynamic(() => import('./three/FloatingGeometry'), { ssr: false })

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    // Defer orb until after LCP — doesn't affect paint metrics
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    if ('requestIdleCallback' in window) {
      requestIdleCallback(check, { timeout: 3000 })
    } else {
      setTimeout(check, 500)
    }
  }, [])
  return isDesktop
}

const phrases = [
  'Building scalable MERN apps...',
  'Shipping with Docker & AWS...',
  'Crafting AI pipelines with LangChain...',
  'Optimizing PostgreSQL queries...',
  'Leading engineering teams...',
  'Integrating OpenAI APIs...',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = phrases[phraseIdx]
    const delay = deleting ? 35 : text.length === phrase.length ? 1800 : 70

    const timer = setTimeout(() => {
      if (!deleting && text.length < phrase.length) {
        setText(phrase.slice(0, text.length + 1))
      } else if (!deleting && text.length === phrase.length) {
        setDeleting(true)
      } else if (deleting && text.length > 0) {
        setText(phrase.slice(0, text.length - 1))
      } else {
        setDeleting(false)
        setPhraseIdx((i) => (i + 1) % phrases.length)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, phraseIdx])

  return (
    <div className="font-mono text-sm md:text-base text-accent-green flex items-center gap-1 h-6">
      <span className="text-muted mr-1">$</span>
      <span>{text}</span>
      <span className="w-2 h-4 bg-accent-cyan animate-blink inline-block" />
    </div>
  )
}

function StatCounter({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const step = value / 50
        const interval = setInterval(() => {
          start = Math.min(start + step, value)
          setCount(Math.round(start))
          if (start >= value) clearInterval(interval)
        }, 25)
      }
    })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [value])

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-800 text-3xl md:text-4xl text-accent-cyan glow-cyan">
        {count}{suffix}
      </div>
      <div className="font-mono text-xs text-muted mt-1 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function Hero() {
  const isDesktop = useIsDesktop()
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* CSS particle background — replaces Three.js ParticleField, zero JS cost */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%', top: '-100px', left: '-100px',
          background: 'radial-gradient(circle, rgba(88,230,217,0.06) 0%, transparent 70%)',
          animation: 'float 12s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', bottom: '10%', right: '5%',
          background: 'radial-gradient(circle, rgba(57,211,83,0.05) 0%, transparent 70%)',
          animation: 'float 9s ease-in-out infinite reverse',
        }} />
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', top: '40%', left: '30%',
          background: 'radial-gradient(circle, rgba(240,165,59,0.04) 0%, transparent 70%)',
          animation: 'float 15s ease-in-out infinite',
          animationDelay: '3s',
        }} />
        {/* Static star field via CSS box-shadow — no JS */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            radial-gradient(1px 1px at 10% 15%, rgba(88,230,217,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 25% 45%, rgba(88,230,217,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 40% 20%, rgba(57,211,83,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 55% 65%, rgba(88,230,217,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 70% 30%, rgba(240,165,59,0.3) 0%, transparent 100%),
            radial-gradient(1px 1px at 80% 75%, rgba(88,230,217,0.35) 0%, transparent 100%),
            radial-gradient(1px 1px at 15% 70%, rgba(57,211,83,0.2) 0%, transparent 100%),
            radial-gradient(1px 1px at 90% 10%, rgba(88,230,217,0.4) 0%, transparent 100%),
            radial-gradient(1px 1px at 35% 85%, rgba(240,165,59,0.25) 0%, transparent 100%),
            radial-gradient(1px 1px at 60% 5%,  rgba(88,230,217,0.3) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 5% 40%,  rgba(88,230,217,0.5) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 48% 52%, rgba(57,211,83,0.45) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 75% 88%, rgba(88,230,217,0.4) 0%, transparent 100%),
            radial-gradient(1.5px 1.5px at 92% 55%, rgba(240,165,59,0.4) 0%, transparent 100%),
            radial-gradient(2px 2px at 20% 92%, rgba(88,230,217,0.6) 0%, transparent 100%),
            radial-gradient(2px 2px at 65% 42%, rgba(57,211,83,0.5) 0%, transparent 100%),
            radial-gradient(2px 2px at 85% 22%, rgba(88,230,217,0.55) 0%, transparent 100%)
          `,
        }} />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-0 bg-hero-gradient pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-0 pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 z-0 opacity-100 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(88,230,217,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(88,230,217,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 border border-border/80 bg-bg-secondary/60 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_rgba(57,211,83,0.8)] animate-pulse" />
              <span className="font-mono text-xs text-muted">Available for opportunities</span>
            </div>

            {/* Name */}
            <h1 className="font-display font-extrabold leading-[1.0] tracking-tighter mb-4">
              <span className="block text-5xl md:text-7xl text-[#e6edf3]">Reyansh</span>
              <span className="block text-5xl md:text-7xl gradient-text glow-cyan">Joshi</span>
            </h1>

            {/* Role */}
            <p className="font-display text-lg md:text-2xl font-600 text-[#b1bac4] mb-5 tracking-tight">
              Senior Full Stack Developer
            </p>

            {/* Typewriter */}
            <div className="mb-8">
              <Typewriter />
            </div>

            {/* Description */}
            <p className="text-[#b1bac4] text-sm md:text-base leading-relaxed max-w-md mb-10 font-body">
              4+ years engineering scalable MERN applications, microservices & AI-powered systems.
              From RESTful APIs to LangChain pipelines — I ship products that perform at scale.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mb-14">
              <a
                href="#projects"
                data-hover
                className="group relative inline-flex items-center gap-2 bg-accent-cyan text-bg font-mono font-bold text-sm px-7 py-3.5 rounded overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(88,230,217,0.4)] hover:-translate-y-1"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#contact"
                data-hover
                className="inline-flex items-center gap-2 border border-border text-[#e6edf3] font-mono font-medium text-sm px-7 py-3.5 rounded transition-all duration-300 hover:border-accent-cyan/50 hover:text-accent-cyan hover:-translate-y-1"
              >
                Get In Touch
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 py-6 border-t border-border/50">
              <StatCounter value={4} label="Years Exp" suffix="+" />
              <StatCounter value={7} label="Projects" suffix="+" />
              <StatCounter value={45} label="DB Latency" suffix="%" />
              <StatCounter value={99} label="Uptime" suffix="%" />
            </div>
          </div>

          {/* Right — 3D Orb — desktop only */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-[480px] h-[480px]">
              {/* Glow rings behind orb */}
              <div className="absolute inset-8 rounded-full border border-accent-cyan/10 animate-spin-slow" />
              <div className="absolute inset-16 rounded-full border border-accent-green/10 animate-[spin_15s_linear_infinite_reverse]" />

              {/* 3D Scene — only rendered on desktop */}
              {isDesktop && <FloatingGeometry />}

              {/* Floating badges */}
              <div className="absolute top-4 left-0 glass rounded-lg px-3 py-2 border border-accent-cyan/20 animate-float" style={{ animationDelay: '0s' }}>
                <div className="font-mono text-xs text-accent-cyan font-500">⚡ MERN Stack</div>
              </div>
              <div className="absolute bottom-12 right-0 glass rounded-lg px-3 py-2 border border-accent-green/20 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="font-mono text-xs text-accent-green font-500">🤖 AI / LangChain</div>
              </div>
              <div className="absolute top-1/2 -right-4 glass rounded-lg px-3 py-2 border border-amber-accent/20 animate-float" style={{ animationDelay: '0.8s', color: '#f0a53b' }}>
                <div className="font-mono text-xs font-500">☁️ AWS / DevOps</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <div className="font-mono text-[10px] text-muted uppercase tracking-widest">Scroll</div>
        <div className="w-px h-8 bg-gradient-to-b from-accent-cyan/50 to-transparent" />
      </div>
    </section>
  )
}
