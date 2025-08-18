// Banker Types - Therapeutic AI Character System
// TogetherNet HeartBank Platform

import { DepositCategory, Language, LocalizedString } from './Exercise'
import { Deposit } from './Deposit'

/**
 * Banker Response Context - Mobile-Optimized Intelligence
 */
export interface BankerResponseContext {
  // User state
  userId: string
  language: Language
  
  // Current interaction
  trigger: ResponseTrigger
  deposit?: Deposit
  exerciseCompleted?: boolean
  
  // User progress & patterns
  userState: {
    streak: number
    totalDeposits: number
    balance: number
    lastDepositDate?: Date
    preferredCategories: DepositCategory[]
    recentMood: 'low' | 'neutral' | 'good' | 'excellent'
  }
  
  // Contextual factors
  timeContext: {
    timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
    dayOfWeek: string
    isWeekend: boolean
    seasonalContext?: 'winter' | 'spring' | 'summer' | 'autumn'
  }
  
  // Mobile-specific context
  mobileContext: {
    deviceType: 'mobile' | 'tablet' | 'desktop'
    batteryLevel?: number
    connectivity: 'online' | 'offline' | 'poor'
    sessionDuration: number // minutes in current session
    isFirstTimeToday: boolean
  }
  
  // Crisis & safety indicators
  crisisIndicators: {
    riskLevel: 'none' | 'low' | 'medium' | 'high' | 'critical'
    detectedKeywords: string[]
    urgentIntervention: boolean
    supportContactNeeded: boolean
  }
}

/**
 * Response Trigger Types - What prompts the banker to respond
 */
export type ResponseTrigger = 
  | 'first_deposit'
  | 'daily_exercise_complete' 
  | 'deposit_submitted'
  | 'streak_milestone'
  | 'crisis_detected'
  | 'vulnerable_moment'
  | 'celebration_moment'
  | 'encouragement_needed'
  | 'gentle_reminder'
  | 'check_in'
  | 'seasonal_adaptation'
  | 'category_milestone'
  | 'balance_milestone'

/**
 * Banker Response - Mobile-Optimized Output
 */
export interface BankerResponse {
  id: string
  content: LocalizedString
  
  // Response metadata
  metadata: {
    tone: 'warm' | 'celebrating' | 'supportive' | 'gentle' | 'urgent'
    length: 'short' | 'medium' | 'long' // Optimized for mobile reading
    therapeuticIntent: string[]
    emotionalImpact: 'calming' | 'uplifting' | 'grounding' | 'energizing'
  }
  
  // Mobile interaction
  mobileOptimized: {
    readingTimeSeconds: number
    hapticPattern?: number[] // Vibration pattern for mobile
    visualEffect?: 'breathing' | 'sparkle' | 'glow' | 'pulse'
    soundCue?: 'chime' | 'gentle' | 'celebration' | 'none'
  }
  
  // Therapeutic elements
  therapeutic: {
    methodology: 'expansion_based' | 'cognitive_reframe' | 'mindfulness' | 'self_compassion'
    focusArea: string[] // ['self_worth', 'anxiety', 'boundaries', etc.]
    followUpSuggestion?: string
    crisisEscalation?: boolean
  }
  
  // Context tracking
  context: {
    trigger: ResponseTrigger
    userStreakAtTime: number
    categoryContext?: DepositCategory
    timeGenerated: Date
    contextualFactors: string[]
  }
}

/**
 * Banker Personality - Therapeutic Character Definition
 */
export interface BankerPersonality {
  // Core identity
  role: string // "Personal banker for your emotional wealth"
  approach: 'expansion_based' // Dvir's therapeutic methodology
  
  // Communication style
  communication: {
    tone: 'warm' | 'wise' | 'believing' | 'gentle'
    focus: 'strengths_based' | 'what_works' | 'abundance_mindset'
    avoids: string[] // ['harsh_judgment', 'toxic_positivity', 'minimizing']
    embraces: string[] // ['gentle_curiosity', 'authentic_witnessing', 'hope']
  }
  
  // Therapeutic philosophy
  philosophy: {
    coreBeliefs: string[]
    healingApproach: string
    crisisResponse: string
    boundaryRespect: boolean
  }
  
  // Mobile adaptation
  mobilePersonality: {
    shortFormWisdom: boolean // Adapts wisdom for mobile consumption
    touchFriendlyPresence: boolean // Responds to mobile interactions
    contextualAwareness: boolean // Understands mobile usage patterns
    batteryConsciousness: boolean // Considers device resources
  }
}

/**
 * Response Categories - Organized by therapeutic purpose
 */
export interface ResponseLibrary {
  // Onboarding & First Interactions
  firstTime: {
    welcome: BankerResponse[]
    firstDeposit: BankerResponse[]
    firstExercise: BankerResponse[]
    accountSetup: BankerResponse[]
  }
  
  // Daily Interactions
  daily: {
    morningGreeting: BankerResponse[]
    depositAcknowledgment: BankerResponse[]
    exerciseCompletion: BankerResponse[]
    eveningReflection: BankerResponse[]
  }
  
