// Firebase service types for TogetherNet
import { Timestamp } from 'firebase/firestore'

// Base types
export type LocalizedString = {
  en: string
  he: string
}

export type DepositCategory = 'gratitude' | 'courage' | 'honesty' | 'success' | 'self-compassion'
export type PipelineStage = 'emergen-see' | 'healing-row' | 'heart-bank' | 'love-mark-it' | 'together-net'
export type ReactionType = 'heart' | 'trophy' | 'hug' | 'sparkle'

// User Profile
export interface UserProfile {
  uid: string
  username: string
  email?: string
  language: 'en' | 'he'
  timezone: string
  wakeTime: string // HH:MM format
  pipelineStage: PipelineStage
  createdAt: Timestamp
  lastActiveAt: Timestamp
  
  // Privacy settings
  isPublicProfile: boolean
  shareDepositsPublicly: boolean
  allowKindnessMatching: boolean
}

// HeartBank wealth data
export interface HeartBankWealth {
  userId: string
  balance: number
  streak: number
  streakLevel: number // Fibonacci level
  interestRate: number
  totalDeposits: number
  lastDepositDate: Timestamp
  streakStartDate: Timestamp
  lastInterestCalculation: Timestamp
}

// Daily Exercise
export interface DailyExercise {
  id: string
  date: string // YYYY-MM-DD
  category: DepositCategory
  theme: string
  exercise: LocalizedString
  bankerIntro: LocalizedString
  levels: {
    beginner: LocalizedString
    intermediate: LocalizedString
    advanced: LocalizedString
  }
  prompts: LocalizedString[]
  publishedAt: Timestamp
  completions: number
  seasonal?: {
    winter?: Partial<DailyExercise>
    spring?: Partial<DailyExercise>
    summer?: Partial<DailyExercise>
    autumn?: Partial<DailyExercise>
  }
}

// Deposit
export interface Deposit {
  id: string
  userId: string
  exerciseId?: string // Linked to daily exercise
  category: DepositCategory
  content: string
  wordCount: number
  isPublic: boolean
  language: 'en' | 'he'
  createdAt: Timestamp
  updatedAt: Timestamp
  
  // Wealth mechanics
  baseValue: number
  currentValue: number // With compound interest
  interestRate: number
  compoundingSince: Timestamp
  
  // Community engagement
  reactionCounts: Record<ReactionType, number>
  commentCount: number
  inspirationCount: number // How many others it inspired
  
  // Metadata
  deviceInfo?: {
    platform: 'web' | 'mobile'
    userAgent?: string
  }
}

// Crisis Support (Emergen-See)
export interface CrisisRecord {
  id: string
  userId: string
  triggerText?: string // The deposit content that triggered crisis detection
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'active' | 'stabilizing' | 'resolved'
  supportProvided: string[]
  humanContactAt?: Timestamp
  resolvedAt?: Timestamp
  createdAt: Timestamp
  
  // Privacy - highly protected
  isArchived: boolean
  accessLog: Array<{
    timestamp: Timestamp
    accessor: string
    action: string
  }>
}

// Creative Content (HealingRow)
export interface CreativeContent {
  id: string
  userId: string
  depositId?: string // Source deposit
  type: 'story' | 'art' | 'voice' | 'meditation'
  title: string
  content: string
  mediaUrl?: string
  isPublic: boolean
  tags: string[]
  createdAt: Timestamp
  
  // Community features
  reactionCounts: Record<ReactionType, number>
  commentCount: number
  circleId?: string // Healing circle
}

// Kindness Exchange (Love-Mark-It)
export interface KindnessExchange {
  id: string
  giverId: string
  receiverId?: string
  type: 'emotional' | 'practical' | 'creative' | 'knowledge'
  title: string
  description: string
  requirements?: string
  location?: {
    city: string
    region: string
    isRemote: boolean
  }
  status: 'open' | 'matched' | 'in-progress' | 'completed' | 'cancelled'
  completedAt?: Timestamp
  createdAt: Timestamp
  
  // Safety and verification
  verificationLevel: 'basic' | 'email' | 'deposit-history' | 'community-vouched'
  reportCount: number
}

// Community Reactions
export interface Reaction {
  id: string
  userId: string
  targetId: string // depositId, contentId, etc.
  targetType: 'deposit' | 'content' | 'comment'
  type: ReactionType
  createdAt: Timestamp
}

// Echo Comments (limited to 50 words)
export interface Comment {
  id: string
  userId: string
  targetId: string
  targetType: 'deposit' | 'content'
  content: string
  wordCount: number
  language: 'en' | 'he'
  createdAt: Timestamp
  
  // Moderation
  isModerated: boolean
  reportCount: number
}

// Financial Transparency
export interface MonthlyTransparency {
  id: string // YYYY-MM format
  month: string
  donations: {
    total: number
    currency: 'ILS' | 'USD'
    donorCount: number
    averageDonation: number
  }
  expenses: {
    infrastructure: number
    development: number
    support: number
    legal: number
    other: number
    total: number
  }
  surplus: number
  therapyScholarships: {
    funded: number
    totalSessions: number
    beneficiaries: number
  }
  publishedAt: Timestamp
}

// Banker Responses
export interface BankerResponse {
  id: string
  context: string // firstDeposit, streakMilestone, crisis, etc.
  responses: LocalizedString[]
  triggers: string[]
  therapeuticElements: {
    questionMarkTherapy?: boolean
    expansionBased?: boolean
    vulnerabilityCelebration?: boolean
    seasonalAdaptation?: boolean
  }
  usageCount: number
  lastUsed?: Timestamp
}

// Analytics and Metrics (anonymous)
export interface UserMetrics {
  userId: string
  metrics: {
    depositsThisWeek: number
    longestStreak: number
    favoriteCategory: DepositCategory
    averageWordCount: number
    publicShareRate: number
    communityEngagement: number
    crisisSupported: number
    kindnessGiven: number
    kindnessReceived: number
  }
  lastCalculated: Timestamp
  isAnonymized: boolean
}

// Notification Settings
export interface NotificationSettings {
  userId: string
  morningReminder: {
    enabled: boolean
    time: string // HH:MM
    message: LocalizedString
  }
  afternoonCheckIn: {
    enabled: boolean
    time: string
  }
  eveningNudge: {
    enabled: boolean
    time: string
  }
  streakCelebrations: boolean
  crisisAlerts: boolean
  communityUpdates: boolean
  kindnessMatches: boolean
  quietHours: {
    start: string // HH:MM
    end: string // HH:MM
  }
}

// Firestore collection names
export const COLLECTIONS = {
  USERS: 'users',
  HEARTBANK: 'heartbank',
  DEPOSITS: 'deposits',
  EXERCISES: 'exercises',
  EMERGEN_SEE: 'emergensee',
  HEALING_ROW: 'healingrow',
  LOVE_MARK_IT: 'lovemarkit',
  REACTIONS: 'reactions',
  COMMENTS: 'comments',
  TRANSPARENCY: 'transparency',
  BANKER_RESPONSES: 'bankerResponses',
  METRICS: 'metrics',
  NOTIFICATIONS: 'notifications'
} as const

export type CollectionName = typeof COLLECTIONS[keyof typeof COLLECTIONS]