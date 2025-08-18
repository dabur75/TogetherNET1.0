# TogetherNet Development Guide

## Quick Start

### Environment Setup
```bash
# Clone and setup
git clone [repo-url]
cd TogetherNet
npm install

# Start development
npm run dev

# Build for production
npm run build

# Deploy staging
npm run deploy:staging
```

### Required Tools
- **Node.js**: 18.x or higher
- **Firebase CLI**: Latest version
- **Hebrew keyboard**: For testing RTL functionality
- **Mobile devices**: iOS Safari, Android Chrome for real testing

## Common Development Tasks

### Adding a New Daily Exercise

1. **Create Exercise Object**
```typescript
// In exercises/library.ts
const newExercise: Exercise = {
  id: "gratitude-textures-002",
  theme: "Sensory Awareness",
  exercise: {
    en: "Notice three sounds that bring you peace today",
    he: "שימו לב לשלושה צלילים שמביאים לכם שלווה היום"
  },
  bankerIntro: {
    en: "Your ears can be doorways to calm. Let's listen together...",
    he: "האוזניים שלכם יכולות להיות שערים לרוגע. בואו נקשיב יחד..."
  },
  levels: {
    beginner: {
      en: "Name one sound that made you smile",
      he: "תנו שם לצליל אחד שגרם לכם לחייך"
    },
    intermediate: {
      en: "Describe three peaceful sounds and where you heard them",
      he: "תארו שלושה צלילים שלווים ואיפה שמעתם אותם"
    },
    advanced: {
      en: "Write about how sounds connect to memories of safety and love",
      he: "כתבו על איך צלילים מתחברים לזיכרונות של ביטחון ואהבה"
    }
  },
  prompts: [
    {
      en: "What sound unexpectedly brought you peace today?",
      he: "איזה צליל הביא לכם שלווה באופן בלתי צפוי היום?"
    }
  ]
}
```

2. **Add Seasonal Adaptation**
```typescript
const getSeasonalExercise = (baseExercise: Exercise, season: Season): Exercise => {
  switch(season) {
    case 'winter':
      return {
        ...baseExercise,
        bankerIntro: {
          en: "In winter's quiet, your nervous system craves gentle sounds...",
          he: "בשקט של החורף, המערכת העצבים שלכם כמהה לצלילים עדינים..."
        }
      };
    case 'spring':
      return {
        ...baseExercise,
        bankerIntro: {
          en: "Spring awakens new sounds of hope in your heart...",
          he: "האביב מעיר צלילי תקווה חדשים בלב שלכם..."
        }
      };
  }
};
```

### Creating a Deposit Component

```tsx
const DepositForm: React.FC = () => {
  const { exercise } = useDailyExercise()
  const { language } = useLanguage()
  const banker = useBanker()
  const { isRTL } = useRTL()
  
  const [content, setContent] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')
  
  const handleDeposit = async (deposit: DepositInput) => {
    // Save deposit with wealth mechanics
    const saved = await saveDeposit({
      ...deposit,
      linkedExercise: exercise.id,
      baseValue: calculateDepositValue(deposit.content),
      language
    })
    
    // Calculate new balance with compound interest
    await updateBalance(saved)
    
    // Get contextual banker response
    const response = banker.getDepositResponse({
      deposit: saved,
      isFirstDeposit: user.totalDeposits === 1,
      currentStreak: user.streak,
      category: deposit.category,
      exerciseCompleted: true
    })
    
    // Show celebration with gentle animation
    celebrate(response)
    
    // Update pipeline progression if applicable
    checkPipelineReadiness(user)
  }
  
  return (
    <HeartBankContainer>
      {/* Daily Exercise Card */}
      <DailyExerciseCard 
        exercise={exercise}
        selectedLevel={selectedLevel}
        onLevelChange={setSelectedLevel}
      />
      
      {/* Banker Introduction */}
      <BankerPresence 
        message={exercise.bankerIntro[language]}
        isVisible={true}
        breathing={true}
      />
      
      {/* Deposit Text Area */}
      <DepositTextArea 
        value={content}
        onChangeText={setContent}
        placeholder={getPlaceholder(exercise.category, language)}
        minLength={20}
        maxLength={500}
        style={{
          textAlign: isRTL ? 'right' : 'left',
          writingDirection: isRTL ? 'rtl' : 'ltr'
        }}
      />
      
      {/* Privacy Toggle */}
      <PrivacyToggle 
        isPublic={isPublic}
        onToggle={setIsPublic}
        explanation={{
          private: language === 'he' ? 'רק אני והבנקאי נראה את זה' : 'Only banker and I will see this',
          public: language === 'he' ? 'הקהילה יכולה להתחבר לחוויה שלי' : 'Community can connect with my experience'
        }}
      />
      
      {/* Word Count & Wealth Preview */}
      <DepositMetrics 
        wordCount={content.split(' ').length}
        estimatedValue={calculateDepositValue(content)}
        currentStreak={user.streak}
      />
      
      {/* Submit Button */}
      <SubmitButton 
        onPress={handleDeposit}
        disabled={content.length < 20}
        loading={isSubmitting}
        style={isRTL && { flexDirection: 'row-reverse' }}
      >
        {isSubmitting 
          ? (language === 'he' ? 'מפקיד...' : 'Depositing...')
          : (language === 'he' ? 'הפקד ללב' : 'Deposit to Heart')
        }
      </SubmitButton>
    </HeartBankContainer>
  )
}
```

