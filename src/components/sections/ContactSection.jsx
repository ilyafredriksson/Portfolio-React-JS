import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCheckCircle, FaExclamationCircle, FaPaperPlane } from 'react-icons/fa'
import { useForm } from '../../hooks/useForm'
import { checkRateLimit } from '../../utils/validation'
import { contactInfo, socialLinks, whyContactMe } from '../../data/contact'
import emailjs from 'emailjs-com'
import './ContactSection.css'

const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null)

  const initialValues = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  const handleFormSubmit = async (values) => {
    // Rate limiting check
    const rateLimit = checkRateLimit('contact_form', 3, 60000)
    if (!rateLimit.allowed) {
      throw new Error(rateLimit.message)
    }

    // Send email via EmailJS
    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: values.name,
          from_email: values.email,
          subject: values.subject,
          message: values.message,
          to_name: 'Ilya Fredriksson'
        },
        'YOUR_USER_ID' // Replace with your EmailJS user ID
      )

      setSubmitStatus({
        type: 'success',
        message: 'Tack för ditt meddelande! Jag återkommer så snart som möjligt.'
      })

      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      throw new Error('Ett fel uppstod vid skickandet. Försök igen senare.')
    }
  }

  const {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, handleFormSubmit)

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Kontakta mig</h2>
          <p className="section-subtitle">
            Intresserad av att diskutera LIA-möjligheter eller samarbeten? Hör gärna av dig!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
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

            <div className="why-contact">
              <h4>Varför kontakta mig?</h4>
              {whyContactMe.map((item, index) => (
                <motion.div
                  key={item.title}
                  className="why-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="why-emoji">{item.emoji}</span>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
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
                    style={{ '--social-color': social.color }}
                    whileHover={{ y: -3, scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={social.label}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Ditt namn *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Ange ditt fullständiga namn"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && errors.name ? 'error' : ''}
                required
                maxLength={50}
              />
              {touched.name && errors.name && (
                <span className="error-message">
                  <FaExclamationCircle /> {errors.name}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Din email *</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="din.email@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && errors.email ? 'error' : ''}
                required
              />
              {touched.email && errors.email && (
                <span className="error-message">
                  <FaExclamationCircle /> {errors.email}
                </span>
              )}
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">Ämne *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Vad handlar ditt meddelande om?"
                value={values.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.subject && errors.subject ? 'error' : ''}
                required
                maxLength={100}
              />
              {touched.subject && errors.subject && (
                <span className="error-message">
                  <FaExclamationCircle /> {errors.subject}
                </span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Meddelande *</label>
              <textarea
                id="message"
                name="message"
                placeholder="Berätta mer om ditt förslag, projekt eller fråga..."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.message && errors.message ? 'error' : ''}
                required
                maxLength={1000}
                rows={6}
              />
              <span className="char-count">
                {values.message.length}/1000
              </span>
              {touched.message && errors.message && (
                <span className="error-message">
                  <FaExclamationCircle /> {errors.message}
                </span>
              )}
            </div>

            {/* Submit Status */}
            {submitStatus && (
              <motion.div 
                className={`submit-status ${submitStatus.type}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {submitStatus.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                {submitStatus.message}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  Skickar...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Skicka meddelande
                </>
              )}
            </motion.button>

            <p className="form-note">
              <FaCheckCircle /> Alla fält är obligatoriska. Din data hanteras säkert och delas inte med tredje part.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
