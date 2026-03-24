'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

// ── GlowOrb ─────────────────────────────────────────────────────────────────
function GlowOrb() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.2
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.2, 64, 64]} />
      <MeshDistortMaterial
        color="#58e6d9"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.8}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

// ── OrbitRing ────────────────────────────────────────────────────────────────
interface OrbitRingProps {
  radius: number
  speed: number
  color: string
  tilt: number
}

function OrbitRing({ radius, speed, color, tilt }: OrbitRingProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed
    }
  })

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.015, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </mesh>
  )
}

// ── Satellite ────────────────────────────────────────────────────────────────
interface SatelliteProps {
  radius: number
  speed: number
  color: string
  offset: number
}

function Satellite({ radius, speed, color, offset }: SatelliteProps) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * speed + offset
      ref.current.position.x = Math.cos(t) * radius
      ref.current.position.y = Math.sin(t) * radius * 0.4
      ref.current.position.z = Math.sin(t) * radius * 0.3
    }
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

// ── Default export ───────────────────────────────────────────────────────────
export default function FloatingGeometry() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#58e6d9" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#39d353" />
        <GlowOrb />
        <OrbitRing radius={2.2} speed={0.4}  color="#58e6d9" tilt={0.3} />
        <OrbitRing radius={2.8} speed={-0.3} color="#f0a53b" tilt={1.0} />
        <OrbitRing radius={3.4} speed={0.2}  color="#39d353" tilt={1.6} />
        <Satellite radius={2.2} speed={0.4}  color="#58e6d9" offset={0} />
        <Satellite radius={2.8} speed={-0.3} color="#f0a53b" offset={2} />
        <Satellite radius={3.4} speed={0.2}  color="#39d353" offset={4} />
      </Canvas>
    </div>
  )
}
