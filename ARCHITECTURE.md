# Your Portfolio Architecture

## Current Setup

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTERNET USERS                           │
│                    (visiting your portfolio)                      │
└──────────────────┬──────────────────────────────────┬────────────┘
                   │                                  │
                   ▼                                  ▼
        ┌──────────────────────┐          ┌──────────────────────┐
        │                      │          │                      │
        │    VERCEL FRONTEND   │          │   AWS BACKEND        │
        │    (React App)       │◄────────►│  (Node.js Server)    │
        │                      │  HTTP    │                      │
        │ my-portfolio-4a3q... │  Request │ elasticbeanstalk     │
        │                      │  Response│ port 5001            │
        └──────────┬───────────┘          └──────────┬───────────┘
                   │                                 │
                   │ Displays HTML                   │ Sends Emails
                   │ CSS & JavaScript                │ via Gmail SMTP
                   │                                 │
                   ├─ Home Section                   ├─ Contact Form API
                   ├─ About Section                  ├─ Email Validation
                   ├─ Projects Section               ├─ CORS Check
                   ├─ Resume Section                 ├─ Gmail Auth
                   │                                 │
                   │                           ┌─────▼────────┐
                   │                           │ Gmail SMTP   │
                   │                           │ (Email)      │
                   │                           └──────────────┘
                   │
            ┌──────▼───────────────────────────────────┐
            │    User's Browser                        │
            │  - Renders webpage                       │
            │  - Shows portfolio projects              │
            │  - Handles contact form                  │
            │  - Shows form status/errors              │
            └──────────────────────────────────────────┘
```

## How Contact Form Works

```
1. USER TYPES MESSAGE IN BROWSER
   │
   ├─ Name: "Suraj"
   ├─ Email: "visitor@email.com"
   ├─ Subject: "Job Opportunity"
   └─ Message: "Your portfolio is great..."
   │
   ▼
2. FORM SUBMISSION (React → Vercel)
   │
   ├─ Validates: All fields filled ✓
   ├─ Shows: "Sending..." button
   └─ Makes HTTP POST request
   │
   ▼
3. REQUEST SENT TO AWS BACKEND
   │
   ├─ URL: http://eba-xxxxx.elasticbeanstalk.com
   ├─ Port: Default (80/443, not 5001)
   ├─ Headers: Content-Type: application/json
   └─ Body: {name, email, subject, message}
   │
   ▼
4. BACKEND PROCESSES (Node.js on AWS)
   │
   ├─ Checks CORS: Frontend URL allowed? ✓
   ├─ Validates: All fields present? ✓
   ├─ Creates 2 emails:
   │  ├─ Email to you: {name} submitted form
   │  └─ Email to visitor: Thank you message
   │
   ▼
5. SEND EMAILS VIA GMAIL
   │
   ├─ Gmail Auth: EMAIL_USER & EMAIL_PASS
   ├─ Email 1 to: ssuraj6255@gmail.com (your inbox)
   └─ Email 2 to: visitor@email.com (their inbox)
   │
   ▼
6. RESPONSE BACK TO FRONTEND
   │
   ├─ Status: 200 OK
   └─ Message: "Email sent successfully!"
   │
   ▼
7. USER SEES SUCCESS
   │
   ├─ Green message: "✓ Thank you! Your message has been sent..."
   ├─ Form clears
   └─ Message auto-hides after 5 seconds
```

## Data Flow Diagram

```
            ┌─────────────────────────────────────────┐
            │   Your Portfolio User                   │
            │   (Browser at my-portfolio-xxx.vercel) │
            └────────────────┬────────────────────────┘
                             │
                   HTTP POST /api/send-email
                   with {name, email, subject, message}
                             │
                    ┌────────▼──────────┐
                    │  CORS Check       │
                    │  ✓ Origin allowed │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────────────┐
                    │  Validate Input           │
                    │  ✓ All fields required    │
                    └────────┬──────────────────┘
                             │
                    ┌────────▼──────────────────┐
                    │  Create Email Objects     │
                    │  - To: your inbox         │
                    │  - To: user's inbox       │
                    └────────┬──────────────────┘
                             │
                    ┌────────▼──────────────────┐
                    │  Send via Gmail SMTP      │
                    │  Using Nodemailer         │
                    └────────┬──────────────────┘
                             │
            ┌────────────────┼────────────────────┐
            │                │                    │
            ▼                ▼                    ▼
    ┌──────────────┐ ┌──────────────┐  ┌──────────────────┐
    │ Your Inbox   │ │ User's Inbox │  │ Response to      │
    │ (receives    │ │ (confirmation│  │ Frontend         │
    │  inquiry)    │ │  email sent) │  │ (status: 200)    │
    └──────────────┘ └──────────────┘  └────────┬─────────┘
                                                 │
                            ┌────────────────────▼─────┐
                            │   User Sees Success      │
                            │   ✓ Green message       │
                            │   Form clears            │
                            └──────────────────────────┘
