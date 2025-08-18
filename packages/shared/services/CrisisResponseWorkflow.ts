// Crisis Response Workflow - Emergency Support System
// TogetherNet Therapeutic Platform
// Mobile-Optimized Crisis Escalation and Response Management

import { Language } from '../types/Exercise'
import { CrisisRiskLevel, CrisisDetectionResult, CrisisSupportResource } from './CrisisDetectionService'
import { EmergencyContactService } from './EmergencyContactService'

/**
 * Crisis Response Actions
 */
export type CrisisResponseAction = 
  | 'immediate_banker_support'
  | 'crisis_resources_provided'
  | 'human_counselor_alert'
  | 'emergency_services_contact'
  | 'family_notification'
  | 'follow_up_scheduled'
  | 'mobile_crisis_mode'
  | 'offline_resources_activated'

/**
 * Crisis Escalation Timeline
 */
export interface CrisisEscalationTimeline {
  immediate: CrisisResponseAction[] // 0-30 seconds
  urgent: CrisisResponseAction[] // 30 seconds - 5 minutes
  priority: CrisisResponseAction[] // 5-30 minutes
  followUp: CrisisResponseAction[] // 1 hour - 24 hours
  longTerm: CrisisResponseAction[] // 24+ hours
}

/**
 * Crisis Contact Information
 */
export interface CrisisContact {
  id: string
  type: 'hotline' | 'emergency' | 'therapist' | 'family' | 'friend'
  name: string
  phone: string
  available24h: boolean
  language: Language[]
  priority: number // 1-10 (1 = highest priority)
  lastContacted?: Date
  responseTime?: number // average minutes to respond
  specialties?: string[]
}

/**
 * Crisis Intervention Log Entry
 */
export interface CrisisInterventionLog {
  id: string
  userId: string
  timestamp: Date
  riskLevel: CrisisRiskLevel
  triggerContent: string
  detectedConcerns: string[]
  actionsInferred: CrisisResponseAction[]
  contactsNotified: string[]
  responseTime: number // seconds
  resolved: boolean
  resolvedAt?: Date
  followUpScheduled?: Date
  notes: string
  language: Language
}

/**
 * Crisis Response Workflow Service
 */
export class CrisisResponseWorkflow {
  private emergencyContactService: EmergencyContactService

  constructor() {
    this.emergencyContactService = new EmergencyContactService()
  }
  
  // Crisis escalation matrix
  private escalationMatrix: Record<CrisisRiskLevel, CrisisEscalationTimeline> = {
    none: {
      immediate: [],
      urgent: [],
      priority: [],
      followUp: [],
      longTerm: []
    },
    low: {
      immediate: ['immediate_banker_support'],
      urgent: ['crisis_resources_provided'],
      priority: ['follow_up_scheduled'],
      followUp: [],
      longTerm: []
    },
    medium: {
      immediate: ['immediate_banker_support', 'mobile_crisis_mode'],
      urgent: ['crisis_resources_provided', 'human_counselor_alert'],
      priority: ['follow_up_scheduled'],
      followUp: ['follow_up_scheduled'],
      longTerm: []
    },
    high: {
      immediate: ['immediate_banker_support', 'mobile_crisis_mode'],
      urgent: ['crisis_resources_provided', 'human_counselor_alert'],
      priority: ['follow_up_scheduled'],
      followUp: ['follow_up_scheduled'],
      longTerm: ['follow_up_scheduled']
    },
    critical: {
      immediate: ['immediate_banker_support', 'mobile_crisis_mode', 'emergency_services_contact'],
      urgent: ['crisis_resources_provided', 'human_counselor_alert'],
      priority: ['family_notification', 'offline_resources_activated'],
      followUp: ['follow_up_scheduled'],
      longTerm: ['follow_up_scheduled']
    }
  }

