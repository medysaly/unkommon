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
    subtitle: "Free 30-minute review",
    description:
      "We look at three things: how you show up in Google and in AI assistants, how fast inbound enquiries actually get answered, and where manual work is eating hours. You get a straight assessment, whether or not you work with us.",
  },
  {
    num: "02",
    title: "Plan",
    subtitle: "Fixed scope, fixed price",
    description:
      "We prioritise by what moves revenue, not by what is easiest to show on a report. You get a written scope, a price, and a timeline before anything starts. No hourly billing and no open-ended retainers.",
  },
  {
    num: "03",
    title: "Build",
    subtitle: "Copy and code, same team",
    description:
      "Content, structured data, site changes, and automation get built together rather than handed between vendors. Technical recommendations get implemented by the people who made them, which removes the slowest step in most engagements.",
  },
  {
    num: "04",
    title: "Launch",
    subtitle: "Measured from day one",
    description:
      "Tracking goes in before launch, not after, so the first month of data is usable. Where we deploy an agent, it runs alongside your team until it is handling calls correctly, and escalation paths are set before it takes a live call.",
  },
  {
    num: "05",
    title: "Report",
    subtitle: "Numbers you can check",
    description:
      "Monthly reporting on search rankings, AI citation rate against a fixed prompt set, response times, and conversions. If a retainer is not paying for itself, we would rather tell you than keep invoicing.",
  },
];

const moat = [
  {
    title: "One Team, Both Halves",
    subtitle: "Marketing and engineering",
    description:
      "Most SEO agencies cannot make code changes, and most development shops do not know what to change. We do both, so the recommendation and the implementation never get lost between two vendors pointing at each other.",
    quote: "We build what we recommend.",
  },
  {
    title: "Built To Be Read By Machines",
    subtitle: "Structured data and rendering",
    description:
      "GPTBot, ClaudeBot, and PerplexityBot fetch raw HTML and do not run JavaScript. We make sure your content exists in the HTML, your facts are marked up so they can be parsed, and the right crawlers can reach you.",
    quote: "If they can't read it, they can't cite it.",
  },
  {
    title: "Production, Not Pilots",
    subtitle: "Monitoring and cost control",
    description:
      "Around 88% of AI pilots never reach production. What kills them is integration, quality drift, missing monitoring, and unpredictable cost. We build for those from the start and stay accountable for uptime.",
    quote: "A demo is not a deployment.",
  },
];

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A website build is usually 4 to 8 weeks. An AI receptionist or speed-to-lead setup is typically 2 to 4 weeks. SEO and AI visibility are ongoing, with technical fixes landing in the first few weeks and content compounding over three to six months.",
  },
  {
    q: "What does the free audit include?",
    a: "A 30-minute call covering how you appear in search and in AI assistants, how quickly enquiries get answered today, and where manual work is going. You walk away with a clear picture of what is worth fixing and what it takes, even if you do not work with us.",
  },
  {
    q: "Do we have to buy everything at once?",
    a: "No, and most clients don't. People usually start with one thing, most often the website or the missed-call problem, and add the next once it is paying for itself. Each service works on its own.",
  },
  {
    q: "Can you work with our existing website?",
    a: "Usually yes. If the platform is sound we fix the rendering, structured data, and tracking rather than sell you a rebuild you do not need. We will tell you honestly which one your situation calls for.",
  },
  {
    q: "What if we already tried SEO or an AI tool and it didn't work?",
    a: "That is a common starting point. SEO engagements usually stall because nobody could ship the technical fixes. AI projects usually stall on integration, quality at volume, or no clear owner. We audit what actually went wrong before proposing anything.",
  },
  {
    q: "Is our data secure?",
    a: "Systems we build run on your own AWS account where you want that, with encryption in transit and at rest, least-privilege access, and audit logging. Your data is not used to train public models. For healthcare we build on HIPAA-eligible AWS services with BAA-ready architecture.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope, so we price each engagement individually. After the free call you get a fixed scope and a fixed price before any work begins. No hourly billing and no surprise invoices.",
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
