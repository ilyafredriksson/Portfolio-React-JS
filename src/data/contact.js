import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

/**
 * Contact information and social links
 */

export const contactInfo = [
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

export const socialLinks = [
  {
    icon: FaGithub,
    label: 'GitHub',
    href: 'https://github.com/ilyafredriksson',
    color: '#333'
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/ilya-fredriksson',
    color: '#0077b5'
  }
]

/**
 * Why contact me - unique value propositions
 */
export const whyContactMe = [
  {
    title: 'Frontend med Säkerhet',
    description: 'Jag kombinerar modern frontend-utveckling med djup förståelse för webbsäkerhet. Skapar säkra och användarvänliga gränssnitt.',
    emoji: '🔒'
  },
  {
    title: 'Modern Tech Stack',
    description: 'Expertis inom MERN-stack (MongoDB, Express, React, Node.js) och moderna frontend-teknologier.',
    emoji: '⚡'
  },
  {
    title: 'Problemlösare',
    description: 'Analytisk approach till utveckling med fokus på att hitta eleganta, säkra och skalbara lösningar.',
    emoji: '🎯'
  },
  {
    title: 'Snabb att lära',
    description: 'Passionerad om att lära mig nya teknologier och best practices. Håller mig uppdaterad med de senaste trenderna.',
    emoji: '🚀'
  }
]

/**
 * Contact form configuration
 */
export const contactFormConfig = {
  emailJsServiceId: 'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  emailJsTemplateId: 'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  emailJsUserId: 'YOUR_USER_ID' // Replace with your EmailJS user ID
}
