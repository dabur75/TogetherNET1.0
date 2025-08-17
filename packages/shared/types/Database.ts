// Database Schema - TogetherNet Firestore Collections
// Optimized for mobile-first offline capabilities

import { Exercise, UserExerciseProgress, ExerciseAnalytics } from './Exercise'
import { Deposit } from './Deposit'
import { User, UserWealth } from './User'

/**
 * Firestore Collection Structure - Mobile-Optimized
 */
export interface FirestoreSchema {
  // Core Collections
  exercises: ExerciseDocument
  users: UserDocument  
  deposits: DepositDocument
  userProgress: UserProgressDocument
  
  // Analytics Collections
  exerciseAnalytics: ExerciseAnalyticsDocument
  userAnalytics: UserAnalyticsDocument
  
  // Cache Collections for Mobile Performance
  exerciseCache: ExerciseCacheDocument
  offlineQueue: OfflineQueueDocument
  
  // Crisis and Support
  crisisEvents: CrisisEventDocument
  supportSessions: SupportSessionDocument
  
  // Community Features
  reactions: ReactionDocument
  comments: CommentDocument
  
  // Financial Transparency
  donations: DonationDocument
  expenses: ExpenseDocument
  transparency: TransparencyDocument
}

/**
 * Exercise Collection - Daily exercises with mobile optimization
 * Collection: /exercises/{YYYY-MM-DD}
 */
export interface ExerciseDocument {
  // Document ID: YYYY-MM-DD
  id: string
  exercise: Exercise
  
  // Publishing metadata
  publishedAt: Date
  publishedBy: 'system' | 'admin'
  version: number
  
  // Mobile performance
  mobileOptimized: {
    preloadSize: number // bytes
    criticalCSS: string // inline CSS for instant rendering
    imageOptimizations: string[] // optimized image URLs
    offlineCapable: boolean
  }
  
  // Usage statistics for algorithm improvement
  stats: {
    totalViews: number
    completions: number
    skips: number
    averageRating: number
  }
}

/**
 * User Progress Collection - Individual exercise tracking
 * Collection: /userProgress/{userId}_{exerciseId}
 */
export interface UserProgressDocument {
  // Composite key: userId_exerciseDate
  id: string
  userId: string
  exerciseId: string
  progress: UserExerciseProgress
  
  // Mobile sync metadata
  syncMetadata: {
    lastSyncedAt: Date
    deviceId: string
    syncVersion: number
    conflictResolved?: boolean
  }
  
  // Offline support
  offlineCreated: boolean
  pendingSync: boolean
}

/**
 * User Collection - Core user data with mobile preferences
 * Collection: /users/{userId}
 */
export interface UserDocument {
  id: string
  user: User
  
  // Mobile device management
  devices: Array<{
    deviceId: string
    platform: 'ios' | 'android' | 'web'
    lastActive: Date
    pushToken?: string
    preferences: {
      notifications: boolean
      offlineSync: boolean
      dataUsageLimit: number // MB
    }
  }>
  
  // Account metadata
  createdAt: Date
  lastLoginAt: Date
  accountStatus: 'active' | 'paused' | 'suspended'
}

/**
 * Deposits Collection - User therapeutic deposits
 * Collection: /deposits/{depositId}
 */
export interface DepositDocument {
  id: string
  deposit: Deposit
  
  // Content analysis (done server-side)
  analysis: {
    sentimentScore: number // -1 to 1
    therapeuticCategories: string[]
    crisisIndicators: string[]
    wordComplexity: number
    emotionalDepth: number
  }
  
  // Community engagement
  reactions: {
    heart: number
    trophy: number
    hug: number
    sparkle: number
  }
  
  commentIds: string[] // Reference to comment documents
  
  // Mobile optimization
  mobileRendering: {
    excerpt: string // First 100 chars for feeds
    estimatedReadTime: number // seconds
    imageOptimized?: string // optimized image URL if any
  }
}

/**
 * Offline Queue Collection - Mobile offline operations
 * Collection: /offlineQueue/{userId}_{timestamp}
 */
export interface OfflineQueueDocument {
  id: string
  userId: string
  deviceId: string
  
  // Operation details
  operation: {
    type: 'create_deposit' | 'update_progress' | 'submit_reaction' | 'crisis_event'
    collection: string
    documentId: string
    data: any
    timestamp: Date
  }
  
  // Sync attempt tracking
  syncAttempts: Array<{
    attemptedAt: Date
    success: boolean
    error?: string
    retryAfter?: Date
  }>
  
  // Conflict resolution
  conflictResolution?: {
    strategy: 'server_wins' | 'client_wins' | 'merge' | 'manual'
    resolvedAt: Date
    resolvedBy: string
  }
}

