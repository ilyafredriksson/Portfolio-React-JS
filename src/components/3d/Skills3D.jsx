import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Html, MeshDistortMaterial, Sphere, Ring, Environment, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function SkillOrb({ skill, position, index }) {
  const meshRef = useRef()
  const ringRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(time + index) * 0.4
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.015

    if (ringRef.current) {
      ringRef.current.rotation.x = time * 0.5
      ringRef.current.rotation.y = time * 0.3
    }

    const targetScale = hovered ? 1.4 : 1
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15)
  })

  const colors = ['#00d4ff', '#ff00ff', '#00ff88', '#ffd700', '#ff6b6b', '#4ecdc4']
  const color = colors[index % colors.length]

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <group position={position}>
        {/* Rotating Ring */}
        <Ring
          ref={ringRef}
          args={[1.2, 1.4, 32]}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.5}
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
          />
        </Ring>

        {/* Main Sphere */}
        <Sphere
          ref={meshRef}
          args={[0.9, 32, 32]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <MeshDistortMaterial
            color={color}
            roughness={0.1}
            metalness={0.95}
            distort={0.5}
            speed={3}
            emissive={color}
            emissiveIntensity={hovered ? 0.8 : 0.3}
          />
        </Sphere>
        
        {/* Sparkles */}
        {hovered && (
          <Sparkles
            count={30}
            scale={2.5}
            size={2}
            speed={1}
            opacity={1}
            color={color}
          />
        )}
        
        {/* Skill Label */}
        {hovered && (
          <Html position={[0, -2, 0]} center distanceFactor={10}>
            <div style={{
              background: `linear-gradient(135deg, ${color}dd, ${color}99)`,
              padding: '12px 24px',
              borderRadius: '12px',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              whiteSpace: 'nowrap',
              boxShadow: `0 8px 32px ${color}66, 0 0 20px ${color}99`,
              border: `2px solid ${color}`,
              backdropFilter: 'blur(10px)',
              transform: 'translateY(10px)',
              animation: 'fadeIn 0.3s ease-out'
            }}>
              {skill.name}
              <div style={{
                fontSize: '12px',
                marginTop: '4px',
                opacity: 0.9
              }}>
                {skill.level}%
              </div>
            </div>
          </Html>
        )}
      </group>
    </Float>
  )
}

function SkillConnections({ skills }) {
  const linesRef = useRef()
  
  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {skills.map((_, i) => {
        if (i === 0) return null
        const angle1 = (i / skills.length) * Math.PI * 2
        const angle2 = ((i - 1) / skills.length) * Math.PI * 2
        const radius = 4
        
        const points = []
        points.push(new THREE.Vector3(
          Math.cos(angle1) * radius,
          Math.sin(i) * 2,
          Math.sin(angle1) * radius
        ))
        points.push(new THREE.Vector3(
          Math.cos(angle2) * radius,
          Math.sin(i - 1) * 2,
          Math.sin(angle2) * radius
        ))
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#00d4ff" transparent opacity={0.2} />
          </line>
        )
      })}
    </group>
  )
}

export default function Skills3D({ skills }) {
  const radius = 4.5
  const skillsToShow = skills.slice(0, 12)

  return (
    <div style={{ width: '100%', height: '700px', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 60 }} dpr={[1, 2]}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[10, -5, 5]} intensity={1} color="#ff00ff" />

        <SkillConnections skills={skillsToShow} />

        {skillsToShow.map((skill, index) => {
          const angle = (index / skillsToShow.length) * Math.PI * 2
          const x = Math.cos(angle) * radius
          const z = Math.sin(angle) * radius
          const y = Math.sin(index * 0.8) * 2.5

          return (
            <SkillOrb
              key={index}
              skill={skill}
              position={[x, y, z]}
              index={index}
            />
          )
        })}

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.5}
          minDistance={10}
          maxDistance={18}
          enableDamping
          dampingFactor={0.05}
        />

        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