### Implementing Banker Responses

```typescript
class BankerResponseEngine {
  private getContextualResponse(context: ResponseContext): LocalizedString {
    const { user, deposit, currentState, timeOfDay } = context
    
    // Crisis detection first
    if (this.detectsCrisis(deposit.content)) {
      return this.getCrisisResponse(context)
    }
    
    // Milestone celebrations
    if (this.isStreakMilestone(user.streak)) {
      return this.getStreakMilestoneResponse(user.streak, context.language)
    }
    
    // First deposit special treatment
    if (user.totalDeposits === 1) {
      return this.getFirstDepositResponse(context.language)
    }
    
    // Category-specific responses
    const categoryResponse = this.getCategoryResponse(deposit.category, context)
    
    // Add therapeutic elements
    return this.addTherapeuticElements(categoryResponse, context)
  }
  
  private getCategoryResponse(category: DepositCategory, context: ResponseContext): LocalizedString {
    const responses = {
      gratitude: {
        en: [
          "Your nervous system is learning that good things exist...",
          "What a beautiful way to notice abundance...",
          "Thank you for training your heart to see gifts..."
        ],
        he: [
          "המערכת העצבים שלכם לומדת שקיימים דברים טובים...",
          "איזו דרך יפה לשים לב לשפע...",
          "תודה שאתם מאמנים את הלב שלכם לראות מתנות..."
        ]
      },
      courage: {
        en: [
          "The bravery in this deposit takes my breath away...",
          "You faced something difficult and chose growth...",
          "This is what real courage looks like..."
        ],
        he: [
          "האומץ בהפקדה הזו עוצר לי את הנשימה...",
          "התמודדתם עם משהו קשה ובחרתם בצמיחה...",
          "כך נראה אומץ אמיתי..."
        ]
      }
    }
    
    const categoryResponses = responses[category]
    const languageResponses = categoryResponses[context.language]
    
    // Select based on user patterns and randomization
    return this.selectBestResponse(languageResponses, context)
  }
  
  private addTherapeuticElements(baseResponse: string, context: ResponseContext): LocalizedString {
    // Add question mark therapy
    if (this.detectsSelfCriticism(context.deposit.content)) {
      const questionPrompt = context.language === 'he' 
        ? "מה אם נשים סימן שאלה אחרי המחשבה הזו?"
        : "What if we put a question mark after that thought?"
      
      return `${baseResponse} ${questionPrompt}`
    }
    
    // Add expansion-based elements
    if (this.detectsStruggle(context.deposit.content)) {
      const expansionPrompt = context.language === 'he'
        ? "מה כבר עובד בסיטואציה הזו, גם אם זה קטן?"
        : "What's already working in this situation, even if it's small?"
        
      return `${baseResponse} ${expansionPrompt}`
    }
    
    return baseResponse
  }
}
```

### Pipeline Transition Logic

