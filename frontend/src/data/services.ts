export interface Service {
  slug: string;
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
    slug: "rag-systems",
    title: "AI That Knows Your Business",
    subtitle: "Custom RAG Systems",
    shortDescription: "Retrieval-augmented generation pipelines over your proprietary data. Answers are sourced, cited, and traceable back to your documents.",
    heroHeadline: "AI that actually knows your business.",
    heroSubhead: "Custom RAG systems that turn your documents into a searchable, conversational knowledge base. Every answer cited. Every source traceable.",
    problemLabel: "The problem",
    problem: "Your team spends hours digging through PDFs, wikis, CRMs, and ticketing systems looking for answers that already exist somewhere in your data. Off-the-shelf chatbots give generic answers and confidently hallucinate. Your customers wait. Your team burns out.",
    solution: "We build production RAG (retrieval-augmented generation) systems that ingest your documents — PDFs, web pages, databases, Notion, Confluence — into a custom vector database. When a question comes in, the system retrieves the most relevant passages and generates an answer grounded in your actual content, with source citations on every response.",
    capabilities: [
      "Plain-language search across all your documents",
      "Every answer cited back to its source passage",
      "Hybrid search (vector + keyword) with reranking for accuracy",
      "Deployed as chat interface, API, or embedded in your existing tools",
      "Continuous ingestion so new documents are searchable within minutes",
    ],
    deliverables: [
      "Ingestion pipeline for PDFs, Word docs, web pages, databases, and knowledge management tools",
      "Vector database with embeddings tuned for your domain (Pinecone, pgvector, ChromaDB, or FAISS)",
      "Hybrid search with reranking and chunking strategy optimized for your content",
      "Chat UI, REST API, or embedded widget — your choice",
      "Citation tracking with passage-level source attribution",
      "Monitoring dashboard with query logs and accuracy metrics",
    ],
    techStack: [
      "Python + LangChain",
      "Vector databases (Pinecone, pgvector, ChromaDB, FAISS)",
      "Claude or GPT-4 for generation",
      "AWS Lambda + API Gateway or ECS for hosting",
      "OpenAI or Cohere embeddings",
      "CloudWatch monitoring",
    ],
    industries: [
      "Legal firms — case law, precedents, internal memos",
      "Healthcare — clinical protocols, patient records (HIPAA-aware architecture)",
      "Financial services — compliance docs, product guides",
      "Technical support — product documentation, runbooks",
      "Research organizations — papers, reports, internal studies",
    ],
    outcome: "Stop paying employees to dig through documents. Your team and customers get instant, accurate, cited answers from your data.",
    faqs: [
      {
        q: "How is this different from uploading documents to ChatGPT?",
        a: "ChatGPT's file upload has tiny context limits, no persistence, no citation tracking, and sends your data to OpenAI. We build a private RAG system on your infrastructure that scales to millions of documents, remembers everything, and cites sources."
      },
      {
        q: "What if our data is sensitive?",
        a: "The entire system runs on your AWS account or private infrastructure. Your documents never leave your control. We support HIPAA-aware architectures on HIPAA-eligible AWS services with BAA-ready deployments."
      },
      {
        q: "How long does a RAG system take to build?",
        a: "Most projects ship in 4-6 weeks depending on data volume, document formats, and integrations. You'll get a fixed scope and timeline after the free 30-minute call."
      },
    ],
    metaTitle: "Custom RAG Systems | Unkommon — AI That Knows Your Business",
    metaDescription: "Production RAG systems with cited, sourced answers from your documents. Vector databases, hybrid search, and reranking for enterprise accuracy. Built on AWS.",
  },
  {
    slug: "ai-agents",
    title: "Agents That Do The Work",
    subtitle: "AI Agent Development",
    shortDescription: "Multi-agent systems that automate complex workflows. Stateful orchestration, decision logic, and human-in-the-loop escalation.",
    heroHeadline: "Agents that don't just chat. They work.",
    heroSubhead: "Multi-agent systems built on LangGraph that automate your manual workflows end-to-end. Lead qualification, data processing, scheduling — handled autonomously.",
    problemLabel: "The problem",
    problem: "Your team spends 20+ hours a week on repetitive, rule-based work: qualifying inbound leads, processing documents, routing tickets, updating CRM records, following up on quotes. Every hour spent on this is an hour not spent growing the business. Off-the-shelf 'AI agents' either break on edge cases or require so much babysitting they're slower than doing it manually.",
    solution: "We build production AI agents that reason, call APIs, and take action autonomously. Built with Python, LangChain, and LangGraph for stateful orchestration. Connected to your CRM, email, calendar, and databases. With human-in-the-loop escalation for the 5% of cases that need a person.",
    capabilities: [
      "Autonomous decision-making with edge-case handling",
      "Stateful multi-agent orchestration with memory and context",
      "API integrations with your existing tools (CRM, email, calendar, databases)",
      "Human-in-the-loop escalation with full context handoff",
      "24/7 production deployment on AWS with monitoring",
    ],
    deliverables: [
      "Custom agent or multi-agent system built for your specific workflow",
      "Integrations with CRM (Salesforce, HubSpot, Pipedrive), email, calendar, and your databases",
      "Decision logic that handles exceptions and escalations",
      "Encrypted storage, role-based access, and full audit logging",
      "HIPAA-aware architecture on HIPAA-eligible AWS services (BAA-ready) for healthcare",
      "Deployed on AWS (EC2, Lambda, RDS) with CloudWatch monitoring",
      "Admin dashboard to review agent actions and override decisions",
    ],
    techStack: [
      "Python + LangChain + LangGraph",
      "Claude or GPT-4 for reasoning",
      "AWS Lambda, EC2, RDS, DynamoDB",
      "Your existing CRM and tool stack",
      "Redis or DynamoDB for state",
      "Temporal or Step Functions for long-running workflows",
    ],
    industries: [
      "B2B sales teams — lead qualification, enrichment, and routing",
      "Operations teams — document processing, ticket routing",
      "Healthcare — patient intake, scheduling, insurance verification",
      "Real estate — lead qualification, showing scheduling",
      "Finance — loan processing, document extraction",
    ],
    outcome: "Replace 20+ hours a week of manual work so your team focuses on what actually grows the business.",
    faqs: [
      {
        q: "What's the difference between an agent and a chatbot?",
        a: "A chatbot answers questions. An agent takes action. It reads your CRM, sends emails, books meetings, updates records, and completes multi-step workflows on its own. Think of it as an AI employee, not an AI FAQ."
      },
      {
        q: "Will it replace my team?",
        a: "No. Agents handle the repetitive, rule-based 80% of work so your team focuses on the judgment-heavy 20% that actually requires a human. Our clients typically reinvest the time saved into higher-value activities."
      },
      {
        q: "What happens when the agent hits an edge case?",
        a: "Every agent we build has escalation paths. When confidence drops below a threshold or the situation falls outside defined rules, the agent hands off to a human with full context, transcript, and recommended action."
      },
    ],
    metaTitle: "AI Agent Development | Unkommon — Multi-Agent Business Automation",
    metaDescription: "Production AI agents that automate business workflows end-to-end. LangChain, LangGraph, CRM integrations, human-in-the-loop escalation. Deployed on AWS.",
  },
  {
    slug: "ml-consulting",
    title: "Know Where AI Actually Fits",
    subtitle: "ML Consulting & Strategy",
    shortDescription: "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. From proof-of-concept to production.",
    heroHeadline: "Know where AI actually pays off, before you build.",
    heroSubhead: "Architecture, model selection, and evaluation frameworks. We tell you where AI fits in your business and where it doesn't.",
    problemLabel: "The problem",
    problem: "You're hearing 'AI' from every vendor, every board member, every competitor. Your team has ideas but no clear path. You've seen demos that looked great and died in production. You need someone to cut through the noise, tell you what's actually buildable, and give you a roadmap you can trust with your budget.",
    solution: "We audit your business, assess where AI pays off and where it doesn't, and hand you a technical architecture that actually ships. Model selection across Bedrock, OpenAI, Anthropic, and open-source. Evaluation frameworks so you know when the system is working. Proof-of-concept to production roadmap.",
    capabilities: [
      "AI opportunity assessment across your workflows",
      "Model selection and benchmarking for your use case",
      "Evaluation framework design with domain-specific metrics",
      "LLM integration architecture and cost modeling",
      "Build vs. buy analysis for existing AI tools",
    ],
    deliverables: [
      "Architecture decision document with diagrams and tradeoffs",
      "Model benchmark report across 5-10 candidate models",
      "Evaluation framework and test suite specific to your use case",
      "Cost model for production (inference, infrastructure, maintenance)",
      "Integration runbook for connecting AI to your existing systems",
      "Implementation roadmap with realistic timelines and milestones",
    ],
    techStack: [
      "Evaluation with LangSmith, Ragas, or custom frameworks",
      "Model benchmarking across Claude, GPT-4, Llama, Mistral",
      "AWS Bedrock, OpenAI, Anthropic, or self-hosted",
      "Python notebooks for analysis",
      "Architecture diagrams in Mermaid or Excalidraw",
    ],
    industries: [
      "Enterprises evaluating AI strategy at the portfolio level",
      "Startups deciding what to build vs. what to buy",
      "Teams with a failed AI pilot that want a second opinion",
      "Product leaders planning AI roadmaps",
      "Any business spending money on AI without clear ROI",
    ],
    outcome: "Know exactly where AI saves money in your business before you spend a dollar building.",
    faqs: [
      {
        q: "What's the deliverable — a PowerPoint or something real?",
        a: "Real. You get a written architecture decision document with diagrams, a model benchmark report with actual numbers, an evaluation framework, a cost model, and a roadmap. Nothing generic, everything specific to your business."
      },
      {
        q: "How long does consulting take?",
        a: "Most engagements run 2-4 weeks depending on the scope. You'll know the exact timeline after the free 30-minute call."
      },
      {
        q: "Can we hire you to build what you recommend?",
        a: "Yes. Many clients start with consulting and move to a build engagement once the roadmap is clear. The consulting work becomes the foundation of the build."
      },
    ],
    metaTitle: "AI/ML Consulting & Strategy | Unkommon — Know Where AI Pays Off",
    metaDescription: "AI opportunity assessment, model selection, and evaluation frameworks. Architecture decisions, cost modeling, and build roadmaps. Not generic consulting — technical.",
  },
  {
    slug: "ai-infrastructure",
    title: "Ship AI Without Breaking Production",
    subtitle: "AI Infrastructure & Deployment",
    shortDescription: "Production-grade deployment on AWS. Containerization, CI/CD, monitoring, auto-scaling, and cost optimization.",
    heroHeadline: "Ship AI to production without breaking it.",
    heroSubhead: "Production-grade AWS infrastructure for AI workloads. Containerization, CI/CD, monitoring, auto-scaling, and cost controls built in.",
    problemLabel: "The problem",
    problem: "Your AI prototype works in a notebook. But production is different: concurrent users, latency SLAs, cost spikes, model versioning, rollbacks, monitoring, security. Most AI projects die here — not because the model doesn't work, but because there's no one who can deploy it like real infrastructure.",
    solution: "We build the infrastructure around your AI model. AWS-native deployment with ECS, Lambda, API Gateway, and IaC. CI/CD pipelines for model updates. CloudWatch dashboards and alerts. Cost optimization with auto-scaling and caching. Your AI runs like the rest of your stack — reliable, observable, and cost-predictable.",
    capabilities: [
      "AWS-native containerization (ECS, EKS, Lambda)",
      "CI/CD pipelines for model and code deployment",
      "Auto-scaling with cost controls",
      "Prometheus/CloudWatch monitoring with alerting",
      "Prompt caching and inference optimization",
    ],
    deliverables: [
      "Infrastructure-as-Code templates (AWS CDK or Terraform)",
      "CI/CD pipeline for model and application deployment",
      "CloudWatch dashboards with latency, error rate, and cost metrics",
      "Alerting on SLO violations, cost anomalies, and security events",
      "Cost optimization report with specific savings recommendations",
      "Runbooks for deployments, rollbacks, and incident response",
      "Load testing and capacity planning",
    ],
    techStack: [
      "AWS (ECS, EKS, Lambda, API Gateway, CloudFront)",
      "IaC: AWS CDK or Terraform",
      "CI/CD: GitHub Actions, AWS CodePipeline",
      "Monitoring: CloudWatch, Prometheus, Grafana",
      "Docker, Kubernetes",
      "WAF, IAM, Secrets Manager for security",
    ],
    industries: [
      "Startups scaling from prototype to production",
      "Enterprises deploying AI to regulated environments",
      "Teams with working models but broken deployments",
      "Businesses worried about AI cost spikes",
      "Anyone running AI in production without proper monitoring",
    ],
    outcome: "Ship with confidence. We handle the infrastructure so you don't wake up to 3am outages.",
    faqs: [
      {
        q: "We already have DevOps. Why do we need you?",
        a: "AI workloads have unique operational patterns: expensive inference, model versioning, prompt caching, output quality monitoring, cost controls specific to LLMs. We bring that specific expertise to your existing DevOps team, not replace them."
      },
      {
        q: "Can you optimize our existing AI infrastructure?",
        a: "Yes. Many clients start with a cost + reliability audit. Typical savings: 40-60% on inference costs via caching, batching, and model routing."
      },
      {
        q: "Do you work with platforms other than AWS?",
        a: "AWS is our deepest expertise. We can work with GCP or Azure if required, but AWS is where we get the best results fastest."
      },
    ],
    metaTitle: "AI Infrastructure & Deployment on AWS | Unkommon — Production MLOps",
    metaDescription: "Production-grade AWS infrastructure for AI: ECS, Lambda, CI/CD, monitoring, auto-scaling, cost optimization. IaC with CDK or Terraform. Ship AI reliably.",
  },
  {
    slug: "voice-ai",
    title: "Answer Every Customer, 24/7",
    subtitle: "Chatbots & Voice AI",
    shortDescription: "AI chatbots and voice agents that handle customer questions, bookings, and lead capture. Web, phone, Telegram, WhatsApp, SMS.",
    heroHeadline: "Answer every customer, 24/7. Without hiring.",
    heroSubhead: "AI chatbots and voice agents for web, phone, Telegram, WhatsApp, and SMS. Handles customer questions, bookings, and lead capture around the clock.",
    problemLabel: "The problem",
    problem: "Customers call after hours. Leads come in on weekends. You're losing inquiries because there's no one to answer. Hiring support staff is expensive and doesn't scale to 24/7. Off-the-shelf chatbot builders sound robotic, can't book appointments, and don't know anything about your business.",
    solution: "We build AI chatbots and voice agents grounded in your knowledge base, connected to your booking system, and deployed across every channel your customers use. Web chat, phone answering via Vapi or Twilio, messaging apps. Natural conversation. Real answers. Appointments booked on your actual calendar.",
    capabilities: [
      "Voice AI for phone answering with natural conversation",
      "Omnichannel deployment (web chat, phone, Telegram, WhatsApp, SMS)",
      "Knowledge base grounding with cited sources (no hallucinations)",
      "Booking and lead capture integrated with your tools",
      "Human escalation with full conversation handoff",
    ],
    deliverables: [
      "Web chatbot or voice agent deployed on Vapi, ElevenLabs, or Twilio",
      "Knowledge base grounding from your website, docs, or custom content",
      "Booking integration (Cal.com, Calendly, Google Calendar, or custom)",
      "Lead capture with CRM integration (HubSpot, Salesforce, Pipedrive)",
      "Human escalation with transcript handoff and warm transfer",
      "Analytics dashboard: conversation review, escalation rates, conversions",
      "Multi-language support where needed",
    ],
    techStack: [
      "Voice: Vapi, ElevenLabs, Twilio, Deepgram",
      "LLMs: Claude, GPT-4, or fine-tuned models",
      "RAG for knowledge grounding",
      "LangChain for orchestration",
      "AWS Bedrock or OpenAI for generation",
      "DynamoDB for conversation state",
    ],
    industries: [
      "Dental and medical practices — appointment booking, insurance questions",
      "Legal firms — client intake, consultation scheduling",
      "Real estate — property inquiries, showing scheduling",
      "Home services — quote requests, appointment booking",
      "E-commerce — product questions, order support",
      "Any SMB missing calls after 5pm",
    ],
    outcome: "Never miss a lead or a customer question again — without adding a single hire.",
    faqs: [
      {
        q: "Will customers know it's AI?",
        a: "We build voice agents that sound natural and are upfront that they're AI assistants. Transparency builds trust. Customers prefer a helpful AI at 2am to a voicemail that gets returned 3 days later."
      },
      {
        q: "Can it actually book appointments?",
        a: "Yes. Real bookings on your real calendar. The agent checks availability via your Cal.com, Google Calendar, or custom system, confirms with the caller, and creates the event with conflict detection."
      },
      {
        q: "What if the AI gets something wrong?",
        a: "Every agent has escalation paths: 'Let me connect you with a human' or 'I'll have someone follow up within 1 business hour.' The agent hands off with full context so your team doesn't start from zero."
      },
    ],
    metaTitle: "AI Chatbots & Voice AI | Unkommon — 24/7 Customer Answering",
    metaDescription: "AI voice agents and chatbots for web, phone, WhatsApp, and SMS. Handles customer questions, books appointments, captures leads 24/7. Powered by Vapi and Claude.",
  },
  {
    slug: "fine-tuning",
    title: "AI That Speaks Your Industry",
    subtitle: "Fine-tuning & Domain Models",
    shortDescription: "Fine-tuned LLMs trained on your domain data. Dental, legal, real estate, finance, healthcare.",
    heroHeadline: "AI that actually understands your work.",
    heroSubhead: "Fine-tuned LLMs trained on your domain data. Dental, legal, real estate, finance, healthcare — so the AI speaks your industry's language.",
    problemLabel: "The problem",
    problem: "Generic models give generic answers. When a dental practice asks about crown preparation, GPT gives a Wikipedia summary. When a lawyer needs a brief, Claude writes like a law student. When a real estate agent drafts a listing, the output sounds like every other AI listing. Your industry has specific vocabulary, compliance rules, and output formats — generic AI gets them wrong.",
    solution: "We fine-tune open-source or frontier LLMs on your domain data so the model learns your industry's language, rules, and output patterns. Dental, legal, real estate, finance, healthcare — or any vertical with specialized knowledge. The result: an AI that reads like someone who actually works in your field.",
    capabilities: [
      "Industry-specific model fine-tuning",
      "Dataset curation and annotation",
      "LoRA adapters for cost-effective tuning",
      "Evaluation against domain benchmarks",
      "Continuous retraining pipeline",
    ],
    deliverables: [
      "Fine-tuning dataset built from your domain data (with annotation support)",
      "Custom model: LoRA adapter on Claude, GPT-4, Llama, or Mistral",
      "Evaluation suite measuring accuracy on your specific use cases",
      "Production deployment with versioning and rollback",
      "Retraining pipeline for continuous improvement",
      "Cost analysis: fine-tuned vs. RAG vs. prompt engineering",
    ],
    techStack: [
      "Hugging Face Transformers",
      "PEFT (LoRA, QLoRA) for efficient tuning",
      "OpenAI fine-tuning API",
      "Bedrock Custom Models",
      "Evaluation: Ragas, LM Eval Harness",
      "AWS SageMaker or self-hosted GPUs",
    ],
    industries: [
      "Dental practices — clinical notes, patient communications, insurance coding",
      "Legal firms — briefs, contracts, compliance memos in firm voice",
      "Real estate — listings, buyer communications, market analysis",
      "Financial services — advisor notes, compliance-aware outputs",
      "Healthcare — clinical documentation (HIPAA-aware)",
      "Any vertical with compliance or style requirements generic models miss",
    ],
    outcome: "An AI that actually understands your work, not one that guesses like a generalist.",
    faqs: [
      {
        q: "Do I need fine-tuning or is RAG enough?",
        a: "RAG is usually the right first step — it's faster, cheaper, and more flexible. Fine-tuning matters when you need the model to adopt a specific tone, follow complex domain rules, or produce outputs in a specialized format. We recommend the right approach after the audit."
      },
      {
        q: "How much data do I need for fine-tuning?",
        a: "Depends on the use case. LoRA adapters can work with as few as 500 high-quality examples. For style matching, 1,000-5,000 examples. For complex domain reasoning, 10,000+. We help with dataset curation."
      },
      {
        q: "Can we fine-tune open-source models instead of frontier ones?",
        a: "Yes. Llama, Mistral, and DeepSeek models can be fine-tuned and self-hosted for cost and data residency control. Often a better fit than frontier APIs for regulated or cost-sensitive industries."
      },
    ],
    metaTitle: "LLM Fine-tuning & Domain Models | Unkommon — AI For Your Industry",
    metaDescription: "Fine-tune LLMs on your domain data. Dental, legal, real estate, finance, healthcare. LoRA adapters, evaluation frameworks, production deployment.",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}
