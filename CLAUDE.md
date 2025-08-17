# CLAUDE.md - TogetherNet Development Guide

## Session Start Protocol

**IMPORTANT**: At the start of every new conversation:
1. **Read PLANNING.md** - Understand the project roadmap and current phase
2. **Check TASKS.md** - Review pending tasks before starting work
3. **Mark completed tasks** - Update TASKS.md immediately when finishing work
4. **Add new tasks** - When discovering new requirements, add them to TASKS.md

## Project Overview

**TogetherNet** is a revolutionary therapeutic platform with **HeartBank** at its core - a daily deposit system that systematically rebuilds security, self-worth, and self-respect through guided exercises and compound emotional wealth accumulation.

**Founder**: Dvir Hillel Cohen Eraki (Licensed Therapist)  
**Core Innovation**: Daily deposits that literally rebuild self-worth  
**Status**: POC Development Ready  
**Platforms**: Mobile (React Native) + Web (React)  
**Languages**: Hebrew (RTL) + English  

## Core Philosophy

> "Your worth is not broken - it's depleted. Like a bank account overdrawn by life's hardships, it needs consistent deposits to rebuild."

Every feature must serve the core transformation: rebuilding self-worth through daily practice.

## The Healing Journey Pipeline

**Complete transformation process from crisis to community contribution:**

🆘 **Emergen-See** - "I see you in your darkest moment"  
↓  
🌱 **HealingRow** - "Let's grow through this systematically together"  
↓  
🏦 **HeartBank** - "Build your daily deposits of strength and gratitude"  
↓  
💝 **Love-Mark-It** - "Now mark your love into action for others"  
↓  
🌐 **TogetherNet** - "You're part of the network helping others heal"

## HeartBank - The Core System

### Daily Exercise Engine

```typescript
// Published every morning at 6 AM local time
interface DailyExercise {
  id: string;
  date: Date;
  category: 'gratitude' | 'courage' | 'honesty' | 'success' | 'self-compassion';
  theme: string;
  exercise: string;
  bankerIntro: LocalizedString;
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  prompts: LocalizedString[];
  timing: {
    publish: "6 AM local time (adjustable)";
    notification: "Gentle wake-up with exercise preview";
    reminder: "Soft nudge at chosen time if not completed";
    expiry: "Available all day, new one tomorrow";
  };
}

// Example exercise structure
const mondayExercise: DailyExercise = {
  category: 'gratitude',
  theme: 'Sensory Awareness',
  exercise: 'Notice three textures that feel good today',
  bankerIntro: {
    en: "Your nervous system remembers pleasure, let's help it...",
    he: "המערכת העצבים שלך זוכרת הנאה, בוא נעזור לה..."
  },
  levels: {
    beginner: "Name one soft thing you touched",
    intermediate: "Describe three textures in detail",
    advanced: "Write about how textures connect to memories"
  }
};
```

### The Five Pillars of Deposits

```typescript
interface DepositCategories {
  gratitude: {
    rebuilds: "Security through abundance recognition";
    exercise: "Notice what's already here";
    prompt: "What small goodness surprised you today?";
    healing: "Rewires scarcity mindset";
  };
  
  courage: {
    rebuilds: "Self-respect through brave action";
    exercise: "Acknowledge your daily braveries";
    prompt: "What fear did you face, however small?";
    healing: "Proves you're stronger than you think";
  };
  
  honesty: {
    rebuilds: "Authenticity through truth-telling";
    exercise: "Practice radical honesty with yourself";
    prompt: "What truth are you finally ready to admit?";
    healing: "Dissolves shame through exposure to light";
  };
  
  success: {
    rebuilds: "Self-worth through achievement recognition";
    exercise: "Celebrate what worked today";
    prompt: "What went better than expected?";
    healing: "Counters failure fixation";
  };
  
  selfCompassion: {
    rebuilds: "Internal safety through self-kindness";
    exercise: "Treat yourself like your best friend";
    prompt: "How were you gentle with yourself today?";
    healing: "Develops secure internal attachment";
  };
}
```

### Deposit System Architecture

```typescript
interface Deposit {
  id: string;
  userId: string;
  date: Date;
  category: DepositCategory;
  content: string;
  wordCount: number;
  isPublic: boolean;
  linkedExercise?: string; // Links to daily exercise
  language: 'en' | 'he';
  
  // Wealth mechanics
  baseValue: number;
  interestRate: number; // Increases with streaks
  currentValue: number; // baseValue + accumulated interest
  compoundingSince: Date;
  
  // Impact tracking
  inspirationCount: number; // How many others it inspired
  reactionCounts: ReactionCounts;
}

interface UserWealth {
  balance: number; // Sum of all deposit values
  streak: number;
  streakLevel: StreakLevel; // Fibonacci-based
  interestRate: number; // Current rate based on streak
  totalDeposits: number;
  depositHistory: Deposit[];
  lastDepositDate: Date;
}
```

### Banker Implementation

```typescript
class BankerService {
  // Core responses for each context
  private responses = {
    firstDeposit: {
      en: "Welcome to your HeartBank. This first deposit is precious.",
      he: "ברוך הבא לבנק הלב שלך. ההפקדה הראשונה הזו יקרה."
    },
    
    dailyExerciseComplete: {
      en: "Thank you for trusting me with today's exercise.",
      he: "תודה שסמכת עליי עם התרגיל של היום."
    },
    
    streakMilestone: {
      3: { en: "Three days! Your seedling is planted 🌱" },
      8: { en: "Eight days! Your roots are growing 🌿" },
      21: { en: "Twenty-one days! Your flower is blooming 🌸" },
      55: { en: "Fifty-five days! Your tree stands strong 🌳" }
    },
    
    crisisResponse: {
      en: "I can feel how much pain you're in. You're not alone.",
      he: "אני מרגיש כמה כאב אתה חווה. אתה לא לבד."
    },
    
    // Therapeutic methodology responses
    expansionBased: {
      en: "What if we questioned that assumption about yourself?",
      he: "מה אם נשאל שאלה על ההנחה הזו על עצמך?"
    },
    
    vulnerabilityCelebration: {
      en: "Thank you for sharing this precious gem with me",
      he: "תודה שחלקת איתי את האבן היקרה הזו"
    }
  };
  
  getResponse(context: ResponseContext): LocalizedString {
    // Intelligent response selection based on:
    // - User's deposit history
    // - Current emotional state  
    // - Time of day
    // - Streak status
    // - Category patterns
    // - Crisis indicators
    // - Therapeutic methodology (expansion-based)
  }
  
  // Positioned as HeartBank Manager, Not General AI
  role: "Personal banker for your emotional wealth";
  
  personality: {
    therapeutic: "Embodies Dvir's expansion-based methodology";
    presence: "Warm, wise, believing in your wealth";
    responses: "Gentle curiosity instead of harsh judgment";
    focus: "What's working rather than what's broken";
  };
}
```

### Gentle Reminder System

```typescript
interface GentleReminders {
  morning: {
    time: "User-selected wake time + 30 min";
    message: "Today's exercise is ready when you are 💛";
    preview: "Shows exercise title, not full prompt";
    snooze: "Remind me in 2 hours";
  };
  
  afternoon: {
    condition: "If no deposit by 2 PM";
    message: "Your HeartBank is open whenever you're ready";
    tone: "Encouraging, never shaming";
    frequency: "Once only";
  };
  
  evening: {
    condition: "If no deposit by 8 PM";
    message: "Even noticing you couldn't do it today is worth depositing";
    option: "Quick 'survival' deposit for hard days";
    celebration: "Banker honors showing up however you can";
  };
  
  streakCare: {
    aboutToBreak: "Your streak is resting, not broken";
    broken: "Streaks are spirals - you're on a higher loop now";
    restored: "Welcome back, you never really left";
    milestone: "Gentle celebration at Fibonacci points";
  };
}

class ReminderService {
  scheduleReminders(user: User) {
    // Morning: 30 min after wake time
    schedule(user.wakeTime + 30, {
      title: "Today's exercise is ready 💛",
      body: dailyExercise.theme,
      action: 'VIEW_EXERCISE'
    });
    
    // Afternoon: If no deposit by 2 PM
    if (!user.hasDepositedToday) {
      schedule('14:00', {
        title: "Your HeartBank is open",
        body: "Whenever you're ready",
        action: 'QUICK_DEPOSIT'
      });
    }
    
    // Evening: If no deposit by 8 PM
    schedule('20:00', {
      title: "Even surviving today is worth depositing",
      body: "Quick survival deposit?",
      action: 'SURVIVAL_DEPOSIT'
    });
  }
}
```

### Balance & Compound Interest System

```typescript
interface WealthAccumulation {
  balance: {
    calculation: "Sum of all deposits + interest";
    display: "Golden coins/light that accumulates";
    milestones: "Celebrations at 10, 25, 50, 100 deposits";
    meaning: "Tangible proof of emotional wealth";
  };
  
  compoundInterest: {
    concept: "Old deposits become more valuable over time";
    mechanism: "Deposits that inspire others gain interest";
    visualization: "See your wealth growing even while resting";
    message: "Your past work continues working for you";
  };
  
  streakSystem: {
    fibonacci: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
    rewards: {
      3: "Seedling planted 🌱 (+10% interest rate)";
      8: "Roots growing 🌿 (+20% interest rate)";
      21: "Flower blooming 🌸 (+30% interest rate)";
      55: "Tree standing 🌳 (+40% interest rate)";
      89: "Forest guardian 🌲 (+50% interest rate)";
    };
    philosophy: "Natural growth patterns, not forced progress";
    break: "Streak pauses, doesn't break - like hibernation";
  };
}

const calculateCompoundValue = (deposit: Deposit, user: UserWealth) => {
  const daysSinceDeposit = differenceInDays(new Date(), deposit.date);
  const dailyRate = user.interestRate / 365;
  
  // Compound formula: P(1 + r)^t
  const compoundValue = deposit.baseValue * Math.pow(1 + dailyRate, daysSinceDeposit);
  
  // Bonus for inspiring others
  const inspirationBonus = deposit.inspirationCount * 0.1;
  
  return compoundValue * (1 + inspirationBonus);
};
```

## Supporting Pipeline Systems

### Emergen-See - Crisis Management Support

```typescript
interface EmergenSee {
  positioning: "Emergency deposits when you can't make regular ones";
  
  activation: {
    trigger: "Crisis button in HeartBank";
    message: "My account is overdrawn, I need support";
    response: "Immediate banker comfort + human backup";
    framing: "Not failure, but wisdom to seek help";
  };
  
  support: {
    immediate: "Banker provides crisis-specific comfort";
    human: "Dvir/therapist within 10 minutes";
    duration: "Initial 10-minute stabilization";
    followUp: "Gentle check-in after 24 hours";
  };
  
  integration: {
    withHeartBank: "Crisis deposits count double";
    message: "Asking for help IS a deposit of courage";
    recovery: "Guided back to daily deposits when ready";
    record: "Crisis moments become growth markers";
  };
}
```

### HealingRow - Creative Sharing Space

```typescript
interface HealingRow {
  positioning: "The creative wing of your HeartBank";
  
  features: {
    storyTelling: {
      purpose: "Transform deposits into narratives";
      format: "Written stories, audio recordings, visual journeys";
      sharing: "Choose your audience carefully";
      banker: "Helps identify stories worth telling";
    };
    
    artSharing: {
      purpose: "Express deposits through creativity";
      mediums: "Drawings, paintings, collages, photos";
      tools: "Simple creative tools in web app";
      gallery: "Curated exhibitions of themed art";
    };
    
    circles: {
      purpose: "Small groups exploring deposits together";
      size: "6-8 people meeting weekly";
      focus: "Sharing deposit insights and patterns";
      facilitation: "Guided by experienced depositors";
    };
  };
}
```

### Love-Mark-It - Community to Reality

```typescript
interface LoveMarkIt {
  positioning: "Invest your emotional wealth in real-world kindness";
  
  philosophy: "You can only give from abundance";
  requirement: "Minimum 21 deposits before participating";
  
  investments: {
    emotional: "Listen to someone for 30 minutes";
    practical: "Help with groceries or errands";
    creative: "Make art for someone's healing";
    knowledge: "Teach what you've learned";
  };
  
  returns: {
    immediate: "Joy of giving from abundance";
    compound: "Kindness chains create more deposits";
    community: "Building wealth together";
    evidence: "Proof your healing helps others";
  };
}
```

## Technical Architecture

### Project Structure
```
togethernet/
├── packages/
│   ├── shared/                 # Shared logic
│   │   ├── services/
│   │   │   ├── BankerService.ts      # Core AI character
│   │   │   ├── ExerciseService.ts    # Daily exercises
│   │   │   ├── WealthService.ts      # Balance & interest
│   │   │   └── ReminderService.ts    # Gentle nudges
│   │   ├── types/
│   │   │   ├── Deposit.ts
│   │   │   ├── Exercise.ts
│   │   │   ├── Wealth.ts
│   │   │   └── Pipeline.ts
│   │   └── utils/
│   │       ├── RTLUtils.ts          # Hebrew support
│   │       ├── FibonacciUtils.ts    # Streak calculations
│   │       └── CompoundInterest.ts  # Wealth calculations
│   │
│   ├── mobile/                 # React Native app
│   │   ├── screens/
│   │   │   ├── HeartBank/           # Core experience
│   │   │   ├── DailyExercise/       # Morning ritual
│   │   │   ├── EmergenSee/          # Crisis support
│   │   │   ├── HealingRow/          # Creative sharing
│   │   │   └── LoveMarkIt/          # Kindness exchange
│   │   └── components/
│   │       ├── Banker/              # AI presence
│   │       ├── DepositForm/         # Input interface
│   │       ├── WealthDisplay/       # Balance viz
│   │       └── GentleReminders/     # Notification system
│   │
│   └── web/                    # React web app
│       ├── pages/
│       │   ├── HeartBank/           # Expanded view
│       │   ├── CreativeStudio/      # Art tools
│       │   └── Gallery/             # Community showcase
│       └── components/
│           ├── EmotionPainter/      # Drawing tool
│           ├── StoryWeaver/         # Narrative builder
│           └── MeditationSpace/     # Calming experiences
│
├── firebase/
│   ├── functions/              # Cloud functions
│   │   ├── dailyExercise.ts        # Publishes exercises
│   │   ├── compoundInterest.ts     # Calculates wealth
│   │   ├── reminders.ts            # Sends notifications
│   │   └── crisisDetection.ts      # Monitors safety
│   └── firestore.rules         # Security rules
│
└── scripts/
    ├── seedExercises.ts        # 365 daily exercises
    └── seedBankerResponses.ts  # Therapeutic responses
```

### Firebase Database Schema

```typescript
// Firestore Collections
interface Collections {
  users: {
    // User profile and settings
    uid: string;
    username: string;
    language: 'en' | 'he';
    wakeTime: string;
    timezone: string;
    pipelineStage: 'emergen-see' | 'healing-row' | 'heart-bank' | 'love-mark-it' | 'together-net';
  };
  
  heartbank: {
    // User wealth tracking
    userId: string;
    balance: number;
    streak: number;
    interestRate: number;
    lastDepositDate: Date;
    totalDeposits: number;
  };
  
  deposits: {
    // All deposits
    id: string;
    userId: string;
    category: DepositCategory;
    content: string;
    isPublic: boolean;
    value: number;
    currentValue: number; // With compound interest
    linkedExercise?: string;
    language: 'en' | 'he';
    createdAt: Date;
    inspirationCount: number;
  };
  
  exercises: {
    // Daily exercises
    date: string; // YYYY-MM-DD
    category: string;
    exercise: LocalizedString;
    bankerIntro: LocalizedString;
    levels: ExerciseLevels;
    completions: number;
  };
  
  emergensee: {
    // Crisis records (private)
    userId: string;
    timestamp: Date;
    resolved: boolean;
    supportProvided: string;
  };
  
  healingrow: {
    // Creative shares
    depositId: string;
    type: 'story' | 'art' | 'voice';
    mediaUrl?: string;
    content: string;
    circleId?: string;
  };
  
  lovemarkit: {
    // Kindness exchanges
    offerId: string;
    type: 'emotional' | 'practical' | 'creative' | 'knowledge';
    giver: string;
    receiver?: string;
    status: 'open' | 'matched' | 'complete';
    impact: string;
  };
  
  transparency: {
    // Financial transparency
    month: string; // YYYY-MM
    donations: number;
    expenses: ExpenseBreakdown;
    surplus: number;
    therapyScholarships: number;
  };
}
```

### Tech Stack

```javascript
// Shared Dependencies
{
  "typescript": "^5.0.0",
  "firebase": "^10.0.0",
  "date-fns": "^2.30.0",    // Date handling
  "i18next": "^23.0.0",     // Internationalization
}

// Mobile (React Native)
{
  "react-native": "0.72.0",
  "expo": "~49.0.0",
  "@react-navigation/native": "^6.0.0",
  "react-native-reanimated": "^3.0.0",  // Animations
  "expo-notifications": "^0.20.0",       // Reminders
  "react-native-gesture-handler": "^2.0.0",
  "react-native-i18n": "^2.0.0",        // Hebrew RTL
}

// Web (React)
{
  "react": "^18.0.0",
  "framer-motion": "^10.0.0",    // Animations
  "three.js": "^0.155.0",        // 3D visualizations
  "konva": "^9.0.0",             // Drawing tools
  "tone.js": "^14.0.0",          // Sound therapy
  "tailwindcss": "^3.0.0",
  "@emotion/styled": "^11.0.0",
}
```

## Development Priorities

### Phase 1: HeartBank Core (Weeks 1-3)
```typescript
// Priority tasks
const phase1 = {
  1: "Daily exercise system with 30 seed exercises",
  2: "Deposit form with 5 categories + banker responses",
  3: "Balance calculation and visual display",
  4: "Streak tracking with Fibonacci rewards",
  5: "Hebrew RTL perfect implementation",
  6: "Gentle reminder notifications",
  7: "Private vs public toggle",
  8: "Compound interest calculation system"
};
```

### Phase 2: Supporting Systems (Weeks 4-6)
```typescript
const phase2 = {
  1: "Emergen-See crisis button and flow",
  2: "HealingRow story sharing and circles",
  3: "Love-Mark-It basic kindness board",
  4: "TogetherNet unified feed",
  5: "Pipeline transition logic",
  6: "Community reactions system",
  7: "Radical transparency dashboard"
};
```

## Critical Implementation Details

### Hebrew RTL Support
```typescript
// Every component must handle RTL
import { I18nManager } from 'react-native';

const useRTL = () => {
  const { language } = useContext(LanguageContext);
  const isRTL = language === 'he';
  
  useEffect(() => {
    I18nManager.forceRTL(isRTL);
  }, [isRTL]);
  
  return {
    textAlign: isRTL ? 'right' : 'left',
    flexDirection: isRTL ? 'row-reverse' : 'row',
    writingDirection: isRTL ? 'rtl' : 'ltr',
    isRTL
  };
};
```

### Daily Exercise Publishing
```typescript
// Cloud function runs at 6 AM local time for each timezone
export const publishDailyExercise = functions.pubsub
  .schedule('0 6 * * *')
  .timeZone('Asia/Jerusalem') // Start with Israel
  .onRun(async (context) => {
    const exercise = await getExerciseForDate(new Date());
    
    // Publish to exercises collection
    await firestore.collection('exercises').doc(today).set(exercise);
    
    // Trigger notifications for users in this timezone
    await notifyUsersInTimezone('Asia/Jerusalem', exercise);
  });
```

### Anti-Addiction Patterns
```typescript
// Feed must stop naturally
const FEED_LIMIT = 5;
const REFRESH_COOLDOWN = 3 * 60 * 60 * 1000; // 3 hours

// No infinite scroll
<FlatList
  data={posts.slice(0, FEED_LIMIT)}
  scrollEnabled={posts.length <= FEED_LIMIT}
  ListFooterComponent={<DepositPrompt />} // Encourage creation
/>

// No red dots or badges
// No push notifications after 9 PM
// No "streaks about to break" anxiety
// Gentle stopping points every 3-5 posts
```

## Design System & Creative Values

### Color Palette
```typescript
const colors = {
  // Core sacred palette
  gold: '#FFD700',        // Banker, worth, wisdom, divine light
  turquoise: '#40E0D0',   // Healing, trust, emotional safety
  softWhite: '#FAFAFA',   // Space, possibility, pure potential
  warmBlack: '#1A1A1A',   // Depth, grounding, sacred darkness
  
  // Semantic colors
  deposit: '#FFD700',     // Gold for value accumulation
  crisis: '#40E0D0',      // Calming turquoise for safety
  success: '#4CAF50',     // Growth green for achievements
  gentle: '#FFF8DC',      // Soft cream for reminders
  
  // Seasonal adaptations
  winter: {
    primary: '#B8860B',   // Darker gold for protection
    accent: '#4682B4',    // Steel blue for resilience
  },
  spring: {
    primary: '#FFE55C',   // Lighter gold for growth
    accent: '#00CED1',    // Bright turquoise for renewal
  }
};
```

### Typography
```typescript
const typography = {
  // Headers - always lowercase, gentle
  h1: {
    fontSize: 28,
    fontWeight: '400',
    textTransform: 'lowercase',
    letterSpacing: 0.5,
    color: colors.gold
  },
  
  // Banker voice - slightly handwritten, therapeutic
  banker: {
    fontFamily: Platform.select({
      ios: 'Avenir-Light',
      android: 'Roboto-Light',
      web: 'Quicksand'
    }),
    fontSize: 18,
    lineHeight: 28,
    color: colors.gold,
    fontStyle: 'italic'
  },
  
  // Hebrew specific
  hebrew: {
    fontFamily: 'System',
    fontSize: 18,
    textAlign: 'right',
    writingDirection: 'rtl',
    letterSpacing: 0.2
  },
  
  // Exercise prompts
  prompt: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 30,
    textAlign: 'center'
  }
};
```

### Animations
```typescript
// Breathing animation for banker presence
const breathingAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// Gentle celebration for deposits
const celebrateDeposit = {
  initial: { scale: 0, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: { type: "spring", damping: 15 }
  }
};

// Compound interest visualization
const wealthGrowth = {
  scale: [1, 1.02, 1],
  rotate: [0, 1, 0],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "linear"
  }
};
```

## Love-Based Economics Implementation

### Radical Financial Transparency

```typescript
interface TransparencyDashboard {
  realTime: {
    monthlyDonations: number;
    monthlyExpenses: ExpenseBreakdown;
    currentBalance: number;
    therapyScholarshipsFunded: number;
  };
  
  historical: {
    totalLifetimeDonations: number;
    totalTherapyAccess: number;
    totalCrisisInterventions: number;
    totalKindnessExchanges: number;
  };
  
  breakdown: {
    emergenSeeSupport: "40% - Crisis intervention and support";
    healingRowScholarships: "30% - Community-funded therapy";
    platformDevelopment: "20% - Technology and security";
    communityChosen: "10% - Surplus to voted nonprofits";
  };
}

// Monthly community financial meetings
const CommunityFinancialMeeting = {
  frequency: "Monthly",
  transparency: "Complete expense breakdown",
  voting: "Surplus allocation by community",
  audit: "Independent quarterly reviews"
};
```

### Donation Categories

```typescript
const donationTiers = {
  sustainers: {
    seedPlanter: { amount: 5, emoji: "🌱", message: "Plants seeds of support" },
    gardenTender: { amount: 15, emoji: "🌸", message: "Helps kindness garden grow" },
    forestGuardian: { amount: 50, emoji: "🌳", message: "Protects healing forest" },
    lightKeeper: { amount: 100, emoji: "⭐", message: "Keeps light burning for those in darkness" }
  },
  
  gratitudeGifts: {
    coffee: { amount: 3, message: "The cost of a coffee, given with love" },
    appreciation: { amount: 10, message: "A gentle thank you for this safe space" },
    recognition: { amount: 25, message: "Appreciation for being here when I needed it" },
    custom: { message: "Whatever feels right from my heart" }
  }
};
```

## Testing Checklist

### Core HeartBank Functions
- [ ] Daily exercise publishes at 6 AM Israel time
- [ ] Exercise has 3 difficulty levels (beginner/intermediate/advanced)
- [ ] Deposits save with proper categorization and word count
- [ ] Balance calculates correctly with compound interest
- [ ] Streaks track with Fibonacci rewards (3, 8, 21, 55, 89)
- [ ] Interest compounds daily automatically
- [ ] Gentle reminders send appropriately (morning/afternoon/evening)
- [ ] Private/public toggle works correctly
- [ ] Banker responses feel therapeutic, not robotic

### Hebrew Support
- [ ] RTL layout displays perfectly across all screens
- [ ] Hebrew exercises feel native, not translated
- [ ] Banker responses culturally appropriate for Israeli users
- [ ] No text truncation issues with Hebrew characters
- [ ] Proper date/time formatting in Hebrew locale
- [ ] Navigation flows right-to-left correctly

### Pipeline Integration
- [ ] Emergen-See crisis detection works in both languages
- [ ] HealingRow creative sharing integrates with deposits
- [ ] Love-Mark-It requires minimum deposits before access
- [ ] TogetherNet feed shows cross-pipeline inspiration
- [ ] Pipeline transitions feel natural, not forced

### User Experience
- [ ] Daily deposit takes less than 5 minutes to complete
- [ ] Banker feels genuinely therapeutic and supportive
- [ ] No addictive patterns or manipulation tactics
- [ ] Natural stopping points after 3-5 feed items
- [ ] Celebrations feel genuine, not gamified

## Success Metrics to Track

```typescript
interface Analytics {
  heartbank: {
    dailyActiveDepositors: number;
    averageWordCount: number;
    exerciseCompletionRate: number;
    streakDistribution: number[];
    publicShareRate: number;
    compoundInterestGenerated: number;
  };
  
  transformation: {
    selfWorthIncrease: number; // Survey-based user reports
    securityImprovement: number; // Feeling emotionally stable
    boundaryMaintenance: number; // Keeping healthy boundaries
    agencyFeeling: number; // Control over personal narrative
    crisisToContribution: number; // Pipeline completion rate
  };
  
  engagement: {
    morningOpenRate: number; // Opening app for daily exercise
    reminderEffectiveness: number; // Response to gentle nudges
    depositsPerUser: number; // Average monthly deposits
    retentionDay7: number; // Week 1 retention
    retentionDay30: number; // Month 1 retention
    pipelineProgression: number; // Movement between stages
  };
  
  community: {
    publicSharingRate: number; // Private to public conversion
    reactionEngagement: number; // Meaningful community responses
    kindnessExchanges: number; // Love-Mark-It completions
    crisisSupported: number; // Emergen-See interventions
    therapyAccessCreated: number; // Scholarships funded
  };
  
  economics: {
    monthlyDonations: number;
    donorRetention: number;
    transparencyTrust: number; // User trust in financial reporting
    communityOwnership: number; // Participation in financial decisions
  };
}
```

## Common Development Tasks

### Adding a New Daily Exercise
```typescript
// In exercises/library.ts
const exercises: ExerciseLibrary = {
  gratitude: [
    {
      id: "gratitude-textures-001",
      theme: "Sensory Awareness",
      exercise: {
        en: "Notice three textures that feel good today",
        he: "שימו לב לשלושה מרקמים שמרגישים טוב היום"
      },
      bankerIntro: {
        en: "Your nervous system remembers pleasure, let's help it...",
        he: "המערכת העצבים שלך זוכרת הנאה, בוא נעזור לה..."
      },
      levels: {
        beginner: {
          en: "Name one soft thing you touched",
          he: "תן שם לדבר רך אחד שנגעת בו"
        },
        intermediate: {
          en: "Describe three textures in detail",
          he: "תאר שלושה מרקמים בפירוט"
        },
        advanced: {
          en: "Write about how textures connect to memories",
          he: "כתוב על איך מרקמים מתחברים לזיכרונות"
        }
      },
      prompts: {
        en: [
          "What texture surprised you with its pleasantness?",
          "Which fabric makes you feel most comfortable?",
          "What surface reminds you of safety?"
        ],
        he: [
          "איזה מרקם הפתיע אותך ברכות שלו?",
          "איזה בד גורם לך להרגיש הכי נוח?",
          "איזה משטח מזכיר לך ביטחון?"
        ]
      }
    }
  ]
};

// Seasonal adaptation example
const getSeasonalExercise = (baseExercise: Exercise, season: Season): Exercise => {
  switch(season) {
    case 'winter':
      return {
        ...baseExercise,
        bankerIntro: {
          en: "In winter, your nervous system needs extra gentleness...",
          he: "בחורף, המערכת העצבים שלך צריכה עדינות נוספת..."
        }
      };
    case 'spring':
      return {
        ...baseExercise,
        bankerIntro: {
          en: "Spring awakens new possibilities in your nervous system...",
          he: "האביב מעיר אפשרויות חדשות במערכת העצבים שלך..."
        }
      };
  }
};
```

### Creating a Deposit Component
```tsx
const DepositForm: React.FC = () => {
  const { exercise } = useDailyExercise();
  const { language } = useLanguage();
  const banker = useBanker();
  const { isRTL } = useRTL();
  
  const [content, setContent] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  
  const handleDeposit = async (deposit: DepositInput) => {
    // Save deposit with wealth mechanics
    const saved = await saveDeposit({
      ...deposit,
      linkedExercise: exercise.id,
      baseValue: calculateDepositValue(deposit.content),
      language
    });
    
    // Calculate new balance with compound interest
    await updateBalance(saved);
    
    // Get contextual banker response
    const response = banker.getDepositResponse({
      deposit: saved,
      isFirstDeposit: user.totalDeposits === 1,
      currentStreak: user.streak,
      category: deposit.category,
      exerciseCompleted: true
    });
    
    // Show celebration with gentle animation
    celebrate(response);
    
    // Update pipeline progression if applicable
    checkPipelineReadiness(user);
  };
  
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
  );
};
```

### Implementing Banker Responses
```typescript
class BankerResponseEngine {
  private getContextualResponse(context: ResponseContext): LocalizedString {
    const { user, deposit, currentState, timeOfDay } = context;
    
    // Crisis detection first
    if (this.detectsCrisis(deposit.content)) {
      return this.getCrisisResponse(context);
    }
    
    // Milestone celebrations
    if (this.isStreakMilestone(user.streak)) {
      return this.getStreakMilestoneResponse(user.streak, context.language);
    }
    
    // First deposit special treatment
    if (user.totalDeposits === 1) {
      return this.getFirstDepositResponse(context.language);
    }
    
    // Category-specific responses
    const categoryResponse = this.getCategoryResponse(deposit.category, context);
    
    // Add therapeutic elements
    return this.addTherapeuticElements(categoryResponse, context);
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
          "המערכת העצבים שלך לומדת שקיימים דברים טובים...",
          "איזו דרך יפה לשים לב לשפע...",
          "תודה שאתה מאמן את הלב שלך לראות מתנות..."
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
          "התמודדת עם משהו קשה ובחרת בצמיחה...",
          "כך נראה אומץ אמיתי..."
        ]
      },
      honesty: {
        en: [
          "The truth you're sharing is a sacred gift...",
          "Your willingness to be real is extraordinary...",
          "Thank you for trusting me with this honesty..."
        ],
        he: [
          "האמת שאתה חולק היא מתנה קדושה...",
          "הנכונות שלך להיות אמיתי היא יוצאת דופן...",
          "תודה שסמכת עליי עם הכנות הזו..."
        ]
      }
    };
    
    const categoryResponses = responses[category];
    const languageResponses = categoryResponses[context.language];
    
    // Select based on user patterns and randomization
    return this.selectBestResponse(languageResponses, context);
  }
  
  private addTherapeuticElements(baseResponse: string, context: ResponseContext): LocalizedString {
    // Add question mark therapy
    if (this.detectsSelfCriticism(context.deposit.content)) {
      const questionPrompt = context.language === 'he' 
        ? "מה אם נשאל שאלה על ההנחה הזו?"
        : "What if we put a question mark after that thought?";
      
      return `${baseResponse} ${questionPrompt}`;
    }
    
    // Add expansion-based elements
    if (this.detectsStruggle(context.deposit.content)) {
      const expansionPrompt = context.language === 'he'
        ? "מה כבר עובד בסיטואציה הזו, גם אם זה קטן?"
        : "What's already working in this situation, even if it's small?";
        
      return `${baseResponse} ${expansionPrompt}`;
    }
    
    return baseResponse;
  }
  
  private detectsCrisis(content: string): boolean {
    const crisisKeywords = {
      en: ['want to die', 'can\'t go on', 'no hope', 'end it all', 'worthless'],
      he: ['רוצה למות', 'לא יכול להמשיך', 'אין תקווה', 'חסר ערך']
    };
    
    // Sophisticated NLP would go here
    return this.containsKeywords(content, crisisKeywords);
  }
}
```

### Pipeline Transition Logic
```typescript
class PipelineTransitionService {
  checkReadinessForNextStage(user: User): PipelineStage | null {
    switch(user.currentStage) {
      case 'emergen-see':
        return this.checkEmergenSeeToHealingRow(user);
      case 'healing-row':
        return this.checkHealingRowToHeartBank(user);
      case 'heart-bank':
        return this.checkHeartBankToLoveMarkIt(user);
      case 'love-mark-it':
        return this.checkLoveMarkItToTogetherNet(user);
      default:
        return null;
    }
  }
  
  private checkEmergenSeeToHealingRow(user: User): 'healing-row' | null {
    const criteria = {
      stabilityIndicators: user.crisisResolved && user.lastCrisisDate > 48, // hours
      readinessSignals: user.expressedGrowthInterest,
      supportConnections: user.hasConnectedWithSupport
    };
    
    if (Object.values(criteria).every(Boolean)) {
      return 'healing-row';
    }
    return null;
  }
  
  private checkHealingRowToHeartBank(user: User): 'heart-bank' | null {
    const criteria = {
      circleParticipation: user.healingCircleAttendance > 0.7, // 70% attendance
      skillsDevelopment: user.completedLifeSkillsModules >= 2,
      readyForIndependence: user.expressesSelfManagementConfidence
    };
    
    if (Object.values(criteria).every(Boolean)) {
      return 'heart-bank';
    }
    return null;
  }
  
  private checkHeartBankToLoveMarkIt(user: User): 'love-mark-it' | null {
    const criteria = {
      depositConsistency: user.streak >= 21, // 3 weeks of deposits
      emotionalStability: user.averageDepositSentiment > 0.6,
      abundanceIndicated: user.expressedDesireToGive,
      balanceThreshold: user.heartBankBalance >= 100 // Wealth accumulation
    };
    
    if (Object.values(criteria).every(Boolean)) {
      return 'love-mark-it';
    }
    return null;
  }
  
  private checkLoveMarkItToTogetherNet(user: User): 'together-net' | null {
    const criteria = {
      serviceExperience: user.completedKindnessExchanges >= 5,
      communityConnection: user.receivedPositiveFeedback >= 10,
      leadershipReadiness: user.hasExpressedMentoringInterest,
      cyclicalHealing: user.hasHelpedOthersInCrisis
    };
    
    if (Object.values(criteria).every(Boolean)) {
      return 'together-net';
    }
    return null;
  }
  
  async inviteToNextStage(user: User, nextStage: PipelineStage) {
    const invitation = await this.generateInvitation(user, nextStage);
    
    // Send gentle invitation with banker presence
    await this.sendBankerInvitation(user, invitation);
    
    // Create transition celebration
    await this.createTransitionCelebration(user, nextStage);
    
    // Update user status to "invited" not "transitioned"
    await this.updateUserStatus(user.id, `invited-to-${nextStage}`);
  }
}
```

## Critical Reminders

1. **HeartBank is THE core** - Every feature supports daily deposits rebuilding self-worth
2. **Daily exercises drive engagement** - Must publish reliably at 6 AM Israel time
3. **Banker is therapeutic presence** - Not a chatbot, embodies Dvir's methodology
4. **Hebrew must feel native** - Not translated, culturally appropriate for Israelis
5. **Gentle always** - No shaming, no pressure, honors user's timing and readiness
6. **Anti-addiction design** - Natural stops, no manipulation, serves healing not engagement
7. **Worth is measurable** - Balance, streaks, compound interest create tangible progress
8. **Crisis is overdraft protection** - Not failure, but wisdom to seek help
9. **Pipeline respects readiness** - Never rush transitions, honor spiral growth
10. **Love-based economics** - Radical transparency, voluntary donations, community ownership

## The North Star

Every line of code should answer: **"Does this help someone rebuild their self-worth through daily deposits?"**

If not, it doesn't belong in the POC.

## Emergency Protocols

### Crisis Response Workflow
```typescript
const crisisResponseWorkflow = {
  immediate: {
    detection: "AI flags concerning language in deposits",
    bankerResponse: "Immediate therapeutic comfort within 30 seconds",
    humanEscalation: "Dvir notified within 5 minutes",
    userSupport: "Crisis chat initiated automatically"
  },
  
  follow_up: {
    hour1: "Check-in message with resources",
    day1: "Gentle follow-up from banker",
    week1: "Invitation to HealingRow support",
    ongoing: "Gentle monitoring without surveillance"
  }
};
```

### Technical Emergency Procedures
```typescript
const technicalEmergencies = {
  serverDown: {
    priority: "Restore crisis support functionality first",
    communication: "Immediate user notification about restoration timeline",
    backup: "Manual crisis support through alternative channels"
  },
  
  dataLoss: {
    priority: "Protect user privacy above data recovery",
    notification: "Transparent communication about what was lost",
    recovery: "Rebuild with user permission, never assume consent"
  }
};
```

## Development Environment Setup

### Quick Start Commands
```bash
# Create project
npx create-expo-app TogetherNet --template blank-typescript
cd TogetherNet

# Install core dependencies
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install firebase @react-native-firebase/app @react-native-firebase/auth
npm install @react-native-firebase/firestore @react-native-firebase/functions
npm install react-native-reanimated react-native-gesture-handler
npm install expo-notifications react-native-i18n

# Start development
npm start
```

### Firebase Setup Checklist
- [ ] Create Firebase project: "TogetherNet-Israel-POC"
- [ ] Enable Authentication (Anonymous + Email)
- [ ] Create Firestore Database (start in test mode)
- [ ] Set up Cloud Functions for daily exercises
- [ ] Configure FCM for gentle notifications
- [ ] Download and configure google-services.json
- [ ] Set up security rules prioritizing user privacy

---

**"Your worth is not broken - it's depleted. Let's rebuild it together, one deposit at a time."**  
*- Dvir Hillel Cohen Eraki, Founder*

---

*This CLAUDE.md serves as the complete development guide for building TogetherNet's revolutionary healing pipeline, ensuring every feature serves the sacred journey of rebuilding self-worth through daily practice.*