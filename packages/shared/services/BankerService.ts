// BankerService - Therapeutic AI Character for HeartBank
// TogetherNet Mobile-First Platform

import { 
  BankerResponse, 
  BankerResponseContext, 
  ResponseTrigger, 
  BankerPersonality,
  ResponseSelectionCriteria,
  BankerConfig,
  CrisisDetection,
  ResponseLibrary
} from '../types/Banker'
import { DepositCategory, Language, LocalizedString } from '../types/Exercise'
import { Deposit } from '../types/Deposit'
import { 
  responseCollections,
  firstTimeResponses,
  depositAcknowledgments,
  streakMilestones,
  crisisResponses,
  categoryResponses,
  vulnerableResponses,
  expansionBasedResponses
} from '../constants/BankerResponses'
import { 
  CrisisDetectionService, 
  CrisisDetectionResult, 
  CrisisContext, 
  CrisisRiskLevel 
} from './CrisisDetectionService'
import { StreakCalculationService } from './StreakCalculationService'
import { StreakMilestoneService } from './StreakMilestoneService'
import { StreakMilestone } from '../types/Streak'

/**
 * BankerService - Core Therapeutic AI Character
 * 
 * Embodies Dvir's expansion-based therapeutic methodology
 * Optimized for mobile-first healing interactions
 */
export class BankerService {
  private personality: BankerPersonality
  private config: BankerConfig
  private responseLibrary: ResponseLibrary
  private crisisDetection: CrisisDetection
  private crisisDetectionService: CrisisDetectionService
  private streakCalculationService: StreakCalculationService
  private streakMilestoneService: StreakMilestoneService
  
  constructor(config: BankerConfig) {
    this.config = config
    this.personality = this.initializePersonality()
    this.responseLibrary = this.initializeResponseLibrary()
    this.crisisDetection = this.initializeCrisisDetection()
    this.crisisDetectionService = new CrisisDetectionService()
    this.streakCalculationService = new StreakCalculationService()
    this.streakMilestoneService = new StreakMilestoneService()
  }

  /**
   * Main Response Generation - Context-Aware Therapeutic Response
   */
  public async getResponse(context: BankerResponseContext): Promise<BankerResponse> {
    // 1. Crisis detection first - safety priority
    if (await this.detectCrisis(context)) {
      return this.handleCrisisResponse(context)
    }

    // 2. Check for streak milestones
    const milestoneResponse = await this.checkStreakMilestone(context)
    if (milestoneResponse) {
      return milestoneResponse
    }

    // 3. Select appropriate response based on context
    const candidates = this.getCandidateResponses(context)
    const selectedResponse = this.selectBestResponse(candidates, context)
    
    // 4. Personalize response for user context
    const personalizedResponse = await this.personalizeResponse(selectedResponse, context)
    
    // 5. Optimize for mobile if needed
    if (context.mobileContext.deviceType === 'mobile') {
      return this.optimizeForMobile(personalizedResponse, context)
    }
    
    return personalizedResponse
  }

  /**
   * Streak Milestone Detection - Celebration Priority
   */
  private async checkStreakMilestone(context: BankerResponseContext): Promise<BankerResponse | null> {
    const { userState, trigger } = context
    
    // Only check for milestones on successful deposits
    if (trigger !== 'deposit_submitted' && trigger !== 'daily_exercise_complete') {
      return null
    }

    // Calculate current streak value and check for milestone
    const currentStreak = userState.streak
    const previousStreak = currentStreak - 1 // Assuming streak just increased

    // Check if this is a Fibonacci milestone
    const milestone = this.streakCalculationService.shouldCelebrateMilestone(currentStreak, previousStreak)
    
    if (milestone) {
      // Generate celebration response
      const milestoneResponse = this.streakMilestoneService.generateMilestoneResponse(
        milestone,
        context.language,
        context.userName
      )

      // Add streak-specific enhancements
      return {
        ...milestoneResponse,
        metadata: {
          ...milestoneResponse.metadata,
          celebrationTrigger: true,
          streakMilestone: milestone.streakDay,
          fibonacciLevel: milestone.milestoneLevel
        },
        reactions: {
          ...milestoneResponse.reactions,
          celebrationData: {
            milestone,
            animationType: this.getMilestoneAnimationType(milestone.celebrationIntensity),
            soundEffect: this.getMilestoneSoundEffect(milestone.celebrationIntensity),
            hapticPattern: this.getMilestoneHapticPattern(milestone.celebrationIntensity)
          }
        }
      }
    }

    return null
  }

