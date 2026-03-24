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
      "We identify bottlenecks, map your current workflow, and quantify the opportunity. Where are calls being missed? How fast are leads being contacted? What's sitting dormant in your CRM? We give you the numbers.",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Design",
    subtitle: "System architecture tailored to your practice",
    description:
      "We define the state machine, knowledge base, and escalation protocols specific to your industry, data sources, and integration requirements. No templates — a custom blueprint for your operations.",
  },
  {
    number: "03",
    icon: Code,
    title: "Build",
    subtitle: "Custom development on AWS",
    description:
      "RAG knowledge base ingestion, LangGraph agent orchestration, CRM integrations, voice AI configuration. Production code deployed on your private AWS infrastructure. Not prompts — engineering.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Deploy",
    subtitle: "Staged rollout with monitoring",
    description:
      "Your AI goes live alongside existing staff in a hybrid model. We monitor in real-time, tune response quality, and ensure zero disruption to current operations. Your team stays in the loop.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Optimize",
    subtitle: "Ongoing performance monitoring",
    description:
      "Monthly reporting on calls handled, leads qualified, appointments booked, and revenue recovered. Continuous conversation analysis and improvement. The system gets smarter over time.",
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

      {/* Engineering Standard Section */}
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
              We Don't Just Prompt. We Engineer.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Most agencies rely on generic models and template configurations. Unkommon builds proprietary, state-based architectures using advanced retrieval systems. The result is an AI that never hallucinates and follows your business rules with mathematical precision.
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
              <h3 className="text-2xl font-semibold text-foreground mb-3">Zero Hallucinations</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">RAG Architecture</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                We use RAG technology to vector-embed your specific company data — PDFs, websites, price lists — into a private knowledge base. When a client asks a question, the agent retrieves the exact answer from your documents. It never invents facts.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"It won't lie to my patients."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 hover:border-zinc-300 dark:hover:border-gray-700 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">Rigid Logic Flows</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">LangGraph</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                We build agents using LangGraph to enforce strict, cyclical state machines. The conversation follows a rigid logical path (Qualify &rarr; Schedule &rarr; Confirm) and cannot be tricked into going off-script or skipping steps.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"It won't go rogue or say crazy things."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-white dark:bg-[#1a1a1a] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 hover:border-zinc-300 dark:hover:border-gray-700 transition-all duration-300 shadow-sm"
            >
              <h3 className="text-2xl font-semibold text-foreground mb-3">Enterprise Reliability</h3>
              <p className="text-sm text-muted-foreground mb-4 font-medium">AWS Cloud</p>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                Built on Amazon Web Services with HIPAA-compliant infrastructure. 99.9% uptime, bank-grade encryption, and the ability to scale from 10 calls to 10,000 calls instantly without latency.
              </p>
              <div className="pt-4 border-t border-zinc-200 dark:border-gray-800">
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Why This Wins:</p>
                <p className="text-sm text-muted-foreground italic">"It won't crash. And my patient data is safe."</p>
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
                  We use Retrieval-Augmented Generation (RAG) to build a custom Knowledge Base specific to your business. For a dental practice, we ingest your services, insurance accepted, and appointment types. For a law firm, your practice areas and intake criteria. When a client asks a question, the agent references your documents to provide an accurate answer. It does not guess.
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
                  Yes. We build native API integrations into the systems you already use — Dentrix and Open Dental for dental practices, Clio and MyCase for law firms, Salesforce and HubSpot for professional services. The AI reads your real-time calendar availability and writes lead data directly into your client fields. No manual data entry required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is my data secure? Are you HIPAA-compliant?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Absolutely. We build on your private AWS cloud with HIPAA-compliant infrastructure, end-to-end encryption, and isolated data environments. Your proprietary business data is siloed and is never used to train public models. No third-party "wrappers" touching your patient or client data.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  What is the typical investment?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We design custom infrastructure, so investment varies by complexity. Most engagements start with a one-time Deployment Fee (covering architecture & setup) and a monthly Maintenance Retainer. This is roughly 15% of the cost of hiring a human employee for the same role. We'll scope exact pricing during your free AI Systems Audit.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-b-0">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Are there hidden fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Transparency is key. Your monthly package includes a set number of talk minutes (usually sufficient for 95% of businesses). If you have a massive surge in call volume, we offer simple pay-as-you-go rates for the extra usage — no surprise bills.
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
              Start With a Free Audit
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              30 minutes. No pressure. We'll map your workflow bottlenecks and show you exactly what we can automate and the ROI you can expect.
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
