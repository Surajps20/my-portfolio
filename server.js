const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware - Configure CORS for both local and production
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

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Route to send email
app.post("/api/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate input
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Email to your inbox
    const mailToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL || "saravanansuraj95@gmail.com",
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `
    };

    // Confirmation email to user
    const mailToUser = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hi ${name},</p>
        <p>I have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
        <br>
        <p>Best regards,<br>Suraj</p>
      `
    };

    // Send both emails
    await transporter.sendMail(mailToYou);
    await transporter.sendMail(mailToUser);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Handle both PORT (from AWS) and 5001 (local default)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  // console.log(`CORS allows: ${process.env.FRONTEND_URL || "localhost"}`);
});