  /**
   * Get animation type for milestone celebration
   */
  private getMilestoneAnimationType(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): string {
    const animations = {
      gentle: 'gentle_glow',
      moderate: 'golden_coins',
      spectacular: 'light_burst',
      legendary: 'fireworks'
    }
    return animations[intensity]
  }

  /**
   * Get sound effect for milestone celebration
   */
  private getMilestoneSoundEffect(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): string {
    const sounds = {
      gentle: 'soft_chime',
      moderate: 'success_tone',
      spectacular: 'celebration_bells',
      legendary: 'epic_fanfare'
    }
    return sounds[intensity]
  }

  /**
   * Get haptic pattern for milestone celebration
   */
  private getMilestoneHapticPattern(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): number[] {
    const patterns = {
      gentle: [100, 50, 100],
      moderate: [150, 75, 150, 75],
      spectacular: [200, 100, 200, 100, 200],
      legendary: [250, 125, 250, 125, 250, 125, 250]
    }
    return patterns[intensity]
  }

  /**
   * Crisis Detection & Response - Safety First
   */
  private async detectCrisis(context: BankerResponseContext): Promise<boolean> {
    const { crisisIndicators } = context
    
    // Immediate high-risk indicators
    if (crisisIndicators.riskLevel === 'critical' || crisisIndicators.urgentIntervention) {
      return true
    }
    
    // Use CrisisDetectionService for comprehensive analysis
    if (context.deposit) {
      const crisisContext: CrisisContext = {
        userId: context.userId,
        depositContent: context.deposit.content,
        language: context.language,
        timeOfDay: context.timeContext.timeOfDay,
        userHistory: {
          previousCrises: 0, // TODO: Get from user profile
          totalDeposits: context.userState.totalDeposits,
          streak: context.userState.streak,
          hasUsedCrisisSupport: false // TODO: Get from user profile
        },
        mobileContext: {
          deviceType: context.mobileContext.deviceType,
          connectivity: context.mobileContext.connectivity
        }
      }

      const crisisResult = await this.crisisDetectionService.detectCrisis(crisisContext)
      
      // Store crisis result for response handling
      context.crisisIndicators = {
        ...context.crisisIndicators,
        riskLevel: crisisResult.riskLevel,
        detectedKeywords: crisisResult.detectedKeywords,
        urgentIntervention: crisisResult.urgentIntervention,
        supportContactNeeded: crisisResult.supportContactNeeded
      }

      // Trigger mobile crisis alert if needed
      if (crisisResult.urgentIntervention || crisisResult.riskLevel === 'critical') {
        await this.crisisDetectionService.triggerMobileCrisisAlert(crisisContext, crisisResult)
      }

      return crisisResult.urgentIntervention || 
             crisisResult.riskLevel === 'high' || 
             crisisResult.riskLevel === 'critical'
    }
    
    return false
  }

  private handleCrisisResponse(context: BankerResponseContext): BankerResponse {
    const { riskLevel } = context.crisisIndicators
    const language = context.language
    
    // Get immediate crisis response from CrisisDetectionService
    const immediateResponse = this.crisisDetectionService.getImmediateCrisisResponse(riskLevel, language)
    
    if (immediateResponse) {
      // Schedule follow-up based on crisis level
      this.crisisDetectionService.scheduleCrisisFollowUp(context.userId, riskLevel)
      
      // Add crisis-specific mobile optimizations
      return {
        ...immediateResponse,
        therapeutic: {
          ...immediateResponse.therapeutic,
          crisisEscalation: riskLevel === 'critical' || riskLevel === 'high',
          followUpSuggestion: this.getCrisisFollowUp(riskLevel, language)
        },
        mobileOptimized: {
          ...immediateResponse.mobileOptimized,
          hapticPattern: this.getCrisisHapticPattern(riskLevel),
          visualEffect: 'urgent_glow',
          soundCue: 'gentle'
        }
      }
    }
    
    // Fallback to library crisis responses
    const crisisResponses = this.responseLibrary.crisis[riskLevel] || this.responseLibrary.crisis.mediumRisk
    const response = this.selectCrisisResponse(crisisResponses, context)
    
    return {
      ...response,
      therapeutic: {
        ...response.therapeutic,
        crisisEscalation: riskLevel === 'critical',
        followUpSuggestion: this.getCrisisFollowUp(riskLevel, language)
      },
      mobileOptimized: {
        ...response.mobileOptimized,
        hapticPattern: this.getCrisisHapticPattern(riskLevel),
        visualEffect: 'glow',
        soundCue: 'gentle'
      }
    }
  }

