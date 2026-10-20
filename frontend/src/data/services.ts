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
    name: "AI & Software Development",
    promise: "Modern websites, applications, and AI-powered tools built around your business.",
  },
  {
    id: "run",
    number: "02",
    name: "AI & Business Automation",
    promise: "AI assistants, connected systems, and automated workflows that take repetitive work off your team’s plate.",
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
    "title": "Custom Modern Websites & Web Applications",
    "subtitle": "Custom Modern Websites & Web Applications",
    "shortDescription": "Modern websites that help customers get answers, book appointments, make payments, and get in touch, with the tools behind it all connected.",
    "heroHeadline": "Your modern website should work for your business.",
    "heroSubhead": "Customers arrive with a question or something they need to do. We build modern websites that help them find an answer, book a time, make a payment, or speak to your team. AI chat and voice support can be built into the same system.",
    "problemLabel": "The problem",
    "problem": "A customer wants to know what you offer, whether you can help, and how to get started. If they have to search through pages, fill in a form, and wait for a reply, your team ends up doing the work the modern website could have helped with.",
    "solution": "We build the modern website and the steps behind it together. Booking reaches your calendar. Forms reach the right person. Payments reach your business systems. When AI is useful, the chatbot draws on your approved information and connects customers to the next step.",
    "capabilities": [
      "Modern websites that explain your services and make the next step clear",
      "Booking, payments, forms, and customer accounts",
      "AI chat grounded in your business information, where useful",
      "Connections to your calendar, CRM, and other business tools",
      "An experience that works on phones, tablets, and desktops"
    ],
    "deliverables": [
      "A modern website or web application in code you own",
      "The agreed booking, payment, form, and account features",
      "Business system connections tested through the customer journey",
      "AI information sources and human handoff rules when included",
      "Launch support and documentation for your team"
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
    "outcome": "Customers can do more on your modern website, and your team has less to pick up afterwards.",
    "faqs": [
      {
        "q": "Can you improve our existing modern website?",
        "a": "Yes, when the foundation supports what you need. We can add useful features and connect your tools without rebuilding everything. If starting again makes more sense, we will explain why."
      },
      {
        "q": "Does every modern website need AI?",
        "a": "No. Clear information, good forms, and a reliable booking flow may be enough. AI is useful when customers need help finding an answer or completing a task, and we scope it around that job."
      },
      {
        "q": "Can the chatbot book appointments?",
        "a": "It can when it is connected to your scheduling system and configured for your booking rules. We agree what it can do, test the important steps, and give customers a way to reach your team."
      }
    ],
    "metaTitle": "Custom Modern Websites & Web Applications | Unkommon",
    "metaDescription": "Modern websites that help customers get answers, book appointments, pay, and get in touch, connected to your calendar, CRM, and business tools."
  },
  {
    "slug": "ai-powered-applications",
    "pillar": "built",
    "title": "AI-Powered Applications",
    "subtitle": "AI-Powered Applications",
    "shortDescription": "Apps that help customers book, check updates, and manage their account, or help your team find answers and work with documents using AI.",
    "heroHeadline": "Give people a useful reason to open your app.",
    "heroSubhead": "Book a service. Check an update. Find an answer. We build web and mobile applications around the things customers and teams need to do, with AI built into the parts where it helps.",
    "problemLabel": "The problem",
    "problem": "A customer should not need to call your team to check a request or book their next appointment. Your team should not need to search several folders or copy a document into a separate AI tool just to get an answer.",
    "solution": "We bring those tasks into an app that fits the business. Customers can book, manage their account, and see useful updates. Teams can search approved information, work with documents, or draft content for review. The app connects to the systems that already hold the information.",
    "capabilities": [
      "Customer booking, account access, and request updates",
      "Web and mobile experiences shaped around how people use them",
      "AI search across approved documents and business information",
      "Document analysis and useful content generation",
      "Notifications and reminders where they serve a clear purpose"
    ],
    "deliverables": [
      "An application built around the agreed customer or team tasks",
      "Connections to the data and business tools it needs",
      "AI features with source references and review where appropriate",
      "Access controls and testing for the important user journeys",
      "Deployment and handover documentation"
    ],
    "techStack": [
      "Language model APIs",
      "Document retrieval and search",
      "Application APIs and evaluation tooling"
    ],
    "industries": [
      "Service businesses giving customers booking and account access",
      "Teams that work with documents and internal business information",
      "Businesses adding useful AI features to an existing product"
    ],
    "outcome": "An app people can use to get something done, with fewer calls, searches, and handoffs along the way.",
    "faqs": [
      {
        "q": "Do we need a mobile app or a web app?",
        "a": "That depends on how often people use it and what they need to do. A modern website or web app may be the right starting point. A mobile app can make sense for regular use, notifications, or device features."
      },
      {
        "q": "Can you add AI to an app we already have?",
        "a": "Often, yes. We first look at the existing app, the information it can access, and the task AI would help with. Then we scope the feature and the connections it needs."
      },
      {
        "q": "Does AI need to be part of every feature?",
        "a": "No. Booking, account access, and notifications can use normal application logic. We use AI where interpreting information, finding an answer, or generating a draft is useful."
      }
    ],
    "metaTitle": "AI-Powered Applications | Unkommon",
    "metaDescription": "Web and mobile apps for booking, account access, and updates, with AI for finding answers, working with documents, and helping people complete tasks."
  },
  {
    "slug": "internal-tools-customer-portals",
    "pillar": "built",
    "title": "Internal Tools & Customer Portals",
    "subtitle": "Internal Tools & Customer Portals",
    "shortDescription": "Give customers one place to see updates, share documents, and make requests. Give your team one place to manage what happens next.",
    "heroHeadline": "Give the work a better home.",
    "heroSubhead": "Your customers can check what is happening without sending another email. Your team can see the work, review a request, and move it forward in the same place.",
    "problemLabel": "The problem",
    "problem": "A customer asks for an update. Someone checks a spreadsheet, searches an inbox, and sends a reply. The same information gets passed around again because there is no clear place for either side to see it.",
    "solution": "We build portals and internal tools around the work you already do. Customers get the access they need to documents, requests, and updates. Your team gets the views, permissions, and approval steps needed to keep things moving.",
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
    "outcome": "Customers know where to go, and your team knows what needs attention.",
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
    "metaDescription": "Customer portals for documents, requests, and updates, and internal tools that give your team a clear place to review and manage the work."
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
    "title": "AI Agents & Agentic Workflows",
    "subtitle": "AI Agents & Agentic Workflows",
    "shortDescription": "AI agents that gather information, use your business tools, and move tasks forward, with checkpoints for your team to review or approve.",
    "heroHeadline": "Some work needs more than a trigger and an action.",
    "heroSubhead": "We build AI agents that gather information, use your business tools, and move tasks forward, with checkpoints where your team needs to review or approve.",
    "problemLabel": "The problem",
    "problem": "An enquiry needs research before anyone can respond. An invoice needs checking against other records. A request passes through several tools before someone can approve it. Your team ends up gathering the information and moving each step along by hand.",
    "solution": "We map the work, connect the tools, and define what an agent is allowed to do. Predictable steps use rules. AI handles the parts that need interpretation. Specialized agents can share the work when that helps, with validation, approval checkpoints, and a clear route to a person when something needs attention.",
    "capabilities": [
      "Inbound enquiry research and qualification using approved sources, with CRM summaries and draft responses for review",
      "Invoice processing and reconciliation against purchase orders and transaction records, with discrepancies flagged for review",
      "Multi-step operations connecting research, document processing, system updates, and approvals",
      "Specialized agents working together where the task benefits from them",
      "Error recovery and human handoffs through validation, retries, and alerts"
    ],
    "deliverables": [
      "A working agent or workflow connected to the agreed tools and information sources",
      "Documented permissions, allowed actions, and approval checkpoints",
      "Validation, bounded retries, failure alerts, and recovery steps",
      "Testing with representative tasks and failure scenarios",
      "Process documentation and handover for your team"
    ],
    "techStack": [
      "Agent orchestration frameworks such as LangGraph or CrewAI, where appropriate",
      "Workflow tools such as n8n or Make, where appropriate",
      "Business software APIs",
      "Custom code where the process needs it"
    ],
    "industries": [
      "Teams researching incoming enquiries or processing invoices",
      "Businesses coordinating processes across several tools"
    ],
    "outcome": "Less time gathering information and moving tasks between tools, with your team in control of the decisions that need them.",
    "faqs": [
      {
        "q": "What is an agentic workflow?",
        "a": "It is a process where an AI agent can interpret information, choose from allowed actions, and use connected tools to move a task forward. We define its permissions, checks, and approval points around the work it needs to do."
      },
      {
        "q": "Does every workflow need multiple agents?",
        "a": "No. A standard automation or a single agent may be enough. We use multiple agents when separating the work makes the process easier to manage, test, or review, not simply to add complexity."
      },
      {
        "q": "Can an agent approve payments or send messages on its own?",
        "a": "Only within explicitly agreed permissions. Invoice discrepancies, payments, and customer communications can be held for human review. We define what can run automatically and what needs approval before building."
      },
      {
        "q": "Will the workflow fix itself if something breaks?",
        "a": "We build in validation, retries, and alerts to handle recoverable failures. Unexpected changes to an API or data format may still need someone to investigate and update the connection. We do not promise autonomous repairs."
      },
      {
        "q": "Can you work with our existing systems?",
        "a": "We check your tools, access permissions, information sources, and available APIs before confirming the scope. Research uses approved sources and permitted access, rather than assuming every platform can be scraped."
      }
    ],
    "metaTitle": "AI Agents & Agentic Workflows | Unkommon",
    "metaDescription": "AI agents for enquiry research, invoice reconciliation, and multi-step operations, connected to your business tools with human review and error recovery."
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
    "shortDescription": "Voice agents answer calls and help with bookings. Chatbots find answers in your services, documents, and FAQs, then bring in your team when needed.",
    "heroHeadline": "A helpful answer, even after hours.",
    "heroSubhead": "Someone calls or opens the chat with a question about your business. Your AI assistant can find the relevant information, collect the details, and help them book or take the next step, with a clear route to your team.",
    "problemLabel": "The problem",
    "problem": "Questions arrive while your team is busy, out on a job, or finished for the day. A customer needs to know if you offer a service, when they can book, or what happens next. Leaving a message should not be their only option.",
    "solution": "We connect voice agents to your phone and chatbots to your modern website or application. They retrieve answers from your approved business information and use connected tools for tasks such as checking availability or booking. You decide what they can handle and when a person should take over.",
    "capabilities": [
      "Voice agents for phone questions, intake, and booking",
      "Chatbots grounded in your services, pricing information, documents, and FAQs",
      "Retrieval-augmented generation (RAG) to find relevant information before answering",
      "Calendar and CRM connections for the agreed tasks",
      "Human handoffs with the conversation and useful details"
    ],
    "deliverables": [
      "A voice agent or chatbot set up for your agreed channels",
      "Approved information sources and a document retrieval setup",
      "The calendar, CRM, or business tool connections it needs",
      "Clear limits, fallback answers, and handoff rules",
      "Testing examples, monitoring, and handover documentation"
    ],
    "techStack": [
      "Voice and messaging platforms",
      "Language models with document retrieval and search",
      "Calendar, CRM, and business software APIs"
    ],
    "industries": [
      "Businesses handling customer enquiries and bookings",
      "Teams providing internal information and task support"
    ],
    "outcome": "Customers have a way to get help when your team is unavailable, and your team gets the context when they need to step in.",
    "faqs": [
      {
        "q": "How does the chatbot know about our business?",
        "a": "We connect it to approved information such as your services, documents, FAQs, and pricing details. It retrieves the relevant information before answering. This is called retrieval-augmented generation, or RAG. It is different from retraining a model on your data."
      },
      {
        "q": "What happens when it does not know the answer?",
        "a": "It should say so, ask a useful follow-up, or hand the conversation to your team. We define those paths and test them. Connecting it to your information improves the context, but does not make AI error-free."
      },
      {
        "q": "Can a voice agent book appointments?",
        "a": "Yes, when the scheduling system and booking rules support it. The agent checks availability, collects the required details, and confirms the booking through the connected system. Those actions are scoped and tested before launch."
      },
      {
        "q": "Will customers know they are speaking to AI?",
        "a": "The assistant should be clear about what it is. We design the conversation around being helpful and make it clear how someone can reach a person."
      }
    ],
    "metaTitle": "AI Assistants & Voice Agents | Unkommon",
    "metaDescription": "AI voice agents for calls and bookings, and RAG chatbots that answer from your business information, with calendar, CRM, and human handoff connections."
  },
  {
    "slug": "crm-system-integrations",
    "pillar": "run",
    "title": "CRM & Business System Integrations",
    "subtitle": "CRM & Business System Integrations",
    "shortDescription": "A form reaches your CRM. A booking reaches your calendar. An update reaches the right person. We connect the tools behind each step.",
    "heroHeadline": "One business. Tools that work together.",
    "heroSubhead": "Your form, inbox, calendar, CRM, and payment tools should share the information they need. We build the connections, so your team does not have to keep moving the same details by hand.",
    "problemLabel": "The problem",
    "problem": "Someone fills in a form. The details sit in an inbox until a person copies them into the CRM. A booking changes, but the customer record does not. Your team spends time checking and correcting information that already exists somewhere else.",
    "solution": "We map where the information starts, where it belongs, and what should happen next. Then we connect the tools you already use. A new enquiry can create a CRM record, a booking can update a calendar, and an approved change can notify the right person.",
    "capabilities": [
      "Forms, email, calendars, and CRM working together",
      "Customer and operational data shared between agreed systems",
      "Booking and payment events connected to the next task",
      "Clear rules for updates, duplicates, and conflicting information",
      "Monitoring and alerts when a connection needs attention"
    ],
    "deliverables": [
      "Working connections between the agreed business tools",
      "Documented rules for which information moves and when",
      "Validation, retries, and alerts for failed updates",
      "End-to-end testing with representative records",
      "Documentation for your team and the next person maintaining it"
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
    "outcome": "Information reaches the right place without your team entering it again.",
    "faqs": [
      {
        "q": "Can you connect the tools we already use?",
        "a": "Usually, if they provide an API, connector, or another supported way to exchange information. We check the tools, access, and specific workflow before confirming what can be connected."
      },
      {
        "q": "Do we have to replace our CRM?",
        "a": "Not if it can do the job. We start with what you already use and build around it where possible. If a tool is the thing holding the process back, we will explain the options."
      },
      {
        "q": "What if an update does not go through?",
        "a": "We build in checks, retries, and alerts so failed updates can be seen and handled. The exact recovery steps depend on the systems and the work involved."
      }
    ],
    "metaTitle": "CRM & Business System Integrations | Unkommon",
    "metaDescription": "Connect forms, email, calendars, CRM, and payment tools so customer details, bookings, and updates reach the right place without repeated data entry."
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
