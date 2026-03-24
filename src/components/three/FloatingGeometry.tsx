'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FloatingGeometry() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth || 480
    const h = container.clientHeight || 480

    // ── Renderer ────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Scene & Camera ───────────────────────────────────────────────────────
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)
    camera.position.z = 5

    // ── Lights ───────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const light1 = new THREE.PointLight(0x58e6d9, 1, 20)
    light1.position.set(5, 5, 5)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x39d353, 0.5, 20)
    light2.position.set(-5, -5, -5)
    scene.add(light2)

    // ── Glow Orb (distorted sphere approximated with subdivided ico) ─────────
    const orbGeo = new THREE.IcosahedronGeometry(1.2, 4)
    const orbMat = new THREE.MeshStandardMaterial({
      color:            0x58e6d9,
      emissive:         0x58e6d9,
      emissiveIntensity: 0.25,
      roughness:        0.1,
      metalness:        0.8,
      transparent:      true,
      opacity:          0.85,
      wireframe:        false,
    })
    const orb = new THREE.Mesh(orbGeo, orbMat)
    scene.add(orb)

    // store original positions for distortion animation
    const origPos = Float32Array.from(orbGeo.attributes.position.array as Float32Array)

    // ── Orbit Rings ──────────────────────────────────────────────────────────
    const rings: { mesh: THREE.Mesh; speed: number }[] = [
      { radius: 2.2, speed:  0.4,  color: 0x58e6d9, tilt: 0.3  },
      { radius: 2.8, speed: -0.3,  color: 0xf0a53b, tilt: 1.0  },
      { radius: 3.4, speed:  0.2,  color: 0x39d353, tilt: 1.6  },
    ].map(({ radius, speed, color, tilt }) => {
      const geo  = new THREE.TorusGeometry(radius, 0.015, 8, 100)
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.rotation.x = tilt
      scene.add(mesh)
      return { mesh, speed }
    })

    // ── Satellites ───────────────────────────────────────────────────────────
    const satellites: { mesh: THREE.Mesh; radius: number; speed: number; offset: number }[] = [
      { radius: 2.2, speed:  0.4,  color: 0x58e6d9, offset: 0 },
      { radius: 2.8, speed: -0.3,  color: 0xf0a53b, offset: 2 },
      { radius: 3.4, speed:  0.2,  color: 0x39d353, offset: 4 },
    ].map(({ radius, speed, color, offset }) => {
      const geo  = new THREE.SphereGeometry(0.07, 8, 8)
      const mat  = new THREE.MeshBasicMaterial({ color })
      const mesh = new THREE.Mesh(geo, mat)
      scene.add(mesh)
      return { mesh, radius, speed, offset }
    })

    // ── Animation ────────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Rotate orb
      orb.rotation.x = t * 0.2
      orb.rotation.y = t * 0.3

      // Gently distort orb vertices
      const posArr = orbGeo.attributes.position.array as Float32Array
      for (let i = 0; i < posArr.length; i += 3) {
        const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2]
        const noise = 0.08 * Math.sin(ox * 3 + t * 2) * Math.cos(oy * 3 + t * 1.5)
        posArr[i]     = ox + ox * noise
        posArr[i + 1] = oy + oy * noise
        posArr[i + 2] = oz + oz * noise
      }
      orbGeo.attributes.position.needsUpdate = true
      orbGeo.computeVertexNormals()

      // Spin rings
      rings.forEach(({ mesh, speed }) => {
        mesh.rotation.z = t * speed
      })

      // Orbit satellites
      satellites.forEach(({ mesh, radius, speed, offset }) => {
        const a = t * speed + offset
        mesh.position.x = Math.cos(a) * radius
        mesh.position.y = Math.sin(a) * radius * 0.4
        mesh.position.z = Math.sin(a) * radius * 0.3
      })

      renderer.render(scene, camera)
    }
    tick()

    // ── Resize ───────────────────────────────────────────────────────────────
    const onResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    // ── Cleanup ──────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
}
