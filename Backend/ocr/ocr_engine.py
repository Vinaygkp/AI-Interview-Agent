class OCREngine:
    def scan_resume(self, file_data: str):
        return {
            "extractedText": "Sample Resume: B.Tech Computer Science, Skilled in Python, FastAPI, and AI Agents.", 
            "confidence": 0.98
        }

    def scan_code_snippet(self, file_data: str):
        return {
            "extractedText": "Sample Code: def solve_problem(data): # implementation here", 
            "confidence": 0.96
        }

ocr_engine = OCREngine()