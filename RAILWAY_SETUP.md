# Railway Database Setup (FREE)

## Step 1: Create Railway Account

1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

## Step 2: Create MySQL Database

1. Click "New Project"
2. Choose "Database" → "MySQL"
3. Railway will create a free MySQL database
4. Wait for deployment (takes 1-2 minutes)

## Step 3: Get Connection Details

1. Click on your MySQL service
2. Go to "Variables" tab
3. You'll see these variables:
   - `MYSQL_HOST`
   - `MYSQL_USER`
   - `MYSQL_PASSWORD`
   - `MYSQL_DATABASE`

## Step 4: Create Database Table

1. Go to "Data" tab in Railway
2. Click "Query"
3. Run this SQL:

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT NOT NULL,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add sample data
INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES
('St. Mary School', '123 Main Street', 'New York', 'NY', 1234567890, 'school1.jpg', 'stmary@school.com'),
('Lincoln High School', '456 Oak Avenue', 'Los Angeles', 'CA', 9876543210, 'school2.jpg', 'lincoln@school.com');
```

## Step 5: Update Environment Variables

Create `.env.local` in your project:

```env
DB_HOST=your-railway-host.railway.app
DB_USER=root
DB_PASSWORD=your-railway-password
DB_NAME=railway
```

## Step 6: Test Connection

1. Run: `npm run dev`
2. Go to: http://localhost:3000/showSchools
3. You should see the sample schools!

## Railway Free Tier Limits

- ✅ 500 hours/month (enough for development)
- ✅ 1GB storage
- ✅ Perfect for your school platform
- ✅ No credit card required
