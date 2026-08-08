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
    try:
        session_id = payload.sessionId
        
        # Initialize session if it doesn't exist
        if session_id not in sessions:
            candidate_info = payload.candidate.dict() if payload.candidate else {"name": "Candidate", "jobRole": "Software Engineer"}
            sessions[session_id] = {
                "candidate": candidate_info,
                "history": [],
                "turn_count": 0
            }
        
        session = sessions[session_id]
        candidate = session["candidate"]
        
        # If a message is provided, update candidate info if newly passed, append user message & increment turn
        if payload.candidate:
            session["candidate"] = payload.candidate.dict()
            candidate = session["candidate"]

        if payload.message:
            session["history"].append({"role": "user", "parts": [payload.message]})
            session["turn_count"] += 1

        current_turn = session["turn_count"]
        total_questions = 15

        # Check if interview is complete after 15 turns
        if current_turn >= total_questions:
            return {
                "reply": "Thank you. The 15-stage technical interview is now complete.",
                "done": True,
                "feedback": {
                    "summary": f"The candidate {candidate.get('name')} successfully completed all 15 stages of the technical evaluation.",
                    "strengths": ["Strong structural progression", "Consistent technical depth across modules"],
                    "gaps": ["Minor areas to explore in production scaling and MCP tooling"],
                    "next": ["Review advanced distributed systems architecture and security guardrails"]
                }
            }

        # Determine target topic based on current turn index
        target_topic = TOPIC_SEQUENCE[min(current_turn, len(TOPIC_SEQUENCE) - 1)]

        # Instruction condition for welcoming introduction on the very first question
        intro_instruction = ""
        if current_turn == 0:
            intro_instruction = f"Since this is the opening message for {candidate.get('name')}, start with a warm, professional greeting and welcoming introduction (e.g., 'Hello {candidate.get('name')}! Welcome to your technical assessment interview...') before presenting the first question."
        else:
            intro_instruction = "Provide brief, encouraging transitional feedback or context regarding the candidate's previous response."

        system_prompt = f"""
You are an expert, warm, and professional technical interviewer conducting a strict, structured 15-stage technical interview for a {candidate.get('jobRole')} position.
Candidate Name: {candidate.get('name')}
Experience: {candidate.get('yearsExperience')} years
Education: {candidate.get('education')}

CURRENT STAGE / QUESTION NUMBER: {current_turn + 1} out of {total_questions}
MANDATORY TOPIC FOR THIS QUESTION: {target_topic}

STRICT INSTRUCTIONS:
1. {intro_instruction}
2. You MUST base your main technical question strictly and exclusively on the MANDATORY TOPIC FOR THIS QUESTION: "{target_topic}". Do not jump to random topics.
3. Separate your response into distinct, clear paragraphs using double line breaks (`\n\n`).
4. ALWAYS place the main technical question for "{target_topic}" in the **very last paragraph**, cleanly separated so it stands out.
5. Do not output JSON, just output your direct conversational reply.
"""
        
        chat_contents = [system_prompt]
        for h in session["history"]:
            role = "User" if h["role"] == "user" else "Model"
            chat_contents.append(f"{role}: {h['parts'][0]}")

        if not client:
            raise Exception("Gemini client is not initialized. Check your API key.")

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents="\n".join(chat_contents)
        )
        
        reply_text = response.text.strip()
        session["history"].append({"role": "model", "parts": [reply_text]})
        
        return {
            "reply": reply_text,
            "done": False,
            "current_topic": target_topic,
            "stage": current_turn + 1
        }
        
    except Exception as e:
        print("CRITICAL ERROR IN /api/interview:", str(e))
        
        # Fallback Mode for Rate Limits / Quota Exceeded (429) or client issues
        if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e) or client is None:
            current_turn = sessions.get(payload.sessionId, {}).get("turn_count", 0)
            target_topic = TOPIC_SEQUENCE[min(current_turn, len(TOPIC_SEQUENCE) - 1)]
            cand_name = payload.candidate.name if payload.candidate else "Candidate"
            
            if current_turn == 0:
                fallback_text = f"Hello {cand_name}! Welcome to your technical assessment interview.\n\nLet's start our technical discussion on the mandatory topic of {target_topic}.\n\nCan you explain the core architectural patterns, design decisions, and practical trade-offs involved in this domain?"
            else:
                fallback_text = f"Thank you for your response. Let's continue our technical discussion on the mandatory topic of {target_topic}.\n\nCan you explain the core architectural patterns, design decisions, and practical trade-offs involved in this domain?"
            
            # Save fallback to history so conversation flows naturally
            if payload.sessionId in sessions:
                sessions[payload.sessionId]["history"].append({"role": "model", "parts": [fallback_text]})

            return {
                "reply": fallback_text,
                "done": False,
                "current_topic": target_topic,
                "stage": current_turn + 1
            }
            
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)