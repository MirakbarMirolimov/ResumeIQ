import { supabase } from './supabase'
import { UserService } from './user-service'

export interface AuthUser {
  id: string
  email: string
  email_confirmed_at?: string
  user_metadata?: {
    full_name?: string
  }
}

export class AuthService {
  /**
   * Sign up with email and password
   */
  static async signUp(email: string, password: string, fullName?: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        console.error('Sign up error:', error)
        return { user: null, error: error.message }
      }

      // Create user record in our users table if sign up was successful
      if (data.user) {
        await UserService.createUser({
          id: data.user.id,
          email: data.user.email!,
          full_name: fullName
        })
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Sign in with email and password
   */
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        console.error('Sign in error:', error)
        return { user: null, error: error.message }
      }

      return { user: data.user, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { user: null, error: 'An unexpected error occurred' }
    }
  }

  /**
   * Sign out
   */
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        return { error: error.message }
      }
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error: 'An unexpected error occurred' }
    }
  }

  /**
   * Get current user
   */
  static async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.error('Get user error:', error)
        return null
      }
      return user
    } catch (error) {
      console.error('Get user error:', error)
      return null
    }
  }

  /**
   * Reset password
   */
  static async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      })

      if (error) {
        console.error('Reset password error:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error: 'An unexpected error occurred' }
    }
  }

  /**
   * Update password
   */
  static async updatePassword(newPassword: string) {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) {
        console.error('Update password error:', error)
        return { error: error.message }
      }

      return { error: null }
    } catch (error) {
      console.error('Update password error:', error)
      return { error: 'An unexpected error occurred' }
    }
  }

  /**
   * Listen to auth state changes
   */
  static onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback)
  }
}
