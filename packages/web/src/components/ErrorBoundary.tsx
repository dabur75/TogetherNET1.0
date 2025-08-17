import { Component, ErrorInfo, ReactNode } from 'react'
import { css } from '@emotion/react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

const errorStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #FFF8DC 0%, #FAFAFA 100%);
  border-radius: 1rem;
  margin: 2rem;
  
  .error-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    opacity: 0.7;
  }
  
  .error-title {
    font-size: 1.5rem;
    color: var(--color-warm-black);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .error-message {
    color: var(--color-warm-black);
    opacity: 0.8;
    margin-bottom: 2rem;
    max-width: 500px;
    line-height: 1.6;
  }
  
  .error-actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .error-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &.primary {
      background: var(--color-turquoise);
      color: white;
      
      &:hover {
        background: #36d1dc;
        transform: translateY(-2px);
      }
    }
    
    &.secondary {
      background: white;
      color: var(--color-warm-black);
      border: 2px solid var(--color-turquoise);
      
      &:hover {
        background: var(--color-turquoise);
        color: white;
        transform: translateY(-2px);
      }
    }
  }
  
  .error-details {
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 0.5rem;
    font-family: monospace;
    font-size: 0.875rem;
    color: var(--color-warm-black);
    max-width: 600px;
    overflow-x: auto;
    text-align: left;
  }
`

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // In a real app, you would log this to an error reporting service
    // like Sentry, LogRocket, etc.
    if (import.meta.env.PROD) {
      // Log to error service
      console.error('Production error:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
      })
    }
  }

  private handleReload = () => {
    window.location.reload()
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  private handleToggleDetails = () => {
    const details = document.getElementById('error-details')
    if (details) {
      details.style.display = details.style.display === 'none' ? 'block' : 'none'
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div css={errorStyles}>
          <div className="error-icon">💔</div>
          
          <h1 className="error-title">
            Something went wrong
          </h1>
          
          <p className="error-message">
            We're sorry, but something unexpected happened. Your healing journey is important to us, 
            and we're working to make this right. Please try refreshing the page or returning home.
          </p>
          
          <div className="error-actions">
            <button 
              className="error-button primary"
              onClick={this.handleReload}
            >
              Refresh Page
            </button>
            
            <button 
              className="error-button secondary"
              onClick={this.handleGoHome}
            >
              Go Home
            </button>
            
            {import.meta.env.DEV && this.state.error && (
              <button 
                className="error-button secondary"
                onClick={this.handleToggleDetails}
              >
                Show Details
              </button>
            )}
          </div>
          
          {import.meta.env.DEV && this.state.error && (
            <div 
              id="error-details" 
              className="error-details"
              style={{ display: 'none' }}
            >
              <strong>Error:</strong> {this.state.error.message}
              <br />
              <br />
              <strong>Stack:</strong>
              <pre>{this.state.error.stack}</pre>
            </div>
          )}
          
          {/* Therapeutic message */}
          <p style={{ 
            marginTop: '2rem', 
            fontStyle: 'italic', 
            color: 'var(--color-gold)',
            fontFamily: 'var(--font-banker)'
          }}>
            Your worth remains intact, even when technology stumbles 💛
          </p>
        </div>
      )
    }

    return this.props.children
  }
}