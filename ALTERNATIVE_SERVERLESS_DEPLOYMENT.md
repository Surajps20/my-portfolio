# 🚀 Alternative: Deploy Backend Using Serverless Framework (Easier!)

If you're having trouble with AWS CLI and EB CLI installation, use this simpler method instead.

## Why This is Easier

✅ No AWS CLI needed  
✅ No EB CLI needed  
✅ Works with npm (which you already have)  
✅ Same result on AWS  
✅ Easier deployment  

---

## Step 1: Install Serverless Framework

```powershell
npm install -g serverless
```

Verify:
```powershell
serverless --version
```

---

## Step 2: Get AWS Credentials

1. Go to: https://console.aws.amazon.com
2. Click your name → My Security Credentials
3. Access Keys → Create New Access Key
4. Save both keys

---

## Step 3: Configure AWS Credentials

```powershell
serverless config credentials --provider aws --key YOUR_ACCESS_KEY --secret YOUR_SECRET_KEY --region us-east-1
```

Replace:
- `YOUR_ACCESS_KEY` with your Access Key ID
- `YOUR_SECRET_KEY` with your Secret Access Key

---

## Step 4: Create serverless.yml

In your project root, create `serverless.yml`:

```yaml
service: portfolio-backend

provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1
  environment:
    EMAIL_USER: ${env:EMAIL_USER}
    EMAIL_PASS: ${env:EMAIL_PASS}
    RECIPIENT_EMAIL: ${env:RECIPIENT_EMAIL}
    FRONTEND_URL: ${env:FRONTEND_URL}

functions:
  api:
    handler: server.handler
    events:
      - http:
          path: /api/send-email
          method: post
          cors: true

plugins:
  - serverless-offline
  - serverless-dynamodb-local
```

---

## Step 5: Update server.js for Serverless

Replace your `server.js` with:

```javascript
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
  'http://127.0.0.1:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Email route
app.post("/api/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const mailToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "saravanansuraj95@gmail.com",
      subject: `New Contact Form: ${subject}`,
      html: `<h2>New Submission</h2><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Message:</b></p><p>${message.replace(/\n/g, "<br>")}</p>`
    };

    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `<h2>Thank you!</h2><p>Hi ${name},</p><p>I received your message and will get back to you soon.</p>`
    };

    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

// For local testing
const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for serverless
module.exports.handler = serverless(app);
```

---

## Step 6: Update package.json

Add these dependencies:

```bash
npm install serverless-http serverless-offline serverless-dynamodb-local
npm install --save-dev serverless
```

---

## Step 7: Deploy

```powershell
# Set environment variables (or create .env file)
$env:EMAIL_USER="ssuraj6255@gmail.com"
$env:EMAIL_PASS="your-app-password"
$env:RECIPIENT_EMAIL="ssuraj6255@gmail.com"
$env:FRONTEND_URL="https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app"

# Deploy to AWS Lambda
serverless deploy
```

Serverless will output your API URL. Copy it.

---

## Step 8: Update Vercel

1. Go to Vercel Dashboard
2. Select project
3. Settings → Environment Variables
4. Add: `REACT_APP_BACKEND_URL=YOUR_LAMBDA_URL`
5. Save

---

## Step 9: Test

Visit your portfolio and submit the contact form!

---

## Advantages of This Method

✅ Simpler setup  
✅ No CLI tool installations  
✅ Works with npm  
✅ Scales automatically  
✅ Pay per use (even cheaper!)  
✅ Less configuration  

---

## If You Want to Go Back to Elastic Beanstalk

1. **Restart your computer** (to ensure AWS CLI installation completes)
2. Open new PowerShell and try: `aws --version`
3. If it works, follow `START_HERE.md`

---

## Questions?

- Serverless Docs: https://www.serverless.com/framework/docs
- AWS Lambda Docs: https://docs.aws.amazon.com/lambda/
- Nodemailer: https://nodemailer.com/

**This method is actually easier and cheaper!** 🎉
