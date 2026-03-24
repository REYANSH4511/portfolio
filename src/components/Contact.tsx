'use client'
import { useEffect, useRef, useState } from 'react'

const terminalLines = [
  { type: 'comment', text: '// Reyansh Joshi — Developer Profile' },
  { type: 'empty' },
  { type: 'code', label: 'const', name: 'contact', value: '{' },
  { type: 'prop', key: 'email', val: '"reyanshjoshi4511@gmail.com"' },
  { type: 'prop', key: 'phone', val: '"+91 8696164511"' },
  { type: 'prop', key: 'linkedin', val: '"linkedin.com/in/reyansh-joshi"' },
  { type: 'prop', key: 'location', val: '"Gurugram, India"' },
  { type: 'prop', key: 'available', val: 'true', isGreen: true },
  { type: 'close', text: '};' },
  { type: 'empty' },
  { type: 'comment', text: '// Education' },
  { type: 'prop', key: 'degree', val: '"B.Tech Mechanical — JECRC, Jaipur (2022)"' },
  { type: 'prop', key: 'cert', val: '"Full Stack Python — Codeplanet Technologies"' },
  { type: 'prop', key: 'aws', val: '"AWS Cloud Practitioner (In Progress)"' },
]

function TerminalWindow() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= terminalLines.length) return
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 80)
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <div className="bg-[#0d1117] border border-[#21262d] rounded-xl overflow-hidden font-mono text-sm">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#21262d]">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        <span className="ml-auto text-[#6e7681] text-xs">reyansh.contact.ts</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 space-y-0.5 min-h-[300px]">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="leading-7">
            {line.type === 'comment' && (
              <span className="text-[#6e7681]">{line.text}</span>
            )}
            {line.type === 'empty' && <span>&nbsp;</span>}
            {line.type === 'code' && (
              <span>
                <span className="text-[#f97583]">{line.label} </span>
                <span className="text-[#58e6d9]">{line.name}</span>
                <span className="text-[#e6edf3]"> = {line.value}</span>
              </span>
            )}
            {line.type === 'prop' && (
              <span className="pl-4">
                <span className="text-[#f0a53b]">{line.key}</span>
                <span className="text-[#e6edf3]">: </span>
                <span className={line.isGreen ? 'text-[#39d353]' : 'text-[#39d353]'}>{line.val}</span>
                <span className="text-[#6e7681]">,</span>
              </span>
            )}
            {line.type === 'close' && (
              <span className="text-[#e6edf3]">{line.text}</span>
            )}
          </div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-[#58e6d9] animate-[blink_1s_step-end_infinite] ml-0.5" />
        )}
      </div>
    </div>
  )
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
            setStarted(true)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 bg-[rgba(13,17,23,0.5)] border-t border-[#21262d]"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="reveal mb-4">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#58e6d9]">// Let's Connect</span>
            </div>
            <h2
              className="reveal font-display font-extrabold text-[clamp(32px,5vw,52px)] text-[#e6edf3] tracking-tight leading-none mb-5"
              style={{ transitionDelay: '0.1s' }}
            >
              Open to<br />
              <span className="gradient-text">New Roles</span>
            </h2>
            <p
              className="reveal text-[#6e7681] font-body text-base leading-relaxed mb-10 max-w-md"
              style={{ transitionDelay: '0.2s' }}
            >
              Based in Gurugram, India. Open to senior full stack roles, tech lead positions,
              and ambitious product teams. Let's build something impactful together.
            </p>

            {/* Contact links */}
            <div className="reveal flex flex-col gap-3" style={{ transitionDelay: '0.3s' }}>
              {[
                {
                  icon: '✉️',
                  label: 'Email',
                  value: 'reyanshjoshi4511@gmail.com',
                  href: 'mailto:reyanshjoshi4511@gmail.com',
                },
                {
                  icon: '📱',
                  label: 'Phone',
                  value: '+91 8696164511',
                  href: 'tel:+918696164511',
                },
                {
                  icon: '💼',
                  label: 'LinkedIn',
                  value: 'linkedin.com/in/reyansh-joshi',
                  href: 'https://linkedin.com/in/reyansh-joshi',
                  external: true,
                },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 bg-[rgba(13,17,23,0.8)] border border-[#21262d] rounded-xl hover:border-[rgba(88,230,217,0.3)] hover:bg-[rgba(88,230,217,0.03)] transition-all duration-200 group"
                >
                  <span className="text-xl w-8 flex-shrink-0 text-center">{link.icon}</span>
                  <div>
                    <div className="font-mono text-[10px] text-[#6e7681] uppercase tracking-widest mb-0.5">
                      {link.label}
                    </div>
                    <div className="font-mono text-sm text-[#b1bac4] group-hover:text-[#58e6d9] transition-colors">
                      {link.value}
                    </div>
                  </div>
                  {link.external && (
                    <span className="ml-auto text-[#6e7681] group-hover:text-[#58e6d9] transition-colors">↗</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Terminal */}
          <div className="reveal" style={{ transitionDelay: '0.4s' }}>
            {started && <TerminalWindow />}
          </div>
        </div>
      </div>
    </section>
  )
}
