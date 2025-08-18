import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../hooks/useLanguage'
import DepositForm from '../components/DepositForm'
import WelcomeScreen from '../components/WelcomeScreen'
import CrisisSupport, { CrisisTriggerButton } from '../components/CrisisSupport'
import { sampleExercise } from '../../../shared/constants/Exercises'
import { DepositInput } from '../../../shared/types/Deposit'
import { getBankerService } from '../../../shared/services/BankerService'
import { BankerResponse } from '../../../shared/types/Banker'
import { OnboardingStatus, User, createDefaultUser } from '../../../shared/types/User'
import { OnboardingService } from '../../../shared/services/OnboardingService'
import { CrisisDetectionService, CrisisRiskLevel } from '../../../shared/services/CrisisDetectionService'

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
      
      &.banker-response {
        background: rgba(255, 215, 0, 0.1);
        padding: 1rem;
        border-radius: 0.75rem;
        border-left: 3px solid var(--color-gold);
        animation: gentleGlow 2s ease-in-out;
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
  
  /* Exercise integration handled by DepositForm component */
  
  /* Form styling handled by DepositForm component */
  
  /* Hebrew RTL adjustments */
  &.rtl {
    direction: rtl;
    
    .heartbank-header {
      text-align: center;
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
  
  /* Gentle glow animation for banker responses */
  @keyframes gentleGlow {
    0% {
      box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
    50% {
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
    }
    100% {
      box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
    }
  }
`

const HeartBank: React.FC = () => {
  const { t, isRTL, language } = useLanguage()
  
  // State for banker interactions
  const [bankerResponse, setBankerResponse] = useState<BankerResponse | null>(null)
  const [showBankerResponse, setShowBankerResponse] = useState(false)
  
  // Onboarding state
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true) // Mock: true for demo
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState<OnboardingStatus>('not_started')
  const [showWelcome, setShowWelcome] = useState(true) // Mock: true for demo
  
  // Crisis support state
  const [showCrisisSupport, setShowCrisisSupport] = useState(false)
  const [currentRiskLevel, setCurrentRiskLevel] = useState<CrisisRiskLevel>('none')
  
  // Mock user data (in real app, this would come from auth/database)
  const [mockUser, setMockUser] = useState<User>(() => {
    const defaultUser = createDefaultUser({
      email: 'demo@example.com',
      language,
      timezone: 'Asia/Jerusalem',
      agreeToTerms: true,
      allowNotifications: true
    })
    return {
      ...defaultUser,
      id: 'demo-user-id',
      createdAt: new Date(),
      updatedAt: new Date(),
      onboardingStatus: 'not_started', // Start with onboarding for demo
      isFirstTimeUser: true,
      heartBankProfile: {
        ...defaultUser.heartBankProfile,
        balance: 0, // First-time user starts with 0
        totalDeposits: 0
      }
    }
  })
  
  // Mock data for returning users (when not in onboarding)
  const [returningUserData] = useState({
    balance: 245,
    streak: 8,
    totalDeposits: 12
  })
  
  // Get today's exercise
  const todayExercise = sampleExercise
  
  // Initialize services
  const bankerService = getBankerService()
  const onboardingService = new OnboardingService()
  const crisisDetectionService = new CrisisDetectionService()
  
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
  
  // Onboarding handlers
  const handleOnboardingNext = async () => {
    try {
      const nextStep = await onboardingService.advanceOnboardingStep(mockUser)
      setCurrentOnboardingStep(nextStep)
      
      // Update mock user
      setMockUser(prev => ({
        ...prev,
        onboardingStatus: nextStep
      }))
      
      // Complete onboarding flow
      if (nextStep === 'onboarding_complete') {
        setShowWelcome(false)
        setIsFirstTimeUser(false)
      }
    } catch (error) {
      console.error('Error advancing onboarding:', error)
    }
  }

  const handleOnboardingSkip = () => {
    setCurrentOnboardingStep('onboarding_complete')
    setShowWelcome(false)
    setIsFirstTimeUser(false)
  }

  const handleOnboardingComplete = () => {
    setShowWelcome(false)
    setIsFirstTimeUser(false)
    setMockUser(prev => ({
      ...prev,
      onboardingStatus: 'onboarding_complete',
      isFirstTimeUser: false
    }))
  }

  // Get current user data (onboarding vs returning user)
  const currentUserData = isFirstTimeUser ? mockUser.heartBankProfile : returningUserData

  const handleDepositSubmit = async (deposit: DepositInput) => {
    try {
      // Crisis detection first - safety priority
      const crisisContext = {
        userId: 'mock-user',
        depositContent: deposit.content,
        language,
        timeOfDay: (new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening') as 'morning' | 'afternoon' | 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: currentUserData.totalDeposits,
          streak: currentUserData.streak,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop' as const,
          connectivity: 'online' as const
        }
      }

      const crisisResult = await crisisDetectionService.detectCrisis(crisisContext)
      
      // Handle crisis if detected
      if (crisisResult.urgentIntervention || crisisResult.riskLevel === 'high' || crisisResult.riskLevel === 'critical') {
        setCurrentRiskLevel(crisisResult.riskLevel)
        setShowCrisisSupport(true)
        
        // Still show banker response for crisis
        const crisisResponse = crisisDetectionService.getImmediateCrisisResponse(crisisResult.riskLevel, language)
        if (crisisResponse) {
          setBankerResponse(crisisResponse)
          setShowBankerResponse(true)
        }
        
        return // Don't continue with normal deposit processing
      }

      // TODO: Implement actual deposit submission to Firebase
      console.log('Submitting deposit:', deposit)
      
      // For now, simulate success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update user data for first-time users
      if (isFirstTimeUser && mockUser.heartBankProfile.totalDeposits === 0) {
        // This is their first deposit - advance onboarding
        setMockUser(prev => ({
          ...prev,
          heartBankProfile: {
            ...prev.heartBankProfile,
            totalDeposits: 1,
            balance: 25, // First deposit value
            firstDepositDate: new Date(),
            lastDepositDate: new Date()
          },
          onboardingStatus: 'first_deposit_made'
        }))
        setCurrentOnboardingStep('first_deposit_made')
      }
      
      // Get banker response based on deposit
      const bankerContext = {
        userId: 'mock-user',
        language,
        trigger: 'deposit_submitted' as const,
        deposit: {
          id: 'temp-id',
          userId: 'mock-user',
          date: new Date(),
          content: deposit.content,
          category: deposit.category,
          wordCount: deposit.content.split(' ').filter(w => w.length > 0).length,
          isPublic: deposit.isPublic,
          baseValue: Math.max(20, deposit.content.split(' ').length * 2),
          interestRate: 0.05,
          currentValue: Math.max(20, deposit.content.split(' ').length * 2),
          compoundingSince: new Date(),
          linkedExercise: deposit.linkedExercise,
          language,
          mobileContext: {
            deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop' as 'mobile' | 'tablet' | 'desktop',
            inputMethod: 'keyboard' as const,
            sessionDuration: 300,
            interruptions: 0,
            timeOfDay: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening',
            location: 'unknown' as const
          },
          reactions: { heart: 0, trophy: 0, hug: 0, sparkle: 0 },
          inspirationCount: 0,
          commentCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1
        },
        userState: {
          streak: currentUserData.streak,
          totalDeposits: currentUserData.totalDeposits,
          balance: currentUserData.balance,
          preferredCategories: [deposit.category],
          recentMood: 'good' as const
        },
        timeContext: {
          timeOfDay: (new Date().getHours() < 12 ? 'morning' : 
                    new Date().getHours() < 18 ? 'afternoon' : 'evening') as 'morning' | 'afternoon' | 'evening',
          dayOfWeek: new Date().toLocaleDateString('en', { weekday: 'long' }),
          isWeekend: [0, 6].includes(new Date().getDay())
        },
        mobileContext: {
          deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop' as const,
          connectivity: 'online' as const,
          sessionDuration: 5,
          isFirstTimeToday: currentUserData.totalDeposits === 0
        },
        crisisIndicators: {
          riskLevel: 'none' as const,
          detectedKeywords: [],
          urgentIntervention: false,
          supportContactNeeded: false
        }
      }
      
      // Get banker response
      const response = await bankerService.getResponse(bankerContext)
      setBankerResponse(response)
      setShowBankerResponse(true)
      
      // Auto-hide response after 8 seconds
      setTimeout(() => {
        setShowBankerResponse(false)
      }, 8000)
      
    } catch (error) {
      console.error('Error submitting deposit:', error)
      throw error
    }
  }

  // Crisis handlers
  const handleCrisisOpen = () => {
    setShowCrisisSupport(true)
    setCurrentRiskLevel('medium') // Default to medium for manual triggers
  }

  const handleCrisisClose = () => {
    setShowCrisisSupport(false)
    setCurrentRiskLevel('none')
  }

  const handleEmergencyCall = (contactId: string) => {
    console.log(`Emergency call initiated to: ${contactId}`)
    // Log the emergency contact usage
  }
  
  // Show welcome screen for first-time users
  if (showWelcome && isFirstTimeUser) {
    return (
      <WelcomeScreen
        currentStep={currentOnboardingStep}
        onNext={handleOnboardingNext}
        onSkip={handleOnboardingSkip}
        onComplete={handleOnboardingComplete}
      />
    )
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
          
          {/* Demo toggle for testing (remove in production) */}
          <div style={{ 
            marginTop: '1rem', 
            display: 'flex', 
            gap: '0.5rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => {
                setIsFirstTimeUser(true)
                setShowWelcome(true)
                setCurrentOnboardingStep('not_started')
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-turquoise)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {language === 'he' ? 'דמו: משתמש חדש' : 'Demo: New User'}
            </button>
            <button
              onClick={() => {
                setIsFirstTimeUser(false)
                setShowWelcome(false)
                setCurrentOnboardingStep('onboarding_complete')
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-warm-black)',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {language === 'he' ? 'דמו: משתמש חוזר' : 'Demo: Returning User'}
            </button>
          </div>
        </motion.header>
        
        {/* Main Content */}
        <div className="heartbank-main">
          {/* Banker Presence */}
          <motion.aside className="banker-presence" variants={fadeInVariants}>
            <div className="banker-avatar">🏛️</div>
            
            {/* Banker Message - Dynamic based on responses */}
            <AnimatePresence mode="wait">
              {showBankerResponse && bankerResponse ? (
                <motion.div
                  key="banker-response"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="banker-message banker-response">
                    {bankerResponse?.content?.[language] || (language === 'he' ? 'תודה על ההפקדה שלך...' : 'Thank you for your deposit...')}
                  </p>
                  {bankerResponse?.therapeutic?.followUpSuggestion && (
                    <p style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--color-turquoise)', 
                      marginTop: '0.5rem',
                      fontStyle: 'normal'
                    }}>
                      {bankerResponse.therapeutic.followUpSuggestion}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.p 
                  key="banker-intro"
                  className="banker-message"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {todayExercise?.bankerIntro?.[language] || (language === 'he' ? 'ברוך הבא לבנק הלב שלך...' : 'Welcome to your HeartBank...')}
                </motion.p>
              )}
            </AnimatePresence>
            
            <div className="banker-stats">
              <div className="stat-item">
                <span className="stat-value">{currentUserData.balance}</span>
                <span className="stat-label">{t('heartbank.balance')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentUserData.streak}</span>
                <span className="stat-label">{t('heartbank.streak')}</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentUserData.totalDeposits}</span>
                <span className="stat-label">
                  {language === 'he' ? 'הפקדות' : 'Deposits'}
                </span>
              </div>
            </div>
          </motion.aside>
          
          {/* Main Content Area */}
          <div className="heartbank-content">
            {/* Enhanced Deposit Form with Exercise Integration */}
            <motion.section variants={fadeInVariants}>
              <DepositForm
                exercise={todayExercise}
                onSubmit={handleDepositSubmit}
              />
            </motion.section>
          </div>
        </div>
      </div>

      {/* Crisis Support UI */}
      <CrisisSupport 
        isVisible={showCrisisSupport}
        riskLevel={currentRiskLevel}
        onClose={handleCrisisClose}
        onEmergencyCall={handleEmergencyCall}
      />

      {/* Crisis Trigger Button - Always visible */}
      {!showCrisisSupport && (
        <CrisisTriggerButton onClick={handleCrisisOpen} />
      )}
    </motion.div>
  )
}

export default HeartBank