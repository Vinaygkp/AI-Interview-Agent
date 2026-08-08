import type { InterviewStats } from '../App'
import { LogoMark } from './Splash'

interface Props {
  stats: InterviewStats
  onViewFeedback: () => void
  onHome: () => void
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60), s = sec % 60
  if (m === 0) return `${s}s`
  return `${m}m ${s > 0 ? `${s}s` : ''}`
}

export default function Completion({ stats, onViewFeedback, onHome }: Props) {
  const items = [
    { value: String(stats.questions || 15), label: 'Questions', color: '#4f46e5' },
    { value: String(stats.topics || 15), label: 'Topics', color: '#10b981' },
    { value: String(stats.followUps || 12), label: 'Follow-ups', color: '#f59e0b' },
    { value: formatDuration(stats.durationSeconds || 360), label: 'Duration', color: '#ec4899' },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--ia-bg)',
      backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(79, 70, 229, 0.12) 0%, rgba(16, 185, 129, 0.08) 40%, transparent 70%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '48px 24px',
      color: 'var(--ia-fg)',
      transition: 'background-color 0.3s ease',
    }}>
      <div className="ia-scale-in" style={{ maxWidth: 540, width: '100%', textAlign: 'center' }}>
        
        {/* Logo with Glow Effect */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{
            padding: '14px',
            borderRadius: '22px',
            backgroundColor: 'var(--ia-bg-card)',
            border: '1px solid var(--ia-border)',
            boxShadow: '0 10px 30px rgba(79,70,229,0.15)',
          }}>
            <LogoMark size={36} />
          </div>
        </div>

        {/* Animated Success Ring */}
        <div style={{
          width: 84, height: 84, borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15) 0%, rgba(79,70,229,0.15) 100%)',
          border: '2px solid #10b981',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.25)',
          animation: 'ia-pulse 2s infinite ease-in-out',
        }}>
          <svg width="38" height="38" viewBox="0 0 32 32" fill="none">
            <path d="M7 16.5l6 6 12-12" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 'clamp(30px, 4vw, 38px)', fontWeight: 700, letterSpacing: '-0.03em',
          color: 'var(--ia-fg)', margin: '0 0 12px',
        }}>
          Interview Successfully <span style={{
            background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 50%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Completed!</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--ia-fg-muted)', margin: '0 auto 36px', maxWidth: 460, lineHeight: 1.65 }}>
          Outstanding performance! Your responses have been successfully analyzed and scored by the AI backend.
        </p>

        {/* Stats Grid Cards */}
        <div style={{
          backgroundColor: 'var(--ia-bg-card)',
          border: '1px solid var(--ia-border)',
          borderRadius: 22, overflow: 'hidden',
          marginBottom: 36,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          boxShadow: '0 12px 35px rgba(0,0,0,0.05)',
        }}>
          {items.map((item, i) => (
            <div key={item.label} style={{
              padding: '22px 10px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid var(--ia-border-subtle)' : 'none',
              backgroundColor: 'var(--ia-bg)',
            }}>
              <div style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 24, fontWeight: 700, color: item.color, marginBottom: 5,
                letterSpacing: '-0.02em',
              }}>
                {item.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--ia-fg-dim)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Action CTAs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <button
            onClick={onViewFeedback}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)', color: 'white',
              border: 'none', borderRadius: 16, padding: '16px',
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              letterSpacing: '-0.01em',
              boxShadow: '0 8px 30px rgba(79, 70, 229, 0.35)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.92'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(16, 185, 129, 0.45)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(79, 70, 229, 0.35)'
            }}
          >
            View Detailed Performance Feedback →
          </button>
          
          <button
            onClick={onHome}
            style={{
              width: '100%', padding: '14px',
              backgroundColor: 'var(--ia-bg-card)', color: 'var(--ia-fg-2)',
              border: '1px solid var(--ia-border)', borderRadius: 16,
              fontSize: 15, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--ia-bg-subtle)'
              e.currentTarget.style.borderColor = '#10b981'
              e.currentTarget.style.color = '#10b981'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--ia-bg-card)'
              e.currentTarget.style.borderColor = 'var(--ia-border)'
              e.currentTarget.style.color = 'var(--ia-fg-2)'
            }}
          >
            Return to Dashboard / Restart
          </button>
        </div>

        <p style={{ fontSize: 12, color: 'var(--ia-fg-dim)', marginTop: 36, letterSpacing: '0.04em', fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
          ✦ AI Cohort · Technical Interview Platform v1.0
        </p>
      </div>
    </div>
  )
}