  // Milestone Celebrations
  milestones: {
    streakAchievements: Map<number, BankerResponse[]> // Fibonacci milestones
    balanceMilestones: BankerResponse[]
    categoryMastery: BankerResponse[]
    monthlyReflections: BankerResponse[]
  }
  
  // Crisis & Support
  crisis: {
    lowRisk: BankerResponse[]
    mediumRisk: BankerResponse[]
    highRisk: BankerResponse[]
    criticalRisk: BankerResponse[]
    postCrisisSupport: BankerResponse[]
  }
  
  // Therapeutic Categories
  categorySpecific: {
    gratitude: BankerResponse[]
    courage: BankerResponse[]
    honesty: BankerResponse[]
    success: BankerResponse[]
    selfCompassion: BankerResponse[]
  }
  
  // Emotional Support
  emotional: {
    vulnerable: BankerResponse[]
    struggling: BankerResponse[]
    breakthrough: BankerResponse[]
    healing: BankerResponse[]
    growth: BankerResponse[]
  }
  
  // Seasonal & Contextual
  contextual: {
    seasonal: Map<string, BankerResponse[]>
    timeOfDay: Map<string, BankerResponse[]>
    cultural: Map<string, BankerResponse[]> // Hebrew/Israeli context
    situational: BankerResponse[]
  }
}

/**
 * Response Selection Algorithm - Intelligent Context Matching
 */
export interface ResponseSelectionCriteria {
  // Primary matching
  triggerMatch: number // 0-1 how well response matches trigger
  contextRelevance: number // 0-1 how relevant to current context
  userStateAlignment: number // 0-1 how well it fits user's current state
  
  // Secondary factors
  recencyBias: number // Avoid repeating recent responses
  varietyScore: number // Encourage diverse response selection
  therapeuticFit: number // How well it serves therapeutic goals
  
  // Mobile optimization
  mobileSuitability: number // How well suited for current mobile context
  lengthAppropriate: number // Right length for current situation
  interactionFriendly: number // Supports touch/mobile interaction
  
  // Final selection score
  totalScore: number // Weighted combination of all factors
  confidence: number // How confident the algorithm is in this choice
}

/**
 * Banker Service Configuration - Mobile-First Therapeutic AI
 */
export interface BankerConfig {
  // Response behavior
  responseSettings: {
    maxResponseLength: number // characters for mobile optimization
    adaptToMoodDetection: boolean
    respectQuietHours: boolean
    batterySavingMode: boolean
  }
  
  // Therapeutic guidelines
  therapeuticSettings: {
    crisisDetectionEnabled: boolean
    interventionThreshold: 'low' | 'medium' | 'high'
    humanEscalationEnabled: boolean
    methodologyStrictness: 'flexible' | 'strict'
  }
  
  // Mobile optimization
  mobileSettings: {
    reducedAnimations: boolean
    lowBandwidthMode: boolean
    offlineResponseCache: boolean
    hapticFeedbackEnabled: boolean
  }
  
  // Language & cultural adaptation
  localizationSettings: {
    hebrewCulturalContext: boolean
    israeliTherapeuticPractices: boolean
    religiousContextAwareness: boolean
    timezoneSensitivity: boolean
  }
}

/**
 * Response Analytics - Learning & Improvement
 */
export interface ResponseAnalytics {
  responseId: string
  
  // Usage tracking
  usage: {
    timesUsed: number
    lastUsed: Date
    averageUserRating: number
    contextEffectiveness: Map<string, number>
  }
  
  // Impact measurement
  impact: {
    userEngagementAfter: number // 0-1 how engaged user was after response
    subsequentDepositQuality: number // Quality of next deposit
    crisisDeescalation: boolean // Did it help with crisis
    therapeuticProgress: number // Contribution to user progress
  }
  
  // Mobile performance
  mobile: {
    loadTime: number
    renderTime: number
    interactionRate: number
    batteryImpact: number
  }
  
  // Improvement suggestions
  optimization: {
    lengthOptimal: boolean
    toneEffective: boolean
    timingAppropriate: boolean
    suggestedImprovements: string[]
  }
}

/**
 * Crisis Detection & Response
 */
export interface CrisisDetection {
  // Detection algorithms
  keywordAnalysis: {
    criticalKeywords: string[]
    contextualPhrases: string[]
    hebrewCrisisPatterns: string[]
    escalationTriggers: string[]
  }
  
  // Risk assessment
  riskCalculation: {
    immediateDanger: boolean
    suicidalIdeation: boolean
    selfHarmIndicators: boolean
    isolationPatterns: boolean
    rapidMoodDecline: boolean
  }
  
  // Response protocols
  responseProtocol: {
    immediateResponse: BankerResponse
    humanEscalation: boolean
    emergencyContacts: string[]
    resourcesProvided: string[]
    followUpScheduled: boolean
  }
  
  // Safety measures
  safety: {
    encryptedLogging: boolean
    mandatedReporting: boolean
    professionalBackup: boolean
    userConsentRequired: boolean
  }
}

// Export utility types
export type ResponseTone = BankerResponse['metadata']['tone']
export type TherapeuticMethodology = BankerResponse['therapeutic']['methodology']
export type CrisisRiskLevel = BankerResponseContext['crisisIndicators']['riskLevel']
export type MobileDeviceType = BankerResponseContext['mobileContext']['deviceType']