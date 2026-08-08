import { useState, useEffect, useRef } from 'react'
import { CandidateProfile } from '../data'
import { LogoMark } from './Splash'
import type { InterviewStats } from '../App'

interface Props {
  candidate: CandidateProfile
  onComplete: (stats: InterviewStats) => void
  onExit: () => void
}

interface Message {
  id: string
  role: 'ai' | 'candidate'
  content: string
  topic?: string
  day?: number
  difficulty?: string
  isFollowUp?: boolean
}

const SIDEBAR_TOPICS = [
  { key: 'Development Environments & Git', label: 'Setup & Git', color: '#4f46e5' },
  { key: 'Embeddings & Vector Spaces', label: 'Embeddings', color: '#10b981' },
  { key: 'Semantic Search & Distance Metrics', label: 'Semantic Search', color: '#f59e0b' },
  { key: 'RAG Architecture Basics', label: 'RAG Basics', color: '#ec4899' },
  { key: 'Advanced RAG & Retrieval Evaluation', label: 'Advanced RAG', color: '#06b6d4' },
  { key: 'Vector Databases & Indexing', label: 'Vector Databases', color: '#8b5cf6' },
  { key: 'Vector DB Scaling & Trade-offs', label: 'DB Scaling', color: '#3b82f6' },
  { key: 'Prompt Engineering Fundamentals', label: 'Prompt Engineering', color: '#ef4444' },
  { key: 'Structured Outputs & Function Calling', label: 'Function Calling', color: '#14b8a6' },
  { key: 'Agentic AI & Reasoning Loops', label: 'Agentic AI', color: '#f97316' },
  { key: 'Multi-Agent Orchestration', label: 'Multi-Agent', color: '#84cc16' },
  { key: 'Model Context Protocol (MCP)', label: 'MCP', color: '#a855f7' },
  { key: 'AI System Security & Guardrails', label: 'Security', color: '#0ea5e9' },
  { key: 'Production AI Deployment', label: 'Deployment', color: '#eab308' },
  { key: 'Enterprise System Architecture', label: 'Enterprise Arch', color: '#ec4899' },
]

