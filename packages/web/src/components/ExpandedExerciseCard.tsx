import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { Exercise } from '../../../shared/types/Exercise'

interface ExpandedExerciseCardProps {
  exercise: Exercise
  onStartDeposit: () => void
  onCollapse: () => void
}

const expandedExerciseStyles = css`
  .expanded-exercise {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid rgba(64, 224, 208, 0.4);
    box-shadow: 0 8px 24px rgba(64, 224, 208, 0.15);
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  
  .exercise-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    
    .exercise-title {
      font-size: clamp(1.2rem, 3vw, 1.5rem);
      color: var(--color-turquoise);
      font-weight: 600;
      line-height: 1.3;
    }
    
    .collapse-btn {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-turquoise);
      transition: transform 0.3s ease;
      touch-action: manipulation;
      
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  
  .exercise-greeting {
    font-size: clamp(1.1rem, 2.8vw, 1.3rem);
    color: var(--color-gold);
    margin-bottom: 1.5rem;
    font-weight: 500;
    text-align: center;
  }
  
  .exercise-content {
    color: var(--color-warm-black);
    line-height: 1.7;
    
    .content-section {
      margin-bottom: 1.5rem;
      
      &:last-of-type {
        margin-bottom: 2rem;
      }
    }
    
    .introduction {
      font-size: clamp(1rem, 2.4vw, 1.15rem);
      margin-bottom: 1rem;
    }
    
    .core-question {
      font-size: clamp(1.05rem, 2.6vw, 1.2rem);
      font-weight: 600;
      color: var(--color-turquoise);
      background: rgba(64, 224, 208, 0.1);
      padding: 1rem;
      border-radius: 0.75rem;
      border-left: 4px solid var(--color-turquoise);
      margin: 1.5rem 0;
    }
    
    .guidance {
      font-size: clamp(0.95rem, 2.2vw, 1.05rem);
      opacity: 0.9;
      margin-bottom: 1.5rem;
    }
    
    .instruction {
      font-size: clamp(1rem, 2.4vw, 1.1rem);
      font-weight: 500;
      color: var(--color-gold);
      margin-bottom: 1rem;
    }
    
    .template {
      font-size: clamp(1.1rem, 2.8vw, 1.25rem);
      font-weight: 600;
      color: var(--color-warm-black);
      background: rgba(255, 215, 0, 0.1);
      padding: 1rem;
      border-radius: 0.75rem;
      border-left: 4px solid var(--color-gold);
      font-style: italic;
      text-align: center;
    }
  }
  
  .exercise-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    
    @media (min-width: 576px) {
      flex-direction: row;
      justify-content: center;
    }
    
    .action-btn {
      flex: 1;
      max-width: 280px;
      min-height: 48px;
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.75rem;
      font-weight: 600;
      font-size: clamp(0.95rem, 2.2vw, 1.05rem);
      cursor: pointer;
      transition: all 0.3s ease;
      touch-action: manipulation;
      
      &.primary {
        background: var(--color-gold);
        color: var(--color-warm-black);
        
        &:hover {
          background: var(--color-turquoise);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
        }
      }
      
      &.secondary {
        background: transparent;
        color: var(--color-turquoise);
        border: 2px solid var(--color-turquoise);
        
        &:hover {
          background: var(--color-turquoise);
          color: white;
        }
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }
    }
  }
  
  .exercise-category-badge {
    display: inline-block;
    background: var(--color-turquoise);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .exercise-header {
      flex-direction: row-reverse;
    }
    
    .core-question {
      border-left: none;
      border-right: 4px solid var(--color-turquoise);
    }
    
    .template {
      border-left: none;
      border-right: 4px solid var(--color-gold);
    }
    
    .exercise-actions {
      @media (min-width: 576px) {
        flex-direction: row-reverse;
      }
    }
  }
`

const ExpandedExerciseCard: React.FC<ExpandedExerciseCardProps> = ({ 
  exercise, 
  onStartDeposit,
  onCollapse 
}) => {
  const { language, isRTL } = useLanguage()
  
  const getCategoryName = (category: string) => {
    const categoryNames = {
      gratitude: { en: 'Gratitude', he: 'הכרת תודה' },
      courage: { en: 'Courage', he: 'אומץ' },
      honesty: { en: 'Honesty', he: 'כנות' },
      success: { en: 'Success', he: 'הצלחה' },
      'self-compassion': { en: 'Self-Compassion', he: 'חמלה עצמית' }
    }
    return categoryNames[category as keyof typeof categoryNames]?.[language] || category
  }
  
  return (
    <motion.div
      css={expandedExerciseStyles}
      className={isRTL ? 'rtl' : ''}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
    >
      <div className="expanded-exercise">
        <span className="exercise-category-badge">
          {getCategoryName(exercise.category)}
        </span>
        
        <div className="exercise-header">
          <h3 className="exercise-title">
            {exercise.title[language]}
          </h3>
          <button 
            className="collapse-btn"
            onClick={onCollapse}
            aria-label={language === 'he' ? 'סגור תרגיל' : 'Close exercise'}
          >
            ✕
          </button>
        </div>
        
        <p className="exercise-greeting">
          {exercise.greeting[language]}
        </p>
        
        <div className="exercise-content">
          <div className="content-section">
            <p className="introduction">
              {exercise.introduction[language]}
            </p>
          </div>
          
          <div className="content-section">
            <div className="core-question">
              {exercise.coreQuestion[language]}
            </div>
          </div>
          
          <div className="content-section">
            <p className="guidance">
              {exercise.guidance[language]}
            </p>
          </div>
          
          <div className="content-section">
            <p className="instruction">
              {exercise.instruction[language]}
            </p>
            
            <div className="template">
              "{exercise.template[language]}"
            </div>
          </div>
        </div>
        
        <div className="exercise-actions">
          <button 
            className="action-btn primary"
            onClick={onStartDeposit}
          >
            {language === 'he' ? 'התחל הפקדה עם התרגיל' : 'Start Deposit with Exercise'}
          </button>
          <button 
            className="action-btn secondary"
            onClick={onCollapse}
          >
            {language === 'he' ? 'חזור לסיכום' : 'Back to Summary'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default ExpandedExerciseCard