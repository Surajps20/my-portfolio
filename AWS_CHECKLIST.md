# AWS Deployment Checklist

## Pre-Deployment ✅
- [ ] AWS Account created
- [ ] AWS Free Tier eligible
- [ ] IAM user with credentials created
- [ ] AWS Access Key ID saved
- [ ] AWS Secret Access Key saved

## Installation ✅
- [ ] AWS CLI installed
- [ ] EB CLI installed (`pip install awsebcli`)
- [ ] AWS credentials configured (`aws configure`)
- [ ] Tested: `aws sts get-caller-identity` works

## Code Ready ✅
- [ ] `Procfile` exists in project root
- [ ] `.ebextensions/nodecommand.config` exists
- [ ] `server.js` updated for AWS
- [ ] `.env` file has all credentials
- [ ] `package.json` has correct dependencies
- [ ] Local test: `node server.js` works

## Deployment Steps ✅
- [ ] Navigated to: `c:\Users\suraj\Desktop\Portfolio\Portfolio`
- [ ] Ran: `eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1`
- [ ] Ran: `eb create portfolio-backend-env` (waiting 10 mins)
- [ ] Ran: `eb setenv` with email and frontend URL
- [ ] Ran: `eb deploy`
- [ ] Got backend URL from `eb status` or `eb open`

## Backend URL Format ✅
Example: `http://portfolio-backend-env.eba-xxxxx.us-east-1.elasticbeanstalk.com`
My URL: `_________________________________` (fill in)

## Frontend Update ✅
- [ ] Logged into Vercel Dashboard
- [ ] Selected project: `my-portfolio`
- [ ] Went to Settings → Environment Variables
- [ ] Added variable:
  - Name: `REACT_APP_BACKEND_URL`
  - Value: `YOUR_EB_URL` (without :5001)
- [ ] Clicked Save
- [ ] Waited for Vercel to redeploy

## Testing ✅
- [ ] Visited Vercel portfolio URL
- [ ] Navigated to Contact section
- [ ] Can type in all form fields
- [ ] Can submit the form
- [ ] Got success message
- [ ] Checked email inbox (and spam folder)
- [ ] Received the email

## Success! 🎉
- [ ] Contact form works end-to-end
- [ ] Frontend on Vercel ✅
- [ ] Backend on AWS ✅
- [ ] Email working ✅
- [ ] Portfolio complete ✅

---

## Troubleshooting Checklist

### Installation Issues
- [ ] Restarted PowerShell after installing AWS CLI
- [ ] Ran: `pip install --upgrade awsebcli`
- [ ] Added Python to PATH: `C:\Python\Scripts`

### Credentials Issues
- [ ] Verified Access Key ID is correct
- [ ] Verified Secret Access Key is correct
- [ ] Ran: `aws sts get-caller-identity` to test
- [ ] Checked AWS Console → Security Credentials

### Deployment Issues
- [ ] Checked: `eb status` for errors
- [ ] Viewed: `eb logs` to debug
- [ ] Waited full 10 minutes for environment to spin up
- [ ] Tried: `eb deploy` again if first attempt failed

### Backend URL Issues
- [ ] No trailing slash in REACT_APP_BACKEND_URL
- [ ] URL doesn't include `:5001` (EB handles routing)
- [ ] Waited 5 minutes after updating Vercel for redeploy

### Email Issues
- [ ] Gmail credentials correct in `eb setenv`
- [ ] Using App Password, not regular password
- [ ] 2-Step Verification enabled on Gmail
- [ ] Checked spam/junk folder
- [ ] Verified recipient email in `.env`

### Contact Form Issues
- [ ] Can type in name field ✅
- [ ] Can type in email field ✅
- [ ] Can type in subject field ✅
- [ ] Can type in message field ✅
- [ ] Send button not disabled ✅
- [ ] Backend URL is correct ✅
- [ ] No console errors (F12) ✅

---

## If Everything Fails

### Full Reset
```powershell
# Stop the current environment
eb terminate portfolio-backend-env

# Remove EB configuration
Remove-Item -Recurse .elasticbeanstalk
Remove-Item -Recurse .ebignore

# Start fresh
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1
```

### Contact Help
1. Check AWS documentation: https://docs.aws.amazon.com/elasticbeanstalk
2. Check error in console: `eb logs`
3. SSH into instance: `eb ssh` and check `/var/log/eb-engine.log`

---

## Final Notes

- **Keep credentials safe**: Never commit `.env` to GitHub
- **Monitor costs**: Set up AWS billing alerts
- **Regular backups**: Use git to version control
- **Update dependencies**: Run `npm update` quarterly

You've got this! 🚀
