'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
      }
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`
      }
      requestAnimationFrame(animate)
    }
    animate()

    const grow = () => {
      if (followerRef.current) {
        followerRef.current.style.width = '52px'
        followerRef.current.style.height = '52px'
        followerRef.current.style.borderColor = 'rgba(88,230,217,0.7)'
      }
    }
    const shrink = () => {
      if (followerRef.current) {
        followerRef.current.style.width = '36px'
        followerRef.current.style.height = '36px'
        followerRef.current.style.borderColor = 'rgba(88,230,217,0.35)'
      }
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => { document.removeEventListener('mousemove', onMove) }
  }, [])

  return (
    <>
      <div ref={cursorRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 10, height: 10,
        borderRadius: '50%',
        background: '#58e6d9',
        pointerEvents: 'none',
        zIndex: 10000,
        mixBlendMode: 'difference',
        willChange: 'transform',
      }} />
      <div ref={followerRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 36, height: 36,
        borderRadius: '50%',
        border: '1px solid rgba(88,230,217,0.35)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        transition: 'width 0.2s, height 0.2s, border-color 0.2s',
      }} />
    </>
  )
}
