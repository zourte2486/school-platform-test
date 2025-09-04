# Supabase Setup Guide (FREE)

## Step 1: Create Supabase Account

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create new organization
5. Create new project

## Step 2: Get Connection Details

1. Go to Settings → Database
2. Copy the connection details:
   - Host
   - Database name
   - Username
   - Password
   - Port (usually 5432)

## Step 3: Create Table

1. Go to Table Editor
2. Create new table called "schools"
3. Add these columns:
   - id (int8, primary key, auto-increment)
   - name (text)
   - address (text)
   - city (text)
   - state (text)
   - contact (int8)
   - image (text)
   - email_id (text)
   - created_at (timestamptz, default: now())

## Step 4: Update Your Project

Update your .env.local:

```
DB_HOST=your-supabase-host
DB_USER=postgres
DB_PASSWORD=your-supabase-password
DB_NAME=postgres
DB_PORT=5432
```

## Step 5: Update Database Code

Change mysql2 to pg (PostgreSQL) in your project.

## Benefits of Supabase:

- ✅ FREE tier (500MB database)
- ✅ Web interface to edit tables
- ✅ Real-time features
- ✅ Easy to use
- ✅ Better than Railway for development
