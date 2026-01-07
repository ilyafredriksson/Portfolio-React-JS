import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as random from 'maath/random/dist/maath-random.esm'
import * as THREE from 'three'

function ParticleSystem({ count = 7000 }) {
  const ref = useRef()
  const { mouse } = useThree()
  
  const [sphere, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const particleColors = new Float32Array(count * 3)
    const particles = random.inSphere(new Float32Array(count * 3), { radius: 15 })
    
    const colorPalette = [
      new THREE.Color('#00d4ff'), // Cyan
      new THREE.Color('#ff00ff'), // Magenta
      new THREE.Color('#00ff88'), // Green
      new THREE.Color('#ffd700'), // Gold
      new THREE.Color('#8800ff')  // Purple
    ]
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = particles[i * 3]
      positions[i * 3 + 1] = particles[i * 3 + 1]
      positions[i * 3 + 2] = particles[i * 3 + 2]
      
      const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      const variation = Math.random() * 0.3 - 0.15
      const color = baseColor.clone()
      color.offsetHSL(variation, 0, 0)
      
      particleColors[i * 3] = color.r
      particleColors[i * 3 + 1] = color.g
      particleColors[i * 3 + 2] = color.b
    }
    
    return [positions, particleColors]
  }, [count])

  useFrame((state, delta) => {
    // Slow rotation
    ref.current.rotation.x -= delta / 15
    ref.current.rotation.y -= delta / 20
    
    // Mouse interaction - subtle follow
    ref.current.rotation.x += (mouse.y * 0.1 - ref.current.rotation.x) * 0.02
    ref.current.rotation.y += (mouse.x * 0.1 - ref.current.rotation.y) * 0.02
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <bufferAttribute
          attach="geometry-attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
        <PointMaterial
          transparent
          vertexColors
          size={0.025}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export default function Interactive3DParticles() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%', 
      zIndex: -1,
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} dpr={[1, 2]}>
        <ParticleSystem />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
