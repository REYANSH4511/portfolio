'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 28

export default function NetworkGraph() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const w = container.clientWidth  || 600
    const h = container.clientHeight || 400

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100)
    camera.position.z = 8

    // Build node positions
    const nodePositions: THREE.Vector3[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodePositions.push(new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 4
      ))
    }

    // Build edges
    const lineArr: number[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 2.8) {
          lineArr.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z,
          )
        }
      }
    }
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(lineArr), 3))
    const lines = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ color: 0x58e6d9, transparent: true, opacity: 0.12 })
    )
    scene.add(lines)

    // Build node spheres
    nodePositions.forEach((pos, i) => {
      const color = i % 5 === 0 ? 0x58e6d9 : i % 7 === 0 ? 0x39d353 : 0x6e7681
      const opacity = i % 5 === 0 ? 0.9 : 0.5
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 8, 8),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity })
      )
      mesh.position.copy(pos)
      scene.add(mesh)
    })

    const group = new THREE.Group()
    group.add(lines)
    scene.add(group)

    let rafId = 0
    const clock = new THREE.Clock()
    const tick = () => {
      rafId = requestAnimationFrame(tick)
      const t = clock.getElapsedTime()
      lines.rotation.y = t * 0.08
      lines.rotation.x = Math.sin(t * 0.05) * 0.15
      renderer.render(scene, camera)
    }
    tick()

    const onResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
