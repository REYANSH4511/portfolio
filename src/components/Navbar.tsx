'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { threshold: 0.4 }
    )
    document.querySelectorAll('section[id]').forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bg/80 backdrop-blur-2xl border-b border-border/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group" data-hover>
          <div className="w-8 h-8 border border-accent-cyan/50 rounded flex items-center justify-center group-hover:border-accent-cyan group-hover:shadow-[0_0_16px_rgba(88,230,217,0.4)] transition-all duration-300">
            <span className="font-mono text-xs font-bold text-accent-cyan">RJ</span>
          </div>
          <span className="font-display font-800 text-lg text-[#e6edf3] tracking-tight">
            Reyansh Joshi<span className="text-accent-cyan">.</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                data-hover
                className={`font-mono text-xs uppercase tracking-widest transition-all duration-200 relative group ${
                  activeSection === href.slice(1) ? 'text-accent-cyan' : 'text-muted hover:text-[#e6edf3]'
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-accent-cyan transition-all duration-300 ${
                    activeSection === href.slice(1) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="mailto:reyanshjoshi4511@gmail.com"
            data-hover
            className="relative overflow-hidden font-mono text-xs font-medium px-5 py-2.5 border border-accent-cyan/50 rounded text-accent-cyan hover:bg-accent-cyan/10 hover:border-accent-cyan hover:shadow-[0_0_20px_rgba(88,230,217,0.25)] transition-all duration-300"
          >
            <span className="relative z-10">Hire Me</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          data-hover
        >
          <span className={`h-px bg-[#e6edf3] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`h-px bg-[#e6edf3] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-px bg-[#e6edf3] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-72 border-t border-border/50' : 'max-h-0'}`}>
        <div className="bg-bg-secondary/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-sm text-muted hover:text-accent-cyan transition-colors duration-200"
            >
              <span className="text-accent-cyan mr-2">//</span>{label}
            </a>
          ))}
          <a
            href="mailto:reyanshjoshi4511@gmail.com"
            className="font-mono text-xs text-accent-cyan border border-accent-cyan/40 rounded px-4 py-2 text-center mt-2"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