  /**
   * Response Selection Algorithm - Intelligent Context Matching
   */
  private getCandidateResponses(context: BankerResponseContext): BankerResponse[] {
    const { trigger } = context
    let candidates: BankerResponse[] = []

    switch (trigger) {
      case 'first_deposit':
        candidates = this.responseLibrary.firstTime.firstDeposit
        break
      case 'daily_exercise_complete':
        candidates = this.responseLibrary.daily.exerciseCompletion
        break
      case 'deposit_submitted':
        candidates = this.getDepositResponses(context)
        break
      case 'streak_milestone':
        candidates = this.getStreakMilestoneResponses(context)
        break
      case 'vulnerable_moment':
        candidates = this.responseLibrary.emotional.vulnerable
        break
      case 'celebration_moment':
        candidates = this.responseLibrary.emotional.breakthrough
        break
      default:
        candidates = this.responseLibrary.daily.depositAcknowledgment
    }

    // Filter by language
    return candidates.filter(response => 
      response.content[context.language] && response.content[context.language].length > 0
    )
  }

  private selectBestResponse(candidates: BankerResponse[], context: BankerResponseContext): BankerResponse {
    if (candidates.length === 0) {
      return this.getFallbackResponse(context)
    }

    // Score each candidate response
    const scoredCandidates = candidates.map(response => ({
      response,
      score: this.calculateResponseScore(response, context)
    }))

    // Sort by score and select best
    scoredCandidates.sort((a, b) => b.score.totalScore - a.score.totalScore)
    
    // Add some randomness to avoid repetition while favoring high scores
    const topCandidates = scoredCandidates.slice(0, Math.min(3, scoredCandidates.length))
    const weights = topCandidates.map((_, index) => Math.pow(0.7, index)) // Exponential decay
    const selectedIndex = this.weightedRandomSelect(weights)
    
    return topCandidates[selectedIndex].response
  }

  private calculateResponseScore(response: BankerResponse, context: BankerResponseContext): ResponseSelectionCriteria {
    const criteria: ResponseSelectionCriteria = {
      triggerMatch: this.scoreTriggerMatch(response, context),
      contextRelevance: this.scoreContextRelevance(response, context),
      userStateAlignment: this.scoreUserStateAlignment(response, context),
      recencyBias: this.scoreRecencyBias(response, context),
      varietyScore: this.scoreVariety(response, context),
      therapeuticFit: this.scoreTherapeuticFit(response, context),
      mobileSuitability: this.scoreMobileSuitability(response, context),
      lengthAppropriate: this.scoreLengthAppropriate(response, context),
      interactionFriendly: this.scoreInteractionFriendly(response, context),
      totalScore: 0,
      confidence: 0
    }

    // Calculate weighted total score
    criteria.totalScore = (
      criteria.triggerMatch * 0.25 +
      criteria.contextRelevance * 0.20 +
      criteria.userStateAlignment * 0.20 +
      criteria.therapeuticFit * 0.15 +
      criteria.mobileSuitability * 0.10 +
      criteria.recencyBias * 0.05 +
      criteria.varietyScore * 0.05
    )

    // Calculate confidence based on score distribution
    criteria.confidence = Math.min(criteria.totalScore, 0.95)

    return criteria
  }

