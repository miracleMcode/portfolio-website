# Deploy to Vercel - Step by Step Guide

## Prerequisites
- GitHub account (free at github.com)
- Vercel account (free at vercel.com)

---

## Step 1: Initialize Git Repository

Open PowerShell in your portfolio project folder:

```powershell
cd "g:\MIRACLE TECH\media_converter_full_project\portfolio_website"
git init
git add .
git commit -m "Initial portfolio commit"
```

---

## Step 2: Create GitHub Repository

1. Go to **https://github.com/new**
2. Create a new repository:
   - **Repository name**: `portfolio-website` (or any name you like)
   - **Description**: My Professional Portfolio
   - **Public** (so it's visible and shows on your GitHub profile)
   - Click **Create repository**

3. Copy the commands shown after creation, then run in PowerShell:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 3: Deploy on Vercel

### Option A: Easy (Recommended)

1. Go to **https://vercel.com/import** (sign up with GitHub)
2. Click **Import Project**
3. **Import Git Repository**
4. Paste: `https://github.com/YOUR_USERNAME/portfolio-website.git`
5. Click **Continue**
6. Leave settings as default
7. Click **Deploy**
8. ✅ Your site is live!

### Option B: Using Vercel CLI

```powershell
npm install -g vercel
cd "g:\MIRACLE TECH\media_converter_full_project\portfolio_website"
vercel
```

Follow the prompts to connect your GitHub and deploy.

---

## Step 4: Verify Deployment

After deployment:
- Your site will be at: `https://your-project-name.vercel.app`
- Go to Vercel dashboard → Settings → Domains to add a custom domain (optional)

---

## Step 5: Auto-Deploy Updates

Every time you push code to GitHub:

```powershell
git add .
git commit -m "Update portfolio"
git push
```

Vercel **automatically redeploys** your changes! 🚀

---

## Troubleshooting

### Port Issues
The app uses port 8080 locally but Vercel handles it automatically.

### Image Uploads
Images are stored in `/tmp/uploads` which is temporary on Vercel. For permanent storage, consider:
- AWS S3
- Cloudinary
- Firebase Storage

### Database Persistence
Current setup stores data in memory (resets on redeployment). For production, add:
- PostgreSQL (Neon.tech - free tier)
- MongoDB Atlas (free tier)

---

## Custom Domain (Optional)

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain (e.g., yourname.com)
3. Follow DNS instructions

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Flask on Vercel: https://vercel.com/docs/frameworks/flask
- GitHub Help: https://docs.github.com

Your portfolio is now professional and ready to impress! 🎉
