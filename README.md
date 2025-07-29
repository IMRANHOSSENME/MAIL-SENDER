# MAIL-SENDER

A professional email sender application built with Node.js, Express, and Nodemailer. Deploy easily on Vercel with SMTP integration.

## Features

- ✨ Professional email sending with HTML signatures
- 🚀 Ready for Vercel deployment
- 🎨 Beautiful responsive UI
- 📧 SMTP support (Brevo/Sendinblue)
- 🔒 Environment variable configuration
- 📱 Mobile-friendly design

## Project Structure

```
├── api/
│   ├── index.js         # Main API handler
│   └── send-email.js    # Email sending endpoint
├── public/
│   ├── index.html       # Frontend interface
│   ├── script.js        # Client-side JavaScript
│   └── styles.css       # Styling
├── server.js            # Local development server
├── vercel.json          # Vercel deployment configuration
└── package.json         # Dependencies and scripts
```

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `SMTP_HOST`: Your SMTP host (default: smtp-relay.brevo.com)
   - `SMTP_PORT`: SMTP port (default: 587)
   - `SMTP_USER`: Your SMTP username
   - `SMTP_PASS`: Your SMTP password
4. Deploy!

The project is configured with proper `vercel.json` for serverless deployment.

## Environment Variables

Create a `.env` file for local development:

```
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
```

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3001` to access the application.

## API Endpoints

- `POST /api/send-email` - Send an email
- `GET /api` - API status

## Made with ❤️ by IMRAN HOSSEN
