import { createPageUrl } from "@/lib/utils";
import { ArrowRight, Globe, Zap, Clock, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoLoop } from "@/components/LogoLoop";
import { useState } from "react";
import "@/styles/pearl-button.css";
import "@/styles/glass-cards.css";

// Agents data - shared between desktop and mobile views
const agents = [
  {
    id: 1,
    title: "Lead Automation",
    description: "A patient fills out your contact form. You respond in 60 seconds. Your competitor responds Monday morning. You win the appointment.",
    link: "Solutions",
    rotateY: 0,
    topPosition: "58%",
    leftPosition: "71%",
    rotation: 8,
  },
  {
    id: 2,
    title: "Voice AI Operations",
    description: "24/7 call handling, appointment booking, and inquiry routing — so your team only handles what requires a human.",
    link: "Solutions",
    rotateY: 0,
    topPosition: "65%",
    leftPosition: "40%",
    rotation: 8,
  },
  {
    id: 3,
    title: "Revenue Recovery",
    description: "Your dormant database has thousands in unrealized revenue. We turn cold contacts into booked appointments and recovered claims.",
    link: "Solutions",
    rotateY: 15,
    topPosition: "73%",
    leftPosition: "25%",
    rotation: 8,
  },
];

// Interactive Agents Image Component
const InteractiveAgentsImage = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="relative max-w-7xl mx-auto"
    >
      <div className="relative w-full">
        <img
          src="/images/backgrounds/AI agents .png"
          alt="AI Agents"
          className="w-full h-auto"
        />

        <div className="absolute inset-0 grid grid-cols-3 gap-0">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="relative flex flex-col items-center justify-center perspective-1000"
            >
              {/* Agent Name Label - Sitting on table under each agent - HOVER TRIGGER */}
              <div
                className="absolute pointer-events-auto z-30 cursor-pointer"
                style={{
                  top: agent.topPosition,
                  left: agent.leftPosition,
                  transform: `translateX(-50%) rotate(${agent.rotation}deg)`
                }}
                onMouseEnter={() => setHoveredCard(agent.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 dark:from-white/10 dark:via-white/20 dark:to-white/10 blur-xl"></div>
                  <div className="relative bg-white/70 dark:bg-black/50 backdrop-blur-xl px-5 py-2 rounded-full border border-white/40 dark:border-white/30 shadow-lg">
                    <p className="text-xs font-semibold text-foreground tracking-wide whitespace-nowrap">
                      {agent.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium Liquid Glass 3D Hover Card */}
              <AnimatePresence mode="wait">
                {hoveredCard === agent.id && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      rotateY: agent.rotateY,
                      z: -50,
                      scale: 0.85,
                    }}
                    animate={{
                      opacity: 1,
                      rotateY: 0,
                      z: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      rotateY: agent.rotateY,
                      z: -50,
                      scale: 0.85,
                    }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="absolute inset-16 pointer-events-auto cursor-pointer z-40"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity"
                    }}
                    onMouseEnter={() => setHoveredCard(agent.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => window.location.href = createPageUrl(agent.link)}
                  >
                    {/* Liquid glass card with enhanced glassmorphism */}
                    <div className="relative w-full h-full rounded-3xl p-6 flex flex-col justify-center items-center text-center backdrop-blur-xl"
                      style={{
                        background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15), inset 0 1px 0 0 rgba(255,255,255,0.3)",
                      }}
                    >
                      <div className="relative z-10">
                        {/* Title with text shadow only */}
                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight"
                          style={{
                            textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 4px 40px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,1)",
                          }}
                        >
                          {agent.title}
                        </h3>

                        {/* Description with text shadow only */}
                        <p className="text-base text-white font-semibold leading-relaxed mb-6"
                          style={{
                            textShadow: "0 2px 15px rgba(0,0,0,0.9), 0 4px 30px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,1)",
                          }}
                        >
                          {agent.description}
                        </p>

                        {/* Interactive Learn More Button - Subtle Glass */}
                        <button
                          className="group relative px-8 py-3 rounded-full font-bold text-base transition-all duration-300"
                          style={{
                            background: "rgba(255,255,255,0.15)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            boxShadow: "0 2px 10px rgba(255,255,255,0.1)",
                            color: "white",
                            textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                            e.currentTarget.style.boxShadow = "0 4px 15px rgba(255,255,255,0.2)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                            e.currentTarget.style.boxShadow = "0 2px 10px rgba(255,255,255,0.1)";
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                          }}
                        >
                          <span className="relative z-10">Learn More →</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};


