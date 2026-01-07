import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Float, Html, MeshDistortMaterial, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function Card3D({ project, index }) {
  const groupRef = useRef()
  const cardRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    if (hovered) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        Math.sin(time * 2) * 0.15,
        0.1
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        Math.cos(time * 2) * 0.1,
        0.1
      )
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 1, 0.1)
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, 0, 0.1)
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.1)
    }

    if (cardRef.current) {
      cardRef.current.material.emissiveIntensity = hovered ? 0.5 : 0.2
    }
  })

  const colors = ['#00d4ff', '#ff00ff', '#00ff88', '#ffd700']
  const color = colors[index % colors.length]

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group
        ref={groupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Holographic Glow */}
        {hovered && (
          <RoundedBox args={[3.2, 4.2, 0.4]} radius={0.12} smoothness={4} position={[0, 0, -0.1]}>
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.3}
              side={THREE.BackSide}
            />
          </RoundedBox>
        )}

        {/* Main Card */}
        <RoundedBox ref={cardRef} args={[3, 4, 0.3]} radius={0.12} smoothness={4}>
          <meshPhysicalMaterial
            color={hovered ? color : '#1a1a2e'}
            roughness={0.2}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={hovered ? 0.5 : 0.2}
            transparent
            opacity={0.95}
            clearcoat={1}
            clearcoatRoughness={0.1}
            envMapIntensity={2}
          />
        </RoundedBox>

        {/* Sparkles Effect */}
        {hovered && (
          <Sparkles
            count={40}
            scale={4}
            size={3}
            speed={0.6}
            opacity={0.8}
            color={color}
          />
        )}

        {/* Corner Accents */}
        {[[-1.3, 1.8], [1.3, 1.8], [-1.3, -1.8], [1.3, -1.8]].map((pos, i) => (
          <mesh key={i} position={[pos[0], pos[1], 0.2]}>
            <octahedronGeometry args={[0.12]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 1.5 : 0.8}
              wireframe
            />
          </mesh>
        ))}

        {/* Title */}
        <Html position={[0, 1.6, 0.2]} center distanceFactor={8}>
          <div style={{
            color: color,
            fontWeight: 'bold',
            fontSize: '20px',
            textAlign: 'center',
            maxWidth: '280px',
            textShadow: `0 0 20px ${color}, 0 0 40px ${color}`,
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            {project.title}
          </div>
        </Html>

        {/* Description */}
        <Html position={[0, 0.3, 0.2]} center distanceFactor={8}>
          <div style={{
            color: '#ffffff',
            fontSize: '13px',
            textAlign: 'center',
            maxWidth: '260px',
            lineHeight: '1.6',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)'
          }}>
            {project.description?.substring(0, 90) || 'Project description'}...
          </div>
        </Html>

        {/* Tech Stack Orbs */}
        {project.technologies?.slice(0, 3).map((tech, i) => (
          <Float key={i} speed={3} floatIntensity={0.5}>
            <mesh position={[-0.8 + i * 0.8, -1.4, 0.2]}>
              <sphereGeometry args={[0.18, 32, 32]} />
              <MeshDistortMaterial
                color={colors[i % colors.length]}
                emissive={colors[i % colors.length]}
                emissiveIntensity={0.8}
                distort={0.3}
                speed={2}
                roughness={0.1}
                metalness={0.9}
              />
            </mesh>
          </Float>
        ))}

        {/* Status Badge */}
        {project.featured && (
          <Html position={[1.2, -1.8, 0.2]} center>
            <div style={{
              background: `linear-gradient(135deg, ${color}, ${color}88)`,
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 'bold',
              color: 'white',
              border: `2px solid ${color}`,
              boxShadow: `0 0 15px ${color}`,
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              ⭐ Featured
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

export default function Project3DCard({ project, index }) {
  return (
    <div style={{ width: '100%', height: '480px' }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} dpr={[1, 2]}>
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#00d4ff" />
        <pointLight position={[5, 5, 5]} intensity={1} color="#ff00ff" />
        
        <Card3D project={project} index={index} />

        <EffectComposer>
          <Bloom
            intensity={1.3}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
          />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.001, 0.001]}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
