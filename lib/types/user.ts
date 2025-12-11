export interface User {
  id: string
  email: string
  full_name?: string
  credits: number
  total_credits_purchased: number
  created_at: string
  updated_at: string
}

export interface CreateUserData {
  id: string
  email: string
  full_name?: string
}

export interface CreditTransaction {
  user_id: string
  amount: number
  type: 'deduct' | 'purchase'
  description?: string
}

export interface CreditPurchaseOption {
  id: string
  name: string
  credits: number
  price: number
  popular?: boolean
}
