# 🕷️ AI Vecna Curse Experience

An immersive **AI-powered cinematic web experience** inspired by *Stranger Things*, where users undergo a simulated **Vecna Curse Scan** using their **camera, microphone, and AI analysis**, followed by dynamic results and a global leaderboard.

---

## 🚀 Live Demo
👉 **Live URL:** https://your-deployed-url-here  

> ⚠️ Camera & microphone require **HTTPS**, so please use the deployed link (not localhost).

---

## 🧠 About the Project

AI Vecna Curse Experience is a creative interactive project that blends **AI concepts, multimedia input, and cinematic UI/UX**.  
Users experience a fictional scan that analyzes voice and visual input to generate a dramatic “curse result,” inspired by the Upside Down universe.

---

## ✨ Features

- 🎥 Live **camera access** during scan
- 🎤 Real-time **microphone activity detection**
- 🤖 AI-powered curse simulation (Google AI Studio – Gemini)
- 🎞️ Cinematic animations & transitions
- 🏆 Global **leaderboard stored in Firebase Firestore**
- 📱 Mobile-optimized (reduced effects for smooth performance)
- 🔐 Secure backend (no API keys exposed)

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend
- Node.js
- Express.js
- Firebase Admin SDK
- Google AI Studio (Gemini API)

### Database
- Firebase Firestore

---

## 🗂️ Project Structure
vecna_proj/
├─ backend/
│  ├─ index.js
│  ├─ routes/
│  ├─ services/
│  ├─ serviceAccountKey.json (ignored in Git)
│  └─ package.json
│
├─ src/
│  ├─ components/
│  ├─ hooks/
│  ├─ pages/
│  ├─ types/
│  └─ index.css
│
├─ public/
├─ package.json
└─ README.md
## ⚙️ Running the Project Locally

### 1️⃣ Clone the repository

git clone <your-github-repo-url>
cd vecna_proj
## ⚙️ Running the Project Locally

### 2️⃣ Install Frontend Dependencies
npm install

### 3️⃣ Start the frontend (Vite dev server)
npm run dev

Frontend starts on: http://localhost:5173

## 🔙 Backend Setup (Local)

cd backend
npm install
npm start

Backend runs on: http://localhost:5000

## 🔐 Environment Variables

Create a .env file inside the backend folder:
PORT=5000
GEMINI_API_KEY=your_google_ai_studio_key
Firebase credentials are securely loaded using serviceAccountKey.json
(this file is excluded from Git via .gitignore).

## 🌍 Deployment

### Recommended Setup

Frontend: Railway or Vercel
Backend: Railway
Database: Firebase Firestore

HTTPS deployment is mandatory for camera and microphone access,
especially on mobile devices.

## 📱 Mobile Performance Optimization

To ensure smooth performance on mobile devices:

Heavy background animations are disabled
Particle effects are reduced or removed
Camera resolution is lowered
Microphone updates are throttled

This ensures a stable, lag-free scanning experience.

## 🏆 Use Cases

College exhibitions
Hackathons and technical demos
AI concept showcases
Interactive UI/UX projects
Cinematic web experiences

## 🎤 Demo Explanation (For Judges)

“This project is an AI-powered interactive web experience using camera and microphone input, Google AI Studio for AI analysis, Firebase Firestore for persistent leaderboard storage, and a cinematic UI inspired by Stranger Things.”

## 🔒 Security Notes

API keys are never exposed to the frontend
Firebase service account key is excluded via .gitignore
All sensitive operations are handled on the backend

## 📜 License

This project is intended for educational and demonstration purposes only.



