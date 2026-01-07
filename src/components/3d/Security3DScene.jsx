import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, Box, Torus, MeshDistortMaterial, Environment, Sparkles, Trail, Cylinder } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function SecurityShield({ position, color, index }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y = time * 0.5 + index
    meshRef.current.rotation.z = Math.sin(time + index) * 0.2
    
    // Pulsing glow effect
    if (glowRef.current) {
      const pulse = Math.sin(time * 3 + index) * 0.3 + 0.7
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group position={position}>
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[0.75, 32, 32]}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </Sphere>

        <group ref={meshRef}>
          <Sphere args={[0.6, 32, 32]}>
            <MeshDistortMaterial
              color={color}
              attach="material"
              distort={0.4}
              speed={3}
              roughness={0.05}
              metalness={0.95}
              emissive={color}
              emissiveIntensity={0.8}
            />
          </Sphere>
          <Torus args={[0.8, 0.12, 16, 32]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
              color={color}
              wireframe
              emissive={color}
              emissiveIntensity={1.2}
            />
          </Torus>
          <Torus args={[0.9, 0.08, 16, 32]} rotation={[0, Math.PI / 2, 0]}>
            <meshStandardMaterial
              color={color}
              wireframe
              emissive={color}
              emissiveIntensity={1.2}
            />
          </Torus>
        </group>

        <Sparkles count={25} scale={2} size={2} speed={0.5} color={color} />
      </group>
    </Float>
  )
}

function ParticleRing() {
  const pointsRef = useRef()
  const particleCount = 300
  const radius = 5

  const positions = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2
    positions[i * 3] = Math.cos(angle) * radius
    positions[i * 3 + 1] = Math.sin(angle) * 0.5
    positions[i * 3 + 2] = Math.sin(angle) * radius
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.3
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
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#00d4ff"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

function LaserBeams({ shields }) {
  const beams = useMemo(() => {
    const arr = []
    for (let i = 0; i < shields.length; i++) {
      for (let j = i + 1; j < shields.length; j++) {
        const start = shields[i].position
        const end = shields[j].position
        const distance = Math.sqrt(
          Math.pow(end[0] - start[0], 2) +
          Math.pow(end[1] - start[1], 2) +
          Math.pow(end[2] - start[2], 2)
        )
        const midpoint = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2,
          (start[2] + end[2]) / 2
        ]
        const angle = Math.atan2(end[2] - start[2], end[0] - start[0])
        arr.push({ midpoint, distance, angle, color: shields[i].color })
      }
    }
    return arr
  }, [shields])

  return (
    <>
      {beams.map((beam, i) => (
        <Cylinder
          key={i}
          args={[0.02, 0.02, beam.distance, 8]}
          position={beam.midpoint}
          rotation={[0, beam.angle, Math.PI / 2]}
        >
          <meshBasicMaterial
            color={beam.color}
            transparent
            opacity={0.4}
          />
        </Cylinder>
      ))}
    </>
  )
}

export default function Security3DScene() {
  const shields = [
    { position: [-3, 1, -2], color: '#00d4ff' },
    { position: [0, -1, 0], color: '#ff00ff' },
    { position: [3, 0.5, -3], color: '#00ff88' },
    { position: [-2, -1.5, 1], color: '#ffd700' },
  ]

  return (
    <div style={{ width: '100%', height: '550px' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#00d4ff" />
        <pointLight position={[10, 10, 5]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#00ff88" />

        {shields.map((shield, index) => (
          <SecurityShield
            key={index}
            position={shield.position}
            color={shield.color}
            index={index}
          />
        ))}

        <LaserBeams shields={shields} />
        <ParticleRing />

        {/* Central Holographic Shield */}
        <Float speed={1} floatIntensity={0.4}>
          <group position={[0, 0, -1]}>
            <Box args={[2.5, 3, 0.3]}>
              <meshPhysicalMaterial
                color="#1a1a2e"
                metalness={0.95}
                roughness={0.05}
                transparent
                opacity={0.7}
                emissive="#00d4ff"
                emissiveIntensity={0.4}
                clearcoat={1}
                clearcoatRoughness={0.1}
              />
            </Box>
            <Sparkles count={50} scale={3.5} size={3} speed={0.4} color="#00d4ff" />
          </group>
        </Float>

        <EffectComposer>
          <Bloom
            intensity={1.8}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.002, 0.002]}
          />
          <Scanline density={1.5} opacity={0.1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
