# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Unkommon is a custom AI/ML engineering studio. The application has a React frontend and Python serverless backend deployed on AWS.

- **Website:** unkommon.ai
- **GitHub:** https://github.com/medysaly/unkommon
- **Frontend hosting:** AWS Amplify
- **Backend hosting:** AWS SAM (Lambda + API Gateway)

## Architecture

**Frontend** (`frontend/`): React 18 + TypeScript, built with Vite. Uses Shadcn/ui + Radix UI components, Tailwind CSS, Framer Motion, TanStack React Query, and Wouter for routing. AWS Amplify handles hosting + Cognito auth. Vapi AI Web SDK for voice AI. Three.js for 3D globe.

**Backend** (`backend/`): Python 3.13 AWS Lambda functions managed via SAM. Five functions:

| Function | Path | Purpose |
|----------|------|---------|
| `chatbot/app.py` | `POST /api/chat` | AI chatbot via Bedrock (Claude Sonnet 4.5 + Haiku 4.5) |
| `chatbot/stream.py` | Lambda Function URL | Streaming chatbot responses via SSE |
| `contact_form/app.py` | `POST /api/contact` | Contact form -> DynamoDB + SES email |
| `leads_api/app.py` | `GET/DELETE /api/leads` | Admin leads dashboard API (Cognito JWT auth) |
| `vapi_webhook/app.py` | `POST /api/vapi-webhook` | Vapi voice call webhook -> saves leads |
| `calendar_api/app.py` | `GET/POST /api/calendar/*` | Google Calendar availability + appointment booking |

**Infrastructure** (`backend/template.yaml`): API Gateway + WAF, two DynamoDB tables (`unkommon-conversations` with TTL, `unkommon-leads` with GSI), SES, Bedrock, Secrets Manager.

## Frontend Pages

| Page | Route | Purpose |
|------|-------|---------|
| `home.tsx` | `/` | Landing page with globe, service cards |
| `solutions.tsx` | `/solutions` | AI solutions overview |
| `how-it-works.tsx` | `/how-it-works` | Process explanation |
| `book-a-call.tsx` | `/book-a-call` | Cal.com booking |
| `about.tsx` | `/about` | Company info |
| `sources.tsx` | `/sources` | Citations/references |
| `admin-login.tsx` | `/admin-login` | Admin authentication |
| `admin-dashboard.tsx` | `/admin-dashboard` | Leads management dashboard |
| `layout.tsx` | -- | Shared nav + footer + ChatWidget |

## Common Commands

### Frontend
```bash
cd frontend
npm install
npm run dev          # Dev server on :3000
npm run build        # Production build
npm run check        # TypeScript type checking
```

### Backend (SAM)
```bash
cd backend
sam build
sam deploy --guided  # First deploy
sam deploy --stack-name unkommon-backend --s3-bucket unkommon-sam-deployment --capabilities CAPABILITY_IAM --region us-east-1  # Subsequent deploys
```

## Design System

Dark theme first. Minimal, clean aesthetic:
- Backgrounds: `bg-white dark:bg-black`
- Text: `text-foreground` / `text-muted-foreground`
- Containers: `max-w-7xl mx-auto`
- Cards: glass-morphism (`backdrop-filter: blur()`) or simple `border-zinc-200 dark:border-zinc-800`
- Buttons: `bg-black dark:bg-white` with inverted text
- Icons: Lucide React
- Animations: Framer Motion throughout

## Key Components

- **ChatWidget.tsx** -- AI chatbot (streaming + non-streaming), global on all pages
- **HeroBackground.tsx** -- Animated particle background
- **CTAButton.tsx** -- Call-to-action button component

## Environment Variables

**Frontend** (`frontend/.env`):
- `VITE_API_URL` -- API Gateway endpoint
- `VITE_CHAT_STREAM_URL` -- Chatbot streaming Lambda Function URL
- `VITE_VAPI_PUBLIC_KEY` -- Vapi AI public key
- `VITE_VAPI_ASSISTANT_ID` -- Vapi assistant ID
- `VITE_COGNITO_USER_POOL_ID` -- Cognito User Pool ID
- `VITE_COGNITO_CLIENT_ID` -- Cognito App Client ID

**Backend** (SAM parameters + env vars):
- `VapiWebhookSecret` -- HMAC secret for webhook verification (NoEcho)
- `ResendApiKey` -- Resend email API key (NoEcho)
- `CognitoUserPoolId` -- Cognito User Pool ID (NoEcho)
- `GOOGLE_CALENDAR_SECRET` -- Secrets Manager key for Google Calendar

## Security

- Cognito JWT validation on leads API (Lambda-level)
- HMAC signature verification on Vapi webhooks (fail-closed)
- WAF per-IP rate limiting on API Gateway
- Server-side tool parameter validation on chatbot (independent of LLM)
- Per-conversation booking limits
- CSP, HSTS, X-Frame-Options, Permissions-Policy headers
- No hardcoded secrets -- Secrets Manager + NoEcho parameters

## Frontend Path Aliases

Configured in `vite.config.ts` and `tsconfig.json`:
- `@/` -> `frontend/src/`
