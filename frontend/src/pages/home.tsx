import { createPageUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CTAButton } from "@/components/CTAButton";
import { HeroBackground } from "@/components/HeroBackground";

const services = [
  {
    slug: "rag-systems",
    title: "AI That Knows Your Business",
    subtitle: "Custom RAG Systems",
    description: "Retrieval-augmented generation pipelines over your proprietary data. Answers are sourced, cited, and traceable back to your documents.",
    outcome: "Your team and customers get instant answers from your data, no more digging through documents.",
    tags: ["Document Ingestion", "Vector Search", "Citation Tracking"],
  },
  {
    slug: "ai-agents",
    title: "Agents That Do The Work",
    subtitle: "AI Agent Development",
    description: "Multi-agent systems that automate complex workflows. Stateful orchestration, decision logic, and human-in-the-loop escalation.",
    outcome: "Replace 20+ hours per week of manual work so your team focuses on what actually grows revenue.",
    tags: ["LangGraph", "Workflow Orchestration", "Stateful Agents"],
  },
  {
    slug: "ml-consulting",
    title: "Know Where AI Actually Fits",
    subtitle: "ML Consulting & Strategy",
    description: "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. From proof-of-concept to production.",
    outcome: "Know exactly where AI pays off before you spend a dollar building.",
    tags: ["Model Selection", "Architecture Design", "Evaluation"],
  },
  {
    slug: "ai-infrastructure",
    title: "Ship AI Without Breaking Production",
    subtitle: "AI Infrastructure & Deployment",
    description: "Production-grade deployment on AWS. Containerization, CI/CD, monitoring, auto-scaling, and cost optimization.",
    outcome: "Ship with confidence. We handle the infrastructure so you don't wake up to 3am outages.",
    tags: ["AWS Deployment", "CI/CD", "Auto-Scaling"],
  },
  {
    slug: "voice-ai",
    title: "Answer Every Customer, 24/7",
    subtitle: "Chatbots & Voice AI",
    description: "AI chatbots and voice agents that handle customer questions, bookings, and lead capture. Web chat, phone answering, or messaging channels.",
    outcome: "Never miss a lead or a customer question again, without adding support staff.",
    tags: ["Voice AI", "Phone Answering", "Omnichannel"],
  },
  {
    slug: "fine-tuning",
    title: "AI That Speaks Your Industry",
    subtitle: "Fine-tuning & Domain Models",
    description: "Fine-tuned LLMs trained on your domain data. Dental, legal, real estate, finance, healthcare.",
    outcome: "An AI that actually understands your work, not one that guesses like a generalist.",
    tags: ["Fine-tuning", "Domain Models", "Vertical AI"],
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-background px-6 lg:px-10 pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-8"
          >
            The AI partner for small and mid-sized businesses.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CTAButton href={createPageUrl("BookACall")}>
              Let's talk
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Four Engineering Disciplines */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-4">
            How we move your business forward.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-12 max-w-2xl">
            Six ways we cut costs, save hours, and turn your operations into autopilot. Each one works on its own or combined with the others.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <Link key={service.title} href={`/solutions/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-left p-8 bg-white rounded-xl border border-border hover:border-foreground/20 transition-all cursor-pointer h-full"
                >
                  <h3 className="text-[18px] font-medium text-foreground mb-1">{service.title}</h3>
                  <p className="text-[12px] text-muted-foreground font-medium mb-3">{service.subtitle}</p>
                  <p className="text-[14px] text-secondary-foreground leading-relaxed mb-3">{service.description}</p>
                  <p className="text-[14px] text-foreground font-medium mb-4">{service.outcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[12px] text-muted-foreground bg-muted px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            See where AI fits in your business.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. We'll look at where AI can cut costs, save hours, or open new revenue in your business, no pitch, no obligation.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
