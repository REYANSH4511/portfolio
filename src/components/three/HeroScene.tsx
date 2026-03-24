'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import ParticleField from './ParticleField'
import FloatingGeometry from './FloatingGeometry'

interface HeroSceneProps {
  mousePosition: { x: number; y: number }
}

export default function HeroScene({ mousePosition }: HeroSceneProps) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

      {/* Ambient light */}
      <ambientLight intensity={0.1} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} color="#58e6d9" />

      {/* Particle field in background */}
      <ParticleField count={2500} mousePosition={mousePosition} />

      {/* Main 3D object */}
      <FloatingGeometry />

      {/* Allow subtle orbit on drag */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  )
}
