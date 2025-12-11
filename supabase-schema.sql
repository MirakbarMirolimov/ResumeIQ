-- Create the onboarding_responses table
CREATE TABLE IF NOT EXISTS onboarding_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_type TEXT NOT NULL,
  purpose TEXT NOT NULL,
  source TEXT NOT NULL,
  account_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on session_id for faster queries
CREATE INDEX IF NOT EXISTS idx_onboarding_session_id ON onboarding_responses(session_id);

-- Create an index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_onboarding_created_at ON onboarding_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert (for anonymous onboarding)
CREATE POLICY "Allow anonymous inserts" ON onboarding_responses
  FOR INSERT 
  WITH CHECK (true);

-- Create a policy to allow reading your own data (based on session_id)
CREATE POLICY "Allow reading own data" ON onboarding_responses
  FOR SELECT
  USING (true); -- You can restrict this later if needed

-- Optional: Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_onboarding_responses_updated_at 
  BEFORE UPDATE ON onboarding_responses 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create the users table for tracking credits
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  credits INTEGER DEFAULT 3 NOT NULL CHECK (credits >= 0),
  total_credits_purchased INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for the users table
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_credits ON users(credits);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Enable Row Level Security (RLS) for users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data" ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Allow user registration" ON users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create trigger to automatically update updated_at for users table
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Create a function to deduct credits
CREATE OR REPLACE FUNCTION deduct_user_credits(user_id UUID, credit_amount INTEGER DEFAULT 1)
RETURNS BOOLEAN AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get current credits with row lock
  SELECT credits INTO current_credits 
  FROM users 
  WHERE id = user_id 
  FOR UPDATE;
  
  -- Check if user exists and has enough credits
  IF current_credits IS NULL THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  IF current_credits < credit_amount THEN
    RETURN FALSE; -- Not enough credits
  END IF;
  
  -- Deduct credits
  UPDATE users 
  SET credits = credits - credit_amount 
  WHERE id = user_id;
  
  RETURN TRUE; -- Success
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to add credits (for purchases)
CREATE OR REPLACE FUNCTION add_user_credits(user_id UUID, credit_amount INTEGER)
RETURNS BOOLEAN AS $$
BEGIN
  -- Add credits and track total purchased
  UPDATE users 
  SET 
    credits = credits + credit_amount,
    total_credits_purchased = total_credits_purchased + credit_amount
  WHERE id = user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found';
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id TEXT NOT NULL CHECK (plan_id IN ('free', 'pro', 'premium')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired', 'past_due')),
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for subscriptions table
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);

-- Enable RLS for subscriptions
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions
CREATE POLICY "Users can read own subscriptions" ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON subscriptions
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create trigger for subscriptions updated_at
CREATE TRIGGER update_subscriptions_updated_at 
  BEFORE UPDATE ON subscriptions 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Add subscription fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS current_plan TEXT DEFAULT 'free' CHECK (current_plan IN ('free', 'pro', 'premium'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS subscription_id UUID REFERENCES subscriptions(id);

-- Function to get user's active subscription
CREATE OR REPLACE FUNCTION get_user_subscription(user_id UUID)
RETURNS TABLE(
  plan_id TEXT,
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT s.plan_id, s.status, s.current_period_end
  FROM subscriptions s
  WHERE s.user_id = get_user_subscription.user_id
    AND s.status = 'active'
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