```

## Technology Stack

```
┌────────────────────────────────────────────────────────┐
│                   YOUR PORTFOLIO                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│  FRONTEND (Deployed on Vercel)                        │
│  ├─ React 17.0.2                                     │
│  ├─ React Bootstrap (UI Components)                   │
│  ├─ React Router (Navigation)                         │
│  ├─ React Icons (Icon Library)                        │
│  └─ Deployed on: vercel.com                           │
│                                                        │
│  BACKEND (Deployed on AWS Elastic Beanstalk)         │
│  ├─ Node.js 18                                        │
│  ├─ Express (Web Framework)                           │
│  ├─ Nodemailer (Email Sending)                        │
│  ├─ CORS (Cross-Origin Requests)                      │
│  ├─ Dotenv (Environment Variables)                    │
│  └─ Deployed on: aws.amazon.com (Elastic Beanstalk)  │
│                                                        │
│  EMAIL SERVICE (Gmail SMTP)                           │
│  ├─ Gmail Account                                     │
│  ├─ App Password Authentication                       │
│  └─ Two emails sent per submission                    │
│                                                        │
│  VERSION CONTROL                                      │
│  ├─ GitHub (my-portfolio)                             │
│  └─ 11 commits                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

## Deployment Summary

```
┌─────────────────────────────────────────────────────────┐
│              YOUR PORTFOLIO DEPLOYMENT                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ✅ Frontend: DEPLOYED on Vercel                       │
│     https://my-portfolio-4a3qmib30-...vercel.app       │
│     Status: Live & Serving                             │
│                                                         │
│  ⏳ Backend: READY TO DEPLOY on AWS                    │
│     Will be: elasticbeanstalk.amazonaws.com           │
│     Status: Instructions provided                      │
│                                                         │
│  📧 Email: Configured (Gmail SMTP)                     │
│     Service: Nodemailer                                │
│     Status: Ready to use                               │
│                                                         │
│  🔐 Security:                                          │
│     ✓ Environment variables secured                    │
│     ✓ CORS configured                                  │
│     ✓ Input validation enabled                         │
│     ✓ No credentials in code                           │
│                                                         │
│  💰 Cost: FREE (within AWS free tier)                 │
│     Duration: 12 months                                │
│     After: ~$10-15/month if kept running              │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Files Created

```
Portfolio Project Structure:
│
├── Frontend (React - on Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Contact/
│   │   │   │   └── Contact.js ✅ (Updated with dynamic backend URL)
│   │   │   ├── About/
│   │   │   │   └── AboutCard.js ✅ (Enhanced)
│   │   │   └── Projects/
│   │   │       └── Projects.js ✅ (Updated description)
│   │   └── App.js
│   └── package.json ✅ (Updated dependencies)
│
├── Backend (Node.js - on AWS)
│   ├── server.js ✅ (Updated for AWS)
│   ├── Procfile ✅ (NEW - tells EB how to start)
│   ├── .ebextensions/
│   │   └── nodecommand.config ✅ (NEW - EB configuration)
│   └── package.json (includes Express, Nodemailer, CORS)
│
├── Configuration
│   ├── .env ✅ (Email credentials - NOT committed to git)
│   ├── .env.example ✅ (Template for env vars)
│   ├── .env.production ✅ (Production settings)
│   ├── .gitignore ✅ (Updated for AWS files)
│   └── package.json ✅ (Updated with deployment scripts)
│
└── Documentation
    ├── AWS_DEPLOYMENT_GUIDE.md ✅ (Detailed guide)
    ├── AWS_QUICK_START.md ✅ (Quick reference)
    ├── AWS_CHECKLIST.md ✅ (Step-by-step checklist)
    ├── DEPLOYMENT_GUIDE.md (Frontend deployment)
    ├── EMAIL_SETUP_GUIDE.md (Email configuration)
    └── aws-deploy.bat ✅ (Automated deployment script)
```

---

## Next: Your AWS Deployment

Ready? Follow these steps:

1. **Install Tools** (5 min)
   ```powershell
   msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
   pip install awsebcli
   ```

2. **Configure Credentials** (2 min)
   ```powershell
   aws configure
   ```

3. **Run Deployment** (15 min)
   ```powershell
   cd c:\Users\suraj\Desktop\Portfolio\Portfolio
   .\aws-deploy.bat
   ```

4. **Update Frontend** (2 min)
   - Add backend URL to Vercel environment variables

5. **Test** (1 min)
   - Submit contact form
   - Check email

**Total time: ~25 minutes** ⏱️

Let's go! 🚀
