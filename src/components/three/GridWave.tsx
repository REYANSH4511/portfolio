'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Animated grid / wave plane behind the hero
export default function GridWave() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (!meshRef.current) return
    const geo = meshRef.current.geometry as THREE.PlaneGeometry
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z = 0.12 * Math.sin(x * 1.2 + t) * Math.cos(y * 1.2 + t * 0.7)
      pos.setZ(i, z)
    }
    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2.8, 0, 0]} position={[0, -2, -3]}>
      <planeGeometry args={[24, 16, 48, 32]} />
      <meshBasicMaterial
        color="#58e6d9"
        wireframe
        opacity={0.06}
        transparent
      />
    </mesh>
  )
}
