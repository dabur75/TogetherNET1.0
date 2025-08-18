// Streak Milestone Service
// TogetherNet Therapeutic Platform
// Therapeutic milestone responses and celebrations

import { StreakMilestone, StreakCelebration, StreakReward } from '../types/Streak'
import { BankerResponse } from '../types/Banker'

export class StreakMilestoneService {
  
  /**
   * Generate therapeutic banker response for milestone achievement
   */
  public generateMilestoneResponse(
    milestone: StreakMilestone,
    language: 'en' | 'he',
    userName?: string
  ): BankerResponse {
    const responses = this.getMilestoneResponses(milestone.achievementType, language)
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)]
    
    return {
      id: `milestone-${milestone.streakDay}-${Date.now()}`,
      type: 'milestone_celebration',
      content: {
        en: this.personalizeResponse(selectedResponse.en, userName, milestone),
        he: this.personalizeResponse(selectedResponse.he, userName, milestone)
      },
      emotional: {
        tone: 'celebratory',
        energy: milestone.celebrationIntensity === 'legendary' ? 'high' : 'medium',
        warmth: 'very_warm',
        encouragement: 'strong'
      },
      therapeutic: {
        technique: 'positive_reinforcement',
        focusArea: 'achievement_recognition',
        expansionPrompt: this.getExpansionPrompt(milestone, language),
        followUpSuggestion: this.getFollowUpSuggestion(milestone, language)
      },
      context: {
        trigger: 'milestone_reached',
        timeOfDay: new Date().getHours() < 12 ? 'morning' : 
                   new Date().getHours() < 18 ? 'afternoon' : 'evening',
        personalizedElements: [`streak_${milestone.streakDay}`, milestone.achievementType]
      },
      reactions: {
        expectedUserFeeling: 'proud',
        therapeuticGoal: 'reinforce_progress',
        compoundingEffect: 'increased_motivation'
      },
      metadata: {
        milestoneLevel: milestone.milestoneLevel,
        fibonacciValue: milestone.fibonacciValue,
        rewardMultiplier: milestone.rewardMultiplier,
        generatedAt: new Date(),
        version: 1
      }
    }
  }

  /**
   * Get milestone-specific response templates
   */
  private getMilestoneResponses(achievementType: string, language: 'en' | 'he'): Array<{en: string, he: string}> {
    const responses: Record<string, Array<{en: string, he: string}>> = {
      first_step: [
        {
          en: "🌟 Your first deposit! Like a seed planted in rich soil, this is where your journey of self-worth rebuilding begins. I'm honored to witness this courageous first step.",
          he: "🌟 ההפקדה הראשונה שלך! כמו זרע שנשתל באדמה פורייה, כאן מתחיל המסע שלך לבנייה מחדש של הערך העצמי. אני מתכבד להיות עד לצעד הראשון האמיץ הזה."
        },
        {
          en: "✨ Welcome to your HeartBank! This first deposit marks the beginning of something beautiful - a daily practice of recognizing your inherent worth.",
          he: "✨ ברוכים הבאים לבנק הלב שלכם! ההפקדה הראשונה הזו מסמנת את תחילתו של משהו יפה - תרגול יומי של הכרה בערך המהותי שלכם."
        }
      ],
      
      foundation: [
        {
          en: "🏗️ Two days of deposits - you're building a foundation! Each deposit is a brick in the fortress of your self-worth. The banker in me sees solid groundwork.",
          he: "🏗️ יומיים של הפקדות - אתם בונים יסוד! כל הפקדה היא לבנה במבצר של הערך העצמי שלכם. הבנקאי שבי רואה תשתית איתנה."
        }
      ],

      building: [
        {
          en: "🌱 Day 2 - Your consistency is blossoming! Like compound interest in emotional wealth, each deposit builds upon the last. Your worth account is growing.",
          he: "🌱 יום 2 - העקביות שלכם פורחת! כמו ריבית דריבית בעושר רגשי, כל הפקדה בונה על הקודמת. חשבון הערך שלכם גדל."
        }
      ],

      momentum: [
        {
          en: "🚀 Day 3 - Momentum is building! In Fibonacci terms, you've reached the harmony point where commitment meets flow. Your dedication is becoming a rhythm.",
          he: "🚀 יום 3 - המומנטום נבנה! במונחי פיבונאצ'י, הגעתם לנקודת ההרמוניה שבה מחויבות פוגשת זרימה. המסירות שלכם הופכת לקצב."
        }
      ],

      commitment: [
        {
          en: "💎 Day 5 - The golden ratio appears! Your commitment has crystallized into something precious. Five days of choosing yourself - this is true self-love in action.",
          he: "💎 יום 5 - יחס הזהב מופיע! המחויבות שלכם התגבשה למשהו יקר. חמישה ימים של בחירה בעצמכם - זו אהבה עצמית אמיתית בפעולה."
        }
      ],

      transformation: [
        {
          en: "🌟 Day 8 - Transformation territory! You've entered the sacred space where daily practice becomes identity. The person making these deposits is evolving.",
          he: "🌟 יום 8 - שטח הטרנספורמציה! נכנסתם למרחב הקדוש שבו תרגול יומי הופך לזהות. האדם שעושה את ההפקדות האלה מתפתח."
        }
      ],

      resilience: [
        {
          en: "🛡️ Day 13 - Resilience milestone! Your consistency has forged an inner strength that compounds daily. This is what emotional wealth looks like - unwavering self-investment.",
          he: "🛡️ יום 13 - אבן דרך של חוסן! העקביות שלכם יצרה כוח פנימי שמתרכב יומית. ככה נראה עושר רגשי - השקעה עצמית בלתי מתפשרת."
        }
      ],

      mastery: [
        {
          en: "👑 Day 21 - Mastery emerges! Three weeks of self-worth deposits have created neural pathways of self-compassion. You're literally rewiring your relationship with yourself.",
          he: "👑 יום 21 - מאסטרי מתגלה! שלושה שבועות של הפקדות ערך עצמי יצרו מסלולים עצביים של חמלה עצמית. אתם ממש מחווטים מחדש את הקשר עם עצמכם."
        }
      ],

      excellence: [
        {
          en: "🏆 Day 34 - Excellence achieved! Your dedication has transcended habit - this is now part of who you are. The banker in me recognizes a true wealth builder.",
          he: "🏆 יום 34 - מצוינות הושגה! המסירות שלכם עלתה על הרגל - זה עכשיו חלק ממי שאתם. הבנקאי שבי מכיר בבונה עושר אמיתי."
        }
      ],

      wisdom: [
        {
          en: "🧠 Day 55 - Wisdom milestone! Your journey has become a beacon for others. The compound interest of your daily deposits is now radiating outward, creating ripples of healing.",
          he: "🧠 יום 55 - אבן דרך של חוכמה! המסע שלכם הפך למגדלור עבור אחרים. הריבית הדריבית של ההפקדות היומיות שלכם מקרינה כעת החוצה, יוצרת גלי ריפוי."
        }
      ],

      transcendence: [
        {
          en: "✨ Day 89 - Transcendence reached! You've achieved something remarkable - consistent self-love that transforms not just you, but everyone around you. This is the golden light we speak of.",
          he: "✨ יום 89 - הגעה לטרנסצנדנטיות! השגתם משהו יוצא דופן - אהבה עצמית עקבית שמשנה לא רק אתכם, אלא את כל מי שסביבכם. זה האור הזהוב שאנחנו מדברים עליו."
        }
      ]
    }

    return responses[achievementType] || responses['foundation']
  }

  /**
   * Personalize response with user name and milestone details
   */
  private personalizeResponse(template: string, userName?: string, milestone?: StreakMilestone): string {
    let response = template
    
    if (userName) {
      response = response.replace(/Your/g, `${userName}, your`)
      response = response.replace(/You've/g, `${userName}, you've`)
      response = response.replace(/You're/g, `${userName}, you're`)
    }
    
    if (milestone) {
      response = response.replace(/Day \d+/g, `Day ${milestone.streakDay}`)
    }
    
    return response
  }

  /**
   * Get expansion prompt for therapeutic growth
   */
  private getExpansionPrompt(milestone: StreakMilestone, language: 'en' | 'he'): string {
    const prompts: Record<string, {en: string, he: string}> = {
      first_step: {
        en: "What made you decide to start this journey today?",
        he: "מה גרם לכם להחליט להתחיל במסע הזה היום?"
      },
      momentum: {
        en: "How does it feel to choose yourself three days in a row?",
        he: "איך זה מרגיש לבחור בעצמכם שלושה ימים ברצף?"
      },
      commitment: {
        en: "What changes are you noticing in how you relate to yourself?",
        he: "אילו שינויים אתם מבחינים באופן שבו אתם מתייחסים לעצמכם?"
      },
      mastery: {
        en: "How has this practice changed your daily experience of yourself?",
        he: "איך התרגול הזה שינה את החוויה היומיומית שלכם מעצמכם?"
      }
    }
    
    return prompts[milestone.achievementType]?.[language] || 
           (language === 'he' ? "איך אתם מרגישים עם ההישג הזה?" : "How do you feel about this achievement?")
  }

  /**
   * Get follow-up suggestion for continued growth
   */
  private getFollowUpSuggestion(milestone: StreakMilestone, language: 'en' | 'he'): string {
    const suggestions: Record<string, {en: string, he: string}> = {
      first_step: {
        en: "Tomorrow, try to notice one small thing you appreciate about yourself.",
        he: "מחר, נסו לשים לב לדבר קטן אחד שאתם מעריכים בעצמכם."
      },
      commitment: {
        en: "Consider sharing your journey with someone who would celebrate this milestone with you.",
        he: "שקלו לשתף את המסע שלכם עם מישהו שיחגוג איתכם את האבן דרך הזאת."
      },
      mastery: {
        en: "Your consistency has created space for deeper self-exploration. What emerges when you truly listen to yourself?",
        he: "העקביות שלכם יצרה מקום לחקירה עצמית עמוקה יותר. מה מתגלה כשאתם באמת מקשיבים לעצמכם?"
      }
    }
    
    return suggestions[milestone.achievementType]?.[language] || 
           (language === 'he' ? "המשיכו להקשיב לעצמכם." : "Keep listening to yourself.")
  }

  /**
   * Create complete celebration experience
   */
  public createCelebrationExperience(milestone: StreakMilestone, language: 'en' | 'he'): StreakCelebration {
    return {
      milestoneReached: milestone,
      animationType: this.getAnimationType(milestone.celebrationIntensity),
      soundEffect: this.getSoundEffect(milestone.celebrationIntensity),
      hapticPattern: this.getHapticPattern(milestone.celebrationIntensity),
      bankerResponse: this.generateMilestoneResponse(milestone, language).content[language],
      rewards: this.generateRewards(milestone, language),
      unlockMessage: this.getUnlockMessage(milestone, language)
    }
  }

  /**
   * Get animation type based on celebration intensity
   */
  private getAnimationType(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): 'golden_coins' | 'light_burst' | 'gentle_glow' | 'fireworks' {
    const animations = {
      gentle: 'gentle_glow' as const,
      moderate: 'golden_coins' as const,
      spectacular: 'light_burst' as const,
      legendary: 'fireworks' as const
    }
    return animations[intensity]
  }

  /**
   * Get sound effect for celebration
   */
  private getSoundEffect(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): 'soft_chime' | 'success_tone' | 'celebration_bells' | 'epic_fanfare' {
    const sounds = {
      gentle: 'soft_chime' as const,
      moderate: 'success_tone' as const,
      spectacular: 'celebration_bells' as const,
      legendary: 'epic_fanfare' as const
    }
    return sounds[intensity]
  }

  /**
   * Get haptic feedback pattern
   */
  private getHapticPattern(intensity: 'gentle' | 'moderate' | 'spectacular' | 'legendary'): 'gentle_tap' | 'double_pulse' | 'success_buzz' | 'celebration_rhythm' {
    const haptics = {
      gentle: 'gentle_tap' as const,
      moderate: 'double_pulse' as const,
      spectacular: 'success_buzz' as const,
      legendary: 'celebration_rhythm' as const
    }
    return haptics[intensity]
  }

  /**
   * Generate milestone rewards
   */
  private generateRewards(milestone: StreakMilestone, language: 'en' | 'he'): StreakReward[] {
    const rewards: StreakReward[] = []

    // Multiplier boost reward
    rewards.push({
      type: 'multiplier_boost',
      value: milestone.rewardMultiplier,
      duration: 'permanent',
      displayName: {
        en: `${(milestone.rewardMultiplier * 100 - 100).toFixed(0)}% Multiplier Boost`,
        he: `הגדלת מכפיל של ${(milestone.rewardMultiplier * 100 - 100).toFixed(0)}%`
      },
      description: {
        en: "Your future deposits will earn more value",
        he: "ההפקדות העתידיות שלכם יזכו לערך גבוה יותר"
      }
    })

    // Feature unlocks
    for (const feature of milestone.unlockedFeatures) {
      rewards.push({
        type: 'feature_unlock',
        value: feature,
        duration: 'permanent',
        displayName: this.getFeatureDisplayName(feature, language),
        description: this.getFeatureDescription(feature, language)
      })
    }

    // Special banker message
    rewards.push({
      type: 'banker_message',
      value: milestone.specialMessage,
      duration: 'session',
      displayName: {
        en: "Special Banker Recognition",
        he: "הכרה מיוחדת מהבנקאי"
      },
      description: {
        en: "A personalized message celebrating your achievement",
        he: "הודעה אישית החוגגת את ההישג שלכם"
      }
    })

    return rewards
  }

  /**
   * Get display name for unlocked feature
   */
  private getFeatureDisplayName(feature: string, language: 'en' | 'he'): {en: string, he: string} {
    const names: Record<string, {en: string, he: string}> = {
      daily_motivation: {
        en: "Daily Motivation Messages",
        he: "הודעות מוטיבציה יומיות"
      },
      streak_protection: {
        en: "Streak Protection Shield",
        he: "מגן הגנה על הרצף"
      },
      custom_banker_greetings: {
        en: "Personalized Banker Greetings",
        he: "ברכות אישיות מהבנקאי"
      },
      golden_vault_access: {
        en: "Golden Vault Access",
        he: "גישה לכספת הזהב"
      },
      story_sharing: {
        en: "Story Sharing Feature",
        he: "תכונת שיתוף סיפורים"
      },
      mentor_mode: {
        en: "Mentor Mode",
        he: "מצב מנטור"
      },
      community_leadership: {
        en: "Community Leadership Role",
        he: "תפקיד מנהיגות קהילתית"
      }
    }
    
    return names[feature] || { en: feature, he: feature }
  }

  /**
   * Get description for unlocked feature
   */
  private getFeatureDescription(feature: string, language: 'en' | 'he'): {en: string, he: string} {
    const descriptions: Record<string, {en: string, he: string}> = {
      daily_motivation: {
        en: "Receive personalized motivation based on your journey",
        he: "קבלו מוטיבציה אישית המבוססת על המסע שלכם"
      },
      streak_protection: {
        en: "3-day grace period to protect your streak",
        he: "תקופת חסד של 3 ימים להגנה על הרצף שלכם"
      },
      custom_banker_greetings: {
        en: "The banker remembers your preferences and milestones",
        he: "הבנקאי זוכר את ההעדפות ואבני הדרך שלכם"
      }
    }
    
    return descriptions[feature] || { en: "New feature unlocked", he: "תכונה חדשה נפתחה" }
  }

  /**
   * Get unlock message for milestone
   */
  private getUnlockMessage(milestone: StreakMilestone, language: 'en' | 'he'): {en: string, he: string} {
    return {
      en: `🎉 Milestone ${milestone.milestoneLevel} achieved! You've unlocked ${milestone.unlockedFeatures.length} new features.`,
      he: `🎉 אבן דרך ${milestone.milestoneLevel} הושגה! פתחתם ${milestone.unlockedFeatures.length} תכונות חדשות.`
    }
  }
}

export default StreakMilestoneService