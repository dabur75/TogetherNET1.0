// OnboardingService - First-Time User Experience
// TogetherNet Therapeutic Platform

import { 
  User, 
  OnboardingStatus, 
  FirstTimeUserState, 
  BankerIntroductionState,
  getNextOnboardingStep,
  isFirstTimeUser 
} from '../types/User'
import { Language } from '../types/Exercise'
import { BankerResponse } from '../types/Banker'
import { firstTimeResponses } from '../constants/BankerResponses'

/**
 * OnboardingService - Manages First-Time User Journey
 * Mobile-optimized therapeutic onboarding experience
 */
export class OnboardingService {
  private onboardingSteps: OnboardingStatus[] = [
    'not_started',
    'welcome_seen',
    'heartbank_intro_seen',
    'first_exercise_viewed',
    'first_deposit_made',
    'banker_intro_seen',
    'categories_explained',
    'privacy_settings_set',
    'reminders_configured',
    'onboarding_complete'
  ]

  /**
   * Check if user needs onboarding
   */
  public needsOnboarding(user: User): boolean {
    return isFirstTimeUser(user) || user.onboardingStatus !== 'onboarding_complete'
  }

  /**
   * Get current onboarding state for user
   */
  public getOnboardingState(user: User): FirstTimeUserState {
    const currentStepIndex = this.onboardingSteps.indexOf(user.onboardingStatus)
    const completedSteps = this.onboardingSteps.slice(0, currentStepIndex + 1) as OnboardingStatus[]
    const remainingSteps = this.onboardingSteps.length - (currentStepIndex + 1)
    
    return {
      userId: user.id,
      currentStep: user.onboardingStatus,
      completedSteps,
      skipAvailable: currentStepIndex > 2, // Allow skip after first few steps
      estimatedTimeRemaining: remainingSteps * 2, // ~2 minutes per step
      
      welcomeSequence: {
        hasSeenWelcome: this.hasCompletedStep(user, 'welcome_seen'),
        hasSeenHeartBankIntro: this.hasCompletedStep(user, 'heartbank_intro_seen'),
        hasViewedFirstExercise: this.hasCompletedStep(user, 'first_exercise_viewed'),
        hasMadeFirstDeposit: this.hasCompletedStep(user, 'first_deposit_made'),
        hasMetBanker: this.hasCompletedStep(user, 'banker_intro_seen'),
        hasConfiguredSettings: this.hasCompletedStep(user, 'privacy_settings_set')
      },
      
      mobileOnboarding: {
        hasTestedKeyboard: user.usagePatterns.averageSessionDuration > 0,
        hasTriedHapticFeedback: user.mobileSettings.hapticFeedbackEnabled,
        hasConfiguredNotifications: user.mobileSettings.notificationsEnabled,
        hasSeenRTLDemo: user.isRTLUser && this.hasCompletedStep(user, 'welcome_seen')
      },
      
      therapeuticIntro: {
        hasSeenMethodologyExplanation: this.hasCompletedStep(user, 'heartbank_intro_seen'),
        hasLearnedAboutCategories: this.hasCompletedStep(user, 'categories_explained'),
        hasUnderstoodWealthConcept: this.hasCompletedStep(user, 'first_deposit_made'),
        hasSeenBankerRole: this.hasCompletedStep(user, 'banker_intro_seen')
      }
    }
  }

  /**
   * Get banker response for current onboarding step
   */
  public getBankerResponseForStep(
    step: OnboardingStatus, 
    language: Language,
    isMobile: boolean = false
  ): BankerResponse | null {
    
    // Map onboarding steps to banker responses
    const stepResponseMap: Record<OnboardingStatus, string> = {
      'not_started': 'initial_welcome_001',
      'welcome_seen': 'heartbank_explanation_001',
      'heartbank_intro_seen': 'first_exercise_encouragement_001',
      'first_exercise_viewed': 'welcome_001', // First deposit encouragement
      'first_deposit_made': 'welcome_002', // Celebration of first deposit
      'banker_intro_seen': 'categories_intro_001',
      'categories_explained': 'privacy_intro_001',
      'privacy_settings_set': isMobile ? 'mobile_welcome_001' : 'gentle_encouragement_001',
      'reminders_configured': 'welcome_003', // Journey ahead
      'onboarding_complete': 'welcome_001' // Default welcome
    }

    const responseId = stepResponseMap[step]
    const response = firstTimeResponses.find(r => r.id === responseId)
    
    return response || null
  }

