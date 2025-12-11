# Supabase Setup Guide for ResumeIQ

## 🚀 Quick Setup Steps

### 1. Get Your Supabase Keys
1. Go to [Supabase Dashboard](https://app.supabase.com/project/pkjvnawqtcbfcxsnsbba)
2. Navigate to **Settings** → **API**
3. Copy your **anon/public** key
4. Update `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pkjvnawqtcbfcxsnsbba.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
```

### 2. Create Database Table
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `supabase-schema.sql`
3. Click **Run** to create the table

### 3. Test the Integration
1. Start your development server: `npm run dev`
2. Complete the onboarding flow
3. Check the browser console for success/error messages
4. Verify data in Supabase **Table Editor** → `onboarding_responses`

## 📊 Database Schema

### Table: `onboarding_responses`
| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `session_id` | TEXT | Unique session identifier |
| `user_type` | TEXT | User's selected type (Student, Professional, etc.) |
| `purpose` | TEXT | User's purpose (Create Resume, Tailor, etc.) |
| `source` | TEXT | How user heard about ResumeIQ |
| `account_method` | TEXT | Account creation method (google, email, microsoft, skip) |
| `created_at` | TIMESTAMP | When the record was created |
| `updated_at` | TIMESTAMP | When the record was last updated |

## 🔧 How It Works

1. **Session Generation**: Each user gets a unique session ID when they start onboarding
2. **Data Collection**: User choices are stored in React state as they progress
3. **Data Saving**: When user reaches the final screen, all data is saved to Supabase
4. **Error Handling**: If saving fails, the process continues (graceful degradation)

## 📝 Example Data Stored

```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "session_id": "session_1702234567890_abc123def",
  "user_type": "Mid-Level Professional",
  "purpose": "Create a New Resume",
  "source": "Google Search",
  "account_method": "google",
  "created_at": "2024-12-10T20:30:00.000Z",
  "updated_at": "2024-12-10T20:30:00.000Z"
}
```

## 🔍 Monitoring & Analytics

### View All Responses
```sql
SELECT * FROM onboarding_responses 
ORDER BY created_at DESC 
LIMIT 100;
```

### User Type Distribution
```sql
SELECT user_type, COUNT(*) as count 
FROM onboarding_responses 
GROUP BY user_type 
ORDER BY count DESC;
```

### Source Analysis
```sql
SELECT source, COUNT(*) as count 
FROM onboarding_responses 
GROUP BY source 
ORDER BY count DESC;
```

### Daily Signups
```sql
SELECT DATE(created_at) as date, COUNT(*) as signups 
FROM onboarding_responses 
GROUP BY DATE(created_at) 
ORDER BY date DESC;
```

## 🛡️ Security Features

- **Row Level Security (RLS)** enabled
- **Anonymous inserts** allowed for onboarding
- **Data encryption** at rest and in transit
- **No sensitive data** stored (just preferences)

## 🚨 Troubleshooting

### Common Issues:

1. **"Cannot find module" errors**: 
   - Restart your development server after adding new files

2. **Supabase connection fails**:
   - Check your `.env.local` file has the correct keys
   - Ensure the anon key is valid and not expired

3. **Table doesn't exist**:
   - Run the SQL schema in Supabase SQL Editor
   - Check table name matches exactly: `onboarding_responses`

4. **Data not saving**:
   - Check browser console for error messages
   - Verify RLS policies are set correctly
   - Test with a simple insert in SQL Editor

## 📈 Next Steps

After setup, you can:
- Add user authentication
- Create analytics dashboards
- Export data for analysis
- Set up automated reports
- Add data validation rules

## 🎯 Testing Checklist

- [ ] Environment variables set correctly
- [ ] Database table created successfully  
- [ ] Can complete onboarding flow without errors
- [ ] Data appears in Supabase table editor
- [ ] Console shows success messages
- [ ] Different user types/sources save correctly
- [ ] Error handling works (try with invalid keys)
