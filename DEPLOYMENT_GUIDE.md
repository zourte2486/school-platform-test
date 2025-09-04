# 🚀 Deployment Guide

## GitHub Repository Setup

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `school-platform`
3. Make it **public**
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2. Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: School Platform with full-stack features"

# Add remote origin (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/school-platform.git

# Push to GitHub
git push -u origin main
```

## Vercel Deployment (Recommended)

### 1. Deploy to Vercel

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your `school-platform` repository
5. Framework Preset: **Next.js**
6. Root Directory: `./`
7. Click "Deploy"

### 2. Set Environment Variables in Vercel

In Vercel dashboard, go to your project → Settings → Environment Variables:

```
DB_HOST=your-railway-host.railway.app
DB_USER=root
DB_PASSWORD=your-railway-password
DB_NAME=railway
DB_PORT=39062
```

### 3. Redeploy

After setting environment variables, redeploy your project.

## Alternative Hosting Options

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables in Site settings

### Railway (Full Stack)

1. Connect GitHub repository
2. Add MySQL service
3. Set environment variables
4. Deploy automatically

## Database Setup for Production

### Railway Database (Current)

Your database is already set up on Railway. Just update environment variables.

### Alternative: Supabase (Free)

1. Go to https://supabase.com
2. Create new project
3. Get connection details
4. Update environment variables

## Testing Your Deployment

1. **Check if app loads:** Visit your deployed URL
2. **Test Add School:** Try adding a new school
3. **Test View Schools:** Check if schools display correctly
4. **Test responsive design:** Check on mobile and desktop

## Troubleshooting

### Common Issues:

- **Database connection errors:** Check environment variables
- **Build failures:** Check for TypeScript errors
- **Image upload issues:** Verify file permissions

### Support:

- Check Vercel logs for deployment issues
- Check Railway logs for database issues
- Review GitHub repository for code issues

## Final Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables set in hosting platform
- [ ] Database connected and working
- [ ] App deployed and accessible
- [ ] All features tested
- [ ] Responsive design working
- [ ] Image uploads working

## URLs to Submit

- **GitHub Repository:** `https://github.com/YOUR_USERNAME/school-platform`
- **Deployed Application:** `https://your-project.vercel.app`

🎉 **Your School Platform is now live and ready for submission!**
