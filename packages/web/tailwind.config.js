/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Therapeutic Color Palette
      colors: {
        // Core Sacred Palette
        'gold': '#FFD700',
        'turquoise': '#40E0D0',
        'soft-white': '#FAFAFA',
        'warm-black': '#1A1A1A',
        
        // Semantic Colors
        'deposit': '#FFD700',
        'crisis': '#40E0D0',
        'success': '#4CAF50',
        'gentle': '#FFF8DC',
        
        // Seasonal Adaptations
        'winter-primary': '#B8860B',
        'winter-accent': '#4682B4',
        'spring-primary': '#FFE55C',
        'spring-accent': '#00CED1',
      },
      
      // Typography
      fontFamily: {
        'banker': ['Quicksand', 'system-ui', 'sans-serif'],
        'body': ['Assistant', 'system-ui', 'sans-serif'],
        'hebrew': ['system-ui', '-apple-system', 'sans-serif'],
      },
      
      // Therapeutic Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Responsive Breakpoints
      screens: {
        'mobile': '320px',
        'tablet': '768px',
        'desktop': '1024px',
        'wide': '1280px',
      },
      
      // Animations
      animation: {
        'breathing': 'breathing 4s ease-in-out infinite',
        'wealth-growth': 'wealth-growth 8s linear infinite',
        'gentle-fade': 'gentle-fade 0.6s ease-out',
        'celebrate': 'celebrate 0.8s ease-out',
      },
      
      keyframes: {
        breathing: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'wealth-growth': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.02) rotate(1deg)' },
        },
        'gentle-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'celebrate': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
      // Shadows
      boxShadow: {
        'gentle': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'banker': '0 4px 20px rgba(255, 215, 0, 0.3)',
        'healing': '0 4px 20px rgba(64, 224, 208, 0.2)',
        'depth': '0 8px 32px rgba(0, 0, 0, 0.15)',
      },
      
      // Gradients
      backgroundImage: {
        'banker-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'healing-gradient': 'linear-gradient(135deg, #40E0D0 0%, #48CAE4 100%)',
        'gentle-gradient': 'linear-gradient(135deg, #FFF8DC 0%, #FAFAFA 100%)',
        'depth-gradient': 'linear-gradient(135deg, #1A1A1A 0%, #2C2C2C 100%)',
        'therapeutic-bg': 'linear-gradient(135deg, #FAFAFA 0%, rgba(255, 215, 0, 0.05) 50%, rgba(64, 224, 208, 0.03) 100%)',
      },
    },
  },
  plugins: [
    // RTL Support Plugin
    function({ addUtilities }) {
      const rtlUtilities = {
        '.rtl': {
          direction: 'rtl',
          textAlign: 'right',
        },
        '.ltr': {
          direction: 'ltr',
          textAlign: 'left',
        },
        '.text-start': {
          textAlign: 'left',
          '[dir="rtl"] &': {
            textAlign: 'right',
          },
        },
        '.text-end': {
          textAlign: 'right',
          '[dir="rtl"] &': {
            textAlign: 'left',
          },
        },
        '.mr-auto-rtl': {
          marginRight: 'auto',
          '[dir="rtl"] &': {
            marginRight: '0',
            marginLeft: 'auto',
          },
        },
        '.ml-auto-rtl': {
          marginLeft: 'auto',
          '[dir="rtl"] &': {
            marginLeft: '0',
            marginRight: 'auto',
          },
        },
      }
      addUtilities(rtlUtilities)
    },
    
    // Therapeutic Interaction States
    function({ addUtilities }) {
      const therapeuticUtilities = {
        '.therapeutic-hover': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        '.therapeutic-focus': {
          '&:focus': {
            outline: '2px solid #40E0D0',
            outlineOffset: '2px',
          },
        },
        '.banker-presence': {
          fontFamily: 'Quicksand, system-ui, sans-serif',
          fontStyle: 'italic',
          color: '#FFD700',
          lineHeight: '1.75',
        },
        '.hebrew-text': {
          fontFamily: 'system-ui, -apple-system, sans-serif',
          direction: 'rtl',
          textAlign: 'right',
        },
      }
      addUtilities(therapeuticUtilities)
    },
  ],
}