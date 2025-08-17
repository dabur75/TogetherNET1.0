# PLANNING.md - TogetherNet Project Roadmap

## 🎯 Vision & Mission

### Vision Statement
**"The world's first therapeutic platform that rebuilds self-worth through daily emotional deposits, proving that technology can heal rather than harm."**

### Core Mission
Create a bilingual (Hebrew/English) healing ecosystem where:
- Daily exercises guide users to notice their worth
- The AI Banker celebrates every deposit with therapeutic presence
- Crisis support is always available (Emergen-See)
- Creative expression flourishes (HealingRow)
- Kindness multiplies in real life (Love-Mark-It)
- Everything flows together in one feed (TogetherNet)

### Success Definition
When someone in Tel Aviv opens HeartBank each morning excited to see their exercise, makes deposits that rebuild their self-worth, watches their emotional wealth grow with compound interest, and voluntarily donates because they finally feel seen - we've succeeded.

---

## 🏗 System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     TogetherNet Ecosystem                    │
├───────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              🏦 HeartBank (Core)                     │   │
│  │  • Daily Exercises (6 AM publish)                    │   │
│  │  • 5 Deposit Categories                              │   │
│  │  • Banker AI Responses                               │   │
│  │  • Streak System (Fibonacci)                         │   │
│  │  • Compound Interest Wealth                          │   │
│  └──────────────────────────────────────────────────────┘   │
│                           ↓                                  │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ 🆘 Emergen-See  │  │ 🎨 HealingRow   │                  │
│  │ Crisis Support  │  │ Creative Share  │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                           ↓                                  │
│  ┌─────────────────────────────────────────┐               │
│  │        💝 Love-Mark-It                   │               │
│  │        Kindness Exchange                 │               │
│  └─────────────────────────────────────────┘               │
│                           ↓                                  │
│  ┌─────────────────────────────────────────┐               │
│  │        🌐 TogetherNet Feed               │               │
│  │        Unified Community View            │               │
│  └─────────────────────────────────────────┘               │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

### Monorepo Structure
```
togethernet/
├── packages/
│   ├── shared/                 # Shared business logic
│   │   ├── services/
│   │   │   ├── BankerService.ts      # AI therapeutic character
│   │   │   ├── ExerciseService.ts    # Daily exercise engine
│   │   │   ├── WealthService.ts      # Balance & compound interest
│   │   │   ├── DepositService.ts     # Deposit management
│   │   │   ├── ReminderService.ts    # Gentle notifications
│   │   │   └── CrisisService.ts      # Emergency support
│   │   ├── types/
│   │   │   ├── Deposit.ts
│   │   │   ├── Exercise.ts
│   │   │   ├── User.ts
│   │   │   ├── Wealth.ts
│   │   │   └── Crisis.ts
│   │   ├── utils/
│   │   │   ├── RTLUtils.ts           # Hebrew RTL support
│   │   │   ├── FibonacciUtils.ts     # Streak calculations
│   │   │   ├── DateUtils.ts          # Timezone handling
│   │   │   └── ValidationUtils.ts    # Input validation
│   │   └── constants/
│   │       ├── BankerResponses.ts    # 200+ responses
│   │       ├── Exercises.ts          # 365 daily exercises
│   │       └── Colors.ts             # Design system
│   │
│   ├── mobile/                  # React Native App
│   │   ├── ios/
│   │   ├── android/
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── HeartBank/
│   │   │   │   ├── DailyExercise/
│   │   │   │   ├── EmergenSee/
│   │   │   │   ├── HealingRow/
│   │   │   │   ├── LoveMarkIt/
│   │   │   │   └── TogetherNet/
│   │   │   ├── components/
│   │   │   │   ├── Banker/
│   │   │   │   ├── DepositForm/
│   │   │   │   ├── StreakDisplay/
│   │   │   │   └── WealthVisualization/
│   │   │   └── navigation/
│   │   └── app.json
│   │
│   └── web/                     # React Web App
│       ├── public/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── HeartBank/
│       │   │   ├── CreativeStudio/
│       │   │   ├── Gallery/
│       │   │   └── Treasury/
│       │   ├── components/
│       │   │   ├── EmotionPainter/
│       │   │   ├── StoryWeaver/
│       │   │   ├── MeditationSpace/
│       │   │   └── GratitudeGarden/
│       │   └── styles/
│       └── package.json
│
├── firebase/                    # Backend Services
│   ├── functions/
│   │   ├── src/
│   │   │   ├── dailyExercise.ts     # 6 AM publisher
│   │   │   ├── compoundInterest.ts  # Wealth calculator
│   │   │   ├── reminders.ts         # Notification sender
│   │   │   ├── crisisAlert.ts       # Emergency system
│   │   │   └── donations.ts         # Payment processor
│   │   └── package.json
│   ├── firestore.rules
│   ├── firestore.indexes.json
│   └── storage.rules
│
├── scripts/                     # Development Tools
│   ├── seedData.ts             # Initial data setup
│   ├── generateExercises.ts   # Exercise creator
│   ├── testHebrew.ts          # RTL testing
│   └── deploy.sh               # Deployment script
│
├── docs/                       # Documentation
│   ├── CLAUDE.md              # AI session guide
│   ├── PLANNING.md            # This file
│   ├── TASKS.md               # Task tracking
│   └── API.md                 # API documentation
│
└── config/                     # Configuration
    ├── .env.example
    ├── firebase.json
    ├── package.json            # Root package
    └── tsconfig.json          # TypeScript config
```

