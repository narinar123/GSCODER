import { useState, useCallback, useRef } from 'react'
import { streamChat, type ChatMessage } from '@/lib/llm'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/context/AuthContext'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
  ts: Date
}

const SESSION_ID = `session-${Date.now()}`

const AGENT_SYSTEM_PROMPTS: Record<string, string> = {
  Chat: 'You are GSQoderAI, a highly capable AI assistant specializing in software development, AI, and business strategy. Be concise, helpful, and technically precise.',
  Agents: 'You are a Multi-Agent Orchestrator. Help the user design, configure and run AI agents. Suggest agent architectures, tools, and workflows.',
  Research: 'You are a Research Agent. Perform comprehensive web research, synthesize information, provide citations and summaries with key insights.',
  Code: 'You are a Senior Software Engineer. Write clean, well-commented, production-ready code. Support all major languages and frameworks.',
  Design: 'You are a UX/UI Design Expert. Help with interface design, user flows, design systems, color theory, and frontend implementation.',
  Analyze: 'You are a Data Analyst and Business Intelligence Expert. Analyze data, create insights, provide charts suggestions and business recommendations.',
  Automate: 'You are an Automation Architect. Design workflow automation, API integrations, trigger-based systems, and process optimization.',
  Generate: 'You are a Creative AI Assistant. Generate marketing copy, content, images descriptions, stories, and creative assets.',
  Vision: 'You are a Computer Vision AI Expert. Analyze images, extract data, describe visual content, and build vision-based solutions.',
}

export function useChat(activeMode = 'Chat') {
  const { user } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gemini-1.5-flash')
  const abortRef = useRef<boolean>(false)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isStreaming) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      ts: new Date(),
    }

    setMessages(prev => [...prev, userMsg])
    setIsStreaming(true)
    abortRef.current = false

    const assistantMsgId = `assistant-${Date.now()}`
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      model: selectedModel,
      ts: new Date(),
    }
    setMessages(prev => [...prev, assistantMsg])

    // Save user message to DB if logged in
    if (user) {
      try {
        await supabase.from('chat_messages').insert({
          role: 'user',
          content: content.trim(),
          user_id: user.id,
          session_id: SESSION_ID,
        })
      } catch {
        // silently fail if DB not configured
      }
    }

    const chatHistory: ChatMessage[] = messages
      .slice(-10)
      .map(m => ({ role: m.role, content: m.content }))
    chatHistory.push({ role: 'user', content: content.trim() })

    let fullResponse = ''
    try {
      const systemPrompt = AGENT_SYSTEM_PROMPTS[activeMode] || AGENT_SYSTEM_PROMPTS.Chat
      for await (const chunk of streamChat(chatHistory, systemPrompt)) {
        if (abortRef.current) break
        fullResponse += chunk
        setMessages(prev =>
          prev.map(m =>
            m.id === assistantMsgId ? { ...m, content: fullResponse } : m
          )
        )
      }

      // Save assistant response to DB
      if (user && fullResponse) {
        try {
          await supabase.from('chat_messages').insert({
            role: 'assistant',
            content: fullResponse,
            model: selectedModel,
            user_id: user.id,
            session_id: SESSION_ID,
          })
        } catch {
          // silently fail
        }
      }
    } finally {
      setIsStreaming(false)
    }
  }, [isStreaming, messages, selectedModel, activeMode, user])

  const stopStreaming = useCallback(() => {
    abortRef.current = true
    setIsStreaming(false)
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isStreaming,
    selectedModel,
    setSelectedModel,
    sendMessage,
    stopStreaming,
    clearMessages,
  }
}
