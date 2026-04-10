import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import "@/styles/pearl-button.css";
import {
  ArrowRight,
  CheckCircle,
  MapPin,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-black -mt-20">
      {/* Section 1: Clean Background Hero */}
      <section
        className="about-hero relative overflow-hidden min-h-[400px] sm:min-h-[600px] md:min-h-screen pt-20"
        style={{
          backgroundImage: "url('/images/backgrounds/About.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .about-hero {
              background-size: auto 300px !important;
              background-position: top center !important;
              min-height: 350px !important;
            }
          }
        `}</style>
      </section>

      {/* Section 2: Core Identity */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-sm uppercase tracking-wider text-muted-foreground mb-6"
            >
              Who We Are
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-8 leading-tight"
              data-testid="heading-page-title"
            >
              They sell you a chatbot. We build you an automated workforce.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto space-y-6"
              data-testid="text-hero-description"
            >
              <p>
                Most "AI Agencies" in 2026 are just configuring third-party wrappers and Zapier templates.
              </p>
              <p>
                At <span className="text-foreground font-medium">Unkommon</span>, we don't just "do AI." We engineer production-grade, agentic systems that live inside your core business logic.
              </p>
              <p>
                As a systems-first consultancy, we specialize in bridging the gap between "we tried ChatGPT" and "we have production AI infrastructure." Leveraging AWS and custom ML orchestration, we build high-security, HIPAA-compliant systems for companies with complex data, regulated environments, and workflows that off-the-shelf tools can't handle.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: What We Solve */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight mb-8 leading-tight">
              We are not marketers. We are systems engineers.
            </h2>

            <div className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto space-y-6">
              <p>
                There is a gold rush in Artificial Intelligence right now. Thousands of agencies have sprung up overnight, offering "magic" solutions that are nothing more than thin wrappers around public tools.
              </p>
              <p className="text-foreground font-medium">
                We don't just write prompts; we write code.
              </p>
            </div>
          </motion.div>

          {/* What We Solve Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-tight mb-4">
                What We Solve
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-foreground/30 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">Custom RAG Systems</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Retrieval-augmented generation pipelines that ground AI outputs in your proprietary data. Vector databases, embedding optimization, and citation tracking — so your AI answers from your documents, never hallucinates.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-foreground/30 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">AI Agent Development</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Multi-agent systems built on LangGraph for complex workflow automation. Document processing, decision logic, state management, and human-in-the-loop escalation — production agents, not chatbot prototypes.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-foreground/30 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">ML Consulting & Infrastructure</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Architecture design, model selection, evaluation frameworks, and production-grade AWS deployment. From proof-of-concept to scaled infrastructure.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: What We're Not */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4">
              What We're Not
            </h2>
          </motion.div>

          <div className="space-y-5 max-w-2xl mx-auto">
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

      {/* Section 5: The Leadership */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-card border-border hover:shadow-2xl transition-all duration-300">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/7a75c6f87_mehdi.jpg"
                      alt="Mehdi Salhi"
                      className="w-40 h-40 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 border-4 border-foreground/10"
                      data-testid="img-founder"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="mb-6">
                      <h3
                        className="text-3xl font-light text-foreground tracking-tight mb-2"
                        data-testid="heading-founder-name"
                      >
                        Mehdi Salhi
                      </h3>
                      <p className="text-lg text-foreground font-medium mb-4">
                        Founder & Lead Systems Architect
                      </p>
                      <a
                        href="https://www.linkedin.com/in/mehdi-salhi-work/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
                        data-testid="link-founder-linkedin"
                      >
                        Connect on LinkedIn
                      </a>
                    </div>

                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                      <p>
                        With a background in Computer Science and a specialization in Cloud Infrastructure and ML engineering, Mehdi built{" "}
                        <span className="text-foreground font-medium">unkommon</span> to bridge the gap between enterprise-grade AI technology and the companies that need it most.
                      </p>
                      <p>
                        Frustrated by the fragility of off-the-shelf automation tools and the commoditization of "AI agencies," he focuses on designing production-grade, agentic systems built on AWS — with strict standards for HIPAA compliance, latency, and measurable ROI.
                      </p>
                      <p>
                        He leads the engineering strategy, ensuring every deployed system operates with the reliability and security that regulated industries and complex enterprises demand.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Location */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-foreground" />
              <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight">
                Based in Stamford, CT.
              </h2>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Engineering the future of SMB operations. We understand regulated industries, the importance of compliance, and the speed of enterprise AI adoption. When you hire Unkommon, you're hiring a partner within your time zone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Closing CTA */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-12 leading-tight"
              data-testid="heading-cta"
            >
              Stop settling for off-the-shelf AI.
              <br />
              Let's engineer a system that works.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="pearl-button"
                data-testid="button-book-audit"
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
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>HIPAA-Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-foreground" />
                <span>Stamford, CT Based</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
