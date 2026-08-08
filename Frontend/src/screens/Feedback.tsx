import { useState, useEffect, useRef } from 'react'
import { LogoMark } from './Splash'
import type { InterviewStats } from '../App'

interface Props {
  feedback?: {
    summary?: string
    strengths?: string[]
    gaps?: string[]
    next?: string[]
    topicScores?: Array<{ topic: string; score: number; label: string }>
  } | null
  onHome: () => void
}

type ScoreColor = { bar: string; label: string; bg: string; text: string }

function scoreColors(score: number): ScoreColor {
  if (score >= 80) return { bar: 'linear-gradient(90deg,#4f46e5,#7c3aed)', label: '#4f46e5', bg: 'rgba(79,70,229,0.1)', text: '#3730a3' }
  if (score >= 65) return { bar: 'linear-gradient(90deg,#16a34a,#22c55e)', label: '#16a34a', bg: 'rgba(22,163,74,0.1)', text: '#166534' }
  if (score >= 50) return { bar: 'linear-gradient(90deg,#d97706,#f59e0b)', label: '#d97706', bg: 'rgba(217,119,6,0.1)', text: '#92400e' }
  return { bar: 'linear-gradient(90deg,#dc2626,#ef4444)', label: '#dc2626', bg: 'rgba(220,38,38,0.1)', text: '#991b1b' }
}

