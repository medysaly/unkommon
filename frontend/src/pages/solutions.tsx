import { motion } from "framer-motion";
import { createPageUrl } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Database,
  Brain,
  Shield,
  Target,
  Server,
  Bot,
  Workflow,
  Cloud,
} from "lucide-react";
import "@/styles/pearl-button.css";

const whatWeSolve = [
  {
    icon: Database,
    title: "Custom RAG Systems",
    description:
      "Retrieval-augmented generation pipelines that ground LLM outputs in your proprietary data. Vector databases, embedding strategies, chunking optimization, and citation tracking — so your AI answers from your documents, never hallucinates.",
    metrics: ["Proprietary data ingestion", "Vector search optimization", "Citation & source tracking"],
  },
  {
    icon: Bot,
    title: "AI Agent Development",
    description:
      "Multi-agent systems built on LangGraph that automate complex business workflows. Document processing, decision trees, state management, and human-in-the-loop escalation — production agents, not chatbot prototypes.",
    metrics: ["Stateful workflow orchestration", "Human-in-the-loop escalation", "End-to-end process automation"],
  },
  {
    icon: Brain,
    title: "ML Consulting & Integration",
    description:
      "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. We help you choose the right models, build the right pipelines, and measure what matters.",
    metrics: ["Model selection & benchmarking", "Evaluation framework design", "LLM integration architecture"],
  },
  {
    icon: Cloud,
    title: "AI Infrastructure & Deployment",
    description:
      "Production-grade deployment on AWS. Containerized services, CI/CD pipelines, observability dashboards, cost optimization, and auto-scaling — so your AI runs reliably at any scale.",
    metrics: ["AWS-native containerization", "CI/CD & monitoring pipelines", "Auto-scaling & cost optimization"],
  },
];

const industries = [
  {
    icon: Shield,
    title: "Regulated Industries",
    description:
      "HIPAA-compliant AI systems for healthcare, insurance, and financial services. Private infrastructure, audit trails, and data residency controls built in from day one.",
    outcomes: [
      "End-to-end encryption and data isolation",
      "HIPAA & SOC 2 aligned architecture",
      "Audit logging and compliance reporting",
      "BAA-ready AWS infrastructure",
    ],
  },
  {
    icon: Database,
    title: "Knowledge-Intensive Operations",
    description:
      "Custom RAG systems for organizations drowning in proprietary data — research, legal discovery, technical documentation, customer support knowledge bases.",
    outcomes: [
      "Proprietary document ingestion pipelines",
      "Semantic search over internal knowledge",
      "Automated report and summary generation",
      "Continuous knowledge base updates",
    ],
  },
  {
    icon: Workflow,
    title: "Process-Heavy Workflows",
    description:
      "Multi-agent systems for companies with complex, multi-step business processes that require decision logic, state management, and human oversight.",
    outcomes: [
      "Document processing and extraction pipelines",
      "Decision automation with guardrails",
      "Multi-step workflow orchestration",
      "Integration with existing enterprise systems",
    ],
  },
];

const capabilities = [
  {
    icon: Database,
    title: "RAG Pipeline Engineering",
    subtitle: "Retrieval-Augmented Generation",
    description:
      "Custom embedding strategies, vector database selection (Pinecone, pgvector, OpenSearch), chunking optimization, hybrid search, and re-ranking pipelines.",
  },
  {
    icon: Bot,
    title: "LangGraph Agent Orchestration",
    subtitle: "Stateful Multi-Agent Systems",
    description:
      "State machines that follow your business logic exactly. Agent handoffs, conditional branching, memory management, and tool use — built on LangGraph.",
  },
  {
    icon: Brain,
    title: "LLM Integration & Fine-Tuning",
    subtitle: "Model Selection & Optimization",
    description:
      "Bedrock, OpenAI, Anthropic, and open-source model integration. Prompt engineering, fine-tuning, distillation, and evaluation pipelines.",
  },
  {
    icon: Server,
    title: "AWS Cloud Infrastructure",
    subtitle: "Production-Grade Deployment",
    description:
      "ECS/EKS containerization, Lambda serverless, API Gateway, CloudWatch observability, and Infrastructure-as-Code via CDK or Terraform.",
  },
  {
    icon: Target,
    title: "Evaluation & Monitoring",
    subtitle: "Continuous Quality Assurance",
    description:
      "Custom evaluation frameworks, A/B testing, drift detection, hallucination monitoring, and production observability dashboards.",
  },
];

