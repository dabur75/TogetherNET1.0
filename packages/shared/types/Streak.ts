// Streak Types
// TogetherNet Therapeutic Platform
// Type definitions for Fibonacci-based streak system

export interface StreakCalculationResult {
  currentStreak: number
  streakValue: number
  currentMultiplier: number
  lastMilestone: number | null
  nextMilestone: number | null
  daysToNextMilestone: number | null
  milestoneLevel: number
  isAtMilestone: boolean
}

export interface StreakMilestone {
  streakDay: number
  milestoneLevel: number // 1-based for user display
  fibonacciValue: number
  achievementType: string
  celebrationIntensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'
  rewardMultiplier: number
  unlockedFeatures: string[]
  specialMessage: string
}

export interface StreakStatus {
  status: 'active' | 'paused' | 'reset'
  daysElapsed: number
  gracePeriodRemaining: number | null
}

export interface StreakHistory {
  currentStreak: number
  longestStreak: number
  totalDeposits: number
  milestonesReached: number[]
  lastDepositDate: Date
  streakStartDate: Date
  pauseHistory: Array<{
    startDate: Date
    endDate: Date | null
    duration: number
    reason: 'grace_period' | 'intentional_break' | 'life_circumstances'
  }>
}

export interface StreakReward {
  type: 'multiplier_boost' | 'feature_unlock' | 'special_badge' | 'banker_message'
  value: number | string
  duration: 'permanent' | 'temporary' | 'session'
  displayName: {
    en: string
    he: string
  }
  description: {
    en: string
    he: string
  }
}

export interface StreakCelebration {
  milestoneReached: StreakMilestone
  animationType: 'golden_coins' | 'light_burst' | 'gentle_glow' | 'fireworks'
  soundEffect: 'soft_chime' | 'success_tone' | 'celebration_bells' | 'epic_fanfare'
  hapticPattern: 'gentle_tap' | 'double_pulse' | 'success_buzz' | 'celebration_rhythm'
  bankerResponse: string
  rewards: StreakReward[]
  shareableImage?: string
  unlockMessage: {
    en: string
    he: string
  }
}

export interface StreakProtection {
  gracePeriodDays: number
  foundationPreservationRate: number // Percentage of streak preserved after reset
  emergencyPauseTokens: number // Tokens that can pause streak without penalty
  streakShield: {
    active: boolean
    protectionDays: number
    triggeredBy: 'milestone' | 'purchase' | 'community_support'
  }
}

export interface CompoundInterestCalculation {
  totalValue: number
  interestEarned: number
  averageMultiplier: number
  projectedValue: {
    nextWeek: number
    nextMonth: number
    nextYear: number
  }
}

export interface StreakInsights {
  consistencyScore: number // 0-100 based on regularity
  optimalDepositTime: string // Time of day user is most consistent
  streakPrediction: {
    likelihoodToContinue: number // 0-100 probability
    suggestedActions: string[]
    riskFactors: string[]
  }
  motivationalFactors: {
    primaryDriver: 'achievement' | 'community' | 'self_improvement' | 'therapeutic_benefit'
    effectiveRewards: string[]
    strugglingAreas: string[]
  }
}