export default function Interview({ candidate, onComplete, onExit }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(true)
  const [qIndex, setQIndex] = useState(0)
  const [topicsCovered, setTopicsCovered] = useState<Set<string>>(new Set())
  const [followUpCount, setFollowUpCount] = useState(0)
  const [startTime] = useState(Date.now())
  const [error, setError] = useState<string | null>(null)
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [sessionId] = useState(`session-${Date.now()}`)

  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const fetchInitialQuestion = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || '';
        const response = await fetch(`${backendUrl}/api/interview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sessionId,
            candidate: {
              name: candidate.member.name,
              jobRole: candidate.member.jobRole,
              yearsExperience: candidate.member.yearsExperience,
              education: candidate.member.education
            },
            message: ""
          })
        })

        const data = await response.json()
        if (!response.ok) throw new Error(data.detail || 'Failed to initialize interview')

        const aiText = data.reply || "Let's start with the foundations."
        const initialTopic = data.current_topic || "Development Environments & Git"

        setMessages([{
          id: 'q-0',
          role: 'ai',
          content: aiText,
          topic: initialTopic,
          day: 1,
          difficulty: 'Conceptual',
          isFollowUp: false,
        }])
        setTopicsCovered(new Set([initialTopic]))
      } catch (err: any) {
        setError("Backend connection error. Make sure FastAPI server is running.")
        console.error(err)
      } finally {
        setIsThinking(false)
      }
    }

    fetchInitialQuestion()
  }, [sessionId, candidate])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking])

  const submit = async () => {
    const trimmed = input.trim()
    if (!trimmed || isThinking) return
    setError(null)

    const candidateMsg: Message = { id: `c-${Date.now()}`, role: 'candidate', content: trimmed }
    const updatedMessages = [...messages, candidateMsg]
    setMessages(updatedMessages)
    setInput('')
    setIsThinking(true)

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
      
      const response = await fetch(`${backendUrl}/api/interview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionId,
          candidate: {
            name: candidate.member.name,
            jobRole: candidate.member.jobRole,
            yearsExperience: candidate.member.yearsExperience,
            education: candidate.member.education
          },
          message: trimmed
        })
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to fetch from AI backend')
      }

      if (data.done) {
        setTimeout(() => {
          onComplete({
            questions: qIndex + 1,
            topics: topicsCovered.size,
            followUps: followUpCount,
            durationSeconds: Math.round((Date.now() - startTime) / 1000),
          })
        }, 700)
        return
      }

      const aiText = data.reply || "Can you elaborate more on your approach?"
      const activeTopic = data.current_topic || "Technical AI"
      const next = qIndex + 1

      const aiMsg: Message = {
        id: `q-${next}`,
        role: 'ai',
        content: aiText,
        topic: activeTopic,
        day: next + 1,
        difficulty: 'Technical',
        isFollowUp: true,
      }

      setMessages(prev => [...prev, aiMsg])
      setTopicsCovered(prev => new Set([...prev, activeTopic]))
      setFollowUpCount(c => c + 1)
      setQIndex(next)
    } catch (err: any) {
      setError("Backend connection error. Make sure FastAPI server is running.")
      console.error(err)
    } finally {
      setIsThinking(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); submit() }
  }

  const allAi = messages.filter(m => m.role === 'ai')
  const currentQ = allAi[allAi.length - 1] ?? null
  const lastAiIndex = messages.map(m => m.role).lastIndexOf('ai');
  const history = lastAiIndex !== -1 ? messages.slice(0, lastAiIndex) : [];

  const total = 15
  const progressPct = Math.round(((qIndex) / total) * 100)
  const candidateInitials = candidate.member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--ia-bg)', color: 'var(--ia-fg)', overflow: 'hidden' }}>
      {/* ── HEADER ──────────────────────────────────── */}
      <header style={{
        flexShrink: 0, height: 68,
        backgroundColor: 'var(--ia-bg-card)',
        borderBottom: '1px solid var(--ia-border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px',
        position: 'relative', zIndex: 20,
        backdropFilter: 'blur(14px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LogoMark size={26} />
          <span style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontWeight: 700, fontSize: 16,
            background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 50%, #f59e0b 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>AI Interview Agent</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block' }} />
          <span style={{
            fontFamily: "'Instrument Sans', system-ui, sans-serif",
            fontSize: 15, fontWeight: 700, color: 'var(--ia-fg)', letterSpacing: '-0.01em',
          }}>
            Technical Assessment (Stage {qIndex + 1} of {total})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, fontWeight: 600, color: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.1)', padding: '5px 12px', borderRadius: 100,
          }}>
            LIVE SESSION
          </div>
          <button
            onClick={() => setShowExitConfirm(true)}
            style={{
              fontSize: 13.5, color: 'var(--ia-fg-muted)', background: 'none',
              border: '1px solid var(--ia-border)', borderRadius: 10,
              cursor: 'pointer', padding: '7px 16px', fontWeight: 600, transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.backgroundColor = 'rgba(239,68,68,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--ia-fg-muted)'; e.currentTarget.style.borderColor = 'var(--ia-border)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Exit Session
          </button>
        </div>
      </header>

      {/* ── BODY ────────────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>

        {/* LEFT PANEL */}
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          borderRight: '1px solid var(--ia-border-subtle)', overflow: 'hidden',
        }}>
          {/* Conversation scroll area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '36px 48px' }}>

            {/* Conversation history */}
            {history.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <div style={{
                  fontSize: 11.5, color: '#10b981',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  marginBottom: 18, fontWeight: 700,
                }}>
                  ✦ Earlier in this interview session
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {history.map(msg => (
                    <div key={msg.id} className="ia-fade-in">
                      {msg.role === 'ai'
                        ? <CompactAiMsg msg={msg} />
                        : <CompactCandidateMsg msg={msg} candidateName={candidate.member.name} initials={candidateInitials} />
                      }
                    </div>
                  ))}
                </div>
                <div style={{ height: 1, backgroundColor: 'var(--ia-border)', margin: '32px 0' }} />
              </div>
            )}

            {/* Current question */}
            {currentQ && !isThinking && (
              <div className="ia-fade-up" style={{ marginBottom: 20 }}>
                <CurrentQuestion msg={currentQ} qNum={qIndex + 1} />
              </div>
            )}

            {/* AI thinking */}
            {isThinking && (
              <div className="ia-fade-in">
                <ThinkingCard />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Response input */}
          <ResponseArea
            value={input}
            onChange={setInput}
            onSubmit={submit}
            onKeyDown={handleKey}
            disabled={isThinking}
            error={error}
            ref={textareaRef}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{
          width: 330, flexShrink: 0,
          overflowY: 'auto', padding: '28px 22px',
          backgroundColor: 'var(--ia-bg)',
          display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {/* Candidate Profile */}
          <SideCard>
            <SideLabel style={{ color: '#4f46e5' }}>Active Candidate</SideLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#ffffff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 800, flexShrink: 0,
                boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
              }}>{candidateInitials}</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ia-fg)' }}>{candidate.member.name}</div>
                <div style={{ fontSize: 12.5, color: '#10b981', fontWeight: 600 }}>{candidate.member.jobRole}</div>
              </div>
            </div>
          </SideCard>

          {/* Current topic */}
          {currentQ && (
            <SideCard>
              <SideLabel style={{ color: '#f59e0b' }}>Current Focus Topic</SideLabel>
              <div style={{
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 10, padding: '10px 14px',
                fontSize: 13.5, color: '#f59e0b', fontWeight: 700,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }} />
                {currentQ.topic || 'Technical AI'}
              </div>
            </SideCard>
          )}

          {/* Progress */}
          <SideCard>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <SideLabel style={{ color: '#ec4899', margin: 0 }}>Evaluation Progress</SideLabel>
              <span style={{ fontSize: 13, color: '#ec4899', fontWeight: 700 }}>
                {qIndex + 1} / {total}
              </span>
            </div>
            <div style={{ height: 6, backgroundColor: 'var(--ia-bg-subtle)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 100,
                background: 'linear-gradient(90deg, #4f46e5 0%, #ec4899 100%)',
                width: `${progressPct}%`,
                transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </SideCard>

          {/* Topics checklist */}
          <SideCard>
            <SideLabel style={{ color: '#06b6d4' }}>Curriculum Stages (15)</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 260, overflowY: 'auto' }}>
              {SIDEBAR_TOPICS.map(({ key, label, color }) => {
                const done = topicsCovered.has(key)
                const active = currentQ?.topic === key

                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                      backgroundColor: done ? (active ? 'rgba(79,70,229,0.15)' : 'rgba(16,185,129,0.15)') : 'var(--ia-bg-subtle)',
                      border: `1.5px solid ${done ? (active ? '#4f46e5' : '#10b981') : 'var(--ia-border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {done && !active && (
                        <svg width="10" height="10" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5l2 2 4-4" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                      {active && (
                        <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: color }} />
                      )}
                    </div>
                    <span style={{
                      fontSize: 13,
                      color: done ? 'var(--ia-fg)' : 'var(--ia-fg-dim)',
                      fontWeight: active ? 700 : 500,
                    }}>
                      {label}
                    </span>
                    {active && (
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: color, fontWeight: 800, letterSpacing: '0.05em' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </SideCard>
        </div>
      </div>

      {showExitConfirm && (
        <ExitModal onCancel={() => setShowExitConfirm(false)} onConfirm={onExit} />
      )}
    </div>
  )
}

function CurrentQuestion({ msg, qNum }: { msg: Message; qNum: number }) {
  const rawParagraphs = msg.content.split(/\n+/).map(p => p.trim()).filter(Boolean);
  const paragraphs = rawParagraphs.map(p => p.replace(/^["']|["']$/g, ''));

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <InterviewerAvatar />
        <div>
          <span style={{
            fontSize: 12, fontWeight: 700, color: '#10b981',
            letterSpacing: '0.07em', textTransform: 'uppercase',
          }}>
            AI Interviewer · {msg.topic || 'Technical Assessment'}
          </span>
          {msg.isFollowUp && (
            <span style={{
              marginLeft: 12,
              backgroundColor: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.3)',
              borderRadius: 100, padding: '3px 12px',
              fontSize: 11, color: '#4f46e5', fontWeight: 700,
            }}>
              Stage {qNum} of 15
            </span>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--ia-bg-card)',
        border: '1.5px solid rgba(79,70,229,0.3)',
        borderRadius: 20,
        padding: '32px 36px',
        marginLeft: 42,
        boxShadow: '0 10px 35px rgba(79,70,229,0.1)',
      }}>
        {paragraphs.map((para, idx) => {
          const isLast = idx === paragraphs.length - 1 && paragraphs.length > 1;
          return (
            <p key={idx} style={{
              fontFamily: "'Instrument Sans', system-ui, sans-serif",
              fontSize: isLast ? '18px' : '16px',
              fontWeight: isLast ? 700 : 400,
              color: isLast ? '#4f46e5' : 'var(--ia-fg)',
              lineHeight: 1.7,
              margin: idx === 0 ? '0 0 16px' : (isLast ? '18px 0 0' : '16px 0'),
              borderTop: isLast ? '1px dashed rgba(79,70,229,0.3)' : 'none',
              paddingTop: isLast ? '18px' : '0',
            }}>
              {isLast ? `❓ ${para}` : para}
            </p>
          );
        })}
      </div>
    </div>
  )
}

function CompactAiMsg({ msg }: { msg: Message }) {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <InterviewerAvatar small />
      <div>
        <div style={{ fontSize: 12, color: '#10b981', marginBottom: 6, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          AI Interviewer ({msg.topic || 'Previous Stage'})
        </div>
        <div style={{
          backgroundColor: 'var(--ia-bg-subtle)', border: '1px solid var(--ia-border)',
          borderRadius: 14, padding: '14px 18px',
        }}>
          <p style={{ fontSize: 14.5, color: 'var(--ia-fg-muted)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
            "{msg.content}"
          </p>
        </div>
      </div>
    </div>
  )
}

function CompactCandidateMsg({ msg, candidateName, initials }: { msg: Message; candidateName: string; initials: string }) {
  return (
    <div style={{ display: 'flex', gap: 14, paddingLeft: 38 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)', color: '#ffffff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 10, fontWeight: 800,
      }}>{initials}</div>
      <div>
        <div style={{ fontSize: 12, color: '#f59e0b', marginBottom: 6, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {candidateName}
        </div>
        <div style={{
          backgroundColor: 'var(--ia-bg-card)', border: '1px solid var(--ia-border)',
          borderRadius: 14, padding: '14px 18px',
        }}>
          <p style={{ fontSize: 14.5, color: 'var(--ia-fg)', lineHeight: 1.6, margin: 0 }}>
            {msg.content}
          </p>
        </div>
      </div>
    </div>
  )
}

function ThinkingCard() {
  return (
    <div style={{ display: 'flex', gap: 14 }}>
      <InterviewerAvatar />
      <div>
        <div style={{ fontSize: 12, color: '#10b981', marginBottom: 8, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          AI Interviewer
        </div>
        <div style={{
          backgroundColor: 'var(--ia-bg-card)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 16, padding: '18px 24px',
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 4px 20px rgba(16,185,129,0.1)',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1, 2].map(i => (
              <div key={i} className="ia-dot" style={{
                width: 8, height: 8, borderRadius: '50%',
                backgroundColor: '#10b981',
                animationDelay: `${i * 0.18}s`,
              }} />
            ))}
          </div>
          <span style={{ fontSize: 14, color: '#10b981', fontStyle: 'italic', fontWeight: 600 }}>
            Evaluating your technical response & preparing next stage…
          </span>
        </div>
      </div>
    </div>
  )
}

const ResponseArea = ({
  value, onChange, onSubmit, onKeyDown, disabled, error, ref
}: {
  value: string; onChange: (v: string) => void;
  onSubmit: () => void; onKeyDown: (e: React.KeyboardEvent) => void;
  disabled: boolean; error: string | null; ref: React.RefObject<HTMLTextAreaElement | null>
}) => {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{
      borderTop: '1px solid var(--ia-border-subtle)',
      backgroundColor: 'var(--ia-bg-card)',
      padding: '24px 48px 28px',
      flexShrink: 0,
    }}>
      {error && (
        <div style={{
          backgroundColor: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: 12, padding: '12px 18px', marginBottom: 16,
          fontSize: 13.5, color: '#ef4444', fontWeight: 600,
        }}>
          {error}
        </div>
      )}
      <div style={{
        border: `1.5px solid ${focused ? '#4f46e5' : 'var(--ia-border)'}`,
        borderRadius: 16,
        backgroundColor: 'var(--ia-bg)',
        transition: 'all 0.2s ease',
        boxShadow: focused ? '0 0 0 4px rgba(79,70,229,0.15)' : 'none',
      }}>
        <textarea
          ref={ref}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          placeholder="Explain your technical approach, architecture, or tradeoffs clearly…"
          rows={4}
          style={{
            width: '100%', resize: 'none', border: 'none', outline: 'none',
            padding: '18px 20px 0',
            fontSize: 15.5, lineHeight: 1.65, color: 'var(--ia-fg)',
            backgroundColor: 'transparent',
            fontFamily: "'Inter', system-ui, sans-serif",
            opacity: disabled ? 0.5 : 1,
          }}
        />
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 20px 18px',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12, color: 'var(--ia-fg-dim)', fontWeight: 500,
          }}>
            {value.length} chars · ⌘+Enter to submit
          </span>
          <button
            onClick={onSubmit}
            disabled={!value.trim() || disabled}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: !value.trim() || disabled ? 'var(--ia-bg-subtle)' : 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
              color: !value.trim() || disabled ? 'var(--ia-fg-dim)' : 'white',
              border: 'none', borderRadius: 12, padding: '12px 24px',
              fontSize: 14.5, fontWeight: 700,
              cursor: !value.trim() || disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: !value.trim() || disabled ? 'none' : '0 4px 16px rgba(79,70,229,0.35)',
            }}
          >
            Submit Answer →
          </button>
        </div>
      </div>
    </div>
  )
}

function ExitModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(6px)',
    }}>
      <div style={{
        backgroundColor: 'var(--ia-bg-card)',
        border: '1px solid var(--ia-border)',
        borderRadius: 22, padding: '40px',
        maxWidth: 420, width: '90%',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
      }}>
        <h3 style={{
          fontFamily: "'Instrument Sans', system-ui, sans-serif",
          fontSize: 22, fontWeight: 700, color: 'var(--ia-fg)',
          margin: '0 0 12px', letterSpacing: '-0.015em',
        }}>
          Exit interview session?
        </h3>
        <p style={{ fontSize: 15, color: 'var(--ia-fg-muted)', margin: '0 0 32px', lineHeight: 1.65 }}>
          Your current progress will not be saved. Are you sure you want to leave this session?
        </p>
        <div style={{ display: 'flex', gap: 14 }}>
          <button
            onClick={onCancel}
            style={{
              flex: 1, padding: '14px', borderRadius: 12,
              border: '1px solid var(--ia-border)',
              backgroundColor: 'transparent', color: 'var(--ia-fg)',
              fontSize: 14.5, fontWeight: 600, cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          >
            Continue
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: '14px', borderRadius: 12,
              border: 'none', backgroundColor: '#ef4444', color: 'white',
              fontSize: 14.5, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(239,68,68,0.3)',
              transition: 'background-color 0.15s',
            }}
          >
            Yes, Exit
          </button>
        </div>
      </div>
    </div>
  )
}

function InterviewerAvatar({ small = false }: { small?: boolean }) {
  const s = small ? 26 : 34
  return (
    <div style={{
      width: s, height: s, borderRadius: small ? 8 : 10, flexShrink: 0,
      background: 'linear-gradient(135deg, #4f46e5 0%, #10b981 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(79,70,229,0.3)',
    }}>
      <svg width={small ? 14 : 18} height={small ? 14 : 18} viewBox="0 0 15 15" fill="none">
        <circle cx="7.5" cy="6" r="3.2" fill="white" fillOpacity="0.9" />
        <circle cx="7.5" cy="6" r="1.4" fill="#4f46e5" />
        <path d="M2 13c0-3 2.5-5.5 5.5-5.5S13 10 13 13" fill="white" fillOpacity="0.28" />
      </svg>
    </div>
  )
}

function SideCard({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: 'var(--ia-bg-card)',
      border: '1px solid var(--ia-border)',
      borderRadius: 16, padding: '18px 20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      transition: 'all 0.25s ease',
    }}>
      {children}
    </div>
  )
}

function SideLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10.5, letterSpacing: '0.1em',
      textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 700,
      ...style,
    }}>
      {children}
    </p>
  )
}