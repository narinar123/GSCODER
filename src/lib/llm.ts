// LLM Adapter — supports Google Gemini (primary) and OpenAI (fallback)
// Uses env vars: VITE_GEMINI_API_KEY or VITE_OPENAI_API_KEY

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY
const OPENAI_KEY = import.meta.env.VITE_OPENAI_API_KEY

export type LLMProvider = 'gemini' | 'openai' | 'demo'

export function detectProvider(): LLMProvider {
  if (GEMINI_KEY) return 'gemini'
  if (OPENAI_KEY) return 'openai'
  return 'demo'
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// Demo streaming responses for local dev
const DEMO_RESPONSES = [
  "I'm GSQoderAI, your multi-agent AI workspace. I can help you build SaaS apps, automate workflows, write code, analyze data, and much more. What would you like to create today?",
  "Great! Let me orchestrate a team of specialized AI agents to tackle that for you. I'll coordinate the Product Manager, Designer, Frontend, Backend, QA, and DevOps agents.\n\n```typescript\nconst agents = await AgentOrchestrator.spawn({\n  task: 'your_request',\n  agents: ['PM', 'Designer', 'Frontend', 'Backend', 'QA', 'DevOps'],\n  memory: true,\n  approval: 'human_in_loop'\n})\nawait agents.execute()\n```\n\nEstimated completion: **~3 minutes** with parallel execution.",
  "Here's my analysis:\n\n**Key Findings:**\n1. Architecture: Microservices with event-driven design\n2. Stack: Next.js + FastAPI + PostgreSQL + Redis\n3. AI Layer: LangChain multi-model routing\n4. Deploy: Kubernetes with auto-scaling\n\n**Recommendation:** Start with a monolith MVP, then extract services as you scale. Want me to generate the full implementation plan?",
  "I've completed the research across **47 sources**. Here's the executive summary:\n\n- Market size: $142B growing at 34% CAGR\n- Top competitors: 8 identified with pricing analysis\n- Key differentiators: Speed, multi-agent architecture, enterprise security\n\nShall I generate the full competitive analysis report?",
]

let demoIndex = 0

async function* streamDemo(userMessage: string): AsyncGenerator<string> {
  const response = DEMO_RESPONSES[demoIndex % DEMO_RESPONSES.length]
  demoIndex++
  
  for (let i = 0; i < response.length; i += 3) {
    await new Promise(r => setTimeout(r, 20))
    yield response.slice(i, i + 3)
  }
}

async function* streamGemini(messages: ChatMessage[], systemPrompt?: string): AsyncGenerator<string> {
  const allMessages = systemPrompt
    ? [{ role: 'user' as const, content: `System: ${systemPrompt}\n\nUser: ${messages[messages.length - 1].content}` }]
    : messages

  const body = {
    contents: allMessages.filter(m => m.role !== 'system').map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    })),
    systemInstruction: systemPrompt ? { parts: [{ text: systemPrompt }] } : undefined,
    generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=${GEMINI_KEY}&alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    }
  )

  if (!res.ok || !res.body) {
    throw new Error(`Gemini API error: ${res.status}`)
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const parsed = JSON.parse(data)
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text
          if (text) yield text
        } catch {
          // skip malformed chunks
        }
      }
    }
  }
}

async function* streamOpenAI(messages: ChatMessage[], systemPrompt?: string): AsyncGenerator<string> {
  const allMessages = [
    ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
    ...messages,
  ]

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: allMessages,
      stream: true,
      max_tokens: 4096,
    }),
  })

  if (!res.ok || !res.body) throw new Error(`OpenAI API error: ${res.status}`)

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6).trim()
        if (data === '[DONE]') return
        try {
          const parsed = JSON.parse(data)
          const content = parsed.choices?.[0]?.delta?.content
          if (content) yield content
        } catch {
          // skip
        }
      }
    }
  }
}

export async function* streamChat(
  messages: ChatMessage[],
  systemPrompt?: string
): AsyncGenerator<string> {
  const provider = detectProvider()
  
  try {
    if (provider === 'gemini') {
      yield* streamGemini(messages, systemPrompt)
    } else if (provider === 'openai') {
      yield* streamOpenAI(messages, systemPrompt)
    } else {
      yield* streamDemo(messages[messages.length - 1].content)
    }
  } catch (e) {
    console.error('LLM error, falling back to demo:', e)
    yield* streamDemo(messages[messages.length - 1].content)
  }
}

export const LLM_MODELS = [
  { id: 'gemini-1.5-flash', name: 'Gemini 1.5 Flash', provider: 'Google', fast: true },
  { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', provider: 'Google', fast: false },
  { id: 'gpt-4o', name: 'GPT-4o', provider: 'OpenAI', fast: false },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', fast: true },
  { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', fast: false },
  { id: 'claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic', fast: true },
  { id: 'deepseek-v3', name: 'DeepSeek V3', provider: 'DeepSeek', fast: false },
  { id: 'qwen-3', name: 'Qwen 3', provider: 'Alibaba', fast: false },
  { id: 'mistral-large', name: 'Mistral Large', provider: 'Mistral', fast: false },
]
