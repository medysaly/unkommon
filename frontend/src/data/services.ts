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
  intakeExample?: {
    headline: string;
    description: string;
    inputs: { title: string; action: string; detail: string }[];
    note: string;
  };
  featuredUseCase?: {
    title: string;
    headline: string;
    description: string;
    steps: { title: string; description: string }[];
    note: string;
  };
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
    "slug": "rag-systems",
    "pillar": "built",
    "title": "AI Knowledge Search & RAG Systems",
    "subtitle": "AI Knowledge Search & RAG Systems",
    "shortDescription": "Connect your documents and business knowledge in one searchable interface, with answers linked to their sources and access shaped around your team's permissions.",
    "heroHeadline": "Your team shouldn’t have to search five places for one answer.",
    "heroSubhead": "We connect your documents and business knowledge in one searchable interface, so people can ask a question, find relevant information, and check the sources behind the answer.",
    "problemLabel": "The problem",
    "problem": "The answer is somewhere in a PDF, an internal wiki, a shared drive, or a conversation. Finding it means opening several tools, checking which version is current, and asking someone who may already have answered the same question.",
    "solution": "We connect approved information sources and build a search experience around how your team works. Retrieval-augmented generation, or RAG, finds relevant material and gives the AI that context before it answers. People can follow source references, check the original information, and see when the system does not have enough evidence to help.",
    "capabilities": [
      "Cross-platform knowledge search across approved PDFs, internal wikis, Google Drive files, and Slack conversations, subject to supported access",
      "Internal knowledge assistants for policies, procedures, product details, and project information",
      "Contract and document review support that finds clauses, compares documents with an approved playbook, and flags differences for qualified reviewers",
      "Source-linked answers so people can check the supporting documents",
      "Permission-aware retrieval, with agreed rules for hosting, retention, and keeping information current"
    ],
    "deliverables": [
      "A searchable interface connected to the agreed information sources",
      "Document ingestion, indexing, and update processes",
      "User authentication and retrieval access controls for the agreed permissions model",
      "Source references and handling for questions without sufficient evidence",
      "Evaluation with representative questions, source checks, and access-control tests",
      "Documentation covering information sources, access, retention, and maintenance"
    ],
    "techStack": [
      "Document parsing, indexing, and supported source connectors",
      "Keyword and vector search, with reranking where useful",
      "Language models grounded in retrieved information",
      "Authentication, access filtering, and retrieval evaluation"
    ],
    "industries": [
      "Teams with knowledge spread across documents and business tools",
      "Businesses answering recurring internal questions",
      "Teams reviewing documents against established company playbooks"
    ],
    "outcome": "Less searching between tools, with relevant information and the sources needed to check it in one place.",
    "faqs": [
      {
        "q": "What does RAG mean?",
        "a": "Retrieval-augmented generation means the system looks up relevant information from approved sources before generating an answer. It is a way to ground answers in your business information, not a process for retraining the model."
      },
      {
        "q": "Can it search our shared drives, Slack, and internal wiki?",
        "a": "We check the specific platforms, available APIs, file formats, and access permissions before confirming the connections. The scope also defines which sources are included and how changes and deletions reach the search system."
      },
      {
        "q": "Will everyone be able to see every document?",
        "a": "No. We design retrieval around the agreed access model, so searches and answers only use information the person is permitted to access. Source permissions must be mapped and enforced, and we test those boundaries rather than relying on instructions to the AI alone."
      },
      {
        "q": "Do citations guarantee an answer is correct?",
        "a": "No. Citations let people check the supporting material, but retrieval and generated answers can still miss context or make mistakes. We evaluate representative questions and build in a clear response when there is not enough evidence. Important decisions still need appropriate review."
      },
      {
        "q": "Can this replace legal review or a compliance audit?",
        "a": "No. It can help find clauses, compare documents with an approved company playbook, and flag differences for qualified reviewers. It does not establish legal compliance or replace professional judgment."
      },
      {
        "q": "Is the system private?",
        "a": "Hosting, model providers, data retention, and access controls are agreed for the project. We explain where information is processed and stored before choosing an approach, rather than promising that every setup has the same privacy properties."
      }
    ],
    "metaTitle": "AI Knowledge Search & RAG Systems | Unkommon",
    "metaDescription": "Search business documents and connected knowledge sources with AI, source-linked answers, permission-aware access, and document review support."
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
    "shortDescription": "Cloud infrastructure, databases, APIs, and deployment pipelines, with private AI deployment and model operations where your business needs them.",
    "heroHeadline": "The foundation your software depends on.",
    "heroSubhead": "We build the backends and cloud infrastructure your applications run on, including private AI deployment when you need more control over where models run and how information is handled.",
    "problemLabel": "The problem",
    "problem": "An application needs more than a working interface. Data, access, deployment, and monitoring all need clear ownership.",
    "solution": "We build the backend and cloud foundation around what your application needs, with documented deployment and recovery procedures.",
    "capabilities": [
      "Backend APIs and database design",
      "AWS infrastructure and access controls",
      "Deployment pipelines, monitoring, and alerts",
      "Private AI deployment in your cloud environment or on supported local hardware",
      "Model evaluation, resource monitoring, and tested updates with rollback procedures"
    ],
    "deliverables": [
      "Backend services and infrastructure configuration",
      "A deployment pipeline and monitoring",
      "Runbooks and handover documentation",
      "For private AI projects, agreed model configuration, access boundaries, evaluation checks, and operating procedures"
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
    "featuredUseCase": {
      "title": "Private AI Deployment & Model Operations",
      "headline": "More control over where your AI runs and how your data is handled.",
      "description": "We help you evaluate, deploy, and operate AI models in your own cloud environment or on supported local hardware, based on your data requirements, workload, and budget.",
      "steps": [
        {
          "title": "Private model deployment",
          "description": "Run suitable open-weight models in a controlled environment, with defined access, network boundaries, and data-handling rules. Hosting and hardware are selected around the workload."
        },
        {
          "title": "Model selection & optimization",
          "description": "Compare models on your actual tasks. Evaluate smaller models and quantization where they can reduce resource requirements without unacceptable quality loss, subject to model licensing and hardware support."
        },
        {
          "title": "Monitoring & tested updates",
          "description": "Track response quality, failures, latency, and resource usage. Test model and configuration updates before release, with a documented way to roll back changes."
        },
        {
          "title": "Operating procedures & handover",
          "description": "Document deployment, access, recovery, and maintenance responsibilities. Agree who handles updates and incidents, and any ongoing support, as part of the project scope."
        }
      ],
      "note": "Private hosting is not an automatic compliance guarantee or a promise of lower costs. We assess data handling and total operating costs, including hardware, maintenance, and engineering, before recommending a deployment approach."
    },
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
    "metaDescription": "Cloud backends, databases, APIs, and deployment pipelines, plus private AI deployment, model evaluation, monitoring, and tested updates."
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
    "featuredUseCase": {
      "title": "Automated Estimates & Proposals",
      "headline": "Less time preparing quotes. A clearer next step for customers.",
      "description": "Someone submits project details through your modern website. The system calculates a preliminary estimate using your pricing rules, prepares a proposal for review, and sends the approved version to the customer. Built around how your contracting, HVAC, roofing, or landscaping business prices its work.",
      "steps": [
        {
          "title": "Project intake & scope collection",
          "description": "Collect project details, dimensions, photos, and service requirements through your modern website, and flag missing information before preparing an estimate."
        },
        {
          "title": "Rule-based estimates",
          "description": "Calculate preliminary costs using your approved material prices, labour rates, minimum charges, and service area. AI can help interpret the request, but the numbers come from your pricing rules."
        },
        {
          "title": "Branded proposals & approval",
          "description": "Prepare a formatted proposal for your team to review, with assumptions, exclusions, and any details that need an inspection."
        },
        {
          "title": "Delivery & follow-up",
          "description": "Send approved proposals or secure proposal links by email, SMS, or WhatsApp, subject to consent and platform setup, and record the next step in your CRM."
        }
      ],
      "note": "An example of what we can build, not a claim of past client results. Preliminary estimates are not final quotes. Some jobs need a site visit or technical assessment before a price can be confirmed. Messaging delivery times and won jobs are not guaranteed."
    },
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
    "intakeExample": {
      "headline": "Different inputs. One clear way forward.",
      "description": "Bring incoming documents, emails, and requests into a workflow that extracts the useful information and sends it where it needs to go.",
      "inputs": [
        { "title": "Invoice", "action": "Extract details", "detail": "Pick out supplier details, line items, and totals, with checks for missing or uncertain information." },
        { "title": "Customer email", "action": "Identify the request", "detail": "Identify what the customer needs and prepare the request for the right team." },
        { "title": "Contract", "action": "Route for review", "detail": "Send the document and relevant details to the appropriate reviewer, without treating automated processing as legal approval." },
        { "title": "Form submission", "action": "Update the right system", "detail": "Validate the submitted details and send approved information to the connected business tool." }
      ],
      "note": "Illustrative workflow, not a live document upload. Information sources, validation, review steps, and system access are agreed for each project."
    },
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
      "Approved customer actions through controlled APIs, with identity checks and confirmations",
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
    "featuredUseCase": {
      "title": "Customer Support That Takes Action",
      "headline": "Help customers get things done, not just find the FAQ.",
      "description": "We connect AI assistants to your business systems so customers can check an order, request a return, manage a subscription, or reschedule an appointment, within the permissions and rules you define.",
      "steps": [
        {
          "title": "Connected customer actions",
          "description": "Let customers complete approved tasks through chat or voice, with identity checks, clear confirmations, and approval steps where needed. Actions use narrowly permitted APIs, not unrestricted access to your database."
        },
        {
          "title": "A useful handoff to your team",
          "description": "Pass along the conversation, relevant account details the receiving team is allowed to see, actions already attempted, and what still needs resolving, so customers do not have to start again."
        },
        {
          "title": "Clear limits & action records",
          "description": "Define what the assistant can change, what requires approval, and what must go to a person. Keep a record of actions and their outcomes, and confirm success only when the connected system reports it."
        },
        {
          "title": "A clear route to a person",
          "description": "Customers can ask for human help directly. Repeated failures, unsupported requests, and sensitive cases also trigger escalation. If nobody is available, create a follow-up request through the agreed support system instead of promising a live transfer."
        }
      ],
      "note": "An example of what we can build, not a claim of past client results. Available actions depend on your systems, access permissions, and policies. Reading an order status and issuing a refund need different controls. Human availability and correct sentiment detection are not guaranteed."
    },
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
      },
      {
        "q": "Can it change orders, subscriptions, or appointments?",
        "a": "Where your systems support the action and you explicitly permit it. We scope identity checks, allowed changes, customer confirmations, and staff approvals around each task. Sensitive actions do not get the same permissions as reading a status, and the assistant should not report a change as complete unless the connected system confirms it."
      },
      {
        "q": "Does it wait until a customer sounds frustrated to offer a person?",
        "a": "No. Customers can ask directly, and repeated failures, unsupported requests, or sensitive cases can also trigger a handoff. Sentiment can be an additional signal, not the only route to help. When no one is available, the agreed fallback can capture a follow-up request without promising an immediate response."
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