export default function Feedback({ feedback, onHome }: Props) {
  const defaultFeedback = {
    summary: "The candidate demonstrated strong foundational knowledge in modern AI architectures, successfully navigating core concepts with solid technical articulation.",
    strengths: [
      "Clear explanation of semantic similarity and vector spaces",
      "Good structural approach toward developer environments and version control",
      "Effective communication during follow-up technical discussions"
    ],
    gaps: [
      "Could elaborate further on deep system design trade-offs in distributed vector search",
      "Needs more practical familiarity with advanced agentic loops and error recovery"
    ],
    next: [
      "Practice advanced distributed systems architecture and scaling vector databases",
      "Implement a complete multi-agent workflow using Model Context Protocol (MCP)"
    ],
    topicScores: [
      { topic: "Embeddings & Vector Search", score: 85, label: "Advanced" },
      { topic: "Retrieval-Augmented Generation (RAG)", score: 78, label: "Proficient" },
      { topic: "Vector Databases & Scaling", score: 68, label: "Competent" },
      { topic: "Prompt Engineering & Agents", score: 82, label: "Advanced" },
      { topic: "System Deployment & MCP", score: 60, label: "Developing" },
    ]
  }

  const activeFeedback = feedback || defaultFeedback

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
        <button
          onClick={onHome}
          style={{
            fontSize: 14, color: 'var(--ia-fg-muted)', background: 'none',
            border: '1px solid var(--ia-border)', borderRadius: 10,
            cursor: 'pointer', padding: '8px 18px', fontWeight: 600,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--ia-bg-subtle)'; e.currentTarget.style.color = '#10b981'; e.currentTarget.style.borderColor = '#10b981' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--ia-fg-muted)'; e.currentTarget.style.borderColor = 'var(--ia-border)' }}
        >
          ← Return to Dashboard
        </button>
      </header>

      <main style={{ maxWidth: 940, margin: '0 auto', padding: '60px 24px 100px' }}>
        {/* Page title */}
        <div className="ia-fade-up" style={{ marginBottom: 44, textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, color: '#4f46e5', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12,
            backgroundColor: 'rgba(79,70,229,0.1)', padding: '4px 14px', borderRadius: 100,
          }}>✦ AI Performance Report</div>
          <h1 style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontSize: 'clamp(32px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em',
            color: 'var(--ia-fg)', margin: '0 0 14px',
          }}>
            Candidate Assessment <span style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Feedback</span>
          </h1>
          <p style={{ fontSize: 16, color: 'var(--ia-fg-muted)', margin: '0 auto', maxWidth: 600, lineHeight: 1.65 }}>
            Comprehensive analytics and curriculum competency scores evaluated in real-time.
          </p>
        </div>

        {/* Overall assessment */}
        <div className="ia-fade-up ia-hover-card" style={{ animationDelay: '0.06s', transition: 'all 0.25s ease', marginBottom: 24 }}>
          <div style={{
            backgroundColor: 'var(--ia-bg-card)',
            border: '1px solid var(--ia-border)',
            borderLeft: '4px solid #4f46e5',
            borderRadius: 18, padding: '32px 36px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: '#4f46e5', letterSpacing: '0.1em',
              textTransform: 'uppercase', marginBottom: 14, fontWeight: 700,
            }}>Executive Summary</p>
            <p style={{
              fontSize: 17, color: 'var(--ia-fg)', lineHeight: 1.75,
              margin: 0, fontStyle: 'italic',
            }}>
              "{activeFeedback.summary}"
            </p>
          </div>
        </div>

        {/* Three evaluation cards */}
        <div className="ia-fade-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 28, animationDelay: '0.12s' }}>
          <EvalCard
            accent="#10b981" bg="rgba(16,185,129,0.1)" border="rgba(16,185,129,0.3)"
            icon={<CheckIcon color="#10b981" />} label="Key Strengths" labelColor="#10b981"
          >
            {activeFeedback.strengths?.map((s, i) => (
              <EvalItem key={i} symbol="✓" color="#10b981" textColor="var(--ia-fg-2)">{s}</EvalItem>
            ))}
          </EvalCard>

          <EvalCard
            accent="#f59e0b" bg="rgba(245,158,11,0.1)" border="rgba(245,158,11,0.3)"
            icon={<TriangleIcon color="#f59e0b" />} label="Knowledge Gaps" labelColor="#f59e0b"
          >
            {activeFeedback.gaps?.map((g, i) => (
              <EvalItem key={i} symbol="△" color="#f59e0b" textColor="var(--ia-fg-2)">{g}</EvalItem>
            ))}
          </EvalCard>

          <EvalCard
            accent="#4f46e5" bg="rgba(79,70,229,0.1)" border="rgba(79,70,229,0.3)"
            icon={<ArrowIcon color="#4f46e5" />} label="Recommended Next Steps" labelColor="#4f46e5"
          >
            {activeFeedback.next?.map((n, i) => (
              <EvalItem key={i} symbol="→" color="#4f46e5" textColor="var(--ia-fg-2)">{n}</EvalItem>
            ))}
          </EvalCard>
        </div>

        {/* Topic performance */}
        {activeFeedback.topicScores && activeFeedback.topicScores.length > 0 && (
          <div className="ia-fade-up ia-hover-card" style={{ animationDelay: '0.18s', transition: 'all 0.25s ease' }}>
            <div style={{
              backgroundColor: 'var(--ia-bg-card)',
              border: '1px solid var(--ia-border)',
              borderRadius: 18, padding: '32px 36px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
            }}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11, color: '#ec4899', letterSpacing: '0.1em',
                textTransform: 'uppercase', marginBottom: 6, fontWeight: 700,
              }}>Curriculum Breakdown</p>
              <h2 style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em',
                color: 'var(--ia-fg)', margin: '0 0 32px',
              }}>
                Topic-wise Competency Assessment
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {activeFeedback.topicScores.map(({ topic, score, label }) => (
                  <ScoreRow key={topic} topic={topic} score={score} label={label} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div style={{ textAlign: 'center', marginTop: 48, animationDelay: '0.24s' }}>
          <button
            onClick={onHome}
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)', color: 'white',
              border: 'none', borderRadius: 14, padding: '16px 36px',
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(79,70,229,0.35)',
              transition: 'all 0.25s ease',
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
            Return to Dashboard →
          </button>
        </div>
      </main>

      <style>{`
        .ia-hover-card:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  )
}

function ScoreRow({ topic, score, label }: { topic: string; score: number; label: string }) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const c = scoreColors(score)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--ia-fg)' }}>{topic}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            backgroundColor: c.bg, color: c.label,
            borderRadius: 100, padding: '4px 12px',
            fontSize: 12, fontWeight: 700,
          }}>
            {label}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, color: 'var(--ia-fg-muted)', fontWeight: 700,
            minWidth: 32, textAlign: 'right',
          }}>
            {score}%
          </span>
        </div>
      </div>
      <div style={{ height: 6, backgroundColor: 'var(--ia-bg-subtle)', borderRadius: 100, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: c.bar,
          width: animated ? `${score}%` : '0%',
          transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1)',
        }} />
      </div>
    </div>
  )
}

function EvalCard({
  accent, bg, border, icon, label, labelColor, children
}: {
  accent: string; bg: string; border: string;
  icon: React.ReactNode; label: string; labelColor: string;
  children: React.ReactNode
}) {
  return (
    <div className="ia-hover-card" style={{
      backgroundColor: 'var(--ia-bg-card)',
      border: `1px solid ${border}`,
      borderTop: `4px solid ${accent}`,
      borderRadius: 18, padding: '26px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
      transition: 'all 0.25s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 8,
          backgroundColor: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </div>
        <span style={{ fontSize: 14, fontWeight: 700, color: labelColor, letterSpacing: '0.01em' }}>
          {label}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{children}</div>
    </div>
  )
}

function EvalItem({ symbol, color, textColor, children }: { symbol: string; color: string; textColor: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <span style={{ color, fontSize: 15, flexShrink: 0, lineHeight: 1.5, fontWeight: 700 }}>{symbol}</span>
      <span style={{ fontSize: 13.5, color: textColor, lineHeight: 1.6, fontWeight: 500 }}>{children}</span>
    </div>
  )
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5l3 3 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function TriangleIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
      <path d="M1.5 11.5L6.5 2l5 9.5H1.5z" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="6.5" y1="6" x2="6.5" y2="8.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
function ArrowIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
      <path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}