---

## 💻 Technology Stack

### Core Technologies

#### Frontend - Mobile
```json
{
  "framework": "React Native with Expo",
  "language": "TypeScript",
  "navigation": "@react-navigation/native",
  "state": "Zustand",
  "animations": "react-native-reanimated",
  "notifications": "expo-notifications",
  "styling": "StyleSheet + styled-components",
  "testing": "Jest + React Native Testing Library"
}
```

#### Frontend - Web
```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "routing": "React Router v6",
  "state": "Zustand",
  "animations": "Framer Motion + Three.js",
  "canvas": "Konva.js",
  "audio": "Tone.js",
  "styling": "Emotion + Tailwind CSS",
  "testing": "Jest + React Testing Library"
}
```

#### Backend
```json
{
  "platform": "Firebase",
  "auth": "Firebase Authentication",
  "database": "Cloud Firestore",
  "storage": "Firebase Storage",
  "functions": "Cloud Functions (Node.js)",
  "hosting": "Firebase Hosting + Vercel",
  "payments": "Stripe",
  "monitoring": "Firebase Analytics + Sentry"
}
```

### Package Dependencies

#### Shared Dependencies
```json
{
  "typescript": "^5.0.0",
  "firebase": "^10.7.0",
  "date-fns": "^2.30.0",
  "i18next": "^23.7.0",
  "zod": "^3.22.0",
  "lodash": "^4.17.21"
}
```

#### Mobile Dependencies
```json
{
  "react-native": "0.72.0",
  "expo": "~49.0.0",
  "@react-navigation/native": "^6.1.0",
  "@react-navigation/stack": "^6.3.0",
  "react-native-screens": "~3.22.0",
  "react-native-safe-area-context": "4.6.3",
  "react-native-gesture-handler": "~2.12.0",
  "react-native-reanimated": "~3.3.0",
  "expo-notifications": "~0.20.1",
  "expo-linear-gradient": "~12.3.0",
  "expo-haptics": "~12.4.0",
  "@expo/vector-icons": "^13.0.0",
  "zustand": "^4.4.0",
  "styled-components": "^6.1.0"
}
```