```typescript
class PipelineTransitionService {
  checkReadinessForNextStage(user: User): PipelineStage | null {
    switch(user.currentStage) {
      case 'emergen-see':
        return this.checkEmergenSeeToHealingRow(user)
      case 'healing-row':
        return this.checkHealingRowToHeartBank(user)
      case 'heart-bank':
        return this.checkHeartBankToLoveMarkIt(user)
      case 'love-mark-it':
        return this.checkLoveMarkItToTogetherNet(user)
      default:
        return null
    }
  }
  
  private checkHeartBankToLoveMarkIt(user: User): 'love-mark-it' | null {
    const criteria = {
      depositConsistency: user.streak >= 21, // 3 weeks of deposits
      emotionalStability: user.averageDepositSentiment > 0.6,
      abundanceIndicated: user.expressedDesireToGive,
      balanceThreshold: user.heartBankBalance >= 100 // Wealth accumulation
    }
    
    if (Object.values(criteria).every(Boolean)) {
      return 'love-mark-it'
    }
    return null
  }
  
  async inviteToNextStage(user: User, nextStage: PipelineStage) {
    const invitation = await this.generateInvitation(user, nextStage)
    
    // Send gentle invitation with banker presence
    await this.sendBankerInvitation(user, invitation)
    
    // Create transition celebration
    await this.createTransitionCelebration(user, nextStage)
    
    // Update user status to "invited" not "transitioned"
    await this.updateUserStatus(user.id, `invited-to-${nextStage}`)
  }
}
```

## Testing Procedures

### Mobile Testing Checklist

#### Hebrew RTL Testing
```bash
# Test Hebrew content in all interfaces
1. Switch to Hebrew language
2. Verify RTL layout in all components
3. Test Hebrew text input and display
4. Check mobile keyboard behavior
5. Verify proper text alignment
6. Test touch targets in RTL mode
```

#### Performance Testing
```bash
# Mobile performance benchmarks
npm run build
npm run lighthouse # Check PWA scores

# Target metrics:
# - First Contentful Paint: < 2s
# - Largest Contentful Paint: < 2.5s
# - Bundle size: < 3MB
# - Accessibility: 100%
# - Best Practices: 100%
```

#### Device Testing
- **iOS Safari**: iPhone 12+, iPad
- **Android Chrome**: Pixel, Samsung Galaxy
- **Responsive**: All breakpoints 320px - 1920px
- **Network**: 3G, slow WiFi, offline

### Unit Testing

```typescript
// Example test for banker responses
describe('BankerService', () => {
  test('provides appropriate response for gratitude deposit', async () => {
    const context = createMockContext({
      category: 'gratitude',
      language: 'en',
      streak: 5
    })
    
    const response = await bankerService.getResponse(context)
    
    expect(response.content.en).toContain('gratitude')
    expect(response.therapeutic.methodology).toBe('expansion_based')
    expect(response.mobileOptimized.readingTimeSeconds).toBeLessThan(10)
  })
  
  test('handles Hebrew responses correctly', async () => {
    const context = createMockContext({
      language: 'he',
      category: 'courage'
    })
    
    const response = await bankerService.getResponse(context)
    
    expect(response.content.he).toBeDefined()
    expect(response.content.he.length).toBeGreaterThan(10)
    // Hebrew text should be meaningful, not just translated
  })
})
```

### Integration Testing

```typescript
// Test full deposit flow
describe('Deposit Flow', () => {
  test('complete deposit submission with banker response', async () => {
    const user = await createTestUser()
    const exercise = await getDailyExercise()
    
    // Submit deposit
    const deposit = await submitDeposit({
      userId: user.id,
      content: "I'm grateful for the warm sun today",
      category: 'gratitude',
      linkedExercise: exercise.id
    })
    
    // Verify deposit saved
    expect(deposit.id).toBeDefined()
    expect(deposit.baseValue).toBeGreaterThan(0)
    
    // Verify banker response
    const bankerResponse = await getBankerResponse(deposit)
    expect(bankerResponse.content.en).toBeDefined()
    expect(bankerResponse.therapeutic.focusArea).toContain('gratitude')
    
    // Verify wealth update
    const updatedUser = await getUser(user.id)
    expect(updatedUser.balance).toBeGreaterThan(user.balance)
  })
})
```

## Firebase Setup & Deployment

### Local Development Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize project
firebase init

# Start emulators
firebase emulators:start
```

### Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // HeartBank data - user's private wealth
    match /heartbank/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Deposits - users can read public deposits, write their own
    match /deposits/{depositId} {
      allow read: if resource.data.isPublic == true;
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Daily exercises - public read
    match /exercises/{exerciseId} {
      allow read: if true;
      allow write: if false; // Only cloud functions can write
    }
    
    // Crisis support - private, user's own only
    match /emergensee/{recordId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Cloud Functions

```typescript
// functions/src/dailyExercise.ts
export const publishDailyExercise = functions.pubsub
  .schedule('0 6 * * *') // 6 AM daily
  .timeZone('Asia/Jerusalem')
  .onRun(async (context) => {
    const today = new Date().toISOString().split('T')[0]
    const exercise = await generateExerciseForDate(today)
    
    // Save to Firestore
    await admin.firestore()
      .collection('exercises')
      .doc(today)
      .set(exercise)
    
    // Send gentle notifications
    await sendDailyExerciseNotifications(exercise)
  })

