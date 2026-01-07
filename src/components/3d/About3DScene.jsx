import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Html, Environment, Sparkles, Trail } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'
import * as THREE from 'three'

function FloatingText() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Html center>
        <div style={{
          fontSize: '5rem',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #00d4ff, #ff00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 0 30px rgba(0,212,255,0.8)',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '0.15em',
          filter: 'drop-shadow(0 0 20px #00d4ff)'
        }}>
          PORTFOLIO
        </div>
      </Html>
    </Float>
  )
}

function DNAHelix() {
  const groupRef = useRef()
  const spheres = useMemo(() => {
    const arr = []
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 4
      const y = (i / 40) * 8 - 4
      const radius = 1.5
      arr.push({
        position: [Math.cos(angle) * radius, y, Math.sin(angle) * radius],
        position2: [Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius],
        color: i % 2 === 0 ? '#00d4ff' : '#ff00ff'
      })
    }
    return arr
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = time * 0.2
  })

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, i) => (
        <React.Fragment key={i}>
          <Float speed={3} floatIntensity={0.3}>
            <mesh position={sphere.position}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={sphere.color}
                emissive={sphere.color}
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
          <Float speed={3} floatIntensity={0.3}>
            <mesh position={sphere.position2}>
              <sphereGeometry args={[0.12, 16, 16]} />
              <meshStandardMaterial
                color={sphere.color}
                emissive={sphere.color}
                emissiveIntensity={1.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </Float>
        </React.Fragment>
      ))}
    </group>
  )
}

function GlassShape({ position }) {
  const meshRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.4
    meshRef.current.position.y = position[1] + Math.sin(time) * 0.3
  })

  return (
    <group position={position}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[0.8, 0.25, 128, 32]} />
        <MeshTransmissionMaterial
          color="#00d4ff"
          thickness={0.5}
          roughness={0}
          transmission={0.98}
          ior={1.5}
          chromaticAberration={0.06}
          backside
        />
      </mesh>
      <Sparkles count={30} scale={2} size={2} speed={0.5} color="#00d4ff" />
    </group>
  )
}

export default function About3DScene() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} dpr={[1, 2]}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} color="#00d4ff" intensity={2} />
        <pointLight position={[10, -10, -5]} color="#ff00ff" intensity={2} />
        
        <FloatingText />
        <DNAHelix />
        <GlassShape position={[4, 1, -3]} />
        <GlassShape position={[-4, -1, -3]} />

        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
          <DepthOfField focusDistance={0.01} focalLength={0.2} bokehScale={3} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
