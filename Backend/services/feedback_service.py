import json
from services.gemini_service import gemini_service

class FeedbackService:
    @staticmethod
    def generate_final_feedback(session) -> dict:
        conversation_history = "\n".join([f"{m.role.upper()}: {m.content}" for m in session.get("messages", [])])
        
        prompt = f"""
        You are a strict technical interviewer and AI engineering lead. 
        Analyze the complete interview session below and provide structured feedback.
        
        CRITICAL INSTRUCTION ON SCORING & EVALUATION:
        - Look closely at the candidate's answers in the transcript and Q&A records.
        - If the candidate answered "I don't know", gave incorrect answers, or showed weak understanding, reflect this honestly as major gaps and low competency. Do NOT artificially inflate scores.

        Candidate Profile:
        {json.dumps(session.get("candidate", {{}}), indent=2)}

        Interview Q&A Records:
        {json.dumps(session.get("questions", []), indent=2)}

        Conversation Transcript:
        {conversation_history}

        Provide your response strictly as a JSON object matching this schema:
        {{
          "summary": "An honest summary of the candidate's performance.",
          "strengths": ["List strengths if any, otherwise state none"],
          "gaps": ["List specific conceptual gaps based on weak answers or I don't know responses"],
          "next": ["Actionable recommendation 1", ...]
        }}
        """
        
        return gemini_service.generate_feedback(prompt)

feedback_service = FeedbackService()