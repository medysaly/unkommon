import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import DarkVeil from "@/components/DarkVeil";
import { LogoLoop } from "@/components/LogoLoop";
import "@/styles/pearl-button.css";
import "@/styles/glass-cards.css";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden min-h-screen flex items-center bg-white dark:bg-black">

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground tracking-tight"
              data-testid="heading-hero-title"
            >
              Unkommon
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
              data-testid="text-hero-description"
            >
              Transform Your Business with Intelligent AI. We design and deploy custom AI solutions that streamline
              operations, enhance customer experiences, and drive measurable
              growth for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="pearl-button"
                data-testid="button-try-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                <div className="wrap">
                  <p>
                    <span>✧</span>
                    Try Live Demo
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
              <button
                className="pearl-button"
                data-testid="button-schedule-consultation"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Schedule Consultation
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Section with Logo Loop */}
      <section className="py-16 bg-white dark:bg-black border-y border-border/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider"
          >
            Serving Industries Worldwide
          </motion.p>
        </div>
        <div className="w-full">
          <LogoLoop
            logos={[
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Healthcare</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Legal Services</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Accounting and Finance</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Real Estate</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Property Management</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Home Services</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Restaurants and Bars</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Hospitality</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Retail</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">E-commerce</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Education and Training</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Manufacturing</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Logistics</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Human Resources</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Recruiting</span> },
            ]}
            speed={50}
            direction="left"
            logoHeight={40}
            gap={64}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="transparent"
            scaleOnHover={true}
          />
        </div>
      </section>

      {/* AI Agent Ecosystem Diagrams Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Our Complete AI Agent Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how each AI agent seamlessly integrates with your existing systems to automate operations end-to-end
            </p>
          </motion.div>

          {/* Glass Cards Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-container"
          >
            {/* AI Receptionist Card */}
            <div
              className="glass-card"
              style={{ "--r": -15 } as React.CSSProperties}
              onClick={() => window.location.href = createPageUrl("AIReceptionist")}
            >
              <div className="glass-card-image">
                <img
                  src="/images/backgrounds/AI receptionist.jpeg"
                  alt="AI Receptionist System"
                />
              </div>
              <div className="glass-card-content">
                <h3 className="glass-card-title">AI Receptionist</h3>
                <p className="glass-card-description">
                  24/7 phone automation with natural conversations and CRM integration
                </p>
              </div>
              <div className="glass-card-label">AI Receptionist</div>
            </div>

            {/* Speed to Lead Card */}
            <div
              className="glass-card"
              style={{ "--r": 0 } as React.CSSProperties}
              onClick={() => window.location.href = createPageUrl("SpeedToLead")}
            >
              <div className="glass-card-image">
                <img
                  src="/images/backgrounds/Speed to lead.jpeg"
                  alt="Speed to Lead System"
                />
              </div>
              <div className="glass-card-content">
                <h3 className="glass-card-title">Speed-to-Lead</h3>
                <p className="glass-card-description">
                  Instant lead qualification and engagement before competitors respond
                </p>
              </div>
              <div className="glass-card-label">Speed-to-Lead</div>
            </div>

            {/* AI Booking System Card */}
            <div
              className="glass-card"
              style={{ "--r": 15 } as React.CSSProperties}
              onClick={() => window.location.href = createPageUrl("AIBookingSystem")}
            >
              <div className="glass-card-image">
                <img
                  src="/images/backgrounds/AI booking system.jpeg"
                  alt="AI Booking System"
                />
              </div>
              <div className="glass-card-content">
                <h3 className="glass-card-title">AI Booking System</h3>
                <p className="glass-card-description">
                  WhatsApp & SMS booking automation with calendar sync 24/7
                </p>
              </div>
              <div className="glass-card-label">AI Booking System</div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground text-lg mb-6">
              Each agent works independently or together as a unified system
            </p>
            <button
              className="pearl-button"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              <div className="wrap">
                <p>
                  <span>✦</span>
                  Schedule a System Demo
                  <ArrowRight className="w-5 h-5" />
                </p>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black" style={{ zIndex: 20 }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="p-12 md:p-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 text-foreground tracking-tight"
              data-testid="heading-cta-section"
            >
              Ready to See AI Automation in Action?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Experience our AI Receptionist live demo and discover how it can
              transform your business
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="pearl-button"
                data-testid="button-try-interactive-demo"
                onClick={() => window.location.href = createPageUrl("AIAgents")}
              >
                <div className="wrap">
                  <p>
                    <span>✧</span>
                    Try Interactive Demo
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
              <button
                className="pearl-button"
                data-testid="button-schedule-setup-call"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Schedule Your Setup Call
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