  /**
   * Advance user to next onboarding step
   */
  public async advanceOnboardingStep(user: User): Promise<OnboardingStatus> {
    const nextStep = getNextOnboardingStep(user.onboardingStatus)
    
    if (!nextStep) {
      return user.onboardingStatus // Already complete
    }

    // Here you would typically update the user in your database
    // For now, we'll just return the next step
    
    return nextStep
  }

  /**
   * Skip to specific onboarding step (if allowed)
   */
  public canSkipToStep(user: User, targetStep: OnboardingStatus): boolean {
    const currentIndex = this.onboardingSteps.indexOf(user.onboardingStatus)
    const targetIndex = this.onboardingSteps.indexOf(targetStep)
    
    // Can skip forward but not backward
    // Must have completed at least the first 3 steps
    return currentIndex >= 2 && targetIndex > currentIndex
  }

  /**
   * Get onboarding progress percentage
   */
  public getProgressPercentage(user: User): number {
    const currentIndex = this.onboardingSteps.indexOf(user.onboardingStatus)
    const totalSteps = this.onboardingSteps.length - 1 // Exclude 'not_started'
    
    return Math.round(((currentIndex) / totalSteps) * 100)
  }

  /**
   * Create banker introduction state for first meeting
   */
  public createBankerIntroduction(user: User): BankerIntroductionState {
    return {
      userId: user.id,
      hasMetBanker: this.hasCompletedStep(user, 'banker_intro_seen'),
      introductionDate: this.hasCompletedStep(user, 'banker_intro_seen') ? user.accountCreatedAt : undefined,
      
      stages: {
        bankerAppearance: this.hasCompletedStep(user, 'welcome_seen'),
        bankerWelcome: this.hasCompletedStep(user, 'welcome_seen'),
        bankerRoleExplanation: this.hasCompletedStep(user, 'heartbank_intro_seen'),
        bankerPromise: this.hasCompletedStep(user, 'banker_intro_seen'),
        bankerInvitation: this.hasCompletedStep(user, 'first_exercise_viewed')
      },
      
      userComfort: {
        feelsComfortable: true, // Default to true, can be updated
        hasQuestions: false,
        needsMoreTime: false,
        preferencesExpressed: []
      },
      
      bankerPersonalization: {
        preferredTone: user.language === 'he' ? 'warm' : 'gentle',
        communicationStyle: 'conversational',
        responsiveness: 'thoughtful'
      }
    }
  }

