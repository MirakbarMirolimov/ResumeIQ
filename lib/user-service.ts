import { supabase } from './supabase'
import { User, CreateUserData, CreditTransaction } from './types/user'

export class UserService {
  /**
   * Create a new user with initial 3 credits
   */
  static async createUser(userData: CreateUserData): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert({
          id: userData.id,
          email: userData.email,
          full_name: userData.full_name,
          username: userData.username,
          credits: 3 // Initial credits
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in createUser:', error)
      return null
    }
  }

  /**
   * Get user by ID
   */
  static async getUserById(userId: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Error fetching user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserById:', error)
      return null
    }
  }

  /**
   * Get user by email
   */
  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single()

      if (error) {
        console.error('Error fetching user by email:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserByEmail:', error)
      return null
    }
  }

  /**
   * Deduct credits from user (for using services)
   */
  static async deductCredits(userId: string, amount: number = 1): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('deduct_user_credits', {
        user_id: userId,
        credit_amount: amount
      })

      if (error) {
        console.error('Error deducting credits:', error)
        return false
      }

      return data === true
    } catch (error) {
      console.error('Error in deductCredits:', error)
      return false
    }
  }

  /**
   * Add credits to user (for purchases)
   */
  static async addCredits(userId: string, amount: number): Promise<boolean> {
    try {
      const { data, error } = await supabase.rpc('add_user_credits', {
        user_id: userId,
        credit_amount: amount
      })

      if (error) {
        console.error('Error adding credits:', error)
        return false
      }

      return data === true
    } catch (error) {
      console.error('Error in addCredits:', error)
      return false
    }
  }

  /**
   * Check if user has enough credits for a service
   */
  static async hasEnoughCredits(userId: string, requiredCredits: number = 1): Promise<boolean> {
    try {
      const user = await this.getUserById(userId)
      if (!user) return false
      
      return user.credits >= requiredCredits
    } catch (error) {
      console.error('Error checking credits:', error)
      return false
    }
  }

  /**
   * Get user's current credit balance
   */
  static async getCreditBalance(userId: string): Promise<number> {
    try {
      const user = await this.getUserById(userId)
      return user?.credits || 0
    } catch (error) {
      console.error('Error getting credit balance:', error)
      return 0
    }
  }

  /**
   * Update user profile
   */
  static async updateUser(userId: string, updates: Partial<Pick<User, 'full_name' | 'email' | 'username'>>): Promise<User | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

      if (error) {
        console.error('Error updating user:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in updateUser:', error)
      return null
    }
  }

  /**
   * Check if username is available
   */
  static async isUsernameAvailable(username: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single()

      if (error && error.code === 'PGRST116') {
        // No rows returned, username is available
        return true
      }

      // Username exists
      return false
    } catch (error) {
      console.error('Error checking username availability:', error)
      return false
    }
  }

  /**
   * Set username for user
   */
  static async setUsername(userId: string, username: string): Promise<User | null> {
    try {
      // First check if username is available
      const isAvailable = await this.isUsernameAvailable(username)
      if (!isAvailable) {
        throw new Error('Username is already taken')
      }

      return await this.updateUser(userId, { username })
    } catch (error) {
      console.error('Error setting username:', error)
      return null
    }
  }
}

// Credit purchase options
export const CREDIT_PACKAGES = [
  {
    id: 'starter',
    name: 'Starter Pack',
    credits: 10,
    price: 9.99,
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional Pack',
    credits: 25,
    price: 19.99,
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Pack',
    credits: 50,
    price: 34.99,
    popular: false
  }
]
