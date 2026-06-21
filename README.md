# Unkommon

Custom AI/ML engineering studio. Production-grade AI systems on AWS.

![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.13-3776AB?logo=python&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?logo=amazonwebservices&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

**Live:** [unkommon.ai](https://unkommon.ai)

## Architecture

```
Browser
  |
  |-- React SPA (AWS Amplify)
  |     |-- AI Chatbot with tool-calling
  |     +-- Calendar booking integration
  |
  +-- API Gateway (WAF rate-limited)
        |-- POST /api/chat ----------- Intent Trie fast-path, else Claude on Bedrock
        |-- GET  /api/calendar/availability  Google Calendar API
        |-- POST /api/calendar/book ----------- Google Calendar API
        +-- POST /api/vapi-webhook --- HMAC-verified voice webhooks
```

```mermaid
graph LR
    A[Browser] --> B[AWS Amplify]
    B --> C[API Gateway + WAF]
    C --> D[Chatbot Lambda]
    C --> E[Calendar Lambda]
    C --> G[Vapi Webhook Lambda]
    D --> T{Intent Trie}
    T -->|FAQ match| R[Precomputed reply]
    T -->|miss| H[AWS Bedrock - Claude]
    D --> I[(DynamoDB: conversations)]
    D --> L[(DynamoDB: leads)]
    D --> M[(DynamoDB: appointments)]
    E --> J[Google Calendar]
    G -->|notification| K[Resend Email API]
    D -->|notification| K
```

## Features

**AI Chatbot.** Conversational assistant powered by Claude on AWS Bedrock. Multi-turn conversations with DynamoDB persistence (24 hour TTL) and tool-calling for calendar availability checks and appointment booking. Includes server-side prompt injection detection and a global hourly request budget to cap Bedrock costs.

**Intent classifier (Trie fast-path).** A Trie (prefix tree) runs before the Bedrock call and answers common FAQ questions from precomputed responses in O(m) time, where m is the number of words in the message. Only messages that do not match fall through to the language model, which cuts latency and per-token cost for common questions and keeps those answers deterministic.

**Lead and appointment persistence.** Captured leads and booked appointments are stored in DynamoDB with Global Secondary Indexes for the access patterns the business needs: recent leads by date, appointments by customer, and appointments by date range.

**Calendar Integration.** Google Calendar API with service account domain-wide delegation. Checks real-time availability, books appointments with conflict detection, generates Google Meet links, and sends branded HTML confirmation emails via Resend.

**Voice Webhook Processing.** Inbound voice call webhook handler with HMAC signature verification (fail-closed). Extracts structured data from Vapi call reports (name, email, phone) and triggers lead notification emails to the sales team via Resend.

## Tech Stack

| Frontend | Backend | Infrastructure |
|----------|---------|----------------|
| React 18 + TypeScript | Python 3.13 | AWS SAM (IaC) |
| Vite | AWS Lambda (3 functions) | API Gateway + WAFv2 |
| Tailwind CSS | AWS Bedrock (Claude) | DynamoDB (3 tables) |
| Framer Motion | Google Calendar API | AWS Secrets Manager |
| Radix UI / shadcn | Resend (email) | AWS Amplify (hosting) |
| Wouter (routing) | boto3 / requests | pytest + GitHub Actions CI |
| Three.js (globe) | | |

## Project Structure

```
.
├── frontend/                React SPA
│   ├── src/
│   │   ├── components/      UI components (ChatWidget, HeroBackground, etc.)
│   │   ├── pages/           Route pages (home, solutions, about, etc.)
│   │   ├── hooks/           Custom hooks
│   │   └── lib/             Utilities and config
│   ├── public/              Static assets
│   └── package.json
│
├── backend/                 AWS SAM serverless API
│   ├── chatbot/             AI chatbot (layered architecture)
│   │   ├── app.py           Lambda entry shim
│   │   ├── handlers/        HTTP handler + request guards
│   │   ├── services/        chat_service (tool-calling loop + Trie fast-path)
│   │   ├── domain/          system_prompt, tools, intent_trie (FAQ Trie)
│   │   ├── data/            DynamoDB, Bedrock, calendar, email, leads, appointments wrappers
│   │   ├── tests/           pytest suite (mocked AWS dependencies)
│   │   └── benchmark_intent_trie.py   Trie performance benchmark
│   ├── calendar_api/        Google Calendar integration
│   ├── vapi_webhook/        Voice webhook processor (HMAC-verified)
│   ├── events/              Sample invocation events
│   └── template.yaml        SAM infrastructure definition
│
├── .github/workflows/       GitHub Actions CI (runs the chatbot tests)
├── amplify.yml              Amplify build config + security headers
├── CLAUDE.md                AI assistant project context
└── LICENSE
```

## Testing

- **pytest** suite for the chatbot, with every external dependency (Bedrock, DynamoDB, calendar, email) mocked, so tests run fast and offline.
- **GitHub Actions** runs the test suite on every push.

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.13
- AWS SAM CLI
- AWS account with Bedrock access (Claude model access enabled)

### Frontend

```bash
cd frontend
cp .env.example .env       # Fill in your API URLs and keys
npm install
npm run dev                # Dev server on :3000
```

### Backend

```bash
cd backend
sam build
sam deploy --guided        # First deploy (creates resources + prompts for parameters)
```

Required SAM parameters: `VapiWebhookSecret`, `ResendApiKey`, `LeadsNotificationEmail`.

### Tests

```bash
cd backend/chatbot
python -m pytest -q
```

## Security

This project implements defense-in-depth:

- **Authentication.** HMAC signature verification on Vapi webhooks (fail-closed).
- **Least-privilege IAM.** Each Lambda is granted access only to the specific DynamoDB tables and services it needs, via per-table SAM policies, not blanket access.
- **Rate limiting.** AWS WAFv2 per-IP rules (100 requests / 5 minutes global, 30 requests / 5 minutes on the chatbot endpoint), plus application-level booking rate limits and a global hourly request budget.
- **Injection defense.** Regex-based prompt injection detection before LLM invocation, server-side tool parameter validation independent of LLM output, and a hardened system prompt with anti-injection rules. The Trie fast-path also removes the model from FAQ traffic entirely.
- **Input validation.** UUID format enforcement, email and date and phone regex validation, message length limits.
- **CORS.** Dynamic origin matching for production domains, not wildcard.
- **Headers.** HSTS, CSP, X-Frame-Options DENY, X-Content-Type-Options, Permissions-Policy, Referrer-Policy.
- **Secrets.** AWS Secrets Manager for Google Calendar credentials, SAM NoEcho parameters for runtime secrets, no hardcoded secrets in the repository.
- **Data.** DynamoDB parameterized queries, HTML escaping in email templates, 24 hour TTL on conversation data.

## Deployment

| Component | Platform | Trigger |
|-----------|----------|---------|
| Frontend | AWS Amplify | Git push to `main` |
| Backend | AWS SAM | `sam build && sam deploy` |
| WAF | AWS WAFv2 | Attached via CLI post-deploy |

## Roadmap

Planned additions for the next iteration:

- **CI/CD deploy pipeline.** Add a GitHub Actions deploy job using OpenID Connect federation to AWS, so a push deploys without static credentials (tests already run in CI).
- **Analytics layer.** DynamoDB Streams to S3 in Parquet format with Athena queries for trend analysis on leads and appointments.
- **Admin dashboard.** Cognito-authenticated leads management interface with JWT validation, introducing a `leads_api` Lambda and a Cognito User Pool.
- **Contact form endpoint.** A `contact_form` Lambda for direct contact submissions.

## License

MIT License. See [LICENSE](LICENSE).
