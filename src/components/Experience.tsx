'use client'
import { useEffect, useRef } from 'react'

const experiences = [
  {
    company: 'DelveInsight Business Research LLP',
    role: 'Senior Software Developer',
    location: 'Gurugram',
    period: 'Mar 2025 – Present',
    current: true,
    color: '#58e6d9',
    highlights: [
      { text: 'Architected enterprise MERN applications', metric: '+35% scalability' },
      { text: 'Automated CI/CD with AWS, Docker & Nginx', metric: '-40% deploy time' },
      { text: 'Managed a team of 4 engineers', metric: 'Sprint planning & DevOps' },
      { text: 'Optimized MongoDB & PostgreSQL queries', metric: '-45% DB latency' },
      { text: 'Built AI modules with LangChain & OpenAI APIs', metric: '-60% analysis time' },
    ],
    stack: ['MERN', 'AWS', 'Docker', 'LangChain', 'OpenAI', 'PostgreSQL', 'CI/CD'],
  },
  {
    company: 'Spanidea Systems',
    role: 'Software Engineer',
    location: 'Jodhpur',
    period: 'Sep 2022 – Mar 2025',
    current: false,
    color: '#39d353',
    highlights: [
      { text: 'Built Node.js microservices for enterprise apps', metric: 'Large-scale' },
      { text: 'Integrated Razorpay & CCAvenue payment gateways', metric: 'Audit-compliant' },
      { text: 'Performance tuning, caching & load optimization', metric: '-30% response time' },
      { text: 'Delivered responsive UIs with React.js', metric: 'API orchestration' },
    ],
    stack: ['Node.js', 'React.js', 'Express', 'MongoDB', 'Razorpay', 'CCAvenue'],
  },
  {
    company: 'Codeplanet Technologies PVT LTD',
    role: 'Trainee',
    location: 'Jaipur',
    period: 'Oct 2021 – April 2022',
    current: false,
    color: '#f0a53b',
    highlights: [
      { text: 'Built Django application for Donation Management', metric: 'Full-stack' },
      { text: 'Developed admin dashboard with React.js', metric: 'UI/UX' },
    ],
    stack: ['Django', 'React.js', 'MySQL', 'HTML', 'CSS'],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting)
            e.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 bg-[rgba(13,17,23,0.5)] border-t border-[#21262d]"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-4">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#58e6d9]">// Career</span>
        </div>
        <h2 className="reveal font-display font-extrabold text-[clamp(32px,5vw,52px)] text-[#e6edf3] tracking-tight leading-none mb-3" style={{ transitionDelay: '0.1s' }}>
          Work Experience
        </h2>
        <p className="reveal text-[#6e7681] font-body text-base mb-16 max-w-xl" style={{ transitionDelay: '0.2s' }}>
          Building production systems and leading teams across startups and research firms.
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#58e6d9] via-[#39d353] to-transparent" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className="reveal pl-10 relative"
                style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
              >
                {/* Dot */}
                <div
                  className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-[#050709] flex items-center justify-center"
                  style={{ background: exp.color, boxShadow: `0 0 16px ${exp.color}60` }}
                >
                  {exp.current && (
                    <span className="w-2 h-2 rounded-full bg-[#050709] animate-pulse" />
                  )}
                </div>

                {/* Card */}
                <div className="bg-[rgba(13,17,23,0.8)] border border-[#21262d] rounded-xl p-6 hover:border-[rgba(88,230,217,0.2)] transition-all duration-300 group">
                  {/* Top bar */}
                  <div
                    className="h-0.5 w-12 rounded mb-4 group-hover:w-24 transition-all duration-500"
                    style={{ background: exp.color }}
                  />

                  {/* Meta */}
                  <div className="flex flex-wrap items-start gap-3 mb-1">
                    <h3 className="font-display font-bold text-xl text-[#e6edf3]">{exp.company}</h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 bg-[rgba(88,230,217,0.1)] border border-[rgba(88,230,217,0.3)] text-[#58e6d9] font-mono text-[10px] rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3 mb-5">
                    <span
                      className="font-mono text-sm font-medium"
                      style={{ color: exp.color }}
                    >
                      {exp.role}
                    </span>
                    <span className="text-[#6e7681] font-mono text-xs self-center">·</span>
                    <span className="text-[#6e7681] font-mono text-xs self-center">{exp.location}</span>
                    <span className="text-[#6e7681] font-mono text-xs self-center">·</span>
                    <span className="text-[#6e7681] font-mono text-xs self-center border border-[#21262d] px-2 py-0.5 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="flex flex-col gap-3 mb-5">
                    {exp.highlights.map((h) => (
                      <li key={h.text} className="flex items-start gap-3">
                        <span className="text-[#58e6d9] mt-0.5 text-xs flex-shrink-0">→</span>
                        <span className="text-[#b1bac4] text-sm font-body">
                          {h.text}{' '}
                          {h.metric && (
                            <span
                              className="font-mono text-xs font-medium"
                              style={{ color: exp.color }}
                            >
                              ({h.metric})
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-[#21262d]">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 bg-[#161b22] border border-[#21262d] text-[#6e7681] font-mono text-[10px] rounded"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
