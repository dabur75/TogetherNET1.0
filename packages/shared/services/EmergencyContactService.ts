// Emergency Contact Service - Crisis Communication System
// TogetherNet Therapeutic Platform
// Mobile-Optimized Emergency Contact Management and Communication

import { Language } from '../types/Exercise'
import { CrisisRiskLevel } from './CrisisDetectionService'
import { CrisisContact } from './CrisisResponseWorkflow'

/**
 * Emergency Communication Channel
 */
export type EmergencyChannel = 'voice' | 'sms' | 'whatsapp' | 'telegram' | 'signal' | 'app_notification'

/**
 * Emergency Contact Availability
 */
export interface ContactAvailability {
  isAvailable: boolean
  expectedResponseTime: number // minutes
  lastOnline?: Date
  currentLoad: 'low' | 'medium' | 'high' // current crisis case load
  channels: EmergencyChannel[]
  timezone: string
}

/**
 * Emergency Message Template
 */
export interface EmergencyMessageTemplate {
  id: string
  riskLevel: CrisisRiskLevel
  language: Language
  channel: EmergencyChannel
  subject?: string
  content: string
  urgencyLevel: 'routine' | 'urgent' | 'critical'
  includeUserLocation: boolean
  includeDeviceInfo: boolean
  requiresResponse: boolean
  maxResponseTime: number // minutes
}

/**
 * Emergency Communication Log
 */
export interface EmergencyCommLog {
  id: string
  userId: string
  contactId: string
  channel: EmergencyChannel
  timestamp: Date
  messageTemplate: string
  deliveryStatus: 'sent' | 'delivered' | 'read' | 'responded' | 'failed'
  responseTime?: number // minutes
  escalated: boolean
  notes: string
}

/**
 * Emergency Contact Service
 */
export class EmergencyContactService {
  
  // Pre-configured emergency contacts for Israel
  private emergencyContacts: Map<string, CrisisContact> = new Map([
    ['sahar_hotline', {
      id: 'sahar_hotline',
      type: 'hotline',
      name: 'SAHAR Emotional Support',
      phone: '1201',
      available24h: true,
      language: ['he', 'en'],
      priority: 1,
      responseTime: 2,
      specialties: ['suicide_prevention', 'emotional_support', 'crisis_counseling']
    }],
    ['emergency_services_il', {
      id: 'emergency_services_il',
      type: 'emergency',
      name: 'Emergency Services Israel',
      phone: '101',
      available24h: true,
      language: ['he', 'en'],
      priority: 1,
      responseTime: 5,
      specialties: ['emergency_response', 'psychiatric_emergency']
    }],
    ['natal_trauma', {
      id: 'natal_trauma',
      type: 'therapist',
      name: 'NATAL Trauma Center',
      phone: '1800-363-363',
      available24h: false,
      language: ['he', 'en'],
      priority: 2,
      responseTime: 30,
      specialties: ['trauma', 'ptsd', 'anxiety']
    }],
    ['eran_crisis', {
      id: 'eran_crisis',
      type: 'hotline',
      name: 'ERAN Crisis Hotline',
      phone: '1201',
      available24h: true,
      language: ['he'],
      priority: 2,
      responseTime: 3,
      specialties: ['suicide_prevention', 'crisis_intervention']
    }],
    ['dvir_emergency', {
      id: 'dvir_emergency',
      type: 'therapist',
      name: 'Dvir Hillel Cohen Eraki (Founder)',
      phone: '+972-XX-XXX-XXXX', // TODO: Replace with actual number
      available24h: false,
      language: ['he', 'en'],
      priority: 3,
      responseTime: 15,
      specialties: ['expansion_therapy', 'heartbank_methodology']
    }]
  ])

