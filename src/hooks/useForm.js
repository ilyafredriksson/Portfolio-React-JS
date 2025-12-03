import { useState } from 'react'
import { validateContactForm } from '../utils/validation'
import { sanitizeInput } from '../utils/sanitize'

/**
 * Custom hook for form handling with validation and sanitization
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} - Form state and handlers
 */
export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState({})

  /**
   * Handle input change with sanitization
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Sanitize input
    const sanitized = sanitizeInput(value)
    
    setValues(prev => ({
      ...prev,
      [name]: sanitized
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }))
    }
  }

  /**
   * Handle input blur (for touched state)
   */
  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true
    }))
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const validation = validateContactForm(values)
    if (!validation.isValid) {
      setErrors(validation.errors)
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
      setTouched(allTouched)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      await onSubmit(values)
      // Reset form on success
      setValues(initialValues)
      setTouched({})
    } catch (error) {
      setErrors({ submit: error.message || 'Ett fel uppstod. Försök igen.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  /**
   * Reset form to initial state
   */
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
    setTouched({})
  }

  return {
    values,
    errors,
    isSubmitting,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset
  }
}