  /**
   * Personalization - Adapt response to specific user context
   */
  private async personalizeResponse(response: BankerResponse, context: BankerResponseContext): Promise<BankerResponse> {
    let personalizedContent = response.content[context.language]
    
    // Insert user-specific context
    personalizedContent = this.insertUserContext(personalizedContent, context)
    
    // Adapt tone based on time of day and user mood
    personalizedContent = this.adaptToneForContext(personalizedContent, context)
    
    // Add therapeutic elements specific to user's journey
    const therapeuticEnhancement = this.addTherapeuticPersonalization(response, context)
    
    return {
      ...response,
      content: {
        ...response.content,
        [context.language]: personalizedContent
      },
      therapeutic: {
        ...response.therapeutic,
        ...therapeuticEnhancement
      },
      context: {
        ...response.context,
        userStreakAtTime: context.userState.streak,
        timeGenerated: new Date(),
        contextualFactors: this.extractContextualFactors(context)
      }
    }
  }

  /**
   * Mobile Optimization - Ensure great mobile experience
   */
  private optimizeForMobile(response: BankerResponse, context: BankerResponseContext): BankerResponse {
    const { mobileContext } = context
    let optimizedResponse = { ...response }

    // Optimize text length for mobile reading
    if (response.metadata.length === 'long' && mobileContext.deviceType === 'mobile') {
      optimizedResponse.content[context.language] = this.shortenForMobile(
        response.content[context.language], 
        context.language
      )
      optimizedResponse.metadata.length = 'medium'
    }

    // Adjust haptic feedback based on battery level
    if (mobileContext.batteryLevel && mobileContext.batteryLevel < 20) {
      optimizedResponse.mobileOptimized.hapticPattern = undefined
      optimizedResponse.mobileOptimized.visualEffect = 'none' as any
    }

    // Optimize for poor connectivity
    if (mobileContext.connectivity === 'poor') {
      optimizedResponse.mobileOptimized.soundCue = 'none'
    }

    return optimizedResponse
  }

  /**
   * Therapeutic Methodology - Expansion-Based Approach
   */
  private addTherapeuticPersonalization(response: BankerResponse, context: BankerResponseContext): Partial<BankerResponse['therapeutic']> {
    const { userState, deposit } = context
    
    // Identify what's working (expansion-based focus)
    const workingAspects = this.identifyWorkingAspects(context)
    
    // Gentle curiosity instead of harsh judgment
    const curiosityPrompt = this.generateCuriosityPrompt(context)
    
    // Hope-based framing
    const hopeElement = this.addHopeBasedFraming(context)
    
    return {
      focusArea: [...(response.therapeutic.focusArea || []), ...workingAspects],
      followUpSuggestion: curiosityPrompt || response.therapeutic.followUpSuggestion
    }
  }

  /**
   * Helper Methods - Supporting functionality
   */
  private initializePersonality(): BankerPersonality {
    return {
      role: "Personal banker for your emotional wealth",
      approach: 'expansion_based',
      communication: {
        tone: 'warm',
        focus: 'strengths_based',
        avoids: ['harsh_judgment', 'toxic_positivity', 'minimizing'],
        embraces: ['gentle_curiosity', 'authentic_witnessing', 'hope']
      },
      philosophy: {
        coreBeliefs: [
          "Your worth is not broken - it's depleted",
          "Small deposits compound into abundant wealth",
          "What's working is more powerful than what's broken",
          "Gentle curiosity heals better than harsh judgment"
        ],
        healingApproach: "Systematic deposits of self-worth through daily practice",
        crisisResponse: "Immediate warmth, professional backup, never alone",
        boundaryRespect: true
      },
      mobilePersonality: {
        shortFormWisdom: true,
        touchFriendlyPresence: true,
        contextualAwareness: true,
        batteryConsciousness: true
      }
    }
  }