  // Emergency message templates
  private messageTemplates: EmergencyMessageTemplate[] = [
    // Critical Risk Templates
    {
      id: 'critical_alert_he',
      riskLevel: 'critical',
      language: 'he',
      channel: 'sms',
      subject: 'התראת חירום - TogetherNet',
      content: 'התראת חירום: משתמש מנטפלט בסיכון גבוה זקוק לטיפול מיידי. מספר המקרה: {caseId}. נא לפנות מיידית.',
      urgencyLevel: 'critical',
      includeUserLocation: true,
      includeDeviceInfo: true,
      requiresResponse: true,
      maxResponseTime: 10
    },
    {
      id: 'critical_alert_en',
      riskLevel: 'critical',
      language: 'en',
      channel: 'sms',
      subject: 'CRITICAL ALERT - TogetherNet',
      content: 'CRITICAL ALERT: User in high-risk crisis requires immediate intervention. Case ID: {caseId}. Please respond immediately.',
      urgencyLevel: 'critical',
      includeUserLocation: true,
      includeDeviceInfo: true,
      requiresResponse: true,
      maxResponseTime: 10
    },
    
    // High Risk Templates
    {
      id: 'high_risk_he',
      riskLevel: 'high',
      language: 'he',
      channel: 'app_notification',
      subject: 'התראת סיכון גבוה',
      content: 'משתמש TogetherNet זקוק לתמיכה מיידית. רמת סיכון: גבוה. אנא הגב תוך 30 דקות.',
      urgencyLevel: 'urgent',
      includeUserLocation: false,
      includeDeviceInfo: true,
      requiresResponse: true,
      maxResponseTime: 30
    },
    {
      id: 'high_risk_en',
      riskLevel: 'high',
      language: 'en',
      channel: 'app_notification',
      subject: 'High Risk Alert',
      content: 'TogetherNet user requires immediate support. Risk Level: HIGH. Please respond within 30 minutes.',
      urgencyLevel: 'urgent',
      includeUserLocation: false,
      includeDeviceInfo: true,
      requiresResponse: true,
      maxResponseTime: 30
    },
    
    // Medium Risk Templates
    {
      id: 'medium_risk_he',
      riskLevel: 'medium',
      language: 'he',
      channel: 'app_notification',
      content: 'משתמש זקוק לתמיכה רגשית. רמת סיכון: בינונית. נא להגיב תוך שעתיים.',
      urgencyLevel: 'urgent',
      includeUserLocation: false,
      includeDeviceInfo: false,
      requiresResponse: true,
      maxResponseTime: 120
    },
    {
      id: 'medium_risk_en',
      riskLevel: 'medium',
      language: 'en',
      channel: 'app_notification',
      content: 'User requires emotional support. Risk Level: MEDIUM. Please respond within 2 hours.',
      urgencyLevel: 'urgent',
      includeUserLocation: false,
      includeDeviceInfo: false,
      requiresResponse: true,
      maxResponseTime: 120
    }
  ]

  /**
   * Send Emergency Alert to Contact
   */
  public async sendEmergencyAlert(
    contactId: string,
    userId: string,
    riskLevel: CrisisRiskLevel,
    language: Language,
    mobileContext?: {
      deviceType: string
      location?: { lat: number, lon: number }
      batteryLevel?: number
      connectivity: string
    }
  ): Promise<EmergencyCommLog> {
    
    const contact = this.emergencyContacts.get(contactId)
    if (!contact) {
      throw new Error(`Emergency contact not found: ${contactId}`)
    }

    // Check contact availability
    const availability = await this.checkContactAvailability(contactId)
    
    // Select appropriate message template
    const template = this.selectMessageTemplate(riskLevel, language, availability)
    
    // Determine best communication channel
    const channel = this.selectBestChannel(contact, availability, riskLevel)
    
    // Create communication log entry
    const commLog: EmergencyCommLog = {
      id: this.generateCommId(userId, contactId),
      userId,
      contactId,
      channel,
      timestamp: new Date(),
      messageTemplate: template.id,
      deliveryStatus: 'sent',
      escalated: false,
      notes: `Emergency alert sent for ${riskLevel} risk level`
    }

    try {
      // Send message through selected channel
      const deliveryResult = await this.sendMessage(contact, template, channel, {
        userId,
        caseId: commLog.id,
        deviceInfo: mobileContext ? this.formatDeviceInfo(mobileContext) : undefined,
        location: mobileContext?.location ? this.formatLocation(mobileContext.location) : undefined
      })

      commLog.deliveryStatus = deliveryResult.success ? 'delivered' : 'failed'
      
      if (template.requiresResponse) {
        // Set up response monitoring
        this.monitorResponse(commLog, template.maxResponseTime)
      }

      // Log emergency communication
      await this.logEmergencyComm(commLog)
      
      console.log(`Emergency alert sent to ${contact.name} via ${channel}`)
      
      return commLog
      
    } catch (error) {
      console.error(`Failed to send emergency alert to ${contactId}:`, error)
      
      commLog.deliveryStatus = 'failed'
      commLog.notes = `Delivery failed: ${error}`
      
      // Try backup contact if primary fails
      await this.tryBackupContact(userId, riskLevel, language, mobileContext)
      
      return commLog
    }
  }

