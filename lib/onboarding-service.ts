import { supabase, OnboardingData } from './supabase'

// Generate a unique session ID for tracking user journey
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// Save onboarding data to Supabase
export async function saveOnboardingData(data: OnboardingData) {
  try {
    const { data: result, error } = await supabase
      .from('onboarding_responses')
      .insert([
        {
          session_id: data.session_id,
          user_type: data.user_type,
          purpose: data.purpose,
          source: data.source,
          account_method: data.account_method || null
        }
      ])
      .select()

    if (error) {
      console.error('Error saving onboarding data:', error)
      return { success: false, error: error.message }
    }

    console.log('Onboarding data saved successfully:', result)
    return { success: true, data: result }
  } catch (err) {
    console.error('Unexpected error saving onboarding data:', err)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

// Get onboarding data by session ID (for analytics or user retrieval)
export async function getOnboardingData(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from('onboarding_responses')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (error) {
      console.error('Error fetching onboarding data:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error fetching onboarding data:', err)
    return { success: false, error: 'Unexpected error occurred' }
  }
}

// Get all onboarding responses (for admin/analytics)
export async function getAllOnboardingData(limit = 100) {
  try {
    const { data, error } = await supabase
      .from('onboarding_responses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error fetching all onboarding data:', error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (err) {
    console.error('Unexpected error fetching all onboarding data:', err)
    return { success: false, error: 'Unexpected error occurred' }
  }
}