  private initializeResponseLibrary(): ResponseLibrary {
    return {
      firstTime: { 
        welcome: firstTimeResponses.slice(0, 3),
        firstDeposit: firstTimeResponses, 
        firstExercise: firstTimeResponses.slice(1, 4), 
        accountSetup: firstTimeResponses.slice(0, 2) 
      },
      daily: { 
        morningGreeting: depositAcknowledgments.slice(0, 5), 
        depositAcknowledgment: depositAcknowledgments, 
        exerciseCompletion: depositAcknowledgments.slice(5, 10), 
        eveningReflection: depositAcknowledgments.slice(10, 15) 
      },
      milestones: { 
        streakAchievements: streakMilestones, 
        balanceMilestones: depositAcknowledgments.slice(15, 20), 
        categoryMastery: expansionBasedResponses.slice(0, 5), 
        monthlyReflections: expansionBasedResponses.slice(5, 10) 
      },
      crisis: { 
        lowRisk: crisisResponses.filter(r => r.id.includes('low')), 
        mediumRisk: crisisResponses.filter(r => r.id.includes('medium')), 
        highRisk: crisisResponses.filter(r => r.therapeutic.crisisEscalation === true), 
        criticalRisk: crisisResponses.filter(r => r.therapeutic.crisisEscalation === true), 
        postCrisisSupport: crisisResponses.slice(0, 2) 
      },
      categorySpecific: categoryResponses,
      emotional: { 
        vulnerable: vulnerableResponses, 
        struggling: expansionBasedResponses.slice(0, 5), 
        breakthrough: expansionBasedResponses.slice(5, 10), 
        healing: vulnerableResponses.slice(0, 3), 
        growth: depositAcknowledgments.slice(0, 5) 
      },
      contextual: { 
        seasonal: new Map(), 
        timeOfDay: new Map(), 
        cultural: new Map(), 
        situational: expansionBasedResponses 
      }
    }
  }

  private initializeCrisisDetection(): CrisisDetection {
    return {
      keywordAnalysis: {
        criticalKeywords: ['suicide', 'kill myself', 'end it all', 'no hope', 'can\'t go on'],
        contextualPhrases: ['want to die', 'better off dead', 'no point', 'too much pain'],
        hebrewCrisisPatterns: ['רוצה למות', 'לא יכול להמשיך', 'אין תקווה', 'נמאס לי מהחיים'],
        escalationTriggers: ['plan to', 'going to', 'tonight', 'tomorrow']
      },
      riskCalculation: {
        immediateDanger: false,
        suicidalIdeation: false,
        selfHarmIndicators: false,
        isolationPatterns: false,
        rapidMoodDecline: false
      },
      responseProtocol: {
        immediateResponse: this.createCrisisResponse(),
        humanEscalation: true,
        emergencyContacts: ['crisis_hotline', 'dvir_phone'],
        resourcesProvided: ['crisis_resources', 'emergency_numbers'],
        followUpScheduled: true
      },
      safety: {
        encryptedLogging: true,
        mandatedReporting: false, // Respect therapeutic confidentiality
        professionalBackup: true,
        userConsentRequired: false // In crisis, prioritize safety
      }
    }
  }

  /**
   * Crisis-specific helper methods
   */
  private getCrisisHapticPattern(riskLevel: CrisisRiskLevel): number[] {
    const patterns = {
      none: [50, 25, 50],
      low: [75, 50, 75],
      medium: [100, 50, 100, 50],
      high: [150, 75, 150, 75, 150],
      critical: [200, 100, 200, 100, 200, 100]
    }
    
    return patterns[riskLevel] || patterns.medium
  }

  private createCrisisResponse(): BankerResponse {
    return {
      id: 'crisis_immediate_001',
      content: {
        en: "I can feel how much pain you're in right now. You're not alone, and your life has value. Let's get you support immediately.",
        he: "אני מרגיש כמה כאב אתה חווה עכשיו. אתה לא לבד, והחיים שלך יקרים. בוא נשיג לך תמיכה מיד."
      },
      metadata: {
        tone: 'urgent',
        length: 'medium',
        therapeuticIntent: ['crisis_support', 'immediate_safety'],
        emotionalImpact: 'calming'
      },
      mobileOptimized: {
        readingTimeSeconds: 8,
        hapticPattern: [200, 100, 200],
        visualEffect: 'glow',
        soundCue: 'gentle'
      },
      therapeutic: {
        methodology: 'crisis_intervention' as any,
        focusArea: ['immediate_safety', 'human_connection'],
        crisisEscalation: true
      },
      context: {
        trigger: 'crisis_detected',
        userStreakAtTime: 0,
        timeGenerated: new Date(),
        contextualFactors: ['crisis_intervention']
      }
    }
  }