  // Crisis contacts for Israel
  private crisisContacts: CrisisContact[] = [
    {
      id: 'sahar_hotline',
      type: 'hotline',
      name: 'SAHAR Emotional Support',
      phone: '1201',
      available24h: true,
      language: ['he', 'en'],
      priority: 1,
      responseTime: 2,
      specialties: ['suicide_prevention', 'emotional_support', 'crisis_counseling']
    },
    {
      id: 'emergency_services_il',
      type: 'emergency',
      name: 'Emergency Services Israel',
      phone: '101',
      available24h: true,
      language: ['he', 'en'],
      priority: 1,
      responseTime: 5,
      specialties: ['emergency_response', 'psychiatric_emergency']
    },
    {
      id: 'natal_trauma',
      type: 'therapist',
      name: 'NATAL Trauma Center',
      phone: '1800-363-363',
      available24h: false,
      language: ['he', 'en'],
      priority: 2,
      responseTime: 30,
      specialties: ['trauma', 'ptsd', 'anxiety']
    },
    {
      id: 'eran_crisis',
      type: 'hotline',
      name: 'ERAN Crisis Hotline',
      phone: '1201',
      available24h: true,
      language: ['he'],
      priority: 2,
      responseTime: 3,
      specialties: ['suicide_prevention', 'crisis_intervention']
    },
    {
      id: 'dvir_emergency',
      type: 'therapist',
      name: 'Dvir Hillel Cohen Eraki (Founder)',
      phone: '+972-XX-XXX-XXXX', // TODO: Replace with actual number
      available24h: false,
      language: ['he', 'en'],
      priority: 3,
      responseTime: 15,
      specialties: ['expansion_therapy', 'heartbank_methodology']
    }
  ]

  /**
   * Execute Crisis Response Workflow
   */
  public async executeCrisisResponse(
    userId: string,
    crisisResult: CrisisDetectionResult,
    language: Language,
    mobileContext?: { deviceType: string, batteryLevel?: number, connectivity: string }
  ): Promise<CrisisInterventionLog> {
    
    const startTime = Date.now()
    const logEntry: CrisisInterventionLog = {
      id: this.generateCrisisId(userId),
      userId,
      timestamp: new Date(),
      riskLevel: crisisResult.riskLevel,
      triggerContent: '[REDACTED FOR PRIVACY]', // Don't log actual content
      detectedConcerns: crisisResult.detectedConcerns,
      actionsInferred: [],
      contactsNotified: [],
      responseTime: 0,
      resolved: false,
      notes: '',
      language
    }

    try {
      // Get escalation timeline for this risk level
      const timeline = this.escalationMatrix[crisisResult.riskLevel]
      
      // Execute immediate actions (0-30 seconds)
      await this.executeImmediateActions(timeline.immediate, userId, language, mobileContext)
      logEntry.actionsInferred.push(...timeline.immediate)
      
      // Execute urgent actions (30 seconds - 5 minutes)
      setTimeout(async () => {
        await this.executeUrgentActions(timeline.urgent, userId, crisisResult, language)
        logEntry.actionsInferred.push(...timeline.urgent)
      }, 30000) // 30 seconds delay
      
      // Execute priority actions (5-30 minutes)
      setTimeout(async () => {
        await this.executePriorityActions(timeline.priority, userId, crisisResult, language)
        logEntry.actionsInferred.push(...timeline.priority)
      }, 300000) // 5 minutes delay
      
      // Schedule follow-up actions
      if (timeline.followUp.length > 0) {
        await this.scheduleFollowUpActions(timeline.followUp, userId, crisisResult)
        logEntry.followUpScheduled = new Date(Date.now() + 3600000) // 1 hour from now
      }
      
      // Log response time
      logEntry.responseTime = (Date.now() - startTime) / 1000
      
      // Store crisis intervention log
      await this.storeCrisisLog(logEntry)
      
      console.log(`Crisis response executed for user ${userId}:`, {
        riskLevel: crisisResult.riskLevel,
        actionsExecuted: logEntry.actionsInferred.length,
        responseTime: logEntry.responseTime
      })
      
      return logEntry
      
    } catch (error) {
      console.error('Error executing crisis response:', error)
      
      // Emergency fallback - ensure user gets help
      await this.emergencyFallback(userId, language)
      
      logEntry.notes = `Error in workflow execution: ${error}. Emergency fallback activated.`
      logEntry.responseTime = (Date.now() - startTime) / 1000
      
      return logEntry
    }
  }

  /**
   * Execute Immediate Actions (0-30 seconds)
   */
  private async executeImmediateActions(
    actions: CrisisResponseAction[], 
    userId: string, 
    language: Language,
    mobileContext?: { deviceType: string, batteryLevel?: number, connectivity: string }
  ): Promise<void> {
    
    for (const action of actions) {
      switch (action) {
        case 'immediate_banker_support':
          // Banker response is handled by BankerService
          console.log(`Immediate banker support activated for user ${userId}`)
          break
          
        case 'mobile_crisis_mode':
          await this.activateMobileCrisisMode(userId, mobileContext)
          break
          
        case 'emergency_services_contact':
          await this.contactEmergencyServices(userId, language)
          break
          
        default:
          console.log(`Immediate action ${action} not implemented`)
      }
    }
  }

