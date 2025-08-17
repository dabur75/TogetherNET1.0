import React from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const welcomeStyles = css`
  min-height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(
    135deg,
    var(--color-soft-white) 0%,
    rgba(255, 215, 0, 0.1) 50%,
    rgba(64, 224, 208, 0.05) 100%
  );
  
  .welcome-container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .welcome-icon {
    font-size: 4rem;
    margin-bottom: 2rem;
    animation: breathing 4s ease-in-out infinite;
  }
  
  .welcome-title {
    font-size: 3rem;
    color: var(--color-gold);
    margin-bottom: 1rem;
    font-weight: 400;
    text-transform: lowercase;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  .welcome-subtitle {
    font-size: 1.25rem;
    color: var(--color-warm-black);
    margin-bottom: 2rem;
    opacity: 0.8;
    line-height: 1.6;
  }
  
  .welcome-quote {
    font-family: var(--font-banker);
    font-style: italic;
    font-size: 1.375rem;
    color: var(--color-gold);
    margin-bottom: 3rem;
    line-height: 1.5;
    max-width: 600px;
  }
  
  .welcome-actions {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
  }
  
  .welcome-button {
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    
    &.primary {
      background: var(--color-gold);
      color: var(--color-warm-black);
      
      &:hover {
        background: var(--color-turquoise);
        color: white;
        transform: translateY(-3px);
        box-shadow: var(--shadow-healing);
        text-decoration: none;
      }
    }
    
    &.secondary {
      background: transparent;
      color: var(--color-turquoise);
      border: 2px solid var(--color-turquoise);
      
      &:hover {
        background: var(--color-turquoise);
        color: white;
        transform: translateY(-3px);
        box-shadow: var(--shadow-healing);
        text-decoration: none;
      }
    }
  }
  
  .features-grid {
    margin-top: 4rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    max-width: 1000px;
  }
  
  .feature-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-gentle);
      border-color: var(--color-gold);
    }
    
    .feature-icon {
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }
    
    .feature-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--color-warm-black);
      margin-bottom: 0.75rem;
    }
    
    .feature-description {
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.5;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    text-align: right;
    
    .welcome-quote {
      font-family: var(--font-hebrew);
    }
  }
`

const Welcome: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
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
  
  return (
    <motion.div 
      css={welcomeStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="welcome-container">
        <motion.div variants={fadeInVariants}>
          <div className="welcome-icon">🏦💛</div>
        </motion.div>
        
        <motion.h1 className="welcome-title" variants={fadeInVariants}>
          TogetherNet
        </motion.h1>
        
        <motion.p className="welcome-subtitle" variants={fadeInVariants}>
          {language === 'he' 
            ? 'פלטפורמת טיפול מהפכנית הבונה מחדש ערך עצמי'
            : 'Revolutionary therapeutic platform that rebuilds self-worth'
          }
        </motion.p>
        
        <motion.blockquote className="welcome-quote" variants={fadeInVariants}>
          {t('therapeutic.worth')}<br />
          {t('therapeutic.rebuilding')}
        </motion.blockquote>
        
        <motion.div className="welcome-actions" variants={fadeInVariants}>
          <Link to="/heartbank" className="welcome-button primary">
            🏦 {t('navigation.heartbank')}
          </Link>
          <Link to="/studio" className="welcome-button secondary">
            🎨 {t('navigation.studio')}
          </Link>
        </motion.div>
        
        <motion.div 
          className="features-grid" 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="feature-card" variants={fadeInVariants}>
            <div className="feature-icon">🏦</div>
            <h3 className="feature-title">{t('navigation.heartbank')}</h3>
            <p className="feature-description">
              {language === 'he' 
                ? 'הפקדות יומיות הבונות את העושר הרגשי שלך עם ריבית דריבית'
                : 'Daily emotional deposits that build your worth with compound interest'
              }
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={fadeInVariants}>
            <div className="feature-icon">🎨</div>
            <h3 className="feature-title">{t('navigation.studio')}</h3>
            <p className="feature-description">
              {language === 'he'
                ? 'כלי יצירה לביטוי ההפקדות שלך דרך אמנות ומדיטציה'
                : 'Creative tools to express your deposits through art and meditation'
              }
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={fadeInVariants}>
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">{t('navigation.gallery')}</h3>
            <p className="feature-description">
              {language === 'he'
                ? 'קהילה של לבבות מתרפאים החולקים את המסע שלהם'
                : 'A community of healing hearts sharing their journey'
              }
            </p>
          </motion.div>
          
          <motion.div className="feature-card" variants={fadeInVariants}>
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">{t('navigation.treasury')}</h3>
            <p className="feature-description">
              {language === 'he'
                ? 'אוצר של רגעים מהפכניים וחוכמה טיפולית'
                : 'Treasury of transformative moments and therapeutic wisdom'
              }
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Welcome