  // Response selection helpers - enhanced for exercise vs free deposits
  private getDepositResponses(context: BankerResponseContext): BankerResponse[] {
    const { deposit } = context
    if (!deposit) return this.responseLibrary.daily.depositAcknowledgment

    // Exercise-guided deposits get specialized responses
    if (deposit.linkedExercise) {
      return this.getExerciseGuidedResponses(context)
    }

    // Free deposits get category-based responses
    if (deposit.category) {
      // Map category names to response keys (handle self-compassion -> selfCompassion)
      const categoryKey = deposit.category === 'self-compassion' ? 'selfCompassion' : deposit.category
      const categoryResponses = this.responseLibrary.categorySpecific[categoryKey as keyof typeof this.responseLibrary.categorySpecific]
      if (categoryResponses && categoryResponses.length > 0) {
        return categoryResponses
      }
    }
    
    return this.responseLibrary.daily.depositAcknowledgment
  }

  private getExerciseGuidedResponses(context: BankerResponseContext): BankerResponse[] {
    const { deposit, language } = context
    
    // Create exercise-specific responses
    const exerciseResponses: BankerResponse[] = [
      {
        id: `exercise_response_${deposit?.category}_001`,
        content: {
          en: "Thank you for engaging with today's exercise. I can see how thoughtfully you approached this practice...",
          he: "תודה שהתמודדת עם התרגיל של היום. אני רואה כמה מחשבה השקעת בתרגול הזה..."
        },
        metadata: {
          tone: 'therapeutic',
          length: 'medium',
          therapeuticIntent: ['exercise_completion', 'growth_acknowledgment'],
          emotionalImpact: 'validating'
        },
        mobileOptimized: {
          readingTimeSeconds: 12,
          hapticPattern: [50, 25, 50],
          visualEffect: 'gentle_pulse',
          soundCue: 'soft'
        },
        therapeutic: {
          methodology: 'expansion_based' as any,
          focusArea: ['exercise_engagement', 'structured_growth'],
          crisisEscalation: false
        },
        context: {
          trigger: 'exercise_deposit',
          userStreakAtTime: context.userState.streak,
          timeGenerated: new Date(),
          contextualFactors: ['exercise_guided', deposit?.category || 'general']
        }
      },
      {
        id: `exercise_response_${deposit?.category}_002`,
        content: {
          en: "Your willingness to follow the exercise shows real commitment to your healing journey...",
          he: "הנכונות שלך לעקוב אחר התרגיל מראה מחויבות אמיתית למסע הריפוי שלך..."
        },
        metadata: {
          tone: 'encouraging',
          length: 'medium',
          therapeuticIntent: ['commitment_recognition', 'journey_validation'],
          emotionalImpact: 'empowering'
        },
        mobileOptimized: {
          readingTimeSeconds: 10,
          hapticPattern: [75, 50, 75],
          visualEffect: 'warm_glow',
          soundCue: 'affirming'
        },
        therapeutic: {
          methodology: 'expansion_based' as any,
          focusArea: ['commitment', 'therapeutic_alliance'],
          crisisEscalation: false
        },
        context: {
          trigger: 'exercise_deposit',
          userStreakAtTime: context.userState.streak,
          timeGenerated: new Date(),
          contextualFactors: ['exercise_guided', 'commitment_recognition']
        }
      }
    ]

    // Add category-specific exercise responses
    if (deposit?.category) {
      exerciseResponses.push(...this.getCategoryExerciseResponses(deposit.category, language))
    }

    return exerciseResponses
  }

