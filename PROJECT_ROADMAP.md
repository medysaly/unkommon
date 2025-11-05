# Business Automated - AWS-First Development Roadmap

**Last Updated:** October 31, 2024
**Status:** Planning Phase Complete ✅
**Approach:** AWS-First (No Local Database)

---

## 📋 PHASE 1: PROJECT SETUP & ORGANIZATION ✅

### ✅ Completed Tasks
- [x] Analyze existing codebase and understand project structure
- [x] Create comprehensive AWS deployment plan
- [x] Reorganize folder structure (separate frontend/backend)
- [x] Remove old/duplicate files and Replit configurations
- [x] Fix Tailwind CSS configuration paths
- [x] Restore missing assets folder
- [x] Verify both frontend and backend servers run successfully
- [x] Create project documentation (README, FOLDER_STRUCTURE, finalplan)

---

## 📋 PHASE 2: AWS INITIAL SETUP & RDS DATABASE

### AWS Account Setup
- [ ] **Step 1:** Verify AWS account access
  - Login to AWS Console
  - Enable MFA on root account (if not done)
  - Note your region (recommend: us-east-1)

- [ ] **Step 2:** Create IAM user for development
  - Create IAM user with admin access
  - Generate access keys
  - Install AWS CLI: `brew install awscli`
  - Configure: `aws configure`

### RDS PostgreSQL Setup
- [ ] **Step 3:** Create RDS PostgreSQL instance
  - Navigate to RDS in AWS Console
  - Click "Create database"
  - Engine: PostgreSQL 15.x
  - Templates: Free tier (db.t3.micro) or Production (db.t3.small)
  - DB instance identifier: `business-automated-db`
  - Master username: `postgres`
  - Master password: (save securely)
  - Storage: 20GB GP3
  - **Public access: YES** (for development)
  - VPC security group: Create new (allow 5432 from your IP)
  - Database name: `business_automated`

- [ ] **Step 4:** Wait for RDS instance to be available
  - Takes 5-10 minutes
  - Note the endpoint URL
  - Format: `business-automated-db.xxxxx.us-east-1.rds.amazonaws.com`

- [ ] **Step 5:** Configure security group
  - Add inbound rule for PostgreSQL (5432)
  - Source: Your IP address (for development)
  - Later: Add AWS service IPs for App Runner

- [ ] **Step 6:** Test database connection
  - Install PostgreSQL client: `brew install postgresql`
  - Test connection:
    ```bash
    psql -h <RDS_ENDPOINT> -U postgres -d business_automated
    ```
  - Enter password when prompted
  - Exit: `\q`

### Database Schema Setup
- [ ] **Step 7:** Create database schema file
  - File: `shared-types/schema.ts`
  - Define tables:
    - `leads` - Contact form submissions
    - `admin_users` - Admin authentication

- [ ] **Step 8:** Set up environment variables
  - Create `backend/.env` file:
    ```
    DATABASE_URL=postgresql://postgres:PASSWORD@RDS_ENDPOINT:5432/business_automated
    SESSION_SECRET=generate-random-string-here
    NODE_ENV=development
    ```
  - Replace PASSWORD and RDS_ENDPOINT

- [ ] **Step 9:** Run database migrations
  - Command: `cd backend && npm run db:push`
  - Verify tables created:
    ```bash
    psql -h <RDS_ENDPOINT> -U postgres -d business_automated -c "\dt"
    ```

- [ ] **Step 10:** Create test database connection in backend
  - Add health check endpoint
  - Test database query works

---

## 📋 PHASE 3: CONTACT FORM & LEAD CAPTURE

### Backend API Development
- [ ] **Step 1:** Add CORS configuration
  - Install: `cd backend && npm install cors @types/cors`
  - Configure in `backend/src/index.ts`
  - Allow: `http://localhost:3000`

- [ ] **Step 2:** Create leads API endpoint
  - File: `backend/src/routes/leads.ts`
  - POST `/api/leads` - Submit contact form
  - Validation with Zod schema
  - Save to database

- [ ] **Step 3:** Update routes registration
  - Register leads routes in `backend/src/routes.ts`
  - Test with Thunder Client/Postman

- [ ] **Step 4:** Add error handling
  - Database errors
  - Validation errors
  - Return proper status codes

### Frontend Contact Form
- [ ] **Step 5:** Update Contact page
  - File: `frontend/src/pages/contact.tsx`
  - Form fields: name, email, phone, company, service, message
  - Use React Hook Form + Zod validation
  - Style with Shadcn components

- [ ] **Step 6:** Create API client function
  - File: `frontend/src/lib/api.ts`
  - POST to `/api/leads`
  - Handle errors

