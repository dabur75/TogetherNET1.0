import { css } from '@emotion/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import {
  DepositCategory,
  DepositFormState,
  DepositInput,
  calculateDepositValue,
  depositCategories,
  getCategory,
  validateDeposit,
} from '../../../shared/types/Deposit'
import { Exercise } from '../../../shared/types/Exercise'
import { useLanguage } from '../hooks/useLanguage'
import ExerciseSummaryCard from './ExerciseSummaryCard'
import ExpandedExerciseCard from './ExpandedExerciseCard'
import CategoryCurrencySelector from './CategoryCurrencySelector'

const depositFormStyles = css`
  /* Mobile-first deposit form */
  .deposit-form {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(15px);
    border-radius: 1rem;
    padding: 1.5rem;
    border: 2px solid rgba(255, 215, 0, 0.2);
    box-shadow: var(--shadow-gentle);
    transition: all 0.3s ease;
    overflow: hidden; /* Prevent content overflow */
    max-width: 100%; /* Ensure form doesn't exceed container */

    &.focused {
      border-color: var(--color-gold);
      box-shadow: var(--shadow-banker);
    }

    @media (min-width: 768px) {
      padding: 2rem;
    }

    /* Extra small mobile devices */
    @media (max-width: 375px) {
      padding: 1rem;
      border-radius: 0.75rem;
    }
  }

  /* Form header */
  .form-header {
    margin-bottom: 1.5rem;
    text-align: center;

    .form-title {
      font-size: 1.25rem;
      color: var(--color-gold);
      font-weight: 600;
      margin-bottom: 0.5rem;
      font-family: var(--font-banker);

      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .form-subtitle {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      line-height: 1.4;
    }
  }

  /* Category selector - mobile swipe-friendly */
  .category-selector {
    margin-bottom: 1.5rem;

    .category-label {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      margin-bottom: 0.75rem;
      font-weight: 500;
    }

    .category-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;

      @media (min-width: 480px) {
        grid-template-columns: repeat(3, 1fr);
      }

      @media (min-width: 768px) {
        grid-template-columns: repeat(5, 1fr);
      }
    }

    .category-button {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem 0.5rem;
      border: 2px solid transparent;
      border-radius: 0.75rem;
      background: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s ease;
      touch-action: manipulation;
      position: relative;

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-gentle);
      }

      &:active {
        transform: translateY(0);
      }

      &.selected {
        border-color: var(--category-color);
        background: rgba(var(--category-color-rgb), 0.1);
        transform: scale(1.05);
      }

      .category-icon {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;

        @media (min-width: 768px) {
          font-size: 1.75rem;
        }
      }

      .category-name {
        font-size: 0.8rem;
        font-weight: 500;
        text-align: center;
        line-height: 1.2;

        @media (min-width: 768px) {
          font-size: 0.9rem;
        }
      }

      /* Ripple effect for mobile touch */
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 215, 0, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
      }
    }
  }

  /* Main text area - mobile optimized */
  .deposit-input-area {
    margin-bottom: 1.5rem;
    position: relative;

    .input-label {
      font-size: 0.9rem;
      color: var(--color-warm-black);
      margin-bottom: 0.75rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .linked-exercise-indicator {
        background: var(--color-turquoise);
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        font-size: 0.7rem;
        font-weight: 600;
      }
    }

    .deposit-textarea {
      width: 100%;
      min-height: 120px;
      padding: 1rem;
      border: 2px solid rgba(255, 215, 0, 0.3);
      border-radius: 0.75rem;
      font-family: inherit;
      font-size: 1rem;
      line-height: 1.6;
      resize: vertical;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);

      /* Mobile optimizations */
      -webkit-appearance: none;
      -webkit-tap-highlight-color: transparent;

      @media (min-width: 768px) {
        min-height: 150px;
        font-size: 1.1rem;
      }

      &:focus {
        outline: none;
        border-color: var(--color-gold);
        box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
        background: white;
        min-height: 160px;

        @media (min-width: 768px) {
          min-height: 200px;
        }
      }

      &::placeholder {
        color: var(--color-warm-black);
        opacity: 0.5;
        font-style: italic;
      }

      /* Hebrew RTL support */
      &[dir='rtl'] {
        text-align: right;
      }
    }

    /* Character counter overlay */
    .input-overlay {
      position: absolute;
      bottom: 0.75rem;
      right: 1rem;
      background: rgba(255, 255, 255, 0.9);
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      pointer-events: none;

      &.rtl {
        right: auto;
        left: 1rem;
      }

      &.warning {
        color: var(--color-crisis);
        opacity: 1;
      }

      &.error {
        color: #f44336;
        opacity: 1;
      }
    }
  }

  /* Privacy toggle - mobile friendly */
  .privacy-toggle {
    margin-bottom: 1.5rem;

    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      background: rgba(64, 224, 208, 0.05);
      border-radius: 0.75rem;
      border: 1px solid rgba(64, 224, 208, 0.2);

      .toggle-info {
        flex: 1;
        margin-right: 1rem;

        &.rtl {
          margin-right: 0;
          margin-left: 1rem;
        }

        .toggle-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-warm-black);
          margin-bottom: 0.25rem;
        }

        .toggle-description {
          font-size: 0.8rem;
          color: var(--color-warm-black);
          opacity: 0.7;
          line-height: 1.3;
        }
      }

      .toggle-switch {
        position: relative;
        width: 50px;
        height: 28px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 14px;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;

        &.active {
          background: var(--color-turquoise);
        }

        .toggle-thumb {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 24px;
          height: 24px;
          background: white;
          border-radius: 12px;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

          &.active {
            transform: translateX(22px);
          }
        }
      }
    }
  }

  /* Form footer with stats and actions */
  .form-footer {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 1rem;
    padding: 0 0.5rem; /* Add horizontal padding for mobile */
    width: 100%;
    box-sizing: border-box;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;
      padding: 0; /* Remove padding on desktop */
    }

    .deposit-stats {
      display: flex;
      gap: 1rem;
      font-size: 0.85rem;
      color: var(--color-warm-black);
      opacity: 0.7;
      flex-wrap: wrap;

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        .stat-icon {
          font-size: 0.9rem;
        }

        &.value-preview {
          color: var(--color-gold);
          opacity: 1;
          font-weight: 600;
        }
      }
    }

    .form-actions {
      display: flex;
      gap: 1rem; /* Increased gap for mobile */
      width: 100%;
      justify-content: center;
      box-sizing: border-box;

      @media (min-width: 768px) {
        width: auto;
        justify-content: flex-end;
        gap: 0.75rem; /* Smaller gap on desktop */
      }

      .action-button {
        flex: 1;
        padding: 0.875rem 1.25rem;
        border: none;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        touch-action: manipulation;
        font-size: 0.9rem;
        min-height: 44px; /* Mobile touch target minimum */

        @media (min-width: 768px) {
          flex: none;
          padding: 0.75rem 1.5rem;
        }

        /* Extra small mobile devices */
        @media (max-width: 375px) {
          padding: 0.75rem 1rem;
          font-size: 0.85rem;
        }

        &:hover {
          transform: translateY(-2px);
        }

        &:active {
          transform: translateY(0);
        }

        &.primary {
          background: var(--color-gold);
          color: var(--color-warm-black);

          &:hover {
            background: var(--color-turquoise);
            color: white;
          }

          &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
          }
        }

        &.secondary {
          background: transparent;
          color: var(--color-warm-black);
          border: 2px solid rgba(0, 0, 0, 0.2);

          &:hover {
            border-color: var(--color-turquoise);
            color: var(--color-turquoise);
          }
        }
      }
    }
  }

  /* Validation errors */
  .validation-errors {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(244, 67, 54, 0.1);
    border: 1px solid rgba(244, 67, 54, 0.3);
    border-radius: 0.5rem;

    .error-title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #f44336;
      margin-bottom: 0.5rem;
    }

    .error-list {
      list-style: none;
      margin: 0;
      padding: 0;

      .error-item {
        font-size: 0.8rem;
        color: #f44336;
        margin-bottom: 0.25rem;

        &:before {
          content: '• ';
          margin-right: 0.25rem;
        }
      }
    }
  }

  /* Animations */
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  .gentle-fade-in {
    animation: gentle-fade-in 0.6s ease-out;
  }

  @keyframes gentle-fade-in {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

type DepositType = 'exercise' | 'free'

interface DepositFormProps {
  exercise?: Exercise // Full exercise object instead of limited linkedExercise
  onSubmit: (deposit: DepositInput) => Promise<void>
  onSaveDraft?: (content: string, category?: DepositCategory) => void
  className?: string
}

export const DepositForm: React.FC<DepositFormProps> = ({
  exercise,
  onSubmit,
  onSaveDraft,
  className = '',
}) => {
  const { t, isRTL, language } = useLanguage()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // New state for exercise/deposit flow
  const [depositType, setDepositType] = useState<DepositType | null>(null)
  const [showExercise, setShowExercise] = useState(false)
  const [exerciseExpanded, setExerciseExpanded] = useState(false)

  const [formState, setFormState] = useState<DepositFormState>({
    content: '',
    selectedCategory: null,
    isPublic: false,
    wordCount: 0,
    characterCount: 0,
    isValid: false,
    validationErrors: [],
    isExpanded: false,
    showCategoryPicker: false,
    showPrivacyTooltip: false,
    keyboardHeight: 0,
    lastSaved: null,
    autoSaveEnabled: true,
    recoveredFromDraft: false,
    isSubmitting: false,
    submitError: null,
    submitSuccess: false,
  })

  // Update word count and validation
  useEffect(() => {
    const words = formState.content
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0)
    const validation = validateDeposit({
      content: formState.content,
      category: formState.selectedCategory!,
      isPublic: formState.isPublic,
      language,
    })

    setFormState(prev => ({
      ...prev,
      wordCount: words.length,
      characterCount: formState.content.length,
      isValid: validation.isValid,
      validationErrors: validation.errors,
    }))
  }, [formState.content, formState.selectedCategory, language])

  // Auto-save draft
  useEffect(() => {
    if (
      formState.autoSaveEnabled &&
      formState.content.length > 10 &&
      onSaveDraft
    ) {
      const timeoutId = setTimeout(() => {
        onSaveDraft(formState.content, formState.selectedCategory || undefined)
        setFormState(prev => ({ ...prev, lastSaved: new Date() }))
      }, 2000)

      return () => clearTimeout(timeoutId)
    }
  }, [
    formState.content,
    formState.selectedCategory,
    formState.autoSaveEnabled,
    onSaveDraft,
  ])


  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      content: e.target.value,
      isExpanded: e.target.value.length > 50,
    }))
  }

  const handlePrivacyToggle = () => {
    setFormState(prev => ({ ...prev, isPublic: !prev.isPublic }))
  }

  // Handle exercise flow
  const handleStartExerciseDeposit = () => {
    setDepositType('exercise')
    setFormState(prev => ({
      ...prev,
      selectedCategory: exercise?.category || null,
      content: exercise?.template[language] || '',
      showCategoryPicker: false
    }))
    setExerciseExpanded(false)
    // Focus textarea after a brief delay
    setTimeout(() => textareaRef.current?.focus(), 300)
  }

  const handleStartFreeDeposit = () => {
    setDepositType('free')
    setFormState(prev => ({
      ...prev,
      selectedCategory: null,
      content: '',
      showCategoryPicker: true
    }))
    setShowExercise(false)
  }

  const handleExerciseExpand = () => {
    setExerciseExpanded(true)
  }

  const handleExerciseCollapse = () => {
    setExerciseExpanded(false)
  }

  const handleCategorySelect = (category: DepositCategory) => {
    setFormState(prev => ({ 
      ...prev, 
      selectedCategory: category,
      showCategoryPicker: false
    }))

    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      const categoryConfig = getCategory(category)
      navigator.vibrate(categoryConfig.mobileOptimized.vibrationPattern)
    }

    // Focus textarea after category selection
    setTimeout(() => textareaRef.current?.focus(), 300)
  }

  const handleSubmit = async () => {
    if (!formState.isValid || !formState.selectedCategory) return

    setFormState(prev => ({ ...prev, isSubmitting: true, submitError: null }))

    try {
      await onSubmit({
        content: formState.content,
        category: formState.selectedCategory,
        isPublic: formState.isPublic,
        linkedExercise: depositType === 'exercise' ? exercise?.id : undefined,
        language,
      })

      // Reset form after successful submission
      setFormState(prev => ({
        ...prev,
        submitSuccess: true,
        isSubmitting: false,
        content: '',
        selectedCategory: null,
        showCategoryPicker: false
      }))
      
      setDepositType(null)
      setShowExercise(false)
      setExerciseExpanded(false)

      // Reset to initial state after success message
      setTimeout(() => {
        setFormState(prev => ({ ...prev, submitSuccess: false }))
      }, 2000)
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError:
          error instanceof Error ? error.message : 'Something went wrong',
      }))
    }
  }

  const estimatedValue = calculateDepositValue(formState.content)
  const selectedCategoryConfig = formState.selectedCategory
    ? getCategory(formState.selectedCategory)
    : null

  // Show initial choice if no deposit type selected
  if (!depositType && exercise) {
    return (
      <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        {/* Exercise Summary */}
        {!exerciseExpanded ? (
          <ExerciseSummaryCard 
            exercise={exercise}
            onExpand={handleExerciseExpand}
          />
        ) : (
          <ExpandedExerciseCard
            exercise={exercise}
            onStartDeposit={handleStartExerciseDeposit}
            onCollapse={handleExerciseCollapse}
          />
        )}
        
        {/* Choice Separator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            margin: '2rem 0',
            textAlign: 'center',
            position: 'relative'
          }}
        >
          <div style={{
            position: 'relative',
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '2rem',
            border: '1px solid rgba(64, 224, 208, 0.3)',
            fontSize: '0.9rem',
            color: 'var(--color-warm-black)',
            fontWeight: '500'
          }}>
            {language === 'he' ? 'או' : 'or'}
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1px',
            background: 'rgba(64, 224, 208, 0.2)',
            zIndex: -1
          }} />
        </motion.div>
        
        {/* Free Deposit Option */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            borderRadius: '1rem',
            padding: '1.5rem',
            border: '1px solid rgba(255, 215, 0, 0.3)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center'
          }}
          onClick={handleStartFreeDeposit}
          whileHover={{ 
            borderColor: 'rgba(255, 215, 0, 0.5)',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)'
          }}
        >
          <h3 style={{
            fontSize: 'clamp(1.1rem, 2.8vw, 1.3rem)',
            color: 'var(--color-gold)',
            fontWeight: '600',
            marginBottom: '0.5rem'
          }}>
            {language === 'he' ? 'הפקדה חופשית' : 'Free Deposit'}
          </h3>
          <p style={{
            fontSize: 'clamp(0.9rem, 2.2vw, 1rem)',
            color: 'var(--color-warm-black)',
            opacity: 0.8,
            marginBottom: '1rem'
          }}>
            {language === 'he' 
              ? 'שתף משהו אחר שיש לך בלב היום'
              : 'Share something else you have in your heart today'
            }
          </p>
          <div style={{
            color: 'var(--color-turquoise)',
            fontSize: '0.9rem',
            fontWeight: '500'
          }}>
            {language === 'he' ? 'לחץ לבחירת קטגוריה טיפולית' : 'Click to choose therapeutic category'}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <motion.div
        css={depositFormStyles}
        className={`deposit-form ${formState.isExpanded ? 'focused' : ''} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Form Header */}
        <div className='form-header'>
          <h2 className='form-title'>
            {depositType === 'exercise'
              ? (language === 'he' ? 'הפקדה מהתרגיל' : 'Exercise Deposit')
              : (language === 'he' ? 'הפקדה חופשית' : 'Free Deposit')
            }
          </h2>
          <p className='form-subtitle'>
            {depositType === 'exercise' && exercise
              ? (language === 'he' ? `תרגיל: ${exercise.title.he}` : `Exercise: ${exercise.title.en}`)
              : (language === 'he' ? 'שתף מה יש לך בלב היום...' : "Share what's in your heart today...")
            }
          </p>
        </div>

        {/* Category Selector for Free Deposits */}
        <AnimatePresence>
          {formState.showCategoryPicker && depositType === 'free' && (
            <CategoryCurrencySelector 
              selectedCategory={formState.selectedCategory}
              onCategorySelect={handleCategorySelect}
              showDescription={true}
            />
          )}
        </AnimatePresence>

        {/* Main Input Area */}
        <div className='deposit-input-area'>
          <div className='input-label'>
            {language === 'he' ? 'ההפקדה שלך:' : 'Your deposit:'}
            {depositType === 'exercise' && (
              <span className='linked-exercise-indicator'>
                {language === 'he' ? 'תרגיל יומי' : 'Daily Exercise'}
              </span>
            )}
          </div>

          <textarea
            ref={textareaRef}
            className='deposit-textarea'
            value={formState.content}
            onChange={handleContentChange}
            placeholder={
              depositType === 'exercise' && exercise
                ? exercise.template[language]
                : selectedCategoryConfig
                  ? selectedCategoryConfig.samplePrompts[0][language]
                  : language === 'he'
                    ? 'כתוב כאן את ההפקדה שלך לבנק הלב...'
                    : 'Write your HeartBank deposit here...'
            }
            dir={isRTL ? 'rtl' : 'ltr'}
            maxLength={2000}
          />

          <div
            className={`input-overlay ${isRTL ? 'rtl' : ''} ${formState.characterCount > 1800 ? 'warning' : ''} ${formState.characterCount > 2000 ? 'error' : ''}`}
          >
            {formState.wordCount} {language === 'he' ? 'מילים' : 'words'}
            {formState.wordCount < 5 && (
              <span
                style={{
                  marginLeft: '0.5rem',
                  color: 'var(--color-turquoise)',
                }}
              >
                {language === 'he' ? `(מינימום 5 מילים)` : `(minimum 5 words)`}
              </span>
            )}
          </div>
        </div>

        {/* Privacy Toggle */}
        <div className='privacy-toggle'>
          <div className='toggle-container'>
            <div className={`toggle-info ${isRTL ? 'rtl' : ''}`}>
              <div className='toggle-label'>
                {/* In Hebrew RTL mode, invert the logic so "on" = Public */}
                {language === 'he'
                  ? formState.isPublic
                    ? 'הפקדה ציבורית'
                    : 'הפקדה פרטית'
                  : formState.isPublic
                    ? 'Public Deposit'
                    : 'Private Deposit'}
              </div>
              <div className='toggle-description'>
                {language === 'he'
                  ? formState.isPublic
                    ? 'הקהילה יכולה לראות ולהתחבר לחוויה שלך'
                    : 'רק אתה והבנקאי יכולים לראות את זה'
                  : formState.isPublic
                    ? 'Community can see and connect with your experience'
                    : 'Only you and the banker can see this'}
              </div>
            </div>

            <div
              className={`toggle-switch ${formState.isPublic ? 'active' : ''}`}
              onClick={handlePrivacyToggle}
            >
              <div
                className={`toggle-thumb ${formState.isPublic ? 'active' : ''}`}
              />
            </div>
          </div>
        </div>

        {/* Form Footer */}
        <div className='form-footer'>
          <div className='deposit-stats'>
            <div className='stat-item'>
              <span className='stat-icon'>📝</span>
              <span>
                {formState.wordCount} {language === 'he' ? 'מילים' : 'words'}
              </span>
            </div>
            <div className='stat-item value-preview'>
              <span className='stat-icon'>💰</span>
              <span>
                +{estimatedValue} {language === 'he' ? 'נקודות' : 'points'}
              </span>
            </div>
            {selectedCategoryConfig && (
              <div className='stat-item'>
                <span className='stat-icon'>{selectedCategoryConfig.icon}</span>
                <span>{selectedCategoryConfig.name[language]}</span>
              </div>
            )}
          </div>

          <div className='form-actions'>
            <button
              className='action-button secondary'
              onClick={() => {
                setDepositType(null)
                setShowExercise(false)
                setExerciseExpanded(false)
                setFormState(prev => ({
                  ...prev,
                  content: '',
                  selectedCategory: null,
                  showCategoryPicker: false
                }))
              }}
              disabled={formState.isSubmitting}
            >
              {language === 'he' ? 'התחל מחדש' : 'Start Over'}
            </button>

            <motion.button
              className='action-button primary'
              onClick={handleSubmit}
              disabled={!formState.isValid || formState.isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {formState.isSubmitting
                ? language === 'he'
                  ? 'מפקיד...'
                  : 'Depositing...'
                : language === 'he'
                  ? 'הפקד ללב'
                  : 'Deposit to Heart'}
            </motion.button>
          </div>
        </div>

        {/* Validation Errors */}
        <AnimatePresence>
          {formState.validationErrors.length > 0 && (
            <motion.div
              className='validation-errors'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className='error-title'>
                {language === 'he' ? 'נא לתקן:' : 'Please fix:'}
              </div>
              <ul className='error-list'>
                {formState.validationErrors.map((error, index) => (
                  <li key={index} className='error-item'>
                    {error}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {formState.submitSuccess && (
            <motion.div
              className='success-message'
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'rgba(76, 175, 80, 0.1)',
                border: '1px solid rgba(76, 175, 80, 0.3)',
                borderRadius: '0.5rem',
                textAlign: 'center',
                color: '#4CAF50',
                fontWeight: 600,
              }}
            >
              {language === 'he'
                ? '✨ ההפקדה נוספה בהצלחה לבנק הלב!'
                : '✨ Deposit successfully added to HeartBank!'}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default DepositForm
