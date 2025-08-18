// User Types - Mobile-First Therapeutic Platform Users
// TogetherNet HeartBank System

import { DepositCategory, Language } from './Exercise'

/**
 * Core User Interface - Mobile-Optimized Therapeutic Platform
 */
export interface User {
  id: string
  email?: string
  displayName?: string
  
  // Onboarding & Experience
  onboardingStatus: OnboardingStatus
  isFirstTimeUser: boolean
  accountCreatedAt: Date
  lastLoginAt: Date
  
  // Language & Cultural Settings
  language: Language
  timezone: string
  isRTLUser: boolean
  
  // HeartBank Progress
  heartBankProfile: {
    balance: number
    streak: number
    totalDeposits: number
    lastDepositDate?: Date
    interestRate: number // Based on streak
    firstDepositDate?: Date
    longestStreak: number
    weeklyAverage: number
  }
  
  // Therapeutic Journey
  pipelineStage: PipelineStage
  therapeuticProfile: {
    preferredCategories: DepositCategory[]
    completedExercises: string[] // Exercise IDs
    crisisSupport: {
      hasUsedCrisisSupport: boolean
      lastCrisisDate?: Date
      preferredContactMethod: 'chat' | 'phone' | 'none'
    }
    healingGoals: string[]
    progressNotes: string[]
  }
  
  // Mobile Context & Preferences
  mobileSettings: {
    deviceType: 'mobile' | 'tablet' | 'desktop'
    notificationsEnabled: boolean
    hapticFeedbackEnabled: boolean
    preferredReminderTimes: {
      morning: string // "06:30"
      afternoon?: string // "14:00"
      evening?: string // "20:00"
    }
    quietHours: {
      start: string // "22:00"
      end: string // "07:00"
    }
    offlineModeEnabled: boolean
  }
  
  // Privacy & Community
  privacySettings: {
    defaultDepositVisibility: 'private' | 'public'
    allowCommunityInteraction: boolean
    shareProgressMetrics: boolean
    allowKindnessMatching: boolean // For Love-Mark-It
  }
  
  // Engagement Patterns
  usagePatterns: {
    preferredDepositTime: string // Most common time of deposits
    averageSessionDuration: number // Minutes
    mostActiveWeekdays: number[] // [1, 2, 3, 4, 5] for Mon-Fri
    engagementLevel: 'low' | 'medium' | 'high'
    lastActiveDate: Date
  }
  
  // Subscription & Support
  supportLevel: {
    hasActiveSupport: boolean
    supportType: 'community' | 'premium' | 'therapy'
    donationHistory: {
      totalDonated: number
      lastDonationDate?: Date
      monthlySupporter: boolean
    }
  }
  
  // Metadata
  createdAt: Date
  updatedAt: Date
  version: number
}

/**
 * Onboarding Status - Progressive First-Time Experience
 */
export type OnboardingStatus = 
  | 'not_started'
  | 'welcome_seen'
  | 'heartbank_intro_seen' 
  | 'first_exercise_viewed'
  | 'first_deposit_made'
  | 'banker_intro_seen'
  | 'categories_explained'
  | 'privacy_settings_set'
  | 'reminders_configured'
  | 'onboarding_complete'

/**
 * Pipeline Stages - Healing Journey Progression
 */
export type PipelineStage = 
  | 'emergen_see'    // Crisis support
  | 'healing_row'    // Creative healing
  | 'heart_bank'     // Daily deposits (main stage)
  | 'love_mark_it'   // Kindness exchange
  | 'together_net'   // Community leadership

/**
 * User Creation Input - Registration/Signup
 */
export interface UserCreateInput {
  email?: string
  displayName?: string
  language: Language
  timezone: string
  agreeToTerms: boolean
  allowNotifications: boolean
  referralSource?: string
}

/**
 * User Profile Update Input - Settings Changes
 */
export interface UserProfileUpdate {
  displayName?: string
  language?: Language
  timezone?: string
  mobileSettings?: Partial<User['mobileSettings']>
  privacySettings?: Partial<User['privacySettings']>
  therapeuticProfile?: Partial<User['therapeuticProfile']>
}

/**
 * First-Time User Experience State
 */
export interface FirstTimeUserState {
  userId: string
  currentStep: OnboardingStatus
  completedSteps: OnboardingStatus[]
  skipAvailable: boolean
  estimatedTimeRemaining: number // minutes
  
  // Welcome sequence progress
  welcomeSequence: {
    hasSeenWelcome: boolean
    hasSeenHeartBankIntro: boolean
    hasViewedFirstExercise: boolean
    hasMadeFirstDeposit: boolean
    hasMetBanker: boolean
    hasConfiguredSettings: boolean
  }
  
  // Mobile onboarding specific
  mobileOnboarding: {
    hasTestedKeyboard: boolean
    hasTriedHapticFeedback: boolean
    hasConfiguredNotifications: boolean
    hasSeenRTLDemo: boolean // For Hebrew users
  }
  