- [ ] **Step 7:** Add form submission handler
  - Show loading state
  - Success toast notification
  - Error toast notification
  - Clear form on success

- [ ] **Step 8:** Test contact form end-to-end
  - Submit test data
  - Verify in RDS database
  - Test error cases

---

## 📋 PHASE 4: ADMIN PANEL - AUTHENTICATION

### Backend Admin Auth
- [ ] **Step 1:** Install authentication dependencies
  - `cd backend && npm install bcrypt @types/bcrypt`
  - `npm install express-session @types/express-session`

- [ ] **Step 2:** Create admin seed script
  - File: `backend/src/scripts/createAdmin.ts`
  - Hash password with bcrypt
  - Insert admin user into database
  - Run script

- [ ] **Step 3:** Configure express-session
  - Update `backend/src/index.ts`
  - Store sessions in database or memory

- [ ] **Step 4:** Create authentication middleware
  - File: `backend/src/middleware/auth.ts`
  - `requireAuth` - Protect admin routes
  - Check session

- [ ] **Step 5:** Create admin auth endpoints
  - POST `/api/admin/login` - Login
  - POST `/api/admin/logout` - Logout
  - GET `/api/admin/me` - Get current admin

### Frontend Admin Login
- [ ] **Step 6:** Create admin route structure
  - `/admin/login` - Login page
  - `/admin/dashboard` - Protected dashboard
  - `/admin/leads` - Protected leads page

- [ ] **Step 7:** Create login page
  - File: `frontend/src/pages/admin/login.tsx`
  - Username and password fields
  - Submit to `/api/admin/login`
  - Store session cookie
  - Redirect to dashboard

- [ ] **Step 8:** Create protected route wrapper
  - Check if user is authenticated
  - Redirect to login if not

- [ ] **Step 9:** Test authentication flow
  - Login with correct credentials
  - Login with wrong credentials
  - Access protected route without login
  - Logout functionality

---

## 📋 PHASE 5: ADMIN PANEL - DASHBOARD

### Backend Admin API
- [ ] **Step 1:** Create admin leads endpoints
  - GET `/api/admin/leads` - List all (paginated)
  - GET `/api/admin/leads/:id` - Get single lead
  - PATCH `/api/admin/leads/:id` - Update status/notes
  - GET `/api/admin/stats` - Dashboard statistics

- [ ] **Step 2:** Add filtering and pagination
  - Query params: page, limit, status, search
  - Return: data, total, page, pages

- [ ] **Step 3:** Add CSV export endpoint
  - GET `/api/admin/leads/export`
  - Generate CSV file
  - Stream download

### Frontend Admin Dashboard
- [ ] **Step 4:** Create dashboard layout
  - File: `frontend/src/pages/admin/dashboard.tsx`
  - Sidebar navigation
  - Header with logout

- [ ] **Step 5:** Create stats cards component
  - Total leads
  - New leads (last 7 days)
  - Leads by service type
  - Quick metrics

- [ ] **Step 6:** Create leads table page
  - File: `frontend/src/pages/admin/leads.tsx`
  - Table with all leads
  - Columns: date, name, email, service, status
  - Sortable columns
  - Search bar
  - Filter by status
  - Pagination

- [ ] **Step 7:** Create lead detail page
  - File: `frontend/src/pages/admin/leads/[id].tsx`
  - Show full lead info
  - Edit status dropdown
  - Add notes textarea
  - Save changes button
  - Email/phone click-to-action

- [ ] **Step 8:** Add export button
  - Download CSV button
  - Trigger download

- [ ] **Step 9:** Test admin panel
  - View all leads
  - Update lead status
  - Add notes
  - Export CSV

---

## 📋 PHASE 6: EMAIL NOTIFICATIONS (AWS SES)

### AWS SES Setup
- [ ] **Step 1:** Navigate to Amazon SES
  - AWS Console → SES
  - Choose same region as RDS

- [ ] **Step 2:** Verify email addresses
  - Verify your admin email
  - Verify noreply email (e.g., noreply@yourdomain.com)
  - Click verification links

- [ ] **Step 3:** Request production access (if needed)
  - SES starts in sandbox mode
  - Can only send to verified emails
  - Request production access for any email
  - Takes 24-48 hours

### Backend Email Integration
- [ ] **Step 4:** Install AWS SES SDK
  - `cd backend && npm install @aws-sdk/client-ses`

- [ ] **Step 5:** Create email service
  - File: `backend/src/services/email.ts`
  - `sendLeadNotification(lead)` - To admin
  - `sendAutoReply(email, name)` - To customer

