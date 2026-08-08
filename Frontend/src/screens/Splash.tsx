import { useEffect, useState } from 'react'

interface Props { onDone: () => void }

export default function Splash({ onDone }: Props) {
  const [phase, setPhase] = useState<'hidden' | 'visible' | 'out'>('hidden')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 60)
    const t2 = setTimeout(() => setPhase('out'), 2800)
    const t3 = setTimeout(onDone, 3350)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      width: '100vw', height: '100vh',
      backgroundColor: '#050508',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: phase === 'visible' ? 1 : 0,
      transition: 'opacity 0.65s cubic-bezier(0.16,1,0.3,1)',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      {/* Full-Screen Dot Grid Background */}
      <div className="ia-dot-grid" style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.35,
        pointerEvents: 'none',
      }} />

      {/* Expanded Multi-layered Ambient Glows across entire width */}
      <div style={{
        position: 'absolute',
        top: '10%', left: '15%',
        width: '50vw', height: '50vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.2) 0%, rgba(16,185,129,0.1) 50%, transparent 75%)',
        pointerEvents: 'none',
        filter: 'blur(90px)',
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%', right: '15%',
        width: '45vw', height: '45vh',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(245,158,11,0.08) 50%, transparent 75%)',
        pointerEvents: 'none',
        filter: 'blur(90px)',
      }} />

      {/* Centered Content spread across full screen */}
      <div style={{
        position: 'relative',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        zIndex: 2,
        width: '100%',
        maxWidth: 800,
        padding: '0 24px',
      }}>
        {/* Logo with advanced depth */}
        <div className="ia-scale-in" style={{ marginBottom: 28 }}>
          <LogoMark size={88} />
        </div>

        {/* Product name with multi-color vibrant gradient */}
        <h1
          className="ia-fade-up"
          style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontSize: 'clamp(32px, 4.5vw, 42px)', fontWeight: 700, letterSpacing: '-0.035em',
            background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 40%, #34d399 75%, #f472b6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0, marginBottom: 12,
            animationDelay: '0.1s',
            textAlign: 'center',
          }}
        >
          AI Interview Agent
        </h1>

        {/* Tagline */}
        <p
          className="ia-fade-up"
          style={{
            fontSize: 16, color: '#94a3b8',
            letterSpacing: '0.015em', margin: '0 0 52px',
            animationDelay: '0.18s',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          Build the interviewer, not the interview.
        </p>

        {/* Spinner + label */}
        <div
          className="ia-fade-up"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, animationDelay: '0.28s' }}
        >
          <SpinnerRing />
          <p style={{
            fontSize: 14,
            background: 'linear-gradient(135deg, #34d399 0%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: 0, letterSpacing: '0.03em', fontWeight: 700,
            textAlign: 'center',
          }}>
            Initializing intelligent evaluation engine…
          </p>
        </div>
      </div>

      {/* Footer info */}
      <div style={{
        position: 'absolute', bottom: 32, left: 0, right: 0,
        textAlign: 'center',
        fontSize: 11.5, color: '#64748b',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 600, zIndex: 2,
      }}>
        ⚡ AI Cohort · Next-Gen Technical Platform
      </div>
    </div>
  )
}

export function LogoMark({ size = 48 }: { size?: number }) {
  const r = size * (7 / 48)
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ filter: 'drop-shadow(0 14px 35px rgba(79,70,229,0.55))' }}>
      <rect width="48" height="48" rx={r * 48 / size} fill="url(#logo-grad)" />
      {/* Head */}
      <circle cx="24" cy="19" r="7" fill="white" fillOpacity="0.95" />
      <circle cx="24" cy="19" r="3" fill="#4f46e5" />
      {/* Shoulders */}
      <path d="M10 38c0-6.627 6.268-12 14-12s14 5.373 14 12" fill="white" fillOpacity="0.32" />
      {/* Pulse ring */}
      <circle cx="24" cy="19" r="10" stroke="#34d399" strokeWidth="1.75" strokeOpacity="0.5" />
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="0.5" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
    </svg>
  )
}

function SpinnerRing() {
  return (
    <svg width="34" height="34" viewBox="0 0 26 26" fill="none" className="ia-spin">
      <circle cx="13" cy="13" r="10" stroke="#27272a" strokeWidth="2.5" />
      <path
        d="M13 3 A10 10 0 0 1 23 13"
        stroke="url(#spin-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="spin-grad" x1="3" y1="13" x2="23" y2="13" gradientUnits="userSpaceOnUse">
          <stop stopColor="#4f46e5" />
          <stop offset="0.5" stopColor="#34d399" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
      </defs>
    </svg>
  )
}