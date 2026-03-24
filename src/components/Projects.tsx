'use client'
import { useEffect, useRef, useState, MouseEvent } from 'react'

const projects = [
  {
    id: 1,
    icon: '🤖',
    name: 'DelveInsight AI Platform',
    tagline: 'AI-powered data extraction at scale',
    description:
      'Led AI chatbot development, automated data extraction via LangChain & OpenAI, and ensured 99.9% uptime through robust DevOps practices.',
    metric: '99.9% uptime',
    metricLabel: 'Availability',
    tags: ['LangChain', 'OpenAI', 'AWS', 'Docker', 'CI/CD'],
    color: '#58e6d9',
    featured: true,
  },
  {
    id: 2,
    icon: '🎓',
    name: 'EdTech Platforms (IFAS, Lurnigo)',
    tagline: 'Real-time LMS & CRM systems',
    description:
      'Designed and deployed Node.js APIs for LMS and CRM with real-time chat, live classes, and payment integrations supporting thousands of students.',
    metric: '10k+ users',
    metricLabel: 'Scale',
    tags: ['Node.js', 'React', 'WebSocket', 'Razorpay', 'MongoDB'],
    color: '#39d353',
    featured: true,
  },
  {
    id: 3,
    icon: '👥',
    name: 'Employee Onboarding System',
    tagline: 'MERN automation suite',
    description:
      'Built a full onboarding automation pipeline that improved efficiency by 35% and reduced manual HR effort by 50% through smart workflow orchestration.',
    metric: '50% less effort',
    metricLabel: 'Efficiency',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    color: '#f0a53b',
    featured: false,
  },
  {
    id: 4,
    icon: '📡',
    name: 'Sensor Coverage Tool',
    tagline: 'Django backend with alert automation',
    description:
      'Django backend with JWT-based authentication and smart alert automation, improving monitoring accuracy by 25% across distributed sensor networks.',
    metric: '+25% accuracy',
    metricLabel: 'Monitoring',
    tags: ['Django', 'Python', 'JWT', 'PostgreSQL'],
    color: '#58e6d9',
    featured: false,
  },
  {
    id: 5,
    icon: '🔍',
    name: 'Melodi Log Analysis Tool',
    tagline: 'Intelligent Python log engine',
    description:
      'Created an intelligent log analysis engine using Python and FastAPI that reduced debug time by 40% with pattern detection and automated root-cause reporting.',
    metric: '-40% debug time',
    metricLabel: 'Developer Speed',
    tags: ['FastAPI', 'Python', 'AI/ML', 'PostgreSQL'],
    color: '#39d353',
    featured: false,
  },
  {
    id: 6,
    icon: '🏨',
    name: 'Agastya Heritage',
    tagline: 'Node.js microservices platform',
    description:
      'Microservices for patient and hotel workflow management, improving data integrity and reducing cross-system latency through event-driven architecture.',
    metric: '35% less latency',
    metricLabel: 'Performance',
    tags: ['Microservices', 'Node.js', 'MongoDB', 'RabbitMQ'],
    color: '#f0a53b',
    featured: false,
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12
    setTilt({ x, y })
  }

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 })

  return (
    <div
      ref={cardRef}
      className="reveal group relative"
      style={{
        transitionDelay: `${index * 0.08}s`,
        perspective: '1000px',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative bg-[rgba(13,17,23,0.8)] border border-[#21262d] rounded-xl p-6 overflow-hidden h-full transition-all duration-200 group-hover:border-[rgba(88,230,217,0.25)] group-hover:shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
        style={{
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease, border-color 0.3s, box-shadow 0.3s',
        }}
      >
        {/* Glow corner */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
          style={{ background: project.color }}
        />

        {/* Top line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-11 h-11 rounded-lg bg-[#161b22] border border-[#21262d] flex items-center justify-center text-xl"
            style={{ boxShadow: `0 0 20px ${project.color}20` }}
          >
            {project.icon}
          </div>
          <div className="text-right">
            <div
              className="font-display font-bold text-xl leading-none"
              style={{ color: project.color }}
            >
              {project.metric}
            </div>
            <div className="font-mono text-[10px] text-[#6e7681] mt-0.5">{project.metricLabel}</div>
          </div>
        </div>

        {/* Name */}
        <h3 className="font-display font-bold text-[#e6edf3] text-base mb-1 leading-snug">
          {project.name}
        </h3>
        <p className="font-mono text-xs mb-3" style={{ color: project.color }}>
          {project.tagline}
        </p>

        {/* Desc */}
        <p className="text-[#6e7681] text-sm font-body leading-relaxed mb-5">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-[#161b22] border border-[#21262d] font-mono text-[10px] text-[#6e7681] rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* 3D depth indicator arrow */}
        <div className="absolute bottom-5 right-5 text-[#21262d] group-hover:text-[#6e7681] transition-colors duration-300 text-sm">
          ↗
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
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
    <section id="projects" ref={sectionRef} className="relative py-28 border-t border-[#21262d]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="reveal mb-4">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-[#58e6d9]">// Work</span>
        </div>
        <h2
          className="reveal font-display font-extrabold text-[clamp(32px,5vw,52px)] text-[#e6edf3] tracking-tight leading-none mb-3"
          style={{ transitionDelay: '0.1s' }}
        >
          Key Projects
        </h2>
        <p
          className="reveal text-[#6e7681] font-body text-base mb-14 max-w-xl"
          style={{ transitionDelay: '0.2s' }}
        >
          A selection of production systems I've architected, built, and shipped.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
