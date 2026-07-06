import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'member' | 'viewer'
          avatar_url: string | null
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'member' | 'viewer'
          avatar_url?: string | null
        }
        Update: {
          full_name?: string | null
          role?: 'admin' | 'member' | 'viewer'
          avatar_url?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          status: 'todo' | 'in_progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          agent: string | null
          project: string | null
          user_id: string
          created_at: string
        }
        Insert: {
          title: string
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          agent?: string | null
          project?: string | null
          user_id: string
        }
        Update: {
          title?: string
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          agent?: string | null
          project?: string | null
        }
      }
      agents: {
        Row: {
          id: string
          name: string
          role: string
          desc: string
          model: string
          status: 'active' | 'idle' | 'running'
          tasks_count: number
          user_id: string
          system_prompt: string | null
          created_at: string
        }
        Insert: {
          name: string
          role: string
          desc: string
          model: string
          status?: 'active' | 'idle' | 'running'
          user_id: string
          system_prompt?: string | null
        }
        Update: {
          name?: string
          desc?: string
          model?: string
          status?: 'active' | 'idle' | 'running'
          system_prompt?: string | null
        }
      }
      chat_messages: {
        Row: {
          id: string
          role: 'user' | 'assistant'
          content: string
          model: string | null
          user_id: string
          session_id: string
          created_at: string
        }
        Insert: {
          role: 'user' | 'assistant'
          content: string
          model?: string | null
          user_id: string
          session_id: string
        }
        Update: {
          content?: string
        }
      }
    }
  }
}