  private getCategoryExerciseResponses(category: string, language: Language): BankerResponse[] {
    const categoryExerciseResponses: Record<string, BankerResponse[]> = {
      gratitude: [
        {
          id: `gratitude_exercise_001`,
          content: {
            en: "Your ability to notice goodness, even when guided, is rebuilding your nervous system's capacity for abundance...",
            he: "היכולת שלך להבחין בטוב, גם כשמובילים אותך, בונה מחדש את יכולת המערכת העצבית שלך לשפע..."
          },
          metadata: {
            tone: 'therapeutic',
            length: 'medium',
            therapeuticIntent: ['gratitude_validation', 'nervous_system_healing'],
            emotionalImpact: 'healing'
          },
          mobileOptimized: {
            readingTimeSeconds: 15,
            hapticPattern: [100, 50, 100],
            visualEffect: 'golden_warmth',
            soundCue: 'harmonious'
          },
          therapeutic: {
            methodology: 'expansion_based' as any,
            focusArea: ['gratitude_practice', 'nervous_system_regulation'],
            crisisEscalation: false
          },
          context: {
            trigger: 'exercise_deposit',
            userStreakAtTime: 0,
            timeGenerated: new Date(),
            contextualFactors: ['gratitude_exercise', 'abundance_recognition']
          }
        }
      ],
      courage: [
        {
          id: `courage_exercise_001`,
          content: {
            en: "Following through with this courage exercise is itself an act of bravery. You're training yourself to recognize your own strength...",
            he: "המשך התרגיל האומץ הזה הוא כשלעצמו מעשה של אומץ. אתה מאמן את עצמך להכיר בכוח שלך..."
          },
          metadata: {
            tone: 'empowering',
            length: 'medium',
            therapeuticIntent: ['courage_validation', 'strength_recognition'],
            emotionalImpact: 'empowering'
          },
          mobileOptimized: {
            readingTimeSeconds: 12,
            hapticPattern: [150, 75, 150],
            visualEffect: 'strength_pulse',
            soundCue: 'bold'
          },
          therapeutic: {
            methodology: 'expansion_based' as any,
            focusArea: ['courage_building', 'self_efficacy'],
            crisisEscalation: false
          },
          context: {
            trigger: 'exercise_deposit',
            userStreakAtTime: 0,
            timeGenerated: new Date(),
            contextualFactors: ['courage_exercise', 'strength_building']
          }
        }
      ],
      honesty: [
        {
          id: `honesty_exercise_001`,
          content: {
            en: "Your willingness to be honest through this exercise is creating space for authentic healing to begin...",
            he: "הנכונות שלך להיות כנה דרך התרגיל הזה יוצרת מקום לריפוי אותנטי להתחיל..."
          },
          metadata: {
            tone: 'validating',
            length: 'medium',
            therapeuticIntent: ['authenticity_validation', 'honesty_recognition'],
            emotionalImpact: 'healing'
          },
          mobileOptimized: {
            readingTimeSeconds: 14,
            hapticPattern: [75, 50, 75, 50],
            visualEffect: 'clear_light',
            soundCue: 'pure'
          },
          therapeutic: {
            methodology: 'expansion_based' as any,
            focusArea: ['authenticity', 'truth_telling'],
            crisisEscalation: false
          },
          context: {
            trigger: 'exercise_deposit',
            userStreakAtTime: 0,
            timeGenerated: new Date(),
            contextualFactors: ['honesty_exercise', 'authenticity_practice']
          }
        }
      ],
      success: [
        {
          id: `success_exercise_001`,
          content: {
            en: "Completing this success exercise shows you're learning to see your victories, however small. This rewires your mind to notice what's working...",
            he: "השלמת תרגיל ההצלחה הזה מראה שאתה לומד לראות את הניצחונות שלך, קטנים ככל שיהיו. זה מחדש את המוח שלך להבחין במה שעובד..."
          },
          metadata: {
            tone: 'celebratory',
            length: 'medium',
            therapeuticIntent: ['success_recognition', 'mindset_rewiring'],
            emotionalImpact: 'empowering'
          },
          mobileOptimized: {
            readingTimeSeconds: 16,
            hapticPattern: [200, 100, 200],
            visualEffect: 'victory_sparkle',
            soundCue: 'triumphant'
          },
          therapeutic: {
            methodology: 'expansion_based' as any,
            focusArea: ['success_awareness', 'cognitive_rewiring'],
            crisisEscalation: false
          },
          context: {
            trigger: 'exercise_deposit',
            userStreakAtTime: 0,
            timeGenerated: new Date(),
            contextualFactors: ['success_exercise', 'victory_recognition']
          }
        }
      ],
      'self-compassion': [
        {
          id: `self_compassion_exercise_001`,
          content: {
            en: "Your gentleness with yourself in this exercise is creating the internal safety your nervous system has been craving...",
            he: "העדינות שלך עם עצמך בתרגיל הזה יוצרת את הביטחון הפנימי שהמערכת העצבית שלך השתוקקה לו..."
          },
          metadata: {
            tone: 'nurturing',
            length: 'medium',
            therapeuticIntent: ['self_compassion_validation', 'internal_safety'],
            emotionalImpact: 'healing'
          },
          mobileOptimized: {
            readingTimeSeconds: 13,
            hapticPattern: [50, 100, 50],
            visualEffect: 'warm_embrace',
            soundCue: 'soothing'
          },
          therapeutic: {
            methodology: 'expansion_based' as any,
            focusArea: ['self_compassion', 'nervous_system_regulation'],
            crisisEscalation: false
          },
          context: {
            trigger: 'exercise_deposit',
            userStreakAtTime: 0,
            timeGenerated: new Date(),
            contextualFactors: ['self_compassion_exercise', 'internal_safety_building']
          }
        }
      ]
    }

    return categoryExerciseResponses[category] || []
  }
  
