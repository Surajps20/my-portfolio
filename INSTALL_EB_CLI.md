# ⚡ Quick Fix: Install EB CLI (No Python Required)

If you got an error about Python or pip, use this method instead.

## Fastest Solution: Download Official Installer

1. **Open this link in your browser:**
   https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install-windows.html

2. **Look for the "Windows" section**

3. **Download the Windows installer** (`.exe` file)
   - It's about 50 MB
   - Latest version is recommended

4. **Run the installer**
   - Double-click the `.exe` file
   - Click through the installation wizard
   - Click "Next" → "Install" → "Finish"

5. **Restart PowerShell** (close and reopen)

6. **Verify it works:**
   ```powershell
   eb --version
   ```
   Should show: `EB CLI (version X.X.X)`

---

## Alternative: Use AWS CLI Only

If you don't want to install EB CLI separately, you can use AWS CLI directly:

```powershell
# Instead of: eb create portfolio-backend-env
# Use: aws elasticbeanstalk create-environment ...

# But this is more complex, so we recommend the EB CLI installer above
```

---

## If Installer Method Doesn't Work

Try this command in PowerShell:

```powershell
# If you have npm (Node.js) installed
npm install -g @aws-amplify/cli
```

---

## Once Installed

After EB CLI is installed, go back to `START_HERE.md` and continue with:

```powershell
aws configure
# Then continue with deployment steps
```

---

**Any issues? The official installer should work for 99% of cases.**
