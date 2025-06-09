# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Git installed
- GitHub account
- Vercel account

## Step 1: Prepare for GitHub

1. **Initialize Git repository (if not already done)**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HVAC Calculator"
   ```

2. **Create GitHub repository**
   - Go to GitHub.com
   - Click "New repository"
   - Name it (e.g., "hvac-calculator")
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hvac-calculator.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with your GitHub account

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Build Settings**
   - Build Command: `vite build` (auto-detected)
   - Output Directory: `dist/public` (auto-configured)
   - Install Command: `npm install` (auto-detected)

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your app will be live at `https://your-project-name.vercel.app`

### Option B: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy**
   ```bash
   vercel login
   vercel --prod
   ```

## Step 3: Verify Deployment

1. **Check the live site**
   - Open your Vercel URL
   - Test the calculator functionality
   - Verify PDF export works
   - Test responsive design on mobile

2. **Common Issues & Solutions**

   **Build fails:**
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check for TypeScript errors

   **App loads but calculator doesn't work:**
   - Check browser console for JavaScript errors
   - Verify all imports are correct
   - Test locally first with `npm run build && npm run start`

   **PDF export fails:**
   - This should work as it's client-side only
   - Check browser compatibility

## Step 4: Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to your project
   - Click "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

## Environment Variables

This project doesn't require any environment variables as it's a client-side calculator. All calculations happen in the browser.

## Automatic Deployments

Once connected to GitHub, Vercel will automatically deploy:
- Every push to main branch → Production deployment
- Every pull request → Preview deployment

## Performance Optimization

The app is already optimized with:
- ✅ Vite for fast builds
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Responsive design
- ✅ Client-side calculations (no server dependency)

## Monitoring

In Vercel dashboard you can monitor:
- Deployment status
- Performance metrics
- Error logs
- Usage analytics