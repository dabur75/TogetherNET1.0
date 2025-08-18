import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import { StreakCelebration as StreakCelebrationType, StreakMilestone } from '../../../shared/types/Streak'

const celebrationStyles = css`
  .celebration-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    overflow: hidden;
  }

  .celebration-content {
    background: linear-gradient(135deg, var(--color-soft-white) 0%, rgba(255, 215, 0, 0.1) 100%);
    border-radius: 1.5rem;
    padding: 2rem;
    max-width: 90vw;
    max-height: 90vh;
    text-align: center;
    border: 2px solid rgba(255, 215, 0, 0.3);
    backdrop-filter: blur(20px);
    position: relative;
    overflow-y: auto;
    
    @media (min-width: 768px) {
      max-width: 500px;
      padding: 3rem;
    }
  }

  .milestone-number {
    font-size: 4rem;
    font-family: var(--font-banker);
    color: var(--color-gold);
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    
    @media (min-width: 768px) {
      font-size: 5rem;
    }
  }

  .achievement-type {
    font-size: 1.5rem;
    color: var(--color-turquoise);
    margin-bottom: 1.5rem;
    text-transform: capitalize;
    
    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  .banker-message {
    font-family: var(--font-banker);
    font-style: italic;
    color: var(--color-warm-black);
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1rem;
    
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }

  .rewards-section {
    margin-bottom: 2rem;
  }

  .rewards-title {
    font-size: 1.25rem;
    color: var(--color-gold);
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .reward-item {
    background: rgba(255, 215, 0, 0.1);
    border-radius: 0.75rem;
    padding: 1rem;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(255, 215, 0, 0.2);
    
    .reward-name {
      font-weight: 600;
      color: var(--color-turquoise);
      margin-bottom: 0.25rem;
    }
    
    .reward-description {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      opacity: 0.8;
    }
  }

  .celebration-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }

  .action-button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    
    &.primary {
      background: var(--color-gold);
      color: var(--color-warm-black);
      
      &:hover {
        background: rgba(255, 215, 0, 0.8);
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

  /* Animation particles */
  .particle {
    position: absolute;
    pointer-events: none;
    z-index: -1;
  }

  .golden-coin {
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, var(--color-gold) 0%, rgba(255, 215, 0, 0.6) 100%);
    border-radius: 50%;
    
    @media (min-width: 768px) {
      width: 30px;
      height: 30px;
    }
  }

  .light-particle {
    width: 8px;
    height: 8px;
    background: var(--color-turquoise);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--color-turquoise);
    
    @media (min-width: 768px) {
      width: 12px;
      height: 12px;
    }
  }

  .firework-spark {
    width: 4px;
    height: 20px;
    background: linear-gradient(45deg, var(--color-gold), var(--color-turquoise));
    border-radius: 2px;
    
    @media (min-width: 768px) {
      width: 6px;
      height: 30px;
    }
  }

  /* RTL support */
  &.rtl {
    direction: rtl;
    
    .celebration-content {
      text-align: center;
    }
  }
`

interface StreakCelebrationProps {
  celebration: StreakCelebrationType
  isVisible: boolean
  onClose: () => void
  onShare?: () => void
  onContinue: () => void
}

