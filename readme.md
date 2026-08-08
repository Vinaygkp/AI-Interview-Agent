# ⚡ AI Interview Agent · Next-Gen Technical Interview Platform

An advanced AI-powered technical interview and evaluation platform designed for modern tech cohorts, engineering students, and professional assessments. The platform dynamically simulates realistic 15-stage technical interviews, adapts to candidate profiles, and generates comprehensive performance reports.

---

## 🏗️ Project Architecture & Directory Map

```text
AI-INTERVIEW/
│
├── .vscode/                 # VS Code workspace settings
├── Backend/                 # Python FastAPI backend server
│   ├── agents/              # AI interview and evaluation logic agents
│   ├── ocr/                 # OCR processing utility for document analysis
│   ├── rag/                 # Retrieval & context processing logic
│   ├── speech/              # Speech-to-text / Audio processing utilities
│   ├── venv/                # Python virtual environment
│   ├── .env                 # Environment variables & secret keys
│   ├── candidates.json      # Cohort candidate profile schemas
│   ├── curriculum.json      # 31-day AI Cohort curriculum mappings
│   ├── main.py              # FastAPI application entry point
│   └── technical-spec.md    # System technical requirements & specs
│
├── Frontend/                # React + Vite client application
│   ├── .figma               # UI/UX design assets and tokens
│   ├── .vite                # Vite build cache
│   ├── node_modules/        # Project npm dependencies
│   ├── src/                 # Source code directory
│   │   ├── screens/         # Page views and screen components
│   │   │   ├── Completion.tsx  # Post-interview success & metrics screen
│   │   │   ├── Feedback.tsx    # Detailed AI performance report screen
│   │   │   ├── Home.tsx        # Landing page with workflow & topic coverage
│   │   │   ├── Interview.tsx   # Live 15-stage interactive interview room
│   │   │   ├── Setup.tsx       # Candidate profile selection & configuration
│   │   │   └── Splash.tsx      # High-tech animated splash startup screen
│   │   ├── App.tsx          # Main router, theme & state controller
│   │   ├── data.ts          # Mock candidate dataset and focus areas
│   │   ├── index.css        # Global styles, variables & animations
│   │   ├── main.tsx         # React application root mount
│   │   └── vite-env.d.ts    # Vite type declarations
│   ├── index.html           # HTML document template
│   ├── package.json         # Dependency scripts & configurations
│   ├── package-lock.json    # Dependency lock file
│   ├── tsconfig.json        # TypeScript configuration
│   └── vite.config.ts       # Vite bundler configuration
│
├── PROMPTS.md               # AI-usage log & prompt verification transcript
└── .gitignore               # Ignored build & cache files


✨ Key Features:-

1.🚀 High-Tech Splash Experience: Immersive animated startup screen featuring futuristic ambient glows and grid mesh aesthetics.
2.🌐 Dynamic Candidate Profiles: Switch between various candidate backgrounds to test tailored questions across different experience levels.
3.💬 15-Stage Interactive Assessment: Real-time conversational interview flow powered by intelligent AI backend loops.
4.📊 Comprehensive Performance Feedback: Executive summaries, key strengths, knowledge gaps, and topic-wise competency scores generated dynamically.
5.🌓 Dark & Light Themes: Instant theme toggling with smooth transitions and persistent state styling.
6.🎨 Vibrant Multicolor UI: Rich visual hierarchy using color-coded accents for curriculum topics, progress tracking, and interactive states.


🛠️ Tech Stack:-

1.Frontend: React, TypeScript, Vite, Custom CSS Styling,
2.Backend: Python, FastAPI, Uvicorn, Pydantic, JSON Data Handling,
3.Tools & Utilities: Git, VS Code,

🚀 Getting Started & Installation

1.The Repository link:-



2. Setup the Backend:-
Navigate to the Backend directory, activate your virtual environment, and start the FastAPI
server:
cd Backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install fastapi uvicorn pydantic python-dotenv
uvicorn main:app --reload

3. Setup the Frontend:-
cd Frontend
npm install
npm run dev

👨‍💻 Developed by Team:SYNTAX
Designed and built independently. All rights reserved.