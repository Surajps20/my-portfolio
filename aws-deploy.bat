@echo off
REM AWS Elastic Beanstalk Quick Start Script
REM This script helps deploy your Node.js backend to AWS

echo.
echo ========================================
echo AWS Elastic Beanstalk Deployment Helper
echo ========================================
echo.

REM Check if AWS CLI is installed
aws --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] AWS CLI not found!
    echo Please install from: https://awscli.amazonaws.com/AWSCLIV2.msi
    pause
    exit /b 1
)

REM Check if EB CLI is installed
eb --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] EB CLI not found!
    echo Run: pip install awsebcli
    pause
    exit /b 1
)

echo [✓] AWS CLI installed
echo [✓] EB CLI installed
echo.

REM Check if credentials are configured
aws sts get-caller-identity >nul 2>&1
if %errorlevel% neq 0 (
    echo [!] AWS credentials not configured
    echo.
    call aws configure
) else (
    echo [✓] AWS credentials configured
)

echo.
echo Step 1: Initializing Elastic Beanstalk...
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" --region us-east-1

echo.
echo Step 2: Creating environment (this may take 10 minutes)...
eb create portfolio-backend-env

echo.
echo Step 3: Setting environment variables...
set /p EMAIL_USER="Enter your Gmail address: "
set /p EMAIL_PASS="Enter your Gmail App Password: "
set /p RECIPIENT_EMAIL="Enter recipient email (usually same as Gmail): "
set /p FRONTEND_URL="Enter your Vercel portfolio URL (e.g., https://my-portfolio-xxx.vercel.app): "

eb setenv EMAIL_USER=%EMAIL_USER% EMAIL_PASS=%EMAIL_PASS% RECIPIENT_EMAIL=%RECIPIENT_EMAIL% FRONTEND_URL=%FRONTEND_URL%

echo.
echo Step 4: Deploying...
eb deploy

echo.
echo [✓] Deployment complete!
echo.
echo Getting your backend URL...
for /f "tokens=*" %%A in ('eb open --print-url') do set BACKEND_URL=%%A

echo.
echo ========================================
echo Your backend URL is:
echo %BACKEND_URL%
echo ========================================
echo.
echo Next steps:
echo 1. Add REACT_APP_BACKEND_URL to Vercel environment variables
echo 2. Set it to: %BACKEND_URL%:5001
echo 3. Redeploy your frontend on Vercel
echo 4. Test the contact form!
echo.
pause
