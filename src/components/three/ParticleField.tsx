'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = () => container.clientWidth  || window.innerWidth
    const H = () => container.clientHeight || window.innerHeight

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W(), H())
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 2000)
    camera.position.set(0, 0, 18)

    // ── GALAXY ARMS ───────────────────────────────────────────────────────────
    const galaxyCount = 6000
    const galaxyPos   = new Float32Array(galaxyCount * 3)
    const galaxyCol   = new Float32Array(galaxyCount * 3)
    const galaxySize  = new Float32Array(galaxyCount)

    const insideColor  = new THREE.Color('#58e6d9')
    const outsideColor = new THREE.Color('#0d1f2d')
    const accentColor  = new THREE.Color('#39d353')

    for (let i = 0; i < galaxyCount; i++) {
      const radius    = Math.random() * 14
      const spinAngle = radius * 1.8
      const branchAngle = ((i % 3) / 3) * Math.PI * 2

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.6

      galaxyPos[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + randomX
      galaxyPos[i * 3 + 1] = randomY * 0.4
      galaxyPos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = insideColor.clone()
      if (i % 15 === 0) {
        mixedColor.copy(accentColor)
      } else {
        mixedColor.lerp(outsideColor, radius / 14)
      }
      galaxyCol[i * 3]     = mixedColor.r
      galaxyCol[i * 3 + 1] = mixedColor.g
      galaxyCol[i * 3 + 2] = mixedColor.b
      galaxySize[i] = Math.random() * 2 + 0.5
    }

    const galaxyGeo = new THREE.BufferGeometry()
    galaxyGeo.setAttribute('position', new THREE.BufferAttribute(galaxyPos, 3))
    galaxyGeo.setAttribute('color',    new THREE.BufferAttribute(galaxyCol, 3))

    const galaxyMat = new THREE.PointsMaterial({
      size:            0.08,
      sizeAttenuation: true,
      vertexColors:    true,
      transparent:     true,
      opacity:         0.9,
      depthWrite:      false,
      blending:        THREE.AdditiveBlending,
    })
    const galaxy = new THREE.Points(galaxyGeo, galaxyMat)
    galaxy.rotation.x = Math.PI * 0.15
    galaxy.position.z = -8
    scene.add(galaxy)

    // ── DNA DOUBLE HELIX ──────────────────────────────────────────────────────
    const helixGroup = new THREE.Group()
    const helixCount = 300
    const helixRadius = 2.5
    const helixHeight = 20

    for (let strand = 0; strand < 2; strand++) {
      const strandOffset = strand * Math.PI
      for (let i = 0; i < helixCount; i++) {
        const t   = (i / helixCount) * Math.PI * 8
        const y   = (i / helixCount) * helixHeight - helixHeight / 2

        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 8, 8),
          new THREE.MeshBasicMaterial({
            color:       strand === 0 ? 0x58e6d9 : 0x39d353,
            transparent: true,
            opacity:     0.85,
          })
        )
        sphere.position.set(
          Math.cos(t + strandOffset) * helixRadius,
          y,
          Math.sin(t + strandOffset) * helixRadius
        )
        helixGroup.add(sphere)

        // Rungs every 10 particles
        if (i % 10 === 0) {
          const pos1 = new THREE.Vector3(
            Math.cos(t) * helixRadius, y, Math.sin(t) * helixRadius
          )
          const pos2 = new THREE.Vector3(
            Math.cos(t + Math.PI) * helixRadius, y, Math.sin(t + Math.PI) * helixRadius
          )
          const rungGeo = new THREE.BufferGeometry().setFromPoints([pos1, pos2])
          const rung = new THREE.Line(
            rungGeo,
            new THREE.LineBasicMaterial({ color: 0xf0a53b, transparent: true, opacity: 0.3 })
          )
          helixGroup.add(rung)
        }
      }
    }
    helixGroup.position.set(-6, 0, 0)
    helixGroup.scale.setScalar(0.5)
    scene.add(helixGroup)

    // ── LASER GRID ────────────────────────────────────────────────────────────
    const gridGroup = new THREE.Group()
    const gridSize  = 40
    const gridStep  = 4
    const gridMat   = new THREE.LineBasicMaterial({
      color: 0x58e6d9, transparent: true, opacity: 0.04
    })

    for (let x = -gridSize; x <= gridSize; x += gridStep) {
      const pts = [
        new THREE.Vector3(x, -8, -gridSize),
        new THREE.Vector3(x, -8,  gridSize),
      ]
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))
    }
    for (let z = -gridSize; z <= gridSize; z += gridStep) {
      const pts = [
        new THREE.Vector3(-gridSize, -8, z),
        new THREE.Vector3( gridSize, -8, z),
      ]
      gridGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), gridMat))
    }
    // Perspective: tilt slightly
    gridGroup.rotation.x = -0.1
    scene.add(gridGroup)

    // ── FLOATING RINGS ────────────────────────────────────────────────────────
    const ringData = [
      { r: 5,  tube: 0.02, color: 0x58e6d9, tilt: 0.4,  speed: 0.15,  x: 5,  y: 1  },
      { r: 3.5,tube: 0.015,color: 0x39d353, tilt: 1.2,  speed: -0.2,  x: -4, y: -1 },
      { r: 7,  tube: 0.01, color: 0xf0a53b, tilt: 0.8,  speed: 0.1,   x: 0,  y: 3  },
    ]
    const rings = ringData.map(d => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(d.r, d.tube, 8, 120),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.4 })
      )
      mesh.rotation.x = d.tilt
      mesh.position.set(d.x, d.y, -5)
      scene.add(mesh)
      return { mesh, speed: d.speed }
    })

    // ── NEBULA CLOUD ──────────────────────────────────────────────────────────
    const nebCount = 800
    const nebPos   = new Float32Array(nebCount * 3)
    const nebCol   = new Float32Array(nebCount * 3)
    for (let i = 0; i < nebCount; i++) {
      nebPos[i * 3]     = (Math.random() - 0.5) * 30
      nebPos[i * 3 + 1] = (Math.random() - 0.5) * 15
      nebPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5
      const c = Math.random()
      nebCol[i * 3]     = c < 0.5 ? 0.35 : 0.15
      nebCol[i * 3 + 1] = c < 0.5 ? 0.9  : 0.82
      nebCol[i * 3 + 2] = c < 0.5 ? 0.85 : 0.2
    }
    const nebGeo = new THREE.BufferGeometry()
    nebGeo.setAttribute('position', new THREE.BufferAttribute(nebPos, 3))
    nebGeo.setAttribute('color',    new THREE.BufferAttribute(nebCol, 3))
    const nebula = new THREE.Points(nebGeo, new THREE.PointsMaterial({
      vertexColors: true, size: 0.25, sizeAttenuation: true,
      transparent: true, opacity: 0.35, depthWrite: false,
      blending: THREE.AdditiveBlending,
    }))
    scene.add(nebula)

    // ── MOUSE ─────────────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 }
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── ANIMATION ─────────────────────────────────────────────────────────────
    let rafId = 0
    const clock = new THREE.Clock()

    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()

      galaxy.rotation.y  = t * 0.04
      helixGroup.rotation.y = t * 0.3
      nebula.rotation.y  = t * 0.01
      nebula.rotation.x  = t * 0.005

      rings.forEach(({ mesh, speed }) => { mesh.rotation.z = t * speed })

      // Subtle mouse parallax on camera
      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03
      camera.position.y += (-mouse.y * 1.0 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

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
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
}