  /**
   * Check Contact Availability
   */
  private async checkContactAvailability(contactId: string): Promise<ContactAvailability> {
    const contact = this.emergencyContacts.get(contactId)
    if (!contact) {
      throw new Error(`Contact not found: ${contactId}`)
    }

    // Mock availability check - in real implementation would check:
    // 1. Contact's online status
    // 2. Current case load
    // 3. Response time patterns
    // 4. Preferred communication channels
    
    const now = new Date()
    const hour = now.getHours()
    
    // Check if contact is available based on 24/7 status and current time
    const isWithinBusinessHours = hour >= 8 && hour <= 20
    const isAvailable = contact.available24h || isWithinBusinessHours
    
    return {
      isAvailable,
      expectedResponseTime: contact.responseTime || 30,
      currentLoad: 'medium', // Mock load
      channels: ['voice', 'sms', 'app_notification'],
      timezone: 'Asia/Jerusalem'
    }
  }

  /**
   * Select Best Message Template
   */
  private selectMessageTemplate(
    riskLevel: CrisisRiskLevel,
    language: Language,
    availability: ContactAvailability
  ): EmergencyMessageTemplate {
    
    // Find templates matching risk level and language
    const candidates = this.messageTemplates.filter(template => 
      template.riskLevel === riskLevel && template.language === language
    )
    
    if (candidates.length === 0) {
      // Fallback to English if Hebrew template not available
      return this.messageTemplates.find(template => 
        template.riskLevel === riskLevel && template.language === 'en'
      ) || this.messageTemplates[0]
    }
    
    // Select based on availability and preferred channel
    const preferredTemplate = candidates.find(template => 
      availability.channels.includes(template.channel)
    )
    
    return preferredTemplate || candidates[0]
  }

  /**
   * Select Best Communication Channel
   */
  private selectBestChannel(
    contact: CrisisContact,
    availability: ContactAvailability,
    riskLevel: CrisisRiskLevel
  ): EmergencyChannel {
    
    // For critical risk, prefer immediate channels
    if (riskLevel === 'critical') {
      if (availability.channels.includes('voice')) return 'voice'
      if (availability.channels.includes('sms')) return 'sms'
    }
    
    // For high risk, prefer fast response channels
    if (riskLevel === 'high') {
      if (availability.channels.includes('app_notification')) return 'app_notification'
      if (availability.channels.includes('sms')) return 'sms'
    }
    
    // Default to most available channel
    return availability.channels[0] || 'sms'
  }

  /**
   * Send Message Through Channel
   */
  private async sendMessage(
    contact: CrisisContact,
    template: EmergencyMessageTemplate,
    channel: EmergencyChannel,
    variables: {
      userId: string
      caseId: string
      deviceInfo?: string
      location?: string
    }
  ): Promise<{ success: boolean, messageId?: string }> {
    
    // Format message with variables
    let message = template.content
    message = message.replace('{caseId}', variables.caseId)
    message = message.replace('{userId}', variables.userId)
    
    if (template.includeDeviceInfo && variables.deviceInfo) {
      message += `\n\nDevice: ${variables.deviceInfo}`
    }
    
    if (template.includeUserLocation && variables.location) {
      message += `\n\nLocation: ${variables.location}`
    }

    console.log(`Sending ${channel} message to ${contact.name}:`, message)
    
    // Mock message sending - in real implementation would use:
    // - Twilio for SMS
    // - WhatsApp Business API
    // - Push notification service
    // - Email service
    // - Voice calling service
    
    switch (channel) {
      case 'voice':
        return this.makeEmergencyCall(contact.phone, message)
      case 'sms':
        return this.sendSMS(contact.phone, message)
      case 'whatsapp':
        return this.sendWhatsApp(contact.phone, message)
      case 'app_notification':
        return this.sendAppNotification(contact.id, message)
      default:
        console.log(`Channel ${channel} not implemented`)
        return { success: false }
    }
  }

  /**
   * Communication Channel Implementations
   */
  private async makeEmergencyCall(phone: string, message: string): Promise<{ success: boolean, messageId?: string }> {
    console.log(`VOICE CALL to ${phone}: ${message}`)
    // TODO: Implement Twilio Voice API
    // TODO: Add text-to-speech for automated crisis calls
    return { success: true, messageId: 'voice_' + Date.now() }
  }

