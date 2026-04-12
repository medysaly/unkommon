import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">i</span>
            <span className="text-[13px] text-muted-foreground">Who I Am</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-4xl mb-8"
          >
            They sell you a chatbot. I build you an automated workforce.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-secondary-foreground leading-relaxed max-w-2xl"
          >
            Unkommon is a solo engineering studio. I don't just "do AI." I engineer production-grade, agentic systems that live inside
            your core business logic. Leveraging AWS and custom ML orchestration, I build high-security,
            HIPAA-compliant systems for companies with complex data and regulated environments.
          </motion.p>
        </div>
      </section>

      {/* What I Do */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-4 max-w-3xl">
            I'm not a marketer. I'm a systems engineer.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-12 max-w-2xl">
            There is a gold rush in AI right now. Thousands of agencies have sprung up overnight, offering "magic"
            solutions that are nothing more than thin wrappers around public tools. I don't write prompts; I write code.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-background rounded-xl border border-border">
              <h3 className="text-lg font-medium text-foreground mb-3">Custom RAG Systems</h3>
              <p className="text-[14px] text-secondary-foreground leading-relaxed">
                Retrieval-augmented generation pipelines that ground AI outputs in your proprietary data. Vector databases,
                embedding optimization, and citation tracking.
              </p>
            </div>
            <div className="p-8 bg-background rounded-xl border border-border">
              <h3 className="text-lg font-medium text-foreground mb-3">AI Agent Development</h3>
              <p className="text-[14px] text-secondary-foreground leading-relaxed">
                Multi-agent systems built on LangGraph for complex workflow automation. Document processing,
                decision logic, state management, and human-in-the-loop escalation.
              </p>
            </div>
            <div className="p-8 bg-background rounded-xl border border-border">
              <h3 className="text-lg font-medium text-foreground mb-3">ML Consulting & Infrastructure</h3>
              <p className="text-[14px] text-secondary-foreground leading-relaxed">
                Architecture design, model selection, evaluation frameworks, and production-grade AWS deployment.
                From proof-of-concept to scaled infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We're Not */}
      <section className="bg-border px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-10">
            What I'm not.
          </h2>
          <div className="space-y-5">
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
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 text-[17px] text-secondary-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-[18px] text-foreground font-medium max-w-xl leading-relaxed">
            I'm an engineering partner. The systems I build become infrastructure your business runs on.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-normal tracking-tight mb-1">Mehdi Salhi</h3>
              <p className="text-[14px] text-white/60 mb-8">Founder & Lead Engineer</p>
              <div className="space-y-4 text-[15px] text-white/60 leading-relaxed">
                <p>
                  I built Unkommon because I kept seeing the same problem: companies spending months with AI agencies
                  and getting nothing that works in production. Chatbot demos that impressed in meetings but broke on
                  real data. RAG systems that hallucinated. Agents that couldn't handle edge cases.
                </p>
                <p>
                  So I started building the systems myself. Every RAG pipeline, every multi-agent workflow, every AWS
                  deployment. I design, build, and ship it personally. No account managers. No junior devs learning
                  on your project. When you work with Unkommon, you work with me.
                </p>
                <p className="text-white/80">
                  Background: Computer Science (SNHU), AWS cloud infrastructure, Python/LangChain/LangGraph, production ML systems. Based in Stamford, CT.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/mehdi-salhi-work/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-white mt-6 hover:opacity-70 transition-opacity"
              >
                Connect on LinkedIn
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/7a75c6f87_mehdi.jpg"
                alt="Mehdi Salhi, Founder and Engineer at Unkommon"
                className="w-64 h-64 md:w-80 md:h-80 rounded-xl object-cover grayscale"
                width={320}
                height={320}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-foreground" />
            <h2 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight">
              Based in Stamford, CT.
            </h2>
          </div>
          <p className="text-[17px] text-secondary-foreground leading-relaxed max-w-xl mx-auto">
            US-based. Available for remote engagements worldwide.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Stop settling for off-the-shelf AI.
            <br />
            Let's engineer a system that works.
          </h2>
          <CTAButton href={createPageUrl("BookACall")} variant="light" className="mt-4">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
