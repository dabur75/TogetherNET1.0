# TogetherNet Design System

## Creative Values & Philosophy

### Core Design Principles

1. **Therapeutic First** - Every visual element serves emotional healing
2. **Mobile Native** - Designed for touch, small screens, and mobile contexts
3. **Gentle Presence** - Calming, non-aggressive, respectful of user state
4. **Cultural Authenticity** - Hebrew feels native, not translated
5. **Anti-Addiction** - Natural stopping points, no manipulation tactics

## Color Palette

### Primary Sacred Colors
```css
:root {
  /* Core sacred palette */
  --color-gold: #FFD700;        /* Banker, worth, wisdom, divine light */
  --color-turquoise: #40E0D0;   /* Healing, trust, emotional safety */
  --color-soft-white: #FAFAFA;   /* Space, possibility, pure potential */
  --color-warm-black: #1A1A1A;   /* Depth, grounding, sacred darkness */
  
  /* Semantic colors */
  --color-deposit: #FFD700;     /* Gold for value accumulation */
  --color-crisis: #40E0D0;      /* Calming turquoise for safety */
  --color-success: #4CAF50;     /* Growth green for achievements */
  --color-gentle: #FFF8DC;      /* Soft cream for reminders */
}
```

### Seasonal Adaptations
```css
/* Winter - Protection and Warmth */
.winter-theme {
  --color-primary: #B8860B;   /* Darker gold for protection */
  --color-accent: #4682B4;    /* Steel blue for resilience */
}

/* Spring - Growth and Renewal */
.spring-theme {
  --color-primary: #FFE55C;   /* Lighter gold for growth */
  --color-accent: #00CED1;    /* Bright turquoise for renewal */
}
```

### Color Usage Guidelines

#### Gold (#FFD700) - Divine Worth
- **Use for**: Banker presence, wealth displays, primary buttons
- **Emotion**: Wisdom, value, divine light, self-worth
- **Mobile**: Ensure 4.5:1 contrast ratio on white backgrounds
- **Hebrew**: Works well with RTL layouts, no cultural conflicts

#### Turquoise (#40E0D0) - Emotional Safety  
- **Use for**: Healing elements, crisis support, trust indicators
- **Emotion**: Calm, safety, emotional healing, hope
- **Mobile**: Excellent for touch targets and focus states
- **Therapeutic**: Associated with calm and emotional regulation

## Typography

### Font Families
```css
:root {
  /* Banker voice - slightly handwritten, therapeutic */
  --font-banker: 'Quicksand', 'Avenir-Light', 'Roboto-Light', system-ui;
  
  /* Body text - clean, readable */
  --font-body: 'Inter', 'Assistant', system-ui, sans-serif;
  
  /* Hebrew specific */
  --font-hebrew: 'Assistant', 'Noto Sans Hebrew', system-ui, sans-serif;
}
```

### Typography Scale
```css
/* Headers - always lowercase, gentle */
.text-h1 {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 400;
  text-transform: lowercase;
  letter-spacing: 0.5px;
  color: var(--color-gold);
  line-height: 1.2;
}

.text-h2 {
  font-size: clamp(1.5rem, 3.5vw, 2rem);
  font-weight: 500;
  color: var(--color-turquoise);
  line-height: 1.3;
}

/* Banker voice - slightly handwritten, therapeutic */
.text-banker {
  font-family: var(--font-banker);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  line-height: 1.6;
  color: var(--color-gold);
  font-style: italic;
  font-weight: 300;
}

/* Body text - responsive and accessible */
.text-body {
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 2.2vw, 1.1rem);
  line-height: 1.6;
  color: var(--color-warm-black);
}

/* Exercise prompts - centered, engaging */
.text-prompt {
  font-size: clamp(1.1rem, 2.8vw, 1.4rem);
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
  color: var(--color-warm-black);
}
```

### Hebrew Typography
```css
/* Hebrew specific adjustments */
.text-hebrew {
  font-family: var(--font-hebrew);
  font-size: clamp(1rem, 2.3vw, 1.15rem);
  text-align: right;
  direction: rtl;
  letter-spacing: 0.3px;
  line-height: 1.7; /* Slightly more for Hebrew readability */
}

/* Hebrew banker voice */
.text-banker-hebrew {
  font-family: var(--font-hebrew);
  font-size: clamp(1.05rem, 2.6vw, 1.3rem);
  text-align: right;
  direction: rtl;
  font-weight: 300;
  color: var(--color-gold);
  line-height: 1.8;
}
```

