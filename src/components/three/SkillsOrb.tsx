'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface MiniSceneProps {
  type: 'frontend' | 'backend' | 'database' | 'devops' | 'ai' | 'security'
  color: string
}

export default function SkillsOrb({ type, color }: MiniSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = () => container.clientWidth  || 80
    const H = () => container.clientHeight || 80

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W(), H())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W() / H(), 0.1, 50)
    camera.position.z = 3.5

    const c = new THREE.Color(color)
    scene.add(new THREE.AmbientLight(0xffffff, 0.2))
    const light = new THREE.PointLight(c, 3, 8)
    light.position.set(2, 2, 2)
    scene.add(light)

    let mainMesh: THREE.Object3D | null = null
    let rafId = 0
    const clock = new THREE.Clock()

    if (type === 'frontend') {
      // Rotating cube with glowing edges
      const geo = new THREE.BoxGeometry(1.4, 1.4, 1.4)
      const mat = new THREE.MeshStandardMaterial({
        color: c, emissive: c, emissiveIntensity: 0.2,
        roughness: 0.1, metalness: 0.9, transparent: true, opacity: 0.7,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: c })
      ))
      mainMesh = mesh
      scene.add(mesh)

    } else if (type === 'backend') {
      // Torus knot
      const geo = new THREE.TorusKnotGeometry(0.7, 0.22, 100, 16)
      mainMesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color: c, emissive: c, emissiveIntensity: 0.3,
        roughness: 0.1, metalness: 0.8,
      }))
      scene.add(mainMesh)

    } else if (type === 'database') {
      // Stacked cylinders
      const group = new THREE.Group()
      for (let i = 0; i < 3; i++) {
        const disk = new THREE.Mesh(
          new THREE.CylinderGeometry(0.8, 0.8, 0.25, 32),
          new THREE.MeshStandardMaterial({
            color: c, emissive: c,
            emissiveIntensity: 0.2 + i * 0.1,
            roughness: 0.2, metalness: 0.8,
            transparent: true, opacity: 0.9 - i * 0.1,
          })
        )
        disk.position.y = i * 0.45 - 0.45
        group.add(disk)

        // Edge ring — set position directly, never via Object.assign
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.8, 0.03, 8, 32),
          new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.6 })
        )
        ring.position.y = i * 0.45 - 0.45
        group.add(ring)
      }
      mainMesh = group
      scene.add(group)

    } else if (type === 'devops') {
      // Octahedron diamond
      const geo = new THREE.OctahedronGeometry(1.0, 0)
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color: c, emissive: c, emissiveIntensity: 0.4,
        roughness: 0, metalness: 1, transparent: true, opacity: 0.85,
      }))
      mesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: c })
      ))
      mainMesh = mesh
      scene.add(mesh)

    } else if (type === 'ai') {
      // Wireframe icosahedron + particle halo
      const group = new THREE.Group()
      const geo  = new THREE.IcosahedronGeometry(0.8, 1)
      group.add(new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color: c, emissive: c, emissiveIntensity: 0.5,
        roughness: 0.0, metalness: 0.9, wireframe: true,
      })))

      const pCount = 120
      const pPos   = new Float32Array(pCount * 3)
      for (let i = 0; i < pCount; i++) {
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        const r     = 1.2 + Math.random() * 0.5
        pPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pPos[i * 3 + 2] = r * Math.cos(phi)
      }
      const pGeo = new THREE.BufferGeometry()
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3))
      group.add(new THREE.Points(pGeo, new THREE.PointsMaterial({
        color: c, size: 0.06, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })))

      mainMesh = group
      scene.add(group)

    } else {
      // Security — dodecahedron
      const geo  = new THREE.DodecahedronGeometry(0.9, 0)
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
        color: c, emissive: c, emissiveIntensity: 0.3,
        roughness: 0.1, metalness: 0.9,
      }))
      mesh.add(new THREE.LineSegments(
        new THREE.EdgesGeometry(geo),
        new THREE.LineBasicMaterial({ color: c, transparent: true, opacity: 0.6 })
      ))
      mainMesh = mesh
      scene.add(mesh)
    }

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      if (mainMesh) {
        mainMesh.rotation.x = t * 0.4
        mainMesh.rotation.y = t * 0.6
        mainMesh.rotation.z = t * 0.2
      }
      light.intensity = 2.5 + 1.5 * Math.sin(t * 2)
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
      renderer.setSize(W(), H())
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [type, color])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
