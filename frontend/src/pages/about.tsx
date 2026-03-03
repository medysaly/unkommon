import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import "@/styles/pearl-button.css";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function About() {
  const builtDifferent = [
    { title: "You Choose the AI", description: "Unlike cookie-cutter tools locked to one model, you pick the LLM that fits your needs and budget. GPT-4, Claude, Gemini — or any combination. Your AI, your rules." },
    { title: "Your Data Stays Yours", description: "Hosted on AWS in a secure, isolated environment. No shared databases. No third-party access. Your patient records, client files, and case data — nobody touches them but you." },
    { title: "Trained on YOUR Business", description: "We train the AI on your actual data: your services, your pricing, your FAQs, your tone of voice. It doesn't hallucinate generic answers — it responds like your best employee because it knows your business inside out." },
    { title: "Custom-Built, Not Templated", description: "Every AI agent is built specifically for your practice or firm. We study your workflow, your bottlenecks, your clients. The result fits like a glove — not a one-size-fits-all tool your competitors are also using." },
    { title: "Zero Hallucinations", description: "We implement strict guardrails so your AI never makes up information. It uses only verified data from your business. No fabricated pricing. No wrong appointment times. No embarrassing mistakes. Just reliable, on-brand responses every time." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black -mt-20">
      {/* Section 1: Clean Background Hero */}
      <section
        className="about-hero relative overflow-hidden min-h-[400px] sm:min-h-[600px] md:min-h-screen pt-20"
        style={{
          backgroundImage: "url('/images/backgrounds/About.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat"
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

      {/* Section 2: Philosophy Content */}
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
              Our Philosophy
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-8 leading-tight"
              data-testid="heading-page-title"
            >
              Human talent is too expensive to be wasted on repetitive tasks.
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
                The modern business is leaking potential. High-value staff are drowning in low-value data entry. Phones are ringing unanswered. Leads are growing cold in spreadsheets.
              </p>
              <p>
                We formed <span className="text-foreground font-medium">unkommon</span> to solve a specific engineering problem: How do we scale the personal touch of a business without scaling the payroll?
              </p>
              <p className="text-foreground font-medium">
                The answer is not "hiring more people." The answer is intelligent infrastructure.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The "Anti-Agency" Stance */}
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
              <p>
                <span className="text-foreground font-medium">Unkommon is different.</span> We approach automation with a computer science discipline. We build bespoke, cloud-native architectures that respect data security, system uptime, and logical rigor.
              </p>
              <p className="text-foreground font-medium">
                We don't just write prompts; we write code.
              </p>
            </div>
          </motion.div>

          {/* Tech Stack Transparency */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-light text-foreground tracking-tight mb-4">
                Built Different
              </h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Here's why businesses in real estate, dental, and law choose Unkommon over generic AI tools.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {builtDifferent.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-foreground/30 transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-foreground mb-3">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: The Leadership */}
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
                  {/* Image */}
                  <div className="flex-shrink-0 mx-auto md:mx-0">
                    <img
                      src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/7a75c6f87_mehdi.jpg"
                      alt="Mehdi Salhi"
                      className="w-40 h-40 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-300 border-4 border-foreground/10"
                      data-testid="img-founder"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <h3 className="text-3xl font-light text-foreground tracking-tight mb-2" data-testid="heading-founder-name">
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
                        With a background in Computer Science and a specialization in Cloud Infrastructure, Mehdi built <span className="text-foreground font-medium">unkommon</span> to bridge the gap between enterprise-grade technology and local business application.
                      </p>
                      <p>
                        Frustrated by the fragility of off-the-shelf automation tools, he focuses on designing robust, state-based AI agents that operate with the reliability of a dedicated employee.
                      </p>
                      <p>
                        He leads the engineering strategy, ensuring every deployed agent meets strict standards for latency, security, and brand alignment.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Section 4: The Location */}
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
                Engineered in NYC.
              </h2>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              We are a North American consultancy with locations in New York City, Stamford CT, Orlando Florida, and Vancouver Island Canada. We understand the nuances of the market, the importance of compliance, and the speed of business. When you hire Unkommon, you are hiring a partner within your time zone.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-lg text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>New York City</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Stamford, CT</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Orlando, FL</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Vancouver Island, BC</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: The Closing Statement */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-12 leading-tight"
              data-testid="heading-cta"
            >
              The future is not AI replacing humans.
              <br />
              The future is AI empowering humans.
            </motion.h2>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="pearl-button"
                data-testid="button-work-with-us"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Work With Us
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-foreground" />
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-foreground" />
                <span>US-Based</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-foreground" />
                <span>Enterprise Security</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
