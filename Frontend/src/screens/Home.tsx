import { useState } from 'react'
import { useTheme } from '../App'
import { LogoMark } from './Splash'

interface Props { onStart: () => void }

const TEXTS = {
  badge: '⚡ AI Cohort · Next-Gen Technical Interview Platform',
  heroTitle1: 'Your AI-powered technical',
  heroTitle2: 'interview starts here.',
  heroDesc: 'Practice realistic technical interviews personalized to your AI Cohort journey, ongoing projects, core strengths, and knowledge gaps.',
  startBtn: 'Start AI Interview →',
  exploreBtn: 'Explore Workflow',
  stats: [
    { n: '31', label: 'Curriculum Days', color: '#4f46e5' },
    { n: '15', label: 'Adaptive Stages', color: '#10b981' },
    { n: '100%', label: 'Real-time Feedback', color: '#f59e0b' },
  ],
  features: [
    { title: '🎯 Personalized', desc: 'Questions adapt in real time to your candidate profile, cohort progress, and learning signals.', accent: '#4f46e5' },
    { title: '💬 Conversational', desc: 'Follow-up questions depend on what you said before — just like a real technical interview.', accent: '#10b981' },
    { title: '🧠 Context-Aware', desc: 'The agent remembers the full conversation and builds on earlier answers across the session.', accent: '#f59e0b' },
    { title: '🚀 Actionable Feedback', desc: 'Walk away with structured strengths, knowledge gaps, and clear next steps.', accent: '#ec4899' },
  ],
  howLabel: 'Workflow Process',
  howTitle: 'Four steps from candidate profile to deep feedback.',
  howSteps: [
    { n: '01', title: 'Candidate Profile', desc: 'Cohort progress, missions, and learning gaps inform every question.', color: '#4f46e5' },
    { n: '02', title: 'Personalized Questions', desc: 'Topics matched to your specific journey, role, and depth of knowledge.', color: '#10b981' },
    { n: '03', title: 'Adaptive Follow-ups', desc: 'Each answer shapes the next question — depth and difficulty shift dynamically.', color: '#f59e0b' },
    { n: '04', title: 'Interview Feedback', desc: 'Structured evaluation with strengths, gaps, and recommended next steps.', color: '#ec4899' },
  ],
  topicsLabel: 'Curriculum Coverage',
  topicsTitle: 'Core topics the AI agent evaluates.',
  topicsDesc: 'Questions span the full 31-day AI Cohort curriculum, intelligently weighted to your individual learning path.',
  ctaTitle: 'Ready to test your technical skills?',
  ctaDesc: 'Your personalized AI technical interview takes about 15–20 minutes and delivers deep actionable insights.',
  ctaBtn: 'Launch AI Interview Agent →',
  navHow: 'How It Works',
  previewTitle: 'Technical Interview · Q2 of 15',
  aiLabel: 'AI Interviewer',
  thinkingText: 'AI is preparing the next stage…',
  previewPrompt: '"Can you explain why embeddings are useful in a retrieval system, and how you\'d evaluate whether retrieved documents are relevant?"',
  previewReply: '"Embeddings convert text into dense numerical vectors capturing semantic meaning. For evaluation I\'d use NDCG, MRR, and precision@k…"',
  previewFooter: 'Interactive Live Preview'
}

