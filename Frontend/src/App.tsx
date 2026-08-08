import { useState, useEffect, createContext, useContext } from 'react'
import Splash from './screens/Splash'
import Home from './screens/Home'
import Setup from './screens/Setup'
import Interview from './screens/Interview'
import Completion from './screens/Completion'
import Feedback from './screens/Feedback'
import { MOCK_FEEDBACK, COHORT_CANDIDATES, CandidateProfile } from './data'

export type Screen = 'splash' | 'home' | 'setup' | 'interview' | 'completion' | 'feedback'

export interface InterviewStats {
  questions: number
  topics: number
  followUps: number
  durationSeconds: number
}

/* ── Dark mode context ─────────────────────────────── */
interface ThemeCtx { dark: boolean; toggle: () => void }
export const ThemeContext = createContext<ThemeCtx>({ dark: false, toggle: () => {} })
export const useTheme = () => useContext(ThemeContext)

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [stats, setStats] = useState<InterviewStats>({ questions: 0, topics: 0, followUps: 0, durationSeconds: 0 })
  // Store the active candidate selected from Setup (defaulting to Emily Chen / Index 2)
  const [candidate, setCandidate] = useState<CandidateProfile>(COHORT_CANDIDATES[2])
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  const go = (s: Screen) => setScreen(s)

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--ia-bg)', color: 'var(--ia-fg)' }}>
        {screen === 'splash'    && <Splash onDone={() => go('home')} />}
        {screen === 'home'      && <Home onStart={() => go('setup')} />}
        {screen === 'setup'     && (
          <Setup
            onBegin={(selected) => {
              setCandidate(selected)
              go('interview')
            }}
            onBack={() => go('home')}
          />
        )}
        {screen === 'interview'  && (
          <Interview
            candidate={candidate}
            onComplete={s => { setStats(s); go('completion') }}
            onExit={() => go('home')}
          />
        )}
        {screen === 'completion' && (
          <Completion stats={stats} onViewFeedback={() => go('feedback')} onHome={() => go('home')} />
        )}
        {screen === 'feedback'   && (
          <Feedback feedback={MOCK_FEEDBACK} onHome={() => go('home')} />
        )}
      </div>
    </ThemeContext.Provider>
  )
}