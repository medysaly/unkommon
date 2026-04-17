import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";

const services = [
  {
    title: "Custom RAG Systems",
    subtitle: "Conversational Knowledge Bases",
    description:
      "We build production RAG systems that turn your documents into a searchable, conversational AI knowledge base. Your team or customers ask questions in plain language and get accurate, cited answers pulled directly from your data. No hallucinations. No generic responses.",
    capabilities: ["Plain-language search across all your documents", "Every answer cited to the source", "Deployed as chat interface or API"],
    deliverables: ["Ingestion pipeline for PDFs, docs, web pages, and databases", "Vector database with embeddings tuned for your domain (Pinecone, pgvector, or ChromaDB)", "Hybrid search with reranking for retrieval accuracy", "Chat UI or API endpoint (your choice)", "Citation tracking on every response"],
    outcome: "Your team gets accurate answers in seconds, not hours of searching.",
  },
  {
    title: "AI Agent Development",
    subtitle: "Autonomous Workflow Agents",
    description:
      "We build AI agents and multi-agent systems that automate your manual business workflows end-to-end. Lead qualification, data processing, scheduling. Your agent reasons, makes decisions, calls APIs, and takes action on your behalf. Not a chatbot. A real agent.",
    capabilities: ["Autonomous decision-making with edge-case handling", "API integrations with your existing tools", "24/7 production deployment on AWS"],
    deliverables: ["Custom agent built for your specific workflow (Python + LangChain/LangGraph)", "Integrations with CRM, email, calendar, and databases", "Encrypted storage, role-based access, full audit logging", "HIPAA-compliant architecture available for healthcare", "Deployed on AWS (EC2, Lambda, RDS) with monitoring"],
    outcome: "Replace the manual workflows costing you 20+ hours per week.",
  },
  {
    title: "ML Consulting & Integration",
    subtitle: "Model Selection & Optimization",
    description:
      "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. Bedrock, OpenAI, Anthropic, and open-source model integration.",
    capabilities: ["Model selection & benchmarking", "Evaluation framework design", "LLM integration architecture"],
    deliverables: ["Architecture decision document", "Model benchmark report", "Evaluation framework & test suite", "Integration runbook"],
    outcome: "Know exactly what to build before you spend a dollar building it.",
  },
  {
    title: "AI Infrastructure & Deployment",
    subtitle: "Production-Grade on AWS",
    description:
      "ECS/EKS containerization, Lambda serverless, API Gateway, CloudWatch observability, and Infrastructure-as-Code via CDK or Terraform.",
    capabilities: ["AWS-native containerization", "CI/CD & monitoring pipelines", "Auto-scaling & cost optimization"],
    deliverables: ["IaC templates (CDK/Terraform)", "CI/CD pipeline", "CloudWatch dashboards & alerts", "Cost optimization report"],
    outcome: "Your system runs reliably at scale, not just in a demo.",
  },
];

const useCases = [
  {
    title: "Regulated Industries",
    description:
      "We build HIPAA-compliant AI systems for healthcare, insurance, and financial services. Private infrastructure, audit trails, and data residency controls baked in from day one.",
    outcomes: ["End-to-end encryption", "HIPAA & SOC 2 architecture", "Audit logging", "BAA-ready AWS infra"],
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
            Custom AI/ML Systems for Complex Problems
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Bespoke AI systems engineered for your data, your workflows, and your infrastructure.
            When off-the-shelf tools fall short, we build what's missing.
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

      {/* What We Build */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">1</span>
            <span className="text-[13px] text-muted-foreground">What We Build</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-4">
            Four engineering disciplines.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-12 max-w-2xl">
            Each discipline works independently or together, from data pipeline to production deployment.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-background rounded-xl border border-border"
              >
                <p className="text-[12px] text-muted-foreground uppercase tracking-wider mb-2">{service.subtitle}</p>
                <h3 className="text-xl font-medium text-foreground mb-3">{service.title}</h3>
                <p className="text-[15px] text-secondary-foreground leading-relaxed mb-3">{service.description}</p>
                <p className="text-[15px] text-foreground font-medium mb-6">{service.outcome}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.capabilities.map((cap) => (
                    <span key={cap} className="text-[12px] text-muted-foreground bg-white px-3 py-1 rounded-full border border-border">
                      {cap}
                    </span>
                  ))}
                </div>
                <div className="pt-5 border-t border-border">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium mb-3">Deliverables</p>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((d) => (
                      <li key={d} className="text-[13px] text-secondary-foreground flex items-start gap-2">
                        <span className="text-foreground mt-0.5">-</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[10px]" aria-hidden="true">2</span>
            <span className="text-[13px] text-white/60">Use Cases</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-12 max-w-3xl">
            Designed for environments where off-the-shelf fails.
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

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Stop settling for off-the-shelf AI.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Let's engineer a system that solves what off-the-shelf tools can't.
            Start with a free 30-minute Architecture Review.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
