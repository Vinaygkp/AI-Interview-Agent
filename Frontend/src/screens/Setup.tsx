import { useState } from 'react'
import { COHORT_CANDIDATES, FOCUS_AREAS, CandidateProfile } from '../data'
import { LogoMark } from './Splash'

interface Props { onBegin: (selectedCandidate: CandidateProfile) => void; onBack: () => void }

const FORMAT_ITEMS = [
  { value: '15', label: 'Technical stages', color: '#4f46e5' },
  { value: 'Adaptive', label: 'Follow-up questions', color: '#10b981' },
  { value: '15+', label: 'Curriculum areas', color: '#f59e0b' },
  { value: '~25 min', label: 'Estimated duration', color: '#ec4899' },
]

export default function Setup({ onBegin, onBack }: Props) {
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(COHORT_CANDIDATES[2])

  const completedCount = selectedCandidate.missions.filter(m => m.passed).length
  const totalMissions = 31
  const pct = Math.round((completedCount / totalMissions) * 100)

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--ia-bg)', color: 'var(--ia-fg)', transition: 'background-color 0.3s ease' }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'var(--ia-bg-card)',
        borderBottom: '1px solid var(--ia-border-subtle)',
        height: 68, padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 20,
        backdropFilter: 'blur(14px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark size={28} />
          <span style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontWeight: 700, fontSize: 17,
            background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AI Interview Agent</span>
        </div>
        <GhostBtn onClick={onBack}>← Back to Home</GhostBtn>
      </header>

      <main style={{ maxWidth: 840, margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Page title */}
        <div className="ia-fade-up" style={{ marginBottom: 40, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, color: '#10b981', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
            backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '4px 14px', borderRadius: 100,
          }}>⚡ Interview Setup & Configuration</div>
          <h1 style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em',
            color: 'var(--ia-fg)', margin: '0 0 14px',
          }}>
            Let's prepare your <span style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 50%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>interview session.</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ia-fg-muted)', margin: '0 auto', maxWidth: 600, lineHeight: 1.65 }}>
            Select a cohort candidate profile below to personalize the 15-stage AI technical evaluation and dynamic conversation signals.
          </p>
        </div>

        {/* Candidate Selector Dropdown Bar */}
        <div className="ia-fade-up ia-hover-box" style={{ marginBottom: 28, animationDelay: '0.04s', transition: 'all 0.25s ease' }}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <CardLabel style={{ margin: 0, color: '#4f46e5' }}>Select Candidate Profile</CardLabel>
                <div style={{ fontSize: 13.5, color: 'var(--ia-fg-muted)', marginTop: 4 }}>
                  Switch between 20+ cohort members to test different technical backgrounds
                </div>
              </div>
              <select
                value={selectedCandidate.member.id}
                onChange={(e) => {
                  const found = COHORT_CANDIDATES.find(c => c.member.id === e.target.value)
                  if (found) setSelectedCandidate(found)
                }}
                style={{
                  backgroundColor: 'var(--ia-bg)',
                  color: 'var(--ia-fg)',
                  border: '1.5px solid #4f46e5',
                  borderRadius: 12,
                  padding: '12px 18px',
                  fontSize: 14.5,
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  minWidth: 280,
                  boxShadow: '0 4px 14px rgba(79,70,229,0.15)',
                }}
              >
                {COHORT_CANDIDATES.map(c => (
                  <option key={c.member.id} value={c.member.id}>
                    {c.member.name} — {c.member.jobRole}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        </div>

        {/* Two-column */}
        <div className="ia-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24, marginBottom: 24, animationDelay: '0.08s' }}>
          {/* Candidate card */}
          <div className="ia-hover-card" style={{ transition: 'all 0.25s ease' }}>
            <Card>
              <CardLabel style={{ color: '#10b981' }}>Candidate Details</CardLabel>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <Avatar initials={getInitials(selectedCandidate.member.name)} />
                <div>
                  <div style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontSize: 18, fontWeight: 700, color: 'var(--ia-fg)', marginBottom: 3,
                  }}>
                    {selectedCandidate.member.name}
                  </div>
                  <div style={{ fontSize: 13, color: '#10b981', fontWeight: 600 }}>{selectedCandidate.member.jobRole}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  ['Experience', `${selectedCandidate.member.yearsExperience} years`],
                  ['Education', selectedCandidate.member.education],
                  ['Cohort Status', selectedCandidate.member.status],
                  ['Commit Days', `${selectedCandidate.signals.commitDays} days active`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 13, color: 'var(--ia-fg-dim)', fontWeight: 500 }}>{k}</span>
                    <span style={{ fontSize: 13, color: 'var(--ia-fg-2)', fontWeight: 600, textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: 'var(--ia-fg-dim)', fontWeight: 500 }}>Missions Passed</span>
                  <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>
                    {completedCount}/{totalMissions} ({pct}%)
                  </span>
                </div>
                <ProgressBar value={pct} />
              </div>
            </Card>
          </div>

          {/* Focus areas */}
          <div className="ia-hover-card" style={{ transition: 'all 0.25s ease' }}>
            <Card>
              <CardLabel style={{ color: '#f59e0b' }}>Recommended Focus</CardLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
                {FOCUS_AREAS.map(area => (
                  <div key={area} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 6,
                      backgroundColor: 'rgba(245, 158, 11, 0.12)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="11" height="11" viewBox="0 0 9 9" fill="none">
                        <path d="M1.5 4.5l2 2 4-4" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 14, color: 'var(--ia-fg-2)', fontWeight: 600 }}>{area}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Format */}
        <div className="ia-fade-up ia-hover-card" style={{ animationDelay: '0.16s', transition: 'all 0.25s ease', marginBottom: 28 }}>
          <Card>
            <CardLabel style={{ color: '#ec4899' }}>Interview Format & Rules</CardLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
              {FORMAT_ITEMS.map((item) => (
                <div key={item.label} style={{
                  textAlign: 'center', padding: '20px 14px',
                  backgroundColor: 'var(--ia-bg)',
                  border: '1px solid var(--ia-border-subtle)',
                  borderRadius: 14,
                }}>
                  <div style={{
                    fontFamily: "'Instrument Sans', system-ui, sans-serif",
                    fontSize: 24, fontWeight: 700, color: item.color, marginBottom: 6,
                  }}>
                    {item.value}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ia-fg-muted)', fontWeight: 500 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="ia-fade-up" style={{ marginTop: 36, animationDelay: '0.22s', textAlign: 'center' }}>
          <button
            onClick={() => onBegin(selectedCandidate)}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
              background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)', color: 'white',
              border: 'none', borderRadius: 16, padding: '18px 36px',
              fontSize: 17, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(79,70,229,0.35)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.92';
              e.currentTarget.style.boxShadow = '0 12px 36px rgba(16,185,129,0.45)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(79,70,229,0.35)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Begin Live Interview with {selectedCandidate.member.name} →
          </button>
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--ia-fg-dim)', marginTop: 16 }}>
            You can exit the interview at any time. Your progress is not saved between sessions.
          </p>
        </div>
      </main>

      {/* Global CSS Hover Effects */}
      <style>{`
        .ia-hover-card:hover {
          transform: translateY(-4px);
        }
        .ia-hover-box:hover {
          border-color: #4f46e5 !important;
          box-shadow: 0 12px 30px rgba(79,70,229,0.15) !important;
        }
      `}</style>
    </div>
  )
}

