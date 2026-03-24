import { motion } from "framer-motion";
import { createPageUrl } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  Phone,
  Zap,
  Calendar,
  Brain,
  Shield,
  Target,
  Stethoscope,
  Scale,
  Briefcase,
  Bot,
  Workflow,
} from "lucide-react";
import VapiDemo from "@/components/VapiDemo";
import SpeedToLeadDemo from "@/components/SpeedToLeadDemo";
import ClientReactivatorDemo from "@/components/ClientReactivatorDemo";
import "@/styles/pearl-button.css";

const whatWeSolve = [
  {
    icon: Calendar,
    title: "Revenue Recovery",
    description:
      "AI agents that parse insurance denials (AWS Textract + Bedrock) and auto-draft clinical appeals. Turn rejected claims into recovered revenue without manual admin work.",
    metrics: ["Automated denial parsing", "Clinical appeal drafting", "Claims recovery tracking"],
  },
  {
    icon: Phone,
    title: "Patient & Client Journey",
    description:
      "Multi-agent systems that handle 24/7 voice triage, instant qualification, and CRM-integrated scheduling. Every call answered, every lead qualified, every appointment booked.",
    metrics: ["24/7 voice triage", "Instant qualification", "CRM-integrated scheduling"],
  },
  {
    icon: Zap,
    title: "Operational Efficiency",
    description:
      "Custom-built agents that execute end-to-end business processes — from intake to follow-up. Reduce manual busy work by up to 70% so your team focuses on billable work.",
    metrics: ["Up to 70% admin reduction", "End-to-end automation", "Staff redeployment to revenue"],
  },
];

const industries = [
  {
    icon: Stethoscope,
    title: "Healthcare & Dental",
    description:
      "HIPAA-compliant AI systems for patient scheduling, recall campaigns, insurance verification, and denial management. Built for practices losing revenue to no-shows and admin overhead.",
    outcomes: [
      "Automated patient recall for overdue cleanings and incomplete treatment plans",
      "Insurance denial parsing and clinical appeal generation",
      "24/7 patient triage — emergencies routed, routine calls handled",
      "Integration with OpenDental, Dentrix, and practice management systems",
    ],
  },
  {
    icon: Scale,
    title: "Legal",
    description:
      "Secure AI intake systems for law firms. Screen potential cases, match to practice areas, book consultations, and follow up — all while maintaining attorney-client privilege standards.",
    outcomes: [
      "After-hours legal intake with case screening and qualification",
      "Practice area matching and attorney routing",
      "Automated consultation booking and follow-up sequences",
      "Document generation for engagement letters and intake forms",
    ],
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "AI systems for real estate agencies, financial advisors, and consulting firms. Capture leads at peak intent, qualify prospects, and convert inquiries into meetings in under 90 seconds.",
    outcomes: [
      "Real estate lead capture from Zillow, Realtor.com, and ad platforms",
      "Instant buyer/seller qualification and appointment booking",
      "Past client reactivation — market updates, home value alerts",
      "CRM enrichment and pipeline management automation",
    ],
  },
];

const capabilities = [
  {
    icon: Phone,
    title: "Voice AI Operations",
    subtitle: "24/7 omnichannel communication",
    description:
      "Phone calls, SMS, WhatsApp, email — one AI system handles them all. Books appointments, answers questions, routes inquiries, and speaks 50+ languages.",
  },
  {
    icon: Zap,
    title: "Lead Automation",
    subtitle: "Sub-60-second response times",
    description:
      "Instant outreach the moment a lead comes in. Automated qualification, smart routing, persistent follow-up, and CRM sync. Your strongest, most measurable capability.",
  },
  {
    icon: Calendar,
    title: "Revenue Recovery",
    subtitle: "Zero ad spend required",
    description:
      "Mine your existing database for dormant revenue. Insurance denial processing, patient recall campaigns, and past client reactivation — all automated.",
  },
  {
    icon: Bot,
    title: "Custom AI Agent Development",
    subtitle: "$30K-$150K production systems",
    description:
      "Insurance claim processing, document generation, transaction coordination — purpose-built agents for your specific business logic. Not templates. Production code.",
  },
  {
    icon: Workflow,
    title: "Agentic Workflow Automation",
    subtitle: "Multi-agent orchestration",
    description:
      "Multiple AI agents coordinating end-to-end: voice agent qualifies a lead, email agent follows up, booking agent schedules, CRM agent updates the pipeline.",
  },
];

const standards = [
  {
    icon: Shield,
    title: "Security First",
    description:
      "We build on your private AWS cloud. You own your data. HIPAA-compliant. No public 'wrappers' — dedicated, isolated infrastructure.",
  },
  {
    icon: Brain,
    title: "Engineering-Led",
    description:
      "We are software engineers and ML specialists, not prompt engineers. RAG architecture, LangGraph state machines, AWS cloud-native infrastructure.",
  },
  {
    icon: Target,
    title: "Measurable ROI",
    description:
      "We don't focus on 'vibe-coding.' We focus on reduced no-shows, increased claim recovery, and sub-60-second lead response times.",
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
              Agentic AI Systems for Dental & Professional Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-4 leading-relaxed max-w-3xl mx-auto"
            >
              AWS & ML Architecture | HIPAA-Compliant Operations
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Production-grade AI systems that recover revenue, automate patient journeys, and eliminate
              the administrative friction costing your practice $100k+ annually.
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
                    Book Your AI Audit
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Solve */}
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
              What We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Three categories of operational waste we eliminate with production AI systems.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Live Voice Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Hear It. Don't Just Read About It.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Call our live Voice AI demo. Try to book an appointment, ask about pricing, or test it with complex questions.
            </p>
          </motion.div>
          <VapiDemo />
        </div>
      </section>

      {/* Industry Verticals */}
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
              Built for Your Industry
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't sell generic AI. Every system is engineered for the specific workflows, compliance requirements, and integration needs of your industry.
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
                    Industry
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

      {/* Capabilities */}
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
              Our Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From voice AI to multi-agent orchestration — production systems, not prototypes.
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

      {/* Interactive Demos */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Interactive demos showing how our AI systems handle real business scenarios.
            </p>
          </motion.div>

          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-light text-foreground tracking-tight mb-6 text-center">
                Lead Automation Demo
              </h3>
              <SpeedToLeadDemo />
            </div>

            <div>
              <h3 className="text-2xl font-light text-foreground tracking-tight mb-6 text-center">
                Revenue Recovery Demo
              </h3>
              <ClientReactivatorDemo />
            </div>
          </div>
        </div>
      </section>

      {/* The Unkommon Standard */}
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
                className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black text-center"
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
              Let's engineer a system that actually works for your practice.
              Start with a free 30-minute AI Systems Audit.
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
                    Book Your AI Audit
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
