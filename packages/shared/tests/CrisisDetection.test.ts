// Crisis Detection System Test Suite
// TogetherNet Therapeutic Platform
// Comprehensive Testing for Crisis Detection, Response, and Emergency Contact Systems

import { CrisisDetectionService, CrisisContext, CrisisRiskLevel } from '../services/CrisisDetectionService'
import { CrisisResponseWorkflow } from '../services/CrisisResponseWorkflow'
import { EmergencyContactService } from '../services/EmergencyContactService'

describe('Crisis Detection System', () => {
  let crisisDetectionService: CrisisDetectionService
  let crisisResponseWorkflow: CrisisResponseWorkflow
  let emergencyContactService: EmergencyContactService

  beforeEach(() => {
    crisisDetectionService = new CrisisDetectionService()
    crisisResponseWorkflow = new CrisisResponseWorkflow()
    emergencyContactService = new EmergencyContactService()
  })

  describe('Crisis Detection Algorithm', () => {
    
    test('should detect critical risk in English', async () => {
      const context: CrisisContext = {
        userId: 'test-user-001',
        depositContent: 'I want to kill myself tonight. I have a plan and I can\'t go on anymore.',
        language: 'en',
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 5,
          streak: 3,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('critical')
      expect(result.urgentIntervention).toBe(true)
      expect(result.emergencyServices).toBe(true)
      expect(result.detectedConcerns).toContain('suicidal_ideation')
      expect(result.confidenceScore).toBeGreaterThan(0.8)
    })

    test('should detect critical risk in Hebrew', async () => {
      const context: CrisisContext = {
        userId: 'test-user-002',
        depositContent: 'אני רוצה למות הלילה. יש לי תוכנית ואני לא יכול להמשיך יותר.',
        language: 'he',
        timeOfDay: 'night',
        userHistory: {
          previousCrises: 1,
          lastCrisisDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          totalDeposits: 10,
          streak: 0,
          hasUsedCrisisSupport: true
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('critical')
      expect(result.urgentIntervention).toBe(true)
      expect(result.detectedConcerns).toContain('suicidal_ideation')
      expect(result.detectedKeywords.length).toBeGreaterThan(0)
    })

    test('should detect high risk for self-harm', async () => {
      const context: CrisisContext = {
        userId: 'test-user-003',
        depositContent: 'I keep thinking about cutting myself. I hate myself so much and feel like a burden to everyone.',
        language: 'en',
        timeOfDay: 'afternoon',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 15,
          streak: 7,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'tablet',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('high')
      expect(result.supportContactNeeded).toBe(true)
      expect(result.detectedConcerns).toContain('self_harm')
      expect(result.escalationRequired).toBe(true)
    })

    test('should detect medium risk for depression', async () => {
      const context: CrisisContext = {
        userId: 'test-user-004',
        depositContent: 'I feel so hopeless and overwhelmed. Nothing seems to matter anymore and I\'m losing control.',
        language: 'en',
        timeOfDay: 'morning',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 8,
          streak: 4,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'desktop',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('medium')
      expect(result.supportContactNeeded).toBe(true)
      expect(result.detectedConcerns).toContain('severe_depression')
      expect(result.urgentIntervention).toBe(false)
    })

    test('should detect low risk for mild distress', async () => {
      const context: CrisisContext = {
        userId: 'test-user-005',
        depositContent: 'I\'m feeling sad and worried about work. It\'s been a difficult week.',
        language: 'en',
        timeOfDay: 'afternoon',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 20,
          streak: 12,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('low')
      expect(result.urgentIntervention).toBe(false)
      expect(result.emergencyServices).toBe(false)
      expect(result.supportContactNeeded).toBe(false)
    })

    test('should detect no risk for positive content', async () => {
      const context: CrisisContext = {
        userId: 'test-user-006',
        depositContent: 'I\'m grateful for my friends today. They helped me feel better when I was stressed.',
        language: 'en',
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 30,
          streak: 21,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      expect(result.riskLevel).toBe('none')
      expect(result.urgentIntervention).toBe(false)
      expect(result.detectedConcerns).toHaveLength(0)
      expect(result.detectedKeywords).toHaveLength(0)
    })

    test('should escalate risk for users with crisis history', async () => {
      const context: CrisisContext = {
        userId: 'test-user-007',
        depositContent: 'I\'m feeling down and struggling again.',
        language: 'en',
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 3,
          lastCrisisDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
          totalDeposits: 50,
          streak: 1,
          hasUsedCrisisSupport: true
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)

      // Should escalate from low to medium due to crisis history
      expect(result.riskLevel).toBe('medium')
      expect(result.supportContactNeeded).toBe(true)
    })
  })

  describe('Crisis Response Workflow', () => {
    
    test('should execute critical crisis response workflow', async () => {
      const mockResult = {
        riskLevel: 'critical' as CrisisRiskLevel,
        detectedKeywords: ['suicide', 'kill myself'],
        confidenceScore: 0.95,
        urgentIntervention: true,
        supportContactNeeded: true,
        emergencyServices: true,
        detectedConcerns: ['suicidal_ideation' as const],
        recommendedResponse: 'emergency_intervention',
        escalationRequired: true
      }

      const interventionLog = await crisisResponseWorkflow.executeCrisisResponse(
        'test-user-critical',
        mockResult,
        'en',
        { deviceType: 'mobile', connectivity: 'online' }
      )

      expect(interventionLog.riskLevel).toBe('critical')
      expect(interventionLog.actionsInferred).toContain('immediate_banker_support')
      expect(interventionLog.actionsInferred).toContain('mobile_crisis_mode')
      expect(interventionLog.actionsInferred).toContain('emergency_services_contact')
      expect(interventionLog.responseTime).toBeGreaterThan(0)
      expect(interventionLog.followUpScheduled).toBeDefined()
    })

    test('should execute high risk response workflow', async () => {
      const mockResult = {
        riskLevel: 'high' as CrisisRiskLevel,
        detectedKeywords: ['self harm', 'cut myself'],
        confidenceScore: 0.85,
        urgentIntervention: true,
        supportContactNeeded: true,
        emergencyServices: false,
        detectedConcerns: ['self_harm' as const],
        recommendedResponse: 'immediate_support',
        escalationRequired: true
      }

      const interventionLog = await crisisResponseWorkflow.executeCrisisResponse(
        'test-user-high',
        mockResult,
        'he',
        { deviceType: 'mobile', connectivity: 'poor', batteryLevel: 15 }
      )

      expect(interventionLog.riskLevel).toBe('high')
      expect(interventionLog.actionsInferred).toContain('immediate_banker_support')
      expect(interventionLog.actionsInferred).toContain('crisis_resources_provided')
      expect(interventionLog.actionsInferred).toContain('human_counselor_alert')
    })

    test('should get escalation matrix for risk levels', () => {
      const criticalMatrix = crisisResponseWorkflow.getEscalationMatrix('critical')
      expect(criticalMatrix.immediate).toContain('emergency_services_contact')
      expect(criticalMatrix.urgent).toContain('human_counselor_alert')

      const mediumMatrix = crisisResponseWorkflow.getEscalationMatrix('medium')
      expect(mediumMatrix.immediate).toContain('immediate_banker_support')
      expect(mediumMatrix.urgent).toContain('crisis_resources_provided')
    })
  })

  describe('Emergency Contact Service', () => {
    
    test('should get emergency contacts for Hebrew language', () => {
      const contacts = emergencyContactService.getEmergencyContacts('he')
      
      expect(contacts.length).toBeGreaterThan(0)
      expect(contacts.every(contact => contact.language.includes('he'))).toBe(true)
      expect(contacts[0].priority).toBe(1) // Should be sorted by priority
    })

    test('should get emergency contacts for English language', () => {
      const contacts = emergencyContactService.getEmergencyContacts('en')
      
      expect(contacts.length).toBeGreaterThan(0)
      expect(contacts.every(contact => contact.language.includes('en'))).toBe(true)
    })

    test('should send emergency alert for critical risk', async () => {
      const commLog = await emergencyContactService.sendEmergencyAlert(
        'sahar_hotline',
        'test-user-emergency',
        'critical',
        'en',
        {
          deviceType: 'mobile',
          location: { lat: 32.0853, lon: 34.7818 }, // Tel Aviv
          batteryLevel: 45,
          connectivity: 'online'
        }
      )

      expect(commLog.userId).toBe('test-user-emergency')
      expect(commLog.contactId).toBe('sahar_hotline')
      expect(commLog.deliveryStatus).toBe('delivered')
      expect(commLog.channel).toBeDefined()
    })

    test('should test emergency system functionality', async () => {
      const testResult = await emergencyContactService.testEmergencySystem('en')
      expect(testResult).toBe(true)

      const testResultHebrew = await emergencyContactService.testEmergencySystem('he')
      expect(testResultHebrew).toBe(true)
    })
  })

  describe('Mobile-Specific Crisis Support', () => {
    
    test('should handle mobile crisis mode with low battery', async () => {
      const context: CrisisContext = {
        userId: 'test-mobile-user',
        depositContent: 'I need help immediately',
        language: 'en',
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 5,
          streak: 2,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'poor',
          batteryLevel: 8
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)
      const alertLog = await crisisDetectionService.triggerMobileCrisisAlert(context, result)

      expect(alertLog).toBeDefined()
      expect(alertLog.userId).toBe('test-mobile-user')
    })

    test('should handle offline crisis support', async () => {
      const context: CrisisContext = {
        userId: 'test-offline-user',
        depositContent: 'I\'m in crisis and have no internet',
        language: 'he',
        timeOfDay: 'night',
        userHistory: {
          previousCrises: 1,
          totalDeposits: 12,
          streak: 0,
          hasUsedCrisisSupport: true
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'offline'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)
      
      // Should still detect crisis even offline
      expect(result.riskLevel).toBeOneOf(['medium', 'high', 'critical'])
      expect(result.supportContactNeeded).toBe(true)
    })
  })

  describe('Crisis Support Resources', () => {
    
    test('should get crisis support resources for Israel', () => {
      const resources = crisisDetectionService.getSupportResources('he', 'IL')
      
      expect(resources.length).toBeGreaterThan(0)
      expect(resources.some(resource => resource.phone === '1201')).toBe(true) // SAHAR
      expect(resources.some(resource => resource.phone === '101')).toBe(true) // Emergency
    })

    test('should get immediate crisis response', () => {
      const response = crisisDetectionService.getImmediateCrisisResponse('critical', 'en')
      
      expect(response).toBeDefined()
      expect(response?.content.en).toContain('crisis')
      expect(response?.therapeutic.crisisEscalation).toBe(true)
    })

    test('should schedule crisis follow-up', async () => {
      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
      
      await crisisDetectionService.scheduleCrisisFollowUp('test-user', 'high')
      
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.stringContaining('Crisis follow-up scheduled')
      )
      
      consoleLogSpy.mockRestore()
    })
  })

  describe('Edge Cases and Error Handling', () => {
    
    test('should handle empty deposit content', async () => {
      const context: CrisisContext = {
        userId: 'test-empty',
        depositContent: '',
        language: 'en',
        timeOfDay: 'morning',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 1,
          streak: 1,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)
      expect(result.riskLevel).toBe('none')
      expect(result.detectedKeywords).toHaveLength(0)
    })

    test('should handle unknown language', async () => {
      const context: CrisisContext = {
        userId: 'test-unknown-lang',
        depositContent: 'Some crisis content',
        language: 'fr' as any, // Unsupported language
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 5,
          streak: 3,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const result = await crisisDetectionService.detectCrisis(context)
      // Should default to safe handling
      expect(result).toBeDefined()
      expect(result.riskLevel).toBeDefined()
    })

    test('should handle emergency contact service failures', async () => {
      try {
        await emergencyContactService.sendEmergencyAlert(
          'non-existent-contact',
          'test-user',
          'critical',
          'en'
        )
      } catch (error) {
        expect(error).toBeDefined()
        expect(error.message).toContain('Emergency contact not found')
      }
    })
  })

  describe('Performance and Reliability', () => {
    
    test('should detect crisis within reasonable time', async () => {
      const context: CrisisContext = {
        userId: 'test-performance',
        depositContent: 'I want to end my life right now',
        language: 'en',
        timeOfDay: 'evening',
        userHistory: {
          previousCrises: 0,
          totalDeposits: 10,
          streak: 5,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile',
          connectivity: 'online'
        }
      }

      const startTime = Date.now()
      const result = await crisisDetectionService.detectCrisis(context)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeLessThan(1000) // Should complete within 1 second
      expect(result.riskLevel).toBe('critical')
    })

    test('should handle multiple concurrent crisis detections', async () => {
      const contexts = Array.from({ length: 5 }, (_, i) => ({
        userId: `test-concurrent-${i}`,
        depositContent: 'I need help urgently',
        language: 'en' as const,
        timeOfDay: 'evening' as const,
        userHistory: {
          previousCrises: 0,
          totalDeposits: 5,
          streak: 2,
          hasUsedCrisisSupport: false
        },
        mobileContext: {
          deviceType: 'mobile' as const,
          connectivity: 'online' as const
        }
      }))

      const promises = contexts.map(context => 
        crisisDetectionService.detectCrisis(context)
      )

      const results = await Promise.all(promises)
      
      expect(results).toHaveLength(5)
      results.forEach(result => {
        expect(result).toBeDefined()
        expect(result.riskLevel).toBeDefined()
      })
    })
  })
})

// Custom Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeOneOf(expected: any[]): R
    }
  }
}

expect.extend({
  toBeOneOf(received, expected) {
    const pass = expected.includes(received)
    if (pass) {
      return {
        message: () => `expected ${received} not to be one of ${expected.join(', ')}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${received} to be one of ${expected.join(', ')}`,
        pass: false,
      }
    }
  },
})

// Mock implementations for testing
jest.mock('../services/CrisisDetectionService', () => {
  const actual = jest.requireActual('../services/CrisisDetectionService')
  return {
    ...actual,
    CrisisDetectionService: jest.fn().mockImplementation(() => ({
      ...actual.CrisisDetectionService.prototype,
      // Override methods for testing as needed
    }))
  }
})

export {}