/* ── Primitives ──────────────────────────────────── */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ia-bg-card)',
      border: '1px solid var(--ia-border)',
      borderRadius: 18, padding: 28,
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      transition: 'all 0.25s ease',
    }}>
      {children}
    </div>
  )
}

function CardLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', margin: '0 0 18px',
      ...style,
    }}>
      {children}
    </p>
  )
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div style={{
      width: 50, height: 50, borderRadius: '50%',
      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 15, fontWeight: 800, flexShrink: 0,
      boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
    }}>
      {initials}
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ height: 6, backgroundColor: 'var(--ia-bg-subtle)', borderRadius: 100, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${value}%`,
        background: 'linear-gradient(90deg, #4f46e5 0%, #10b981 100%)', borderRadius: 100,
        transition: 'width 0.6s ease',
      }} />
    </div>
  )
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: 14, color: 'var(--ia-fg-muted)', background: 'none',
        border: '1px solid var(--ia-border)', borderRadius: 10,
        cursor: 'pointer', padding: '8px 16px', fontWeight: 600,
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--ia-bg-subtle)'; e.currentTarget.style.color = 'var(--ia-fg)'; e.currentTarget.style.borderColor = '#10b981' }}
      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--ia-fg-muted)'; e.currentTarget.style.borderColor = 'var(--ia-border)' }}
    >
      {children}
    </button>
  )
}