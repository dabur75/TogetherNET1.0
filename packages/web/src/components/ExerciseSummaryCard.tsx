import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { Exercise } from '../../../shared/types/Exercise'

interface ExerciseSummaryCardProps {
  exercise: Exercise
  onExpand: () => void
}

const exerciseSummaryStyles = css`
  .exercise-summary {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(64, 224, 208, 0.3);
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    
    &:hover {
      border-color: rgba(64, 224, 208, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(64, 224, 208, 0.2);
    }
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  
  .exercise-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .exercise-title {
      font-size: clamp(1.1rem, 2.8vw, 1.3rem);
      color: var(--color-turquoise);
      font-weight: 600;
      line-height: 1.3;
    }
    
    .exercise-icon {
      font-size: 1.5rem;
      animation: breathing 3s ease-in-out infinite;
    }
  }
  
  .exercise-greeting {
    font-size: clamp(1rem, 2.5vw, 1.2rem);
    color: var(--color-gold);
    margin-bottom: 1rem;
    font-weight: 500;
  }
  
  .exercise-preview {
    color: var(--color-warm-black);
    font-size: clamp(0.95rem, 2.2vw, 1.05rem);
    line-height: 1.6;
    margin-bottom: 1rem;
    opacity: 0.8;
  }
  
  .exercise-expand-hint {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--color-turquoise);
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
    
    .expand-icon {
      transition: transform 0.3s ease;
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
    
    .exercise-expand-hint {
      flex-direction: row-reverse;
    }
  }
  
  /* Breathing animation */
  @keyframes breathing {
    0%, 100% {
      transform: scale(1);
      opacity: 0.8;
    }
    50% {
      transform: scale(1.05);
      opacity: 1;
    }
  }
`

const ExerciseSummaryCard: React.FC<ExerciseSummaryCardProps> = ({ 
  exercise, 
  onExpand 
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
  
  // Create preview from introduction - first sentence or first 100 characters
  const getPreview = () => {
    const intro = exercise.introduction[language]
    const sentences = intro.split('.')
    if (sentences[0].length < 100) {
      return sentences[0] + '...'
    }
    return intro.substring(0, 100) + '...'
  }
  
  return (
    <motion.div
      css={exerciseSummaryStyles}
      className={isRTL ? 'rtl' : ''}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="exercise-summary" onClick={onExpand}>
        <span className="exercise-category-badge">
          {getCategoryName(exercise.category)}
        </span>
        
        <div className="exercise-header">
          <h3 className="exercise-title">
            {exercise.title[language]}
          </h3>
          <span className="exercise-icon">🌱</span>
        </div>
        
        <p className="exercise-greeting">
          {exercise.greeting[language]}
        </p>
        
        <p className="exercise-preview">
          {getPreview()}
        </p>
        
        <div className="exercise-expand-hint">
          <span>{language === 'he' ? 'לחץ לקריאת התרגיל המלא' : 'Click to read full exercise'}</span>
          <span className="expand-icon">👆</span>
        </div>
      </div>
    </motion.div>
  )
}

export default ExerciseSummaryCard