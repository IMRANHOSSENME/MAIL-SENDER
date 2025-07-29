const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize SMTP transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-relay.brevo.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || '6f20eb002@smtp-brevo.com',
    pass: process.env.SMTP_PASS || 'wWs9pqdvMzYOU2cS'
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Email sending route
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, message, from, from_name, reply_to, cc, bcc } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, message'
      });
    }

    // Professional HTML signature
    const htmlSignature = `
    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e91e63; font-family: Arial, sans-serif;">
      <div style="background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <div style="display: table; width: 100%;">
          <div style="display: table-cell; width: 50%; vertical-align: top;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold; color: #333;">IMRAN HOSSEN</h2>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Computer Engineer</p>
            <p style="margin: 5px 0; font-size: 14px; color: #666;">Founder and CEO | DARKBDSHOP</p>
          </div>
          <div style="display: table-cell; width: 50%; vertical-align: top;">
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <span style="color: #e91e63;">📞</span> +8809638840088
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <span style="color: #e91e63;">📧</span> contact@imranhossen.me
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <span style="color: #e91e63;">🌐</span> 
              <a href="https://www.imranhossen.me" target="_blank" style="color: #333; text-decoration: none;">https://www.imranhossen.me</a>
            </p>
            <p style="margin: 5px 0; font-size: 14px; color: #333;">
              <span style="color: #e91e63;">📍</span> Angargara, Bhaluka, Mymenshingh, 2240
            </p>
          </div>
        </div>
        
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        
        <div style="text-align: center; margin: 20px 0;">
          <a href="https://www.facebook.com/imranhossenme" target="_blank" style="display: inline-block; margin: 0 10px; padding: 8px 12px; background-color: #1877f2; color: white; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 5px;">
            Facebook
          </a>
          <a href="https://www.twitter.com/imranhossenme" target="_blank" style="display: inline-block; margin: 0 10px; padding: 8px 12px; background-color: #1da1f2; color: white; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 5px;">
            Twitter
          </a>
          <a href="https://www.linkedin.com/in/imranhossenme" target="_blank" style="display: inline-block; margin: 0 10px; padding: 8px 12px; background-color: #0077b5; color: white; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 5px;">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/imranhossenme" target="_blank" style="display: inline-block; margin: 0 10px; padding: 8px 12px; background-color: #e4405f; color: white; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 5px;">
            Instagram
          </a>
          <a href="https://www.youtube.com/@imranhossenme" target="_blank" style="display: inline-block; margin: 0 10px; padding: 8px 12px; background-color: #ff0000; color: white; text-decoration: none; font-size: 14px; font-weight: bold; border-radius: 5px;">
            YouTube
          </a>
        </div>
        
        <p style="text-align: center; font-size: 12px; color: #888888; margin: 10px 0;">Copyright © 2025 IMRAN HOSSEN</p>
      </div>
    </div>`;

    // Convert plain text message to HTML and add signature
    const htmlMessage = message.replace(/\n/g, '<br>') + htmlSignature;
    const plainTextMessage = message + `

──────────────────────────────────────

IMRAN HOSSEN
Computer Engineer
Founder and CEO | DARKBDSHOP

📞 +8809638840088
📧 contact@imranhossen.me
🌐 https://www.imranhossen.me
📍 Angargara, Bhaluka, Mymenshingh, 2240

🔗 Connect with me:
Facebook: https://www.facebook.com/imranhossenme
Twitter: https://www.twitter.com/imranhossenme
LinkedIn: https://www.linkedin.com/in/imranhossenme
Instagram: https://www.instagram.com/imranhossenme
YouTube: https://www.youtube.com/@imranhossenme

Copyright © 2025 IMRAN HOSSEN`;

    const mailOptions = {
      from: `${from_name || 'IMRAN HOSSEN'} <${from || 'contact@imranhossen.me'}>`,
      to: to,
      subject: subject,
      text: plainTextMessage,
      html: htmlMessage,
      replyTo: reply_to || from || 'contact@imranhossen.me'
    };

    if (cc) mailOptions.cc = cc;
    if (bcc) mailOptions.bcc = bcc;

    await transporter.sendMail(mailOptions);
    
    res.json({
      success: true,
      message: 'Email sent successfully!'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to send email'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Email Server running on http://localhost:${PORT}`);
  console.log(`� Ready to send emails!`);
});

module.exports = app;
