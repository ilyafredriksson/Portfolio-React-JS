import React from 'react'
import { motion } from 'framer-motion'
import { FaReact, FaJsSquare, FaHtml5, FaCss3Alt, FaGitAlt, FaNodeJs } from 'react-icons/fa'
import { SiTypescript, SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si'
import './Skills.css'

const Skills = () => {
  const skills = [
    { name: 'React', icon: FaReact, level: 85, color: '#61DAFB' },
    { name: 'JavaScript', icon: FaJsSquare, level: 90, color: '#F7DF1E' },
    { name: 'HTML5', icon: FaHtml5, level: 95, color: '#E34F26' },
    { name: 'CSS3', icon: FaCss3Alt, level: 90, color: '#1572B6' },
    { name: 'TypeScript', icon: SiTypescript, level: 75, color: '#3178C6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, level: 80, color: '#06B6D4' },
    { name: 'Node.js', icon: FaNodeJs, level: 70, color: '#339933' },
    { name: 'Express', icon: SiExpress, level: 65, color: '#000000' },
    { name: 'MongoDB', icon: SiMongodb, level: 60, color: '#47A248' },
    { name: 'Git', icon: FaGitAlt, level: 85, color: '#F05032' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Färdigheter & Teknologier</h2>
          <p className="skills-description">
            Här är de teknologier och verktyg jag arbetar med för att skapa moderna webbapplikationer
          </p>
        </motion.div>

        <motion.div 
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name}
              className="skill-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: `0 20px 40px rgba(${hexToRgb(skill.color)}, 0.3)`
              }}
            >
              <div className="skill-header">
                <skill.icon 
                  className="skill-icon" 
                  style={{ color: skill.color }}
                />
                <h3>{skill.name}</h3>
              </div>
              
              <div className="skill-progress">
                <div className="progress-bar">
                  <motion.div 
                    className="progress-fill"
                    style={{ backgroundColor: skill.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="skills-additional"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3>Ytterligare kompetenser</h3>
          <div className="additional-skills">
            <span>Responsive Design</span>
            <span>REST APIs</span>
            <span>Agile Development</span>
            <span>Problem Solving</span>
            <span>Team Collaboration</span>
            <span>UI/UX Design Principles</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    '0, 0, 0'
}

export default Skills