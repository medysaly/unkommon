import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";

const services = [
  {
    slug: "rag-systems",
    title: "AI That Knows Your Business",
    subtitle: "Custom RAG Systems",
    description:
      "We build production RAG systems that turn your documents into a searchable, conversational AI knowledge base. Your team or customers ask questions in plain language and get accurate answers pulled directly from your data. Every answer is sourced, cited, and traceable.",
    capabilities: ["Plain-language search across all your documents", "Every answer cited to the source", "Deployed as chat interface or API"],
    deliverables: ["Ingestion pipeline for PDFs, docs, web pages, and databases", "Vector database with embeddings tuned for your domain (Pinecone, pgvector, or ChromaDB)", "Hybrid search with reranking for retrieval accuracy", "Chat UI or API endpoint (your choice)", "Citation tracking on every response"],
    outcome: "Stop paying employees to dig through documents. Your team and customers get instant answers from your data.",
  },
  {
    slug: "ai-agents",
    title: "Agents That Do The Work",
    subtitle: "AI Agent Development",
    description:
      "We build AI agents and multi-agent systems that automate your manual business workflows end-to-end. Lead qualification, data processing, scheduling. Your agent reasons, makes decisions, calls APIs, and takes action on your behalf.",
    capabilities: ["Autonomous decision-making with edge-case handling", "API integrations with your existing tools", "24/7 production deployment on AWS"],
    deliverables: ["Custom agent built for your specific workflow (Python + LangChain/LangGraph)", "Integrations with CRM, email, calendar, and databases", "Encrypted storage, role-based access, full audit logging", "HIPAA-aware architecture on HIPAA-eligible AWS services (BAA-ready) for healthcare", "Deployed on AWS (EC2, Lambda, RDS) with monitoring"],
    outcome: "Replace 20+ hours a week of manual work so your team focuses on what actually grows the business.",
  },
  {
    slug: "ml-consulting",
    title: "Know Where AI Actually Fits",
    subtitle: "ML Consulting & Strategy",
    description:
      "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. Bedrock, OpenAI, Anthropic, and open-source model integration. We tell you where AI pays off and where it doesn't.",
    capabilities: ["Model selection & benchmarking", "Evaluation framework design", "LLM integration architecture"],
    deliverables: ["Architecture decision document", "Model benchmark report", "Evaluation framework & test suite", "Integration runbook"],
    outcome: "Know exactly where AI saves money in your business before you spend a dollar building.",
  },
  {
    slug: "ai-infrastructure",
    title: "Ship AI Without Breaking Production",
    subtitle: "AI Infrastructure & Deployment",
    description:
      "ECS/EKS containerization, Lambda serverless, API Gateway, CloudWatch observability, and Infrastructure-as-Code via CDK or Terraform. Your AI runs like the rest of your stack.",
    capabilities: ["AWS-native containerization", "CI/CD & monitoring pipelines", "Auto-scaling & cost optimization"],
    deliverables: ["IaC templates (CDK/Terraform)", "CI/CD pipeline", "CloudWatch dashboards & alerts", "Cost optimization report"],
    outcome: "Ship with confidence. We handle the infrastructure so you don't wake up to 3am outages.",
  },
  {
    slug: "voice-ai",
    title: "Answer Every Customer, 24/7",
    subtitle: "Chatbots & Voice AI",
    description:
      "We build AI chatbots and voice agents that handle customer questions, bookings, and lead capture 24/7. Web chat, phone answering, or embedded in Telegram, WhatsApp, and SMS. Grounded in your knowledge base. Connected to your booking system.",
    capabilities: ["Voice AI for phone answering", "Omnichannel deployment (web, phone, messaging)", "24/7 autonomous operation"],
    deliverables: ["Web chatbot or voice agent (Vapi, ElevenLabs, Twilio)", "Knowledge base grounding with cited sources", "Booking and lead capture integration", "Human escalation with transcript handoff", "Analytics dashboard for conversation review"],
    outcome: "Never miss a lead or a customer question again, without adding a single hire.",
  },
  {
    slug: "fine-tuning",
    title: "AI That Speaks Your Industry",
    subtitle: "Fine-tuning & Domain Models",
    description:
      "Generic models give generic answers. We fine-tune LLMs on your domain data, dental, legal, real estate, finance, healthcare, so they speak your industry's language, follow your compliance rules, and produce outputs specific to your workflows.",
    capabilities: ["Industry-specific model tuning", "Dataset curation and annotation", "Evaluation against domain benchmarks"],
    deliverables: ["Fine-tuning dataset built from your domain data", "Custom model (LoRA adapter on Claude, GPT-4, or open-source)", "Evaluation suite measuring accuracy on your use cases", "Production deployment with versioning and rollback", "Retraining pipeline for continuous improvement"],
    outcome: "An AI that actually understands your work, not one that guesses like a generalist.",
  },
];

const useCases = [
  {
    title: "Regulated Industries",
    description:
      "We build HIPAA-aware AI systems on HIPAA-eligible AWS services for healthcare, insurance, and financial services. Private infrastructure, audit trails, and data residency controls baked in from day one. BAA-ready deployments.",
    outcomes: ["End-to-end encryption", "HIPAA-aware & SOC 2-aligned", "Audit logging", "BAA-ready AWS infra"],
  },
  {
    title: "Knowledge-Intensive Operations",
    description:
      "Organizations drowning in proprietary data (research firms, legal teams, technical documentation, customer support knowledge bases) need AI that answers from their documents, not the internet.",
    outcomes: ["Document ingestion pipelines", "Semantic search", "Automated summaries", "Continuous updates"],
  },
  {
    title: "Process-Heavy Workflows",
    description:
      "Businesses with complex, multi-step processes that require decision logic, state management, and human oversight need agents that follow rules exactly, not chatbots that improvise.",
    outcomes: ["Document extraction", "Decision automation", "Multi-step orchestration", "Enterprise integrations"],
  },
];

export default function Solutions() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-6"
          >
            AI that cuts costs, saves hours, and scales with you.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Custom-built AI for your workflows, your data, and your team. From first call to 24/7 production.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <CTAButton href={createPageUrl("BookACall")}>
              Let's talk
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Use Cases moved above services so buyers self-identify first */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[10px]" aria-hidden="true">1</span>
            <span className="text-[13px] text-white/60">Who We Work With</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-12 max-w-3xl">
            Does this sound like you?
          </h2>

          <div className="space-y-6">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 rounded-xl border border-white/20"
              >
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">{uc.title}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed mb-6 max-w-2xl">{uc.description}</p>
                <div className="flex flex-wrap gap-2">
                  {uc.outcomes.map((o) => (
                    <span key={o} className="text-[12px] text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/20">
                      {o}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Which Service Fits */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">2</span>
            <span className="text-[13px] text-muted-foreground">Which Service Fits</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-4">
            Pick where you want to start.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-12 max-w-2xl">
            Six ways we cut costs, save hours, and turn your operations into autopilot. Click any service for deliverables, tech stack, and industries we serve.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={`/solutions/${service.slug}`}
                  className="group block p-7 bg-background rounded-xl border border-border hover:border-foreground/30 hover:shadow-sm transition-all h-full"
                >
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">{service.subtitle}</p>
                  <h3 className="text-[19px] font-medium text-foreground mb-3 leading-snug">{service.title}</h3>
                  <p className="text-[14px] text-secondary-foreground leading-relaxed mb-5">{service.outcome}</p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground font-medium group-hover:gap-2 transition-all">
                    Learn more
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Find where AI pays off in your business.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. We'll look at where AI can cut costs, save hours, or open new revenue, no pitch, no obligation.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