export const StreakCelebration: React.FC<StreakCelebrationProps> = ({
  celebration,
  isVisible,
  onClose,
  onShare,
  onContinue
}) => {
  const { t, isRTL, language } = useLanguage()
  const [animationPhase, setAnimationPhase] = useState<'entering' | 'celebrating' | 'settling'>('entering')

  useEffect(() => {
    if (isVisible) {
      // Play sound effect
      playSound(celebration.soundEffect)
      
      // Trigger haptic feedback
      triggerHaptic(celebration.hapticPattern)
      
      // Animation sequence
      setAnimationPhase('entering')
      setTimeout(() => setAnimationPhase('celebrating'), 500)
      setTimeout(() => setAnimationPhase('settling'), 2000)
    }
  }, [isVisible, celebration])

  const playSound = (soundEffect: string) => {
    // In a real implementation, play actual sound files
    console.log(`Playing sound: ${soundEffect}`)
  }

  const triggerHaptic = (pattern: string) => {
    // Trigger haptic feedback on mobile devices
    if ('vibrate' in navigator) {
      const patterns = {
        gentle_tap: [100],
        double_pulse: [100, 50, 100],
        success_buzz: [200],
        celebration_rhythm: [100, 50, 100, 50, 200]
      }
      navigator.vibrate(patterns[pattern as keyof typeof patterns] || [100])
    }
  }

  const renderAnimationParticles = () => {
    const particleCount = celebration.animationType === 'fireworks' ? 20 : 
                         celebration.animationType === 'light_burst' ? 15 : 
                         celebration.animationType === 'golden_coins' ? 12 : 8

    return Array.from({ length: particleCount }, (_, i) => (
      <motion.div
        key={i}
        className={`particle ${getParticleClass()}`}
        initial={{ 
          opacity: 0, 
          scale: 0,
          x: 0,
          y: 0,
          rotate: 0
        }}
        animate={animationPhase === 'celebrating' ? {
          opacity: [0, 1, 1, 0],
          scale: [0, 1.2, 1, 0.8],
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 400,
          rotate: Math.random() * 360
        } : {}}
        transition={{
          duration: 2.5,
          delay: Math.random() * 0.5,
          ease: "easeOut"
        }}
      />
    ))
  }

  const getParticleClass = () => {
    switch (celebration.animationType) {
      case 'golden_coins': return 'golden-coin'
      case 'light_burst': return 'light-particle'
      case 'fireworks': return 'firework-spark'
      default: return 'light-particle'
    }
  }

  const milestone = celebration.milestoneReached

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          css={celebrationStyles}
          className={isRTL ? 'rtl' : ''}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="celebration-overlay" onClick={onClose}>
            <motion.div
              className="celebration-content"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                duration: 0.6 
              }}
            >
              {/* Animation Particles */}
              {renderAnimationParticles()}

              {/* Milestone Achievement */}
              <motion.div
                className="milestone-number"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.3, 
                  type: "spring", 
                  damping: 10, 
                  stiffness: 200 
                }}
              >
                {milestone.streakDay}
              </motion.div>

              <motion.div
                className="achievement-type"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {t(`streaks.achievement.${milestone.achievementType}`) || milestone.achievementType}
              </motion.div>

              {/* Banker Message */}
              <motion.div
                className="banker-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {celebration.bankerResponse}
              </motion.div>

              {/* Rewards Section */}
              {celebration.rewards.length > 0 && (
                <motion.div
                  className="rewards-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="rewards-title">
                    {celebration.unlockMessage[language]}
                  </div>
                  
                  {celebration.rewards.slice(0, 3).map((reward, index) => (
                    <motion.div
                      key={reward.type + index}
                      className="reward-item"
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + index * 0.1 }}
                    >
                      <div className="reward-name">
                        {reward.displayName[language]}
                      </div>
                      <div className="reward-description">
                        {reward.description[language]}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Action Buttons */}
              <motion.div
                className="celebration-actions"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <button
                  className="action-button primary"
                  onClick={onContinue}
                >
                  {language === 'he' ? 'המשך להפקיד' : 'Continue Journey'}
                </button>
                
                {onShare && (
                  <button
                    className="action-button secondary"
                    onClick={onShare}
                  >
                    {language === 'he' ? 'שתף הישג' : 'Share Achievement'}
                  </button>
                )}
              </motion.div>

              {/* Close button */}
              <motion.button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: isRTL ? 'auto' : '1rem',
                  left: isRTL ? '1rem' : 'auto',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '1.5rem',
                  color: 'var(--color-warm-black)',
                  cursor: 'pointer',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease'
                }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2 }}
              >
                ✕
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default StreakCelebration