/**
 * Exercise Analytics Collection - Performance tracking
 * Collection: /exerciseAnalytics/{exerciseId}_{period}
 */
export interface ExerciseAnalyticsDocument {
  id: string
  exerciseId: string
  period: string // 'daily' | 'weekly' | 'monthly'
  analytics: ExerciseAnalytics
  
  // Additional mobile-specific analytics
  mobileSpecific: {
    deviceBreakdown: {
      ios: number
      android: number
      webMobile: number
      webDesktop: number
    }
    
    performanceMetrics: {
      averageLoadTime: number
      crashRate: number
      batteryImpactScore: number
      offlineUsagePercentage: number
    }
    
    engagementPatterns: {
      peakUsageHours: number[] // 0-23
      weekdayVsWeekend: { weekday: number; weekend: number }
      sessionDuration: number // average seconds
      dropoffPoints: string[] // where users stop engaging
    }
  }
  
  generatedAt: Date
  nextUpdateAt: Date
}

/**
 * Crisis Events Collection - Emergency support tracking
 * Collection: /crisisEvents/{eventId}
 */
export interface CrisisEventDocument {
  id: string
  userId: string
  
  // Crisis details
  event: {
    triggeredAt: Date
    triggerSource: 'manual_button' | 'ai_detection' | 'community_report'
    severity: 'low' | 'medium' | 'high' | 'critical'
    description: string
    
    // Mobile context when crisis occurred
    mobileContext: {
      batteryLevel: number
      timeOfDay: string
      location: 'home' | 'work' | 'public' | 'unknown'
      lastAppActivity: Date
      deviceConnectivity: 'wifi' | 'cellular' | 'offline'
    }
  }
  
  // Response tracking
  response: {
    acknowledgedAt?: Date
    supportContactedAt?: Date
    supportType: 'ai_banker' | 'human_chat' | 'emergency_services' | 'friend_family'
    resolved: boolean
    resolvedAt?: Date
    followUpScheduled?: Date
  }
  
  // Privacy protection
  encryptedData: string // Sensitive crisis details, encrypted
  accessLog: Array<{
    accessedBy: string
    accessedAt: Date
    purpose: string
  }>
}

/**
 * Reactions Collection - Community engagement
 * Collection: /reactions/{reactionId}
 */
export interface ReactionDocument {
  id: string
  userId: string
  targetId: string // depositId or commentId
  targetType: 'deposit' | 'comment'
  
  reaction: {
    type: 'heart' | 'trophy' | 'hug' | 'sparkle'
    createdAt: Date
    
    // Mobile interaction context
    mobileContext: {
      gestureType: 'tap' | 'long_press' | 'double_tap'
      reactionTime: number // milliseconds from content view to reaction
      screenPosition: { x: number; y: number }
    }
  }
  
  // Analytics data
  analytics: {
    userEngagementScore: number // How engaged this user typically is
    contentQualityScore: number // Quality of content being reacted to
    therapeuticImpact: number // Estimated therapeutic value of this reaction
  }
}

/**
 * Comments Collection - Echo comments (witness-only)
 * Collection: /comments/{commentId}
 */
export interface CommentDocument {
  id: string
  userId: string
  depositId: string
  
  comment: {
    content: string // max 50 words
    createdAt: Date
    language: 'en' | 'he'
    
    // Therapeutic guidelines compliance
    isWitnessing: boolean // true if follows witness-only guidelines
    flaggedContent: string[] // flagged issues if any
    moderationStatus: 'approved' | 'pending' | 'rejected'
  }
  
  // Mobile composition data
  composition: {
    draftTime: number // seconds spent drafting
    editCount: number
    submittedFrom: 'mobile' | 'desktop'
    
    // Therapeutic intent detection
    intent: 'witness' | 'advice' | 'personal_share' | 'question'
    emotionalTone: 'supportive' | 'neutral' | 'concerned' | 'celebratory'
  }
  
  // Community response
  reactions: {
    heart: number
    helpful: number
  }
}

/**
 * Exercise Cache Collection - Offline mobile support
 * Collection: /exerciseCache/{userId}
 */
export interface ExerciseCacheDocument {
  id: string // userId
  userId: string
  
  // Cached exercises for offline access
  cache: {
    exercises: Array<{
      exerciseId: string
      exercise: Exercise
      cachedAt: Date
      expiresAt: Date
      priority: 'high' | 'medium' | 'low'
    }>
    
    // Cache optimization
    totalSizeBytes: number
    maxSizeBytes: number
    compressionEnabled: boolean
    lastCleanupAt: Date
  }
  
  // Sync management
  sync: {
    lastFullSync: Date
    pendingDownloads: string[] // exercise IDs
    pendingUploads: string[] // user progress IDs
    syncInProgress: boolean
    nextSyncAt: Date
  }
  
