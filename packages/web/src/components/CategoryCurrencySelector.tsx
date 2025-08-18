import React from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { DepositCategory } from '../../../shared/types/Deposit'

interface CategoryCurrencySelectorProps {
  selectedCategory: DepositCategory | null
  onCategorySelect: (category: DepositCategory) => void
  showDescription?: boolean
}

const categorySelectorStyles = css`
  .category-selector {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid rgba(255, 215, 0, 0.3);
    
    @media (min-width: 768px) {
      padding: 2rem;
    }
  }
  
  .selector-header {
    text-align: center;
    margin-bottom: 1.5rem;
    
    .selector-title {
      font-size: clamp(1.2rem, 3vw, 1.4rem);
      color: var(--color-gold);
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    .selector-subtitle {
      font-size: clamp(0.9rem, 2.1vw, 1rem);
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }
  
  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
    
    @media (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: 0.75rem;
    }
  }
  
  .category-option {
    min-height: 90px;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;
    
    .category-icon {
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      transition: transform 0.3s ease;
    }
    
    .category-name {
      font-size: clamp(0.9rem, 2.1vw, 1rem);
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 0.25rem;
    }
    
    .category-hebrew {
      font-size: clamp(0.8rem, 1.9vw, 0.9rem);
      color: var(--color-warm-black);
      opacity: 0.7;
    }
    
    /* Category-specific styling */
    &.gratitude {
      --category-color: #4CAF50;
      --category-bg: rgba(76, 175, 80, 0.1);
    }
    
    &.courage {
      --category-color: #FF9800;
      --category-bg: rgba(255, 152, 0, 0.1);
    }
    
    &.honesty {
      --category-color: #2196F3;
      --category-bg: rgba(33, 150, 243, 0.1);
    }
    
    &.success {
      --category-color: #9C27B0;
      --category-bg: rgba(156, 39, 176, 0.1);
    }
    
    &.self-compassion {
      --category-color: #E91E63;
      --category-bg: rgba(233, 30, 99, 0.1);
    }
    
    &:hover {
      border-color: var(--category-color);
      background: var(--category-bg);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--category-color), 0.2);
      
      .category-icon {
        transform: scale(1.1);
      }
    }
    
    &.selected {
      border-color: var(--category-color);
      background: var(--category-bg);
      box-shadow: 0 0 0 3px rgba(var(--category-color), 0.2);
      
      .category-icon {
        transform: scale(1.1);
      }
      
      &::after {
        content: '✓';
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        color: var(--category-color);
        font-weight: bold;
        font-size: 1rem;
      }
    }
  }
  
  .category-description {
    background: rgba(var(--selected-category-color, 64, 224, 208), 0.05);
    border: 1px solid rgba(var(--selected-category-color, 64, 224, 208), 0.2);
    border-radius: 0.75rem;
    padding: 1rem;
    text-align: center;
    
    .description-title {
      font-size: clamp(1rem, 2.4vw, 1.1rem);
      font-weight: 600;
      color: rgb(var(--selected-category-color, 64, 224, 208));
      margin-bottom: 0.5rem;
    }
    
    .description-text {
      font-size: clamp(0.9rem, 2.1vw, 1rem);
      color: var(--color-warm-black);
      line-height: 1.5;
      opacity: 0.9;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .category-option {
      &.selected::after {
        right: auto;
        left: 0.5rem;
      }
    }
  }
`

const CategoryCurrencySelector: React.FC<CategoryCurrencySelectorProps> = ({ 
  selectedCategory, 
  onCategorySelect,
  showDescription = true 
}) => {
  const { language, isRTL } = useLanguage()
  
  const categories = [
    {
      id: 'gratitude' as DepositCategory,
      icon: '🌱',
      name: { en: 'Gratitude', he: 'הכרת תודה' },
      description: { 
        en: 'Recognizing abundance and goodness around you',
        he: 'הכרה בשפע ובטוב שסביבכם'
      },
      rebuilds: {
        en: 'Security through abundance recognition',
        he: 'ביטחון דרך הכרה בשפע'
      },
      color: '76, 175, 80'
    },
    {
      id: 'courage' as DepositCategory,
      icon: '🦁',
      name: { en: 'Courage', he: 'אומץ' },
      description: { 
        en: 'Acknowledging brave actions, big and small',
        he: 'הכרה בפעולות אמיצות, גדולות וקטנות'
      },
      rebuilds: {
        en: 'Self-respect through brave action',
        he: 'כבוד עצמי דרך פעולה אמיצה'
      },
      color: '255, 152, 0'
    },
    {
      id: 'honesty' as DepositCategory,
      icon: '💎',
      name: { en: 'Honesty', he: 'כנות' },
      description: { 
        en: 'Practicing radical honesty with yourself',
        he: 'תרגול כנות רדיקלית עם עצמכם'
      },
      rebuilds: {
        en: 'Authenticity through truth-telling',
        he: 'אותנטיות דרך אמירת האמת'
      },
      color: '33, 150, 243'
    },
    {
      id: 'success' as DepositCategory,
      icon: '🏆',
      name: { en: 'Success', he: 'הצלחה' },
      description: { 
        en: 'Celebrating what worked and went well',
        he: 'חגיגה של מה שעבד והלך טוב'
      },
      rebuilds: {
        en: 'Self-worth through achievement recognition',
        he: 'ערך עצמי דרך הכרה בהישגים'
      },
      color: '156, 39, 176'
    },
    {
      id: 'self-compassion' as DepositCategory,
      icon: '🤗',
      name: { en: 'Self-Compassion', he: 'חמלה עצמית' },
      description: { 
        en: 'Treating yourself with kindness and understanding',
        he: 'יחס לעצמכם בחמלה ובהבנה'
      },
      rebuilds: {
        en: 'Internal safety through self-kindness',
        he: 'ביטחון פנימי דרך חמלה עצמית'
      },
      color: '233, 30, 99'
    }
  ]
  
  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory)
  
  return (
    <motion.div
      css={categorySelectorStyles}
      className={isRTL ? 'rtl' : ''}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        '--selected-category-color': selectedCategoryData?.color || '64, 224, 208'
      } as React.CSSProperties}
    >
      <div className="category-selector">
        <div className="selector-header">
          <h3 className="selector-title">
            {language === 'he' ? 'בחר את המטבע הטיפולי שלך' : 'Choose Your Therapeutic Currency'}
          </h3>
          <p className="selector-subtitle">
            {language === 'he' 
              ? 'איזה תחום רוצה לחזק היום?' 
              : 'Which area would you like to strengthen today?'
            }
          </p>
        </div>
        
        <div className="category-grid">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={`category-option ${category.id} ${selectedCategory === category.id ? 'selected' : ''}`}
              onClick={() => onCategorySelect(category.id)}
              whileTap={{ scale: 0.95 }}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name[language]}</div>
              {language === 'en' && (
                <div className="category-hebrew">{category.name.he}</div>
              )}
            </motion.div>
          ))}
        </div>
        
        <AnimatePresence>
          {selectedCategory && showDescription && selectedCategoryData && (
            <motion.div
              className="category-description"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="description-title">
                {selectedCategoryData.rebuilds[language]}
              </div>
              <div className="description-text">
                {selectedCategoryData.description[language]}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default CategoryCurrencySelector