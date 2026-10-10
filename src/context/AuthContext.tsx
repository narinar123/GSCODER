import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  email: string
  phone?: string
  name: string
  role: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  isDemo: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

const SUPABASE_CONFIGURED = Boolean(
  supabaseUrl &&
    supabaseKey &&
    supabaseUrl !== 'https://placeholder.supabase.co' &&
    supabaseKey !== 'placeholder-anon-key',
)

function configurationError() {
  return 'Authentication is unavailable because the production Supabase configuration is missing.'
}

function authError(message: string | undefined) {
  if (!message) return 'Unable to complete authentication. Please try again.'
  if (/invalid login credentials|user already registered/i.test(message)) return 'Invalid email or password.'
  return message
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!SUPABASE_CONFIGURED) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email || '',
          role: 'Admin',
        })
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.user_metadata?.full_name || session.user.email || '',
          role: 'Admin',
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!SUPABASE_CONFIGURED) return { error: configurationError() }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: authError(error?.message) }
  }

  const signUp = async (email: string, password: string, name: string): Promise<{ error: string | null }> => {
    if (!SUPABASE_CONFIGURED) return { error: configurationError() }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo:
          import.meta.env.VITE_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
      },
    })
    return { error: authError(error?.message) }
  }

  const signOut = async () => {
    if (!SUPABASE_CONFIGURED) {
      setUser(null)
      return
    }
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, isDemo: !SUPABASE_CONFIGURED }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
