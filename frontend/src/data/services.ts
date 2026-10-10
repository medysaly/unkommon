export type PillarId = "built" | "found" | "run";

export interface Pillar {
  id: PillarId;
  number: string;
  name: string;
  promise: string;
}

export const pillars: Pillar[] = [
  {
    id: "built",
    number: "01",
    name: "Get Built",
    promise: "Websites, apps, and digital tools built around what your business actually needs to do.",
  },
  {
    id: "run",
    number: "02",
    name: "Get Running",
    promise: "Connected systems and automation that take repetitive work off your team's plate.",
  },
];

export interface Service {
  slug: string;
  pillar: PillarId;
  title: string;
  subtitle: string;
  shortDescription: string;
  heroHeadline: string;
  heroSubhead: string;
  problem: string;
  problemLabel: string;
  solution: string;
  capabilities: string[];
  deliverables: string[];
  techStack: string[];
  industries: string[];
  outcome: string;
  faqs: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
}

const allServices: Service[] = [
  // ─────────────────────────── 01 · Get Built ───────────────────────────
  {
    slug: "web-development",
    pillar: "built",
    title: "Websites And Apps That Do The Work",
    subtitle: "Website & Web App Design & Development",
    shortDescription: "Websites and web applications built to answer questions, guide people to the next step, and connect to the systems behind your business.",
    heroHeadline: "A website should do more than look good.",
    heroSubhead: "It should answer questions, guide people to the right next step, and connect to the way your business actually runs. We build websites and apps that do the work.",
    problemLabel: "The problem",
    problem: "Most websites are polished brochures. Someone visits, has a question, cannot find what they need, and leaves a message for your team to handle later. The site looks finished. The work starts after they leave it.",
    solution: "We build the front end and the work behind it together. Forms go somewhere useful. Bookings reach the calendar. Customer information reaches the right system. If someone needs an account, a quote, a payment, or a next step, it is built into the experience.",
    capabilities: [
      "Websites and web applications built for real use",
      "Customer portals, dashboards, and account areas",
      "Booking, payments, forms, and CRM connections",
      "Internal tools that remove manual steps",
      "Responsive design that works on every screen",
    ],
    deliverables: [
      "A clear customer journey, from the first question to the next step",
      "A responsive front end built in code you own",
      "The integrations your business needs to function",
      "Authentication, data, and workflows where needed",
      "A staging environment and launch plan",
      "Handover documentation for your team or the next one",
    ],
    techStack: [
      "React with Next.js, Astro, or Vite depending on what the product needs",
      "TypeScript throughout, with Tailwind CSS and a component library you own",
      "Node or Python APIs on AWS Lambda, with Postgres or DynamoDB",
      "Headless CMS (Sanity, Contentful, or Shopify for commerce)",
      "Stripe, Cal.com, HubSpot, and Salesforce integrations",
      "Automated testing and type checks in CI",
    ],
    industries: [
      "Ecommerce businesses connecting a catalog, payments, and fulfilment",
      "Professional services giving customers a clearer way to get started",
      "SaaS and B2B companies building a product surface alongside their public site",
      "Businesses whose site needs to transact, not just describe",
      "Teams replacing a site that no longer fits the way they work",
    ],
    outcome: "A website or application that earns its place in the business.",
    faqs: [
      {
        q: "Why does performance matter?",
        a: "Because people notice when a site is slow, awkward, or unreliable. We keep the build lean, test it on real screen sizes, and make sure the important actions work before anything goes live."
      },
      {
        q: "What counts as a web app rather than a website?",
        a: "Roughly, anything with state that belongs to a user: logins, dashboards, saved data, payments, multi-step workflows, or an admin surface your team operates. We build both, and most projects need some of each rather than one or the other."
      },
      {
        q: "Can you work with our existing site instead of rebuilding?",
        a: "Often, yes. If the foundation is sound, we can improve the experience, add integrations, or build the missing parts without starting over. If a rebuild is the cleaner option, we will tell you why."
      },
      {
        q: "How long does a build take?",
        a: "A straightforward website normally ships in 4 to 8 weeks. Applications depend on scope, and we break larger work into milestones so you can see working software early. You get a fixed scope and a fixed price before we start."
      },
    ],
    metaTitle: "Website & Web App Design & Development | Unkommon",
    metaDescription: "Websites and web applications that answer questions, guide people to the next step, and connect to the systems behind your business.",
  },
  {
    slug: "mobile-app-development",
    pillar: "built",
    title: "Apps People Keep Using",
    subtitle: "Mobile Application Development",
    shortDescription: "Scalable native and cross-platform iOS and Android apps designed around user retention, intuitive UI/UX, and long-term performance.",
    heroHeadline: "Shipping the app is the easy part. Keeping people in it isn't.",
    heroSubhead: "Native and cross-platform iOS and Android applications built around retention, not just feature lists. Designed to stay fast and maintainable long after launch.",
    problemLabel: "The problem",
    problem: "Most small business apps are built once, shipped, and then quietly abandoned. They are slow on mid-range Android devices, they break on the next OS release, onboarding loses most users in the first session, and nobody is measuring why. The build cost was visible; the cost of an app nobody opens is not.",
    solution: "We build cross-platform apps where that is the right economics, and native where performance or platform APIs demand it. Onboarding, notifications, and the first-session experience are designed deliberately, because that is where retention is won or lost. Analytics and crash reporting are wired in before launch so you find out what is happening rather than guessing.",
    capabilities: [
      "Cross-platform iOS and Android from one codebase, or native where it's warranted",
      "Onboarding and first-session flows designed around activation",
      "Offline support, push notifications, and deep linking",
      "Backend and API integration with your existing systems",
      "App Store and Play Store submission, review handling, and release management",
    ],
    deliverables: [
      "UI/UX design covering the full flow, not just headline screens",
      "iOS and Android application builds, submitted and shipped to both stores",
      "Backend APIs and authentication, or integration with what you already run",
      "Push notifications, deep links, and offline behaviour where the app needs them",
      "Analytics and crash reporting instrumented before launch",
      "CI pipeline for builds and releases, plus a TestFlight or internal testing track",
      "Handover documentation so a future team can pick the codebase up",
    ],
    techStack: [
      "React Native or Expo for cross-platform builds",
      "Swift and Kotlin where native performance or platform APIs are required",
      "TypeScript across app and API code",
      "Node or Python APIs on AWS, with Postgres or DynamoDB",
      "Firebase or OneSignal for push, Sentry for crash reporting",
      "Fastlane and GitHub Actions for build and release automation",
    ],
    industries: [
      "Service businesses giving customers booking and account access",
      "Ecommerce brands building a repeat-purchase channel",
      "Clinics and practices handling appointments and patient communication",
      "Field teams needing an operational tool that works offline",
      "Companies with a working web product that now need a mobile surface",
    ],
    outcome: "An app that ships to both stores, holds up on real devices, and that people open again after the first week.",
    faqs: [
      {
        q: "Cross-platform or native?",
        a: "Cross-platform for most business applications: one codebase, roughly half the build and maintenance cost, and performance that is indistinguishable for the great majority of apps. Native when you need heavy graphics, deep hardware access, or platform features the moment they ship. We will tell you which one your app actually needs rather than defaulting."
      },
      {
        q: "Do we need an app at all?",
        a: "Often not. If your users would open it once a month, a fast mobile web experience serves them better and costs far less. Apps earn their place through frequency, notifications, offline use, or hardware access. We would rather say so up front than build you something that gets deleted."
      },
      {
        q: "What happens after launch?",
        a: "Apps need maintenance in a way websites do not. iOS and Android ship breaking changes annually, and store requirements shift. We offer a maintenance retainer covering OS updates, store compliance, and bug fixes, or we hand over a documented codebase if you have a team."
      },
    ],
    metaTitle: "Mobile App Development, iOS & Android | Unkommon",
    metaDescription: "Native and cross-platform iOS and Android apps built around retention, intuitive UI/UX, and long-term performance. Shipped to both stores with analytics wired in.",
  },
  {
    slug: "technical-architecture",
    pillar: "built",
    title: "The Systems Behind The System",
    subtitle: "Technical Architecture & Infrastructure",
    shortDescription: "The data, integrations, and infrastructure that keep your digital tools dependable as the business changes.",
    heroHeadline: "The part customers do not see. The part everything depends on.",
    heroSubhead: "Behind every useful website, app, or automation is a system that keeps the data moving, the tools connected, and the team out of the weeds.",
    problemLabel: "The problem",
    problem: "Most businesses add tools one at a time. The website lives in one place, customer information in another, and the process connecting them lives in somebody's head. It works until the volume grows, a person leaves, or one small change breaks three other things.",
    solution: "We map the systems you rely on, decide what should be the source of truth, and build the connections around it. The result is a foundation that makes new features, new automations, and everyday work easier to add and maintain.",
    capabilities: [
      "Data models built around the way the business actually works",
      "Clear ownership for customer, order, and operational information",
      "Reliable connections between the tools you already use",
      "Application architecture that can grow without being rebuilt",
      "Monitoring and documentation so the system stays understandable",
    ],
    deliverables: [
      "A system map showing where information starts, moves, and ends up",
      "A data model that gives the right information one clear home",
      "Integration architecture for the tools that need to work together",
      "A practical plan for replacing fragile handoffs and one-off fixes",
      "Monitoring and alerts for the parts that cannot fail silently",
      "Documentation your team can use after the build is done",
    ],
    techStack: [
      "Postgres, DynamoDB, or a headless CMS as the source of truth",
      "Next.js, Astro, or Vite for the right application model",
      "AWS (Lambda, CloudFront, S3) or Vercel",
      "GitHub Actions for testing and deployment",
    ],
    industries: [
      "Ecommerce businesses with product, order, and inventory data in different places",
      "Multi-location businesses coordinating work across several teams or tools",
      "Service businesses ready to replace manual handoffs with a real system",
      "Companies consolidating several disconnected tools into one foundation",
      "Teams that have outgrown the spreadsheet or inbox holding everything together",
    ],
    outcome: "A foundation that makes the work behind the scenes simpler, steadier, and easier to change.",
    faqs: [
      {
        q: "Is this only for large companies?",
        a: "No. The need shows up when the work starts depending on people remembering how systems fit together. A smaller business can benefit just as much from a clear foundation if it removes a daily source of friction."
      },
      {
        q: "Can you work with the tools we already use?",
        a: "Usually. We start by understanding what is already working, then connect, improve, or replace only what needs attention. The goal is not to make you start over for the sake of it."
      },
      {
        q: "What does infrastructure mean in practice?",
        a: "It means the reliable parts behind the screen: where data lives, how systems talk to each other, how changes are deployed, and how you know when something needs attention."
      },
    ],
    metaTitle: "Technical Architecture & Infrastructure | Unkommon",
    metaDescription: "The data, integrations, and infrastructure that keep your digital tools dependable as the business changes.",
  },

  // ─────────────────────────── 02 · Get Found ───────────────────────────
  {
    slug: "ai-search-optimization",
    pillar: "found",
    title: "Get Cited By The AI People Ask",
    subtitle: "AI Search Optimization (GEO & AEO)",
    shortDescription: "Get your business recommended inside ChatGPT, Google AI Overviews, and Perplexity, and get a report that shows whether it's working.",
    heroHeadline: "Your next customer is asking ChatGPT, not Google.",
    heroSubhead: "We structure your content and your data so AI assistants can find, understand, and cite your business. Then we track your visibility against a fixed set of buyer questions so you can see it moving.",
    problemLabel: "The problem",
    problem: "Roughly 60% of Google searches now end without a click, and AI Overviews appear on close to half of all queries. Buyers form their shortlist inside ChatGPT or Perplexity before they ever fill in a form. If the assistant does not mention you, you are not in the consideration set, and no amount of traditional ranking fixes that. Most businesses have no idea whether they are being cited at all.",
    solution: "AI assistants cite sources they can parse, verify, and attribute. We restructure your content into passages that answer real buyer questions directly, implement the structured data that makes your facts machine-readable, open the right crawler access, and build the entity signals that connect your brand across the web. Then we monitor a fixed prompt set across the major assistants and report what changed.",
    capabilities: [
      "Prompt-set design around the questions your buyers actually ask",
      "Content restructured into citable, extractable passages",
      "Structured data and entity markup so your facts are machine-readable",
      "Crawler access audit for GPTBot, ClaudeBot, PerplexityBot, and Googlebot",
      "Visibility tracking across ChatGPT, AI Overviews, Perplexity, and Copilot",
    ],
    deliverables: [
      "Baseline AI visibility audit: where you are cited today and where competitors are",
      "A tracked prompt set of buyer questions, agreed with you and monitored monthly",
      "Content rewrites and new pages structured for passage-level citation",
      "Schema.org implementation covering organization, services or products, and FAQs",
      "robots.txt and llms.txt configured for the AI crawlers you want",
      "Entity and citation building so your brand resolves consistently across the web",
      "Monthly report showing citation rate, share of voice, and what moved",
    ],
    techStack: [
      "Citation tracking across ChatGPT, Perplexity, Gemini, and Copilot",
      "Schema.org JSON-LD, validated in CI",
      "Server-side rendering or pre-rendering for crawler access",
      "Log analysis to confirm which AI crawlers actually reach you",
      "GA4 with AI referral traffic segmented from organic",
    ],
    industries: [
      "Ecommerce brands competing for product recommendations",
      "Professional services buyers research before making contact",
      "B2B companies whose shortlist is formed before the first call",
      "Local businesses being compared by AI assistants",
      "Any business whose competitors are already being named and they aren't",
    ],
    outcome: "Be the business the AI names when someone asks for a recommendation in your category.",
    faqs: [
      {
        q: "Is this different from SEO, or just a new name for it?",
        a: "It shares foundations with SEO and builds on top of them, but the target is different. SEO optimizes for ranked links a person clicks. AI search optimization targets being quoted inside a synthesized answer. The content structure, the schema depth, and the measurement are all different. You want both, which is why we do both."
      },
      {
        q: "How do you prove it's working?",
        a: "We agree a fixed set of buyer questions up front and track them monthly across the major assistants. You see citation rate and share of voice against named competitors. It is not a guess, but it is also not a guarantee of a specific position, because no one controls what an AI says."
      },
      {
        q: "Is AI traffic actually worth anything?",
        a: "In March 2026 AI referral traffic to US retail converted 42% better than non-AI traffic, having converted 38% worse a year earlier. Buyers arrive having already compared options. The volume is still smaller than organic, so treat this as additive to search, not a replacement for it."
      },
    ],
    metaTitle: "AI Search Optimization, GEO & AEO | Unkommon",
    metaDescription: "Get cited by ChatGPT, Google AI Overviews, and Perplexity. Prompt-set tracking, structured data, crawler access, and monthly AI visibility reporting.",
  },
  {
    slug: "seo",
    pillar: "found",
    title: "Rank For What Actually Sells",
    subtitle: "Search Engine Optimization",
    shortDescription: "Technical, content, and ecommerce SEO aimed at the terms that produce revenue rather than the ones that produce traffic reports.",
    heroHeadline: "Traffic is not the goal. Revenue is.",
    heroSubhead: "Technical fixes, content built around buying intent, and the structured data that makes your pages eligible for rich results. Reported against enquiries and sales, not impressions.",
    problemLabel: "The problem",
    problem: "Most SEO retainers optimize for the metric that is easiest to show on a slide. Rankings go up on terms nobody buys from. Traffic climbs while enquiries stay flat. Meanwhile the genuinely expensive problems, a site that crawlers can't render, canonical tags pointing at the wrong page, a product catalog with no structured data, go untouched because they need an engineer and the SEO vendor doesn't have one.",
    solution: "We start with the technical layer, because content on a broken foundation is wasted money. Rendering, indexation, canonicals, site architecture, Core Web Vitals, and structured data get fixed first. Then we build content against terms with commercial intent, and report on enquiries and revenue rather than sessions.",
    capabilities: [
      "Technical audit covering rendering, indexation, canonicals, and crawl budget",
      "Keyword and intent research focused on commercial terms",
      "Content built to rank and to be cited, not padded to a word count",
      "Product and category page optimization at catalog scale",
      "Core Web Vitals work with real code changes, not plugin settings",
    ],
    deliverables: [
      "Full technical audit with issues ranked by revenue impact, not severity score",
      "Fixes implemented in the codebase by us, not handed over as a ticket list",
      "Keyword and intent map tied to your services or product categories",
      "On-page optimization across titles, headings, internal links, and copy",
      "Structured data implementation validated against Google's requirements",
      "Content calendar and production, written by a human who understands the sector",
      "Monthly reporting on rankings, organic revenue, and assisted conversions",
    ],
    techStack: [
      "Google Search Console, GA4, and Looker Studio reporting",
      "Screaming Frog and log-file analysis for crawl behaviour",
      "Schema.org JSON-LD generated programmatically for large catalogs",
      "Core Web Vitals via CrUX field data, not lab scores alone",
      "Shopify, WooCommerce, WordPress, or custom stacks",
    ],
    industries: [
      "Ecommerce brands with large catalogs and thin product pages",
      "Professional services competing on high-value local terms",
      "B2B companies with long research cycles",
      "Businesses recovering from a traffic drop after a migration",
      "Anyone whose current SEO vendor cannot make code changes",
    ],
    outcome: "Rankings on the terms that produce enquiries, on a site technically capable of holding them.",
    faqs: [
      {
        q: "How is this different from every other SEO agency?",
        a: "Most SEO agencies hand you a list of technical fixes and wait for your developer to implement them. We implement them, because we build software. That collapses the slowest part of most SEO engagements, and it means nothing gets recommended that cannot actually be shipped."
      },
      {
        q: "How long before we see results?",
        a: "Technical fixes can move things within weeks. Content and authority work realistically takes three to six months to compound. Anyone promising page one in thirty days is either lying or targeting terms nobody searches."
      },
      {
        q: "Do we need SEO if we're doing AI search optimization?",
        a: "Yes. Organic search still drives roughly two-thirds of product discovery, and AI assistants draw heavily on the same signals that make you rank. AI visibility is built on SEO foundations, not instead of them."
      },
    ],
    metaTitle: "SEO Services | Technical, Content & Ecommerce | Unkommon",
    metaDescription: "Technical SEO, content built on buying intent, and structured data at catalog scale. Fixes implemented in your codebase, reported against revenue.",
  },
  {
    slug: "local-seo",
    pillar: "found",
    title: "Own Your Map And Your Reviews",
    subtitle: "Local SEO & Google Business Profile",
    shortDescription: "Google Business Profile optimization, review generation, local citations, and location pages that rank in the map pack.",
    heroHeadline: "Most local searches never reach your website.",
    heroSubhead: "They end at the map pack, the profile, and the reviews. We make sure that's where you win, and increasingly, that AI assistants recommend you when someone asks for a local option.",
    problemLabel: "The problem",
    problem: "For a business with a location or a service area, the Google Business Profile does more selling than the website. Most are half-filled, use inconsistent business details across the web, have unanswered reviews, and no location pages worth ranking. At the same time, consumers using AI assistants to find and vet local providers went from 6% to 45% in early 2026, and those assistants favour businesses with consistent, verifiable, well-structured information.",
    solution: "We take the profile from partially complete to fully optimized, fix the name, address, and phone inconsistencies scattered across directories, build a review generation loop that runs without you remembering to ask, and create location or service-area pages with the local schema that both Google and AI assistants read.",
    capabilities: [
      "Google Business Profile audit, optimization, and ongoing posting",
      "NAP consistency cleanup across directories and citation sources",
      "Review generation loop plus response drafting",
      "Location and service-area pages with LocalBusiness schema",
      "Local rank tracking by geographic grid, not a single average position",
    ],
    deliverables: [
      "Profile fully built out: categories, services, attributes, hours, photos, Q&A",
      "Citation audit and cleanup across the directories that actually matter",
      "Automated review request flow tied to your booking or invoicing system",
      "Review response drafting, in your voice, with a turnaround you set",
      "Location pages with LocalBusiness and Service schema, one per real location",
      "Geo-grid rank tracking showing where you rank across your service radius",
      "Monthly reporting on calls, direction requests, and profile conversions",
    ],
    techStack: [
      "Google Business Profile and the Places API",
      "Geo-grid rank tracking across your service area",
      "LocalBusiness, Service, and Review schema in JSON-LD",
      "Review platform integrations (Google, Yelp, industry-specific sites)",
      "Call tracking with source attribution",
    ],
    industries: [
      "Home services and trades competing in a service radius",
      "Dental, medical, and veterinary practices",
      "Legal firms competing on city-level terms",
      "Retail and showroom businesses, including jewelry",
      "Multi-location businesses managing consistency at scale",
    ],
    outcome: "Show up in the map pack, the reviews, and the AI recommendation, for every area you actually serve.",
    faqs: [
      {
        q: "We already have a Google Business Profile. Isn't that enough?",
        a: "Having one is table stakes. Ranking in the map pack depends on category selection, service and attribute completeness, review velocity and recency, citation consistency, and proximity. Most profiles we audit are using a fraction of the available fields."
      },
      {
        q: "Can you get us more reviews without breaking Google's rules?",
        a: "Yes. We automate the ask at the right moment in your customer journey and make it one tap. We do not incentivize, gate, or filter reviews. That gets profiles suspended and it is not worth the risk."
      },
      {
        q: "Does local SEO matter if AI is answering the question?",
        a: "It matters more. AI assistants lean heavily on structured, consistent, verifiable local data. A clean profile, consistent details, and real reviews are exactly the signals they use to decide who to recommend."
      },
    ],
    metaTitle: "Local SEO & Google Business Profile | Unkommon",
    metaDescription: "Google Business Profile optimization, review generation, citation cleanup, and location pages with local schema. Geo-grid rank tracking across your service area.",
  },

  // ─────────────────────────── 03 · Get Running (response) ───────────────────────────
  {
    slug: "ai-receptionist",
    pillar: "run",
    title: "Answer Every Call, 24/7",
    subtitle: "AI Receptionist & Voice Agents",
    shortDescription: "AI voice and chat agents that answer the phone, qualify the caller, and book the appointment on your real calendar.",
    heroHeadline: "The call you miss is the customer your competitor gets.",
    heroSubhead: "An AI receptionist that answers on the first ring, at any hour, knows your business, qualifies the caller, and books straight into your calendar. Escalates to a human when it should.",
    problemLabel: "The problem",
    problem: "Around 27% of calls to home services businesses go unanswered, and 78% of homeowners hire whoever responds first. The same pattern holds in clinics, legal intake, and retail: the enquiry arrives after hours or during a busy stretch, goes to voicemail, and is gone. Hiring a receptionist costs roughly $36,000 a year and still does not cover nights or weekends.",
    solution: "We build a voice and chat agent grounded in your actual business information, connected to your calendar and CRM, deployed on the phone number you already use. It answers immediately, handles the common questions accurately, qualifies against criteria you set, books real appointments with conflict checking, and hands off to a person with full context when the situation calls for it.",
    capabilities: [
      "Natural phone answering with no hold time, at any hour",
      "Web chat, SMS, and WhatsApp on the same knowledge base",
      "Real bookings on your live calendar with conflict detection",
      "Caller qualification against criteria you define",
      "Human escalation with full transcript and context handoff",
    ],
    deliverables: [
      "Voice agent deployed on your existing business number",
      "Knowledge base built from your site, documents, and an intake session",
      "Calendar integration (Google Calendar, Cal.com, or your practice system)",
      "CRM integration so every call becomes a record, not a note",
      "Call qualification and routing rules configured with you",
      "After-hours and overflow handling with warm transfer paths",
      "Dashboard with call recordings, transcripts, outcomes, and booking rate",
    ],
    techStack: [
      "Vapi, Twilio, ElevenLabs, and Deepgram for voice",
      "Claude via AWS Bedrock for reasoning and response",
      "Google Calendar and Cal.com booking APIs",
      "HubSpot, Salesforce, Pipedrive, or your existing CRM",
      "DynamoDB for conversation state, CloudWatch for monitoring",
    ],
    industries: [
      "Home services and trades losing calls during jobs",
      "Dental, medical, and veterinary practices with busy front desks",
      "Legal firms where intake speed decides the case",
      "Ecommerce brands handling order and product questions",
      "Any business where the phone rings after closing time",
    ],
    outcome: "Every call answered, every enquiry qualified, and appointments on the calendar while you sleep.",
    faqs: [
      {
        q: "Will callers know it's AI?",
        a: "Yes, and it says so. Trying to pass an agent off as human backfires the moment someone notices. In practice callers strongly prefer a helpful assistant at 9pm to a voicemail returned three days later."
      },
      {
        q: "What happens on a call it can't handle?",
        a: "You define the escalation rules. It can warm-transfer to a person, take a detailed message with a callback commitment, or route by urgency. The handoff carries the full transcript so your team never asks the caller to repeat themselves."
      },
      {
        q: "How much does it cost compared to hiring?",
        a: "Reported deployments run around 62% below the cost of a full-time receptionist, and cover hours a single hire never could. We quote a fixed setup fee plus a monthly licence, and you will know both before you commit."
      },
    ],
    metaTitle: "AI Receptionist & Voice Agents | Unkommon",
    metaDescription: "AI voice agents that answer every call 24/7, qualify callers, and book real appointments on your calendar. Escalates to a human with full context.",
  },
  {
    slug: "speed-to-lead",
    pillar: "run",
    title: "Every Enquiry Gets A Next Step",
    subtitle: "Lead Response & Follow-Up",
    shortDescription: "A dependable system for responding to new enquiries, sending the next step, and keeping every handoff from falling through the cracks.",
    heroHeadline: "When someone reaches out, the next step should not depend on who sees it first.",
    heroSubhead: "Every form, call, chat, and message gets a timely reply, the right context, and a clear route to the person or system that should handle it.",
    problemLabel: "The problem",
    problem: "New enquiries arrive everywhere. A form is waiting in an inbox, a missed call sits in voicemail, a message lands in the wrong app, and someone needs to remember what happened next. The process breaks because it depends on a person seeing the right thing at the right time.",
    solution: "We bring every inbound channel into one dependable flow. Each enquiry gets acknowledged, routed with context, and followed up in a way that fits the business. Nothing depends on someone remembering to check a form inbox.",
    capabilities: [
      "Timely acknowledgement across form, call, chat, and social",
      "Intake questions and routing based on criteria you set",
      "The right context sent to the right person or system",
      "Follow-up across email and SMS until the enquiry is resolved or opts out",
      "A clear record of what happened and what needs to happen next",
    ],
    deliverables: [
      "Unified intake across website forms, calls, chat, SMS, and social messaging",
      "Response templates for each channel and enquiry type",
      "Intake and routing logic configured around your actual process",
      "Routing rules with escalation when nobody picks up",
      "Follow-up sequences that give people a clear next step",
      "CRM integration so every touch is logged automatically",
      "Reporting on response time, handoffs, and unresolved enquiries",
    ],
    techStack: [
      "Twilio and SendGrid or Resend for SMS and email",
      "n8n or AWS Step Functions for sequence orchestration",
      "HubSpot, Salesforce, Pipedrive, or Go High Level",
      "Claude via Bedrock for reply drafting and qualification",
      "Call tracking and conversation history",
    ],
    industries: [
      "Home services coordinating enquiries while teams are out in the field",
      "Legal teams managing intake across calls, forms, and follow-ups",
      "Real estate teams handling enquiries across listings and agents",
      "B2B services with long cycles and inconsistent handoffs",
      "Any business where new enquiries are too easy to lose track of",
    ],
    outcome: "Every enquiry gets acknowledged, tracked, and moved to the right next step without someone having to remember.",
    faqs: [
      {
        q: "Will an automated reply feel impersonal?",
        a: "Not when it gives someone useful information and a clear next step. We write each response around the actual question, not a generic acknowledgement that sends people back to wait."
      },
      {
        q: "We already have a CRM with automation. Why do we need this?",
        a: "Most CRM automation covers email after a form fill. It often misses a voicemail, a direct message, or a chat after hours. We connect the channels your CRM does not see and put useful context into the routing."
      },
      {
        q: "What happens when someone needs a person?",
        a: "You define the handoff rules. The system can send the right person a summary, create a task, schedule a callback, or escalate based on urgency. The next step is clear before anyone opens an inbox."
      },
    ],
    metaTitle: "Lead Response & Follow-Up | Unkommon",
    metaDescription: "A dependable system for responding to new enquiries, sending the next step, and keeping every handoff from falling through the cracks.",
  },

  // ─────────────────────────── 03 · Get Running (operations) ───────────────────────────
  {
    slug: "workflow-automation",
    pillar: "run",
    title: "Stop Paying People To Copy And Paste",
    subtitle: "Workflow & Back-Office Automation",
    shortDescription: "Automation for the repetitive work behind the business: data entry, document processing, catalog updates, reporting, and system sync.",
    heroHeadline: "The work nobody should be doing by hand.",
    heroSubhead: "We automate the repetitive middle of your operation, the copying between systems, the document processing, the reporting nobody has time to run, and connect the tools that were never designed to talk to each other.",
    problemLabel: "The problem",
    problem: "Every business accumulates work that exists only because two systems don't talk. Someone re-keys orders into the accounting system. Someone updates 400 product descriptions by hand. Someone builds the same report every Monday. It is invisible on the P&L because it is spread across salaries, and it is the first thing that breaks when you get busy.",
    solution: "We map where the hours actually go, then build automation for the parts that are genuinely rule-based and use AI only where judgment is required. Integrations between your existing tools, document and intake processing, content generation at catalog scale, and scheduled reporting. Built to run in production with monitoring and error handling, not as a demo that breaks in week three.",
    capabilities: [
      "System-to-system integration for tools with no native connection",
      "Document, invoice, and intake processing with human review where needed",
      "Bulk content and catalog generation in your brand voice",
      "Scheduled reporting assembled from multiple sources",
      "Monitoring and alerting so failures surface before customers notice",
    ],
    deliverables: [
      "Workflow audit identifying where the hours go and what is worth automating",
      "Custom integrations between your CRM, accounting, inventory, and support tools",
      "Document processing pipelines with extraction, validation, and exception handling",
      "Bulk generation workflows for product copy, descriptions, or listings",
      "Automated reporting delivered to email, Slack, or a dashboard",
      "Error handling, retries, and alerting on every workflow",
      "Documentation and handover so you are not dependent on us to make changes",
    ],
    techStack: [
      "n8n and AWS Step Functions for orchestration",
      "Python on AWS Lambda for custom logic",
      "Claude via Bedrock for extraction, classification, and generation",
      "Shopify, QuickBooks, HubSpot, Airtable, and Google Workspace APIs",
      "CloudWatch monitoring with alerting on failure",
    ],
    industries: [
      "Ecommerce brands maintaining large catalogs manually",
      "Legal firms processing records, intake, and document review",
      "Clinics handling insurance verification and patient paperwork",
      "Professional services with manual reporting and reconciliation",
      "Any business where growth means hiring for admin work",
    ],
    outcome: "Reclaim the hours currently going into work that a system should be doing.",
    faqs: [
      {
        q: "How is this different from us buying Zapier?",
        a: "Zapier is excellent for simple triggers between supported apps. It struggles with conditional logic, systems without connectors, high volume, error recovery, and anything needing judgment. We use off-the-shelf tools where they fit and write code where they don't."
      },
      {
        q: "What if the automation makes a mistake?",
        a: "Every workflow has validation, exception paths, and human review on anything consequential. We do not automate irreversible actions without a checkpoint. You will see errors surface as alerts rather than discovering them in a customer complaint."
      },
      {
        q: "How do you decide what's worth automating?",
        a: "We start with hours multiplied by frequency multiplied by error rate. Some manual work should stay manual because the volume never justifies the build. We will tell you when that is the case rather than sell you a project."
      },
    ],
    metaTitle: "Workflow & Back-Office Automation | Unkommon",
    metaDescription: "Automate data entry, document processing, catalog updates, and reporting. Custom integrations between the tools you already use, built to run in production.",
  },
  {
    slug: "ai-infrastructure",
    pillar: "run",
    title: "Get It Into Production And Keep It There",
    subtitle: "AI Infrastructure & Integration",
    shortDescription: "Deployment, monitoring, cost control, and integration for AI systems that need to run reliably rather than demo well.",
    heroHeadline: "The pilot worked. That was never the hard part.",
    heroSubhead: "Around 88% of AI pilots never reach production. We build the infrastructure, monitoring, and cost controls that decide whether yours does, whether we built the system or someone else did.",
    problemLabel: "The problem",
    problem: "MIT's research found 95% of generative AI pilots delivered no measurable impact, and Gartner expects around half of projects to be abandoned. The models are rarely the reason. It is integration with systems that were never designed for it, output quality that drifts at volume, no monitoring, unpredictable cost, and no clear owner. Of the companies that did make it work, 61% credited rebuilding the process rather than buying better technology.",
    solution: "We treat AI systems like any other production workload. Proper deployment on AWS, infrastructure as code, CI/CD, observability, cost controls, and integration with the systems the business already runs on. Where the process itself is the blocker, we say so and redesign it, because more infrastructure will not fix a workflow that was broken before AI touched it.",
    capabilities: [
      "Production deployment on AWS with infrastructure as code",
      "Monitoring for latency, error rate, output quality, and cost",
      "Cost controls: caching, batching, model routing, and rate limiting",
      "Integration with the systems your business actually runs on",
      "Security review covering data handling, access, and audit logging",
    ],
    deliverables: [
      "Infrastructure as code (AWS CDK, SAM, or Terraform) you own outright",
      "CI/CD pipeline for application and prompt or model deployment",
      "CloudWatch dashboards covering latency, errors, quality, and spend",
      "Alerting on service failures, quality regressions, and cost anomalies",
      "Cost optimization report with specific, quantified recommendations",
      "Runbooks for deployment, rollback, and incident response",
      "Security review with encryption, IAM least privilege, and audit logging",
    ],
    techStack: [
      "AWS Lambda, ECS, API Gateway, and Bedrock",
      "AWS CDK, SAM, or Terraform for infrastructure as code",
      "GitHub Actions or CodePipeline for CI/CD",
      "CloudWatch, with WAF, IAM, and Secrets Manager for security",
      "Evaluation harnesses for ongoing output quality monitoring",
    ],
    industries: [
      "Companies with a stalled AI pilot that needs a second opinion",
      "Regulated businesses with data residency and audit requirements",
      "Teams running AI in production without monitoring or cost visibility",
      "Businesses inheriting a system from a vendor who has moved on",
      "Anyone whose AI costs spiked without an explanation",
    ],
    outcome: "AI that runs reliably, costs what you expected, and someone is accountable for.",
    faqs: [
      {
        q: "Will you work on a system you didn't build?",
        a: "Yes, and it is a large part of what we do. Inherited systems usually need a cost and reliability audit first. We will tell you honestly whether it is worth stabilizing or worth replacing."
      },
      {
        q: "We have a DevOps team already. What do you add?",
        a: "AI workloads have operational patterns most DevOps teams have not hit yet: expensive non-deterministic inference, prompt and model versioning, output quality regression, and cost that scales with usage in unfamiliar ways. We work alongside your team on that layer rather than replacing them."
      },
      {
        q: "How much can we realistically cut our AI costs?",
        a: "It depends entirely on the starting point. Common wins are prompt caching, routing simple requests to smaller models, and batching. We quantify the specific opportunity in the audit rather than quoting a percentage before we have looked."
      },
    ],
    metaTitle: "AI Infrastructure & Integration on AWS | Unkommon",
    metaDescription: "Get AI systems into production and keep them there. AWS deployment, infrastructure as code, monitoring, cost control, and integration. Including systems you didn't build.",
  },
];

