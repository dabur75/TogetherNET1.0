# CLAUDE.md - TogetherNet Development Rules

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
**Platform Strategy**: Responsive Web-First with Mobile-Optimized Design (React Native Future Phase)
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

## Critical Development Rules

### 1. Mobile-First Always
- Every interface must work perfectly on mobile devices
- Touch-optimized interactions and responsive design
- Battery-conscious animations and haptic feedback
- Test on real devices, not just browser dev tools

### 2. Hebrew RTL Excellence
- Native Hebrew experience, not translated English
- Cultural sensitivity for Israeli therapeutic practices
- Proper RTL layout for all components
- Test with Hebrew content in all interfaces

### 3. Therapeutic Integrity
- Embody Dvir's expansion-based methodology
- "What's working" focus over "what's broken"
- Gentle curiosity instead of harsh judgment
- Crisis safety always takes priority

### 4. Anti-Addiction Patterns
- No infinite scroll or manipulation tactics
- Natural stopping points every 3-5 posts
- Gentle reminders, never pushy notifications
- Respect user agency and boundaries

### 5. Performance Standards
- PWA must load in <2 seconds on 3G
- Bundle size under 3MB for mobile
- Offline-first architecture with sync
- Battery and bandwidth consciousness

## Workflow Requirements

### Documentation Updates
- **Technical details**: Use docs/ directory (ARCHITECTURE.md, DESIGN_SYSTEM.md, DEVELOPMENT_GUIDE.md)
- **Session tracking**: Use sessions/ directory for progress history
- **Task management**: Update TASKS.md immediately after completing work
- **Keep CLAUDE.md**: For rules and workflow only, not technical documentation

### Task Review Protocol
- **After completing work**: Write a short task review summarizing accomplishments
- **Session documentation**: Add comprehensive session details to sessions/SESSION_HISTORY.md
- **Task tracking**: Create task review files in /tasks directory with format: `/tasks/YYYY-MM-DD-session-summary.md`
- **Review content**: Include key accomplishments, technical progress, bug fixes, and next priorities

### Code Standards
- **TypeScript**: Strict mode, comprehensive interfaces
- **Component design**: Mobile-first, therapeutic UX principles
- **Testing**: Real device testing for Hebrew RTL and mobile performance
- **Security**: No secrets in code, therapeutic confidentiality respected

### Git Workflow
- **Meaningful commits**: Clear descriptions of therapeutic features
- **Branch protection**: No direct pushes to main
- **Code review**: Ensure therapeutic value and mobile performance
- **Deploy safely**: Staging before production

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
}
```

### Technical Emergency Procedures
- **Server Down**: Restore crisis support functionality first
- **Data Loss**: Protect user privacy above data recovery
- **Security Breach**: Immediate user notification, transparent communication

## The North Star

Every line of code should answer: **"Does this help someone rebuild their self-worth through daily deposits?"**

If not, it doesn't belong in the POC.

## Quick Reference

### Key Files
- **PLANNING.md**: Project roadmap and milestones
- **TASKS.md**: Current task status and priorities
- **docs/ARCHITECTURE.md**: Technical specifications and code examples
- **docs/DESIGN_SYSTEM.md**: UI/UX guidelines and components
- **docs/DEVELOPMENT_GUIDE.md**: Common development tasks and setup
- **sessions/SESSION_HISTORY.md**: Development progress and session summaries

### Development Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Test Hebrew RTL
# (Test on real mobile devices)

# Deploy staging
npm run deploy:staging
```

### Critical Reminders
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

---

**"Your worth is not broken - it's depleted. Let's rebuild it together, one deposit at a time."**
*- Dvir Hillel Cohen Eraki, Founder*

---

*This CLAUDE.md contains essential development rules and workflow. For technical details, see docs/ directory. For session history, see sessions/ directory.*
