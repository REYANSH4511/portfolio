'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { num: '4+', label: 'Years Experience', suffix: '' },
  { num: '7', label: 'Major Projects', suffix: '+' },
  { num: '45', label: 'DB Latency Reduced', suffix: '%' },
  { num: '60', label: 'Faster Data Analysis', suffix: '%' },
  { num: '40', label: 'Faster Deployments', suffix: '%' },
]


export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const counters = ref.current?.querySelectorAll('[data-count]')
          counters?.forEach(el => {
            const target = parseInt(el.getAttribute('data-count') || '0')
            let current = 0
            const step = target / 50
            const interval = setInterval(() => {
              current = Math.min(current + step, target)
              el.textContent = Math.round(current).toString()
              if (current >= target) clearInterval(interval)
            }, 25)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative border-y border-[#21262d] bg-[#0d1117] overflow-hidden">
      {/* Glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#58e6d9] to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 divide-x divide-[#21262d]">
          {stats.map(({ num, label, suffix }, i) => (
            <div key={label} className="flex flex-col items-center justify-center py-6 px-4 group">
              <span className="font-display font-extrabold text-3xl lg:text-4xl text-[#58e6d9] leading-none mb-1 group-hover:text-[#39d353] transition-colors duration-300">
                {num.includes('+') ? (
                  <><span data-count={num.replace('+', '')}>{num.replace('+', '')}</span>+</>
                ) : (
                  <><span data-count={num}>{num}</span>{suffix}</>
                )}
              </span>
              <span className="font-mono text-[10px] text-[#6e7681] uppercase tracking-wider text-center mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39d353] to-transparent opacity-30" />
    </div>
  )
}
