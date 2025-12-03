import React from 'react'
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa'
import './ErrorBoundary.css'

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorCount: 0
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }))
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
    
    // In production, you could log to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    })
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-content">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            
            <h1>Hoppsan! Något gick fel</h1>
            
            <p className="error-message">
              Vi beklagar, men något oväntat hände. Detta har loggats och vi arbetar på en lösning.
            </p>

            <div className="error-actions">
              <button 
                onClick={this.handleReset}
                className="btn btn-secondary"
              >
                <FaRedo />
                Försök igen
              </button>
              
              <button 
                onClick={this.handleReload}
                className="btn btn-primary"
              >
                Ladda om sidan
              </button>
            </div>

            {/* Show error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-details">
                <summary>🔍 Feldetaljer (endast synligt i development mode)</summary>
                <div className="error-stack">
                  <h3>Error:</h3>
                  <pre>{this.state.error.toString()}</pre>
                  
                  {this.state.errorInfo && (
                    <>
                      <h3>Component Stack:</h3>
                      <pre>{this.state.errorInfo.componentStack}</pre>
                    </>
                  )}
                </div>
              </details>
            )}

            <p className="error-help">
              Om problemet kvarstår, vänligen kontakta mig via{' '}
              <a href="mailto:ilya.fredriksson@example.com">email</a>.
            </p>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
