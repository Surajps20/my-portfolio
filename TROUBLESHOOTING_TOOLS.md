# 🔧 AWS CLI & EB CLI - Installation Troubleshooting

## Problem: "aws command not found"

### Solution 1: Restart Your Computer (Most Common Fix)

The installers modify your system PATH, which requires a **full computer restart**.

```
1. Restart your computer (not just PowerShell)
2. Wait for it to fully boot
3. Open PowerShell
4. Try: aws --version
```

**This fixes 90% of "command not found" errors!**

---

## Problem: Still doesn't work after restart?

### Solution 2: Manually Add to PATH

1. **Find where AWS CLI was installed:**
   ```powershell
   Get-ChildItem "C:\Program Files\Amazon\AWSCLIV2\"
   ```

2. **If found, add to PATH:**
   ```powershell
   $env:PATH += ";C:\Program Files\Amazon\AWSCLIV2\"
   ```

3. **Verify:**
   ```powershell
   aws --version
   ```

---

## Problem: EB CLI not found

### Solution 1: Download Official Installer

1. Visit: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-windows.html
2. Download Windows installer (.exe)
3. Run it
4. Restart PowerShell
5. Try: `eb --version`

### Solution 2: Use npm

```powershell
npm install -g @aws-amplify/cli
```

### Solution 3: RECOMMENDED - Use Serverless Framework Instead

```powershell
npm install -g serverless
serverless --version
```

This is easier! See: `ALTERNATIVE_SERVERLESS_DEPLOYMENT.md`

---

## Problem: All tools fail to install

### Use the Serverless Alternative

The serverless framework method requires only npm (which you already have):

```powershell
npm install -g serverless
serverless --version
```

Then follow: `ALTERNATIVE_SERVERLESS_DEPLOYMENT.md`

**This is actually easier and doesn't need AWS CLI or EB CLI!**

---

## Diagnostic Commands

```powershell
# Check if tools are installed
aws --version
eb --version
npm --version

# If they show "not found", try restarting

# Check PATH
echo $env:PATH

# Find installed programs
Get-ChildItem "C:\Program Files\Amazon\*"
Get-ChildItem "C:\Program Files\Elastic Beanstalk*"
```

---

## Nuclear Option: Complete Reinstall

If nothing works:

```powershell
# 1. Uninstall AWS CLI
# Go to Settings → Apps → Apps & Features
# Search "AWS" and uninstall

# 2. Uninstall EB CLI
# Similar process

# 3. Delete any leftover files
Remove-Item -Recurse "C:\Program Files\Amazon\AWSCLIV2\" -ErrorAction SilentlyContinue

# 4. Restart computer

# 5. Reinstall AWS CLI (download fresh)
# msiexec.exe /i https://awscli.amazonaws.com/AWSCLIV2.msi

# 6. Restart again
```

---

## Still Stuck?

**Use the Serverless Framework instead!**

It's simpler and doesn't need any AWS CLI tools:

```powershell
npm install -g serverless
```

Read: `ALTERNATIVE_SERVERLESS_DEPLOYMENT.md`

---

## Quick Test

After any installation, always test:

```powershell
# Test AWS CLI
aws --version

# Test EB CLI
eb --version

# Test serverless
serverless --version

# One of these should work!
```

**If one works, you're good to go!** ✅
