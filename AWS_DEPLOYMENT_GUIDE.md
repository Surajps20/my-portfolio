# AWS Backend Deployment Guide

Your Node.js backend will run on AWS. Choose one of these options:

## Option 1: Elastic Beanstalk (RECOMMENDED - Easiest)
**Best for beginners - handles deployment automatically**

### Prerequisites
- AWS Account (free tier eligible)
- AWS CLI installed
- EB CLI installed

### Step 1: Install AWS CLI and EB CLI

**On Windows (PowerShell):**
```powershell
# Install AWS CLI
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Install EB CLI using pip
pip install awsebcli

# Verify installations
aws --version
eb --version
```

### Step 2: Configure AWS Credentials

```powershell
aws configure
```

You'll be prompted for:
- **AWS Access Key ID**: Get from AWS Console → IAM → Users → Security credentials
- **AWS Secret Access Key**: Same place as above
- **Default region**: Use `us-east-1` or your preferred region
- **Default output format**: Press Enter (leave blank)

**How to get AWS credentials:**
1. Go to https://console.aws.amazon.com
2. Click your username → My Security Credentials
3. Create Access Key (if you don't have one)
4. Copy Access Key ID and Secret Access Key
5. Keep them safe!

### Step 3: Initialize Elastic Beanstalk

```powershell
cd c:\Users\suraj\Desktop\Portfolio\Portfolio
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1
```

Follow prompts:
- **Create new application**: Yes
- **Application name**: `my-portfolio-backend`
- **Create instance profile**: Yes (auto-creates role)

### Step 4: Create Environment

```powershell
eb create portfolio-backend-env
```

This creates:
- EC2 instance
- Load balancer
- Security groups
- Auto-scaling configuration

Wait 5-10 minutes for it to deploy.

### Step 5: Set Environment Variables

```powershell
eb setenv EMAIL_USER=ssuraj6255@gmail.com EMAIL_PASS=pojtjwvihussqvea RECIPIENT_EMAIL=ssuraj6255@gmail.com FRONTEND_URL=https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app
```

### Step 6: Deploy Your Code

```powershell
eb deploy
```

### Step 7: Get Your Backend URL

```powershell
eb open
```

This opens your deployed backend in browser. The URL will look like:
`http://portfolio-backend-env.eba-xxxxxx.us-east-1.elasticbeanstalk.com`

### Step 8: Update Frontend with Backend URL

1. Go to Vercel Dashboard
2. Your Project → Settings → Environment Variables
3. Add: `REACT_APP_BACKEND_URL=http://your-elasticbeanstalk-url:5001`
4. Redeploy frontend

### Step 9: Test Contact Form

Visit your Vercel portfolio and test the contact form!

---

## Option 2: EC2 (More Control - Manual Setup)
**Best if you want full control over server**

### Step 1: Launch EC2 Instance

1. Go to AWS Console → EC2 → Instances → Launch Instance
2. Choose: **Amazon Linux 2** (free tier eligible)
3. Instance type: **t2.micro** (free tier)
4. Configure:
   - VPC: Default
   - Auto-assign public IP: Enable
5. Storage: 30GB (free tier)
6. Security Group:
   - SSH (22) from your IP
   - HTTP (80) from anywhere
   - HTTPS (443) from anywhere
   - Custom (5001) from anywhere

### Step 2: Connect to Instance

```powershell
# Get public IP from EC2 dashboard
# Download .pem file when creating instance
ssh -i "your-key.pem" ec2-user@your-public-ip
```

### Step 3: Install Node.js

```bash
sudo yum update -y
sudo yum install nodejs npm -y
node --version
npm --version
```

### Step 4: Upload Your Code

**Option A: Using Git**
```bash
git clone https://github.com/Surajps20/my-portfolio.git
cd my-portfolio
npm install
```

**Option B: Using SCP**
```powershell
scp -i "your-key.pem" -r "c:\Users\suraj\Desktop\Portfolio\Portfolio\server.js" ec2-user@your-ip:/home/ec2-user/
```

### Step 5: Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
pm2 start server.js --name "portfolio-backend"
pm2 startup
pm2 save
```

### Step 6: Get Public IP

Your backend will be at: `http://your-public-ip:5001`

### Step 7: Update Frontend

Same as Elastic Beanstalk - add `REACT_APP_BACKEND_URL` to Vercel

---

## Option 3: Lambda + API Gateway (Serverless)
**Best if you want pay-per-use (limited free tier)**

**Note:** Lambda requires code restructuring. Not recommended for beginners with existing code.

---

## RECOMMENDED: Use Elastic Beanstalk

I recommend **Elastic Beanstalk** because:
- ✅ Handles deployment automatically
- ✅ Auto-scaling built-in
- ✅ Free tier eligible (750 hours/month)
- ✅ Easy environment variables
- ✅ Built-in monitoring
- ✅ Simple to manage from CLI

---

## Quick Start (Elastic Beanstalk)

```powershell
# 1. Install CLI tools
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi
pip install awsebcli

# 2. Configure credentials
aws configure

# 3. Navigate to your project
cd c:\Users\suraj\Desktop\Portfolio\Portfolio

# 4. Initialize EB
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1

# 5. Create environment (wait 10 mins)
eb create portfolio-backend-env

# 6. Set environment variables
eb setenv EMAIL_USER=ssuraj6255@gmail.com EMAIL_PASS=pojtjwvihussqvea RECIPIENT_EMAIL=ssuraj6255@gmail.com FRONTEND_URL=https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app

# 7. Deploy
eb deploy

# 8. Open in browser
eb open

# 9. Copy URL and use it in frontend environment variables
```

---

## Troubleshooting

### "Error: No credentials found"
```powershell
aws configure
# Add your AWS credentials
```

### "eb command not found"
```powershell
pip install awsebcli
```

### Backend not responding after deployment
```powershell
# Check logs
eb logs

# SSH into instance
eb ssh

# Check if Node.js is running
pm2 list
```

### Email not sending
- Verify EMAIL_USER and EMAIL_PASS in `eb setenv`
- Check spam folder
- Verify Gmail App Password is correct

### Contact form still shows error
1. Check frontend environment variable: `REACT_APP_BACKEND_URL`
2. Ensure it doesn't have trailing slash
3. Wait 5 mins for Vercel to redeploy
4. Clear browser cache (Ctrl+Shift+Delete)

---

## Next: Add Custom Domain (Optional)

Once deployed, you can:
1. Buy domain on Route 53 or elsewhere
2. Point to Elastic Beanstalk URL
3. Update `FRONTEND_URL` in backend environment

---

## Useful EB Commands

```powershell
# View status
eb status

# View logs
eb logs

# SSH into instance
eb ssh

# Scale up/down
eb scale 2

# Redeploy
eb deploy

# Create a backup
eb create portfolio-backend-prod

# Terminate (DELETE - careful!)
eb terminate portfolio-backend-env
```

---

## Cost Estimate (Free Tier)

- **EC2 micro instance**: 750 hours/month free
- **Data transfer**: 1GB/month free outbound
- **Elastic Beanstalk**: Free (you pay for EC2)

**Estimated cost: $0 for first 12 months** (within free tier)

After free tier:
- ~$10-15/month for t2.micro running 24/7

---

## Security Best Practices

1. ✅ Never commit `.env` file (already in .gitignore)
2. ✅ Use AWS IAM roles (EB does this automatically)
3. ✅ Keep security groups restrictive
4. ✅ Rotate access keys regularly
5. ✅ Enable CloudWatch monitoring
6. ✅ Set up alerts for high usage

---

## Still Stuck?

- AWS Free Tier Help: https://aws.amazon.com/free
- Elastic Beanstalk Docs: https://docs.aws.amazon.com/elasticbeanstalk
- Email me or check console logs: `eb logs`
