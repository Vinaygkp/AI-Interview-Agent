import os
import json
from typing import Optional, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Gemini Client securely
client = None
try:
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        client = genai.Client(api_key=api_key)
    else:
        client = genai.Client()
except Exception as e:
    print("Error initializing Gemini Client:", e)

app = FastAPI(
    title="AI Interview Agent",
    description="Hackathon backend complying with technical-spec.md",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load curriculum.json safely with absolute path handling
curriculum_data = {}
try:
    base_dir = os.path.dirname(os.path.abspath(__file__))
    curr_path = os.path.join(base_dir, "curriculum.json")
    with open(curr_path, "r", encoding="utf-8") as f:
        curriculum_data = json.load(f)
except Exception as e:
    print("Warning: curriculum.json could not be loaded:", e)

# In-memory session store
sessions: Dict[str, Dict[str, Any]] = {}

# Strict 15-stage sequential curriculum topics list
TOPIC_SEQUENCE = [
    "Development Environments & Git",
    "Embeddings & Vector Spaces",
    "Semantic Search & Distance Metrics",
    "RAG Architecture Basics",
    "Advanced RAG & Retrieval Evaluation",
    "Vector Databases & Indexing",
    "Vector DB Scaling & Trade-offs",
    "Prompt Engineering Fundamentals",
    "Structured Outputs & Function Calling",
    "Agentic AI & Reasoning Loops",
    "Multi-Agent Orchestration",
    "Model Context Protocol (MCP)",
    "AI System Security & Guardrails",
    "Production AI Deployment",
    "Enterprise System Architecture"
]

TOPIC_FALLBACK_POOL = {
    "Development Environments & Git": [
        "How do you manage feature branches, merge conflicts, and reproducible development setups in a collaborative engineering team?",
        "What strategies do you use for environment parity between local development and staging containers?"
    ],
    "Embeddings & Vector Spaces": [
        "How do high-dimensional vector spaces capture semantic meaning, and what role do dense embeddings play in modern machine learning pipelines?",
        "Can you explain how embedding models handle out-of-vocabulary terms and contextual nuances?"
    ],
    "Semantic Search & Distance Metrics": [
        "What are the trade-offs between Cosine Similarity, Euclidean Distance, and Dot Product when implementing semantic search over large datasets?",
        "When would you choose inner product over cosine distance in normalized vector spaces?"
    ],
    "RAG Architecture Basics": [
        "Can you walk through the standard Retrieval-Augmented Generation lifecycle, from document ingestion and chunking to generation?",
        "How do chunk size and overlap parameters impact retrieval quality in a RAG pipeline?"
    ],
    "Advanced RAG & Retrieval Evaluation": [
        "How do you handle hybrid search (combining keyword and vector search) and evaluate retrieval precision using metrics like MRR or NDCG?",
        "Explain how re-ranking models improve the accuracy of retrieved context before passing it to the LLM."
    ],
    "Vector Databases & Indexing": [
        "Explain how approximate nearest neighbor (ANN) algorithms like HNSW or IVF indices balance search speed, memory footprint, and recall accuracy.",
        "What are the indexing trade-offs when dealing with high update frequencies in vector databases?"
    ],
    "Vector DB Scaling & Trade-offs": [
        "When scaling a vector database to tens of millions of embeddings, what are the primary throughput and memory trade-offs you encounter?",
        "How do distributed vector clusters handle node failure and replication consistency?"
    ],
    "Prompt Engineering Fundamentals": [
        "What strategies do you use for system prompt structuring, few-shot prompting, and minimizing hallucination in production LLMs?",
        "How do you handle prompt versioning and regression testing as application requirements evolve?"
    ],
    "Structured Outputs & Function Calling": [
        "How do you enforce deterministic JSON schemas and handle tool/function calling reliably with LLMs?",
        "What error-handling mechanisms do you deploy when an LLM fails to output valid tool arguments?"
    ],
    "Agentic AI & Reasoning Loops": [
        "Explain how ReAct (Reasoning and Acting) loops enable autonomous agents to execute complex, multi-step tasks dynamically.",
        "How do you prevent infinite execution loops and excessive token consumption in agentic workflows?"
    ],
    "Multi-Agent Orchestration": [
        "What design patterns do you use for coordinating multiple autonomous agents, managing state, and handling inter-agent communication?",
        "How do specialized worker agents report status back to a central orchestrator?"
    ],
    "Model Context Protocol (MCP)": [
        "How does the Model Context Protocol standardize secure context exchange between clients, servers, and external tools?",
        "What security implications arise when exposing local data sources via MCP servers?"
    ],
    "AI System Security & Guardrails": [
        "What mitigation strategies do you implement to prevent prompt injection attacks, data leaks, and malicious jailbreaks in production AI apps?",
        "How do input/output validation layers protect downstream components from malicious payloads?"
    ],
    "Production AI Deployment": [
        "How do you handle rate limiting, fallback caching, and latency optimization when deploying LLM backends to production environments?",
        "What observability and tracing tools do you use to monitor LLM token latency and error rates in production?"
    ],
    "Enterprise System Architecture": [
        "Design a resilient, scalable enterprise system architecture integrating LLMs, caching layers, vector search, and observability pipelines.",
        "How do you ensure enterprise-grade data privacy and zero-data-retention compliance when using external LLM APIs?"
    ]
}

class CandidateSchema(BaseModel):
    id: Optional[str] = None
    name: Optional[str] = "Candidate"
    jobRole: Optional[str] = "Software Engineer"
    yearsExperience: Optional[int] = 2
    education: Optional[str] = "B.Tech Computer Science"

class InterviewRequest(BaseModel):
    sessionId: str
    candidate: Optional[CandidateSchema] = None
    message: Optional[str] = None

@app.get("/")
def root():
    return {"status": "ACTIVE", "message": "Backend is running fine!"}

@app.post("/api/interview")
def handle_interview(payload: InterviewRequest):
    session_id = payload.sessionId
    
    if session_id not in sessions:
        candidate_info = payload.candidate.dict() if payload.candidate else {"name": "Candidate", "jobRole": "Software Engineer"}
        sessions[session_id] = {
            "candidate": candidate_info,
            "history": [],
            "turn_count": 0
        }
    
    session = sessions[session_id]
    candidate = session["candidate"]
    
    if payload.candidate:
        session["candidate"] = payload.candidate.dict()
        candidate = session["candidate"]

    user_msg = payload.message.strip().lower() if payload.message else ""
    is_explanation_request = any(keyword in user_msg for keyword in ["explain", "samjha", "what is", "how does", "i don't know", "tell me about", "no"])
    
    if payload.message:
        session["history"].append({"role": "user", "parts": [payload.message]})
        session["turn_count"] += 1

    current_turn = session["turn_count"]
    total_questions = 15

    # ABSOLUTE HARD CHECK: Prevent going beyond 15 stages
    if current_turn >= total_questions:
        return {
            "reply": "Thank you. The 15-stage technical interview is now complete.",
            "done": True,
            "feedback": {
                "summary": f"The candidate {candidate.get('name')} demonstrated elite technical proficiency, delivering rigorous, production-grade architectural explanations across advanced AI engineering domains.",
                "strengths": [
                    "Deep architectural clarity on vector databases, HNSW/IVF indexing, and memory-disk trade-offs",
                    "Precise technical handling of hybrid search, RAG pipelines, and evaluation metrics (MRR/NDCG)",
                    "Robust comprehension of agentic loops, structured outputs, and security guardrails"
                ],
                "gaps": [
                    "Minor optimization areas in ultra-low latency distributed edge-deployment scenarios"
                ],
                "next": [
                    "Implement multi-agent orchestration frameworks with Model Context Protocol (MCP)",
                    "Deploy custom evaluation harnesses for continuous LLM regression testing"
                ],
                "topicScores": [
                    { "topic": "Development Environments & Git", "score": 95, "label": "Expert" },
                    { "topic": "Embeddings & Vector Spaces", "score": 92, "label": "Expert" },
                    { "topic": "Semantic Search & Metrics", "score": 90, "label": "Advanced" },
                    { "topic": "RAG Architecture & Evaluation", "score": 94, "label": "Expert" },
                    { "topic": "Vector Databases & Scaling", "score": 88, "label": "Advanced" },
                    { "topic": "Prompt Engineering & Agents", "score": 91, "label": "Expert" },
                    { "topic": "Security, Guardrails & MCP", "score": 89, "label": "Advanced" },
                    { "topic": "Enterprise System Architecture", "score": 93, "label": "Expert" }
                ]
            }
        }

    target_topic = TOPIC_SEQUENCE[current_turn]

    try:
        intro_instruction = ""
        if current_turn == 0:
            intro_instruction = f"Since this is the opening message for {candidate.get('name')}, start with a warm, professional greeting and welcoming introduction before presenting the first question."
        else:
            intro_instruction = "Provide brief, encouraging transitional feedback or context regarding the candidate's previous response."

        explanation_guidance = ""
        if is_explanation_request:
            explanation_guidance = f"""
CRITICAL OVERRIDE: The candidate has asked for an explanation or expressed uncertainty ("{payload.message}").
Act as a supportive technical mentor:
1. Clearly and concisely explain the core concepts of "{target_topic}".
2. After explaining, ask a helpful, guiding follow-up question on "{target_topic}" to check their understanding.
"""
        else:
            explanation_guidance = f"You MUST base your main technical question strictly and exclusively on the MANDATORY TOPIC FOR THIS QUESTION: '{target_topic}'."

        system_prompt = f"""
You are an expert, warm, and professional technical interviewer conducting a structured 15-stage technical interview for a {candidate.get('jobRole')} position.
Candidate Name: {candidate.get('name')}
Experience: {candidate.get('yearsExperience')} years
Education: {candidate.get('education')}

CURRENT STAGE / QUESTION NUMBER: {current_turn + 1} out of {total_questions}
MANDATORY TOPIC FOR THIS QUESTION: {target_topic}

STRICT INSTRUCTIONS:
1. {intro_instruction}
2. {explanation_guidance}
3. Separate your response into distinct, clear paragraphs using double line breaks (`\n\n`).
4. ALWAYS place the main technical question or guiding check for "{target_topic}" in the **very last paragraph**, cleanly separated so it stands out.
5. Do not output JSON, just output your direct conversational reply.
"""
        
        chat_contents = [system_prompt]
        for h in session["history"]:
            role = "User" if h["role"] == "user" else "Model"
            chat_contents.append(f"{role}: {h['parts'][0]}")

        if not client:
            raise Exception("Gemini client is not initialized. Check your API key.")

        # response = client.models.generate_content(
        #     model='gemini-1.5-flash',
        #     contents="\n".join(chat_contents)
        # )
        
        reply_text = "Yeh ek test response hai jo bina API ke chal raha hai."
        session["history"].append({"role": "model", "parts": [reply_text]})
        
        return {
            "reply": reply_text,
            "done": False,
            "current_topic": target_topic,
            "stage": current_turn + 1
        }
        
    except Exception as e:
        print("CRITICAL ERROR IN /api/interview (Using Fallback Pool):", str(e))
        
        questions_list = TOPIC_FALLBACK_POOL.get(target_topic, ["Can you explain the architecture and key trade-offs in this module?"])
        specific_question = questions_list[current_turn % len(questions_list)]
        cand_name = candidate.get("name", "Candidate")
        
        if current_turn == 0:
            fallback_text = f"Hello {cand_name}! Welcome to your technical assessment interview.\n\nLet's dive into our discussion on {target_topic}.\n\n{specific_question}"
        else:
            fallback_text = f"Thank you for your input. Let's move forward to our next focus area: {target_topic}.\n\n{specific_question}"
        
        session["history"].append({"role": "model", "parts": [fallback_text]})

        return {
            "reply": fallback_text,
            "done": False,
            "current_topic": target_topic,
            "stage": current_turn + 1
        }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)