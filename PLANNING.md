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

### Monorepo Structure (Web-First Mobile-Responsive)
```
togethernet/
├── packages/
│   ├── shared/                 # Shared business logic
│   │   ├── services/
│   │   │   ├── BankerService.ts      # AI therapeutic character
│   │   │   ├── ExerciseService.ts    # Daily exercise engine
│   │   │   ├── WealthService.ts      # Balance & compound interest
│   │   │   ├── DepositService.ts     # Deposit management
│   │   │   ├── ReminderService.ts    # PWA notifications
│   │   │   └── CrisisService.ts      # Emergency support
│   │   ├── types/
│   │   │   ├── Deposit.ts
│   │   │   ├── Exercise.ts
│   │   │   ├── User.ts
│   │   │   ├── Wealth.ts
│   │   │   ├── Crisis.ts
│   │   │   └── PWA.ts                # Progressive Web App types
│   │   ├── utils/
│   │   │   ├── RTLUtils.ts           # Hebrew mobile RTL support
│   │   │   ├── FibonacciUtils.ts     # Streak calculations
│   │   │   ├── DateUtils.ts          # Timezone handling
│   │   │   ├── ValidationUtils.ts    # Input validation
│   │   │   ├── ResponsiveUtils.ts    # Mobile-first breakpoints
│   │   │   └── TouchUtils.ts         # Mobile gesture handling
│   │   └── constants/
│   │       ├── BankerResponses.ts    # 200+ responses
│   │       ├── Exercises.ts          # 365 daily exercises
│   │       ├── Colors.ts             # Mobile-first design system
│   │       └── Breakpoints.ts        # Responsive breakpoints
│   │
│   ├── web/                     # Primary Progressive Web App
│   │   ├── public/
│   │   │   ├── manifest.json         # PWA manifest
│   │   │   ├── sw.js                 # Service worker
│   │   │   └── icons/                # Mobile app icons
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── HeartBank/        # Mobile-first core experience
│   │   │   │   ├── DailyExercise/    # Touch-optimized exercises
│   │   │   │   ├── EmergenSee/       # Mobile crisis support
│   │   │   │   ├── HealingRow/       # Mobile creative sharing
│   │   │   │   ├── LoveMarkIt/       # Location-aware kindness
│   │   │   │   ├── CreativeStudio/   # Desktop-enhanced tools
│   │   │   │   ├── Gallery/          # Responsive showcase
│   │   │   │   └── Treasury/         # Mobile-optimized archives
│   │   │   ├── components/
│   │   │   │   ├── Banker/           # Responsive AI presence
│   │   │   │   ├── DepositForm/      # Touch-friendly input
│   │   │   │   ├── StreakDisplay/    # Mobile-optimized streaks
│   │   │   │   ├── WealthVisualization/ # Responsive charts
│   │   │   │   ├── EmotionPainter/   # Touch + mouse drawing
│   │   │   │   ├── StoryWeaver/      # Mobile + desktop writing
│   │   │   │   ├── MeditationSpace/  # Mobile breathing guides
│   │   │   │   └── PWAComponents/    # Installation, notifications
│   │   │   ├── hooks/
│   │   │   │   ├── useResponsive.ts  # Breakpoint management
│   │   │   │   ├── useTouchGestures.ts # Mobile interactions
│   │   │   │   ├── usePWA.ts         # Service worker, install
│   │   │   │   └── useOffline.ts     # Offline functionality
│   │   │   ├── styles/
│   │   │   │   ├── mobile-first.css  # Mobile-first base styles
│   │   │   │   ├── responsive.css    # Breakpoint-specific styles
│   │   │   │   └── rtl-mobile.css    # Hebrew mobile optimizations
│   │   │   └── pwa/
│   │   │       ├── service-worker.ts # Offline & caching
│   │   │       ├── notifications.ts  # Push notifications
│   │   │       └── install.ts        # Installation prompts
│   │   └── package.json
│   │
│   └── mobile/                  # Future React Native (Phase 2)
│       └── README.md            # "Coming in Phase 2" placeholder
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

### Core Technologies (Web-First Mobile-Responsive)

#### Primary Frontend - Progressive Web App
```json
{
  "framework": "React 18",
  "language": "TypeScript",
  "routing": "React Router v6",
  "state": "Zustand",
  "styling": "Emotion + Tailwind CSS (mobile-first)",
  "animations": "Framer Motion (touch-optimized)",
  "PWA": "Vite PWA Plugin + Workbox",
  "mobile": {
    "gestures": "react-use-gesture",
    "responsive": "react-responsive",
    "touch": "pointer events + touch-action CSS",
    "performance": "react-intersection-observer",
    "offline": "service worker + IndexedDB"
  },
  "desktop": {
    "canvas": "Konva.js (touch + mouse)",
    "3D": "Three.js + React Three Fiber",
    "audio": "Tone.js"
  },
  "notifications": "Push API + Service Worker",
  "testing": "Jest + React Testing Library + Cypress"
}
```

#### Future React Native (Phase 2)
```json
{
  "timeline": "After PWA validation (3-6 months)",
  "approach": "Reuse shared business logic",
  "focus": "Platform-specific optimizations",
  "framework": "React Native with Expo",
  "advantage": "Proven concept + faster development"
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

#### Primary Web (Progressive Web App) Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  
  "build": {
    "vite": "^5.0.0",
    "vite-plugin-pwa": "^0.17.0",
    "workbox-webpack-plugin": "^7.0.0"
  },
  
  "styling": {
    "tailwindcss": "^3.3.0",
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0"
  },
  
  "mobile-optimizations": {
    "react-use-gesture": "^10.3.0",
    "react-responsive": "^10.0.0",
    "react-intersection-observer": "^9.5.0",
    "@react-hook/window-size": "^3.1.0",
    "framer-motion": "^10.16.0"
  },
  
  "PWA": {
    "workbox-window": "^7.0.0",
    "web-push": "^3.6.0",
    "idb": "^7.1.0"
  },
  
  "desktop-enhancements": {
    "three": "^0.159.0",
    "@react-three/fiber": "^8.15.0",
    "konva": "^9.3.0",
    "react-konva": "^18.2.0",
    "tone": "^14.7.0"
  },
  
  "state-management": {
    "zustand": "^4.4.0"
  }
}
```

#### Future React Native Dependencies (Phase 2)
```json
{
  "note": "Will be added in Phase 2 after PWA validation",
  "approach": "Reuse shared business logic from packages/shared",
  "timeline": "3-6 months after web POC success"
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

## 📅 Development Phases (Web-First Mobile-Responsive)

### Phase 0: Mobile-First Foundation (Week 1-2)
**Core Setup with Mobile Priority**
- [x] Project structure setup
- [x] Firebase project creation  
- [x] TypeScript configuration
- [x] Monorepo setup with Yarn workspaces
- [x] Web foundation with responsive breakpoints
- [x] Hebrew RTL mobile optimization
- [ ] PWA basic setup (manifest, service worker)
- [ ] Mobile testing on real devices

### Phase 1: Mobile-First HeartBank Core (Week 3-5)
**The Transformative Engine - Touch-Optimized**
- [x] HeartBank page structure with mobile-first design
- [ ] Touch-friendly daily exercise system (30 exercises)
- [ ] Mobile-responsive deposit form with 5 categories (partially done)
- [ ] Banker AI responses (100+ contexts) optimized for small screens
- [ ] Touch-friendly streak system (Fibonacci)
- [ ] Mobile-optimized balance & compound interest visualization
- [ ] PWA push notifications for gentle reminders
- [ ] Mobile-friendly private/public toggle
- [ ] Offline functionality for core features

### Phase 2: PWA & Enhanced Mobile Features (Week 6-7)
**Progressive Web App Excellence**
- [ ] Full PWA implementation (installable, offline-capable)
- [ ] Mobile-optimized Emergen-See crisis button
- [ ] Touch-friendly crisis detection patterns
- [ ] Mobile-first HealingRow story sharing
- [ ] Touch gesture navigation
- [ ] Location-aware Love-Mark-It board
- [ ] Mobile performance optimizations
- [ ] Push notification system

### Phase 3: Responsive Enhancement & Desktop Features (Week 8-9)
**Cross-Device Experience**
- [ ] Desktop-enhanced creative tools (Emotion Painter, Story Weaver)
- [ ] Responsive TogetherNet feed (Hearts Rising algorithm)
- [ ] Touch + mouse interaction optimization
- [ ] Advanced visualization for larger screens
- [ ] Keyboard shortcuts for desktop users
- [ ] Multi-screen responsive layouts
- [ ] Cross-device sync capabilities

### Phase 4: Advanced Features & Polish (Week 10-11)
**Pro Features & Optimization**
- [ ] Advanced desktop creative studio tools
- [ ] 3D visualizations for desktop (Three.js)
- [ ] Audio therapy features (Tone.js)
- [ ] Advanced analytics dashboard
- [ ] Performance optimization across all devices
- [ ] Accessibility compliance (WCAG 2.1)
- [ ] Advanced PWA features (background sync, etc.)

### Phase 5: Launch Preparation (Week 12)
**Production Ready**
- [ ] Mobile performance audit (Lighthouse score >90)
- [ ] Security audit and penetration testing
- [ ] Beta tester onboarding (mobile-first)
- [ ] Documentation complete
- [ ] Production deployment pipeline
- [ ] App store optimization (PWA listing)

### Future Phase: React Native (Months 3-6)
**Native Mobile Apps - After PWA Validation**
- [ ] React Native project setup
- [ ] Reuse shared business logic
- [ ] Platform-specific optimizations
- [ ] App store submissions
- [ ] Native mobile features (camera, contacts, etc.)

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