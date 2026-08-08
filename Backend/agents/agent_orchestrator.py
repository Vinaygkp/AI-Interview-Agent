class AgentOrchestrator:
    def route_query(self, query: str, context: dict = None):
        from google import genai
        client = genai.Client()
        
        prompt = f"You are an expert technical interviewer. Evaluate and respond to the candidate's query professionally: {query}"
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=prompt
        )
        return response.text.strip()

orchestrator = AgentOrchestrator()