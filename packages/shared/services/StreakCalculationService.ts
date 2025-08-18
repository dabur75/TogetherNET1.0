// Streak Calculation Service
// TogetherNet Therapeutic Platform
// Fibonacci-based streak calculation for compound emotional wealth

import { StreakMilestone, StreakCalculationResult, StreakStatus } from '../types/Streak'

export class StreakCalculationService {
  private fibonacciMilestones: number[] = [
    1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597
  ]

  /**
   * Calculate streak value using Fibonacci sequence
   * Natural growth pattern that reflects emotional compound interest
   */
  public calculateStreakValue(currentStreak: number): StreakCalculationResult {
    // Base value for each deposit
    const baseValue = 25
    
    // Find the highest Fibonacci milestone reached
    let milestoneIndex = 0
    let totalValue = 0
    
    for (let day = 1; day <= currentStreak; day++) {
      // Check if this day is a Fibonacci milestone
      const fibIndex = this.fibonacciMilestones.indexOf(day)
      if (fibIndex !== -1) {
        milestoneIndex = fibIndex
      }
      
      // Calculate compound multiplier based on highest milestone reached
      const multiplier = 1 + (milestoneIndex * 0.1) // 10% increase per milestone
      const dayValue = Math.floor(baseValue * multiplier)
      totalValue += dayValue
    }

    // Calculate next milestone
    const nextMilestone = this.getNextMilestone(currentStreak)
    const daysToNextMilestone = nextMilestone ? nextMilestone - currentStreak : null

    return {
      currentStreak,
      streakValue: totalValue,
      currentMultiplier: 1 + (milestoneIndex * 0.1),
      lastMilestone: milestoneIndex > 0 ? this.fibonacciMilestones[milestoneIndex] : null,
      nextMilestone,
      daysToNextMilestone,
      milestoneLevel: milestoneIndex,
      isAtMilestone: this.fibonacciMilestones.includes(currentStreak)
    }
  }

  /**
   * Get the next Fibonacci milestone after current streak
   */
  private getNextMilestone(currentStreak: number): number | null {
    for (const milestone of this.fibonacciMilestones) {
      if (milestone > currentStreak) {
        return milestone
      }
    }
    return null // Reached maximum tracked milestone
  }

  /**
   * Determine if current streak qualifies for celebration
   */
  public shouldCelebrateMilestone(
    currentStreak: number, 
    previousStreak: number
  ): StreakMilestone | null {
    const isCurrentMilestone = this.fibonacciMilestones.includes(currentStreak)
    const wasPreviousMilestone = this.fibonacciMilestones.includes(previousStreak)
    
    if (isCurrentMilestone && !wasPreviousMilestone) {
      const milestoneIndex = this.fibonacciMilestones.indexOf(currentStreak)
      
      return {
        streakDay: currentStreak,
        milestoneLevel: milestoneIndex + 1, // 1-based for user display
        fibonacciValue: currentStreak,
        achievementType: this.getMilestoneAchievementType(milestoneIndex),
        celebrationIntensity: this.getCelebrationIntensity(milestoneIndex),
        rewardMultiplier: 1 + (milestoneIndex * 0.15), // Bonus multiplier for milestone
        unlockedFeatures: this.getUnlockedFeatures(milestoneIndex),
        specialMessage: this.getSpecialMessage(milestoneIndex)
      }
    }
    
    return null
  }

  /**
   * Get milestone achievement type based on Fibonacci level
   */
  private getMilestoneAchievementType(milestoneIndex: number): string {
    const types = [
      'first_step',      // Day 1
      'foundation',      // Day 1 (second)
      'building',        // Day 2
      'momentum',        // Day 3
      'commitment',      // Day 5
      'transformation',  // Day 8
      'resilience',      // Day 13
      'mastery',         // Day 21
      'excellence',      // Day 34
      'wisdom',          // Day 55
      'transcendence',   // Day 89
      'enlightenment',   // Day 144
      'legendary',       // Day 233
      'mythical',        // Day 377
      'cosmic',          // Day 610
      'infinite',        // Day 987
      'eternal'          // Day 1597
    ]
    
    return types[milestoneIndex] || 'transcendent'
  }

  /**
   * Determine celebration intensity for mobile animations
   */
  private getCelebrationIntensity(milestoneIndex: number): 'gentle' | 'moderate' | 'spectacular' | 'legendary' {
    if (milestoneIndex < 3) return 'gentle'       // Days 1, 1, 2
    if (milestoneIndex < 6) return 'moderate'     // Days 3, 5, 8
    if (milestoneIndex < 10) return 'spectacular' // Days 13, 21, 34, 55
    return 'legendary'                            // Days 89+
  }

  /**
   * Get features unlocked at milestone
   */
  private getUnlockedFeatures(milestoneIndex: number): string[] {
    const features: Record<number, string[]> = {
      0: ['daily_motivation'], // Day 1
      2: ['streak_protection'], // Day 2
      4: ['custom_banker_greetings'], // Day 5
      5: ['golden_vault_access'], // Day 8
      6: ['story_sharing'], // Day 13
      7: ['mentor_mode'], // Day 21
      8: ['community_leadership'], // Day 34
      9: ['wisdom_archive'], // Day 55
      10: ['healing_circle_creation'], // Day 89
      11: ['therapeutic_insights'], // Day 144
      12: ['platform_contribution'] // Day 233+
    }
    
    return features[milestoneIndex] || []
  }

