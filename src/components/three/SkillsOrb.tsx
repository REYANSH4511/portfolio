'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SkillsOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const w = container.clientWidth || 400
    const h = container.clientHeight || 400

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 3.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Main orb
    const orbGeo = new THREE.SphereGeometry(1, 32, 32)
    const orbMat = new THREE.MeshPhongMaterial({
      color: '#0d1117',
      emissive: '#58e6d9',
      emissiveIntensity: 0.06,
      transparent: true,
      opacity: 0.7,
      shininess: 100,
    })
    const orb = new THREE.Mesh(orbGeo, orbMat)
    scene.add(orb)

    // Grid lines on sphere (latitude/longitude)
    for (let i = 0; i < 6; i++) {
      const lat = (i / 5) * Math.PI - Math.PI / 2
      const r = Math.cos(lat) * 1.01
      const y = Math.sin(lat) * 1.01
      const lineGeo = new THREE.TorusGeometry(r, 0.005, 6, 64)
      const lineMat = new THREE.MeshBasicMaterial({
        color: '#58e6d9',
        transparent: true,
        opacity: 0.2,
      })
      const line = new THREE.Mesh(lineGeo, lineMat)
      line.position.y = y
      scene.add(line)
    }

    // Vertical rings
    for (let i = 0; i < 4; i++) {
      const vGeo = new THREE.TorusGeometry(1.01, 0.005, 6, 64)
      const vMat = new THREE.MeshBasicMaterial({
        color: '#39d353',
        transparent: true,
        opacity: 0.15,
      })
      const vMesh = new THREE.Mesh(vGeo, vMat)
      vMesh.rotation.y = (i / 4) * Math.PI
      scene.add(vMesh)
    }

    // Glow outer sphere
    const glowGeo = new THREE.SphereGeometry(1.15, 32, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: '#58e6d9',
      transparent: true,
      opacity: 0.04,
      side: THREE.BackSide,
    })
    scene.add(new THREE.Mesh(glowGeo, glowMat))

    const light = new THREE.PointLight('#58e6d9', 3, 8)
    light.position.set(2, 2, 2)
    scene.add(light)
    scene.add(new THREE.AmbientLight('#ffffff', 0.2))

    let rafId = 0
    let t = 0
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      t += 0.008
      orb.rotation.y += 0.005
      orb.rotation.x = Math.sin(t) * 0.1
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      const nw = container.clientWidth
      const nh = container.clientHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
}
