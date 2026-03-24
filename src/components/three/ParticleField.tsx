/// <reference types="@react-three/fiber" />
'use client'
import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function StarField() {
  const ref = useRef<THREE.Points>(null)

  const { positions, colors } = useMemo(() => {
    const count = 4000
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const t = Math.random()
      colors[i * 3]     = 0.35 + t * 0.65
      colors[i * 3 + 1] = 0.9  - t * 0.1
      colors[i * 3 + 2] = 0.85 - t * 0.1
    }
    return { positions, colors }
  }, [])

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color',    new THREE.BufferAttribute(colors,    3))
    return g
  }, [positions, colors])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.03
      ref.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        vertexColors
        size={0.4}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.85}
      />
    </points>
  )
}

function NearParticles() {
  const ref = useRef<THREE.Points>(null)

  const geo = useMemo(() => {
    const count = 800
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 50
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y, state.mouse.x * 0.25, 0.05
      )
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x, -state.mouse.y * 0.15, 0.05
      )
      ref.current.rotation.z += 0.001
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#58e6d9"
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        transparent
        opacity={0.6}
      />
    </points>
  )
}

function RotatingTorus() {
  const ref1 = useRef<THREE.Mesh>(null)
  const ref2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref1.current) {
      ref1.current.rotation.x = state.clock.elapsedTime * 0.3
      ref1.current.rotation.y = state.clock.elapsedTime * 0.2
    }
    if (ref2.current) {
      ref2.current.rotation.x = -state.clock.elapsedTime * 0.2
      ref2.current.rotation.z =  state.clock.elapsedTime * 0.15
    }
  })

  return (
    <>
      <mesh ref={ref1} position={[4, 0, -8]}>
        <torusGeometry args={[3, 0.08, 16, 80]} />
        <meshBasicMaterial color="#58e6d9" transparent opacity={0.25} wireframe />
      </mesh>
      <mesh ref={ref2} position={[4, 0, -8]}>
        <torusGeometry args={[1.8, 0.04, 8, 60]} />
        <meshBasicMaterial color="#39d353" transparent opacity={0.2} wireframe />
      </mesh>
      <mesh position={[4, 0, -8]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#58e6d9" transparent opacity={0.9} />
      </mesh>
    </>
  )
}

function FloatingIcosahedron() {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.25
      ref.current.rotation.y = state.clock.elapsedTime * 0.35
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.4
    }
  })

  return (
    <mesh ref={ref} position={[-5, 0, -5]}>
      <icosahedronGeometry args={[1.5, 1]} />
      <meshBasicMaterial color="#f0a53b" wireframe transparent opacity={0.3} />
    </mesh>
  )
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <StarField />
        <NearParticles />
        <RotatingTorus />
        <FloatingIcosahedron />
      </Canvas>
    </div>
  )
}
