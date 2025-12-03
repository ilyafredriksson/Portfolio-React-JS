import React from 'react'
import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import './Skills.css'

const Skills = () => {

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