  private async sendSMS(phone: string, message: string): Promise<{ success: boolean, messageId?: string }> {
    console.log(`SMS to ${phone}: ${message}`)
    // TODO: Implement Twilio SMS API
    return { success: true, messageId: 'sms_' + Date.now() }
  }

  private async sendWhatsApp(phone: string, message: string): Promise<{ success: boolean, messageId?: string }> {
    console.log(`WhatsApp to ${phone}: ${message}`)
    // TODO: Implement WhatsApp Business API
    return { success: true, messageId: 'whatsapp_' + Date.now() }
  }

  private async sendAppNotification(contactId: string, message: string): Promise<{ success: boolean, messageId?: string }> {
    console.log(`App notification to ${contactId}: ${message}`)
    // TODO: Implement push notification service
    return { success: true, messageId: 'app_' + Date.now() }
  }

  /**
   * Response Monitoring
   */
  private monitorResponse(commLog: EmergencyCommLog, maxResponseTimeMinutes: number): void {
    console.log(`Monitoring response for ${commLog.id} - max time: ${maxResponseTimeMinutes} minutes`)
    
    // Set up timeout to escalate if no response
    setTimeout(() => {
      this.checkResponseStatus(commLog.id)
    }, maxResponseTimeMinutes * 60 * 1000)
  }

  private async checkResponseStatus(commLogId: string): Promise<void> {
    // TODO: Check if response was received
    // If not, escalate to next contact in priority order
    console.log(`Checking response status for ${commLogId}`)
  }

  /**
   * Backup and Escalation
   */
  private async tryBackupContact(
    userId: string,
    riskLevel: CrisisRiskLevel,
    language: Language,
    mobileContext?: any
  ): Promise<void> {
    
    console.log(`Trying backup contact for user ${userId}`)
    
    // Get next available contact
    const backupContacts = Array.from(this.emergencyContacts.values())
      .filter(contact => contact.language.includes(language))
      .sort((a, b) => a.priority - b.priority)
    
    if (backupContacts.length > 1) {
      const backupContact = backupContacts[1] // Second priority contact
      await this.sendEmergencyAlert(backupContact.id, userId, riskLevel, language, mobileContext)
    }
  }

  /**
   * Helper Methods
   */
  private formatDeviceInfo(mobileContext: any): string {
    return `${mobileContext.deviceType} | Battery: ${mobileContext.batteryLevel}% | Connection: ${mobileContext.connectivity}`
  }

  private formatLocation(location: { lat: number, lon: number }): string {
    return `${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}`
  }

  private generateCommId(userId: string, contactId: string): string {
    return `comm_${userId}_${contactId}_${Date.now()}`
  }

  private async logEmergencyComm(log: EmergencyCommLog): Promise<void> {
    // TODO: Store in secure database with encryption
    console.log(`Emergency communication logged: ${log.id}`)
  }

  /**
   * Public API Methods
   */
  
  /**
   * Get Available Emergency Contacts for Language
   */
  public getEmergencyContacts(language: Language): CrisisContact[] {
    return Array.from(this.emergencyContacts.values())
      .filter(contact => contact.language.includes(language))
      .sort((a, b) => a.priority - b.priority)
  }

  /**
   * Add Custom Emergency Contact
   */
  public addEmergencyContact(contact: CrisisContact): void {
    this.emergencyContacts.set(contact.id, contact)
  }

  /**
   * Test Emergency Communication System
   */
  public async testEmergencySystem(language: Language = 'en'): Promise<boolean> {
    console.log('Testing emergency communication system...')
    
    try {
      // Test contact availability
      const contacts = this.getEmergencyContacts(language)
      for (const contact of contacts) {
        const availability = await this.checkContactAvailability(contact.id)
        console.log(`${contact.name}: Available=${availability.isAvailable}, Response=${availability.expectedResponseTime}min`)
      }
      
      // Test message template selection
      const template = this.selectMessageTemplate('medium', language, { 
        isAvailable: true, 
        expectedResponseTime: 30, 
        currentLoad: 'low',
        channels: ['sms', 'app_notification'],
        timezone: 'Asia/Jerusalem'
      })
      console.log(`Selected template: ${template.id}`)
      
      console.log('Emergency system test completed successfully')
      return true
      
    } catch (error) {
      console.error('Emergency system test failed:', error)
      return false
    }
  }
}