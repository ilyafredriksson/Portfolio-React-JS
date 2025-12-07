import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from 'react-icons/fa'
import emailjs from 'emailjs-com'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Konfigurera EmailJS med dina credentials
      await emailjs.send(
        'YOUR_SERVICE_ID', // Byt ut mot din EmailJS service ID
        'YOUR_TEMPLATE_ID', // Byt ut mot din EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'Ilya Fredriksson'
        },
        'YOUR_USER_ID' // Byt ut mot din EmailJS user ID
      )
      
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
      console.error('EmailJS Error:', error)
    }
    
    setIsSubmitting(false)
    setTimeout(() => setSubmitStatus(''), 5000)
  }

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Telefon',
      value: '+46 70 123 45 67',
      href: 'tel:+46701234567'
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'ilya.fredriksson@example.com',
      href: 'mailto:ilya.fredriksson@example.com'
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Plats',
      value: 'Stockholm, Sverige',
      href: '#'
    }
  ]

  const socialLinks = [
    {
      icon: FaGithub,
      label: 'GitHub',
      href: 'https://github.com/ilyafredriksson'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ilya-fredriksson-197313353/'
    }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Kontakta mig</h2>
          <p className="contact-description">
            Intresserad av att diskutera LIA-möjligheter eller samarbeten? Hör gärna av dig!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>Låt oss få kontakt</h3>
            <p>
              Jag är alltid öppen för nya möjligheter och intressanta projekt. 
              Tveka inte att höra av dig om du har frågor eller vill diskutera hur vi kan arbeta tillsammans.
            </p>

            <div className="contact-details">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={item.label}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <item.icon className="contact-icon" />
                  <div>
                    <span className="contact-label">{item.label}</span>
                    <a href={item.href} className="contact-value">{item.value}</a>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="contact-social">
              <h4>Följ mig</h4>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ y: -3, scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="contact-form"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Ditt namn"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Din email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Ämne"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Ditt meddelande"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <motion.button 
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
              </motion.button>

              {submitStatus === 'success' && (
                <motion.div 
                  className="status-message success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Tack! Ditt meddelande har skickats.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div 
                  className="status-message error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Något gick fel. Försök igen senare.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact