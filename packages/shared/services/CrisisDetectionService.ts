// Crisis Detection Service - Emergency Support System
// TogetherNet Therapeutic Platform
// Mobile-Optimized Crisis Detection and Response

import { Language } from '../types/Exercise'
import { DepositInput } from '../types/Deposit'
import { BankerResponse } from '../types/Banker'
import { crisisResponses } from '../constants/BankerResponses'
import { CrisisResponseWorkflow, CrisisInterventionLog } from './CrisisResponseWorkflow'

/**
 * Crisis Risk Levels for Escalation
 */
export type CrisisRiskLevel = 'none' | 'low' | 'medium' | 'high' | 'critical'

/**
 * Crisis Detection Result
 */
export interface CrisisDetectionResult {
  riskLevel: CrisisRiskLevel
  detectedKeywords: string[]
  confidenceScore: number // 0-1
  urgentIntervention: boolean
  supportContactNeeded: boolean
  emergencyServices: boolean
  detectedConcerns: CrisisConcern[]
  recommendedResponse: string
  escalationRequired: boolean
}

/**
 * Types of Crisis Concerns
 */
export type CrisisConcern = 
  | 'suicidal_ideation'
  | 'self_harm'
  | 'substance_abuse'
  | 'domestic_violence'
  | 'severe_depression'
  | 'panic_attack'
  | 'eating_disorder'
  | 'psychosis'
  | 'trauma_flashback'
  | 'overwhelming_grief'

/**
 * Crisis Context Information
 */
export interface CrisisContext {
  userId: string
  depositContent: string
  language: Language
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  userHistory: {
    previousCrises: number
    lastCrisisDate?: Date
    totalDeposits: number
    streak: number
    hasUsedCrisisSupport: boolean
  }
  mobileContext: {
    deviceType: 'mobile' | 'tablet' | 'desktop'
    location?: 'unknown' | 'home' | 'work' | 'public'
    batteryLevel?: number
    connectivity: 'online' | 'poor' | 'offline'
  }
}

/**
 * Crisis Support Resources
 */
export interface CrisisSupportResource {
  id: string
  name: {
    en: string
    he: string
  }
  description: {
    en: string
    he: string
  }
  phone: string
  website?: string
  available24h: boolean
  country: 'IL' | 'US' | 'global'
  type: 'hotline' | 'chat' | 'emergency' | 'professional'
}

/**
 * Crisis Detection Service - Mobile-Optimized Emergency Support
 */
export class CrisisDetectionService {
  private responseWorkflow: CrisisResponseWorkflow

  constructor() {
    this.responseWorkflow = new CrisisResponseWorkflow()
  }
  
  // Crisis Keywords by Language and Severity
  private crisisKeywords = {
    en: {
      critical: [
        'want to die', 'going to kill myself', 'end my life', 'suicide plan',
        'overdose', 'jump off', 'hang myself', 'cut my wrists',
        'not worth living', 'better off dead', 'goodbye forever'
      ],
      high: [
        'kill myself', 'want to disappear', 'can\'t go on', 'no point',
        'end it all', 'hurt myself', 'self harm', 'cut myself',
        'hate myself', 'worthless', 'burden to everyone', 'give up'
      ],
      medium: [
        'depressed', 'hopeless', 'can\'t cope', 'falling apart',
        'losing control', 'panic attack', 'can\'t breathe', 'overwhelmed',
        'nobody cares', 'all alone', 'scared', 'anxious'
      ],
      low: [
        'sad', 'tired', 'stressed', 'worried', 'down',
        'struggling', 'difficult', 'hard time', 'not okay'
      ]
    },
    he: {
      critical: [
        'רוצה למות', 'אהרוג את עצמי', 'לסיים את החיים', 'תוכנית התאבדות',
        'מנת יתר', 'לקפוץ מ', 'לתלות את עצמי', 'לחתוך את הוורידים',
        'לא שווה לחיות', 'עדיף מת', 'שלום לעולם'
      ],
      high: [
        'להרוג את עצמי', 'רוצה להיעלם', 'לא יכול להמשיך', 'אין טעם',
        'לסיים הכל', 'לפגוע בעצמי', 'פציעה עצמית', 'לחתוך את עצמי',
        'שונא את עצמי', 'חסר ערך', 'נטל על כולם', 'מוותר'
      ],
      medium: [
        'מדוכא', 'חסר תקווה', 'לא מצליח להתמודד', 'מתפרק',
        'מאבד שליטה', 'התקף חרדה', 'לא יכול לנשום', 'מוצף',
        'אף אחד לא אכפת', 'לגמרי לבד', 'מפחד', 'חרד'
      ],
      low: [
        'עצוב', 'עייף', 'לחוץ', 'דואג', 'רע',
        'נאבק', 'קשה', 'תקופה קשה', 'לא בסדר'
      ]
    }
  }

  // Crisis Support Resources - Israel Focus
  private supportResources: CrisisSupportResource[] = [
    {
      id: 'sahar_hotline',
      name: {
        en: 'SAHAR - Emotional Support',
        he: 'סהר - תמיכה רגשית'
      },
      description: {
        en: 'National emotional support hotline - anonymous and free',
        he: 'קו תמיכה רגשית ארצי - אנונימי וחינם'
      },
      phone: '1201',
      website: 'https://sahar.org.il',
      available24h: true,
      country: 'IL',
      type: 'hotline'
    },
    {
      id: 'emergency_services',
      name: {
        en: 'Emergency Services',
        he: 'שירותי חירום'
      },
      description: {
        en: 'Immediate emergency medical and psychiatric help',
        he: 'עזרה רפואית ופסיכיאטרית מיידית'
      },
      phone: '101',
      available24h: true,
      country: 'IL',
      type: 'emergency'
    },
    {
      id: 'natal_trauma',
      name: {
        en: 'NATAL - Trauma Support',
        he: 'נטל - תמיכה בטראומה'
      },
      description: {
        en: 'Specialized trauma and PTSD support',
        he: 'תמיכה מתמחה בטראומה ופוסט טראומה'
      },
      phone: '1800-363-363',
      website: 'https://natal.org.il',
      available24h: false,
      country: 'IL',
      type: 'professional'
    }
  ]

  /**
   * Main Crisis Detection Algorithm
   */
  public async detectCrisis(context: CrisisContext): Promise<CrisisDetectionResult> {
    const { depositContent, language, userHistory } = context
    
    // Initialize result
    let result: CrisisDetectionResult = {
      riskLevel: 'none',
      detectedKeywords: [],
      confidenceScore: 0,
      urgentIntervention: false,
      supportContactNeeded: false,
      emergencyServices: false,
      detectedConcerns: [],
      recommendedResponse: 'normal_support',
      escalationRequired: false
    }

    // Normalize text for analysis
    const normalizedText = this.normalizeText(depositContent, language)
    
    // Check for crisis keywords
    const keywordAnalysis = this.analyzeKeywords(normalizedText, language)
    result.detectedKeywords = keywordAnalysis.keywords
    result.confidenceScore = keywordAnalysis.confidence

    // Determine risk level
    result.riskLevel = this.calculateRiskLevel(keywordAnalysis, userHistory)
    
    // Detect specific concerns
    result.detectedConcerns = this.detectSpecificConcerns(normalizedText, language)
    
    // Determine intervention needs
    const interventionNeeds = this.determineInterventionLevel(result.riskLevel, result.detectedConcerns)
    result.urgentIntervention = interventionNeeds.urgent
    result.supportContactNeeded = interventionNeeds.supportContact
    result.emergencyServices = interventionNeeds.emergency
    result.escalationRequired = interventionNeeds.escalation

    // Get recommended response
    result.recommendedResponse = this.getRecommendedResponseType(result.riskLevel)

    return result
  }

  /**
   * Get Crisis Support Resources for User's Location
   */
  public getSupportResources(language: Language, country: 'IL' | 'US' | 'global' = 'IL'): CrisisSupportResource[] {
    return this.supportResources.filter(resource => 
      resource.country === country || resource.country === 'global'
    )
  }

  /**
   * Get Immediate Crisis Response
   */
  public getImmediateCrisisResponse(riskLevel: CrisisRiskLevel, language: Language): BankerResponse | null {
    const crisisResponsesForLevel = crisisResponses.filter(response => {
      const responseLevel = this.extractRiskLevelFromResponseId(response.id)
      return responseLevel === riskLevel
    })

    if (crisisResponsesForLevel.length === 0) {
      // Fallback to general crisis response
      return crisisResponses[0] || null
    }

    // Return first appropriate response (could be randomized later)
    return crisisResponsesForLevel[0]
  }