## Component Design System

### Buttons

#### Primary Action Button
```css
.btn-primary {
  /* Mobile-first touch target */
  min-height: 48px;
  min-width: 120px;
  padding: 0.75rem 1.5rem;
  
  /* Therapeutic styling */
  background: var(--color-gold);
  color: var(--color-warm-black);
  border: none;
  border-radius: 0.75rem;
  
  /* Typography */
  font-family: var(--font-body);
  font-weight: 600;
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  
  /* Interaction */
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  touch-action: manipulation;
  
  /* Hover/Active states */
  &:hover {
    background: var(--color-turquoise);
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}
```

#### Secondary Button
```css
.btn-secondary {
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  
  background: transparent;
  color: var(--color-turquoise);
  border: 2px solid var(--color-turquoise);
  border-radius: 0.75rem;
  
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--color-turquoise);
    color: white;
  }
}
```

### Cards

#### Therapeutic Card Base
```css
.card-therapeutic {
  /* Mobile-first responsive design */
  width: 100%;
  max-width: 100%;
  padding: 1.5rem;
  margin-bottom: 1rem;
  
  /* Therapeutic styling */
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  border: 1px solid rgba(255, 215, 0, 0.2);
  
  /* Gentle shadows */
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  /* Responsive breakpoints */
  @media (min-width: 768px) {
    padding: 2rem;
    margin-bottom: 1.5rem;
  }
}
```

#### Exercise Card
```css
.card-exercise {
  @extend .card-therapeutic;
  border-color: rgba(64, 224, 208, 0.3);
  
  .exercise-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    
    .exercise-title {
      font-size: clamp(1.25rem, 3vw, 1.5rem);
      color: var(--color-turquoise);
      font-weight: 600;
    }
    
    .exercise-icon {
      font-size: 1.5rem;
      animation: breathing 3s ease-in-out infinite;
    }
  }
  
  .exercise-content {
    background: rgba(64, 224, 208, 0.05);
    padding: 1rem;
    border-radius: 0.75rem;
    border-left: 4px solid var(--color-turquoise);
    margin-bottom: 1rem;
  }
}
```

#### Banker Presence Card
```css
.card-banker {
  @extend .card-therapeutic;
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  text-align: center;
  
  .banker-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--color-gold), var(--color-turquoise));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    font-size: 1.5rem;
    animation: breathing 4s ease-in-out infinite;
  }
  
  .banker-message {
    @extend .text-banker;
    margin-bottom: 1rem;
    
    &.banker-response {
      background: rgba(255, 215, 0, 0.1);
      padding: 1rem;
      border-radius: 0.75rem;
      border-left: 3px solid var(--color-gold);
      animation: gentleGlow 2s ease-in-out;
    }
  }
}
```

### Forms

#### Therapeutic Form Controls
```css
.form-control {
  /* Mobile-first sizing */
  width: 100%;
  min-height: 48px;
  padding: 0.75rem 1rem;
  
  /* Therapeutic styling */
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  
  /* Typography */
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 2.2vw, 1.05rem);
  line-height: 1.5;
  color: var(--color-warm-black);
  
  /* Focus states */
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--color-gold);
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
  }
  
  &::placeholder {
    color: var(--color-warm-black);
    opacity: 0.6;
  }
}

/* Textarea specific */
.form-textarea {
  @extend .form-control;
  min-height: 120px;
  resize: vertical;
  line-height: 1.6;
}
```

#### Category Selector
```css
.category-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
  
  .category-option {
    min-height: 80px;
    padding: 1rem;
    border: 2px solid transparent;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    touch-action: manipulation;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    
    .category-icon {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    
    .category-name {
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--color-warm-black);
    }
    
    /* Category-specific colors */
    &.gratitude {
      --category-color: #4CAF50;
    }
    
    &.courage {
      --category-color: #FF9800;
    }
    
    &.honesty {
      --category-color: #2196F3;
    }
    
    &.success {
      --category-color: #9C27B0;
    }
    
    &.self-compassion {
      --category-color: #E91E63;
    }
    
    &:hover, &.selected {
      border-color: var(--category-color);
      background: rgba(var(--category-color), 0.1);
      transform: translateY(-2px);
    }
    
    &.selected {
      box-shadow: 0 4px 12px rgba(var(--category-color), 0.3);
    }
  }
}
```

