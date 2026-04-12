import { createPageUrl } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { CTAButton } from "@/components/CTAButton";
import { HeroBackground } from "@/components/HeroBackground";

const services = [
  {
    title: "Custom RAG Systems",
    description: "Retrieval-augmented generation pipelines over your proprietary data. Your AI answers from your documents, never hallucinates.",
    outcome: "Your team gets answers in seconds, not hours.",
    tags: ["Document Ingestion", "Vector Search", "Citation Tracking"],
  },
  {
    title: "AI Agent Development",
    description: "Multi-agent systems that automate complex workflows. Stateful orchestration, decision logic, and human-in-the-loop escalation.",
    outcome: "Replace manual workflows that cost 20+ hours per week.",
    tags: ["LangGraph", "Workflow Orchestration", "Stateful Agents"],
  },
  {
    title: "ML Consulting",
    description: "Architecture design, model selection, fine-tuning strategy, and evaluation frameworks. From proof-of-concept to production.",
    outcome: "Know exactly where AI fits before you spend a dollar building.",
    tags: ["Model Selection", "Architecture Design", "Evaluation"],
  },
  {
    title: "AI Infrastructure",
    description: "Production-grade deployment on AWS. Containerization, CI/CD, monitoring, auto-scaling, and cost optimization.",
    outcome: "Ship to production with confidence: monitoring, scaling, and CI/CD included.",
    tags: ["AWS Deployment", "CI/CD", "Auto-Scaling"],
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
            We engineer the AI systems your business can't buy off the shelf.
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
            Four engineering disciplines.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-12 max-w-2xl">
            Each discipline works independently or together, from data pipeline to production deployment.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {services.map((service, i) => (
              <Link key={service.title} href={createPageUrl("Solutions")}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-left p-8 bg-white rounded-xl border border-border hover:border-foreground/20 transition-all cursor-pointer h-full"
                >
                  <h3 className="text-[18px] font-medium text-foreground mb-2">{service.title}</h3>
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

          <div className="text-center mt-12">
            <Link
              href={createPageUrl("Solutions")}
              className="text-[14px] text-foreground font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-1.5"
            >
              See all solutions
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Have a problem that off-the-shelf AI can't solve?
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute architecture review. I'll audit your workflows, find the bottlenecks,
            and show you exactly where AI moves the needle.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