export default function Home() {
  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Header & Subheader Position Controls - Responsive values
  const headerControls = {
    left: isMobile ? "0px" : "0px",
    top: isMobile ? "0px" : "0px",
    rotation: 0,
  };

  const subheaderControls = {
    left: isMobile ? "0px" : "0px",
    top: isMobile ? "0px" : "0px",
    rotation: 0,
  };

  // CTA Buttons Position Controls - Responsive values
  const ctaButtonsControls = {
    left: isMobile ? "0px" : "0px",
    top: isMobile ? "0px" : "0px",
    rotation: 0,
  };

  return (
    <div className="overflow-hidden -mt-20">
      {/* Hero Section */}
      <section
        className="hero-section relative px-4 sm:px-6 lg:px-8 pt-20 pb-8 overflow-hidden min-h-[500px] sm:min-h-[700px] md:min-h-screen flex items-start bg-white dark:bg-black"
        style={{
          backgroundImage: "url('/images/backgrounds/header.png')",
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat"
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .hero-section {
              background-size: auto 300px !important;
              background-position: bottom center !important;
              min-height: 400px !important;
            }
          }
        `}</style>
        <div className="max-w-7xl mx-auto relative z-10 w-full h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-[100px] sm:mt-[80px] md:mt-[60px] flex flex-col flex-1"
          >
            <div
              className="relative mb-6"
              style={{
                left: headerControls.left,
                top: headerControls.top,
                transform: `rotate(${headerControls.rotation}deg)`,
                transformOrigin: "left center"
              }}
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white tracking-tight"
                data-testid="heading-hero-title"
              >
                They sell you a chatbot.
                <br />
                We build you an automated workforce.
              </motion.h1>
            </div>

            <div
              className="relative mb-10"
              style={{
                left: subheaderControls.left,
                top: subheaderControls.top,
                transform: `rotate(${subheaderControls.rotation}deg)`,
                transformOrigin: "left center"
              }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl"
                data-testid="text-hero-description"
              >
                Production-grade, agentic AI systems for dental practices, legal firms, and professional services. HIPAA-compliant. AWS-native. Engineered to recover revenue.
              </motion.p>
            </div>

          </motion.div>
        </div>

        {/* CTA Buttons - Absolute bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute bottom-8 left-0 right-0 z-10 flex flex-col sm:flex-row gap-4 justify-center px-4"
        >
          <button
            className="pearl-button pearl-button-dark"
            data-testid="button-see-solutions"
            onClick={() => window.location.href = createPageUrl("Solutions")}
          >
            <div className="wrap">
              <p>
                <span>✧</span>
                See Our Solutions
                <ArrowRight className="w-5 h-5" />
              </p>
            </div>
          </button>
          <button
            className="pearl-button pearl-button-dark"
            data-testid="button-book-audit"
            onClick={() => window.location.href = createPageUrl("Contact")}
          >
            <div className="wrap">
              <p>
                <span>✦</span>
                Book Your AI Audit
              </p>
            </div>
          </button>
        </motion.div>
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
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Dental Practices</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Law Firms</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Professional Services</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Dental Practices</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Law Firms</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Professional Services</span> },
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
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light text-foreground tracking-tight leading-tight mb-8">
              Three AI Systems. One Automated Workforce.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Each system works independently or together — covering your calls, leads, and dormant revenue 24/7.
            </p>
          </motion.div>

          {/* Desktop: Interactive AI Agents Image with 3D Hover Cards */}
          <div className="hidden md:block">
            <InteractiveAgentsImage />
          </div>

          {/* Mobile: Image + Buttons Below */}
          <div className="block md:hidden">
            {/* AI Agents Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <img
                src="/images/backgrounds/AI agents .png"
                alt="AI Agents"
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>

            {/* Three Agent Buttons */}
            <div className="space-y-4 px-4">
              {agents.map((agent, index) => (
                <motion.button
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => window.location.href = createPageUrl(agent.link)}
                  className="w-full text-left p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 active:scale-95"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                  }}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {agent.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {agent.description}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground text-lg mb-6">
              Each system works independently or together as a unified AI workforce
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

      {/* Metrics Strip */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-zinc-100 dark:bg-zinc-900/30 border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">&lt;60s</h3>
              <p className="text-muted-foreground text-sm">Lead Response Time</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">70%</h3>
              <p className="text-muted-foreground text-sm">Admin Work Reduction</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">24/7</h3>
              <p className="text-muted-foreground text-sm">Call Coverage</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">HIPAA</h3>
              <p className="text-muted-foreground text-sm">Compliant Infrastructure</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Deployment Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight mb-6">
                We Deploy Worldwide
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Your AI agents work everywhere, anytime. Deploy across multiple regions, languages, and time zones with seamless integration into your global operations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-3xl font-light text-foreground mb-2">50+</h3>
                  <p className="text-muted-foreground">Languages Supported</p>
                </div>
                <div>
                  <h3 className="text-3xl font-light text-foreground mb-2">24/7</h3>
                  <p className="text-muted-foreground">Global Coverage</p>
                </div>
                <div>
                  <h3 className="text-3xl font-light text-foreground mb-2">99.9%</h3>
                  <p className="text-muted-foreground">Uptime Guarantee</p>
                </div>
                <div>
                  <h3 className="text-3xl font-light text-foreground mb-2">∞</h3>
                  <p className="text-muted-foreground">Scalability</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Globe, label: "50+ Languages", desc: "Auto-detect and respond in your patient's or client's native language" },
                { icon: Clock, label: "24/7 Coverage", desc: "No missed calls, no after-hours voicemail, no lost leads" },
                { icon: Shield, label: "99.9% Uptime", desc: "AWS-native infrastructure with enterprise-grade reliability" },
                { icon: Zap, label: "Infinite Scale", desc: "Handle 1 call or 1,000 concurrent — no extra staff needed" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="p-6 rounded-2xl border border-white/10 bg-white/5"
                >
                  <item.icon className="w-8 h-8 text-white/60 mb-3" />
                  <h4 className="text-xl font-medium text-foreground mb-1">{item.label}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-black" style={{ zIndex: 20 }}>
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
              Stop Settling for Off-the-Shelf AI
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Let's engineer a system that actually works for your practice.
              Start with a free 30-minute AI Systems Audit.
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
                data-testid="button-see-solutions"
                onClick={() => window.location.href = createPageUrl("Solutions")}
              >
                <div className="wrap">
                  <p>
                    <span>✧</span>
                    See Our Solutions
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
              <button
                className="pearl-button"
                data-testid="button-book-audit"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Book Your AI Audit
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
