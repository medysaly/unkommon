# Business Automated Platform

## Overview

Business Automated is a marketing website showcasing AI automation solutions for businesses. The platform presents various AI-powered services including AI Receptionist, Speed-to-Lead response systems, booking automation, and social media bots. This is a full-stack TypeScript application recreating an existing site's design and functionality with a focus on professional presentation and user engagement.

The application serves as a showcase and lead generation platform for AI business automation services, featuring multiple dedicated pages for different AI solutions, an interactive demo component, and contact capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing (no React Router dependency)
- Motion (Framer Motion) for animations and transitions

**UI Component System**
- Shadcn/ui component library using Radix UI primitives
- Tailwind CSS for styling with custom configuration
- "New York" style variant with dark theme as primary design
- Comprehensive component library including forms, dialogs, cards, navigation, and data display components

**Design System**
- Dark theme foundation (slate-900/slate-800 backgrounds)
- Gradient accent colors for feature differentiation (blue-to-cyan, purple-to-pink, green-to-emerald, orange-to-red)
- Design guidelines documented in `design_guidelines.md` specifying exact color palettes, typography scales, and layout patterns
- Reference-based design approach recreating an existing implementation

**State Management**
- TanStack Query (React Query) for server state management
- React Hook Form with Zod for form validation
- Local component state with React hooks

**Page Structure**
- Layout wrapper with fixed header navigation and footer
- Dedicated pages for each AI solution (9+ product pages)
- Home page featuring hero section with video background
- Agent Library page cataloging all available AI solutions
- About and Contact pages for company information and lead capture

**CTA (Call-to-Action) Sections**
- All pages feature bottom CTA sections with background images from Supabase storage
- Home page: Robot head image with `backgroundPosition: center 40%` to ensure full visibility
- AI Receptionist: Robot hand on yellow mouse image (`6656d163b_alex-shuper-uFCmJ6fiWGY-unsplash.png`) centered
- Speed-to-Lead: Purple-themed CTA with right-aligned background image
- AI Booking System: Green-themed CTA with WhatsApp icon animation (slides right with bounce-back effect)
- Social Media Bot: Social icons background image at `center 70%` position
- All CTA sections use `py-20` padding and are optimized for full image visibility when scrolled to bottom

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom Vite middleware integration for development
- HTTP server setup supporting both development and production modes

**API Design**
- RESTful API pattern (routes prefixed with `/api`)
- Centralized route registration in `server/routes.ts`
- Request logging middleware with response capture
- JSON body parsing with raw body preservation for webhooks

**Storage Layer**
- Abstract storage interface (`IStorage`) for database operations
- In-memory storage implementation (`MemStorage`) as default
- Prepared for database integration via Drizzle ORM
- User management CRUD operations defined

### Data Storage

**Database Configuration**
- Drizzle ORM configured for PostgreSQL
- Schema definition in `shared/schema.ts`
- Migration support via Drizzle Kit
- Connection via `@neondatabase/serverless` for Neon database compatibility

**Schema Design**
- Users table with UUID primary keys, username, and password fields
- Zod schema validation integrated with Drizzle
- Type-safe insert and select operations
- Prepared for expansion with additional tables

### External Dependencies

**Third-Party Services**
- Cloudinary for video hosting (hero section background videos)
- Google Fonts (Inter font family) loaded via CDN
- Neon Database (PostgreSQL) for production data storage

**Key Libraries**
- **UI Components**: @radix-ui/* primitives for accessible components
- **Forms**: react-hook-form, @hookform/resolvers, zod for validation
- **Animations**: framer-motion for page transitions and interactive elements
- **Icons**: lucide-react, react-icons (for brand-specific icons)
- **Styling**: tailwindcss, clsx, tailwind-merge, class-variance-authority
- **Database**: drizzle-orm, @neondatabase/serverless, drizzle-zod
- **State**: @tanstack/react-query
- **Carousel**: embla-carousel-react
- **Date Handling**: date-fns, react-day-picker

**Development Tools**
- TypeScript for type safety across the stack
- ESBuild for server bundling in production
- TSX for development server execution
- Replit-specific plugins for development environment integration

**Session Management**
- connect-pg-simple for PostgreSQL-backed session storage
- Configured but not yet implemented in current codebase