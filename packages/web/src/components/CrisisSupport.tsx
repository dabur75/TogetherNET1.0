// Crisis Support UI Components - Mobile-Optimized Emergency Interface
// TogetherNet Therapeutic Platform

import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { CrisisRiskLevel } from '../../../shared/services/CrisisDetectionService'
import { CrisisContact } from '../../../shared/services/CrisisResponseWorkflow'

const crisisStyles = css`
  /* Crisis Support Container - Mobile First */
  .crisis-support {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      180deg, 
      rgba(64, 224, 208, 0.95) 0%, 
      rgba(64, 224, 208, 0.98) 100%
    );
    z-index: 9999;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: auto;
    
    /* RTL support */
    &.rtl {
      direction: rtl;
    }
  }

  /* Crisis Header */
  .crisis-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    border: 2px solid var(--color-turquoise);
    
    .crisis-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      display: block;
      color: var(--color-turquoise);
    }
    
    .crisis-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 0.5rem;
      
      @media (min-width: 768px) {
        font-size: 1.75rem;
      }
    }
    
    .crisis-message {
      font-size: 1rem;
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.5;
      
      @media (min-width: 768px) {
        font-size: 1.1rem;
      }
    }
  }

  /* Emergency Actions */
  .emergency-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    
    @media (min-width: 480px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    .emergency-button {
      flex: 1;
      min-height: 60px;
      padding: 1rem;
      border: none;
      border-radius: 0.75rem;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.3s ease;
      touch-action: manipulation;
      
      @media (max-width: 479px) {
        width: 100%;
      }
      
      &:active {
        transform: scale(0.98);
      }
      
      &.call-emergency {
        background: #ff4757;
        color: white;
        
        &:hover {
          background: #ff3742;
        }
      }
      
      &.call-hotline {
        background: var(--color-turquoise);
        color: white;
        
        &:hover {
          background: #39d5c4;
        }
      }
      
      &.text-support {
        background: var(--color-gold);
        color: var(--color-warm-black);
        
        &:hover {
          background: #f1c40f;
        }
      }
      
      .button-icon {
        font-size: 1.2rem;
      }
    }
  }

  /* Crisis Resources */
  .crisis-resources {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    
    .resources-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .resources-list {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      
      .resource-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        background: rgba(64, 224, 208, 0.1);
        border-radius: 0.5rem;
        border: 1px solid rgba(64, 224, 208, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: rgba(64, 224, 208, 0.2);
          transform: translateY(-1px);
        }
        
        .resource-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-turquoise);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          margin-right: 1rem;
          flex-shrink: 0;
        }
        
        .resource-content {
          flex: 1;
          
          .resource-name {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-warm-black);
            margin-bottom: 0.25rem;
          }
          
          .resource-description {
            font-size: 0.9rem;
            color: var(--color-warm-black);
            opacity: 0.7;
            line-height: 1.3;
          }
          
          .resource-phone {
            font-size: 1rem;
            font-weight: 600;
            color: var(--color-turquoise);
            margin-top: 0.25rem;
          }
        }
        
        .resource-action {
          font-size: 1.5rem;
          color: var(--color-turquoise);
        }
      }
    }
  }

  /* Grounding Exercises */
  .grounding-exercises {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    
    .grounding-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 1rem;
      text-align: center;
    }
    
    .exercise-selector {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      flex-wrap: wrap;
      justify-content: center;
      
      .exercise-tab {
        padding: 0.5rem 1rem;
        border: 2px solid var(--color-turquoise);
        border-radius: 2rem;
        background: transparent;
        color: var(--color-turquoise);
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background: var(--color-turquoise);
          color: white;
        }
        
        &:hover {
          background: rgba(64, 224, 208, 0.1);
        }
      }
    }
    
    .exercise-content {
      text-align: center;
      
      .exercise-instruction {
        font-size: 1.1rem;
        color: var(--color-warm-black);
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      
      .breathing-guide {
        .breathing-circle {
          width: 120px;
          height: 120px;
          border: 3px solid var(--color-turquoise);
          border-radius: 50%;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: var(--color-turquoise);
          position: relative;
          
          &.breathing {
            animation: breathe 4s ease-in-out infinite;
          }
        }
        
        .breathing-timer {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-turquoise);
          margin-bottom: 1rem;
        }
        
        .breathing-instruction {
          font-size: 1.1rem;
          color: var(--color-warm-black);
          opacity: 0.8;
        }
      }
      
      .grounding-steps {
        .step-item {
          padding: 1rem;
          margin: 0.5rem 0;
          background: rgba(64, 224, 208, 0.1);
          border-radius: 0.5rem;
          border-left: 4px solid var(--color-turquoise);
          text-align: left;
          
          .step-number {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--color-turquoise);
            margin-bottom: 0.5rem;
          }
          
          .step-text {
            font-size: 1rem;
            color: var(--color-warm-black);
            line-height: 1.5;
          }
        }
      }
    }
  }

  /* Action Buttons */
  .crisis-actions {
    margin-top: auto;
    padding-top: 2rem;
    
    .action-row {
      display: flex;
      gap: 1rem;
      margin-bottom: 1rem;
      
      @media (max-width: 479px) {
        flex-direction: column;
      }
      
      .action-button {
        flex: 1;
        padding: 1rem;
        border: 2px solid var(--color-turquoise);
        border-radius: 0.75rem;
        background: transparent;
        color: var(--color-turquoise);
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--color-turquoise);
          color: white;
        }
        
        &.primary {
          background: var(--color-turquoise);
          color: white;
        }
      }
    }
  }

  /* Animations */
  @keyframes breathe {
    0%, 100% {
      transform: scale(1);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.1);
      opacity: 1;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  /* Crisis Button */
  .crisis-trigger-button {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #ff4757, #ff6b7d);
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    animation: pulse 2s ease-in-out infinite;
    box-shadow: 0 4px 20px rgba(255, 71, 87, 0.4);
    
    &:hover {
      transform: scale(1.1);
    }
    
    &:active {
      transform: scale(0.95);
    }
  }
`

