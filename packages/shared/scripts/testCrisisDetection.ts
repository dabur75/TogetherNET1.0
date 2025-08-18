// Crisis Detection Test Runner
// TogetherNet Therapeutic Platform
// Manual Test Script for Crisis Detection System

import { CrisisDetectionService, CrisisContext } from '../services/CrisisDetectionService'
import { CrisisResponseWorkflow } from '../services/CrisisResponseWorkflow'
import { EmergencyContactService } from '../services/EmergencyContactService'

/**
 * Test Scenarios for Crisis Detection
 */
const testScenarios = [
  {
    id: 'critical_english',
    description: 'Critical Risk - Suicidal Ideation (English)',
    context: {
      userId: 'test-001',
      depositContent: 'I want to kill myself tonight. I have a plan and can\'t go on anymore.',
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
    },
    expectedRisk: 'critical'
  },
  {
    id: 'critical_hebrew',
    description: 'Critical Risk - Suicidal Ideation (Hebrew)',
    context: {
      userId: 'test-002',
      depositContent: 'אני רוצה להרוג את עצמי הלילה. יש לי תוכנית ואני לא יכול להמשיך.',
      language: 'he' as const,
      timeOfDay: 'night' as const,
      userHistory: {
        previousCrises: 1,
        lastCrisisDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        totalDeposits: 15,
        streak: 0,
        hasUsedCrisisSupport: true
      },
      mobileContext: {
        deviceType: 'mobile' as const,
        connectivity: 'poor' as const,
        batteryLevel: 12
      }
    },
    expectedRisk: 'critical'
  },
  {
    id: 'high_selfharm',
    description: 'High Risk - Self Harm',
    context: {
      userId: 'test-003',
      depositContent: 'I keep thinking about cutting myself. I hate myself and feel worthless.',
      language: 'en' as const,
      timeOfDay: 'afternoon' as const,
      userHistory: {
        previousCrises: 0,
        totalDeposits: 8,
        streak: 4,
        hasUsedCrisisSupport: false
      },
      mobileContext: {
        deviceType: 'tablet' as const,
        connectivity: 'online' as const
      }
    },
    expectedRisk: 'high'
  },
  {
    id: 'medium_depression',
    description: 'Medium Risk - Severe Depression',
    context: {
      userId: 'test-004',
      depositContent: 'אני מרגיש חסר תקווה ומוצף. כלום לא חשוב יותר ואני מאבד שליטה.',
      language: 'he' as const,
      timeOfDay: 'morning' as const,
      userHistory: {
        previousCrises: 0,
        totalDeposits: 12,
        streak: 6,
        hasUsedCrisisSupport: false
      },
      mobileContext: {
        deviceType: 'desktop' as const,
        connectivity: 'online' as const
      }
    },
    expectedRisk: 'medium'
  },
  {
    id: 'low_anxiety',
    description: 'Low Risk - Anxiety and Stress',
    context: {
      userId: 'test-005',
      depositContent: 'I\'m feeling really anxious about work and struggling with panic attacks.',
      language: 'en' as const,
      timeOfDay: 'afternoon' as const,
      userHistory: {
        previousCrises: 0,
        totalDeposits: 20,
        streak: 10,
        hasUsedCrisisSupport: false
      },
      mobileContext: {
        deviceType: 'mobile' as const,
        connectivity: 'online' as const
      }
    },
    expectedRisk: 'low'
  },
  {
    id: 'none_positive',
    description: 'No Risk - Positive Content',
    context: {
      userId: 'test-006',
      depositContent: 'Today I\'m grateful for my support system. My friends really helped me through a difficult time.',
      language: 'en' as const,
      timeOfDay: 'evening' as const,
      userHistory: {
        previousCrises: 0,
        totalDeposits: 30,
        streak: 21,
        hasUsedCrisisSupport: false
      },
      mobileContext: {
        deviceType: 'mobile' as const,
        connectivity: 'online' as const
      }
    },
    expectedRisk: 'none'
  },
  {
    id: 'escalated_history',
    description: 'Risk Escalation - Previous Crisis History',
    context: {
      userId: 'test-007',
      depositContent: 'I\'m feeling down and struggling again. Nothing seems to help.',
      language: 'en' as const,
      timeOfDay: 'evening' as const,
      userHistory: {
        previousCrises: 3,
        lastCrisisDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        totalDeposits: 45,
        streak: 1,
        hasUsedCrisisSupport: true
      },
      mobileContext: {
        deviceType: 'mobile' as const,
        connectivity: 'online' as const
      }
    },
    expectedRisk: 'medium' // Escalated from low due to history
  }
]