- [ ] **Step 6:** Add environment variables
  - `AWS_REGION=us-east-1`
  - `AWS_ACCESS_KEY_ID=xxx`
  - `AWS_SECRET_ACCESS_KEY=xxx`
  - `AWS_SES_FROM_EMAIL=noreply@yourdomain.com`
  - `ADMIN_EMAIL=your@email.com`

- [ ] **Step 7:** Integrate with leads endpoint
  - Call email service after saving lead
  - Handle failures gracefully
  - Log email errors

- [ ] **Step 8:** Test email functionality
  - Submit test lead
  - Verify admin receives email
  - Verify customer receives auto-reply

---

## 📋 PHASE 7: BACKEND DEPLOYMENT - AWS APP RUNNER

### Prepare for Deployment
- [ ] **Step 1:** Create GitHub repository
  - Initialize git: `git init`
  - Create repo on GitHub
  - Push code: `git push origin main`

- [ ] **Step 2:** Create production build script
  - Verify `backend/package.json` has build script
  - Test build: `cd backend && npm run build`

- [ ] **Step 3:** Add health check endpoint
  - GET `/api/health`
  - Return: `{ status: 'ok', timestamp: Date.now() }`

- [ ] **Step 4:** Update RDS security group
  - Add App Runner IP ranges
  - Or: Allow from VPC

### Deploy to App Runner
- [ ] **Step 5:** Create App Runner service
  - AWS Console → App Runner
  - Create service
  - Source: GitHub repository
  - Repository: your-repo
  - Branch: main
  - Build settings: Auto-detect or custom

- [ ] **Step 6:** Configure build settings
  - Runtime: Node.js 18
  - Build command: `cd backend && npm install && npm run build`
  - Start command: `cd backend && npm start`
  - Port: 5000

- [ ] **Step 7:** Add environment variables
  - Add all from `backend/.env`:
    - DATABASE_URL
    - SESSION_SECRET
    - AWS_REGION
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_SES_FROM_EMAIL
    - ADMIN_EMAIL

- [ ] **Step 8:** Deploy and test
  - Click "Create & deploy"
  - Wait for deployment (5-10 min)
  - Get App Runner URL
  - Test: `https://xxx.us-east-1.awsapprunner.com/api/health`

- [ ] **Step 9:** Update CORS
  - Allow Amplify URL (will get in next phase)
  - Redeploy

---

## 📋 PHASE 8: FRONTEND DEPLOYMENT - AWS AMPLIFY

### Prepare Frontend
- [ ] **Step 1:** Update API URL
  - Create `frontend/.env.production`
  - `VITE_API_URL=https://xxx.us-east-1.awsapprunner.com`

- [ ] **Step 2:** Test production build
  - `cd frontend && npm run build`
  - `npm run preview`
  - Verify works locally

- [ ] **Step 3:** Push to GitHub
  - Commit frontend changes
  - Push to main branch

### Deploy to Amplify
- [ ] **Step 4:** Create Amplify app
  - AWS Console → Amplify
  - New app → Host web app
  - Connect GitHub

- [ ] **Step 5:** Configure build settings
  - Repository: your-repo
  - Branch: main
  - Build settings: Auto-detect
  - Or custom:
    ```yaml
    version: 1
    frontend:
      phases:
        preBuild:
          commands:
            - cd frontend && npm install
        build:
          commands:
            - npm run build
      artifacts:
        baseDirectory: frontend/dist
        files:
          - '**/*'
      cache:
        paths:
          - frontend/node_modules/**/*
    ```

- [ ] **Step 6:** Add environment variables
  - `VITE_API_URL` = App Runner URL

- [ ] **Step 7:** Deploy
  - Save and deploy
  - Wait for build (5-10 min)
  - Get Amplify URL
  - Test website

- [ ] **Step 8:** Update backend CORS
  - Add Amplify URL to CORS whitelist
  - Redeploy App Runner

- [ ] **Step 9:** Test end-to-end
  - Submit contact form
  - Verify lead saved
  - Check email sent
  - Login to admin panel
  - View lead

---

## 📋 PHASE 9: CUSTOM DOMAIN & SSL

### Domain Setup
- [ ] **Step 1:** Have domain ready
  - Own a domain or register new one
  - Can use Route 53 or external registrar

- [ ] **Step 2:** Create Route 53 hosted zone
  - AWS Console → Route 53
  - Create hosted zone
  - Domain: yourdomain.com
  - Note nameservers

- [ ] **Step 3:** Update domain registrar
  - Point nameservers to Route 53
  - Wait for propagation (2-48 hours)

### SSL Certificates
- [ ] **Step 4:** Request SSL certificates
  - AWS Console → Certificate Manager (ACM)
  - Same region as services
  - Request certificate for:
    - `yourdomain.com`
    - `*.yourdomain.com` (wildcard)
  - Validation: DNS
  - Add CNAME records to Route 53
  - Wait for validation

