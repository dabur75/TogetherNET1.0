import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { css } from '@emotion/react'
import { useLanguage } from './hooks/useLanguage'
import { LoadingSpinner } from './components/LoadingSpinner'
import { Navbar } from './components/Navbar'
import { ErrorBoundary } from './components/ErrorBoundary'

// Lazy load pages for better performance
const HeartBank = React.lazy(() => import('./pages/HeartBank'))
const CreativeStudio = React.lazy(() => import('./pages/CreativeStudio'))
const Gallery = React.lazy(() => import('./pages/Gallery'))
const Treasury = React.lazy(() => import('./pages/Treasury'))
const Welcome = React.lazy(() => import('./pages/Welcome'))

const appStyles = css`
  min-height: 100vh;
  background: var(--color-soft-white);
  color: var(--color-warm-black);
  font-family: var(--font-body);
  
  /* Hebrew RTL Support */
  &[dir="rtl"] {
    direction: rtl;
    text-align: right;
    font-family: var(--font-hebrew);
  }
  
  /* Therapeutic Background Gradient */
  background: linear-gradient(
    135deg,
    var(--color-soft-white) 0%,
    rgba(255, 215, 0, 0.05) 50%,
    rgba(64, 224, 208, 0.03) 100%
  );
  
  /* Ensure smooth animations for therapeutic feel */
  * {
    transition: all 0.3s ease;
  }
`

function App() {
  const { language, direction } = useLanguage()

  return (
    <div css={appStyles} dir={direction} lang={language}>
      <ErrorBoundary>
        <Navbar />
        <main>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Welcome/Landing Page */}
              <Route path="/" element={<Welcome />} />
              
              {/* Core HeartBank Experience */}
              <Route path="/heartbank/*" element={<HeartBank />} />
              
              {/* Creative Tools */}
              <Route path="/studio/*" element={<CreativeStudio />} />
              
              {/* Community Gallery */}
              <Route path="/gallery/*" element={<Gallery />} />
              
              {/* Treasury of Light (Archive) */}
              <Route path="/treasury/*" element={<Treasury />} />
              
              {/* Catch-all redirect to welcome */}
              <Route path="*" element={<Welcome />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>
    </div>
  )
}

export default App