/** Services currently offered by Unkommon. Historical search-marketing entries remain private. */
export const services = allServices.filter((service) => service.pillar !== "found");

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getServicesByPillar(pillar: PillarId): Service[] {
  return services.filter(s => s.pillar === pillar);
}


/**
 * What the Services page lists. Broader than `services` above, because not
 * every offering has a detail page yet - entries without `href` render as
 * plain text until one exists.
 */
export interface ServiceListing {
  pillar: PillarId;
  name: string;
  blurb: string;
  href?: string;
}

const allServiceListing: ServiceListing[] = [
  {
    pillar: "built",
    name: "Website & Web App Design & Development",
    blurb:
      "Custom websites and web applications that answer questions, guide people to the next step, and connect to the systems behind your business.",
    href: "/services/web-development",
  },
  {
    pillar: "built",
    name: "Mobile Application Development",
    blurb:
      "Scalable native and cross-platform iOS/Android apps designed around user retention, intuitive UI/UX, and long-term performance.",
    href: "/services/mobile-app-development",
  },
  {
    pillar: "built",
    name: "Technical Architecture & Infrastructure",
    blurb:
      "The data, integrations, and infrastructure that keep your digital tools dependable as the business changes.",
    href: "/services/technical-architecture",
  },
  {
    pillar: "found",
    name: "AI Search Optimization (GEO & AEO)",
    blurb:
      "Strategic Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) to ensure your brand is recommended, cited, and summarized on ChatGPT, Perplexity, and Google AI Overviews.",
    href: "/services/ai-search-optimization",
  },
  {
    pillar: "found",
    name: "Search Engine Optimization (SEO)",
    blurb:
      "Full-funnel technical, programmatic, and content SEO designed to capture high-intent search traffic and systematically scale your organic revenue.",
    href: "/services/seo",
  },
  {
    pillar: "found",
    name: "Local SEO & Google Business Profile",
    blurb:
      "Dominant map-pack positioning, local search optimization, and geo-targeted strategy that captures immediate local customer demand.",
    href: "/services/local-seo",
  },
  {
    pillar: "run",
    name: "AI Receptionist & Voice Agents",
    blurb:
      "Human-like AI voice and chat receptionists trained on your internal data to answer inbound calls, triage customer questions, and handle bookings 24/7.",
    href: "/services/ai-receptionist",
  },
  {
    pillar: "run",
    name: "Speed to Lead & Instant Follow-Up",
    blurb:
      "Automated lead-capture sequences that engage new prospects in seconds across SMS, email, or chat, turning cold inquiries into booked appointments instantly.",
    href: "/services/speed-to-lead",
  },
  {
    pillar: "run",
    name: "Workflow & Back-Office Automation",
    blurb:
      "Custom end-to-end automations (Zapier, Make, API pipelines) that handle client onboarding, contract routing, invoicing, and busywork automatically.",
    href: "/services/workflow-automation",
  },
  {
    pillar: "run",
    name: "AI Infrastructure & Integration",
    blurb:
      "Custom LLM deployments, fine-tuned AI workflows, and seamless integrations directly into your existing CRM and software stack.",
    href: "/services/ai-infrastructure",
  },
];

/** Public overview entries, aligned with the active service catalogue. */
export const serviceListing = allServiceListing.filter((service) => service.pillar !== "found");