  /**
   * Get special milestone message
   */
  private getSpecialMessage(milestoneIndex: number): string {
    const messages = [
      'first_deposit_celebration',
      'foundation_built',
      'momentum_building',
      'commitment_growing',
      'transformation_beginning',
      'resilience_developing',
      'mastery_emerging',
      'excellence_achieved',
      'wisdom_gained',
      'transcendence_reached'
    ]
    
    return messages[milestoneIndex] || 'legendary_achievement'
  }

  /**
   * Calculate streak pause (not break) logic
   * Users don't "break" streaks - they "pause" them with grace period
   */
  public calculateStreakStatus(
    lastDepositDate: Date,
    currentDate: Date = new Date(),
    timezone: string = 'Asia/Jerusalem'
  ): StreakStatus {
    const lastDepositDay = this.getDateInTimezone(lastDepositDate, timezone)
    const currentDay = this.getDateInTimezone(currentDate, timezone)
    
    const daysDifference = Math.floor(
      (currentDay.getTime() - lastDepositDay.getTime()) / (1000 * 60 * 60 * 24)
    )

    if (daysDifference === 0) {
      return { status: 'active', daysElapsed: 0, gracePeriodRemaining: null }
    } else if (daysDifference === 1) {
      return { status: 'active', daysElapsed: 1, gracePeriodRemaining: null }
    } else if (daysDifference <= 3) {
      // Grace period - streak is "paused" not broken
      return { 
        status: 'paused', 
        daysElapsed: daysDifference, 
        gracePeriodRemaining: 3 - daysDifference 
      }
    } else {
      // After grace period, streak resets but with preserved foundation
      return { status: 'reset', daysElapsed: daysDifference, gracePeriodRemaining: null }
    }
  }

  /**
   * Handle streak reset with foundation preservation
   * In TogetherNet, users never "lose" their progress completely
   */
  public handleStreakReset(
    currentStreak: number,
    totalDeposits: number,
    previousMilestones: number[]
  ): { newStreak: number; preservedFoundation: number; encouragementLevel: string } {
    // Preserve 20% of highest milestone reached as foundation
    const highestMilestone = Math.max(...previousMilestones, 0)
    const preservedFoundation = Math.floor(highestMilestone * 0.2)
    
    // Encouragement level based on previous achievements
    let encouragementLevel = 'gentle'
    if (highestMilestone >= 21) encouragementLevel = 'understanding'
    if (highestMilestone >= 55) encouragementLevel = 'wise'
    if (highestMilestone >= 144) encouragementLevel = 'compassionate'

    return {
      newStreak: Math.max(1, preservedFoundation), // Never go below 1
      preservedFoundation,
      encouragementLevel
    }
  }

  /**
   * Get date in specific timezone (for accurate streak calculation)
   */
  private getDateInTimezone(date: Date, timezone: string): Date {
    // Simplified timezone handling - in production use proper timezone library
    const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    
    // Israel timezone offset (UTC+2/+3 depending on DST)
    if (timezone === 'Asia/Jerusalem') {
      const israelOffset = 2 * 60 * 60000 // Simplified - doesn't handle DST
      return new Date(utcDate.getTime() + israelOffset)
    }
    
    return utcDate
  }

  /**
   * Calculate compound interest on deposits based on streak
   */
  public calculateCompoundInterest(
    deposits: Array<{ value: number; date: Date; streakAtTime: number }>,
    currentDate: Date = new Date()
  ): { totalValue: number; interestEarned: number; averageMultiplier: number } {
    let totalValue = 0
    let totalInterest = 0
    let totalMultiplier = 0

    for (const deposit of deposits) {
      const calculation = this.calculateStreakValue(deposit.streakAtTime)
      const multiplier = calculation.currentMultiplier
      
      // Calculate time-based compound interest (daily 0.1% while maintaining streak)
      const daysSinceDeposit = Math.floor(
        (currentDate.getTime() - deposit.date.getTime()) / (1000 * 60 * 60 * 24)
      )
      
      const timeMultiplier = Math.pow(1.001, daysSinceDeposit) // 0.1% daily compound
      const finalValue = deposit.value * multiplier * timeMultiplier
      
      totalValue += finalValue
      totalInterest += (finalValue - deposit.value)
      totalMultiplier += multiplier
    }

    return {
      totalValue: Math.floor(totalValue),
      interestEarned: Math.floor(totalInterest),
      averageMultiplier: deposits.length > 0 ? totalMultiplier / deposits.length : 1
    }
  }

  /**
   * Get all Fibonacci milestones for reference
   */
  public getFibonacciMilestones(): number[] {
    return [...this.fibonacciMilestones]
  }

  /**
   * Get milestone preview for user motivation
   */
  public getMilestonePreview(currentStreak: number): {
    current: StreakCalculationResult
    nextMilestone: { day: number; type: string; daysRemaining: number } | null
  } {
    const current = this.calculateStreakValue(currentStreak)
    const nextMilestone = this.getNextMilestone(currentStreak)
    
    if (nextMilestone) {
      const milestoneIndex = this.fibonacciMilestones.indexOf(nextMilestone)
      return {
        current,
        nextMilestone: {
          day: nextMilestone,
          type: this.getMilestoneAchievementType(milestoneIndex),
          daysRemaining: nextMilestone - currentStreak
        }
      }
    }

    return { current, nextMilestone: null }
  }
}

export default StreakCalculationService