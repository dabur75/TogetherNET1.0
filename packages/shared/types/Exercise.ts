// Exercise Types - Mobile-First Daily Exercise System
// TogetherNet Therapeutic Platform

export type DepositCategory = 'gratitude' | 'courage' | 'honesty' | 'success' | 'self-compassion'

export type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced'

export type Language = 'en' | 'he'

export interface LocalizedString {
  en: string
  he: string
}

/**
 * Core Exercise Interface - Mobile-Optimized
 * Designed for 6 AM daily publishing and mobile-first consumption
 * Updated to match real exercise format with structured content
 */
export interface Exercise {
  id: string
  date: string // YYYY-MM-DD format for easy indexing
  category: DepositCategory
  theme: string // English theme name for categorization
  
  // Real exercise structure - matching actual therapeutic content
  title: LocalizedString // "תרגול יומי 1 – הפקדה ראשונה"
  greeting: LocalizedString // "בוקר טוב 💛"
  introduction: LocalizedString // Opening paragraph with context
  coreQuestion: LocalizedString // Main therapeutic question
  guidance: LocalizedString // Examples and encouragement
  instruction: LocalizedString // Specific writing instruction
  template: LocalizedString // Deposit sentence starter: "אני מפקיד בבנק הערך העצמי שלי על כך ש..."
  
  // Banker introduction (separate from exercise content)
  bankerIntro: LocalizedString
  
  // Progressive difficulty levels for mobile engagement (optional for guided exercises)
  levels?: {
    beginner: LocalizedString
    intermediate: LocalizedString  
    advanced: LocalizedString
  }
  
  // Mobile-optimized prompts (3-5 per exercise)
  prompts: LocalizedString[]
  
  // Timing and delivery configuration
  timing: {
    publishTime: string // "06:00" in local timezone
    availableUntil: string // "23:59" - available all day
    reminderSchedule: string[] // ["06:30", "14:00", "20:00"]
  }
  
  // Mobile performance optimization
  metadata: {
    estimatedCompletionMinutes: number // 3-7 minutes typical
    difficultyScore: number // 1-10 scale
    therapeuticFocus: string[] // ["anxiety", "self-worth", "boundaries"]
    seasonalAdaptation?: 'winter' | 'spring' | 'summer' | 'autumn'
  }
  
  // Analytics and engagement tracking
  analytics: {
    completionRate: number
    averageWordCount: number
    publicShareRate: number
    therapeuticImpactScore: number
  }
}

/**
 * Exercise Database Schema - Firestore Optimized
 */
export interface ExerciseDocument {
  // Document ID: YYYY-MM-DD format
  id: string
  exercise: Exercise
  
  // Mobile caching and offline support
  cached: boolean
  lastUpdated: Date
  version: number
  
  // Performance metrics
  downloadSize: number // bytes
  renderTime: number // milliseconds
}

/**
 * User Exercise Progress - Mobile State Management
 */
export interface UserExerciseProgress {
  userId: string
  exerciseId: string
  date: string
  
  // Progress tracking
  status: 'not_started' | 'in_progress' | 'completed' | 'skipped'
  selectedLevel: ExerciseLevel
  startedAt?: Date
  completedAt?: Date
  
  // Mobile interaction data
  mobileInteractions: {
    tapsToComplete: number
    swipeGestures: number
    timeSpentSeconds: number
    backgroundInterruptions: number
  }
  
  // Therapeutic outcomes
  therapeuticData: {
    emotionalStateBefore: number // 1-10 scale
    emotionalStateAfter: number // 1-10 scale
    insightLevel: number // 1-10 scale
    connectionToCategory: number // 1-10 scale
  }
}

/**
 * Exercise Library - Content Management
 */
export interface ExerciseLibrary {
  gratitude: Exercise[]
  courage: Exercise[]
  honesty: Exercise[]
  success: Exercise[]
  'self-compassion': Exercise[]
}

/**
 * Daily Exercise Publishing - Cloud Function Interface
 */
export interface DailyExercisePublisher {
  publishExercise(date: string, timezone: string): Promise<Exercise>
  getExerciseForDate(date: string): Promise<Exercise | null>
  scheduleNextExercise(currentDate: string): Promise<void>
  
  // Mobile optimization methods
  preloadUpcomingExercises(days: number): Promise<Exercise[]>
  cacheExerciseForOffline(exerciseId: string): Promise<boolean>
  syncOfflineProgress(): Promise<void>
}

/**
 * Exercise Selection Algorithm - Smart Rotation
 */
export interface ExerciseSelector {
  // Intelligent selection based on user patterns
  selectExerciseForUser(
    userId: string, 
    date: string,
    userPreferences: UserExercisePreferences
  ): Promise<Exercise>
  
  // Therapeutic progression
  calculateOptimalDifficulty(userId: string): Promise<ExerciseLevel>
  adaptForUserState(exercise: Exercise, userState: UserEmotionalState): Exercise
  
  // Seasonal and contextual adaptation
  applySeasonalAdaptation(exercise: Exercise, season: string): Exercise
  adaptForMobileContext(exercise: Exercise, deviceType: 'mobile' | 'tablet' | 'desktop'): Exercise
}

/**
 * User Preferences - Mobile-First Personalization
 */
