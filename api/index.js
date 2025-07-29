const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Import API handlers
const sendEmailHandler = require('./send-email');
const healthHandler = require('./health');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.post('/api/send-email', sendEmailHandler);
app.get('/api/health', healthHandler);

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Email Sender API is running!',
    endpoints: {
      'POST /api/send-email': 'Send an email',
      'GET /api/health': 'Check API health'
    },
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
module.exports = app;
