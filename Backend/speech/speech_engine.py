class SpeechEngine:
    def transcribe_audio(self, audio_base64: str):
        return {"transcript": "I used Redis for caching to reduce database latency in the API."}

    def text_to_speech_audio(self, text: str):
        return {"audioUrl": "data:audio/mp3;base64,mockaudio=="}

speech_engine = SpeechEngine()