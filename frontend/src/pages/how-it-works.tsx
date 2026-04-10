import { motion } from "framer-motion";
import { createPageUrl } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle,
  Search,
  PenTool,
  Code,
  Rocket,
  TrendingUp,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/pearl-button.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Audit",
    subtitle: "Free 30-minute efficiency audit",
    description:
      "We audit your data landscape, current infrastructure, and workflow bottlenecks. What data do you have? Where are the manual steps? What does 'good' look like? We give you a clear engineering assessment.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    subtitle: "System architecture tailored to your problem",
    description:
      "We define the system architecture — data pipelines, model selection, agent orchestration, integration points, and deployment strategy. No templates. A custom engineering blueprint for your specific problem.",
  },
  {
    number: "03",
    icon: Code,
    title: "Build",
    subtitle: "Custom development on AWS",
    description:
      "RAG knowledge base ingestion, LangGraph agent orchestration, API integrations, evaluation pipelines. Production code deployed on your private AWS infrastructure. Not prompts — engineering.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy",
    subtitle: "Staged rollout in hybrid mode",
    description:
      "The AI runs alongside your staff in a hybrid model until it hits 99% reliability. We don't flip a switch and disappear. Your team stays in the loop, and the AI earns its place before it runs solo.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Optimize",
    subtitle: "Continuous monitoring and agent training",
    description:
      "Continuous monitoring, agent training based on real interactions, and ongoing builds as your needs grow. We refine responses, expand workflows, and scale the system. You stay because of results, not a contract.",
  },
];

export default function HowItWorks() {
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
              From Discovery to Deployment in Weeks, Not Months
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              We follow a structured engineering process because AI systems that work in production
              require more than prompts. Here's how we take you from "we need AI" to "our AI is generating revenue."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Five-Step Process */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-20 pb-16 last:pb-0"
              >
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div className="absolute left-[27px] top-14 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800" />
                )}

                {/* Step number circle */}
                <div className="absolute left-0 top-0 w-14 h-14 rounded-full border-2 border-foreground flex items-center justify-center bg-white dark:bg-black">
                  <step.icon className="w-6 h-6 text-foreground" />
                </div>

                <div>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    Step {step.number}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium mb-4">
                    {step.subtitle}
                  </p>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Technical Moat */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-zinc-100 dark:bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light text-foreground tracking-tight leading-tight mb-8">
              The Technical Moat
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Three things make Unkommon different from every other AI agency:
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 hover:border-zinc-300 dark:hover:border-gray-700 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">Private Infrastructure</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">Your Own AWS VPC</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Every system runs on the client's own AWS VPC (Virtual Private Cloud). Proprietary datasets, customer records, internal documents — none of it ever touches a public server. You own your data. Full stop.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"Our data never leaves our cloud."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 hover:border-zinc-300 dark:hover:border-gray-700 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">State-Based Architecture</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">LangGraph</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                We build using LangGraph — the same framework used by Uber, JP Morgan, BlackRock, and LinkedIn. These aren't chatbots that improvise. They're state machines — rigid logical systems that follow your business rules exactly and cannot be tricked, confused, or jailbroken.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"It can't go off-script. Ever."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 hover:border-zinc-300 dark:hover:border-gray-700 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">RAG Knowledge Base</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">Zero Hallucinations</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                We ingest your specific business data — internal documents, product catalogs, policy manuals, technical specs — into a private knowledge base. When a user asks a question, the AI pulls the answer from your documents. It never guesses. It never hallucinates.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"It won't make things up."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Everything you need to know about working with Unkommon
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  How does the AI know the specifics of my business?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We use Retrieval-Augmented Generation (RAG) to build a custom Knowledge Base specific to your business. We ingest your product documentation, policy manuals, internal knowledge bases, and support data. When a user asks a question, the agent references your documents to provide an accurate, cited answer. It does not guess.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Will my clients know they are talking to a robot?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Our voice agents utilize ultra-low latency models (sub-800ms response time) and are trained on natural human speech patterns, including pauses and filler words. While we recommend transparency, many clients report that callers often don't realize they are speaking to an AI until the end of the booking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  What happens if the AI gets confused or the caller is angry?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We design strict Escalation Protocols. If a caller expresses frustration or asks a complex question outside the agent's guardrails, the AI instantly acknowledges its limitation and executes a 'Hot Transfer' to a human staff member or takes a detailed message for priority review.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is the setup technical or time-consuming for me?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  No. Unkommon is a full-service consultancy, not a DIY platform. We handle the engineering, the CRM integrations, and the testing. Your only responsibility is a 60-minute Discovery Call to define your rules; we handle the deployment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Does this integrate with my existing software?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Yes. We build native API integrations into the systems you already use — Salesforce, HubSpot, ServiceNow, Jira, Confluence, Slack, and custom internal tools. The AI reads your real-time data and writes results directly into your existing workflows. No manual data entry required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b-0">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is my data secure? Are you HIPAA-compliant?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Absolutely. We build on your private AWS cloud with HIPAA-compliant infrastructure, end-to-end encryption, and isolated data environments. Your proprietary business data is siloed and is never used to train public models. No third-party "wrappers" touching your data.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Investment & ROI FAQ */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight mb-6">
              Investment & ROI
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We don't compete on price. We compete on returns.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="roi-1" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  What is the typical investment for an Unkommon system?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We don't sell "off-the-shelf" bots. We engineer proprietary assets tailored to your organization's specific workflows and compliance needs. Most engagements begin with a Fixed-Scope Implementation followed by a performance-based Optimization Retainer. Investment is scoped during your Architecture Review based on your specific requirements and the opportunity we identify.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roi-2" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Why don't you offer a $99/mo "Basic" plan?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Generic $99/mo chatbots are "stateless" wrappers. They often hallucinate, lack deep CRM integration, and pose significant data security risks. Unkommon builds State-Based Agentic Systems on your private AWS cloud. You are investing in an engineered workforce that has the authority to execute tasks — not just a window widget that chats.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roi-3" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  What is the expected ROI?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Our systems are designed to attack specific operational bottlenecks — reducing manual processing time, eliminating data entry errors, accelerating response times, and unlocking insights trapped in unstructured data. We quantify these numbers during your initial Architecture Review.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roi-4" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Do I own the AI systems you build?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Yes. Unlike SaaS platforms where you lose your data and logic if you stop paying, Unkommon builds your agents on your own AWS infrastructure. You own the knowledge base, the logic flows, and the data. We remain your engineering partners to monitor, scale, and optimize the system as your business grows.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="roi-5" className="border-b-0">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is there a long-term contract?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Our initial implementation is a fixed-price project. Once the system is live and generating value, most clients move to a monthly Optimization Retainer. This covers 24/7 monitoring, "agent training" (refining responses based on real interactions), and building out new automated workflows as needed. You stay because of the results, not a contract.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
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
              Start With a Free Architecture Review
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              30 minutes. No pressure. We'll assess your AI opportunity and outline a technical approach.
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
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>HIPAA-Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Stamford, CT Based</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
