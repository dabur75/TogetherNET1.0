import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { OnboardingStatus } from '../../../shared/types/User'
import { OnboardingService } from '../../../shared/services/OnboardingService'

const welcomeScreenStyles = css`
  /* Mobile-first welcome screen */
  .welcome-screen {
    min-height: 100vh;
    background: linear-gradient(
      135deg,
      var(--color-soft-white) 0%,
      rgba(255, 215, 0, 0.08) 30%,
      rgba(64, 224, 208, 0.05) 70%,
      var(--color-soft-white) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    text-align: center;
    
    /* RTL support */
    &.rtl {
      direction: rtl;
    }
  }

  .welcome-container {
    max-width: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    
    @media (min-width: 768px) {
      max-width: 600px;
      gap: 2.5rem;
    }
  }

  /* Banker avatar area */
  .banker-introduction {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    
    .banker-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--color-gold), var(--color-turquoise));
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      animation: breathing 4s ease-in-out infinite;
      box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
      
      @media (min-width: 768px) {
        width: 100px;
        height: 100px;
        font-size: 2.5rem;
      }
    }
    
    .banker-message {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 1rem;
      padding: 1.5rem;
      border: 1px solid rgba(255, 215, 0, 0.2);
      max-width: 100%;
      box-shadow: var(--shadow-gentle);
      
      @media (min-width: 768px) {
        padding: 2rem;
        max-width: 500px;
      }
      
      .message-text {
        font-family: var(--font-banker);
        font-style: italic;
        color: var(--color-gold);
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 1rem;
        
        @media (min-width: 768px) {
          font-size: 1.25rem;
        }
      }
      
      .follow-up-text {
        font-size: 0.9rem;
        color: var(--color-turquoise);
        font-style: normal;
        
        @media (min-width: 768px) {
          font-size: 1rem;
        }
      }
    }
  }

  /* Progress indicator */
  .onboarding-progress {
    width: 100%;
    max-width: 300px;
    
    .progress-bar {
      width: 100%;
      height: 6px;
      background: rgba(255, 215, 0, 0.2);
      border-radius: 3px;
      overflow: hidden;
      margin-bottom: 0.5rem;
      
      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--color-gold), var(--color-turquoise));
        border-radius: 3px;
        transition: width 0.8s ease;
      }
    }
    
    .progress-text {
      font-size: 0.8rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      
      @media (min-width: 768px) {
        font-size: 0.9rem;
      }
    }
  }

  /* Action buttons */
  .welcome-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    
    @media (min-width: 480px) {
      flex-direction: row;
      justify-content: center;
    }
    
    .action-button {
      flex: 1;
      padding: 1rem 1.5rem;
      border: none;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      touch-action: manipulation;
      min-height: 48px;
      
      @media (max-width: 479px) {
        width: 100%;
      }
      
      &:hover {
        transform: translateY(-2px);
      }
      
      &:active {
        transform: translateY(0);
      }
      
      &.primary {
        background: var(--color-gold);
        color: var(--color-warm-black);
        
        &:hover {
          background: var(--color-turquoise);
          color: white;
        }
      }
      
      &.secondary {
        background: transparent;
        color: var(--color-warm-black);
        border: 2px solid rgba(0, 0, 0, 0.2);
        
        &:hover {
          border-color: var(--color-turquoise);
          color: var(--color-turquoise);
        }
      }
    }
  }

  /* Mobile tips section */
  .mobile-tips {
    width: 100%;
    max-width: 500px;
    
    .tips-title {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 1rem;
      
      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }
    
    .tips-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      
      @media (min-width: 480px) {
        grid-template-columns: 1fr 1fr;
      }
      
      .tip-card {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(8px);
        border-radius: 0.75rem;
        padding: 1rem;
        border: 1px solid rgba(64, 224, 208, 0.2);
        text-align: center;
        
        .tip-icon {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        
        .tip-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--color-warm-black);
          margin-bottom: 0.25rem;
        }
        
        .tip-description {
          font-size: 0.8rem;
          color: var(--color-warm-black);
          opacity: 0.8;
          line-height: 1.4;
        }
      }
    }
  }

  /* Skip link */
  .skip-onboarding {
    margin-top: 2rem;
    
    .skip-button {
      background: none;
      border: none;
      color: var(--color-warm-black);
      opacity: 0.6;
      font-size: 0.9rem;
      cursor: pointer;
      text-decoration: underline;
      padding: 0.5rem;
      
      &:hover {
        opacity: 1;
      }
    }
  }

  /* Animations */
  @keyframes breathing {
    0%, 100% {
      transform: scale(1);
      opacity: 0.9;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
  }
`