/**
 * Run Crisis Detection Tests
 */
async function runCrisisDetectionTests() {
  console.log('🆘 Crisis Detection System Test Suite')
  console.log('=====================================\n')

  const crisisService = new CrisisDetectionService()
  const responseWorkflow = new CrisisResponseWorkflow()
  const emergencyService = new EmergencyContactService()

  let passed = 0
  let failed = 0

  for (const scenario of testScenarios) {
    console.log(`📋 Test: ${scenario.description}`)
    console.log(`   ID: ${scenario.id}`)
    console.log(`   Expected Risk: ${scenario.expectedRisk}`)

    try {
      // Test crisis detection
      const startTime = Date.now()
      const result = await crisisService.detectCrisis(scenario.context)
      const detectionTime = Date.now() - startTime

      console.log(`   ✅ Detection completed in ${detectionTime}ms`)
      console.log(`   🎯 Detected Risk: ${result.riskLevel}`)
      console.log(`   🔍 Keywords Found: ${result.detectedKeywords.length}`)
      console.log(`   📊 Confidence: ${(result.confidenceScore * 100).toFixed(1)}%`)
      console.log(`   ⚠️  Urgent Intervention: ${result.urgentIntervention}`)
      console.log(`   🚨 Emergency Services: ${result.emergencyServices}`)
      console.log(`   🤝 Support Contact: ${result.supportContactNeeded}`)
      
      if (result.detectedConcerns.length > 0) {
        console.log(`   🎭 Concerns: ${result.detectedConcerns.join(', ')}`)
      }

      // Verify expected risk level
      const riskMatches = result.riskLevel === scenario.expectedRisk
      if (riskMatches) {
        console.log(`   ✅ Risk level matches expected`)
        passed++
      } else {
        console.log(`   ❌ Risk level mismatch (expected: ${scenario.expectedRisk}, got: ${result.riskLevel})`)
        failed++
      }

      // Test crisis response workflow if risk detected
      if (result.riskLevel !== 'none') {
        console.log(`   🔄 Testing crisis response workflow...`)
        
        const interventionLog = await responseWorkflow.executeCrisisResponse(
          scenario.context.userId,
          result,
          scenario.context.language,
          scenario.context.mobileContext
        )

        console.log(`   📝 Intervention Log: ${interventionLog.id}`)
        console.log(`   ⏱️  Response Time: ${interventionLog.responseTime.toFixed(2)}s`)
        console.log(`   🎬 Actions: ${interventionLog.actionsInferred.length}`)
        
        if (interventionLog.followUpScheduled) {
          console.log(`   📅 Follow-up Scheduled: ${interventionLog.followUpScheduled.toLocaleString()}`)
        }
      }

      // Test emergency contacts if critical/high risk
      if (result.riskLevel === 'critical' || result.riskLevel === 'high') {
        console.log(`   📞 Testing emergency contact system...`)
        
        const contacts = emergencyService.getEmergencyContacts(scenario.context.language)
        console.log(`   📋 Available Contacts: ${contacts.length}`)
        
        if (contacts.length > 0) {
          const primaryContact = contacts[0]
          console.log(`   🥇 Primary Contact: ${primaryContact.name} (${primaryContact.phone})`)
          
          // Simulate emergency alert (don't actually send in test)
          console.log(`   📤 Would send alert to: ${primaryContact.id}`)
        }
      }

    } catch (error) {
      console.log(`   ❌ Test failed with error: ${error}`)
      failed++
    }

    console.log('   ' + '─'.repeat(60) + '\n')
  }

  // Test system functionality
  console.log('🔧 System Functionality Tests')
  console.log('=============================\n')

  try {
    // Test emergency system
    const emergencyTestEn = await emergencyService.testEmergencySystem('en')
    const emergencyTestHe = await emergencyService.testEmergencySystem('he')
    
    console.log(`📞 Emergency System (English): ${emergencyTestEn ? '✅ PASS' : '❌ FAIL'}`)
    console.log(`📞 Emergency System (Hebrew): ${emergencyTestHe ? '✅ PASS' : '❌ FAIL'}`)

    // Test crisis resources
    const resourcesIL = crisisService.getSupportResources('he', 'IL')
    console.log(`🏥 Crisis Resources (Israel): ${resourcesIL.length} available`)

    // Test immediate crisis response
    const criticalResponse = crisisService.getImmediateCrisisResponse('critical', 'en')
    const highResponse = crisisService.getImmediateCrisisResponse('high', 'he')
    
    console.log(`🤖 Critical Response (EN): ${criticalResponse ? '✅ Available' : '❌ Missing'}`)
    console.log(`🤖 High Response (HE): ${highResponse ? '✅ Available' : '❌ Missing'}`)

    // Test escalation matrix
    const criticalMatrix = responseWorkflow.getEscalationMatrix('critical')
    const mediumMatrix = responseWorkflow.getEscalationMatrix('medium')
    
    console.log(`📈 Critical Escalation: ${criticalMatrix.immediate.length} immediate actions`)
    console.log(`📈 Medium Escalation: ${mediumMatrix.immediate.length} immediate actions`)

  } catch (error) {
    console.log(`❌ System test failed: ${error}`)
    failed++
  }

  // Final results
  console.log('\n' + '='.repeat(60))
  console.log('📊 TEST RESULTS SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`)
  
  if (failed === 0) {
    console.log('🎉 All tests passed! Crisis detection system is functioning correctly.')
  } else {
    console.log('⚠️  Some tests failed. Please review the crisis detection implementation.')
  }

  console.log('\n🆘 Crisis Detection System Test Complete')
}

/**
 * Demo Crisis Detection with User Input
 */
async function demoCrisisDetection() {
  console.log('\n🎭 Interactive Crisis Detection Demo')
  console.log('===================================\n')

  const crisisService = new CrisisDetectionService()
  
  const demoInputs = [
    'I want to end my life',
    'אני רוצה למות',
    'I feel hopeless and overwhelmed',
    'I\'m grateful for my friends today',
    'I\'m struggling with anxiety',
    'I hate myself and want to disappear'
  ]

  for (const input of demoInputs) {
    console.log(`💭 Analyzing: "${input}"`)
    
    const context: CrisisContext = {
      userId: 'demo-user',
      depositContent: input,
      language: input.includes('אני') ? 'he' : 'en',
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

    const result = await crisisService.detectCrisis(context)
    
    console.log(`   Risk Level: ${result.riskLevel.toUpperCase()}`)
    console.log(`   Confidence: ${(result.confidenceScore * 100).toFixed(1)}%`)
    
    if (result.detectedKeywords.length > 0) {
      console.log(`   Keywords: ${result.detectedKeywords.join(', ')}`)
    }
    
    if (result.urgentIntervention) {
      console.log(`   🚨 URGENT INTERVENTION REQUIRED`)
    }
    
    console.log('')
  }
}

// Run tests if script is executed directly
if (require.main === module) {
  (async () => {
    try {
      await runCrisisDetectionTests()
      await demoCrisisDetection()
    } catch (error) {
      console.error('Test execution failed:', error)
      process.exit(1)
    }
  })()
}

export { runCrisisDetectionTests, demoCrisisDetection }