#### Web Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "framer-motion": "^10.16.0",
  "three": "^0.159.0",
  "@react-three/fiber": "^8.15.0",
  "konva": "^9.3.0",
  "react-konva": "^18.2.0",
  "tone": "^14.7.0",
  "tailwindcss": "^3.3.0",
  "@emotion/react": "^11.11.0",
  "@emotion/styled": "^11.11.0",
  "vite": "^5.0.0"
}
```

---

## 🛠 Required Tools & Setup

### Development Environment

#### 1. Core Tools
```bash
# Node.js (v18+ required)
brew install node

# Package Manager
npm install -g yarn

# TypeScript
npm install -g typescript

# Expo CLI
npm install -g expo-cli

# Firebase CLI
npm install -g firebase-tools

# Git
brew install git
```

#### 2. Mobile Development
```bash
# iOS Development (Mac only)
# Install Xcode from App Store
# Install Xcode Command Line Tools
xcode-select --install

# Android Development
# Install Android Studio
# Configure Android SDK
# Set ANDROID_HOME environment variable

# Expo Go App
# Download on physical device for testing
```

#### 3. IDE & Extensions
```bash
# Visual Studio Code
brew install --cask visual-studio-code

# Required VS Code Extensions:
# - ESLint
# - Prettier
# - TypeScript and JavaScript
# - React Native Tools
# - Hebrew Language Support
# - Firebase
# - Tailwind CSS IntelliSense
# - styled-components
```

#### 4. Firebase Setup
```bash
# Login to Firebase
firebase login

# Initialize project
firebase init

# Select:
# - Firestore
# - Functions
# - Hosting
# - Storage
# - Emulators
```

#### 5. Environment Variables
```bash
# Create .env files
touch .env.local
touch .env.production

# Required variables:
FIREBASE_API_KEY=
FIREBASE_AUTH_DOMAIN=
FIREBASE_PROJECT_ID=
FIREBASE_STORAGE_BUCKET=
FIREBASE_MESSAGING_SENDER_ID=
FIREBASE_APP_ID=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
SENTRY_DSN=
```

### Hebrew/RTL Testing Tools
```bash
# RTL testing browser extension
# Chrome: RTL Toggle

# Hebrew keyboard setup
# System Preferences > Keyboard > Input Sources > Add Hebrew

# Font testing
# Install Hebrew fonts for proper rendering
```

### Performance & Monitoring
```bash
# React DevTools
npm install -g react-devtools

# Firebase Emulator Suite
firebase emulators:start

# Bundle analyzer
npm install -g source-map-explorer
```

---

## 📅 Development Phases

### Phase 0: Foundation (Current)
**Week 1-2: Core Setup**
- [x] Project structure setup
- [x] Firebase project creation
- [x] TypeScript configuration
- [ ] Monorepo setup with Yarn workspaces
- [ ] Basic navigation structure
- [ ] Hebrew RTL configuration

### Phase 1: HeartBank Core
**Week 3-5: The Transformative Engine**
- [ ] Daily exercise system (30 exercises)
- [ ] Deposit form with 5 categories
- [ ] Banker AI responses (100+ contexts)
- [ ] Streak system (Fibonacci)
- [ ] Balance & compound interest
- [ ] Gentle reminder notifications
- [ ] Private/public toggle

### Phase 2: Crisis & Community
**Week 6-7: Support Systems**
- [ ] Emergen-See crisis button
- [ ] Crisis detection patterns
- [ ] HealingRow story sharing
- [ ] Basic creative tools
- [ ] Love-Mark-It board
- [ ] Safety protocols

### Phase 3: TogetherNet Feed
**Week 8-9: Bringing It Together**
- [ ] Feed algorithm (Hearts Rising)
- [ ] Reaction system
- [ ] Echo comments (50 words)
- [ ] Anti-addiction features
- [ ] Treasury of Light archive

### Phase 4: Web Experience
**Week 10-11: Creative Sanctuary**
- [ ] Web app setup
- [ ] Emotion Painter tool
- [ ] Story Weaver
- [ ] Meditation spaces
- [ ] Gallery layouts
- [ ] Cross-platform sync

### Phase 5: Launch Preparation
**Week 12: Final Polish**
- [ ] Performance optimization
- [ ] Security audit
- [ ] Beta tester onboarding
- [ ] Documentation complete
- [ ] Deployment pipeline

---

## 🚀 Deployment Strategy

### Environments
```yaml
Development:
  - Local development with emulators
  - Branch: develop
  - URL: http://localhost:3000

