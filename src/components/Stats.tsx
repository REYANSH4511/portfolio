'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { num: 4,  suffix: '+', label: 'Years Experience' },
  { num: 7,  suffix: '+', label: 'Major Projects' },
  { num: 45, suffix: '%', label: 'DB Latency Reduced' },
  { num: 60, suffix: '%', label: 'Faster Data Analysis' },
  { num: 40, suffix: '%', label: 'Faster Deployments' },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        const spans = ref.current?.querySelectorAll<HTMLSpanElement>('[data-stat]')
        spans?.forEach((el) => {
          const target = parseInt(el.getAttribute('data-stat') ?? '0', 10)
          let current = 0
          const step = target / 50
          const interval = setInterval(() => {
            current = Math.min(current + step, target)
            el.textContent = String(Math.round(current))
            if (current >= target) clearInterval(interval)
          }, 25)
        })
        observer.disconnect()
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative border-y border-[#21262d] bg-[#0d1117] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#58e6d9] to-transparent opacity-40" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 divide-x divide-[#21262d]">
          {stats.map(({ num, suffix, label }) => (
            <div key={label} className="flex flex-col items-center justify-center py-6 px-4 group">
              <span className="font-display font-extrabold text-3xl lg:text-4xl text-[#58e6d9] leading-none mb-1 group-hover:text-[#39d353] transition-colors duration-300">
                <span data-stat={String(num)}>{num}</span>
                {suffix}
              </span>
              <span className="font-mono text-[10px] text-[#6e7681] uppercase tracking-wider text-center mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39d353] to-transparent opacity-30" />
    </div>
  )
}
