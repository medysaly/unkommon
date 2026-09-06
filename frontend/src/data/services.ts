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
    promise: "High-converting websites and apps, built so buyers, search engines, and AI assistants can all read them.",
  },
  {
    id: "found",
    number: "02",
    name: "Get Found",
    promise: "Rank across Google and AI search. Same discipline, two audiences, and both decide who gets shortlisted.",
  },
  {
    id: "run",
    number: "03",
    name: "Get Running",
    promise: "Answer every enquiry in seconds and turn manual workflows into automated systems, wired into the tools you already use.",
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

export const services: Service[] = [
  // ─────────────────────────── 01 · Get Built ───────────────────────────
  {
    slug: "web-development",
    pillar: "built",
    title: "Sites And Apps Built To Convert",
    subtitle: "Website & Web App Design & Development",
    shortDescription: "Lightning-fast websites and web applications built on clean code, engineered for conversion, technical search speed, and seamless API integrations.",
    heroHeadline: "Fast to use, fast to load, and readable by machines.",
    heroSubhead: "We design and build marketing sites and full web applications on clean, maintainable code. Engineered for conversion rate, Core Web Vitals, and the API integrations your business actually runs on.",
    problemLabel: "The problem",
    problem: "Most agency websites are built to look good in a design review and nothing else. The content loads in JavaScript, so AI crawlers see an empty page. There is no structured data, so nothing gets cited. Performance degrades the moment real content is added. And when you need the site to do something real, take a payment, sync to your CRM, gate a customer dashboard, the agency that built it cannot help, because they were never engineers.",
    solution: "We build the marketing layer and the application layer with the same team and the same standards. Content is server-rendered or pre-rendered so every crawler sees real HTML. Performance budgets are set during the build, not measured after. Integrations with your CRM, payment provider, booking system, or internal tools are built as proper APIs with error handling, not fragile embeds.",
    capabilities: [
      "Marketing sites and full web applications on one codebase and one stack",
      "Server-rendered or pre-rendered pages so AI crawlers see real content",
      "Core Web Vitals budget set and enforced during the build, not audited after",
      "API integrations with CRM, payments, booking, and internal systems",
      "Authentication, dashboards, and gated customer areas where you need them",
    ],
    deliverables: [
      "Custom design and front-end build, responsive and accessible",
      "Server-side rendering or static pre-rendering for every indexable route",
      "Application features: authentication, user dashboards, forms, and workflows",
      "API layer connecting the site to your CRM, payment, and booking systems",
      "Per-page titles, meta descriptions, canonical tags, and Open Graph images",
      "Schema.org markup appropriate to your business type, validated before launch",
      "Analytics with organic, AI-referral, and conversion tracking separated",
      "Hosting and deployment pipeline on AWS or Vercel, with a staging environment",
    ],
    techStack: [
      "React with Next.js, Astro, or Vite depending on the content and app model",
      "TypeScript throughout, with Tailwind CSS and a component library you own",
      "Node or Python APIs on AWS Lambda, with Postgres or DynamoDB",
      "Headless CMS (Sanity, Contentful, or Shopify for commerce)",
      "Stripe, Cal.com, HubSpot, and Salesforce integrations",
      "Automated Lighthouse, type, and schema checks in CI",
    ],
    industries: [
      "Ecommerce brands that need catalog pages search and AI can both read",
      "Professional services replacing a site that generates no enquiries",
      "SaaS and B2B companies needing a marketing site plus a product surface",
      "Businesses whose site needs to transact, not just describe",
      "Companies rebuilding after an SEO migration went wrong",
    ],
    outcome: "A site or application that loads fast, converts, integrates with your stack, and can be found by the systems people search with now.",
    faqs: [
      {
        q: "Why does server rendering matter so much?",
        a: "GPTBot, ClaudeBot, and PerplexityBot fetch raw HTML and do not execute JavaScript. Googlebot does render, so a client-side site can rank in Google and still be completely invisible inside ChatGPT. If AI referrals matter to you, the content has to exist in the HTML."
      },
      {
        q: "What counts as a web app rather than a website?",
        a: "Roughly, anything with state that belongs to a user: logins, dashboards, saved data, payments, multi-step workflows, or an admin surface your team operates. We build both, and most projects need some of each rather than one or the other."
      },
      {
        q: "Can you work with our existing site instead of rebuilding?",
        a: "Often, yes. If the platform is sound we will fix the rendering, structured data, performance, and integrations rather than sell you a rebuild you don't need. We will tell you honestly which one your situation calls for."
      },
      {
        q: "How long does a build take?",
        a: "Marketing sites usually ship in 4 to 8 weeks. Applications depend entirely on scope, and we break them into milestones so you see working software early. You get a fixed scope and a fixed price before we start."
      },
    ],
    metaTitle: "Website & Web App Design & Development | Unkommon",
    metaDescription: "Fast, conversion-focused websites and web applications on clean code. Server-rendered content, structured data, API integrations, and performance budgets.",
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
    title: "Structure Machines Can Read",
    subtitle: "Technical Architecture & Infrastructure",
    shortDescription: "Database design, schema markup, and site structure engineered so human visitors, Google, and AI crawlers all index your business data correctly.",
    heroHeadline: "Your business data is only worth what machines can read of it.",
    heroSubhead: "Database design, schema markup, and site architecture built so buyers, Googlebot, and AI crawlers all come away with an accurate picture of what you sell.",
    problemLabel: "The problem",
    problem: "Most sites store their real business information in ways nothing else can use. Product facts live in page copy rather than structured fields. Schema markup is hand-written once and drifts out of date. URL structure grew by accident. The result is a business that is genuinely good at what it does and completely illegible to the systems deciding who gets recommended.",
    solution: "We treat the machine-readable layer as a first-class part of the build. Your core business data gets a proper model, schema is generated from that data rather than maintained by hand, and site structure follows the way people and crawlers actually navigate. It stays correct as the business changes, because it is generated rather than transcribed.",
    capabilities: [
      "Data modelling for products, services, locations, and content",
      "Schema.org markup generated programmatically and validated in CI",
      "Information architecture, URL structure, and internal linking",
      "Rendering strategy so every crawler sees complete HTML",
      "Crawler access, indexation control, and log-based verification",
    ],
    deliverables: [
      "Database or content model designed around how the business actually works",
      "Schema.org implementation generated from that model, validated automatically",
      "Site architecture and URL structure with a redirect plan for anything moving",
      "Server-side rendering or pre-rendering across every indexable route",
      "robots.txt, llms.txt, sitemap generation, and canonical strategy",
      "Log-file analysis confirming which crawlers reach which pages",
      "CI checks so structured data cannot silently break on a future deploy",
    ],
    techStack: [
      "Postgres, DynamoDB, or a headless CMS as the source of truth",
      "Schema.org JSON-LD generated at build time",
      "Next.js, Astro, or a custom pre-render step for rendering",
      "AWS (Lambda, CloudFront, S3) or Vercel",
      "Automated schema and Lighthouse validation in GitHub Actions",
    ],
    industries: [
      "Ecommerce brands with large catalogs and inconsistent product data",
      "Multi-location businesses managing structure across sites",
      "Publishers and content sites with deep archives",
      "Businesses replatforming or consolidating several sites into one",
      "Any company whose product data lives only inside page copy",
    ],
    outcome: "A site whose structure and data stay accurate to search engines and AI systems as the business changes.",
    faqs: [
      {
        q: "Isn't this just SEO?",
        a: "It's the engineering half of it. An SEO consultant can tell you the schema is wrong or the canonicals are broken. This is the work of building a system where those things are generated correctly and cannot drift, which is a data and architecture problem rather than a content one."
      },
      {
        q: "Why generate schema instead of writing it?",
        a: "Hand-written schema is accurate on the day it ships and wrong within months, because prices, stock, hours, and services change and nobody updates the markup. AI systems increasingly cross-check structured data against page content, and stale markup is worse than none."
      },
      {
        q: "Can you do this without rebuilding our site?",
        a: "Usually. If the platform can render server-side and expose its data, we can add the model, the generated schema, and the architecture fixes on top. If it cannot render server-side at all, that constraint has to be addressed first, and we will say so."
      },
    ],
    metaTitle: "Technical Architecture & Infrastructure | Unkommon",
    metaDescription: "Database design, generated schema markup, and site architecture so buyers, Google, and AI crawlers all read your business data correctly.",
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
    title: "Reply Before They Move On",
    subtitle: "Speed to Lead & Instant Follow-Up",
    shortDescription: "Automated first response, qualification, and follow-up across every channel a lead can arrive on, in seconds instead of days.",
    heroHeadline: "Response time decides more deals than price does.",
    heroSubhead: "Every form, call, chat, and message gets an immediate, relevant reply, then a follow-up sequence that keeps going until the lead responds or opts out.",
    problemLabel: "The problem",
    problem: "The industry average reply time to an inbound enquiry runs to 47 hours in home services, and over 70% of customers now expect a same-day response, with more than half expecting one within the hour. Leads arrive across five different channels, land in three different inboxes, and get followed up once if at all. The lead was never bad. Nobody got to it in time.",
    solution: "We consolidate every inbound channel into one flow, fire a relevant first response within seconds, qualify against your criteria, route to the right person with context, and run a persistent multi-touch follow-up sequence. Nothing depends on someone remembering to check a form inbox.",
    capabilities: [
      "Sub-minute first response across form, call, chat, and social",
      "Automatic qualification and scoring against your criteria",
      "Routing to the right person by service, location, or value",
      "Multi-touch follow-up across email and SMS until they reply or opt out",
      "Full attribution from first touch to closed deal",
    ],
    deliverables: [
      "Unified intake across website forms, calls, chat, SMS, and social messaging",
      "Instant first-response templates written for each channel and enquiry type",
      "Qualification logic and lead scoring configured with your sales process",
      "Routing rules with escalation when nobody picks up",
      "Follow-up sequences, written by a copywriter, not generated boilerplate",
      "CRM integration so every touch is logged automatically",
      "Reporting on response time, contact rate, and conversion by source",
    ],
    techStack: [
      "Twilio and SendGrid or Resend for SMS and email",
      "n8n or AWS Step Functions for sequence orchestration",
      "HubSpot, Salesforce, Pipedrive, or Go High Level",
      "Claude via Bedrock for reply drafting and qualification",
      "Call tracking with full source attribution",
    ],
    industries: [
      "Home services competing on who calls back first",
      "Legal intake where the first responder usually signs the client",
      "Real estate handling enquiry volume across listings",
      "B2B services with long cycles and inconsistent follow-up",
      "Anyone buying leads and letting them go cold",
    ],
    outcome: "Every lead contacted within a minute and followed up until they answer, with no one having to remember.",
    faqs: [
      {
        q: "Isn't an instant automated reply obviously automated?",
        a: "Only if it is written badly. The first message is specific to what they asked about and what they need next. It is written by a copywriter for each enquiry type, not generated fresh every time and hoped for the best."
      },
      {
        q: "We already have a CRM with automation. Why do we need this?",
        a: "Most CRM automation covers email after a form fill. It does not cover a missed call, an Instagram DM, or a chat at 11pm, and it does not qualify. We connect the channels your CRM ignores and put judgment into the routing."
      },
      {
        q: "What counts as a good response time?",
        a: "Under five minutes changes contact rates materially. Under one minute is achievable when the first touch is automated. The gap between one hour and 47 hours is where most businesses are losing deals without knowing it."
      },
    ],
    metaTitle: "Speed to Lead & Automated Follow-Up | Unkommon",
    metaDescription: "Reply to every inbound lead in seconds across call, form, chat, and social. Automatic qualification, routing, and multi-touch follow-up until they respond.",
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

export const serviceListing: ServiceListing[] = [
  {
    pillar: "built",
    name: "Website & Web App Design & Development",
    blurb:
      "Lightning-fast, modern web applications built on clean code. Engineered specifically for high conversion rates, technical search speed, and seamless API integrations.",
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
      "Custom database design, schema markup, and site structure optimized so human visitors, Google bots, and AI web scrapers index your core business data perfectly.",
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
