import React from 'react'
import { css, keyframes } from '@emotion/react'
import { useLanguage } from '../hooks/useLanguage'

const breathingAnimation = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`

const spinnerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  
  .spinner-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    animation: ${breathingAnimation} 3s ease-in-out infinite;
  }
  
  .spinner-text {
    font-family: var(--font-banker);
    color: var(--color-gold);
    font-size: 1.1rem;
    font-style: italic;
    text-align: center;
    
    &.hebrew {
      font-family: var(--font-hebrew);
      direction: rtl;
    }
  }
  
  .spinner-subtitle {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    opacity: 0.7;
    color: var(--color-warm-black);
  }
`

interface LoadingSpinnerProps {
  message?: string
  subtitle?: string
  size?: 'small' | 'medium' | 'large'
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message,
  subtitle,
  size = 'medium'
}) => {
  const { t, language, isRTL } = useLanguage()
  
  const defaultMessage = t('common.loading')
  const therapeuticSubtitle = t('therapeutic.patience')
  
  const sizeStyles = {
    small: css`
      min-height: 100px;
      .spinner-icon { font-size: 2rem; }
      .spinner-text { font-size: 1rem; }
    `,
    medium: css`
      min-height: 200px;
      .spinner-icon { font-size: 3rem; }
      .spinner-text { font-size: 1.1rem; }
    `,
    large: css`
      min-height: 300px;
      .spinner-icon { font-size: 4rem; }
      .spinner-text { font-size: 1.25rem; }
    `,
  }
  
  return (
    <div css={[spinnerStyles, sizeStyles[size]]} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="spinner-icon" role="status" aria-label={defaultMessage}>
        🏦💛
      </div>
      
      <div className={`spinner-text ${language === 'he' ? 'hebrew' : ''}`}>
        {message || defaultMessage}
      </div>
      
      {(subtitle || therapeuticSubtitle) && (
        <div className={`spinner-subtitle ${language === 'he' ? 'hebrew' : ''}`}>
          {subtitle || therapeuticSubtitle}
        </div>
      )}
      
      {/* Screen reader friendly text */}
      <span className="sr-only">
        {t('common.loading')}. {t('therapeutic.patience')}.
      </span>
    </div>
  )
}