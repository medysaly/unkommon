import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    num: "01",
    title: "Audit",
    subtitle: "Free 30-minute architecture review",
    description:
      "We audit your data landscape, current infrastructure, and workflow bottlenecks. What data do you have? Where are the manual steps? What does 'good' look like? We give you a clear engineering assessment.",
  },
  {
    num: "02",
    title: "Design",
    subtitle: "System architecture tailored to your problem",
    description:
      "We define the system architecture: data pipelines, model selection, agent orchestration, integration points, and deployment strategy. No templates. A custom engineering blueprint.",
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Custom development on AWS",
    description:
      "RAG knowledge base ingestion, LangGraph agent orchestration, API integrations, evaluation pipelines. Production code deployed on your private AWS infrastructure.",
  },
  {
    num: "04",
    title: "Deploy",
    subtitle: "Staged rollout in hybrid mode",
    description:
      "The AI runs alongside your staff in a hybrid model until it hits 99% reliability. Your team stays in the loop, and the AI earns its place before it runs solo.",
  },
  {
    num: "05",
    title: "Optimize",
    subtitle: "Continuous monitoring and training",
    description:
      "Continuous monitoring, agent training based on real interactions, and ongoing builds as your needs grow. You stay because of results, not a contract.",
  },
];

const moat = [
  {
    title: "Private Infrastructure",
    subtitle: "Your Own AWS VPC",
    description:
      "Every system runs on the client's own AWS VPC. Proprietary datasets, customer records, internal documents. None of it ever touches a public server.",
    quote: "Our data never leaves our cloud.",
  },
  {
    title: "State-Based Architecture",
    subtitle: "LangGraph",
    description:
      "We build using LangGraph, the production framework behind stateful AI systems at scale. These aren't chatbots that improvise. They're state machines that follow your business rules exactly.",
    quote: "It can't go off-script. Ever.",
  },
  {
    title: "RAG Knowledge Base",
    subtitle: "Zero Hallucinations",
    description:
      "We ingest your specific business data into a private knowledge base. When a user asks a question, the AI pulls the answer from your documents. It never guesses.",
    quote: "It won't make things up.",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "2-8 weeks depending on scope. We go from audit to production deployment, not months of exploration. A focused RAG system can ship in 2-3 weeks. A multi-agent workflow with integrations is closer to 6-8.",
  },
  {
    q: "What does the free audit include?",
    a: "A 30-minute call where we assess your data, infrastructure, and workflows to determine where AI fits and what the build looks like. You walk away with a clear picture of what's possible, what it takes, and whether it's worth doing, even if you don't work with us.",
  },
  {
    q: "Do you work with our existing AWS infrastructure?",
    a: "Yes. We deploy on your VPC, your accounts, your security policies. If you don't have AWS infrastructure yet, we set it up. Either way, you own everything we build.",
  },
  {
    q: "What if we already tried an AI solution and it didn't work?",
    a: "Most failed AI projects fail on architecture, not on the AI itself. Common issues: wrong model for the task, no evaluation framework, poor data pipeline, or a chatbot wrapper sold as a \"custom solution.\" We audit what went wrong and build it right.",
  },
  {
    q: "Is my data secure?",
    a: "Every system runs on your private AWS cloud. End-to-end encryption, isolated data environments, no public API calls with your data. Architecture is aligned with HIPAA and SOC 2 requirements. Your data is never used to train public models.",
  },
  {
    q: "What does it cost?",
    a: "Every project is scoped individually because pricing depends on the system: its complexity, integrations, data volume, and infrastructure needs. After the free 30-minute call, we'll give you a fixed scope and a fixed price before any work begins. No hourly billing, no surprise invoices.",
  },
];

export default function HowItWorks() {
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
            From discovery to deployment in weeks, not months.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground max-w-2xl leading-relaxed"
          >
            A structured engineering process, because AI systems that work in production require more than prompts.
          </motion.p>
        </div>
      </section>

      {/* Five-Step Process */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <ol className="space-y-0">
            {steps.map((step, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative pl-20 pb-14 last:pb-0"
              >
                {i < steps.length - 1 && (
                  <div className="absolute left-[27px] top-14 bottom-0 w-px bg-border" aria-hidden="true" />
                )}
                <div className="absolute left-0 top-0 w-14 h-14 rounded-full border-2 border-foreground flex items-center justify-center bg-white">
                  <span className="text-sm font-medium text-foreground">{step.num}</span>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-muted-foreground font-medium mb-3">{step.subtitle}</p>
                  <p className="text-[15px] text-secondary-foreground leading-relaxed max-w-xl">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* The Technical Moat */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">!</span>
            <span className="text-[13px] text-muted-foreground">Why This Is Different</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-12 max-w-3xl">
            What you're actually getting.
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {moat.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-xl border border-border"
              >
                <h3 className="text-xl font-medium text-foreground mb-1">{item.title}</h3>
                <p className="text-[13px] text-muted-foreground font-medium mb-4">{item.subtitle}</p>
                <p className="text-[15px] text-secondary-foreground leading-relaxed mb-6">{item.description}</p>
                <div className="pt-4 border-t border-border">
                  <p className="text-[14px] text-foreground italic">"{item.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-12">
            Frequently asked questions.
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-[16px] font-medium text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[15px] text-secondary-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Start with a free architecture review.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            30 minutes. No pressure. We'll assess your AI opportunity and outline a technical approach.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
