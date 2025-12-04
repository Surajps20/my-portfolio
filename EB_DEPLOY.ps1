# EB Deployment Helper Script for PowerShell
# This script provides easy access to EB commands with the full path to eb.exe

$EB_PATH = "C:\Users\suraj\AppData\Local\Programs\Python\Python314\Scripts\eb.exe"
$PROJECT_DIR = "C:\Users\suraj\Desktop\Portfolio\Portfolio"

# Add to PATH for this session
$env:PATH += ";C:\Users\suraj\AppData\Local\Programs\Python\Python314\Scripts"

# Functions for common EB commands
function eb-status {
    Write-Host "Checking EB environment status..."
    & $EB_PATH status
}

function eb-logs {
    Write-Host "Fetching EB logs..."
    & $EB_PATH logs
}

function eb-ssh {
    Write-Host "Opening SSH to EB instance..."
    & $EB_PATH ssh
}

function eb-deploy {
    Write-Host "Deploying to EB..."
    & $EB_PATH deploy
}

function eb-open {
    Write-Host "Opening EB environment in browser..."
    & $EB_PATH open
}

function eb-get-url {
    Write-Host "Getting EB environment URL..."
    $status = & $EB_PATH status --verbose 2>&1
    $cname = $status | Select-String "CNAME:" | ForEach-Object { $_.Line -replace ".*CNAME:\s*", "" }
    if ($cname) {
        Write-Host "✅ Backend URL: http://$cname"
        return "http://$cname"
    } else {
        Write-Host "❌ Could not find CNAME. Run 'eb-status' for details."
        return $null
    }
}

function eb-setenv {
    Write-Host "Setting environment variables..."
    $EMAIL_USER = "ssuraj6255@gmail.com"
    $EMAIL_PASS = "pojtjwvihussqvea"
    $RECIPIENT_EMAIL = "ssuraj6255@gmail.com"
    $FRONTEND_URL = "https://my-portfolio-4a3qmib30-suraj-p-ss-projects.vercel.app"
    
    & $EB_PATH setenv `
        EMAIL_USER=$EMAIL_USER `
        EMAIL_PASS=$EMAIL_PASS `
        RECIPIENT_EMAIL=$RECIPIENT_EMAIL `
        FRONTEND_URL=$FRONTEND_URL
    
    Write-Host "✅ Environment variables set!"
}

# Display available commands
Write-Host "🚀 EB Commands Available:"
Write-Host "  eb-status        - Check environment status"
Write-Host "  eb-logs          - View logs"
Write-Host "  eb-ssh           - SSH into instance"
Write-Host "  eb-deploy        - Deploy code"
Write-Host "  eb-open          - Open in browser"
Write-Host "  eb-get-url       - Get backend URL"
Write-Host "  eb-setenv        - Set email/frontend vars"
Write-Host ""
Write-Host "💡 Tip: eb-get-url will give you the backend URL to add to Vercel!"