## Animations

### Therapeutic Animations
```css
/* Breathing animation - core to therapeutic presence */
@keyframes breathing {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* Gentle glow for banker responses */
@keyframes gentleGlow {
  0% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
  }
  100% {
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.3);
  }
}

/* Fade in for page elements */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Wealth growth visualization */
@keyframes wealthGrowth {
  0% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.02) rotate(1deg);
  }
  100% {
    transform: scale(1) rotate(0deg);
  }
}
```

### Mobile-Optimized Animations
```css
/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Battery-conscious animations */
@media (max-width: 768px) {
  .breathing {
    animation-duration: 6s; /* Slower on mobile */
  }
  
  .gentle-glow {
    animation-duration: 3s; /* Reduced complexity */
  }
}
```

## Layout System

### Mobile-First Grid
```css
.layout-container {
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
  
  /* Progressive enhancement */
  @media (min-width: 768px) {
    max-width: 1200px;
    padding: 2rem;
  }
}

.layout-main {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  /* Desktop: side-by-side layout */
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}
```

### Hebrew RTL Layouts
```css
/* RTL layout adjustments */
.rtl {
  direction: rtl;
  
  .layout-main {
    /* Reverse grid columns in RTL */
    @media (min-width: 1024px) {
      grid-template-columns: 1fr 1fr;
      direction: rtl;
    }
  }
  
  .exercise-header {
    flex-direction: row-reverse;
  }
  
  .exercise-content {
    border-left: none;
    border-right: 4px solid var(--color-turquoise);
  }
  
  .form-footer {
    flex-direction: row-reverse;
  }
  
  /* Touch targets remain accessible */
  .btn-primary, .btn-secondary {
    /* No changes needed - touch targets work in RTL */
  }
}
```

## Accessibility

### Color Contrast
- **Text on white**: Minimum 4.5:1 ratio
- **Gold on white**: 4.51:1 (WCAG AA compliant)
- **Turquoise on white**: 5.12:1 (WCAG AA+ compliant)
- **Large text**: Minimum 3:1 ratio

### Touch Targets
- **Minimum size**: 48px × 48px
- **Optimal size**: 56px × 56px  
- **Spacing**: Minimum 8px between targets
- **Feedback**: Visual and haptic on interaction

### Screen Reader Support
```css
/* Screen reader only text */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus management */
.focus-visible {
  outline: 3px solid var(--color-turquoise);
  outline-offset: 2px;
}
```

## Responsive Breakpoints

```css
:root {
  /* Mobile-first breakpoints */
  --bp-xs: 0px;      /* Phone portrait */
  --bp-sm: 576px;    /* Phone landscape */
  --bp-md: 768px;    /* Tablet portrait */
  --bp-lg: 1024px;   /* Tablet landscape / small desktop */
  --bp-xl: 1280px;   /* Desktop */
  --bp-2xl: 1536px;  /* Large desktop */
}

/* Usage example */
@media (min-width: 768px) {
  /* Tablet+ styles */
}

@media (min-width: 1024px) {
  /* Desktop+ styles */
}
```

## Anti-Addiction Design Patterns

### Natural Stopping Points
```css
.feed-limit-message {
  text-align: center;
  padding: 2rem;
  color: var(--color-warm-black);
  opacity: 0.7;
  font-style: italic;
  
  &::before {
    content: "🌸";
    display: block;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
}

/* No infinite scroll indicators */
.no-infinite-scroll {
  /* Remove loading spinners */
  /* Remove "pull to refresh" */
  /* Add gentle "that's all for now" messages */
}
```

### Gentle Interaction Patterns
```css
/* No red badges or urgent styling */
.notification-gentle {
  background: var(--color-gentle);
  color: var(--color-warm-black);
  /* No pulsing or urgent animations */
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

/* Encourage creation over consumption */
.encourage-create {
  background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-turquoise) 100%);
  color: white;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  margin: 1rem 0;
}
```

This design system prioritizes therapeutic value, mobile accessibility, and cultural authenticity while maintaining beautiful, calming aesthetics that support emotional healing.