const TOPICS = [
  { label: 'RAG', color: '#4f46e5', bg: 'rgba(79, 70, 229, 0.12)' },
  { label: 'Embeddings', color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  { label: 'Vector Databases', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)' },
  { label: 'Prompt Engineering', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
  { label: 'Function Calling', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)' },
  { label: 'Fine-Tuning', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)' },
  { label: 'Chatbot Architecture', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)' },
  { label: 'Agentic AI', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)' },
  { label: 'Multi-Agent Systems', color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.12)' },
  { label: 'MCP', color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)' },
  { label: 'Evaluation', color: '#84cc16', bg: 'rgba(132, 204, 22, 0.12)' },
  { label: 'Security', color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)' },
  { label: 'Deployment', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.12)' },
  { label: 'Production AI', color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)' },
]

export default function Home({ onStart }: Props) {
  const { dark, toggle } = useTheme()
  const t = TEXTS

  return (
    <div style={{ backgroundColor: 'var(--ia-bg)', color: 'var(--ia-fg)', minHeight: '100vh', overflowX: 'hidden', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <Navbar onStart={onStart} dark={dark} onToggle={toggle} />

      {/* ── HERO SECTION ─────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', padding: '80px 40px 90px' }}>
        <div className="ia-dot-grid" style={{
          position: 'absolute', inset: 0,
          maskImage: 'radial-gradient(ellipse 80% 90% at 50% 0%, black 30%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 0%, black 30%, transparent 100%)',
          opacity: dark ? 0.35 : 0.5,
        }} />
        
        {/* Multicolor background glowing spots */}
        <div style={{
          position: 'absolute', top: -100, left: '20%', width: 500, height: 350,
          background: 'radial-gradient(ellipse at center, rgba(79,70,229,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 50, right: '15%', width: 450, height: 300,
          background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1440, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'center' }}>

            {/* Left Column */}
            <div>
              <div className="ia-fade-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 100, padding: '6px 16px', marginBottom: 24,
                boxShadow: '0 2px 12px rgba(16,185,129,0.1)',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
                <span style={{ fontSize: 13, color: '#10b981', fontWeight: 600, letterSpacing: '0.02em' }}>
                  {t.badge}
                </span>
              </div>

              <h1
                className="ia-fade-up"
                style={{
                  fontFamily: "'Instrument Sans', system-ui, sans-serif",
                  fontSize: 'clamp(38px, 4.5vw, 58px)',
                  fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.22,
                  color: 'var(--ia-fg)', margin: '0 0 22px',
                }}
              >
                {t.heroTitle1}{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 50%, #f59e0b 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {t.heroTitle2}
                </span>
              </h1>

              <p
                className="ia-fade-up"
                style={{
                  fontSize: 18, color: 'var(--ia-fg-muted)', lineHeight: 1.65,
                  margin: '0 0 32px', maxWidth: 640,
                }}
              >
                {t.heroDesc}
              </p>

              <div className="ia-fade-up" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <PrimaryBtn onClick={onStart}>{t.startBtn}</PrimaryBtn>
                <SecondaryBtn as="a" href="#how-it-works">{t.exploreBtn}</SecondaryBtn>
              </div>

              {/* Stats strip with perfect spacing */}
              <div
                className="ia-fade-up"
                style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 48, flexWrap: 'wrap' }}
              >
                {t.stats.map(item => (
                  <div key={item.label} style={{ textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <div style={{ width: 5, height: 34, borderRadius: 4, backgroundColor: item.color }} />
                    <div>
                      <div style={{
                        fontFamily: "'Instrument Sans', system-ui, sans-serif",
                        fontSize: 26, fontWeight: 700, color: item.color, lineHeight: 1,
                        marginBottom: 4,
                      }}>
                        {item.n}
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--ia-fg-dim)', fontWeight: 500 }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Interactive Mock Card */}
            <div style={{ width: '100%' }}>
              <MockInterviewWindow onStart={onStart} t={t} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE STRIP ─────────────── */}
      <section style={{
        borderTop: '1px solid var(--ia-border-subtle)',
        borderBottom: '1px solid var(--ia-border-subtle)',
        backgroundColor: 'var(--ia-bg-card)',
        padding: '36px 40px',
        margin: '30px 0 50px 0',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24,
        }}>
          {t.features.map((f) => (
            <div 
              key={f.title} 
              className="ia-hover-card"
              style={{
                padding: '30px 24px',
                borderRadius: 14,
                border: '1px solid var(--ia-border-subtle)',
                backgroundColor: 'var(--ia-bg)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 24, right: 24, height: 3.5,
                backgroundColor: f.accent, borderRadius: '0 0 4px 4px',
              }} />
              <div style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 17, fontWeight: 700, color: f.accent, marginBottom: 10, marginTop: 4,
              }}>
                {f.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--ia-fg-muted)', lineHeight: 1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section id="how-it-works" style={{ maxWidth: 1440, margin: '0 auto', padding: '60px 40px' }}>
        <MonoLabel>{t.howLabel}</MonoLabel>
        <h2 style={{
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 38, fontWeight: 700, letterSpacing: '-0.025em',
          color: 'var(--ia-fg)', margin: '0 0 48px',
        }}>
          {t.howTitle}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28 }}>
          {t.howSteps.map((s) => (
            <div 
              key={s.n} 
              className="ia-hover-box"
              style={{
                position: 'relative',
                backgroundColor: 'var(--ia-bg-card)',
                border: '1px solid var(--ia-border)',
                borderRadius: 18,
                padding: '32px 28px',
                boxShadow: '0 6px 24px rgba(0,0,0,0.03)',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, color: '#ffffff', fontWeight: 700,
                backgroundColor: s.color, padding: '4px 12px', borderRadius: 6,
                letterSpacing: '0.05em', marginBottom: 16,
              }}>
                {s.n}
              </div>
              <div style={{
                fontFamily: "'Instrument Sans', system-ui, sans-serif",
                fontSize: 18, fontWeight: 700, color: s.color, marginBottom: 10,
              }}>
                {s.title}
              </div>
              <div style={{ fontSize: 14, color: 'var(--ia-fg-muted)', lineHeight: 1.65 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRICULUM COVERAGE ──────────────────────────── */}
      <section style={{ backgroundColor: 'var(--ia-bg-card)', borderTop: '1px solid var(--ia-border-subtle)', borderBottom: '1px solid var(--ia-border-subtle)', padding: '70px 40px', margin: '50px 0' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <MonoLabel>{t.topicsLabel}</MonoLabel>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 24 }}>
            <h2 style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 38, fontWeight: 700, letterSpacing: '-0.025em',
              color: 'var(--ia-fg)', margin: 0,
            }}>
              {t.topicsTitle}
            </h2>
            <p style={{ fontSize: 15, color: 'var(--ia-fg-muted)', maxWidth: 400, lineHeight: 1.6, margin: 0 }}>
              {t.topicsDesc}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {TOPICS.map((item) => (
              <TopicChip key={item.label} label={item.label} color={item.color} bg={item.bg} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────── */}
      <section style={{ maxWidth: 1440, margin: '0 auto', padding: '50px 40px 90px' }}>
        <div 
          className="ia-cta-banner"
          style={{
            position: 'relative', overflow: 'hidden',
            background: dark ? 'linear-gradient(135deg, rgba(79,70,229,0.2) 0%, rgba(16,185,129,0.18) 50%, rgba(236,72,153,0.15) 100%)' : 'linear-gradient(135deg, rgba(79,70,229,0.1) 0%, rgba(16,185,129,0.08) 100%)',
            border: '1px solid var(--ia-primary-border)',
            borderRadius: 28, padding: '70px 40px', textAlign: 'center',
            boxShadow: '0 16px 50px rgba(79,70,229,0.15)',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ position: 'relative' }}>
            <h2 style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 700, letterSpacing: '-0.03em',
              color: 'var(--ia-fg)', margin: '0 0 14px',
            }}>
              {t.ctaTitle}
            </h2>
            <p style={{ fontSize: 17, color: 'var(--ia-fg-muted)', margin: '0 auto 32px', maxWidth: 600, lineHeight: 1.65 }}>
              {t.ctaDesc}
            </p>
            <PrimaryBtn onClick={onStart}>{t.ctaBtn}</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* ── CLEAN & MULTICOLOR FOOTER ─────────────────────────── */}
      <footer style={{
        borderTop: '1px solid var(--ia-border-subtle)',
        padding: '24px 40px',
        backgroundColor: 'var(--ia-bg-card)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LogoMark size={22} />
          <span style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontWeight: 700, fontSize: 14,
            background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            AI Interview Agent
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--ia-fg-dim)' }}>· Technical Interview Platform</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <a href="#how-it-works" style={{ fontSize: 13, color: 'var(--ia-fg-muted)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color='#10b981'} onMouseLeave={e => e.currentTarget.style.color='var(--ia-fg-muted)'}>Workflow</a>
          <span style={{ fontSize: 12, color: '#f59e0b', fontWeight: 600 }}>🟢 All Systems Normal</span>
        </div>
      </footer>

      {/* Global CSS for Hover Effects & Interactions */}
      <style>{`
        .ia-hover-box:hover {
          transform: translateY(-6px);
          border-color: var(--ia-primary) !important;
          box-shadow: 0 18px 40px rgba(79, 70, 229, 0.2) !important;
          background-color: var(--ia-bg-subtle) !important;
        }
        .ia-hover-card:hover {
          transform: translateY(-4px);
          background-color: var(--ia-bg-subtle) !important;
          border-color: var(--ia-primary-border) !important;
        }
        .ia-mock-window:hover {
          transform: translateY(-6px);
          border-color: var(--ia-primary-border) !important;
          box-shadow: 0 30px 70px rgba(79, 70, 229, 0.25) !important;
        }
        .ia-cta-banner:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(79, 70, 229, 0.22) !important;
        }
      `}</style>
    </div>
  )
}

/* ── Sub-components ────────────────────────────────    */

function Navbar({ onStart, dark, onToggle }: { onStart: () => void; dark: boolean; onToggle: () => void }) {
  const t = TEXTS
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backgroundColor: dark ? 'rgba(9,9,11,0.88)' : 'rgba(248, 250, 252, 0.9)',
      borderBottom: '1px solid var(--ia-border-subtle)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
    }}>
      <div style={{
        maxWidth: 1440, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 68, padding: '0 40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark size={30} />
          <span style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontWeight: 700, fontSize: 17, color: 'var(--ia-fg)', letterSpacing: '-0.01em',
          }}>
            AI Interview Agent
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <NavLink href="#how-it-works">{t.navHow}</NavLink>

          {/* Theme toggle */}
          <button
            onClick={onToggle}
            style={{
              width: 38, height: 38, borderRadius: 10,
              border: '1px solid var(--ia-border)',
              backgroundColor: 'var(--ia-bg-subtle)',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15,
              color: 'var(--ia-fg-muted)',
              transition: 'all 0.15s ease',
            }}
            title="Toggle dark mode"
          >
            {dark ? '☀' : '◑'}
          </button>

          <button
            onClick={onStart}
            className="ia-nav-btn"
            style={{
              marginLeft: 4,
              backgroundColor: 'var(--ia-fg)', color: 'var(--ia-bg)',
              border: 'none', borderRadius: 12, padding: '10px 20px',
              fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#4f46e5';
              e.currentTarget.style.color = '#ffffff';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'var(--ia-fg)';
              e.currentTarget.style.color = 'var(--ia-bg)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Start Interview
          </button>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} style={{
      fontSize: 14.5, color: 'var(--ia-fg-muted)', fontWeight: 500,
      padding: '6px 14px', borderRadius: 8, textDecoration: 'none',
      transition: 'color 0.12s, background-color 0.12s',
    }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#4f46e5'; (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--ia-bg-subtle)' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--ia-fg-muted)'; (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent' }}
    >
      {children}
    </a>
  )
}

function PrimaryBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: 'white',
        border: 'none', borderRadius: 12, padding: '16px 28px',
        fontSize: 16, fontWeight: 700, cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(79,70,229,0.4)',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.opacity = '0.92';
        e.currentTarget.style.boxShadow = '0 6px 26px rgba(79,70,229,0.55)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(79,70,229,0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  )
}

function SecondaryBtn({ as: Tag = 'button', href, onClick, children }: { as?: any; href?: string; onClick?: () => void; children: React.ReactNode }) {
  const props: any = {
    onClick,
    href,
    style: {
      backgroundColor: 'var(--ia-bg-card)', color: 'var(--ia-fg-2)',
      border: '1px solid var(--ia-border)', borderRadius: 12, padding: '16px 26px',
      fontSize: 15.5, fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
      display: 'inline-flex', alignItems: 'center',
      transition: 'all 0.2s ease',
    },
    onMouseEnter: (e: any) => {
      e.currentTarget.style.backgroundColor = 'var(--ia-primary-bg)'
      e.currentTarget.style.borderColor = '#10b981'
      e.currentTarget.style.color = '#10b981'
      e.currentTarget.style.transform = 'translateY(-2px)'
    },
    onMouseLeave: (e: any) => {
      e.currentTarget.style.backgroundColor = 'var(--ia-bg-card)'
      e.currentTarget.style.borderColor = 'var(--ia-border)'
      e.currentTarget.style.color = 'var(--ia-fg-2)'
      e.currentTarget.style.transform = 'translateY(0)'
    },
  }
  return <Tag {...props}>{children}</Tag>
}

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12, color: '#10b981', fontWeight: 600,
      letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
    }}>
      {children}
    </div>
  )
}