export interface UserExercisePreferences {
  userId: string
  
  // Category preferences (0-1 scale)
  categoryWeights: {
    gratitude: number
    courage: number  
    honesty: number
    success: number
    'self-compassion': number
  }
  
  // Difficulty preferences
  preferredLevel: ExerciseLevel
  adaptiveDifficulty: boolean // Auto-adjust based on completion patterns
  
  // Mobile-specific preferences
  mobileSettings: {
    preferredCompletionTime: number // minutes
    allowNotifications: boolean
    quietHours: { start: string; end: string }
    hapticFeedback: boolean
    darkModeForExercises: boolean
  }
  
  // Therapeutic preferences
  therapeuticFocus: string[] // Areas user wants to work on
  avoidTriggers: string[] // Topics to be gentle with
  
  // Accessibility
  accessibility: {
    largerText: boolean
    highContrast: boolean
    screenReaderOptimized: boolean
    reducedMotion: boolean
  }
}

/**
 * User Emotional State - Context-Aware Exercise Adaptation
 */
export interface UserEmotionalState {
  userId: string
  timestamp: Date
  
  // Current state indicators
  energyLevel: number // 1-10
  emotionalStability: number // 1-10
  stressLevel: number // 1-10
  socialConnection: number // 1-10
  
  // Crisis detection
  crisisIndicators: {
    severeMoodDrop: boolean
    suicidalIdeation: boolean
    isolationBehavior: boolean
    sleepDisruption: boolean
  }
  
  // Mobile context
  mobileContext: {
    batteryLevel: number
    timeOfDay: string
    location: 'home' | 'work' | 'public' | 'unknown'
    recentAppUsage: number // minutes in last hour
  }
}

/**
 * Exercise Analytics - Performance and Impact Tracking
 */
export interface ExerciseAnalytics {
  exerciseId: string
  period: string // 'daily' | 'weekly' | 'monthly'
  
  // Engagement metrics
  totalViews: number
  totalCompletions: number
  averageCompletionTime: number
  mobileVsDesktopUsage: { mobile: number; desktop: number }
  
  // Therapeutic impact
  averageEmotionalImprovement: number
  userRetentionAfterExercise: number
  subsequentDepositQuality: number
  longTermProgressContribution: number
  
  // Content quality
  userRatings: number[]
  reportedIssues: string[]
  therapeuticEffectiveness: number
  
  // Mobile performance
  mobilePerformance: {
    averageLoadTime: number
    crashRate: number
    batteryImpact: number
    dataUsage: number
  }
}

/**
 * Exercise Cache - Offline-First Mobile Support
 */
export interface ExerciseCache {
  // Cached exercises for offline access
  cachedExercises: Map<string, Exercise>
  
  // Cache management
  maxCacheSize: number // exercises to keep offline
  cacheExpiryDays: number
  lastSyncTimestamp: Date
  
  // Mobile storage optimization
  storage: {
    totalSizeBytes: number
    availableSpaceBytes: number
    compressionEnabled: boolean
    priorityExercises: string[] // exercise IDs
  }
  
  // Sync status
  syncStatus: {
    pending: string[] // exercise IDs waiting to sync
    failed: string[] // exercise IDs that failed to sync
    lastSuccessfulSync: Date
    syncInProgress: boolean
  }
}

/**
 * Exercise Notification - PWA Push Integration
 */
export interface ExerciseNotification {
  id: string
  userId: string
  type: 'morning_exercise' | 'gentle_reminder' | 'encouragement' | 'streak_milestone'
  
  // Notification content
  title: LocalizedString
  body: LocalizedString
  icon: string
  
  // Delivery settings
  scheduledFor: Date
  timezone: string
  
  // Mobile-specific settings
  mobile: {
    silent: boolean
    vibrationPattern: number[]
    ledColor?: string
    priority: 'min' | 'low' | 'default' | 'high' | 'max'
  }
  
  // Action buttons for mobile notifications
  actions: Array<{
    action: string
    title: LocalizedString
    icon: string
  }>
  
  // Tracking
  delivered: boolean
  opened: boolean
  actionTaken?: string
}

/**
 * Seasonal Exercise Adaptation - Contextual Healing
 */
export interface SeasonalAdaptation {
  season: 'winter' | 'spring' | 'summer' | 'autumn'
  
  // Seasonal modifications
  modifications: {
    bankerTone: 'protective' | 'energizing' | 'nurturing' | 'grounding'
    colorScheme: string[] // hex colors
    focusAreas: string[] // therapeutic focus adjustments
    difficultyAdjustment: number // -2 to +2
  }
  
  // Seasonal exercise content
  seasonalPrompts: LocalizedString[]
  seasonalBankerMessages: LocalizedString[]
  
  // Cultural considerations (especially for Hebrew/Israeli context)
  culturalAdaptations: {
    holidays: string[] // Jewish holidays affecting mood/availability
    climaticFactors: string[] // Middle Eastern climate considerations
    socialContext: string[] // Israeli cultural healing patterns
  }
}

// Export utility types
export type ExerciseStatus = UserExerciseProgress['status']
export type TherapeuticFocus = string
export type NotificationType = ExerciseNotification['type']
export type Season = SeasonalAdaptation['season']