# AWS Backend Deployment - Quick Start

Your frontend is deployed on Vercel ✅
Now let's deploy your backend on AWS ✅

## Files Created for AWS

1. **`Procfile`** - Tells EB how to start your app
2. **`.ebextensions/nodecommand.config`** - EB configuration
3. **`AWS_DEPLOYMENT_GUIDE.md`** - Detailed guide
4. **`aws-deploy.bat`** - Automated deployment script

## Quickest Path (5 minutes setup + 10 minutes deploy)

### 1️⃣ Install AWS Tools

```powershell
# Install AWS CLI (download MSI)
msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# Install EB CLI
pip install awsebcli

# Verify
aws --version
eb --version
```

### 2️⃣ Configure AWS Credentials

```powershell
aws configure
```

When prompted, enter:
- **Access Key ID**: From AWS IAM console
- **Secret Access Key**: From AWS IAM console  
- **Region**: `us-east-1`
- **Output**: Leave blank

**How to get credentials:**
1. Go to https://console.aws.amazon.com
2. Click your name → My Security Credentials
3. Access Keys → Create New Access Key
4. Copy the credentials

### 3️⃣ Use the Deployment Script

```powershell
cd c:\Users\suraj\Desktop\Portfolio\Portfolio
.\aws-deploy.bat
```

This script will:
- ✅ Check if tools are installed
- ✅ Initialize Elastic Beanstalk
- ✅ Create EC2 instance
- ✅ Set environment variables
- ✅ Deploy your backend
- ✅ Give you the URL

**Wait 10 minutes for deployment to complete**

### 4️⃣ Update Frontend

Once deployment is done:

1. Go to Vercel Dashboard
2. Select your project → Settings → Environment Variables
3. Add new variable:
   - Name: `REACT_APP_BACKEND_URL`
   - Value: Your EB URL (without :5001)
   - Example: `http://portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com`

4. Click "Save"
5. Vercel will auto-redeploy

### 5️⃣ Test

1. Visit your Vercel portfolio
2. Scroll to Contact section
3. Fill and submit the form
4. Check if you receive email!

---

## Manual Steps (If script doesn't work)

```powershell
# 1. Navigate to your project
cd c:\Users\suraj\Desktop\Portfolio\Portfolio

# 2. Initialize EB
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1

# 3. Create environment (WAIT 10 MINUTES!)
eb create portfolio-backend-env

# 4. Set environment variables
eb setenv ^
  EMAIL_USER=ssuraj6255@gmail.com ^
  EMAIL_PASS=pojtjwvihussqvea ^
  RECIPIENT_EMAIL=ssuraj6255@gmail.com ^
  FRONTEND_URL=https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app

# 5. Deploy
eb deploy

# 6. Get your URL
eb status
# Look for "CNAME: portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com"
```

---

## Backend URL Format

Your AWS backend will be at:
```
http://portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com
```

In Vercel environment variables, use:
```
http://portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com
```

(Without :5001 because EB handles routing)

---

## Useful Commands

```powershell
# Check status
eb status

# View logs
eb logs

# SSH into instance
eb ssh

# Redeploy
eb deploy

# Open in browser
eb open

# See all environments
eb list

# Terminate (DELETE!)
eb terminate portfolio-backend-env
```

---

## Troubleshooting

### "Access Denied" or "InvalidParameterValue"
- Check AWS credentials: `aws sts get-caller-identity`
- Verify region: `us-east-1` is recommended

### "eb: command not found"
```powershell
pip install awsebcli
# Add C:\Python\Scripts to PATH
```

### Backend deployed but contact form still fails
```powershell
# Check logs
eb logs

# Verify environment variables are set
eb printenv

# Redeploy
eb deploy
```

### Email not sending
- Verify Gmail credentials are correct
- Check Gmail allows "Less secure apps" or use App Password
- Check spam folder

### Want to cancel/delete everything?
```powershell
eb terminate portfolio-backend-env
# This deletes the EC2 instance and saves you money!
```

---

## Cost

### Free Tier (First 12 months)
- **EC2 t2.micro**: FREE (750 hours/month)
- **Data transfer**: FREE (1GB/month outbound)
- **Total**: $0

### After Free Tier
- **t2.micro 24/7**: ~$10-15/month
- **Data transfer**: ~$0.09 per GB (unless high traffic)

### To save money:
1. Stop instance when not needed: `eb scale 0`
2. Delete when done: `eb terminate`
3. Use AWS billing alerts

---

## What You Now Have

✅ **Frontend**: Vercel (https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app)
✅ **Backend**: AWS Elastic Beanstalk (http://portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com)
✅ **Email**: Gmail SMTP via Nodemailer
✅ **Database**: None (emails sent directly)

---

## Next: Custom Domain

Want `https://myname.com` instead of `my-portfolio-xxx.vercel.app`?

1. Buy domain on Route 53 or GoDaddy
2. Update Vercel custom domain settings
3. Update `FRONTEND_URL` in AWS environment

---

## Still Need Help?

Read: `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions

Or troubleshoot:
```powershell
# View all logs
eb logs

# Get more detailed logs
eb logs --all

# SSH into instance to debug
eb ssh
# Then run: pm2 logs
```

Good luck! 🚀