  /**
   * Schedule Crisis Follow-up
   */
  public async scheduleCrisisFollowUp(userId: string, crisisLevel: CrisisRiskLevel): Promise<void> {
    const followUpTimes = {
      low: 24 * 60 * 60 * 1000, // 24 hours
      medium: 4 * 60 * 60 * 1000, // 4 hours  
      high: 1 * 60 * 60 * 1000, // 1 hour
      critical: 10 * 60 * 1000 // 10 minutes
    }

    const delay = followUpTimes[crisisLevel as keyof typeof followUpTimes] || followUpTimes.low

    // In real implementation, this would schedule actual follow-up
    console.log(`Crisis follow-up scheduled for user ${userId} in ${delay}ms for ${crisisLevel} risk level`)
    
    // TODO: Implement actual scheduling with Cloud Functions or similar
    // setTimeout(() => this.sendCrisisFollowUp(userId, crisisLevel), delay)
  }

  /**
   * Normalize text for crisis detection
   */
  private normalizeText(text: string, language: Language): string {
    return text.toLowerCase()
      .replace(/[.,!?;:'"()]/g, ' ') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim()
  }

  /**
   * Analyze keywords in content
   */
  private analyzeKeywords(text: string, language: Language): { keywords: string[], confidence: number } {
    const keywords = this.crisisKeywords[language]
    let detectedKeywords: string[] = []
    let totalWeight = 0

    // Check each severity level with different weights
    const severityWeights = { critical: 1.0, high: 0.8, medium: 0.6, low: 0.4 }

    Object.entries(keywords).forEach(([severity, keywordList]) => {
      keywordList.forEach(keyword => {
        if (text.includes(keyword)) {
          detectedKeywords.push(keyword)
          totalWeight += severityWeights[severity as keyof typeof severityWeights]
        }
      })
    })

    // Calculate confidence (normalize to 0-1)
    const confidence = Math.min(totalWeight / 2, 1) // Cap at 1.0

    return { keywords: detectedKeywords, confidence }
  }

  /**
   * Calculate overall risk level
   */
  private calculateRiskLevel(keywordAnalysis: { keywords: string[], confidence: number }, userHistory: CrisisContext['userHistory']): CrisisRiskLevel {
    const { confidence } = keywordAnalysis
    
    // Base risk level on confidence
    let baseRisk: CrisisRiskLevel = 'none'
    
    if (confidence >= 0.9) baseRisk = 'critical'
    else if (confidence >= 0.7) baseRisk = 'high'
    else if (confidence >= 0.5) baseRisk = 'medium'
    else if (confidence >= 0.3) baseRisk = 'low'

    // Adjust based on user history
    if (userHistory.previousCrises > 0) {
      // Users with crisis history need more careful monitoring
      if (baseRisk === 'low') baseRisk = 'medium'
      else if (baseRisk === 'medium') baseRisk = 'high'
    }

    // Recent crisis increases risk
    if (userHistory.lastCrisisDate) {
      const daysSinceLastCrisis = (Date.now() - userHistory.lastCrisisDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceLastCrisis < 7 && baseRisk !== 'none') {
        // Escalate risk if recent crisis
        const riskLevels: CrisisRiskLevel[] = ['none', 'low', 'medium', 'high', 'critical']
        const currentIndex = riskLevels.indexOf(baseRisk)
        if (currentIndex < riskLevels.length - 1) {
          baseRisk = riskLevels[currentIndex + 1]
        }
      }
    }

    return baseRisk
  }

  /**
   * Detect specific crisis concerns
   */
  private detectSpecificConcerns(text: string, language: Language): CrisisConcern[] {
    const concerns: CrisisConcern[] = []
    
    const concernPatterns = {
      en: {
        suicidal_ideation: ['suicide', 'kill myself', 'end my life', 'want to die'],
        self_harm: ['cut myself', 'hurt myself', 'self harm', 'cutting'],
        substance_abuse: ['drunk', 'high', 'overdose', 'drugs', 'alcohol'],
        domestic_violence: ['hitting me', 'abusive', 'violent', 'afraid of'],
        severe_depression: ['can\'t get up', 'sleeping all day', 'no energy', 'empty'],
        panic_attack: ['can\'t breathe', 'heart racing', 'panic', 'chest tight'],
        eating_disorder: ['starving', 'binge', 'purge', 'hate my body'],
        trauma_flashback: ['flashback', 'nightmare', 'reliving', 'triggered'],
        overwhelming_grief: ['can\'t stop crying', 'grief', 'loss', 'mourning']
      },
      he: {
        suicidal_ideation: ['התאבדות', 'להרוג את עצמי', 'לסיים את החיים', 'רוצה למות'],
        self_harm: ['לחתוך את עצמי', 'לפגוע בעצמי', 'פציעה עצמית', 'חיתוך'],
        substance_abuse: ['שיכור', 'מסומם', 'מנת יתר', 'סמים', 'אלכוהול'],
        domestic_violence: ['מכה אותי', 'אלים', 'אלימות', 'מפחד מ'],
        severe_depression: ['לא יכול לקום', 'ישן כל היום', 'אין כוח', 'ריק'],
        panic_attack: ['לא יכול לנשום', 'לב דופק', 'פאניקה', 'חזה צר'],
        eating_disorder: ['מרעיב', 'זלילה', 'הקאה', 'שונא את הגוף'],
        trauma_flashback: ['פלאשבק', 'סיוט', 'חוזר לחיות', 'מופעל'],
        overwhelming_grief: ['לא יכול להפסיק לבכות', 'אבל', 'אובדן', 'התאבלות']
      }
    }

    const patterns = concernPatterns[language]
    
    Object.entries(patterns).forEach(([concern, keywords]) => {
      if (keywords.some(keyword => text.includes(keyword))) {
        concerns.push(concern as CrisisConcern)
      }
    })

    return concerns
  }

  /**
   * Determine intervention level needed
   */
  private determineInterventionLevel(riskLevel: CrisisRiskLevel, concerns: CrisisConcern[]) {
    const hasSuicidalIdeation = concerns.includes('suicidal_ideation')
    const hasSelfHarm = concerns.includes('self_harm')
    const hasEmergencyConcern = concerns.includes('substance_abuse') || concerns.includes('domestic_violence')

    return {
      urgent: riskLevel === 'critical' || hasSuicidalIdeation,
      supportContact: riskLevel === 'high' || riskLevel === 'critical' || hasSuicidalIdeation || hasSelfHarm,
      emergency: riskLevel === 'critical' && (hasSuicidalIdeation || hasEmergencyConcern),
      escalation: riskLevel === 'high' || riskLevel === 'critical'
    }
  }

  /**
   * Get recommended response type
   */
  private getRecommendedResponseType(riskLevel: CrisisRiskLevel): string {
    const responseTypes = {
      none: 'normal_support',
      low: 'gentle_check_in',
      medium: 'crisis_support',
      high: 'immediate_support',
      critical: 'emergency_intervention'
    }

    return responseTypes[riskLevel]
  }

  /**
   * Extract risk level from response ID
   */
  private extractRiskLevelFromResponseId(responseId: string): CrisisRiskLevel {
    if (responseId.includes('critical')) return 'critical'
    if (responseId.includes('high')) return 'high'
    if (responseId.includes('medium')) return 'medium'
    if (responseId.includes('low')) return 'low'
    return 'none'
  }

  /**
   * Mobile-Optimized Crisis Alert
   */
  public async triggerMobileCrisisAlert(context: CrisisContext, result: CrisisDetectionResult): Promise<CrisisInterventionLog> {
    const { mobileContext, userId, language } = context

    // Immediate mobile optimizations
    if (mobileContext.deviceType === 'mobile') {
      
      // Vibration pattern for crisis alerts (if available)
      if ('navigator' in globalThis && 'vibrate' in navigator) {
        // Crisis-specific vibration pattern: urgent but calming
        navigator.vibrate([200, 100, 200, 100, 200])
      }

      // Battery-aware interventions
      if (mobileContext.batteryLevel && mobileContext.batteryLevel < 20) {
        console.log('Low battery detected - prioritizing essential crisis features')
        // Simplify UI, reduce animations, focus on core crisis support
      }

      // Connectivity-aware crisis support
      if (mobileContext.connectivity === 'poor' || mobileContext.connectivity === 'offline') {
        console.log('Poor connectivity - enabling offline crisis resources')
        // Cache critical crisis resources locally
        // Enable offline crisis support features
      }
    }

    // Log crisis detection for monitoring
    console.log(`Crisis detected for user ${userId}:`, {
      riskLevel: result.riskLevel,
      concerns: result.detectedConcerns,
      intervention: result.urgentIntervention
    })

    // Execute comprehensive crisis response workflow
    const interventionLog = await this.responseWorkflow.executeCrisisResponse(
      userId,
      result,
      language,
      {
        deviceType: mobileContext.deviceType,
        batteryLevel: mobileContext.batteryLevel,
        connectivity: mobileContext.connectivity
      }
    )

    return interventionLog
  }
}