  /**
   * Get contextual help text for current step
   */
  public getStepHelpText(step: OnboardingStatus, language: Language): string {
    const helpTexts: Record<OnboardingStatus, Record<Language, string>> = {
      'not_started': {
        en: 'Welcome to your healing journey. Let\'s take this one step at a time.',
        he: 'ברוכים הבאים למסע הריפוי שלכם. בואו ניקח את זה צעד אחד בכל פעם.'
      },
      'welcome_seen': {
        en: 'Your HeartBank is a safe space to rebuild your emotional wealth through daily deposits.',
        he: 'בנק הלב שלכם הוא מקום בטוח לבנות מחדש את העושר הרגשי שלכם דרך הפקדות יומיות.'
      },
      'heartbank_intro_seen': {
        en: 'Each daily exercise guides you to make a meaningful deposit in one of five healing categories.',
        he: 'כל תרגיל יומי מדריך אתכם לבצע הפקדה משמעותית באחת מחמש קטגוריות הריפוי.'
      },
      'first_exercise_viewed': {
        en: 'Ready to make your first deposit? Remember, there\'s no wrong way to heal.',
        he: 'מוכנים לבצע את ההפקדה הראשונה שלכם? זכרו, אין דרך שגויה לרפא.'
      },
      'first_deposit_made': {
        en: 'Beautiful! You\'ve just started building your emotional wealth. Meet your personal banker.',
        he: 'יפה! הרגע התחלתם לבנות את העושר הרגשי שלכם. הכירו את הבנקאי האישי שלכם.'
      },
      'banker_intro_seen': {
        en: 'These five categories are your healing currencies: gratitude, courage, honesty, success, and self-compassion.',
        he: 'חמש הקטגוריות הללו הן מטבעות הריפוי שלכם: הכרת תודה, אומץ, כנות, הצלחה וחמלה עצמית.'
      },
      'categories_explained': {
        en: 'Your privacy is important. Choose what you want to share with the community.',
        he: 'הפרטיות שלכם חשובה. בחרו מה אתם רוצים לחלוק עם הקהילה.'
      },
      'privacy_settings_set': {
        en: 'Set up gentle reminders to help you maintain your daily practice.',
        he: 'הגדירו תזכורות עדינות שיעזרו לכם לשמור על התרגול היומי שלכם.'
      },
      'reminders_configured': {
        en: 'Perfect! You\'re all set up. Your healing journey begins now.',
        he: 'מושלם! אתם מוכנים לחלוטין. מסע הריפוי שלכם מתחיל עכשיו.'
      },
      'onboarding_complete': {
        en: 'Welcome to your daily practice. Your HeartBank is ready for deposits.',
        he: 'ברוכים הבאים לתרגול היומי שלכם. בנק הלב שלכם מוכן להפקדות.'
      }
    }

    return helpTexts[step]?.[language] || helpTexts['not_started'][language]
  }

  /**
   * Check if user has completed a specific step
   */
  private hasCompletedStep(user: User, step: OnboardingStatus): boolean {
    const currentIndex = this.onboardingSteps.indexOf(user.onboardingStatus)
    const stepIndex = this.onboardingSteps.indexOf(step)
    
    return currentIndex >= stepIndex
  }

  /**
   * Get mobile-optimized onboarding tips
   */
  public getMobileTips(language: Language): Array<{title: string, description: string, icon: string}> {
    const tips = [
      {
        icon: '📱',
        title: {
          en: 'Mobile Healing',
          he: 'ריפוי נייד'
        },
        description: {
          en: 'Your HeartBank goes wherever you do. Deposit from anywhere that feels safe.',
          he: 'בנק הלב שלכם הולך איתכם לכל מקום. הפקידו מכל מקום שמרגיש בטוח.'
        }
      },
      {
        icon: '🌙',
        title: {
          en: 'Gentle Reminders',
          he: 'תזכורות עדינות'
        },
        description: {
          en: 'Set quiet hours and gentle nudges that respect your rhythm.',
          he: 'הגדירו שעות שקט ודחיפות עדינות שמכבדות את הקצב שלכם.'
        }
      },
      {
        icon: '🔒',
        title: {
          en: 'Your Privacy',
          he: 'הפרטיות שלכם'
        },
        description: {
          en: 'Choose what stays private and what you share with the healing community.',
          he: 'בחרו מה נשאר פרטי ומה אתם חולקים עם קהילת הריפוי.'
        }
      },
      {
        icon: '💝',
        title: {
          en: 'Healing Wealth',
          he: 'עושר מרפא'
        },
        description: {
          en: 'Watch your emotional wealth grow through daily deposits of self-worth.',
          he: 'צפו בעושר הרגשי שלכם גדל דרך הפקדות יומיות של ערך עצמי.'
        }
      }
    ]

    return tips.map(tip => ({
      icon: tip.icon,
      title: tip.title[language],
      description: tip.description[language]
    }))
  }
}