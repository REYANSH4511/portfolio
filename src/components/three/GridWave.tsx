'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function GridWave() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = () => container.clientWidth  || window.innerWidth
    const H = () => container.clientHeight || window.innerHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W(), H())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 200)
    camera.position.set(0, 4, 12)
    camera.lookAt(0, -2, 0)

    // ── HOLOGRAPHIC WAVE GRID ─────────────────────────────────────────────────
    const segments = 80
    const geo = new THREE.PlaneGeometry(32, 20, segments, segments)
    geo.rotateX(-Math.PI / 2)

    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x58e6d9, wireframe: true, transparent: true, opacity: 0.07
    })
    const waveMesh = new THREE.Mesh(geo, waveMat)
    waveMesh.position.y = -3
    scene.add(waveMesh)

    // Second grid layer — offset phase, different color
    const geo2 = new THREE.PlaneGeometry(32, 20, 40, 40)
    geo2.rotateX(-Math.PI / 2)
    const wave2 = new THREE.Mesh(geo2, new THREE.MeshBasicMaterial({
      color: 0x39d353, wireframe: true, transparent: true, opacity: 0.03
    }))
    wave2.position.y = -3
    scene.add(wave2)

    // ── ENERGY SCAN LINE ──────────────────────────────────────────────────────
    const scanGeo = new THREE.PlaneGeometry(32, 0.05, 1, 1)
    scanGeo.rotateX(-Math.PI / 2)
    const scanMesh = new THREE.Mesh(scanGeo, new THREE.MeshBasicMaterial({
      color: 0x58e6d9, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending,
    }))
    scanMesh.position.y = -3
    scene.add(scanMesh)

    const posAttr  = geo.attributes.position  as THREE.BufferAttribute
    const posAttr2 = geo2.attributes.position as THREE.BufferAttribute
    const count    = posAttr.count
    const count2   = posAttr2.count
    const origX    = new Float32Array(count)
    const origZ    = new Float32Array(count)
    const origX2   = new Float32Array(count2)
    const origZ2   = new Float32Array(count2)

    for (let i = 0; i < count; i++) {
      origX[i] = posAttr.getX(i)
      origZ[i] = posAttr.getZ(i)
    }
    for (let i = 0; i < count2; i++) {
      origX2[i] = posAttr2.getX(i)
      origZ2[i] = posAttr2.getZ(i)
    }

    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Wave 1 — flowing ripple
      for (let i = 0; i < count; i++) {
        const x = origX[i]
        const z = origZ[i]
        const y = 0.35 * Math.sin(x * 0.5 + t * 1.2)
                + 0.2  * Math.sin(z * 0.4 + t * 0.8)
                + 0.15 * Math.sin((x + z) * 0.3 + t)
        posAttr.setY(i, y)
      }
      posAttr.needsUpdate = true

      // Wave 2 — counter phase
      for (let i = 0; i < count2; i++) {
        const x = origX2[i]
        const z = origZ2[i]
        const y = 0.2 * Math.sin(x * 0.6 - t * 1.0)
                + 0.15 * Math.cos(z * 0.5 - t * 0.6)
        posAttr2.setY(i, y)
      }
      posAttr2.needsUpdate = true

      // Scan line sweeps across
      scanMesh.position.z = -10 + ((t * 3) % 20)
      const scanMat = scanMesh.material as THREE.MeshBasicMaterial
      scanMat.opacity = 0.3 + 0.4 * Math.abs(Math.sin(t * 1.5))

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
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