  private getStreakMilestoneResponses(context: BankerResponseContext): BankerResponse[] {
    const streak = context.userState.streak
    const milestoneResponses = this.responseLibrary.milestones.streakAchievements.get(streak)
    return milestoneResponses || this.responseLibrary.daily.depositAcknowledgment
  }
  private getFallbackResponse(context: BankerResponseContext): BankerResponse { return this.createCrisisResponse() }
  private scoreTriggerMatch(response: BankerResponse, context: BankerResponseContext): number { return 0.8 }
  private scoreContextRelevance(response: BankerResponse, context: BankerResponseContext): number { return 0.7 }
  private scoreUserStateAlignment(response: BankerResponse, context: BankerResponseContext): number { return 0.6 }
  private scoreRecencyBias(response: BankerResponse, context: BankerResponseContext): number { return 0.8 }
  private scoreVariety(response: BankerResponse, context: BankerResponseContext): number { return 0.7 }
  private scoreTherapeuticFit(response: BankerResponse, context: BankerResponseContext): number { return 0.9 }
  private scoreMobileSuitability(response: BankerResponse, context: BankerResponseContext): number { return 0.8 }
  private scoreLengthAppropriate(response: BankerResponse, context: BankerResponseContext): number { return 0.7 }
  private scoreInteractionFriendly(response: BankerResponse, context: BankerResponseContext): number { return 0.8 }
  private weightedRandomSelect(weights: number[]): number { return 0 }
  private insertUserContext(content: string, context: BankerResponseContext): string { return content }
  private adaptToneForContext(content: string, context: BankerResponseContext): string { return content }
  private extractContextualFactors(context: BankerResponseContext): string[] { return [] }
  private shortenForMobile(content: string, language: Language): string { return content }
  private identifyWorkingAspects(context: BankerResponseContext): string[] { return [] }
  private generateCuriosityPrompt(context: BankerResponseContext): string { return '' }
  private addHopeBasedFraming(context: BankerResponseContext): any { return {} }
  private selectCrisisResponse(responses: BankerResponse[], context: BankerResponseContext): BankerResponse { return responses[0] || this.createCrisisResponse() }
  private getCrisisFollowUp(riskLevel: string, language: Language): string { return 'Crisis follow-up needed' }
}

/**
 * Banker Service Factory - Singleton Pattern for Mobile Performance
 */
export class BankerServiceFactory {
  private static instance: BankerService | null = null
  
  public static getInstance(config?: BankerConfig): BankerService {
    if (!BankerServiceFactory.instance) {
      const defaultConfig: BankerConfig = {
        responseSettings: {
          maxResponseLength: 200, // Mobile-optimized
          adaptToMoodDetection: true,
          respectQuietHours: true,
          batterySavingMode: true
        },
        therapeuticSettings: {
          crisisDetectionEnabled: true,
          interventionThreshold: 'medium',
          humanEscalationEnabled: true,
          methodologyStrictness: 'flexible'
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
      
      BankerServiceFactory.instance = new BankerService(config || defaultConfig)
    }
    
    return BankerServiceFactory.instance
  }
}

// Export for easy use
export const getBankerService = () => BankerServiceFactory.getInstance()