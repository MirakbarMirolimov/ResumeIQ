import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pkjvnawqtcbfcxsnsbba.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface OnboardingData {
  id?: string
  user_type: string
  purpose: string
  source: string
  account_method?: string
  created_at?: string
  session_id: string
}

export interface OnboardingResponse {
  data: OnboardingData[] | null
  error: any
}