interface WelcomeScreenProps {
  currentStep: OnboardingStatus
  onNext: () => void
  onSkip?: () => void
  onComplete: () => void
  className?: string
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  currentStep,
  onNext,
  onSkip,
  onComplete,
  className = ''
}) => {
  const { t, isRTL, language } = useLanguage()
  const [onboardingService] = useState(new OnboardingService())
  const [showTips, setShowTips] = useState(false)

  // Get banker response for current step
  const bankerResponse = onboardingService.getBankerResponseForStep(
    currentStep, 
    language, 
    true // isMobile
  )

  // Get progress percentage
  const progressPercentage = onboardingService.getProgressPercentage({
    onboardingStatus: currentStep
  } as any) // Mock user for progress calculation

  // Get help text for current step
  const helpText = onboardingService.getStepHelpText(currentStep, language)

  // Get mobile tips
  const mobileTips = onboardingService.getMobileTips(language)

  const isComplete = currentStep === 'onboarding_complete'

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const handleContinue = () => {
    if (isComplete) {
      onComplete()
    } else {
      onNext()
    }
  }

  return (
    <motion.div 
      css={welcomeScreenStyles}
      className={`welcome-screen ${isRTL ? 'rtl' : ''} ${className}`}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="welcome-container">
        {/* Banker Introduction */}
        <motion.div className="banker-introduction" variants={fadeInVariants}>
          <div className="banker-avatar">🏛️</div>
          
          {bankerResponse && (
            <div className="banker-message">
              <div className="message-text">
                {bankerResponse.content[language]}
              </div>
              {bankerResponse.therapeutic.followUpSuggestion && (
                <div className="follow-up-text">
                  {bankerResponse.therapeutic.followUpSuggestion}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* Progress Indicator */}
        {!isComplete && (
          <motion.div className="onboarding-progress" variants={fadeInVariants}>
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="progress-text">
              {language === 'he' 
                ? `${progressPercentage}% הושלם`
                : `${progressPercentage}% complete`
              }
            </div>
          </motion.div>
        )}

        {/* Help Text */}
        <motion.div variants={fadeInVariants}>
          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--color-warm-black)', 
            opacity: 0.8, 
            lineHeight: 1.5,
            maxWidth: '400px'
          }}>
            {helpText}
          </p>
        </motion.div>

        {/* Mobile Tips (show for certain steps) */}
        <AnimatePresence>
          {(showTips || currentStep === 'privacy_settings_set') && (
            <motion.div 
              className="mobile-tips"
              variants={fadeInVariants}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="tips-title">
                {language === 'he' ? 'עצות לחוויה מושלמת' : 'Tips for the best experience'}
              </div>
              <div className="tips-grid">
                {mobileTips.slice(0, 4).map((tip, index) => (
                  <motion.div 
                    key={index}
                    className="tip-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="tip-icon">{tip.icon}</span>
                    <div className="tip-title">{tip.title}</div>
                    <div className="tip-description">{tip.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div className="welcome-actions" variants={fadeInVariants}>
          <motion.button
            className="action-button primary"
            onClick={handleContinue}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isComplete 
              ? (language === 'he' ? 'התחל את המסע' : 'Start Your Journey')
              : (language === 'he' ? 'המשך' : 'Continue')
            }
          </motion.button>

          {!isComplete && currentStep !== 'not_started' && (
            <motion.button
              className="action-button secondary"
              onClick={() => setShowTips(!showTips)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {showTips 
                ? (language === 'he' ? 'הסתר עצות' : 'Hide Tips')
                : (language === 'he' ? 'הצג עצות' : 'Show Tips')
              }
            </motion.button>
          )}
        </motion.div>

        {/* Skip Option (for later steps) */}
        {onSkip && progressPercentage > 30 && !isComplete && (
          <motion.div className="skip-onboarding" variants={fadeInVariants}>
            <button className="skip-button" onClick={onSkip}>
              {language === 'he' ? 'דלג על ההדרכה' : 'Skip onboarding'}
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default WelcomeScreen