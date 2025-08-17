import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const heartbankStyles = css`
  min-height: calc(100vh - 80px);
  padding: 2rem;
  
  .heartbank-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .heartbank-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .heartbank-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
      animation: breathing 4s ease-in-out infinite;
    }
    
    .heartbank-title {
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      text-transform: lowercase;
    }
    
    .heartbank-subtitle {
      font-size: 1.25rem;
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }
  
  .heartbank-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
  
  .section-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.2);
    
    .section-title {
      font-size: 1.5rem;
      color: var(--color-gold);
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .section-content {
      color: var(--color-warm-black);
      line-height: 1.6;
    }
  }
  
  .placeholder-message {
    background: var(--color-gentle);
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    margin-top: 2rem;
    border: 2px dashed var(--color-gold);
    
    .placeholder-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .placeholder-text {
      font-family: var(--font-banker);
      font-style: italic;
      color: var(--color-gold);
      font-size: 1.1rem;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .heartbank-header {
      text-align: center;
    }
    
    .section-title {
      flex-direction: row-reverse;
    }
  }
`

const HeartBank: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      css={heartbankStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="heartbank-container">
        <motion.header className="heartbank-header" variants={fadeInVariants}>
          <div className="heartbank-icon">🏦</div>
          <h1 className="heartbank-title">{t('heartbank.title')}</h1>
          <p className="heartbank-subtitle">{t('heartbank.subtitle')}</p>
        </motion.header>
        
        <div className="heartbank-content">
          <motion.section className="section-card" variants={fadeInVariants}>
            <h2 className="section-title">
              <span>📅</span>
              {t('heartbank.dailyExercise')}
            </h2>
            <div className="section-content">
              <p>
                {language === 'he' 
                  ? 'התרגיל היומי שלך מתפרסם כל בוקר בשעה 6:00 בזמן ישראל. כל תרגיל מותאם לבניית הערך העצמי שלך דרך אחת מחמש הקטגוריות הטיפוליות.'
                  : 'Your daily exercise is published every morning at 6 AM Israel time. Each exercise is crafted to build your self-worth through one of five therapeutic categories.'
                }
              </p>
            </div>
          </motion.section>
          
          <motion.section className="section-card" variants={fadeInVariants}>
            <h2 className="section-title">
              <span>💰</span>
              {t('heartbank.balance')}
            </h2>
            <div className="section-content">
              <p>
                {language === 'he'
                  ? 'העושר הרגשי שלך צומח עם כל הפקדה. הפקדות ישנות מקבלות ריבית דריבית, והרצף שלך עוקב אחר דפוסי צמיחה טבעיים של פיבונאצ\'י.'
                  : 'Your emotional wealth grows with each deposit. Old deposits earn compound interest, and your streak follows natural Fibonacci growth patterns.'
                }
              </p>
            </div>
          </motion.section>
          
          <motion.section className="section-card" variants={fadeInVariants}>
            <h2 className="section-title">
              <span>🏛️</span>
              {language === 'he' ? 'הבנקאי שלך' : 'Your Banker'}
            </h2>
            <div className="section-content">
              <p>
                {language === 'he'
                  ? 'הבנקאי הטיפולי שלך מגיב לכל הפקדה במתודולוגיה מבוססת הרחבה. הוא לא רובוט - הוא נוכחות טיפולית חמה המאמינה בעושר שלך.'
                  : 'Your therapeutic banker responds to each deposit with expansion-based methodology. Not a chatbot - a warm therapeutic presence that believes in your wealth.'
                }
              </p>
            </div>
          </motion.section>
          
          <motion.section className="section-card" variants={fadeInVariants}>
            <h2 className="section-title">
              <span>🔔</span>
              {language === 'he' ? 'תזכורות עדינות' : 'Gentle Reminders'}
            </h2>
            <div className="section-content">
              <p>
                {language === 'he'
                  ? 'תזכורות עדינות בבוקר, אחר הצהריים ובערב. לעולם לא מתחרפנות או מלחיצות - תמיד מכבדות את הזמנים והמוכנות שלך.'
                  : 'Gentle reminders in morning, afternoon, and evening. Never aggressive or pressuring - always honoring your timing and readiness.'
                }
              </p>
            </div>
          </motion.section>
        </div>
        
        <motion.div className="placeholder-message" variants={fadeInVariants}>
          <div className="placeholder-icon">🚧</div>
          <p className="placeholder-text">
            {language === 'he'
              ? 'בנק הלב שלך בבנייה. בקרוב תוכל להתחיל לבנות את העושר הרגשי שלך כאן.'
              : 'Your HeartBank is under construction. Soon you\'ll be able to start building your emotional wealth here.'
            }
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default HeartBank