// Crisis Support Resource Interface
interface CrisisSupportResource {
  id: string
  name: {
    en: string
    he: string
  }
  description: {
    en: string
    he: string
  }
  phone: string
  icon: string
  available24h: boolean
  type: 'emergency' | 'hotline' | 'chat' | 'therapist'
}

// Grounding Exercise Interface
interface GroundingExercise {
  id: string
  name: {
    en: string
    he: string
  }
  type: 'breathing' | '5-4-3-2-1' | 'progressive' | 'mindfulness'
  duration: number // minutes
  instructions: {
    en: string[]
    he: string[]
  }
}

// Crisis Support Props
interface CrisisSupportProps {
  isVisible: boolean
  riskLevel: CrisisRiskLevel
  onClose: () => void
  onEmergencyCall: (contactId: string) => void
  className?: string
}

// Crisis Support Component
export const CrisisSupport: React.FC<CrisisSupportProps> = ({
  isVisible,
  riskLevel,
  onClose,
  onEmergencyCall,
  className = ''
}) => {
  const { t, isRTL, language } = useLanguage()
  const [activeExercise, setActiveExercise] = useState<string>('breathing')
  const [isBreathing, setIsBreathing] = useState(false)
  const [breathingTimer, setBreathingTimer] = useState(0)

  // Crisis resources for Israel
  const crisisResources: CrisisSupportResource[] = [
    {
      id: 'sahar_hotline',
      name: {
        en: 'SAHAR Emotional Support',
        he: 'סהר - תמיכה רגשית'
      },
      description: {
        en: '24/7 anonymous emotional support hotline',
        he: 'קו תמיכה רגשית אנונימי 24/7'
      },
      phone: '1201',
      icon: '🆘',
      available24h: true,
      type: 'hotline'
    },
    {
      id: 'emergency_services',
      name: {
        en: 'Emergency Services',
        he: 'שירותי חירום'
      },
      description: {
        en: 'Immediate medical and psychiatric emergency',
        he: 'חירום רפואי ופסיכיאטרי מיידי'
      },
      phone: '101',
      icon: '🚨',
      available24h: true,
      type: 'emergency'
    },
    {
      id: 'natal_trauma',
      name: {
        en: 'NATAL Trauma Center',
        he: 'מרכז נטל לטראומה'
      },
      description: {
        en: 'Specialized trauma and PTSD support',
        he: 'תמיכה מתמחה בטראומה ופוסט טראומה'
      },
      phone: '1800-363-363',
      icon: '🏥',
      available24h: false,
      type: 'therapist'
    }
  ]

  // Grounding exercises
  const groundingExercises: GroundingExercise[] = [
    {
      id: 'breathing',
      name: {
        en: 'Deep Breathing',
        he: 'נשימות עמוקות'
      },
      type: 'breathing',
      duration: 5,
      instructions: {
        en: ['Breathe in slowly for 4 counts', 'Hold for 4 counts', 'Breathe out for 6 counts', 'Repeat'],
        he: ['שאוף לאט למשך 4 ספירות', 'החזק למשך 4 ספירות', 'נשוף למשך 6 ספירות', 'חזור על התהליך']
      }
    },
    {
      id: '5-4-3-2-1',
      name: {
        en: '5-4-3-2-1 Technique',
        he: 'טכניקת 5-4-3-2-1'
      },
      type: '5-4-3-2-1',
      duration: 3,
      instructions: {
        en: [
          '5 things you can see',
          '4 things you can touch',
          '3 things you can hear',
          '2 things you can smell',
          '1 thing you can taste'
        ],
        he: [
          '5 דברים שאתה יכול לראות',
          '4 דברים שאתה יכול לגעת בהם',
          '3 דברים שאתה יכול לשמוע',
          '2 דברים שאתה יכול להריח',
          'דבר אחד שאתה יכול לטעום'
        ]
      }
    },
    {
      id: 'progressive',
      name: {
        en: 'Progressive Relaxation',
        he: 'הרפיה מתקדמת'
      },
      type: 'progressive',
      duration: 10,
      instructions: {
        en: [
          'Tense and relax your feet',
          'Tense and relax your legs',
          'Tense and relax your arms',
          'Tense and relax your shoulders',
          'Breathe and notice the relaxation'
        ],
        he: [
          'הדק והרפה את הרגליים',
          'הדק והרפה את הירכיים',
          'הדק והרפה את הידיים',
          'הדק והרפה את הכתפיים',
          'נשום והבחין בהרפיה'
        ]
      }
    }
  ]

  // Start breathing exercise
  const startBreathingExercise = () => {
    setIsBreathing(true)
    setBreathingTimer(300) // 5 minutes

    const interval = setInterval(() => {
      setBreathingTimer(prev => {
        if (prev <= 1) {
          setIsBreathing(false)
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  // Handle emergency call
  const handleEmergencyCall = (resource: CrisisSupportResource) => {
    // Mobile-specific call handling
    if ('navigator' in globalThis && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]) // Confirmation vibration
    }

    // Open phone dialer
    window.location.href = `tel:${resource.phone}`
    
    // Notify parent component
    onEmergencyCall(resource.id)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        css={crisisStyles}
        className={`crisis-support ${isRTL ? 'rtl' : ''} ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Crisis Header */}
        <motion.div 
          className="crisis-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span className="crisis-icon">🆘</span>
          <h1 className="crisis-title">
            {language === 'he' ? 'אתה לא לבד' : 'You Are Not Alone'}
          </h1>
          <p className="crisis-message">
            {language === 'he' 
              ? 'אנחנו כאן כדי לעזור. תמיכה זמינה מיידית.'
              : 'We are here to help. Immediate support is available.'
            }
          </p>
        </motion.div>

        {/* Emergency Actions */}
        <motion.div 
          className="emergency-actions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button 
            className="emergency-button call-emergency"
            onClick={() => handleEmergencyCall(crisisResources[1])}
          >
            <span className="button-icon">🚨</span>
            {language === 'he' ? 'חירום 101' : 'Emergency 101'}
          </button>
          <button 
            className="emergency-button call-hotline"
            onClick={() => handleEmergencyCall(crisisResources[0])}
          >
            <span className="button-icon">📞</span>
            {language === 'he' ? 'קו תמיכה 1201' : 'Support Line 1201'}
          </button>
        </motion.div>

        {/* Crisis Resources */}
        <motion.div 
          className="crisis-resources"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="resources-title">
            {language === 'he' ? 'משאבי תמיכה' : 'Support Resources'}
          </h2>
          <div className="resources-list">
            {crisisResources.map(resource => (
              <div 
                key={resource.id}
                className="resource-item"
                onClick={() => handleEmergencyCall(resource)}
              >
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-content">
                  <div className="resource-name">{resource.name[language]}</div>
                  <div className="resource-description">{resource.description[language]}</div>
                  <div className="resource-phone">{resource.phone}</div>
                </div>
                <div className="resource-action">📞</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Grounding Exercises */}
        <motion.div 
          className="grounding-exercises"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="grounding-title">
            {language === 'he' ? 'תרגילי הארקה' : 'Grounding Exercises'}
          </h2>
          
          <div className="exercise-selector">
            {groundingExercises.map(exercise => (
              <button
                key={exercise.id}
                className={`exercise-tab ${activeExercise === exercise.id ? 'active' : ''}`}
                onClick={() => setActiveExercise(exercise.id)}
              >
                {exercise.name[language]}
              </button>
            ))}
          </div>

          <div className="exercise-content">
            {activeExercise === 'breathing' && (
              <div className="breathing-guide">
                <div className={`breathing-circle ${isBreathing ? 'breathing' : ''}`}>
                  💨
                </div>
                {isBreathing && (
                  <div className="breathing-timer">
                    {Math.floor(breathingTimer / 60)}:{(breathingTimer % 60).toString().padStart(2, '0')}
                  </div>
                )}
                <div className="breathing-instruction">
                  {language === 'he' 
                    ? isBreathing ? 'נשום בעקבות המעגל' : 'לחץ להתחלת תרגיל נשימה'
                    : isBreathing ? 'Follow the circle to breathe' : 'Tap to start breathing exercise'
                  }
                </div>
                {!isBreathing && (
                  <button 
                    className="action-button primary"
                    onClick={startBreathingExercise}
                    style={{ marginTop: '1rem', width: '100%' }}
                  >
                    {language === 'he' ? 'התחל נשימה' : 'Start Breathing'}
                  </button>
                )}
              </div>
            )}

            {activeExercise !== 'breathing' && (
              <div className="grounding-steps">
                {groundingExercises.find(ex => ex.id === activeExercise)?.instructions[language].map((instruction, index) => (
                  <div key={index} className="step-item">
                    <div className="step-number">{index + 1}</div>
                    <div className="step-text">{instruction}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="crisis-actions"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="action-row">
            <button className="action-button" onClick={onClose}>
              {language === 'he' ? 'חזור לאפליקציה' : 'Return to App'}
            </button>
            <button 
              className="action-button primary"
              onClick={() => handleEmergencyCall(crisisResources[0])}
            >
              {language === 'he' ? 'דבר עם מישהו עכשיו' : 'Talk to Someone Now'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Crisis Trigger Button Component
interface CrisisTriggerButtonProps {
  onClick: () => void
  className?: string
}

export const CrisisTriggerButton: React.FC<CrisisTriggerButtonProps> = ({
  onClick,
  className = ''
}) => {
  const { language } = useLanguage()

  return (
    <motion.button
      css={crisisStyles}
      className={`crisis-trigger-button ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={language === 'he' ? 'עזרה מיידית' : 'Immediate Help'}
    >
      🆘
    </motion.button>
  )
}

export default CrisisSupport