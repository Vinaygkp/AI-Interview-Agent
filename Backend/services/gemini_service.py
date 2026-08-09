import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

class GeminiService:
    def __init__(self):
        self.model_name = "gemini-1.5-pro"

    def generate_next_step(self, prompt: str) -> dict:
        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                generation_config={"response_mime_type": "application/json"}
            )
            response = model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            raise RuntimeError(f"Gemini API generation failed: {str(e)}")

    def generate_feedback(self, prompt: str) -> dict:
        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                generation_config={"response_mime_type": "application/json"}
            )
            response = model.generate_content(prompt)
            return json.loads(response.text)
        except Exception as e:
            raise RuntimeError(f"Gemini feedback generation failed: {str(e)}")

gemini_service = GeminiService()