import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function NavOrb({ position, color, scale = 1 }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.2
    meshRef.current.rotation.y = time * 0.3
    
    // Pulsing glow
    if (glowRef.current) {
      const pulse = Math.sin(time * 2) * 0.2 + 1
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[scale * 1.3, 32, 32]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
        
        <Sphere ref={meshRef} args={[scale, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            distort={0.5}
            speed={3}
            roughness={0.05}
            metalness={0.95}
            emissive={color}
            emissiveIntensity={0.8}
          />
        </Sphere>
        
        <Sparkles count={15} scale={scale * 2} size={2} speed={0.5} color={color} />
      </group>
    </Float>
  )
}

function ParticleWave() {
  const pointsRef = useRef()
  const particleCount = 1500

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)
    const colorOptions = [
      new THREE.Color('#00d4ff'),
      new THREE.Color('#ff00ff'),
      new THREE.Color('#00ff88')
    ]
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
      
      const color = colorOptions[Math.floor(Math.random() * colorOptions.length)]
      col[i * 3] = color.r
      col[i * 3 + 1] = color.g
      col[i * 3 + 2] = color.b
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Navigation3DBackground() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.7
    }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 1.5]}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={1} color="#ff00ff" />

        <NavOrb position={[-3, 0, -2]} color="#00d4ff" scale={0.4} />
        <NavOrb position={[3, 0, -2]} color="#ff00ff" scale={0.3} />
        <NavOrb position={[0, 1, -3]} color="#00ff88" scale={0.35} />

        <ParticleWave />

        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
