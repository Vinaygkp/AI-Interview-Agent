export interface Mission {
  day?: number
  title?: string
  passed?: boolean
  attempts?: number
  skipped?: boolean
}

export interface CandidateMember {
  id: string
  name: string
  jobRole: string
  yearsExperience: number
  education: string
  status: string
}

export interface CandidateSignals {
  commitDays: number
  missionsCompleted: number
  missionsFirstTry: number
}

export interface CandidateProfile {
  member: CandidateMember
  missions: Mission[]
  signals: CandidateSignals
}

export const COHORT_CANDIDATES: CandidateProfile[] = [
  {
    member: {
      id: "CAND-001",
      name: "Sarah Johnson",
      jobRole: "Senior Data Engineer",
      yearsExperience: 9,
      education: "MS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 2 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 3 },
      { day: 29, title: "Monitoring, Logging & Observability", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 }
  },
  {
    member: {
      id: "CAND-002",
      name: "Alex Turner",
      jobRole: "Backend Software Engineer",
      yearsExperience: 5,
      education: "B.Tech Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 }
  },
  {
    member: {
      id: "CAND-003",
      name: "Emily Chen",
      jobRole: "AI Engineer",
      yearsExperience: 6,
      education: "MS Artificial Intelligence",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 11, title: "RAG End-to-End & LLM API Basics", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 }
  },
  {
    member: {
      id: "CAND-004",
      name: "David Miller",
      jobRole: "Business Analyst",
      yearsExperience: 8,
      education: "MBA",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 18, missionsCompleted: 28, missionsFirstTry: 6 }
  },
  {
    member: {
      id: "CAND-005",
      name: "Michael Brown",
      jobRole: "DevOps Engineer",
      yearsExperience: 10,
      education: "B.Tech Information Technology",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 29, title: "Monitoring, Logging & Observability", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 22 }
  },
  {
    member: {
      id: "CAND-006",
      name: "Wendy Foster",
      jobRole: "Marketing Manager",
      yearsExperience: 12,
      education: "BA Marketing",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 19, missionsCompleted: 24, missionsFirstTry: 2 }
  },
  {
    member: {
      id: "CAND-007",
      name: "Ethan Brooks",
      jobRole: "Computer Science Intern",
      yearsExperience: 0,
      education: "BS Computer Science (in progress)",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 26, missionsCompleted: 27, missionsFirstTry: 22 }
  },
  {
    member: {
      id: "CAND-008",
      name: "Harold Whitfield",
      jobRole: "Distinguished Engineer",
      yearsExperience: 28,
      education: "BS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
      { day: 5, title: "Reading & Processing Unstructured Data", passed: true, attempts: 1 },
      { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
      { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 5 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 25, missionsCompleted: 27, missionsFirstTry: 15 }
  },
  {
    member: {
      id: "CAND-009",
      name: "Zara Ahmadi",
      jobRole: "AI Engineer",
      yearsExperience: 1,
      education: "BS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 29 }
  },
  {
    member: {
      id: "CAND-010",
      name: "Gerald Combs",
      jobRole: "IT Support Specialist",
      yearsExperience: 20,
      education: "AAS Information Technology",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: false, attempts: 4 },
      { day: 10, title: "Retrieval & Matching Engine", passed: false, attempts: 3 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 3 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 22, missionsCompleted: 23, missionsFirstTry: 1 }
  },
  {
    member: {
      id: "CAND-011",
      name: "Mia Alvarez",
      jobRole: "UX Researcher",
      yearsExperience: 6,
      education: "MA Human-Computer Interaction",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 2, title: "Local LLM & AI Coding Assistant Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 3 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", skipped: true },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", skipped: true },
      { day: 16, title: "Chatbot Backend & API Integration", skipped: true },
      { day: 22, title: "Multi-Agent Orchestration", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
    ],
    signals: { commitDays: 9, missionsCompleted: 14, missionsFirstTry: 5 }
  },
  {
    member: {
      id: "CAND-012",
      name: "Chen Wei",
      jobRole: "Mobile App Developer",
      yearsExperience: 7,
      education: "BS Computer Engineering",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 9, title: "Building & Populating the Vector Database", passed: true, attempts: 4 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 30, title: "Production Readiness & Final Testing", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 14 }
  },
  {
    member: {
      id: "CAND-013",
      name: "Ravi Patel",
      jobRole: "Software Engineer",
      yearsExperience: 15,
      education: "MS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 13 }
  },
  {
    member: {
      id: "CAND-014",
      name: "Bethany Cole",
      jobRole: "HR Manager",
      yearsExperience: 10,
      education: "BA Human Resources",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 4 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
      { day: 22, title: "Multi-Agent Orchestration", skipped: true },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
    ],
    signals: { commitDays: 17, missionsCompleted: 20, missionsFirstTry: 1 }
  },
  {
    member: {
      id: "CAND-015",
      name: "Noah Kim",
      jobRole: "Principal Architect",
      yearsExperience: 20,
      education: "MS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
      { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
      { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 29, missionsCompleted: 29, missionsFirstTry: 27 }
  },
  {
    member: {
      id: "CAND-016",
      name: "Isabella Rossi",
      jobRole: "Software Engineer",
      yearsExperience: 5,
      education: "BS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 7, title: "Embeddings Explained", passed: false, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: false, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
      { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 4 },
      { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
      { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 19, missionsCompleted: 21, missionsFirstTry: 2 }
  },
  {
    member: {
      id: "CAND-017",
      name: "Tyler Brooks",
      jobRole: "Junior Developer",
      yearsExperience: 0,
      education: "GED + Coding Bootcamp Certificate",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 5 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 4 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
    ],
    signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 1 }
  },
  {
    member: {
      id: "CAND-018",
      name: "Diane Foster",
      jobRole: "AI Engineer",
      yearsExperience: 4,
      education: "MS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
      { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 31 }
  },
  {
    member: {
      id: "CAND-019",
      name: "Frank DeLuca",
      jobRole: "Legacy Systems Engineer",
      yearsExperience: 25,
      education: "BS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
      { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
      { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
      { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 5 },
      { day: 19, title: "Response Formatting & Rich Outputs", passed: true, attempts: 4 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
      { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
    ],
    signals: { commitDays: 26, missionsCompleted: 29, missionsFirstTry: 11 }
  },
  {
    member: {
      id: "CAND-020",
      name: "Priyanka Sharma",
      jobRole: "Software Engineer",
      yearsExperience: 5,
      education: "BS Computer Science",
      status: "COMPLETED"
    },
    missions: [
      { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
      { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
      { day: 4, title: "Reading & Processing Structured Data", skipped: true },
      { day: 7, title: "Embeddings Explained", passed: false, attempts: 2 },
      { day: 8, title: "Vector Databases Overview", skipped: true },
      { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
      { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
      { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
      { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
      { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
    ],
    signals: { commitDays: 24, missionsCompleted: 27, missionsFirstTry: 19 }
  }
];

// Default fallback candidate (Emily Chen)
export const CANDIDATE = {
  name: COHORT_CANDIDATES[2].member.name,
  role: COHORT_CANDIDATES[2].member.jobRole,
  experience: `${COHORT_CANDIDATES[2].member.yearsExperience} years`,
  education: COHORT_CANDIDATES[2].member.education,
  cohortStatus: 'Active · Day 18 of 31',
  completedMissions: COHORT_CANDIDATES[2].signals.missionsCompleted,
  totalMissions: 31,
}

export const FOCUS_AREAS = [
  'Embeddings & Vector Search',
  'Prompt Engineering',
  'Multi-Agent Orchestration',
  'MCP',
  'Deployment & Security',
]

export const MOCK_FEEDBACK = {
  summary:
    'Strong foundational understanding of retrieval systems and RAG architecture with clear reasoning ability. Demonstrates a solid grasp of embeddings, vector search, and agentic patterns. Further depth is recommended in production evaluation frameworks, MCP tool lifecycle management, and enterprise security guardrails.',
  strengths: [
    'Strong understanding of vector embeddings and semantic similarity',
    'Good RAG architecture reasoning and component awareness',
    'Clear ability to articulate trade-offs in system design',
    'Solid grasp of agentic AI patterns and orchestration concepts',
  ],
  gaps: [
    'Retrieval evaluation metrics and RAGAS-style evaluation frameworks',
    'MCP tool lifecycle and session management specifics',
    'Production security considerations and prompt injection defenses',
    'Fine-tuning strategy — when to use it versus RAG',
  ],
  next: [
    'Practice building RAGAS evaluation pipelines on your current projects',
    'Review the MCP specification and implement a custom tool server',
    'Study OWASP LLM Top 10 and apply guardrails to production systems',
    'Complete Day 19–22 missions focusing on multi-agent orchestration',
  ],
  topicScores: [
    { topic: 'Embeddings', score: 92, label: 'Strong' },
    { topic: 'Vector Databases', score: 88, label: 'Strong' },
    { topic: 'RAG', score: 79, label: 'Good' },
    { topic: 'Prompt Engineering', score: 74, label: 'Good' },
    { topic: 'Agentic AI', score: 85, label: 'Strong' },
    { topic: 'MCP', score: 58, label: 'Developing' },
    { topic: 'Security', score: 45, label: 'Needs Review' },
    { topic: 'Deployment', score: 68, label: 'Good' },
  ],
}