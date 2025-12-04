# Email Contact Form Setup Guide

## Overview
Your portfolio contact form now sends emails directly to your inbox using **Node.js/Express** backend with **Nodemailer**.

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Gmail
To use Gmail for sending emails, you need to generate an "App Password":

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Go back to Security → App passwords
4. Select "Mail" and "Windows Computer" (or your device)
5. Copy the 16-character password generated
6. Open `.env` file and update:
   ```
   EMAIL_USER=saravanansuraj95@gmail.com
   EMAIL_PASS=xxxx xxxx xxxx xxxx  (paste the 16-char password here)
   ```

### 3. Run the Application

**Option A: Run both frontend and backend together**
```bash
npm run dev
```

**Option B: Run separately in two terminals**

Terminal 1 (Backend Server):
```bash
npm run server
```

Terminal 2 (React Frontend):
```bash
npm start
```

### 4. Test the Contact Form
- Open `http://localhost:3000` in your browser
- Fill in the contact form
- Click "Send Message"
- You should receive:
  - An email in your inbox with the message
  - A confirmation email is sent to the user who submitted the form

## Features
✅ User types name, email, subject, and message  
✅ Form validates all required fields  
✅ Frontend shows loading state while sending  
✅ Success/error messages displayed to user  
✅ Confirmation email sent to user  
✅ Contact details email sent to your inbox  

## Environment Variables (.env)
```
EMAIL_USER=         # Your Gmail address
EMAIL_PASS=         # 16-character App Password (from Google Account)
RECIPIENT_EMAIL=    # Where to send contact form messages (can be same as EMAIL_USER)
PORT=5000           # Backend server port
```

## Troubleshooting

### "Error: Could not connect to server"
- Make sure the backend is running (`npm run server`)
- Check that port 5000 is not in use

### "Failed to send email"
- Verify `.env` credentials are correct
- Check that 2-Step Verification is enabled on your Google Account
- Ensure you used an "App Password" (not your regular Gmail password)
- Check Gmail "Less secure app access" is enabled

### Emails not arriving
- Check spam/junk folder
- Verify the recipient email address in `.env`
- Check browser console for error messages

## Files Modified
- `src/components/Contact/Contact.js` - Updated with form submission logic
- `package.json` - Added backend dependencies
- `server.js` - New backend server file (created)
- `.env` - Environment configuration file

## Next Steps (Optional)
- Deploy backend to Heroku, Railway, or similar
- Update `http://localhost:5000` to your live backend URL in `Contact.js`
- Add rate limiting to prevent spam
- Add email verification
