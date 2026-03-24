'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth  || window.innerWidth
    const h = container.clientHeight || window.innerHeight

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000)
    camera.position.z = 20

    scene.add(new THREE.AmbientLight(0xffffff, 0.5))

    // ── Star Field ────────────────────────────────────────────────────────────
    const starCount = 4000
    const starPos   = new Float32Array(starCount * 3)
    const starCol   = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r     = 80 + Math.random() * 120
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      starPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
      const t = Math.random()
      starCol[i * 3]     = 0.35 + t * 0.65
      starCol[i * 3 + 1] = 0.9  - t * 0.1
      starCol[i * 3 + 2] = 0.85 - t * 0.1
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color',    new THREE.BufferAttribute(starCol, 3))
    const starMat = new THREE.PointsMaterial({
      vertexColors: true,
      size:         0.4,
      sizeAttenuation: true,
      depthWrite:   false,
      transparent:  true,
      opacity:      0.85,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ── Near Particles ────────────────────────────────────────────────────────
    const nearCount = 800
    const nearPos   = new Float32Array(nearCount * 3)
    for (let i = 0; i < nearCount; i++) {
      nearPos[i * 3]     = (Math.random() - 0.5) * 50
      nearPos[i * 3 + 1] = (Math.random() - 0.5) * 50
      nearPos[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    const nearGeo = new THREE.BufferGeometry()
    nearGeo.setAttribute('position', new THREE.BufferAttribute(nearPos, 3))
    const nearMat = new THREE.PointsMaterial({
      color:        0x58e6d9,
      size:         0.15,
      sizeAttenuation: true,
      depthWrite:   false,
      transparent:  true,
      opacity:      0.6,
    })
    const nearParticles = new THREE.Points(nearGeo, nearMat)
    scene.add(nearParticles)

    // ── Rotating Torus ────────────────────────────────────────────────────────
    const torus1 = new THREE.Mesh(
      new THREE.TorusGeometry(3, 0.08, 16, 80),
      new THREE.MeshBasicMaterial({ color: 0x58e6d9, transparent: true, opacity: 0.25, wireframe: true })
    )
    torus1.position.set(4, 0, -8)
    scene.add(torus1)

    const torus2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.8, 0.04, 8, 60),
      new THREE.MeshBasicMaterial({ color: 0x39d353, transparent: true, opacity: 0.2, wireframe: true })
    )
    torus2.position.set(4, 0, -8)
    scene.add(torus2)

    const glowSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x58e6d9, transparent: true, opacity: 0.9 })
    )
    glowSphere.position.set(4, 0, -8)
    scene.add(glowSphere)

    // ── Floating Icosahedron ──────────────────────────────────────────────────
    const ico = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({ color: 0xf0a53b, wireframe: true, transparent: true, opacity: 0.3 })
    )
    ico.position.set(-5, 0, -5)
    scene.add(ico)

    // ── Mouse tracking ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Animation ─────────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      stars.rotation.x = t * 0.03
      stars.rotation.y = t * 0.015

      nearParticles.rotation.y += (mouse.x * 0.25 - nearParticles.rotation.y) * 0.05
      nearParticles.rotation.x += (-mouse.y * 0.15 - nearParticles.rotation.x) * 0.05
      nearParticles.rotation.z += 0.001

      torus1.rotation.x = t * 0.3
      torus1.rotation.y = t * 0.2
      torus2.rotation.x = -t * 0.2
      torus2.rotation.z =  t * 0.15

      ico.rotation.x = t * 0.25
      ico.rotation.y = t * 0.35
      ico.position.y = Math.sin(t * 0.8) * 0.4

      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  )
}
