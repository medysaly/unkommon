export type PillarId = "built" | "run";

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
    name: "Build Your Software",
    promise: "Websites, applications, and business tools built around how your business works.",
  },
  {
    id: "run",
    number: "02",
    name: "Automate Your Operations",
    promise: "Connect your systems, process information, and reduce repetitive work, with AI where it makes sense.",
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
  {
    "slug": "web-development",
    "pillar": "built",
    "title": "Custom Websites & Web Applications",
    "subtitle": "Custom Websites & Web Applications",
    "shortDescription": "Business websites and custom web applications, from customer-facing experiences to full-featured platforms.",
    "heroHeadline": "Software built around your business.",
    "heroSubhead": "Business websites and custom web applications, from customer-facing experiences to full-featured platforms.",
    "problemLabel": "The problem",
    "problem": "A website or application becomes harder to use when it no longer fits the way your customers or team work.",
    "solution": "We design and build the experience around the tasks people need to complete, then connect it to the data and tools behind the business.",
    "capabilities": [
      "Business websites and custom web applications",
      "Booking, payments, forms, and account areas",
      "Responsive interfaces and connections to your existing systems"
    ],
    "deliverables": [
      "A working website or application in code you own",
      "Tested customer journeys and a launch plan",
      "Documentation and handover for your team"
    ],
    "techStack": [
      "React and TypeScript",
      "APIs, databases, and content management systems",
      "Automated checks and deployment pipelines"
    ],
    "industries": [
      "Businesses building a new customer experience",
      "Teams replacing a site or platform they have outgrown"
    ],
    "outcome": "A website or application that supports the way your business works.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "Custom Websites & Web Applications | Unkommon",
    "metaDescription": "Business websites and custom web applications, from customer-facing experiences to full-featured platforms."
  },
  {
    "slug": "ai-powered-applications",
    "pillar": "built",
    "title": "AI-Powered Applications",
    "subtitle": "AI-Powered Applications",
    "shortDescription": "Custom applications that help users search information, analyze documents, and generate useful content.",
    "heroHeadline": "Put AI to work inside your product.",
    "heroSubhead": "Custom applications that help users search information, analyze documents, and generate useful content.",
    "problemLabel": "The problem",
    "problem": "Moving information between separate AI tools and business software creates more steps for the people doing the work.",
    "solution": "We build AI features into the application where people need them, using the information they are allowed to access and clear checks on the results.",
    "capabilities": [
      "Search across business information with source references",
      "Document analysis and structured information extraction",
      "Content generation with review before use"
    ],
    "deliverables": [
      "An application with the agreed AI features",
      "Connections to approved information sources",
      "Evaluation examples, access controls, and handover documentation"
    ],
    "techStack": [
      "Language model APIs",
      "Document retrieval and search",
      "Application APIs and evaluation tooling"
    ],
    "industries": [
      "Teams working with large collections of information",
      "Businesses adding useful AI features to a product"
    ],
    "outcome": "AI features people can use as part of their everyday work.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "AI-Powered Applications | Unkommon",
    "metaDescription": "Custom applications that help users search information, analyze documents, and generate useful content."
  },
  {
    "slug": "internal-tools-customer-portals",
    "pillar": "built",
    "title": "Internal Tools & Customer Portals",
    "subtitle": "Internal Tools & Customer Portals",
    "shortDescription": "Dashboards, approval tools, and secure portals that bring your team’s work and customer interactions together.",
    "heroHeadline": "Give the work a better home.",
    "heroSubhead": "Dashboards, approval tools, and secure portals that bring your team’s work and customer interactions together.",
    "problemLabel": "The problem",
    "problem": "Spreadsheets, inboxes, and disconnected tools make it difficult to see what is happening or what needs attention next.",
    "solution": "We build dashboards, approval tools, and portals around your process, with appropriate access for staff and customers.",
    "capabilities": [
      "Operational dashboards and task queues",
      "Approval flows and internal business tools",
      "Customer accounts, shared documents, and status updates"
    ],
    "deliverables": [
      "A working tool or portal connected to your systems",
      "User roles and access controls",
      "Documentation and a handover for your team"
    ],
    "techStack": [
      "React and TypeScript",
      "Authentication and role-based access",
      "APIs and business databases"
    ],
    "industries": [
      "Teams coordinating work across departments",
      "Service businesses sharing information with customers"
    ],
    "outcome": "A clear place to manage work and keep customers informed.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "Internal Tools & Customer Portals | Unkommon",
    "metaDescription": "Dashboards, approval tools, and secure portals that bring your team’s work and customer interactions together."
  },
  {
    "slug": "technical-architecture",
    "pillar": "built",
    "title": "Cloud Infrastructure & Backends",
    "subtitle": "Cloud Infrastructure & Backends",
    "shortDescription": "AWS infrastructure, databases, APIs, and deployment pipelines that support your applications.",
    "heroHeadline": "The foundation your software depends on.",
    "heroSubhead": "AWS infrastructure, databases, APIs, and deployment pipelines that support your applications.",
    "problemLabel": "The problem",
    "problem": "An application needs more than a working interface. Data, access, deployment, and monitoring all need clear ownership.",
    "solution": "We build the backend and cloud foundation around what your application needs, with documented deployment and recovery procedures.",
    "capabilities": [
      "Backend APIs and database design",
      "AWS infrastructure and access controls",
      "Deployment pipelines, monitoring, and alerts"
    ],
    "deliverables": [
      "Backend services and infrastructure configuration",
      "A deployment pipeline and monitoring",
      "Runbooks and handover documentation"
    ],
    "techStack": [
      "AWS infrastructure",
      "Relational or document databases",
      "APIs and continuous delivery tooling"
    ],
    "industries": [
      "Businesses launching a new application",
      "Teams improving an existing backend"
    ],
    "outcome": "A dependable foundation for running and maintaining your software.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "Cloud Infrastructure & Backends | Unkommon",
    "metaDescription": "AWS infrastructure, databases, APIs, and deployment pipelines that support your applications."
  },
  {
    "slug": "workflow-automation",
    "pillar": "run",
    "title": "Business Workflow Automation",
    "subtitle": "Business Workflow Automation",
    "shortDescription": "Automate repetitive tasks, approvals, notifications, and handoffs between teams and tools.",
    "heroHeadline": "Keep the work moving.",
    "heroSubhead": "Automate repetitive tasks, approvals, notifications, and handoffs between teams and tools.",
    "problemLabel": "The problem",
    "problem": "Routine work stalls when it relies on someone remembering to copy information, send a notification, or chase an approval.",
    "solution": "We map your process and automate the steps that can run reliably, with review and exception handling where people need to stay involved.",
    "capabilities": [
      "Task routing and approval flows",
      "Notifications and handoffs between teams",
      "Scheduled and event-triggered business processes"
    ],
    "deliverables": [
      "Working automations connected to your tools",
      "Error handling, retries, and alerts",
      "Process documentation and handover"
    ],
    "techStack": [
      "Workflow orchestration tools",
      "Business software APIs",
      "Custom code where the process needs it"
    ],
    "industries": [
      "Teams managing recurring administrative work",
      "Businesses coordinating processes across several tools"
    ],
    "outcome": "Fewer repetitive steps and clearer handoffs.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "Business Workflow Automation | Unkommon",
    "metaDescription": "Automate repetitive tasks, approvals, notifications, and handoffs between teams and tools."
  },
  {
    "slug": "document-email-automation",
    "pillar": "run",
    "title": "Document & Email Automation",
    "subtitle": "Document & Email Automation",
    "shortDescription": "Extract information, categorize incoming requests, and route documents and emails for review or processing.",
    "heroHeadline": "Turn incoming information into the next step.",
    "heroSubhead": "Extract information, categorize incoming requests, and route documents and emails for review or processing.",
    "problemLabel": "The problem",
    "problem": "Reading every incoming email or document, entering its details, and forwarding it to the right person takes time and makes requests easy to miss.",
    "solution": "We connect incoming documents and emails to a processing flow that extracts useful information, sorts requests, and routes uncertain cases for review.",
    "capabilities": [
      "Document and email information extraction",
      "Request classification and routing",
      "Human review for missing or uncertain information"
    ],
    "deliverables": [
      "A processing workflow for agreed document and email types",
      "Validation and review queues",
      "Connections to the systems that receive the results"
    ],
    "techStack": [
      "Email and document APIs",
      "Text extraction and language models where useful",
      "Workflow tooling and business system integrations"
    ],
    "industries": [
      "Teams handling intake documents and shared inboxes",
      "Businesses processing recurring forms or requests"
    ],
    "outcome": "Incoming information reaches the right place with less manual sorting.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "Document & Email Automation | Unkommon",
    "metaDescription": "Extract information, categorize incoming requests, and route documents and emails for review or processing."
  },
  {
    "slug": "ai-receptionist",
    "pillar": "run",
    "title": "AI Assistants & Voice Agents",
    "subtitle": "AI Assistants & Voice Agents",
    "shortDescription": "Assistants that answer questions, collect information, and help customers or employees complete specific tasks.",
    "heroHeadline": "Help people get to the next step.",
    "heroSubhead": "Assistants that answer questions, collect information, and help customers or employees complete specific tasks.",
    "problemLabel": "The problem",
    "problem": "Customers and employees often need an answer or a small task completed while the person who can help is unavailable.",
    "solution": "We build assistants around defined tasks and approved business information, with connections to the tools they need and a clear handoff to your team.",
    "capabilities": [
      "Voice and chat assistants for defined business tasks",
      "Information collection, question answering, and scheduling",
      "Human handoffs with useful context"
    ],
    "deliverables": [
      "An assistant configured for agreed tasks and channels",
      "Connections to approved information and business tools",
      "Handoff rules, testing examples, and monitoring"
    ],
    "techStack": [
      "Voice and messaging platforms",
      "Language models and retrieval",
      "Calendar, CRM, and business software APIs"
    ],
    "industries": [
      "Businesses handling customer enquiries and bookings",
      "Teams providing internal information and task support"
    ],
    "outcome": "Useful assistance with a clear path to a person when needed.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "AI Assistants & Voice Agents | Unkommon",
    "metaDescription": "Assistants that answer questions, collect information, and help customers or employees complete specific tasks."
  },
  {
    "slug": "crm-system-integrations",
    "pillar": "run",
    "title": "CRM & Business System Integrations",
    "subtitle": "CRM & Business System Integrations",
    "shortDescription": "Connect your CRM, forms, email, calendars, and other business software so information moves between them.",
    "heroHeadline": "Make your business tools work together.",
    "heroSubhead": "Connect your CRM, forms, email, calendars, and other business software so information moves between them.",
    "problemLabel": "The problem",
    "problem": "When tools do not share information, people become the connection, copying updates and checking which version is current.",
    "solution": "We define where each piece of information belongs and build the connections that move it between your existing business systems.",
    "capabilities": [
      "CRM, forms, email, and calendar connections",
      "Data synchronization and field mapping",
      "API integrations with monitoring and error handling"
    ],
    "deliverables": [
      "Working integrations between agreed systems",
      "Documented data mappings and sync rules",
      "Alerts and a plan for resolving failed updates"
    ],
    "techStack": [
      "CRM and business software APIs",
      "Webhooks and scheduled synchronization",
      "Integration tooling and custom services"
    ],
    "industries": [
      "Businesses using several disconnected tools",
      "Teams spending time re-entering customer or operational data"
    ],
    "outcome": "Information moves between systems without repeated manual entry.",
    "faqs": [
      {
        "q": "Can you work with our existing systems?",
        "a": "We start by understanding what you already use and what needs to change. The scope covers the tools, data, and connections required for the agreed work."
      },
      {
        "q": "How do we get started?",
        "a": "Bring us the process or product you want to improve. We will work through the requirements with you and agree the scope before building."
      }
    ],
    "metaTitle": "CRM & Business System Integrations | Unkommon",
    "metaDescription": "Connect your CRM, forms, email, calendars, and other business software so information moves between them."
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByPillar(pillar: PillarId): Service[] {
  return services.filter((service) => service.pillar === pillar);
}

export interface ServiceListing {
  pillar: PillarId;
  name: string;
  blurb: string;
  href: string;
}

/** Use the same catalogue for cards, overview pages, and detail pages. */
export const serviceListing: ServiceListing[] = services.map((service) => ({
  pillar: service.pillar,
  name: service.subtitle,
  blurb: service.shortDescription,
  href: `/services/${service.slug}`,
}));
