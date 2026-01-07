import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere, RoundedBox, MeshDistortMaterial, Html, Environment, Sparkles, Trail } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function ContactOrb({ position, color, label }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = time * 0.3
    meshRef.current.rotation.y = time * 0.4
    
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.3, 1.3, 1.3), 0.1)
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <Sphere ref={meshRef} args={[0.8, 32, 32]}>
          <MeshDistortMaterial
            color={color}
            distort={0.6}
            speed={4}
            roughness={0.05}
            metalness={0.95}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.6}
          />
        </Sphere>
        
        {hovered && <Sparkles count={30} scale={2.5} size={3} speed={0.6} color={color} />}
        
        <Html position={[0, -1.5, 0]} center distanceFactor={10}>
          <div style={{
            color: color,
            fontSize: '16px',
            fontWeight: 'bold',
            textShadow: `0 0 15px ${color}, 0 0 30px ${color}`,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            padding: '8px 16px',
            background: hovered ? `linear-gradient(135deg, ${color}22, ${color}44)` : 'transparent',
            borderRadius: '20px',
            border: hovered ? `2px solid ${color}` : 'none',
            transition: 'all 0.3s ease'
          }}>
            {label}
          </div>
        </Html>
      </group>
    </Float>
  )
}

function EmailEnvelope() {
  const groupRef = useRef()
  const flapRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    groupRef.current.rotation.y = Math.sin(time * 0.5) * 0.3
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.3
    
    // Animated opening/closing
    flapRef.current.rotation.x = Math.sin(time * 0.5) * 0.3 - 0.5
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <RoundedBox args={[3, 2.2, 0.4]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          color="#00d4ff"
          metalness={0.9}
          roughness={0.15}
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      
      {/* Animated envelope flap */}
      <mesh ref={flapRef} position={[0, 1.1, 0.2]} rotation={[-0.5, 0, 0]}>
        <planeGeometry args={[3, 2.2]} />
        <meshPhysicalMaterial
          color="#0099cc"
          side={THREE.DoubleSide}
          emissive="#00d4ff"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <Sparkles count={40} scale={4} size={3} speed={0.5} color="#00d4ff" />
    </group>
  )
}

function ConnectingLines() {
  const linesRef = useRef()

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    linesRef.current.rotation.y = time * 0.1
  })

  const points = []
  for (let i = 0; i < 50; i++) {
    const angle = (i / 50) * Math.PI * 2
    const radius = 4
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(i * 0.5) * 2,
        Math.sin(angle) * radius
      )
    )
  }

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  return (
    <line ref={linesRef} geometry={lineGeometry}>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.3} />
    </line>
  )
}

export default function Contact3DScene() {
  return (
    <div style={{ width: '100%', height: '550px' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <Environment preset="dawn" />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <pointLight position={[-10, -10, -5]} intensity={2} color="#00d4ff" />
        <pointLight position={[10, 10, 5]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 0, 5]} intensity={1.5} color="#00ff88" />

        <EmailEnvelope />
        
        <ContactOrb position={[-4, 2, -2]} color="#00d4ff" label="Email" />
        <ContactOrb position={[4, 2, -2]} color="#ff00ff" label="LinkedIn" />
        <ContactOrb position={[-3, -2, -1]} color="#00ff88" label="GitHub" />
        <ContactOrb position={[3, -2, -1]} color="#ffd700" label="Phone" />

        <ConnectingLines />

        <EffectComposer>
          <Bloom
            intensity={1.4}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
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
