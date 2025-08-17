import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import DepositForm from '../components/DepositForm'
import { currentExercise } from '../../../shared/constants/Exercises'
import { DepositInput } from '../../../shared/types/Deposit'

const heartbankStyles = css`
  min-height: calc(100vh - 80px);
  background: linear-gradient(
    135deg,
    var(--color-soft-white) 0%,
    rgba(255, 215, 0, 0.05) 50%,
    rgba(64, 224, 208, 0.03) 100%
  );
  
  /* Mobile-first container */
  .heartbank-container {
    max-width: 100%;
    padding: 1rem;
    margin: 0 auto;
    
    @media (min-width: 768px) {
      max-width: 1200px;
      padding: 2rem;
    }
  }
  
  /* Mobile-first header */
  .heartbank-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 1.5rem 1rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    border: 1px solid rgba(255, 215, 0, 0.2);
    
    @media (min-width: 768px) {
      margin-bottom: 3rem;
      padding: 2rem;
    }
    
    .heartbank-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: breathing 4s ease-in-out infinite;
      
      @media (min-width: 768px) {
        font-size: 4rem;
      }
    }
    
    .heartbank-title {
      font-size: 2rem;
      color: var(--color-gold);
      margin-bottom: 0.5rem;
      text-transform: lowercase;
      font-family: var(--font-banker);
      
      @media (min-width: 768px) {
        font-size: 2.5rem;
      }
    }
    
    .heartbank-subtitle {
      font-size: 1rem;
      color: var(--color-warm-black);
      opacity: 0.8;
      line-height: 1.5;
      
      @media (min-width: 768px) {
        font-size: 1.25rem;
      }
    }
  }
  
  /* Mobile-first layout */
  .heartbank-main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    
    @media (min-width: 1024px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
  
  /* Banker presence area - mobile optimized */
  .banker-presence {
    background: rgba(255, 215, 0, 0.1);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid rgba(255, 215, 0, 0.3);
    text-align: center;
    order: 1;
    
    @media (min-width: 1024px) {
      order: 0;
    }
    
    .banker-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(45deg, var(--color-gold), var(--color-turquoise));
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 1.5rem;
      animation: breathing 4s ease-in-out infinite;
    }
    
    .banker-message {
      font-family: var(--font-banker);
      font-style: italic;
      color: var(--color-gold);
      font-size: 1rem;
      line-height: 1.5;
      margin-bottom: 1rem;
      
      @media (min-width: 768px) {
        font-size: 1.1rem;
      }
    }
    
    .banker-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;
      
      .stat-item {
        text-align: center;
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--color-gold);
          display: block;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: var(--color-warm-black);
          opacity: 0.7;
        }
      }
    }
  }
  
  /* Main content area */
  .heartbank-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    order: 2;
    
    @media (min-width: 1024px) {
      order: 0;
    }
  }
  
  /* Daily exercise card - mobile first */
  .daily-exercise-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(64, 224, 208, 0.3);
    touch-action: manipulation;
    
    .exercise-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      
      .exercise-title {
        font-size: 1.25rem;
        color: var(--color-turquoise);
        font-weight: 600;
        
        @media (min-width: 768px) {
          font-size: 1.5rem;
        }
      }
      
      .exercise-icon {
        font-size: 1.5rem;
        animation: breathing 3s ease-in-out infinite;
      }
    }
    
    .exercise-content {
      background: rgba(64, 224, 208, 0.05);
      padding: 1rem;
      border-radius: 0.75rem;
      margin-bottom: 1rem;
      border-left: 4px solid var(--color-turquoise);
      
      .exercise-prompt {
        font-size: 1rem;
        line-height: 1.6;
        color: var(--color-warm-black);
        margin-bottom: 0.75rem;
      }
      
      .exercise-category {
        display: inline-block;
        background: var(--color-turquoise);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.8rem;
        font-weight: 500;
      }
    }
    
    .exercise-actions {
      display: flex;
      gap: 0.75rem;
      
      .exercise-btn {
        flex: 1;
        padding: 0.75rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;
        
        &.primary {
          background: var(--color-turquoise);
          color: white;
          
          &:hover {
            background: var(--color-gold);
            transform: translateY(-2px);
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
      }
    }
  }
  
  /* Deposit form card - mobile optimized */
  .deposit-form-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 1px solid rgba(255, 215, 0, 0.3);
    
    .form-header {
      margin-bottom: 1rem;
      
      .form-title {
        font-size: 1.25rem;
        color: var(--color-gold);
        font-weight: 600;
        margin-bottom: 0.5rem;
        
        @media (min-width: 768px) {
          font-size: 1.5rem;
        }
      }
      
      .form-subtitle {
        font-size: 0.9rem;
        color: var(--color-warm-black);
        opacity: 0.7;
      }
    }
    
    .deposit-textarea {
      width: 100%;
      min-height: 120px;
      padding: 1rem;
      border: 2px solid rgba(255, 215, 0, 0.3);
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.5;
      resize: vertical;
      transition: border-color 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: var(--color-gold);
      }
      
      &::placeholder {
        color: var(--color-warm-black);
        opacity: 0.5;
      }
    }
    
    .form-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1rem;
      
      .word-count {
        font-size: 0.8rem;
        color: var(--color-warm-black);
        opacity: 0.6;
      }
      
      .deposit-btn {
        padding: 0.75rem 1.5rem;
        background: var(--color-gold);
        color: var(--color-warm-black);
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;
        
        &:hover {
          background: var(--color-turquoise);
          color: white;
          transform: translateY(-2px);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
      }
    }
  }
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .heartbank-header {
      text-align: center;
    }
    
    .exercise-header {
      flex-direction: row-reverse;
    }
    
    .exercise-content {
      border-left: none;
      border-right: 4px solid var(--color-turquoise);
    }
    
    .form-footer {
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

const HeartBank: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  // Mock data for development
  const [mockData] = useState({
    balance: 245,
    streak: 8,
    totalDeposits: 12
  })
  
  // Get today's exercise
  const todayExercise = currentExercise
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }
  
  const handleDepositSubmit = async (deposit: DepositInput) => {
    try {
      // TODO: Implement actual deposit submission to Firebase
      console.log('Submitting deposit:', deposit)
      
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message handled by DepositForm
    } catch (error) {
      console.error('Error submitting deposit:', error)
      throw error
    }
  }
  
  return (
    <motion.div 
      css={heartbankStyles} 
      className={isRTL ? 'rtl' : ''}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="heartbank-container">
        {/* Header */}
        <motion.header className="heartbank-header" variants={fadeInVariants}>
          <div className="heartbank-icon">🏦</div>
          <h1 className="heartbank-title">{t('heartbank.title')}</h1>
          <p className="heartbank-subtitle">{t('heartbank.subtitle')}</p>
        </motion.header>
        
        {/* Main Content */}
        <div className="heartbank-main">
          {/* Banker Presence */}
          <motion.aside className="banker-presence" variants={fadeInVariants}>
            <div className="banker-avatar">🏛️</div>
            <p className="banker-message">
              {todayExercise.bankerIntro[language]}
            </p>
            
            <div className="banker-stats">
              <div className="stat-item">
                <span className="stat-value">{mockData.balance}</span>
                <span className="stat-label">{t('heartbank.balance')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{mockData.streak}</span>
                <span className="stat-label">{t('heartbank.streak')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{mockData.totalDeposits}</span>
                <span className="stat-label">
                  {language === 'he' ? 'הפקדות' : 'Deposits'}
                </span>
              </div>
            </div>
          </motion.aside>
          
          {/* Main Content Area */}
          <div className="heartbank-content">
            {/* Daily Exercise */}
            <motion.section className="daily-exercise-card" variants={fadeInVariants}>
              <div className="exercise-header">
                <h2 className="exercise-title">{t('heartbank.dailyExercise')}</h2>
                <span className="exercise-icon">🌱</span>
              </div>
              
              <div className="exercise-content">
                <p className="exercise-prompt">
                  {todayExercise.exercise[language]}
                </p>
                <span className="exercise-category">
                  {language === 'he' ? 'הכרת תודה' : 'gratitude'}
                </span>
              </div>
              
              <div className="exercise-actions">
                <button className="exercise-btn primary">
                  {language === 'he' ? 'התחל תרגיל' : 'Start Exercise'}
                </button>
                <button className="exercise-btn secondary">
                  {language === 'he' ? 'דלג היום' : 'Skip Today'}
                </button>
              </div>
            </motion.section>
            
            {/* Deposit Form */}
            <DepositForm
              linkedExercise={{
                id: todayExercise.id,
                category: todayExercise.category,
                prompt: todayExercise.exercise[language]
              }}
              onSubmit={handleDepositSubmit}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default HeartBank