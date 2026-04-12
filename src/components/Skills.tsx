'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

const SkillsOrb = dynamic(() => import('./three/SkillsOrb'), { ssr: false })

const skillGroups = [
  {
    icon: '⚡',
    category: 'Frontend',
    color: '#58e6d9',
    borderColor: 'rgba(88,230,217,0.3)',
    glowColor: 'rgba(88,230,217,0.15)',
    tagColor: 'rgba(88,230,217,0.08)',
    tagBorder: 'rgba(88,230,217,0.2)',
    tagText: '#58e6d9',
    type: 'frontend' as const,
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI', 'Ant Design'],
    level: 92,
  },
  {
    icon: '🔧',
    category: 'Backend',
    color: '#39d353',
    borderColor: 'rgba(57,211,83,0.3)',
    glowColor: 'rgba(57,211,83,0.15)',
    tagColor: 'rgba(57,211,83,0.08)',
    tagBorder: 'rgba(57,211,83,0.2)',
    tagText: '#39d353',
    type: 'backend' as const,
    skills: ['Node.js', 'Express.js', 'Python', 'Django', 'FastAPI', 'GraphQL', 'REST APIs'],
    level: 95,
  },
  {
    icon: '🗄️',
    category: 'Databases',
    color: '#f0a53b',
    borderColor: 'rgba(240,165,59,0.35)',
    glowColor: 'rgba(240,165,59,0.18)',
    tagColor: 'rgba(240,165,59,0.1)',
    tagBorder: 'rgba(240,165,59,0.3)',
    tagText: '#f0a53b',
    type: 'database' as const,
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Prisma', 'Sequelize'],
    level: 88,
  },
  {
    icon: '☁️',
    category: 'Cloud & DevOps',
    color: '#58e6d9',
    borderColor: 'rgba(88,230,217,0.3)',
    glowColor: 'rgba(88,230,217,0.15)',
    tagColor: 'rgba(88,230,217,0.08)',
    tagBorder: 'rgba(88,230,217,0.2)',
    tagText: '#58e6d9',
    type: 'devops' as const,
    skills: ['AWS EC2/S3', 'Lambda', 'RDS', 'Docker', 'Nginx', 'Jenkins', 'GitHub Actions', 'CI/CD'],
    level: 85,
  },
  {
    icon: '🤖',
    category: 'AI & Messaging',
    color: '#39d353',
    borderColor: 'rgba(57,211,83,0.3)',
    glowColor: 'rgba(57,211,83,0.15)',
    tagColor: 'rgba(57,211,83,0.08)',
    tagBorder: 'rgba(57,211,83,0.2)',
    tagText: '#39d353',
    type: 'ai' as const,
    skills: ['LangChain', 'OpenAI APIs', 'Kafka', 'RabbitMQ', 'Web Scraping'],
    level: 82,
  },
  {
    icon: '🛡️',
    category: 'Security & Testing',
    color: '#f0a53b',
    borderColor: 'rgba(240,165,59,0.35)',
    glowColor: 'rgba(240,165,59,0.18)',
    tagColor: 'rgba(240,165,59,0.1)',
    tagBorder: 'rgba(240,165,59,0.3)',
    tagText: '#f0a53b',
    type: 'security' as const,
    skills: ['JWT', 'OAuth2', 'Jest', 'Swagger', 'Postman', 'Unit Testing'],
    level: 87,
  },
]

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const circumference = 2 * Math.PI * 36
  const strokeDashoffset = circumference - (group.level / 100) * circumference

  return (
    <div
      className="reveal group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
      style={{
        background: 'rgba(13,17,23,0.9)',
        border: `1px solid #21262d`,
        transitionDelay: `${index * 0.07}s`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.borderColor = group.borderColor
        el.style.boxShadow = `0 24px 48px rgba(0,0,0,0.5), 0 0 40px ${group.glowColor}`
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.borderColor = '#21262d'
        el.style.boxShadow = 'none'
      }}
    >
      {/* 3D scene banner */}
      <div className="relative h-28 overflow-hidden" style={{ background: 'rgba(5,7,9,0.8)' }}>
        <SkillsOrb type={group.type} color={group.color} />
        {/* Gradient overlay so 3D blends into card */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, transparent 40%, rgba(13,17,23,0.95) 100%)`
          }}
        />
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
        />
      </div>

      {/* Card body */}
      <div className="px-5 pb-5 -mt-2 relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-display font-bold text-base" style={{ color: group.color }}>
              {group.category}
            </h3>
          </div>
          {/* Circular progress ring */}
          <div className="relative w-12 h-12 flex-shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#21262d" strokeWidth="5" />
              <circle
                cx="40" cy="40" r="36"
                fill="none"
                stroke={group.color}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{
                  transition: 'stroke-dashoffset 1s ease',
                  filter: `drop-shadow(0 0 5px ${group.color})`,
                }}
              />
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold"
              style={{ color: group.color }}
            >
              {group.level}%
            </span>
          </div>
        </div>

        {/* Skill tags */}
        <div className="flex flex-wrap gap-1.5">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 font-mono text-[10px] rounded-md cursor-default"
              style={{
                background: group.tagColor,
                border: `1px solid ${group.tagBorder}`,
                color: group.tagText,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
          }
        })
      },
      { threshold: 0.05 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 border-t border-[#21262d]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-4">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#58e6d9]">// Tech Stack</span>
        </div>
        <h2
          className="reveal font-display font-extrabold text-[clamp(32px,5vw,52px)] text-[#e6edf3] tracking-tight leading-none mb-3"
          style={{ transitionDelay: '0.1s' }}
        >
          What I Build With
        </h2>
        <p
          className="reveal text-[#6e7681] font-body text-base mb-14 max-w-xl"
          style={{ transitionDelay: '0.2s' }}
        >
          A curated set of technologies I use daily to ship production-grade software.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.category} group={g} index={i} />
          ))}
        </div>

        {/* Languages */}
        <div
          className="reveal mt-14 p-6 rounded-xl"
          style={{ background: 'rgba(13,17,23,0.85)', border: '1px solid #21262d', transitionDelay: '0.4s' }}
        >
          <p className="font-mono text-xs text-[#6e7681] mb-4 uppercase tracking-widest">Languages</p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'JavaScript', color: '#f0a53b' },
              { name: 'TypeScript', color: '#58e6d9' },
              { name: 'Python',     color: '#39d353' },
              { name: 'SQL',        color: '#f0a53b' },
              { name: 'Bash',       color: '#58e6d9' },
            ].map((lang) => (
              <span
                key={lang.name}
                className="px-4 py-2 font-mono text-xs rounded-full cursor-default"
                style={{
                  border:     `1px solid ${lang.color}40`,
                  color:      lang.color,
                  background: `${lang.color}08`,
                }}
              >
                {lang.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
