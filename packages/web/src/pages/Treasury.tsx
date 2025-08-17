import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const treasuryStyles = css`
  min-height: calc(100vh - 80px);
  padding: 2rem;
  
  .treasury-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .treasury-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .treasury-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: breathing 4s ease-in-out infinite;
    }
    
    .treasury-title {
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      text-transform: lowercase;
    }
    
    .treasury-subtitle {
      font-size: 1.25rem;
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }
  
  .placeholder-treasury {
    background: linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(64, 224, 208, 0.05) 100%);
    backdrop-filter: blur(10px);
    padding: 3rem 2rem;
    border-radius: 1rem;
    border: 2px dashed var(--color-gold);
    text-align: center;
    
    .placeholder-icon {
      font-size: 4rem;
      margin-bottom: 2rem;
    }
    
    .placeholder-title {
      font-size: 1.75rem;
      color: var(--color-gold);
      margin-bottom: 1rem;
    }
    
    .placeholder-text {
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.6;
      max-width: 700px;
      margin: 0 auto 2rem;
    }
    
    .placeholder-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
      text-align: left;
      
      .feature-item {
        background: rgba(255, 255, 255, 0.5);
        padding: 1.5rem;
        border-radius: 0.75rem;
        
        .feature-icon {
          font-size: 2rem;
          margin-bottom: 0.75rem;
        }
        
        .feature-title {
          font-weight: 600;
          color: var(--color-warm-black);
          margin-bottom: 0.5rem;
        }
        
        .feature-description {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.4;
        }
      }
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .placeholder-features {
      text-align: right;
    }
  }
`

const Treasury: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  const features = [
    {
      icon: '💎',
      title: language === 'he' ? 'רגעים מהפכניים' : 'Transformative Moments',
      description: language === 'he' 
        ? 'ארכיון של ההפקדות הכי משמעותיות שלך ושל הקהילה'
        : 'Archive of your most meaningful deposits and community treasures'
    },
    {
      icon: '🔍',
      title: language === 'he' ? 'חיפוש מתקדם' : 'Advanced Search',
      description: language === 'he'
        ? 'מצא אוצרות לפי קטגוריה, תאריך, מילות מפתח או רגש'
        : 'Find treasures by category, date, keywords, or emotional state'
    },
    {
      icon: '⭐',
      title: language === 'he' ? 'הדגשות מיוחדות' : 'Special Highlights',
      description: language === 'he'
        ? 'אוצרות שזוכים להכרה מיוחדת על השפעתם הטיפולית'
        : 'Treasures that receive special recognition for their therapeutic impact'
    },
    {
      icon: '🌟',
      title: language === 'he' ? 'חוכמה קהילתית' : 'Community Wisdom',
      description: language === 'he'
        ? 'תובנות ולקחים שהקהילה לומדת מההפקדות החשובות'
        : 'Insights and lessons the community learns from important deposits'
    }
  ]
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      css={treasuryStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="treasury-container">
        <motion.header className="treasury-header" variants={fadeInVariants}>
          <div className="treasury-icon">⭐</div>
          <h1 className="treasury-title">{t('treasury.title')}</h1>
          <p className="treasury-subtitle">{t('treasury.subtitle')}</p>
        </motion.header>
        
        <motion.div className="placeholder-treasury" variants={fadeInVariants}>
          <div className="placeholder-icon">🏛️</div>
          <h2 className="placeholder-title">
            {language === 'he' ? 'אוצר האור בבנייה' : 'Treasury of Light in Development'}
          </h2>
          <p className="placeholder-text">
            {language === 'he'
              ? 'מרחב קדוש לאוצרות הטיפוליים הכי יקרים. כאן יישמרו הרגעים המהפכניים, התובנות העמוקות, והפריצות הרגשיות שלך ושל הקהילה. כל אוצר הוא נקודת אור במסע הריפוי הקולקטיביות שלנו.'
              : 'A sacred space for the most precious therapeutic treasures. Here will be preserved the transformative moments, deep insights, and emotional breakthroughs from you and the community. Each treasure is a point of light in our collective healing journey.'
            }
          </p>
          
          <div className="placeholder-features">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="feature-item"
                variants={fadeInVariants}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Treasury