### Connect Domain to Amplify
- [ ] **Step 5:** Add custom domain to Amplify
  - Amplify Console → Domain management
  - Add domain: `yourdomain.com`
  - Add subdomain: `www.yourdomain.com`
  - Select SSL certificate
  - Create DNS records (auto or manual)

- [ ] **Step 6:** Update Route 53 DNS
  - Add A/AAAA records for Amplify
  - Point `yourdomain.com` → Amplify
  - Point `www.yourdomain.com` → Amplify

### Connect Domain to App Runner
- [ ] **Step 7:** Add custom domain to App Runner
  - App Runner Console → Custom domains
  - Domain: `api.yourdomain.com`
  - Select SSL certificate
  - Get validation records

- [ ] **Step 8:** Update Route 53 for API
  - Add CNAME record
  - `api.yourdomain.com` → App Runner domain

- [ ] **Step 9:** Update environment variables
  - Frontend: `VITE_API_URL=https://api.yourdomain.com`
  - Backend: Update CORS to allow `https://yourdomain.com`
  - Redeploy both

- [ ] **Step 10:** Test with custom domain
  - Visit https://yourdomain.com
  - Submit contact form
  - Login to https://yourdomain.com/admin
  - Verify SSL works

---

## 📋 PHASE 10: MONITORING & OPTIMIZATION

### Monitoring
- [ ] **Step 1:** Set up CloudWatch dashboards
  - App Runner metrics
  - RDS metrics
  - Amplify metrics

- [ ] **Step 2:** Create CloudWatch alarms
  - API error rate > 5%
  - Database CPU > 80%
  - High response time

- [ ] **Step 3:** Set up log aggregation
  - App Runner logs → CloudWatch Logs
  - Set retention period

- [ ] **Step 4:** Set up uptime monitoring
  - Route 53 health checks
  - Or external: UptimeRobot, Pingdom

### Security & Performance
- [ ] **Step 5:** Add security headers
  - Install helmet: `npm install helmet`
  - Configure in backend

- [ ] **Step 6:** Add rate limiting
  - Install: `npm install express-rate-limit`
  - Limit API requests

- [ ] **Step 7:** Optimize database
  - Add indexes to frequently queried columns
  - Enable connection pooling

- [ ] **Step 8:** Set up database backups
  - RDS automated backups (enabled by default)
  - Create snapshot schedule

- [ ] **Step 9:** Performance testing
  - Run Lighthouse audit
  - Optimize frontend bundle size
  - Enable caching

---

## 📋 PHASE 11: FINAL TESTING & LAUNCH

### Testing
- [ ] **Step 1:** End-to-end testing
  - Test all pages load
  - Test contact form
  - Test admin login
  - Test lead management
  - Test email notifications

- [ ] **Step 2:** Browser testing
  - Chrome, Firefox, Safari, Edge
  - Mobile browsers (iOS, Android)

- [ ] **Step 3:** Mobile responsiveness
  - Test all screen sizes
  - Fix layout issues

- [ ] **Step 4:** Security check
  - No exposed secrets in code
  - Authentication works
  - HTTPS everywhere
  - Rate limiting active

- [ ] **Step 5:** Performance check
  - Lighthouse score > 90
  - Load time < 3 seconds
  - No console errors

### Launch
- [ ] **Step 6:** Create launch checklist
  - All features working
  - Analytics installed (optional)
  - Domain configured
  - SSL active

- [ ] **Step 7:** Final deployment
  - Deploy latest code
  - Verify production

- [ ] **Step 8:** Monitor for 24 hours
  - Watch for errors
  - Check email deliverability
  - Monitor database performance

- [ ] **Step 9:** Announce launch
  - Share website
  - Collect feedback

---

## 📊 PROGRESS TRACKER

**Phase 1 - Setup:** ✅ 8/8 Complete
**Phase 2 - AWS & Database:** ⏳ 0/10
**Phase 3 - Contact Form:** ⏳ 0/8
**Phase 4 - Admin Auth:** ⏳ 0/9
**Phase 5 - Admin Dashboard:** ⏳ 0/9
**Phase 6 - Email:** ⏳ 0/8
**Phase 7 - Backend Deploy:** ⏳ 0/9
**Phase 8 - Frontend Deploy:** ⏳ 0/9
**Phase 9 - Domain/SSL:** ⏳ 0/10
**Phase 10 - Monitoring:** ⏳ 0/9
**Phase 11 - Launch:** ⏳ 0/9

**Total Progress:** 8/88 tasks (9%)

---

## 🎯 NEXT ACTION

**START: Phase 2, Step 1** - Verify AWS account access

Ready to begin? Let me know and I'll help you through each step!
