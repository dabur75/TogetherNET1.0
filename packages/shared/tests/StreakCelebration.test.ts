// Streak Celebration System Tests
// TogetherNet Therapeutic Platform
// Comprehensive testing for Fibonacci-based milestone celebrations

import { StreakCalculationService } from '../services/StreakCalculationService'
import { StreakMilestoneService } from '../services/StreakMilestoneService'
import { BankerService } from '../services/BankerService'
import { StreakMilestone, StreakCalculationResult } from '../types/Streak'
import { BankerResponseContext } from '../types/Banker'

describe('Streak Celebration System', () => {
  let streakCalculationService: StreakCalculationService
  let streakMilestoneService: StreakMilestoneService
  let bankerService: BankerService

  beforeEach(() => {
    streakCalculationService = new StreakCalculationService()
    streakMilestoneService = new StreakMilestoneService()
    
    // Mock banker config for testing
    const mockConfig = {
      responseSettings: {
        maxResponseLength: 200,
        adaptToMoodDetection: true,
        respectQuietHours: false,
        batterySavingMode: false
      },
      therapeuticSettings: {
        crisisDetectionEnabled: true,
        interventionThreshold: 'medium' as const,
        humanEscalationEnabled: true,
        methodologyStrictness: 'flexible' as const
      },
      mobileSettings: {
        reducedAnimations: false,
        lowBandwidthMode: false,
        offlineResponseCache: true,
        hapticFeedbackEnabled: true
      },
      localizationSettings: {
        hebrewCulturalContext: true,
        israeliTherapeuticPractices: true,
        religiousContextAwareness: false,
        timezoneSensitivity: true
      }
    }
    
    bankerService = new BankerService(mockConfig)
  })

  describe('Fibonacci Streak Calculations', () => {
    test('calculates streak value correctly for Fibonacci milestones', () => {
      // Test Day 1 (first milestone)
      const day1Result = streakCalculationService.calculateStreakValue(1)
      expect(day1Result.isAtMilestone).toBe(true)
      expect(day1Result.currentStreak).toBe(1)
      expect(day1Result.nextMilestone).toBe(1) // Next occurrence of 1 in sequence
      
      // Test Day 5 (commitment milestone)
      const day5Result = streakCalculationService.calculateStreakValue(5)
      expect(day5Result.isAtMilestone).toBe(true)
      expect(day5Result.nextMilestone).toBe(8)
      expect(day5Result.daysToNextMilestone).toBe(3)
      
      // Test Day 21 (mastery milestone)
      const day21Result = streakCalculationService.calculateStreakValue(21)
      expect(day21Result.isAtMilestone).toBe(true)
      expect(day21Result.nextMilestone).toBe(34)
      expect(day21Result.daysToNextMilestone).toBe(13)
      
      // Test non-milestone day
      const day10Result = streakCalculationService.calculateStreakValue(10)
      expect(day10Result.isAtMilestone).toBe(false)
      expect(day10Result.nextMilestone).toBe(13)
      expect(day10Result.daysToNextMilestone).toBe(3)
    })

    test('calculates compound interest correctly', () => {
      const mockDeposits = [
        { value: 25, date: new Date('2024-01-01'), streakAtTime: 1 },
        { value: 30, date: new Date('2024-01-02'), streakAtTime: 2 },
        { value: 35, date: new Date('2024-01-03'), streakAtTime: 3 }
      ]
      
      const result = streakCalculationService.calculateCompoundInterest(
        mockDeposits,
        new Date('2024-01-10')
      )
      
      expect(result.totalValue).toBeGreaterThan(90) // Base sum plus interest
      expect(result.interestEarned).toBeGreaterThan(0)
      expect(result.averageMultiplier).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Milestone Detection', () => {
    test('detects Fibonacci milestones correctly', () => {
      // Test first step milestone
      const firstMilestone = streakCalculationService.shouldCelebrateMilestone(1, 0)
      expect(firstMilestone).toBeTruthy()
      expect(firstMilestone?.achievementType).toBe('first_step')
      expect(firstMilestone?.celebrationIntensity).toBe('gentle')
      
      // Test commitment milestone (Day 5)
      const commitmentMilestone = streakCalculationService.shouldCelebrateMilestone(5, 4)
      expect(commitmentMilestone).toBeTruthy()
      expect(commitmentMilestone?.achievementType).toBe('commitment')
      expect(commitmentMilestone?.celebrationIntensity).toBe('moderate')
      
      // Test mastery milestone (Day 21)
      const masteryMilestone = streakCalculationService.shouldCelebrateMilestone(21, 20)
      expect(masteryMilestone).toBeTruthy()
      expect(masteryMilestone?.achievementType).toBe('mastery')
      expect(masteryMilestone?.celebrationIntensity).toBe('spectacular')
      
      // Test non-milestone day
      const nonMilestone = streakCalculationService.shouldCelebrateMilestone(7, 6)
      expect(nonMilestone).toBeNull()
    })

    test('generates appropriate rewards for milestones', () => {
      const milestone: StreakMilestone = {
        streakDay: 8,
        milestoneLevel: 6,
        fibonacciValue: 8,
        achievementType: 'transformation',
        celebrationIntensity: 'moderate',
        rewardMultiplier: 1.75,
        unlockedFeatures: ['golden_vault_access'],
        specialMessage: 'transformation_beginning'
      }
      
      const celebration = streakMilestoneService.createCelebrationExperience(milestone, 'en')
      
      expect(celebration.milestoneReached).toEqual(milestone)
      expect(celebration.animationType).toBe('golden_coins')
      expect(celebration.soundEffect).toBe('success_tone')
      expect(celebration.hapticPattern).toBe('double_pulse')
      expect(celebration.rewards.length).toBeGreaterThan(0)
      
      // Check for multiplier boost reward
      const multiplierReward = celebration.rewards.find(r => r.type === 'multiplier_boost')
      expect(multiplierReward).toBeTruthy()
      expect(multiplierReward?.value).toBe(1.75)
    })
  })

  describe('Banker Response Integration', () => {
    test('generates therapeutic milestone responses', () => {
      const milestone: StreakMilestone = {
        streakDay: 5,
        milestoneLevel: 5,
        fibonacciValue: 5,
        achievementType: 'commitment',
        celebrationIntensity: 'moderate',
        rewardMultiplier: 1.5,
        unlockedFeatures: ['custom_banker_greetings'],
        specialMessage: 'commitment_growing'
      }
      
      const response = streakMilestoneService.generateMilestoneResponse(milestone, 'en', 'TestUser')
      
      expect(response.type).toBe('milestone_celebration')
      expect(response.content.en).toContain('Day 5')
      expect(response.content.he).toBeTruthy()
      expect(response.emotional.tone).toBe('celebratory')
      expect(response.therapeutic.technique).toBe('positive_reinforcement')
      expect(response.therapeutic.focusArea).toBe('achievement_recognition')
      expect(response.metadata.milestoneLevel).toBe(5)
      expect(response.metadata.rewardMultiplier).toBe(1.5)
    })

    test('adapts responses for different milestone levels', () => {
      // Test gentle milestone (Day 1)
      const gentleMilestone: StreakMilestone = {
        streakDay: 1,
        milestoneLevel: 1,
        fibonacciValue: 1,
        achievementType: 'first_step',
        celebrationIntensity: 'gentle',
        rewardMultiplier: 1.0,
        unlockedFeatures: ['daily_motivation'],
        specialMessage: 'first_deposit_celebration'
      }
      
      const gentleResponse = streakMilestoneService.generateMilestoneResponse(gentleMilestone, 'en')
      expect(gentleResponse.emotional.energy).toBe('medium')
      
      // Test legendary milestone (Day 89)
      const legendaryMilestone: StreakMilestone = {
        streakDay: 89,
        milestoneLevel: 11,
        fibonacciValue: 89,
        achievementType: 'transcendence',
        celebrationIntensity: 'legendary',
        rewardMultiplier: 2.5,
        unlockedFeatures: ['healing_circle_creation'],
        specialMessage: 'transcendence_reached'
      }
      
      const legendaryResponse = streakMilestoneService.generateMilestoneResponse(legendaryMilestone, 'en')
      expect(legendaryResponse.emotional.energy).toBe('high')
    })
  })

  describe('Mobile Optimization', () => {
    test('provides appropriate haptic patterns for different intensities', () => {
      const celebrations = [
        { intensity: 'gentle' as const, expected: 'gentle_tap' },
        { intensity: 'moderate' as const, expected: 'double_pulse' },
        { intensity: 'spectacular' as const, expected: 'success_buzz' },
        { intensity: 'legendary' as const, expected: 'celebration_rhythm' }
      ]
      
      celebrations.forEach(({ intensity, expected }) => {
        const milestone: StreakMilestone = {
          streakDay: 1,
          milestoneLevel: 1,
          fibonacciValue: 1,
          achievementType: 'test',
          celebrationIntensity: intensity,
          rewardMultiplier: 1.0,
          unlockedFeatures: [],
          specialMessage: 'test'
        }
        
        const celebration = streakMilestoneService.createCelebrationExperience(milestone, 'en')
        expect(celebration.hapticPattern).toBe(expected)
      })
    })

    test('selects appropriate animations for mobile devices', () => {
      const animationTests = [
        { intensity: 'gentle' as const, expected: 'gentle_glow' },
        { intensity: 'moderate' as const, expected: 'golden_coins' },
        { intensity: 'spectacular' as const, expected: 'light_burst' },
        { intensity: 'legendary' as const, expected: 'fireworks' }
      ]
      
      animationTests.forEach(({ intensity, expected }) => {
        const milestone: StreakMilestone = {
          streakDay: 1,
          milestoneLevel: 1,
          fibonacciValue: 1,
          achievementType: 'test',
          celebrationIntensity: intensity,
          rewardMultiplier: 1.0,
          unlockedFeatures: [],
          specialMessage: 'test'
        }
        
        const celebration = streakMilestoneService.createCelebrationExperience(milestone, 'en')
        expect(celebration.animationType).toBe(expected)
      })
    })
  })

  describe('Streak Status Management', () => {
    test('handles streak pause correctly (not break)', () => {
      const lastDepositDate = new Date('2024-01-01')
      const currentDate = new Date('2024-01-03') // 2 days later
      
      const status = streakCalculationService.calculateStreakStatus(
        lastDepositDate,
        currentDate,
        'Asia/Jerusalem'
      )
      
      expect(status.status).toBe('paused')
      expect(status.daysElapsed).toBe(2)
      expect(status.gracePeriodRemaining).toBe(1) // 3 day grace period - 2 elapsed
    })

    test('preserves foundation after streak reset', () => {
      const currentStreak = 30
      const previousMilestones = [1, 1, 2, 3, 5, 8, 13, 21]
      const highestMilestone = 21
      
      const result = streakCalculationService.handleStreakReset(
        currentStreak,
        100, // total deposits
        previousMilestones
      )
      
      expect(result.newStreak).toBeGreaterThan(1) // Never goes below 1
      expect(result.preservedFoundation).toBe(Math.floor(highestMilestone * 0.2))
      expect(result.encouragementLevel).toBe('understanding') // High milestone reached before
    })
  })

  describe('Localization Support', () => {
    test('generates Hebrew milestone responses', () => {
      const milestone: StreakMilestone = {
        streakDay: 8,
        milestoneLevel: 6,
        fibonacciValue: 8,
        achievementType: 'transformation',
        celebrationIntensity: 'moderate',
        rewardMultiplier: 1.75,
        unlockedFeatures: ['golden_vault_access'],
        specialMessage: 'transformation_beginning'
      }
      
      const hebrewResponse = streakMilestoneService.generateMilestoneResponse(milestone, 'he')
      
      expect(hebrewResponse.content.he).toBeTruthy()
      expect(hebrewResponse.content.he.length).toBeGreaterThan(0)
      expect(hebrewResponse.content.he).toContain('יום 8') // Day 8 in Hebrew
      
      const celebration = streakMilestoneService.createCelebrationExperience(milestone, 'he')
      expect(celebration.unlockMessage.he).toBeTruthy()
      expect(celebration.rewards[0].displayName.he).toBeTruthy()
    })
  })

  describe('Performance Testing', () => {
    test('milestone detection completes quickly', () => {
      const startTime = Date.now()
      
      // Test 100 milestone calculations
      for (let i = 1; i <= 100; i++) {
        streakCalculationService.calculateStreakValue(i)
        streakCalculationService.shouldCelebrateMilestone(i, i - 1)
      }
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      expect(duration).toBeLessThan(100) // Should complete in under 100ms
    })

    test('response generation is fast enough for mobile', () => {
      const milestone: StreakMilestone = {
        streakDay: 21,
        milestoneLevel: 8,
        fibonacciValue: 21,
        achievementType: 'mastery',
        celebrationIntensity: 'spectacular',
        rewardMultiplier: 2.0,
        unlockedFeatures: ['mentor_mode'],
        specialMessage: 'mastery_emerging'
      }
      
      const startTime = Date.now()
      
      // Generate 10 responses
      for (let i = 0; i < 10; i++) {
        streakMilestoneService.generateMilestoneResponse(milestone, 'en')
        streakMilestoneService.createCelebrationExperience(milestone, 'en')
      }
      
      const endTime = Date.now()
      const duration = endTime - startTime
      
      expect(duration).toBeLessThan(50) // Should complete in under 50ms for good mobile UX
    })
  })

  describe('Edge Cases', () => {
    test('handles very high streak numbers', () => {
      const result = streakCalculationService.calculateStreakValue(2000)
      expect(result.currentStreak).toBe(2000)
      expect(result.streakValue).toBeGreaterThan(0)
      expect(result.nextMilestone).toBeNull() // Beyond tracked Fibonacci numbers
    })

    test('handles zero and negative streaks gracefully', () => {
      const zeroResult = streakCalculationService.calculateStreakValue(0)
      expect(zeroResult.currentStreak).toBe(0)
      expect(zeroResult.streakValue).toBe(0)
      
      // Negative should be treated as 0
      const negativeResult = streakCalculationService.calculateStreakValue(-5)
      expect(negativeResult.currentStreak).toBe(-5) // Preserves input but handles calculation
    })

    test('milestone detection with edge case streaks', () => {
      // Test milestone detection when current and previous are the same
      const sameMilestone = streakCalculationService.shouldCelebrateMilestone(5, 5)
      expect(sameMilestone).toBeNull() // No celebration for same streak
      
      // Test milestone detection with gap
      const gapMilestone = streakCalculationService.shouldCelebrateMilestone(8, 3)
      expect(gapMilestone).toBeTruthy() // Should still celebrate reaching 8
    })
  })
})

// Integration test with full system
describe('Full Streak Celebration Integration', () => {
  test('complete milestone celebration flow', async () => {
    const streakService = new StreakCalculationService()
    const milestoneService = new StreakMilestoneService()
    
    // Simulate user reaching Day 5 milestone
    const currentStreak = 5
    const previousStreak = 4
    
    // 1. Check if milestone reached
    const milestone = streakService.shouldCelebrateMilestone(currentStreak, previousStreak)
    expect(milestone).toBeTruthy()
    expect(milestone?.streakDay).toBe(5)
    expect(milestone?.achievementType).toBe('commitment')
    
    // 2. Generate banker response
    const bankerResponse = milestoneService.generateMilestoneResponse(milestone!, 'en', 'TestUser')
    expect(bankerResponse.type).toBe('milestone_celebration')
    expect(bankerResponse.content.en).toContain('TestUser')
    
    // 3. Create celebration experience
    const celebration = milestoneService.createCelebrationExperience(milestone!, 'en')
    expect(celebration.milestoneReached).toEqual(milestone)
    expect(celebration.rewards.length).toBeGreaterThan(0)
    
    // 4. Verify therapeutic integrity
    expect(bankerResponse.therapeutic.technique).toBe('positive_reinforcement')
    expect(bankerResponse.therapeutic.focusArea).toBe('achievement_recognition')
    expect(bankerResponse.emotional.tone).toBe('celebratory')
    expect(bankerResponse.emotional.warmth).toBe('very_warm')
  })
})