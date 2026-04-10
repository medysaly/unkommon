import { createPageUrl } from "@/lib/utils";
import { ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { LogoLoop } from "@/components/LogoLoop";
import { World } from "@/components/ui/globe";
import type { GlobeConfig } from "@/components/ui/globe";
import "@/styles/pearl-button.css";
import "@/styles/glass-cards.css";

// Services data - shared between desktop and mobile views
const services = [
  {
    id: 1,
    title: "Custom RAG Systems",
    description: "We build retrieval-augmented generation pipelines over your proprietary data — so your AI answers from your documents, not the internet.",
    link: "Solutions",
  },
  {
    id: 2,
    title: "AI Agent Development",
    description: "Multi-agent systems that automate complex workflows — document processing, decision automation, and stateful orchestration.",
    link: "Solutions",
  },
  {
    id: 3,
    title: "ML Consulting",
    description: "Architecture design, model selection, LLM integration, and evaluation frameworks. From proof-of-concept to production.",
    link: "Solutions",
  },
  {
    id: 4,
    title: "AI Infrastructure",
    description: "Production-grade deployment on AWS. Containerization, CI/CD, monitoring, and auto-scaling.",
    link: "Solutions",
  },
];

const globeConfig: GlobeConfig = {
  pointSize: 4,
  globeColor: "#0f172a",
  showAtmosphere: true,
  atmosphereColor: "#60a5fa",
  atmosphereAltitude: 0.2,
  emissive: "#1e3a8a",
  emissiveIntensity: 0.15,
  shininess: 0.9,
  polygonColor: "rgba(56, 189, 248, 0.8)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 3000,
  arcLength: 0.9,
  rings: 2,
  maxRings: 3,
  initialPosition: { lat: 20, lng: 0 },
  autoRotate: true,
  autoRotateSpeed: 0.8,
};

const sampleArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: "#38bdf8",
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: "#38bdf8",
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: "#38bdf8",
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: "#38bdf8",
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: "#38bdf8",
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: "#38bdf8",
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: "#38bdf8",
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: "#38bdf8",
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: "#38bdf8",
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: "#38bdf8",
  },
];

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
                Bespoke AI/ML systems for companies that need something off-the-shelf can't handle. RAG pipelines. Multi-agent architectures. Production AWS infrastructure.
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
                Book an Architecture Review
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
            Trusted Across Regulated Industries
          </motion.p>
        </div>
        <div className="w-full">
          <LogoLoop
            logos={[
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Healthcare & Life Sciences</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Financial Services</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Legal & Compliance</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Enterprise SaaS</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Insurance</span> },
              { node: <span className="text-2xl font-light text-muted-foreground tracking-tight">Government</span> },
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
              Four Engineering Disciplines. One AI Partner.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Each discipline works independently or together — from data pipeline to production deployment.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                onClick={() => window.location.href = createPageUrl(service.link)}
                className="w-full text-left p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.15) 100%)",
                  border: "1px solid rgba(255,255,255,0.25)",
                  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
                }}
              >
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.button>
            ))}
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
              Each engagement is scoped to your data, your workflows, and your infrastructure
            </p>
            <button
              className="pearl-button"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              <div className="wrap">
                <p>
                  <span>✦</span>
                  Schedule an Architecture Review
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
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">&lt;4 wk</h3>
              <p className="text-muted-foreground text-sm">Proof-to-Production</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">100%</h3>
              <p className="text-muted-foreground text-sm">AWS-Native Deployments</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-4xl md:text-5xl font-light text-foreground mb-2">24/7</h3>
              <p className="text-muted-foreground text-sm">System Uptime SLA</p>
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
                Your AI systems deploy everywhere. Multi-region AWS infrastructure, data residency compliance, and edge-optimized inference across time zones.
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
            <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full">
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
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
              Let's engineer a system that solves what off-the-shelf tools can't.
              Start with a free 30-minute Architecture Review.
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
                    Book an Architecture Review
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