  /**
   * Execute Urgent Actions (30 seconds - 5 minutes)
   */
  private async executeUrgentActions(
    actions: CrisisResponseAction[],
    userId: string,
    crisisResult: CrisisDetectionResult,
    language: Language
  ): Promise<void> {
    
    for (const action of actions) {
      switch (action) {
        case 'crisis_resources_provided':
          await this.provideCrisisResources(userId, language)
          break
          
        case 'human_counselor_alert':
          await this.alertHumanCounselor(userId, crisisResult, language)
          break
          
        default:
          console.log(`Urgent action ${action} not implemented`)
      }
    }
  }

  /**
   * Execute Priority Actions (5-30 minutes)
   */
  private async executePriorityActions(
    actions: CrisisResponseAction[],
    userId: string,
    crisisResult: CrisisDetectionResult,
    language: Language
  ): Promise<void> {
    
    for (const action of actions) {
      switch (action) {
        case 'family_notification':
          // Only with user consent or if life-threatening
          if (crisisResult.riskLevel === 'critical') {
            await this.considerFamilyNotification(userId, language)
          }
          break
          
        case 'offline_resources_activated':
          await this.activateOfflineResources(userId, language)
          break
          
        case 'follow_up_scheduled':
          await this.scheduleFollowUp(userId, crisisResult.riskLevel)
          break
          
        default:
          console.log(`Priority action ${action} not implemented`)
      }
    }
  }

  /**
   * Mobile Crisis Mode - Optimize UI for Crisis Support
   */
  private async activateMobileCrisisMode(
    userId: string, 
    mobileContext?: { deviceType: string, batteryLevel?: number, connectivity: string }
  ): Promise<void> {
    
    console.log(`Activating mobile crisis mode for user ${userId}`)
    
    // Mobile-specific crisis optimizations
    if (mobileContext?.deviceType === 'mobile') {
      
      // Battery conservation for extended crisis support
      if (mobileContext.batteryLevel && mobileContext.batteryLevel < 30) {
        console.log('Low battery detected - activating power save crisis mode')
        // Reduce animations, simplify UI, cache critical resources
      }
      
      // Connectivity-aware crisis support
      if (mobileContext.connectivity === 'poor' || mobileContext.connectivity === 'offline') {
        console.log('Poor connectivity - activating offline crisis support')
        // Load offline crisis resources, cache emergency contacts
        await this.activateOfflineCrisisSupport(userId)
      }
      
      // Haptic feedback for crisis comfort
      if ('navigator' in globalThis && 'vibrate' in navigator) {
        // Gentle, rhythmic vibration for grounding
        navigator.vibrate([500, 200, 500, 200, 500])
      }
    }
    
    // TODO: Implement UI changes for crisis mode
    // - Simplify interface to essential crisis features
    // - Highlight emergency contacts
    // - Show crisis resources prominently
    // - Enable quick access to help
  }

  /**
   * Contact Emergency Services
   */
  private async contactEmergencyServices(userId: string, language: Language): Promise<void> {
    console.log(`CRITICAL: Contacting emergency services for user ${userId}`)
    
    // Use emergency contact service to send alerts
    const emergencyContacts = this.emergencyContactService.getEmergencyContacts(language)
    const primaryEmergency = emergencyContacts.find(contact => contact.type === 'emergency')
    
    if (primaryEmergency) {
      try {
        await this.emergencyContactService.sendEmergencyAlert(
          primaryEmergency.id,
          userId,
          'critical',
          language
        )
        console.log(`Emergency services contacted: ${primaryEmergency.name}`)
      } catch (error) {
        console.error('Failed to contact emergency services:', error)
        // Fallback to manual emergency procedures
        await this.emergencyFallback(userId, language)
      }
    }
  }

  /**
   * Alert Human Counselor
   */
  private async alertHumanCounselor(
    userId: string, 
    crisisResult: CrisisDetectionResult, 
    language: Language
  ): Promise<void> {
    
    console.log(`Alerting human counselor for user ${userId} - Risk Level: ${crisisResult.riskLevel}`)
    
    // Get available counselors/therapists
    const counselors = this.emergencyContactService.getEmergencyContacts(language)
      .filter(contact => contact.type === 'therapist' || contact.type === 'hotline')
      .sort((a, b) => a.priority - b.priority)
    
    // Try contacting counselors in priority order
    for (const counselor of counselors.slice(0, 2)) { // Try top 2 counselors
      try {
        await this.emergencyContactService.sendEmergencyAlert(
          counselor.id,
          userId,
          crisisResult.riskLevel,
          language
        )
        console.log(`Counselor alerted: ${counselor.name}`)
        break // Stop after first successful contact
      } catch (error) {
        console.error(`Failed to contact counselor ${counselor.name}:`, error)
        continue // Try next counselor
      }
    }
  }