const standards = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "Every system deploys on your private AWS VPC. HIPAA-compliant, SOC 2-aligned infrastructure with end-to-end encryption. Your data never leaves your cloud.",
  },
  {
    icon: Brain,
    title: "Engineering-Led",
    description:
      "Software engineers and ML specialists, not prompt engineers. RAG architecture, LangGraph state machines, AWS cloud-native — production code, not prototypes.",
  },
  {
    icon: Target,
    title: "Measurable Outcomes",
    description:
      "Custom evaluation frameworks, latency benchmarks, accuracy metrics, and cost tracking. We don't ship and disappear — we measure what matters.",
  },
];

export default function Solutions() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground tracking-tight"
            >
              Custom AI/ML Systems for Complex Problems
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto"
            >
              AWS-Native Architecture | HIPAA & SOC 2 Aligned
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Bespoke AI systems engineered for your data, your workflows, and your infrastructure.
              When off-the-shelf tools fall short, we build what's missing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <button
                className="pearl-button"
                onClick={() => (window.location.href = createPageUrl("Contact"))}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Book an Architecture Review
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Build */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              What We Build
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four engineering disciplines. From data pipeline to production deployment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {whatWeSolve.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
              >
                <item.icon className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                <ul className="space-y-2">
                  {item.metrics.map((metric, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-foreground flex-shrink-0" />
                      {metric}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Our Engineering */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Experience Our Engineering Firsthand
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
              Call our AI agent to see how we build conversational systems. This is a production LangGraph agent running on our AWS infrastructure.
            </p>
            <div className="inline-flex flex-col items-center p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
              <Phone className="w-8 h-8 text-foreground mb-4" />
              <a
                href="tel:+12036809629"
                className="text-3xl md:text-4xl font-light text-foreground tracking-tight hover:opacity-80 transition-opacity"
              >
                +1 (203) 680-9629
              </a>
              <p className="text-sm text-muted-foreground mt-2">Production AI Agent — Active 24/7</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Built for Complex Environments
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't sell generic AI. Every system is engineered for the specific data, compliance requirements, and integration needs of your environment.
            </p>
          </motion.div>

          <div className="space-y-16">
            {industries.map((industry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-12 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
                    <industry.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Use Case
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4">
                  {industry.title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
                  {industry.description}
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {industry.outcomes.map((outcome, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Technical Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The engineering stack behind every system we ship.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black"
              >
                <cap.icon className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-xl font-medium text-foreground mb-1">{cap.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wider">{cap.subtitle}</p>
                <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Unkommon Standard */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              The Unkommon Standard
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {standards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We're Not */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              What We're Not
            </h2>
          </motion.div>

          <div className="space-y-6 max-w-2xl mx-auto">
            {[
              "Not a SaaS platform you subscribe to",
              "Not a chatbot builder with a drag-and-drop interface",
              "Not a template agency reselling other companies' tools",
              "Not a $99/month solution competing on price",
              "Not a vendor you replace after 6 months",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 text-lg text-muted-foreground"
              >
                <span className="text-foreground mt-1">—</span>
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12 text-xl text-foreground font-medium max-w-3xl mx-auto leading-relaxed"
          >
            We're an engineering partner. The systems we build become infrastructure your business runs on.
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-32 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-foreground tracking-tight"
            >
              Stop Settling for
              <br />
              Off-the-Shelf AI
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's engineer a system that solves what off-the-shelf tools can't.
              Start with a free 30-minute Architecture Review.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="pearl-button"
                onClick={() => (window.location.href = createPageUrl("Contact"))}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Book an Architecture Review
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>HIPAA-Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>AWS Private Cloud</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Engineering-Led</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