Staging:
  - Firebase staging project
  - Branch: staging
  - URL: https://togethernet-staging.web.app

Production:
  - Firebase production project
  - Branch: main
  - URL: https://togethernet.app
```

### CI/CD Pipeline
```yaml
GitHub Actions:
  - On PR: Lint, Test, Build
  - On merge to staging: Deploy to staging
  - On merge to main: Deploy to production
  - Automated testing for Hebrew RTL
```

### Release Process
1. Feature branch → PR → Code review
2. Merge to develop → Local testing
3. Merge to staging → Beta testing
4. Merge to main → Production release
5. Tag release with version number

---

## 📊 Success Metrics & Monitoring

### Key Performance Indicators
```typescript
interface POCMetrics {
  heartbank: {
    dailyActiveDepositors: 40,      // Target
    exerciseCompletionRate: 0.60,   // 60%
    averageStreakLength: 7,         // Days
    publicShareRate: 0.40,          // 40%
  };
  
  technical: {
    crashFreeRate: 0.99,            // 99%
    apiResponseTime: 200,           // ms
    appLoadTime: 2000,              // ms
    hebrewRenderingIssues: 0,       // Count
  };
  
  business: {
    monthlyDonations: 500,          // USD
    donorPercentage: 0.20,          // 20%
    retentionDay30: 0.50,           // 50%
  };
}
```

### Monitoring Setup
- Firebase Analytics for user behavior
- Sentry for error tracking
- Custom dashboard for HeartBank metrics
- Weekly metric reviews

---

## 🔒 Security & Privacy

### Data Protection
- End-to-end encryption for crisis chats
- Anonymous by default (username only)
- GDPR compliant data handling
- Right to deletion implemented

### Firebase Security Rules
```javascript
// Strict rules for user data
match /deposits/{deposit} {
  allow read: if isOwner() || isPublic();
  allow write: if isOwner();
}

match /crisis/{record} {
  allow read, write: if isOwner();
}
```

---

## 📝 Documentation Requirements

### Code Documentation
- JSDoc for all functions
- TypeScript interfaces documented
- README in each package
- API documentation maintained

### User Documentation
- Onboarding guide
- FAQ section
- Privacy policy
- Terms of service
- Therapeutic methodology explanation

---

## 🎯 Definition of Done

### Feature Complete When:
1. Code reviewed and approved
2. Tests written and passing (>80% coverage)
3. Hebrew/English both working perfectly
4. Responsive on all screen sizes
5. Accessibility standards met
6. Documentation updated
7. Deployed to staging
8. Product owner approval

---

## 🚦 Current Status

**Phase**: 0 - Foundation
**Sprint**: 1
**Focus**: Project setup and core architecture
**Blockers**: None
**Next Milestone**: Banker responses complete

---

## 📞 Team & Resources

**Product Owner**: Dvir Hillel Cohen Eraki
**Location**: Tel Aviv, Israel
**Methodology**: Expansion-based therapy
**Core Hours**: 9 AM - 6 PM IST

**Resources**:
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Native Docs](https://reactnative.dev/docs)
- [Expo Documentation](https://docs.expo.dev)
- [Hebrew Typography Guide](https://www.w3.org/International/articles/inline-bidi-markup/uba-basics)

---

*Last Updated: January 2025*
*Next Review: End of Phase 1*