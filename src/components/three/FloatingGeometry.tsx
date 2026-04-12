'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FloatingGeometry() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = () => container.clientWidth  || 480
    const H = () => container.clientHeight || 480

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W(), H())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100)
    camera.position.set(0, 2, 9)
    camera.lookAt(0, 0, 0)

    // ── LIGHTS ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.05))

    const cyanLight = new THREE.PointLight(0x58e6d9, 4, 15)
    cyanLight.position.set(3, 4, 4)
    scene.add(cyanLight)

    const greenLight = new THREE.PointLight(0x39d353, 2, 12)
    greenLight.position.set(-4, -2, 3)
    scene.add(greenLight)

    const amberLight = new THREE.PointLight(0xf0a53b, 1.5, 10)
    amberLight.position.set(0, -4, -2)
    scene.add(amberLight)

    // ── BLACK HOLE CORE ───────────────────────────────────────────────────────
    // Dark inner sphere
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 64, 64),
      new THREE.MeshStandardMaterial({
        color:     0x000000,
        emissive:  0x000000,
        roughness: 0,
        metalness: 1,
      })
    )
    scene.add(coreMesh)

    // Photon ring — glowing torus around core
    const photonRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.82, 0.06, 32, 200),
      new THREE.MeshBasicMaterial({
        color:       0x58e6d9,
        transparent: true,
        opacity:     1,
        blending:    THREE.AdditiveBlending,
      })
    )
    photonRing.rotation.x = Math.PI / 2.2
    scene.add(photonRing)

    // ── ACCRETION DISK (flat particle ring) ───────────────────────────────────
    const diskCount = 2500  // reduced from 5000
    const diskPos   = new Float32Array(diskCount * 3)
    const diskCol   = new Float32Array(diskCount * 3)

    for (let i = 0; i < diskCount; i++) {
      const angle  = Math.random() * Math.PI * 2
      // Radius distribution: more dense near center
      const r      = 1.1 + Math.pow(Math.random(), 0.5) * 2.8
      const spread = (Math.random() - 0.5) * (0.05 + (r - 1.1) * 0.04)

      diskPos[i * 3]     = Math.cos(angle) * r
      diskPos[i * 3 + 1] = spread
      diskPos[i * 3 + 2] = Math.sin(angle) * r

      // Color: hot white near center → cyan → amber → fade out
      const heat = 1 - (r - 1.1) / 2.8
      diskCol[i * 3]     = heat > 0.7 ? 1 : 0.35 + heat * 0.9
      diskCol[i * 3 + 1] = heat > 0.7 ? 1 : 0.85 * heat
      diskCol[i * 3 + 2] = heat > 0.5 ? 0.85 : heat * 0.4
    }

    const diskGeo = new THREE.BufferGeometry()
    diskGeo.setAttribute('position', new THREE.BufferAttribute(diskPos, 3))
    diskGeo.setAttribute('color',    new THREE.BufferAttribute(diskCol, 3))

    const disk = new THREE.Points(diskGeo, new THREE.PointsMaterial({
      size:         0.04,
      vertexColors: true,
      transparent:  true,
      opacity:      0.9,
      depthWrite:   false,
      blending:     THREE.AdditiveBlending,
      sizeAttenuation: true,
    }))
    disk.rotation.x = Math.PI / 7
    scene.add(disk)

    // ── GRAVITATIONAL LENSING RINGS ───────────────────────────────────────────
    const lensRings = [1.05, 1.15, 1.3, 1.55, 1.9].map((r, i) => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(r, 0.008 - i * 0.001, 8, 180),
        new THREE.MeshBasicMaterial({
          color:       i < 2 ? 0xffffff : 0x58e6d9,
          transparent: true,
          opacity:     0.6 - i * 0.1,
          blending:    THREE.AdditiveBlending,
        })
      )
      mesh.rotation.x = Math.PI / 2.2 + (Math.random() - 0.5) * 0.05
      scene.add(mesh)
      return mesh
    })

    // ── OUTER PARTICLE HALO ───────────────────────────────────────────────────
    const haloCount = 1200
    const haloPos   = new Float32Array(haloCount * 3)
    const haloCol   = new Float32Array(haloCount * 3)
    for (let i = 0; i < haloCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 3.5 + Math.random() * 2
      haloPos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      haloPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3
      haloPos[i * 3 + 2] = r * Math.cos(phi)
      const bright = 0.3 + Math.random() * 0.7
      haloCol[i * 3]     = bright * 0.35
      haloCol[i * 3 + 1] = bright * 0.9
      haloCol[i * 3 + 2] = bright * 0.85
    }
    const haloGeo = new THREE.BufferGeometry()
    haloGeo.setAttribute('position', new THREE.BufferAttribute(haloPos, 3))
    haloGeo.setAttribute('color',    new THREE.BufferAttribute(haloCol, 3))
    const halo = new THREE.Points(haloGeo, new THREE.PointsMaterial({
      vertexColors: true, size: 0.06, transparent: true, opacity: 0.7,
      depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
    }))
    scene.add(halo)

    // ── ORBITING SATELLITES ───────────────────────────────────────────────────
    const satellites = [
      { r: 4.2, speed: 0.6,  color: 0x58e6d9, size: 0.08, tiltX: 0.3, tiltZ: 0 },
      { r: 5.1, speed: -0.4, color: 0xf0a53b, size: 0.06, tiltX: 1.0, tiltZ: 0.5 },
      { r: 3.5, speed: 0.9,  color: 0x39d353, size: 0.05, tiltX: 0.6, tiltZ: 1.2 },
    ].map(d => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(d.size, 8, 8),
        new THREE.MeshBasicMaterial({ color: d.color })
      )
      // Trail: thin torus at orbit radius
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, 0.006, 4, 100),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.12 })
      )
      orbit.rotation.x = d.tiltX
      orbit.rotation.z = d.tiltZ
      scene.add(orbit)
      scene.add(mesh)
      return { mesh, orbit, ...d, offset: Math.random() * Math.PI * 2 }
    })

    // ── MOUSE ─────────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    container.addEventListener('mousemove', onMouseMove)

    // ── ANIMATION ─────────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      // Disk slowly spins — differential rotation (inner faster)
      disk.rotation.y = t * 0.12

      // Photon ring pulses opacity
      const pr = photonRing.material as THREE.MeshBasicMaterial
      pr.opacity = 0.7 + 0.3 * Math.sin(t * 3)

      // Gravitational lens rings shimmer
      lensRings.forEach((r, i) => {
        const mat = r.material as THREE.MeshBasicMaterial
        mat.opacity = (0.5 - i * 0.08) + 0.15 * Math.sin(t * 2 + i)
      })

      // Light flicker
      cyanLight.intensity  = 3.5 + 1.5 * Math.sin(t * 1.7)
      greenLight.intensity = 1.8 + 0.8 * Math.sin(t * 2.3 + 1)

      // Orbit satellites
      satellites.forEach(({ mesh, r, speed, offset, tiltX, tiltZ }) => {
        const a  = t * speed + offset
        const cx = Math.cos(tiltZ)
        const sx = Math.sin(tiltX)
        mesh.position.x = Math.cos(a) * r * cx
        mesh.position.y = Math.sin(a) * r * sx
        mesh.position.z = Math.sin(a) * r * cx
      })

      // Mouse parallax on whole scene
      scene.rotation.y += (mouse.x * 0.3 - scene.rotation.y) * 0.04
      scene.rotation.x += (-mouse.y * 0.15 - scene.rotation.x) * 0.04

      renderer.render(scene, camera)
    }
    tick()

    // ── RESIZE ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = W() / H()
      camera.updateProjectionMatrix()
      renderer.setSize(W(), H())
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      container.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }} />
}