  // Device context
  device: {
    storageAvailable: number // bytes
    connectionQuality: 'excellent' | 'good' | 'poor' | 'offline'
    dataUsageLimit: number // MB per month
    dataUsageThisMonth: number // MB used so far
  }
}

/**
 * Donations Collection - Financial transparency
 * Collection: /donations/{donationId}
 */
export interface DonationDocument {
  id: string
  
  // Donation details (anonymized)
  donation: {
    amount: number
    currency: 'USD' | 'ILS' | 'EUR'
    donatedAt: Date
    paymentMethod: 'stripe_card' | 'stripe_bank' | 'paypal' | 'crypto'
    
    // Anonymous donor categorization
    donorCategory: 'first_time' | 'returning' | 'monthly_sustainer' | 'major_donor'
    donorRegion: string // country/region only
    
    // Donation motivation (optional, user-provided)
    motivation?: 'gratitude' | 'support_mission' | 'pay_it_forward' | 'memorial' | 'other'
    message?: string // optional public message
  }
  
  // Impact allocation (where the money goes)
  allocation: {
    crisisSupport: number // percentage
    therapyScholarships: number // percentage
    platformDevelopment: number // percentage
    communityChosen: number // percentage
  }
  
  // Financial record keeping
  financial: {
    stripeChargeId?: string
    feesPaid: number
    netAmount: number
    taxReceiptSent: boolean
    taxReceiptId?: string
  }
}

/**
 * Transparency Collection - Public financial data
 * Collection: /transparency/{month}
 */
export interface TransparencyDocument {
  id: string // YYYY-MM format
  month: string
  
  // Financial summary
  financial: {
    totalDonations: number
    totalExpenses: number
    netSurplus: number
    
    // Expense breakdown
    expenses: {
      crisisSupport: number
      therapyScholarships: number
      serverCosts: number
      developmentCosts: number
      legalCompliance: number
      other: number
    }
    
    // Impact metrics
    impact: {
      crisisInterventions: number
      therapySessionsFunded: number
      usersServed: number
      depositsCreated: number
      therapeuticMilestones: number
    }
  }
  
  // Community participation
  community: {
    activeDonors: number // anonymous count
    newUsers: number
    retentionRate: number
    userSatisfactionScore: number
  }
  
  // Monthly report generation
  report: {
    generatedAt: Date
    communityVoteOnSurplus?: {
      options: string[]
      votes: number[]
      selectedOption: string
      votingClosedAt: Date
    }
  }
}

/**
 * Database Indexes for Mobile Performance
 */
export interface DatabaseIndexes {
  // Exercise queries
  exercises: [
    ['publishedAt', 'desc'], // Latest exercises first
    ['category', 'publishedAt'], // Exercises by category
    ['stats.averageRating', 'desc'] // Best exercises first
  ]
  
  // User progress queries  
  userProgress: [
    ['userId', 'exerciseId'], // User's exercise progress
    ['userId', 'progress.completedAt', 'desc'], // User's completion history
    ['syncMetadata.pendingSync', 'syncMetadata.lastSyncedAt'] // Offline sync queue
  ]
  
  // Deposits for feeds
  deposits: [
    ['deposit.isPublic', 'deposit.createdAt', 'desc'], // Public feed
    ['deposit.userId', 'deposit.createdAt', 'desc'], // User's deposits
    ['analysis.therapeuticCategories', 'deposit.createdAt', 'desc'], // Category feeds
    ['reactions.heart', 'desc'] // Popular deposits
  ]
  
  // Crisis events (security-sensitive)
  crisisEvents: [
    ['userId', 'event.triggeredAt', 'desc'], // User's crisis history
    ['event.severity', 'event.triggeredAt', 'desc'], // Triage priority
    ['response.resolved', 'event.triggeredAt'] // Pending vs resolved
  ]
  
  // Mobile performance optimization
  exerciseCache: [
    ['userId'], // User's cache
    ['cache.lastCleanupAt'], // Cache maintenance
    ['sync.nextSyncAt'] // Sync scheduling
  ]
}

/**
 * Security Rules Structure - Privacy and Safety First
 */
export interface SecurityRules {
  // Public read access
  publicRead: string[] // exercises, transparency reports
  
  // User-only access
  userOnly: string[] // userProgress, personal deposits, crisis events
  
  // Community access (public deposits, comments, reactions)
  communityRead: string[] // public deposits, approved comments
  
  // Admin-only access
  adminOnly: string[] // analytics, moderation, financial details
  
  // Crisis support access
  crisisSupport: string[] // crisis events (Dvir + emergency team)
  
  // Encryption required
  encryptedFields: string[] // crisis details, private deposits
}

// Export main schema type
export type { FirestoreSchema as Database }