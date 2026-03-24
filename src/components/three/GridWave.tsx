'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GridWave() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth  || window.innerWidth
    const h = container.clientHeight || window.innerHeight

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ─────────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.set(0, 0, 7)

    // ── Wave Grid Plane ────────────────────────────────────────────────────────
    const geo = new THREE.PlaneGeometry(24, 16, 48, 32)
    geo.rotateX(-Math.PI / 2.8)
    const mesh = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({
        color:       0x58e6d9,
        wireframe:   true,
        transparent: true,
        opacity:     0.06,
      })
    )
    mesh.position.set(0, -2, -3)
    scene.add(mesh)

    // ── Animation ──────────────────────────────────────────────────────────────
    const posAttr = geo.attributes.position as THREE.BufferAttribute
    const count   = posAttr.count

    // Cache original XY positions so we only animate Z
    const origX = new Float32Array(count)
    const origY = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      origX[i] = posAttr.getX(i)
      origY[i] = posAttr.getY(i)
    }

    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      for (let i = 0; i < count; i++) {
        const x = origX[i]
        const y = origY[i]
        const z = 0.12 * Math.sin(x * 1.2 + t) * Math.cos(y * 1.2 + t * 0.7)
        posAttr.setZ(i, z)
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()

      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ─────────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ────────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
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
