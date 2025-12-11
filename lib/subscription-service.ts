import { supabase } from './supabase'

export interface Subscription {
  id: string
  user_id: string
  plan_id: 'free' | 'pro' | 'premium'
  status: 'active' | 'canceled' | 'expired' | 'past_due'
  current_period_start: string
  current_period_end?: string
  cancel_at_period_end: boolean
  stripe_subscription_id?: string
  stripe_customer_id?: string
  created_at: string
  updated_at: string
}

export interface SubscriptionPlan {
  id: 'free' | 'pro' | 'premium'
  name: string
  price: number
  period: string
  credits_per_period: number
  features: string[]
}

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    credits_per_period: 3,
    features: [
      '3 free credits included',
      'Basic resume templates',
      'Manual resume builder',
      'PDF export'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    period: 'month',
    credits_per_period: 25,
    features: [
      '25 credits per month',
      'AI bullet point generator',
      'AI resume optimization',
      'ATS keyword scoring',
      'Premium template library',
      'Multiple export formats',
      'Email support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 50.99,
    period: '6 months',
    credits_per_period: 200,
    features: [
      '200 credits (6 months)',
      'Unlimited AI generations',
      'Advanced ATS optimization',
      'LinkedIn profile optimization',
      'Cover letter generator',
      'Interview preparation tools',
      'Priority support & coaching'
    ]
  }
]

export class SubscriptionService {
  /**
   * Get user's current subscription
   */
  static async getUserSubscription(userId: string): Promise<Subscription | null> {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching subscription:', error)
        return null
      }

      return data
    } catch (error) {
      console.error('Error in getUserSubscription:', error)
      return null
    }
  }

  /**
   * Create a new subscription
   */
  static async createSubscription(
    userId: string,
    planId: 'free' | 'pro' | 'premium',
    stripeSubscriptionId?: string,
    stripeCustomerId?: string
  ): Promise<Subscription | null> {
    try {
      const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId)
      if (!plan) {
        throw new Error('Invalid plan ID')
      }

      // Calculate period end based on plan
      let currentPeriodEnd: string | undefined
      if (planId === 'pro') {
        // Monthly subscription
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 1)
        currentPeriodEnd = endDate.toISOString()
      } else if (planId === 'premium') {
        // 6-month subscription
        const endDate = new Date()
        endDate.setMonth(endDate.getMonth() + 6)
        currentPeriodEnd = endDate.toISOString()
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_id: planId,
          current_period_end: currentPeriodEnd,
          stripe_subscription_id: stripeSubscriptionId,
          stripe_customer_id: stripeCustomerId
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating subscription:', error)
        return null
      }

      // Update user's current plan
      await supabase
        .from('users')
        .update({ 
          current_plan: planId,
          subscription_id: data.id
        })
        .eq('id', userId)

      return data
    } catch (error) {
      console.error('Error in createSubscription:', error)
      return null
    }
  }

  /**
   * Update subscription status
   */
  static async updateSubscriptionStatus(
    subscriptionId: string,
    status: 'active' | 'canceled' | 'expired' | 'past_due'
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ status })
        .eq('id', subscriptionId)

      if (error) {
        console.error('Error updating subscription status:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in updateSubscriptionStatus:', error)
      return false
    }
  }

  /**
   * Cancel subscription at period end
   */
  static async cancelSubscription(subscriptionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({ cancel_at_period_end: true })
        .eq('id', subscriptionId)

      if (error) {
        console.error('Error canceling subscription:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in cancelSubscription:', error)
      return false
    }
  }

  /**
   * Get plan details by ID
   */
  static getPlanById(planId: 'free' | 'pro' | 'premium'): SubscriptionPlan | null {
    return SUBSCRIPTION_PLANS.find(plan => plan.id === planId) || null
  }

  /**
   * Check if user has access to feature based on their plan
   */
  static async hasFeatureAccess(userId: string, feature: string): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(userId)
      const planId = subscription?.plan_id || 'free'
      const plan = this.getPlanById(planId)
      
      return plan?.features.includes(feature) || false
    } catch (error) {
      console.error('Error checking feature access:', error)
      return false
    }
  }

  /**
   * Get user's current plan
   */
  static async getUserPlan(userId: string): Promise<'free' | 'pro' | 'premium'> {
    try {
      const subscription = await this.getUserSubscription(userId)
      return subscription?.plan_id || 'free'
    } catch (error) {
      console.error('Error getting user plan:', error)
      return 'free'
    }
  }
}