  // Therapeutic introduction
  therapeuticIntro: {
    hasSeenMethodologyExplanation: boolean
    hasLearnedAboutCategories: boolean
    hasUnderstoodWealthConcept: boolean
    hasSeenBankerRole: boolean
  }
}

/**
 * User Onboarding Analytics
 */
export interface UserOnboardingAnalytics {
  userId: string
  
  // Completion metrics
  onboardingStarted: Date
  onboardingCompleted?: Date
  totalTimeSpent: number // minutes
  stepsCompleted: number
  stepsSkipped: number
  
  // Drop-off analysis
  lastCompletedStep: OnboardingStatus
  dropOffPoint?: OnboardingStatus
  completionRate: number // 0-1
  
  // Mobile-specific metrics
  deviceUsed: 'mobile' | 'tablet' | 'desktop'
  orientationChanges: number
  keyboardInteractions: number
  touchGestures: number
  
  // Engagement indicators
  readingSpeed: number // words per minute
  interactionPauses: number[] // seconds between interactions
  helpRequestCount: number
  skipReasons: string[]
}

/**
 * Banker Introduction State - First Meeting
 */
export interface BankerIntroductionState {
  userId: string
  hasMetBanker: boolean
  introductionDate?: Date
  
  // Introduction sequence
  stages: {
    bankerAppearance: boolean // Banker avatar appears
    bankerWelcome: boolean // First therapeutic message
    bankerRoleExplanation: boolean // What banker does
    bankerPromise: boolean // Commitment to user's healing
    bankerInvitation: boolean // Invitation to first deposit
  }
  
  // User response to banker
  userComfort: {
    feelsComfortable: boolean
    hasQuestions: boolean
    needsMoreTime: boolean
    preferencesExpressed: string[]
  }
  
  // Banker personality adaptation
  bankerPersonalization: {
    preferredTone: 'gentle' | 'encouraging' | 'direct' | 'warm'
    communicationStyle: 'brief' | 'detailed' | 'conversational'
    responsiveness: 'immediate' | 'thoughtful' | 'spacious'
  }
}

/**
 * Utility functions for user management
 */

export const isFirstTimeUser = (user: User): boolean => {
  return user.isFirstTimeUser || user.heartBankProfile.totalDeposits === 0
}

export const getOnboardingProgress = (user: User): number => {
  const steps = [
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
  
  const currentIndex = steps.indexOf(user.onboardingStatus)
  return currentIndex >= 0 ? (currentIndex + 1) / steps.length : 0
}

export const getNextOnboardingStep = (currentStatus: OnboardingStatus): OnboardingStatus | null => {
  const progression: Record<OnboardingStatus, OnboardingStatus | null> = {
    'not_started': 'welcome_seen',
    'welcome_seen': 'heartbank_intro_seen',
    'heartbank_intro_seen': 'first_exercise_viewed',
    'first_exercise_viewed': 'first_deposit_made',
    'first_deposit_made': 'banker_intro_seen',
    'banker_intro_seen': 'categories_explained',
    'categories_explained': 'privacy_settings_set',
    'privacy_settings_set': 'reminders_configured',
    'reminders_configured': 'onboarding_complete',
    'onboarding_complete': null
  }
  
  return progression[currentStatus]
}

export const createDefaultUser = (input: UserCreateInput): Omit<User, 'id' | 'createdAt' | 'updatedAt'> => {
  const now = new Date()
  
  return {
    email: input.email,
    displayName: input.displayName,
    onboardingStatus: 'not_started',
    isFirstTimeUser: true,
    accountCreatedAt: now,
    lastLoginAt: now,
    language: input.language,
    timezone: input.timezone,
    isRTLUser: input.language === 'he',
    heartBankProfile: {
      balance: 0,
      streak: 0,
      totalDeposits: 0,
      interestRate: 0.05, // 5% starting rate
      longestStreak: 0,
      weeklyAverage: 0
    },
    pipelineStage: 'heart_bank',
    therapeuticProfile: {
      preferredCategories: [],
      completedExercises: [],
      crisisSupport: {
        hasUsedCrisisSupport: false,
        preferredContactMethod: 'none'
      },
      healingGoals: [],
      progressNotes: []
    },
    mobileSettings: {
      deviceType: 'mobile',
      notificationsEnabled: input.allowNotifications,
      hapticFeedbackEnabled: true,
      preferredReminderTimes: {
        morning: '06:30'
      },
      quietHours: {
        start: '22:00',
        end: '07:00'
      },
      offlineModeEnabled: true
    },
    privacySettings: {
      defaultDepositVisibility: 'private',
      allowCommunityInteraction: false, // Start private, let users opt in
      shareProgressMetrics: false,
      allowKindnessMatching: false
    },
    usagePatterns: {
      preferredDepositTime: '09:00',
      averageSessionDuration: 0,
      mostActiveWeekdays: [],
      engagementLevel: 'medium',
      lastActiveDate: now
    },
    supportLevel: {
      hasActiveSupport: false,
      supportType: 'community',
      donationHistory: {
        totalDonated: 0,
        monthlySupporter: false
      }
    },
    version: 1
  }
}