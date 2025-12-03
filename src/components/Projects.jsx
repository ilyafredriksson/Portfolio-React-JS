import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaShieldAlt, FaStar } from 'react-icons/fa'
import { projects, projectCategories, getProjectsByCategory } from '../data/projects'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const filteredProjects = getProjectsByCategory(filter)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Mina Projekt</h2>
          <p className="projects-description">
            Utforska mina projekt som visar praktiska färdigheter inom React, API-integration och modern webbutveckling.
          </p>
        </motion.div>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {projectCategories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              onClick={() => setFilter(category.key)}
              title={category.description}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          key={filter} // Re-trigger animation when filter changes
        >
          {filteredProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Utvalda
                </div>
              )}
              {project.security && (
                <div className="security-badge">
                  <FaShieldAlt /> Säkerhet
                </div>
              )}
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
                <div className="project-overlay">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaExternalLinkAlt />
                  </motion.a>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tech">
                  {project.icons.map((Icon, iconIndex) => (
                    <Icon key={iconIndex} className="tech-icon" />
                  ))}
                </div>

                <div className="project-technologies">
                  {project.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {project.featured && (
                  <div className="project-highlights">
                    {project.id === 1 && (
                      <div className="highlight-feature">
                        ⚡ Server-side rendering med Next.js för optimal prestanda
                      </div>
                    )}
                    {project.id === 2 && (
                      <div className="highlight-feature">
                        📈 Live data från CoinGecko API med realtidsuppdateringar
                      </div>
                    )}
                    {project.id === 3 && (
                      <div className="highlight-feature">
                        🎯 Stöder flera QR-typer: URL, Text, WiFi, vCard
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects