# TogetherNet Technical Architecture

## System Overview

TogetherNet is a mobile-first Progressive Web App (PWA) built on React + TypeScript with Firebase backend, designed for therapeutic healing through daily self-worth deposits.

## Core Systems

### HeartBank - The Core System

#### Daily Exercise Engine

```typescript
// Published every morning at 6 AM local time
interface DailyExercise {
  id: string;
  date: Date;
  category: 'gratitude' | 'courage' | 'honesty' | 'success' | 'self-compassion';
  theme: string;
  exercise: LocalizedString;
  bankerIntro: LocalizedString;
  levels: {
    beginner: LocalizedString;
    intermediate: LocalizedString;
    advanced: LocalizedString;
  };
  prompts: LocalizedString[];
  timing: {
    publishTime: "6 AM local time (adjustable)";
    notification: "Gentle wake-up with exercise preview";
    reminder: "Soft nudge at chosen time if not completed";
    expiry: "Available all day, new one tomorrow";
  };
}
```

#### The Five Pillars of Deposits

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

#### Deposit System Architecture

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

### Banker AI System

#### Therapeutic Response Engine

```typescript
class BankerService {
  // Core responses for each context
  private responses = {
    firstDeposit: {
      en: "Welcome to your HeartBank. This first deposit is precious.",
      he: "ברוכים הבאים לבנק הלב שלכם. ההפקדה הראשונה הזו יקרת ערך."
    },
    
    dailyExerciseComplete: {
      en: "Thank you for trusting me with today's exercise.",
      he: "תודה שסמכתם עליי עם התרגיל של היום."
    },
    
    streakMilestone: {
      3: { en: "Three days! Your seedling is planted 🌱" },
      8: { en: "Eight days! Your roots are growing 🌿" },
      21: { en: "Twenty-one days! Your flower is blooming 🌸" },
      55: { en: "Fifty-five days! Your tree stands strong 🌳" }
    },
    
    crisisResponse: {
      en: "I can feel how much pain you're in. You're not alone.",
      he: "אני מרגיש כמה כאב אתם חווים. אתם לא לבד."
    },
    
    // Therapeutic methodology responses
    expansionBased: {
      en: "What if we questioned that assumption about yourself?",
      he: "מה אם נשאל שאלה על ההנחה הזו על עצמכם?"
    },
    
    vulnerabilityCelebration: {
      en: "Thank you for sharing this precious gem with me",
      he: "תודה שחלקתם איתי את האבן היקרה הזו"
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

## Technical Infrastructure

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
│   ├── web/                    # React PWA
│   │   ├── pages/
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

// Web (React PWA)
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

## Mobile-First Implementation Details

### Hebrew RTL Support
```typescript
// Every component must handle RTL
import { I18nManager } from 'react-native';

const useRTL = () => {
  const { language } = useContext(LanguageContext);
  const isRTL = language === 'he';
  
  useEffect(() => {
    // Set document direction for proper mobile keyboard and input behavior
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = isRTL ? 'he' : 'en';
  }, [isRTL]);
  
  return {
    dir: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
    css: css`
      direction: ${isRTL ? 'rtl' : 'ltr'};
      text-align: ${isRTL ? 'right' : 'left'};
      
      /* Mobile-specific RTL optimizations */
      @media (max-width: 768px) {
        input, textarea {
          text-align: ${isRTL ? 'right' : 'left'};
          direction: ${isRTL ? 'rtl' : 'ltr'};
        }
        
        font-family: ${isRTL ? 
          'system-ui, -apple-system, "Segoe UI", "Noto Sans Hebrew"' : 
          'system-ui, -apple-system, "Segoe UI"'
        };
      }
    `,
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

## Performance Optimization

### Mobile-First PWA
- Bundle size under 3MB
- Initial load <2 seconds on 3G
- Offline-first with IndexedDB
- Service worker caching
- Battery-conscious animations

### Database Optimization
- Firestore composite indexes
- Pagination for mobile bandwidth
- Offline-first sync strategy
- Compressed image uploads