function TopicChip({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span 
      style={{
        backgroundColor: bg,
        border: `1px solid ${color}50`,
        color: color,
        borderRadius: 100, padding: '9px 20px',
        fontSize: 14, fontWeight: 600,
        cursor: 'default', transition: 'all 0.2s ease',
        display: 'inline-block',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 4px 16px ${color}40`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = `${color}50`;
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {label}
    </span>
  )
}

/* ── Mock Interview Window ───────────────────────────── */
function MockInterviewWindow({ onStart, t }: { onStart: () => void; t: any }) {
  return (
    <div 
      className="ia-mock-window"
      style={{
        backgroundColor: 'var(--ia-bg-card)',
        border: '1px solid var(--ia-border)',
        borderRadius: 22,
        boxShadow: '0 25px 60px rgba(0,0,0,0.15)',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        width: '100%',
      }}
    >
      {/* Window chrome */}
      <div style={{
        backgroundColor: 'var(--ia-bg-subtle)',
        borderBottom: '1px solid var(--ia-border)',
        padding: '12px 18px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#ff5f57','#ffbd2e','#28ca41'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, color: 'var(--ia-fg-dim)', fontWeight: 500,
          }}>
            {t.previewTitle}
          </span>
        </div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* AI question */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
                <circle cx="6.5" cy="5" r="3" fill="white" fillOpacity="0.85" />
                <circle cx="6.5" cy="5" r="1.2" fill="#4f46e5" />
                <path d="M2 11c0-2.5 2-4.5 4.5-4.5S11 8.5 11 11" fill="white" fillOpacity="0.3" />
              </svg>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {t.aiLabel}
            </span>
          </div>
          <div style={{
            backgroundColor: 'var(--ia-primary-bg)', border: '1px solid var(--ia-primary-border)',
            borderRadius: 14, padding: '16px 18px',
          }}>
            <p style={{ fontSize: 14.5, color: 'var(--ia-fg)', lineHeight: 1.65, margin: 0, fontStyle: 'italic' }}>
              {t.previewPrompt}
            </p>
          </div>
        </div>

        {/* Candidate response */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%', backgroundColor: '#f59e0b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: 10, fontWeight: 800,
            }}>
              AC
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ia-fg-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Alex Chen
            </span>
          </div>
          <div style={{
            backgroundColor: 'var(--ia-bg-subtle)', border: '1px solid var(--ia-border)',
            borderRadius: 14, padding: '14px 16px',
          }}>
            <p style={{ fontSize: 13.5, color: 'var(--ia-fg-2)', lineHeight: 1.6, margin: 0 }}>
              {t.previewReply}
            </p>
          </div>
        </div>

        {/* Thinking state */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 2 }}>
          <div style={{ display: 'flex', gap: 4 }}>
            {[0,1,2].map(i => (
              <div key={i} className="ia-dot" style={{
                width: 6, height: 6, borderRadius: '50%', backgroundColor: '#ec4899',
                animationDelay: `${i * 0.18}s`,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#ec4899', fontStyle: 'italic' }}>{t.thinkingText}</span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{
        borderTop: '1px solid var(--ia-border)', padding: '14px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'var(--ia-bg-subtle)',
      }}>
        <span style={{ fontSize: 12, color: 'var(--ia-fg-dim)' }}>{t.previewFooter}</span>
        <button
          onClick={onStart}
          style={{
            fontSize: 13.5, fontWeight: 600, color: '#10b981',
            background: 'none', border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: 8, padding: '7px 16px', cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#10b981';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#10b981';
          }}
        >
          Start interview →
        </button>
      </div>
    </div>
  )
}