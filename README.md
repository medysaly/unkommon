# Business Automated - AI Marketing Platform

A full-stack TypeScript application for AI-powered business automation services with AWS deployment.

## Project Structure

```
businessautomated/
├── frontend/           # React frontend (AWS Amplify)
├── backend/            # Express.js API (AWS App Runner)
├── shared-types/       # Shared TypeScript types/schemas
├── docs/               # Documentation
└── attached_assets/    # Static assets
```

## Getting Started

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Development

```bash
cd backend
npm install
npm run dev
```

Backend API runs on `http://localhost:5000`

### Environment Variables

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

#### Backend (.env)
```
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_session_secret
AWS_SES_REGION=us-east-1
AWS_SES_FROM_EMAIL=noreply@yourdomain.com
```

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui Components
- Framer Motion
- React Query
- Wouter (routing)

### Backend
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL
- Passport (authentication)

## Deployment

See [docs/finalplan.txt](docs/finalplan.txt) for complete AWS deployment strategy.

### Frontend → AWS Amplify
### Backend → AWS App Runner
### Database → Amazon RDS PostgreSQL
### Email → Amazon SES
### Domain → Route 53 + ACM

## Development Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio

## License

MIT
