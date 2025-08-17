import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const studioStyles = css`
  min-height: calc(100vh - 80px);
  padding: 2rem;
  
  .studio-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .studio-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .studio-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .studio-title {
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      text-transform: lowercase;
    }
    
    .studio-subtitle {
      font-size: 1.25rem;
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }
  
  .tools-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
  }
  
  .tool-card {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: var(--shadow-gentle);
      border-color: var(--color-gold);
    }
    
    .tool-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }
    
    .tool-title {
      font-size: 1.5rem;
      color: var(--color-gold);
      margin-bottom: 1rem;
    }
    
    .tool-description {
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.5;
    }
    
    .tool-status {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      background: rgba(64, 224, 208, 0.1);
      color: var(--color-turquoise);
      border-radius: 0.5rem;
      font-size: 0.875rem;
      font-weight: 500;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
  }
`

const CreativeStudio: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  const tools = [
    {
      icon: '🎨',
      titleKey: 'emotionPainter',
      description: language === 'he' 
        ? 'כלי ציור מתקדם לביטוי רגשות דרך צבעים וצורות. מבוסס על Konva.js עם תמיכה במברשות טיפוליות.'
        : 'Advanced painting tool for expressing emotions through colors and shapes. Built with Konva.js with therapeutic brush support.'
    },
    {
      icon: '📚',
      titleKey: 'storyWeaver',
      description: language === 'he'
        ? 'הפוך את ההפקדות שלך לסיפורים משמעותיים. כלי כתיבה עם תבניות מובנות ותמיכה קולית.'
        : 'Transform your deposits into meaningful stories. Writing tool with built-in templates and voice support.'
    },
    {
      icon: '🌸',
      titleKey: 'gratitudeGarden',
      description: language === 'he'
        ? 'גן הכרת תודה אינטראקטיבי שצומח עם ההפקדות שלך. כל פרח מייצג רגע של הכרת תודה.'
        : 'Interactive gratitude garden that grows with your deposits. Each flower represents a moment of gratitude.'
    },
    {
      icon: '🧘',
      titleKey: 'meditationSpace',
      description: language === 'he'
        ? 'מרחב מדיטציה עם צלילים מרגיעים, אנימציות נשימה וסביבות טיפוליות מותאמות אישית.'
        : 'Meditation space with calming sounds, breathing animations, and personalized therapeutic environments.'
    }
  ]
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      css={studioStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.1 }}
    >
      <div className="studio-container">
        <motion.header className="studio-header" variants={fadeInVariants}>
          <div className="studio-icon">🎨</div>
          <h1 className="studio-title">{t('studio.title')}</h1>
          <p className="studio-subtitle">{t('studio.subtitle')}</p>
        </motion.header>
        
        <div className="tools-grid">
          {tools.map((tool) => (
            <motion.div 
              key={tool.titleKey}
              className="tool-card"
              variants={fadeInVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="tool-icon">{tool.icon}</div>
              <h3 className="tool-title">
                {t(`studio.tools.${tool.titleKey}`)}
              </h3>
              <p className="tool-description">
                {tool.description}
              </p>
              <div className="tool-status">
                {language === 'he' ? 'בפיתוח' : 'Coming Soon'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default CreativeStudio