import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'

const galleryStyles = css`
  min-height: calc(100vh - 80px);
  padding: 2rem;
  
  .gallery-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .gallery-header {
    text-align: center;
    margin-bottom: 3rem;
    
    .gallery-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }
    
    .gallery-title {
      font-size: 2.5rem;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      text-transform: lowercase;
    }
    
    .gallery-subtitle {
      font-size: 1.25rem;
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }
  
  .placeholder-gallery {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    padding: 3rem 2rem;
    border-radius: 1rem;
    border: 2px dashed var(--color-turquoise);
    text-align: center;
    
    .placeholder-icon {
      font-size: 4rem;
      margin-bottom: 2rem;
      opacity: 0.7;
    }
    
    .placeholder-title {
      font-size: 1.75rem;
      color: var(--color-turquoise);
      margin-bottom: 1rem;
    }
    
    .placeholder-text {
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.6;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
  }
`

const Gallery: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }
  
  return (
    <motion.div 
      css={galleryStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      <div className="gallery-container">
        <motion.header className="gallery-header" variants={fadeInVariants}>
          <div className="gallery-icon">🌐</div>
          <h1 className="gallery-title">{t('gallery.title')}</h1>
          <p className="gallery-subtitle">{t('gallery.subtitle')}</p>
        </motion.header>
        
        <motion.div className="placeholder-gallery" variants={fadeInVariants}>
          <div className="placeholder-icon">🖼️</div>
          <h2 className="placeholder-title">
            {language === 'he' ? 'גלריה קהילתית בבנייה' : 'Community Gallery Coming Soon'}
          </h2>
          <p className="placeholder-text">
            {language === 'he'
              ? 'כאן תוכל לראות ולחלוק יצירות מההפקדות שלך ושל הקהילה. גלריה של מסעות ריפוי, אמנות טיפולית, וסיפורים מעוררי השראה מרחבי העולם.'
              : 'Here you\'ll be able to view and share creations from your deposits and the community. A gallery of healing journeys, therapeutic art, and inspiring stories from around the world.'
            }
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Gallery