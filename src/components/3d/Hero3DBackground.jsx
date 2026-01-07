import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, Sparkles, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function AnimatedSphere({ position, color, speed }) {
  const meshRef = useRef()
  const glowRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.8
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.4
    const scale = 1 + Math.sin(time * speed * 0.5) * 0.15
    meshRef.current.scale.setScalar(scale)
    
    if (glowRef.current) {
      glowRef.current.scale.setScalar(scale * 1.3)
      glowRef.current.material.opacity = 0.3 + Math.sin(time * 2) * 0.2
    }
  })

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={2.5}>
      <group>
        {/* Outer glow */}
        <Sphere ref={glowRef} args={[1.5, 32, 32]} position={position}>
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </Sphere>
        
        {/* Main sphere */}
        <Sphere ref={meshRef} args={[1.2, 64, 64]} position={position}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.8}
            speed={4}
            roughness={0.05}
            metalness={0.98}
            emissive={color}
            emissiveIntensity={0.6}
            envMapIntensity={1.5}
          />
        </Sphere>
        
        {/* Sparkles around sphere */}
        <Sparkles
          count={50}
          scale={3}
          size={3}
          speed={0.8}
          opacity={0.8}
          color={color}
          position={position}
        />
      </group>
    </Float>
  )
}

function GeometricShape({ position, rotation, color }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x += 0.015
    meshRef.current.rotation.y += 0.02
    meshRef.current.rotation.z += 0.01
    meshRef.current.position.y = position[1] + Math.sin(time * 0.8 + position[0]) * 0.5
    meshRef.current.scale.setScalar(1 + Math.sin(time * 1.5) * 0.15)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef} position={position} rotation={rotation}>
        <dodecahedronGeometry args={[1]} />
        <meshPhysicalMaterial
          color={color}
          wireframe={false}
          roughness={0.1}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.4}
          transparent
          opacity={0.9}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  )
}

function ParticleField() {
  const pointsRef = useRef()
  const particleCount = 1500

  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 25
    positions[i * 3 + 1] = (Math.random() - 0.5) * 25
    positions[i * 3 + 2] = (Math.random() - 0.5) * 15

    const color = new THREE.Color()
    const hue = Math.random() * 0.4 + 0.5
    color.setHSL(hue, 0.8, 0.6)
    colors[i * 3] = color.r
    colors[i * 3 + 1] = color.g
    colors[i * 3 + 2] = color.b
  }

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.08
    pointsRef.current.rotation.x = Math.sin(time * 0.15) * 0.15
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
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function Hero3DBackground() {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Environment & Lighting */}
        <Environment preset="city" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0.5} fade speed={1} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, -5]} intensity={1.5} color="#00d4ff" />
        <pointLight position={[10, 10, 5]} intensity={1.5} color="#ff00ff" />
        <pointLight position={[0, -10, 0]} intensity={1.2} color="#00ff88" />
        <spotLight 
          position={[0, 15, 10]} 
          intensity={2} 
          angle={0.4} 
          penumbra={1} 
          color="#ffd700"
          castShadow
        />

        {/* Animated Spheres with Glow */}
        <AnimatedSphere position={[-3, 0, -2]} color="#00d4ff" speed={0.5} />
        <AnimatedSphere position={[3, 0, -1]} color="#ff00ff" speed={0.7} />
        <AnimatedSphere position={[0, -2, 0]} color="#00ff88" speed={0.6} />
        <AnimatedSphere position={[-2, 3, -3]} color="#9d4edd" speed={0.55} />
        <AnimatedSphere position={[1.5, -3, -1]} color="#ffd700" speed={0.65} />

        {/* Geometric Shapes */}
        <GeometricShape position={[-4, 2, -3]} rotation={[0.5, 0.5, 0]} color="#ffd700" />
        <GeometricShape position={[4, -2, -2]} rotation={[0, 0.3, 0.5]} color="#ff6b6b" />
        <GeometricShape position={[2, 3, -4]} rotation={[0.8, 0, 0.3]} color="#4ecdc4" />
        <GeometricShape position={[-3, -3, -2]} rotation={[0.2, 0.8, 0]} color="#ff00ff" />
        <GeometricShape position={[5, 1, -5]} rotation={[0.5, 0.5, 0.5]} color="#00d4ff" />
        <GeometricShape position={[-5, -1, -4]} rotation={[0.3, 0.6, 0.2]} color="#ff6b9d" />

        {/* Particle Field */}
        <ParticleField />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableDamping
          dampingFactor={0.05}
        />
        
        {/* Post-processing Effects */}
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={300}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0015, 0.0015]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
