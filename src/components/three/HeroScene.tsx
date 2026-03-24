'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense } from 'react'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Full-screen particle field — self-contained Canvas */}
      <ParticleField />

      {/* Floating geometry — self-contained Canvas, sits on top */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingGeometry />
      </div>
    </div>
  )
}
