
# GSQoderAI — Production-Grade Multi-Agent AI Workspace IDE

<div align="center">
  <img src="https://www.gsgroups.net/gslogo.png" alt="GS Logo" width="80" height="80" />
  <h1>GSQODER.AI</h1>
  <p><strong>The Multi-Agent AI Workspace for Building, Automating & Shipping</strong></p>

  [![GitHub Repo](https://img.shields.io/badge/GitHub-GSCODER-black?logo=github)](https://github.com/narinar123/GSCODER)
  [![Live Demo](https://img.shields.io/badge/Live-Vercel-blue?logo=vercel)](https://gscoder.vercel.app)
  [![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
  [![Electron](https://img.shields.io/badge/Electron-36-47848F?logo=electron)](https://www.electronjs.org)
  [![Supabase](https://img.shields.io/badge/Supabase-Auth+DB-3ECF8E?logo=supabase)](https://supabase.com)
</div>

---

## ✨ Features

### 🤖 Multi-Agent AI System
- **18+ Specialized Agents** — CEO, Product Manager, UX Designer, Frontend Dev, Backend Dev, QA, DevOps, Security, Research, SEO, Marketing, Sales, Support, and more
- **Multi-Agent Pipelines** — Coordinate agents in parallel for complex workflows
- **LLM Router** — Intelligent model selection across GPT-4o, Claude 3.5, Gemini 1.5, DeepSeek V3

### 💬 AI Chat
- **Streaming Chat** — Real-time streaming responses via Gemini or OpenAI
- **9 Operation Modes** — Chat, Agents, Research, Code, Design, Analyze, Automate, Generate, Vision
- **Demo Mode** — Works without any API key — instant guided responses

### ⚡ Workflow Automations
- **80+ Workflow Templates** across Development, AI Agents, Marketing, Sales, Support, Research, DevOps
- **Zapier-style Automation Engine** with triggers, webhooks, cron, and condition branching
- **Memory-aware Workflows** — persistent context across multi-step executions

### 🔌 Integrations
- **40+ Integrations** across 12 categories — AI, Development, Database, Communication, Automation, Analytics, Marketing, Productivity
- **Live Connect/Disconnect** simulation with tier badges (Free / Pro / Enterprise)
- **Custom Integration Builder** for private APIs

### 🖥 Cross-Platform Desktop
- **Electron Desktop App** for macOS, Windows, and Linux
- **Native App Menus** with keyboard shortcuts
- **System Tray** support

### 🔐 Auth & Database
- **Supabase Auth** — Email/password with sign-up, sign-in, session persistence
- **Demo Mode** — Auto-login with pre-filled user for local development
- **DB Schema** — Profiles, Tasks, Agents, Chat Messages tables

---

## 🚀 Quick Start

### Web (Vercel)
```
https://gscoder.vercel.app
```
No setup needed — runs in demo mode out of the box.

### Local Development
```bash
git clone https://github.com/narinar123/GSCODER.git
cd GSCODER
npm install --legacy-peer-deps
cp .env.example .env.local
# Edit .env.local — add your API keys (optional, demo mode works without them)
npm run dev
# Open http://localhost:5173
```

### Electron Desktop
```bash
npm run electron:dev
```

### Production Build
```bash
npm run build          # Web bundle to dist/
npm run electron:build # Desktop app installer
```

---

## ⚙️ Environment Variables

Copy `.env.example` → `.env.local` and fill in the values:

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Optional | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Optional | Supabase anonymous key |
| `VITE_GEMINI_API_KEY` | Optional | Google Gemini API key (enables live LLM) |
| `VITE_OPENAI_API_KEY` | Optional | OpenAI API key (fallback LLM) |

> **Note:** All variables are optional. The app runs in **demo mode** without them, showing simulated AI responses.

---

## 🏗 Architecture

```
src/
├── components/
│   ├── layout/          # DashboardLayout, Sidebar, TopBar, RightPanel
│   ├── shared/          # BrandLogo
│   └── ui/              # Button, Input, Select, Switch, Dialog, Sonner
├── context/
│   └── AuthContext.tsx  # Supabase auth + demo mode
├── hooks/
│   └── useChat.ts       # Streaming LLM chat with DB persistence
├── lib/
│   ├── llm.ts           # Gemini/OpenAI/demo streaming adapter
│   ├── supabase.ts      # Typed Supabase client
│   └── utils.ts
└── pages/               # 16 pages — Workspace, Chat, Agents, Automations, etc.

electron/
├── main.js              # Electron main process
└── preload.js           # Secure contextBridge
```

## 🧠 LLM Providers

| Provider | Models | Mode |
|---|---|---|
| Google Gemini | gemini-1.5-flash, gemini-1.5-pro | Set `VITE_GEMINI_API_KEY` |
| OpenAI | gpt-4o, gpt-4o-mini | Set `VITE_OPENAI_API_KEY` |
| Demo | Built-in responses | Default — no key needed |

---

## 🗄 Supabase Database Schema

```sql
-- Run in your Supabase SQL editor to initialize tables
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'member',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  role TEXT CHECK (role IN ('user', 'assistant')) NOT NULL,
  content TEXT NOT NULL,
  model TEXT,
  user_id UUID REFERENCES profiles(id),
  session_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  desc TEXT,
  model TEXT DEFAULT 'gpt-4o',
  status TEXT DEFAULT 'idle',
  tasks_count INTEGER DEFAULT 0,
  user_id UUID REFERENCES profiles(id),
  system_prompt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own data" ON profiles FOR ALL USING (auth.uid() = id);
CREATE POLICY "Users can manage own messages" ON chat_messages FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own agents" ON agents FOR ALL USING (auth.uid() = user_id);
```

---

## 🎯 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | Tailwind CSS v3, Framer Motion |
| Desktop | Electron 36 |
| Backend | Supabase (Auth + PostgreSQL + Realtime) |
| AI / LLM | Google Gemini 1.5, OpenAI GPT-4o, Claude 3.5 |
| Routing | React Router v7 |
| Icons | Lucide React |
| Charts | Recharts |

---

## 🌐 Live Links

| | URL |
|---|---|
| 🌍 **Live Demo** | https://gscoder.vercel.app |
| 📁 **GitHub** | https://github.com/narinar123/GSCODER |
| 🏢 **GS Groups** | https://www.gsgroups.net |

---

## 📄 License

MIT © 2025 [GS Groups](https://www.gsgroups.net)
