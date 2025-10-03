import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaReact, FaJsSquare, FaCss3Alt } from 'react-icons/fa'
import { SiTailwindcss, SiMongodb, SiExpress } from 'react-icons/si'
import './Projects.css'

const Projects = () => {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-commerce React App',
      description: 'En fullstack e-commerce applikation byggd med React, Node.js och MongoDB. Inkluderar användarautentisering, kundkorg och betalningsintegration.',
      image: '/project1.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'fullstack',
      github: 'https://github.com/ilyafredriksson/ecommerce-app',
      live: 'https://ecommerce-app-demo.netlify.app',
      icons: [FaReact, SiExpress, SiMongodb]
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Responsiv väderapplikation som hämtar data från externa APIs. Visar aktuellt väder, prognoser och interaktiva kartor.',
      image: '/project2.jpg',
      technologies: ['React', 'JavaScript', 'CSS3', 'API'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/weather-dashboard',
      live: 'https://weather-dashboard-if.netlify.app',
      icons: [FaReact, FaJsSquare, FaCss3Alt]
    },
    {
      id: 3,
      title: 'Task Management System',
      description: 'Projekthanteringsverktyg med drag-and-drop funktionalitet, teamsamarbete och realtidsuppdateringar.',
      image: '/project3.jpg',
      technologies: ['React', 'Tailwind CSS', 'JavaScript'],
      category: 'frontend',
      github: 'https://github.com/ilyafredriksson/task-manager',
      live: 'https://task-manager-if.netlify.app',
      icons: [FaReact, SiTailwindcss, FaJsSquare]
    },
    {
      id: 4,
      title: 'Blog Platform',
      description: 'Modern bloggplattform med CMS-funktionalitet, kommentarssystem och SEO-optimering.',
      image: '/project4.jpg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      category: 'fullstack',
      github: 'https://github.com/ilyafredriksson/blog-platform',
      live: 'https://blog-platform-if.netlify.app',
      icons: [FaReact, SiExpress, SiMongodb]
    }
  ]

  const categories = [
    { key: 'all', label: 'Alla projekt' },
    { key: 'frontend', label: 'Frontend' },
    { key: 'fullstack', label: 'Fullstack' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

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
            Här är några av de projekt jag arbetat med för att visa mina färdigheter inom webbutveckling
          </p>
        </motion.div>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map(category => (
            <button
              key={category.key}
              className={`filter-btn ${filter === category.key ? 'active' : ''}`}
              onClick={() => setFilter(category.key)}
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
              className="project-card"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
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
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects