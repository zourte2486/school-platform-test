# Deployment Guide

## GitHub Repository Setup

1. **Create a new repository on GitHub:**

   - Go to https://github.com/new
   - Repository name: `school-platform`
   - Make it public
   - Don't initialize with README (we already have one)

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/school-platform.git
   git branch -M main
   git push -u origin main
   ```

## Vercel Deployment

1. **Go to Vercel:**

   - Visit https://vercel.com
   - Sign up/Login with GitHub

2. **Import Project:**

   - Click "New Project"
   - Import your `school-platform` repository
   - Framework Preset: Next.js
   - Root Directory: `./`

3. **Environment Variables:**
   Add these in Vercel dashboard:

   ```
   DB_HOST=your_mysql_host
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=school_platform
   ```

4. **Database Setup:**

   - Use a cloud MySQL service (PlanetScale, AWS RDS, etc.)
   - Run the SQL commands from `database.sql`
   - Update environment variables with production credentials

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be available at: `https://your-project.vercel.app`

## Alternative Hosting Options

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### Railway

1. Connect GitHub repository
2. Add MySQL service
3. Set environment variables
4. Deploy automatically

## Testing Checklist

- [ ] Home page loads correctly
- [ ] Navigation works between pages
- [ ] Add School form validation works
- [ ] Image upload functionality works
- [ ] Show Schools page displays data
- [ ] Responsive design on mobile/desktop
- [ ] Database connection works
- [ ] All form fields validate properly

## Production Database Recommendations

1. **PlanetScale** (Recommended)

   - Free tier available
   - Easy setup
   - Good for Next.js

2. **AWS RDS**

   - More control
   - Pay-as-you-go

3. **Railway MySQL**
   - Simple setup
   - Integrated with Railway hosting

## Final Submission Checklist

- [ ] GitHub repository is public
- [ ] All code is committed and pushed
- [ ] Application is deployed and accessible
- [ ] Database is set up and working
- [ ] All features are tested
- [ ] README is complete
- [ ] Environment variables are configured