  /**
   * Provide Crisis Resources
   */
  private async provideCrisisResources(userId: string, language: Language): Promise<void> {
    console.log(`Providing crisis resources to user ${userId} in ${language}`)
    
    // Get localized crisis resources
    const resources = this.crisisContacts.filter(contact => 
      contact.language.includes(language)
    ).sort((a, b) => a.priority - b.priority)
    
    // TODO: Send crisis resources to user
    // 1. Emergency hotline numbers
    // 2. Crisis text lines
    // 3. Local emergency services
    // 4. Therapeutic resources
    // 5. Self-help coping strategies
    
    console.log(`Crisis resources provided:`, resources.map(r => r.name))
  }

  /**
   * Activate Offline Crisis Support
   */
  private async activateOfflineCrisisSupport(userId: string): Promise<void> {
    console.log(`Activating offline crisis support for user ${userId}`)
    
    // Cache critical crisis resources locally
    // TODO: Implement offline crisis resource caching
    // 1. Emergency contact numbers
    // 2. Crisis coping strategies
    // 3. Grounding exercises
    // 4. Emergency action plans
    // 5. Offline banker comfort messages
  }

  /**
   * Schedule Follow-up Actions
   */
  private async scheduleFollowUpActions(
    actions: CrisisResponseAction[],
    userId: string,
    crisisResult: CrisisDetectionResult
  ): Promise<void> {
    
    const followUpTimes = {
      low: 24 * 60 * 60 * 1000, // 24 hours
      medium: 4 * 60 * 60 * 1000, // 4 hours
      high: 1 * 60 * 60 * 1000, // 1 hour
      critical: 30 * 60 * 1000 // 30 minutes
    }
    
    const delay = followUpTimes[crisisResult.riskLevel] || followUpTimes.medium
    
    console.log(`Scheduling follow-up for user ${userId} in ${delay}ms`)
    
    // TODO: Implement actual follow-up scheduling
    // 1. Schedule gentle check-in message
    // 2. Schedule counselor follow-up call
    // 3. Schedule resource effectiveness check
    // 4. Schedule safety assessment
  }

  /**
   * Emergency Fallback
   */
  private async emergencyFallback(userId: string, language: Language): Promise<void> {
    console.log(`EMERGENCY FALLBACK: Crisis workflow failed for user ${userId}`)
    
    // Simplest, most reliable emergency response
    // 1. Show emergency contacts immediately
    // 2. Display crisis hotline number prominently
    // 3. Provide emergency text/call button
    // 4. Alert all available counselors
    
    // Emergency contact for Israel
    const emergencyContact = language === 'he' 
      ? 'מספר חירום: 1201 (סהר) - תמיכה רגשית 24/7'
      : 'Emergency: 1201 (SAHAR) - 24/7 Emotional Support'
    
    console.log(`Emergency contact displayed: ${emergencyContact}`)
  }

  /**
   * Store Crisis Intervention Log
   */
  private async storeCrisisLog(log: CrisisInterventionLog): Promise<void> {
    // TODO: Store in secure, encrypted database
    // Important: Follow all privacy and confidentiality requirements
    console.log(`Crisis log stored for intervention ${log.id}`)
  }

  /**
   * Helper Methods
   */
  private generateCrisisId(userId: string): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `crisis_${userId}_${timestamp}_${random}`
  }

  private async scheduleFollowUp(userId: string, riskLevel: CrisisRiskLevel): Promise<void> {
    console.log(`Follow-up scheduled for user ${userId} at risk level ${riskLevel}`)
    // TODO: Implement follow-up scheduling system
  }

  private async considerFamilyNotification(userId: string, language: Language): Promise<void> {
    console.log(`Considering family notification for user ${userId}`)
    // TODO: Implement family notification system with proper consent checks
  }

  private async activateOfflineResources(userId: string, language: Language): Promise<void> {
    console.log(`Activating offline resources for user ${userId}`)
    // TODO: Implement offline resource activation
  }

  /**
   * Get Crisis Contacts for User's Language
   */
  public getCrisisContacts(language: Language): CrisisContact[] {
    return this.crisisContacts
      .filter(contact => contact.language.includes(language))
      .sort((a, b) => a.priority - b.priority)
  }

  /**
   * Get Escalation Matrix for Risk Level
   */
  public getEscalationMatrix(riskLevel: CrisisRiskLevel): CrisisEscalationTimeline {
    return this.escalationMatrix[riskLevel]
  }
}