// functions/src/compoundInterest.ts
export const calculateCompoundInterest = functions.pubsub
  .schedule('0 0 * * *') // Midnight daily
  .onRun(async (context) => {
    const batch = admin.firestore().batch()
    
    // Update all user balances with compound interest
    const users = await admin.firestore().collection('heartbank').get()
    
    users.docs.forEach(userDoc => {
      const newBalance = calculateUserCompoundInterest(userDoc.data())
      batch.update(userDoc.ref, { balance: newBalance })
    })
    
    await batch.commit()
  })
```

### Deployment Scripts

```bash
#!/bin/bash
# scripts/deploy-staging.sh

echo "🚀 Deploying to staging..."

# Build web app
npm run build

# Deploy to Firebase
firebase deploy --only hosting:staging

# Deploy cloud functions
firebase deploy --only functions

# Update Firestore rules
firebase deploy --only firestore:rules

echo "✅ Staging deployment complete"
echo "🌐 Visit: https://togethernet-staging.web.app"
```

## Performance Optimization

### Bundle Size Optimization

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          firebase: ['firebase/app', 'firebase/firestore'],
          animations: ['framer-motion'],
          ui: ['@emotion/react', '@emotion/styled']
        }
      }
    }
  },
  
  // Code splitting
  optimizeDeps: {
    include: ['react', 'react-dom', 'firebase/app']
  }
})
```

### Mobile Performance

```typescript
// Lazy loading for mobile
const LazyHealingRow = lazy(() => import('./pages/HealingRow'))
const LazyLoveMarkIt = lazy(() => import('./pages/LoveMarkIt'))

// Image optimization
const OptimizedImage: React.FC<{src: string}> = ({ src, ...props }) => {
  const [loaded, setLoaded] = useState(false)
  
  return (
    <div style={{ minHeight: '200px' }}>
      <img 
        src={src}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        style={{ opacity: loaded ? 1 : 0 }}
        {...props}
      />
    </div>
  )
}

// Battery-conscious animations
const useBatteryConscious = () => {
  const [batteryLevel, setBatteryLevel] = useState(1)
  
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(battery.level)
      })
    }
  }, [])
  
  return {
    reducedAnimations: batteryLevel < 0.2,
    hapticFeedback: batteryLevel > 0.1
  }
}
```

## Troubleshooting

### Common Issues

#### Hebrew Text Not Displaying
```bash
# Check font loading
1. Verify Hebrew fonts in CSS
2. Test with different browsers
3. Check RTL direction settings
4. Validate UTF-8 encoding
```

#### PWA Not Installing
```bash
# Debug service worker
1. Check manifest.json validity
2. Verify HTTPS in production
3. Test service worker registration
4. Check browser PWA requirements
```

#### Firebase Connection Issues
```bash
# Debug Firebase config
1. Verify config file exists
2. Check environment variables
3. Test emulator connectivity
4. Validate Firestore rules
```

### Debug Commands

```bash
# Check bundle size
npm run analyze

# Test offline functionality
npm run test:offline

# Hebrew RTL testing
npm run test:hebrew

# Performance profiling
npm run lighthouse
```

## Contributing Guidelines

### Code Standards
- **TypeScript**: Strict mode, comprehensive interfaces
- **Formatting**: Prettier with 2-space indents
- **Linting**: ESLint with therapeutic-focused rules
- **Testing**: Minimum 80% coverage

### Commit Messages
```bash
# Format: type(scope): description
feat(banker): add crisis detection responses
fix(mobile): improve Hebrew RTL layout
docs(api): update banker response examples
test(integration): add deposit flow tests
```

### Pull Request Process
1. **Branch naming**: `feature/banker-responses` or `fix/hebrew-layout`
2. **Testing**: All tests pass, Hebrew tested on real devices
3. **Performance**: No bundle size increase > 5%
4. **Accessibility**: Maintain WCAG AA compliance
5. **Review**: Therapeutic value confirmed by team

---

This guide ensures consistent, therapeutic-focused development that prioritizes mobile performance and Hebrew cultural authenticity.