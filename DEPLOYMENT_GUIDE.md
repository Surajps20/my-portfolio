# Portfolio Deployment Guide

## Problem
After deployment, the contact form shows: "Could not connect to server. Please check if the backend is running."

## Solution
The backend URL was hardcoded to `localhost`. It now dynamically detects the backend location.

## Deployment Setup

### 1. Frontend Deployment (Vercel, Netlify, etc.)

**For Vercel:**
```bash
vercel deploy
```

**Environment Variables in Vercel:**
```
REACT_APP_BACKEND_URL=https://your-backend-url.com:5001
```

**For Netlify:**
```bash
npm run build
netlify deploy --prod --dir=build
```

**Environment Variables in Netlify:**
- Go to Site settings → Build & deploy → Environment
- Add: `REACT_APP_BACKEND_URL=https://your-backend-url.com:5001`

### 2. Backend Deployment (Heroku, Railway, AWS, etc.)

**For Heroku:**
```bash
heroku create your-portfolio-backend
git push heroku main
```

**Set environment variables on Heroku:**
```bash
heroku config:set EMAIL_USER=your-email@gmail.com
heroku config:set EMAIL_PASS=your-app-password
heroku config:set RECIPIENT_EMAIL=your-email@gmail.com
heroku config:set FRONTEND_URL=https://your-portfolio-domain.com
```

**For Railway:**
1. Connect GitHub repo
2. Select `server.js` as the start command
3. Add environment variables in Railway dashboard
4. Deploy and copy the backend URL

### 3. Configure Environment Variables

**Create `.env.production` with:**
```
FRONTEND_URL=https://your-portfolio-domain.com
REACT_APP_BACKEND_URL=https://your-backend-api.com:5001
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=your-email@gmail.com
PORT=5001
```

### 4. Update Frontend

**In `Contact.js` (already done):**
- Backend URL is now dynamic
- Uses `REACT_APP_BACKEND_URL` environment variable if available
- Falls back to auto-detection based on current domain

### 5. Test After Deployment

1. Deploy frontend first
2. Deploy backend second
3. On the contact form, test with a submission
4. Check browser console (F12) for any errors
5. Verify email arrives in your inbox

## How the New URL Detection Works

**Local Development:**
- Detects `localhost` → uses `http://localhost:5001`

**Production (with env var):**
- Uses `REACT_APP_BACKEND_URL` environment variable if set

**Production (auto-detect):**
- If frontend is at `https://myportfolio.com`
- Backend is automatically assumed to be at `https://myportfolio.com:5001`
- This works if backend and frontend are on the same domain

## If Contact Form Still Doesn't Work

1. **Check browser console (F12)**
   - Look for CORS errors or network errors
   - Copy the backend URL being used

2. **Verify backend is running**
   - Visit `https://your-backend-url:5001/api/health`
   - Should return `{"status":"Server is running"}`

3. **Check CORS headers**
   - Backend now allows requests from `FRONTEND_URL`
   - Make sure `FRONTEND_URL` is set in backend environment

4. **Verify email credentials**
   - Gmail App Password must be correct
   - 2-Step Verification must be enabled

## Troubleshooting Commands

```bash
# Check if backend is running
curl https://your-backend-url:5001/api/health

# Test email sending locally
npm run server

# Build frontend for production
npm run build

# Test backend CORS
curl -H "Origin: https://your-portfolio-domain.com" \
     -H "Access-Control-Request-Method: POST" \
     https://your-backend-url:5001/api/send-email
```

## Environment Variable Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `REACT_APP_BACKEND_URL` | Frontend talks to backend | `https://api.example.com:5001` |
| `FRONTEND_URL` | Backend allows requests from | `https://example.com` |
| `EMAIL_USER` | Gmail account | `yourmail@gmail.com` |
| `EMAIL_PASS` | Gmail App Password (16 chars) | `abcd efgh ijkl mnop` |
| `PORT` | Backend server port | `5001` |
