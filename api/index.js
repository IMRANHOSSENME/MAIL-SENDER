const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// Initialize SMTP transporter
const transporter = nodemailer.createTransporter({
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
app.use(express.static(path.join(__dirname, '../')));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Email Sender API is running!',
    endpoints: {
      'POST /api/send-email': 'Send an email'
    }
  });
});

module.exports = app;
