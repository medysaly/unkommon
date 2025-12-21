import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DarkVeil from "@/components/DarkVeil";
import { LogoLoop } from "@/components/LogoLoop";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { World } from "@/components/ui/globe";
import type { GlobeConfig } from "@/components/ui/globe";
import { TechCard } from "@/components/ui/tech-card";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import "@/styles/pearl-button.css";
import "@/styles/glass-cards.css";

// Agents data - shared between desktop and mobile views
const agents = [
  {
    id: 1,
    title: "The Lead Qualifier",
    description: "Instant lead qualification and engagement before competitors respond",
    link: "SpeedToLead",
    rotateY: 0,
    topPosition: "58%", // Up/Down - lower % = higher up
    leftPosition: "71%", // Left/Right - lower % = more left, higher % = more right
    rotation: 8, // Rotation in degrees (e.g., -10, 0, 10)
  },
  {
    id: 2,
    title: "The AI Receptionist",
    description: "24/7 phone automation with natural conversations and CRM integration",
    link: "AIReceptionist",
    rotateY: 0,
    topPosition: "65%", // Up/Down - lower % = higher up
    leftPosition: "40%", // Left/Right - lower % = more left, higher % = more right
    rotation: 8, // Rotation in degrees (e.g., -10, 0, 10)
  },
  {
    id: 3,
    title: "The Client Reactivator",
    description: "Unlock revenue from your existing database with automated reactivation",
    link: "AIBookingSystem",
    rotateY: 15,
    topPosition: "73%", // Up/Down - lower % = higher up
    leftPosition: "25%", // Left/Right - lower % = more left, higher % = more right
    rotation: 8, // Rotation in degrees (e.g., -10, 0, 10)
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
    left: isMobile ? "0px" : "-80px",      // Left/Right position
    top: isMobile ? "0px" : "-450px",       // Up/Down position
    rotation: 0,      // Rotation in degrees
  };

  const subheaderControls = {
    left: isMobile ? "0px" : "-80px",      // Left/Right position
    top: isMobile ? "0px" : "-470px",       // Up/Down position
    rotation: 0,      // Rotation in degrees
  };

  // CTA Buttons Position Controls - Responsive values
  const ctaButtonsControls = {
    left: isMobile ? "0px" : "-450px",      // Left/Right position
    top: isMobile ? "0px" : "-480px",         // Up/Down position
    rotation: 0,        // Rotation in degrees
  };

  return (
    <div className="overflow-hidden -mt-20">
      {/* Hero Section */}
      <section
        className="hero-section relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden min-h-[500px] sm:min-h-[700px] md:min-h-screen flex items-center bg-white dark:bg-black"
        style={{
          backgroundImage: "url('/images/backgrounds/header.png')",
          backgroundSize: "cover",
          backgroundPosition: "0% center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <style>{`
          @media (max-width: 640px) {
            .hero-section {
              background-size: auto 300px !important;
              background-position: top center !important;
              min-height: 400px !important;
            }
          }
        `}</style>
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-[150px] sm:mt-[350px] md:mt-[530px]"
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
                className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight text-foreground tracking-tight"
                data-testid="heading-hero-title"
              >
                Don't Be Common.
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
                className="text-xl text-muted-foreground leading-relaxed max-w-3xl"
                data-testid="text-hero-description"
              >
                Common businesses miss opportunities. We build the intelligence to catch them.
              </motion.p>
            </div>

            <div
              className="relative"
              style={{
                left: ctaButtonsControls.left,
                top: ctaButtonsControls.top,
                transform: `rotate(${ctaButtonsControls.rotation}deg)`,
                transformOrigin: "left center"
              }}
            >
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
            </div>
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
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light text-foreground tracking-tight leading-tight mb-8">
              The Three Engines of Automated Revenue.
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Most businesses have three specific bottlenecks: missed calls, slow lead response, and dormant databases. We don't sell generic chatbots; we deploy three specialized, purpose-built agents to solve these problems permanently.
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

      {/* Engineering Standard Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-black dark:bg-black">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-light text-white tracking-tight leading-tight mb-8">
              We Don't Just Prompt. We Engineer.
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              Most agencies rely on generic models. Unkommon builds proprietary, state-based architectures using advanced retrieval systems. The result is an AI that never hallucinates and follows your business rules with mathematical precision.
            </p>
          </motion.div>

          {/* Three Features Grid - Agent Card Style */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1: Zero Hallucinations */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Zero Hallucinations
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  RAG Architecture
                </p>
                <p className="text-base text-gray-300 leading-relaxed mb-6">
                  Generic AI guesses. Our agents know. We use RAG technology to vector-embed your specific company data—PDFs, websites, and price lists—into a private knowledge base. When a client asks a question, the agent retrieves the exact answer from your documents before speaking. It never invents facts.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500 mb-2 font-semibold">Why This Wins:</p>
                  <p className="text-sm text-gray-400 italic">
                    "It won't lie to my customers."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2: Rigid Logic Flows */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Rigid Logic Flows
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  LangGraph
                </p>
                <p className="text-base text-gray-300 leading-relaxed mb-6">
                  We do not let the AI 'improvise.' We build agents using LangGraph to enforce strict, cyclical state machines. This ensures the conversation follows a rigid logical path (e.g., Qualify → Schedule → Confirm) and cannot be tricked into going off-script or skipping steps.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500 mb-2 font-semibold">Why This Wins:</p>
                  <p className="text-sm text-gray-400 italic">
                    "It won't go rogue or say crazy things."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3: Enterprise Reliability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold text-white mb-3">
                  Enterprise Reliability
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-medium">
                  AWS Cloud
                </p>
                <p className="text-base text-gray-300 leading-relaxed mb-6">
                  Built on Amazon Web Services (AWS) compute and database layers. We ensure 99.9% uptime, bank-grade encryption, and the ability to scale from 10 calls to 10,000 calls instantly without latency.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-500 mb-2 font-semibold">Why This Wins:</p>
                  <p className="text-sm text-gray-400 italic">
                    "It won't crash."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Deployment Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
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
            <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
              <div className="w-full h-full">
                <World data={sampleArcs} globeConfig={globeConfig} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight mb-6">
              Powered by Leading AI Technologies
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We integrate the most advanced AI models to deliver exceptional results for your business automation needs.
            </p>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-2xl"
            >
              <TechCard />
            </motion.div>
          </div>
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
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
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
              Everything you need to know about our AI automation solutions
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
                  We do not rely on generic training data. We use Retrieval-Augmented Generation (RAG) to build a custom Knowledge Base specific to your company. We ingest your website, training manuals, pricing PDFs, and calendars. When a lead asks a question, the agent references your documents to provide an accurate answer. It does not guess.
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
                  No. Unkommon is a full-service consultancy, not a DIY platform. We handle the engineering, the CRM integrations, and the prompt testing. Your only responsibility is a 60-minute 'Discovery Call' to define your rules; we handle the deployment.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Does this integrate with my existing software?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Yes. We build native API integrations into major industry CRMs (Salesforce, HubSpot, Clio, ServiceTitan, etc.). The AI reads your real-time calendar availability and writes lead data directly into your client fields. No manual data entry is required.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is my client data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Absolutely. We build on enterprise-grade cloud infrastructure with end-to-end encryption. Unlike public chatbots, your proprietary business data is siloed and is never used to train public models.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Regarding "Speed-to-Lead" does responding instantly feel aggressive?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  No, it feels responsive. Data shows that lead conversion drops by 400% if you wait just 5 minutes to respond. Our agents use Webhooks to trigger a response within seconds of a form submission. Because the lead is at 'peak intent' (literally looking at their phone), they view the instant outreach as excellent customer service, not aggression.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Is the "Client Reactivator" just a bulk SMS blast?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  No. Traditional SMS marketing is a one-way 'blast' that annoys customers. Our agent initiates a 2-way, personalized conversation. It references specific details (like 'your last visit was 6 months ago') and waits for a reply. It uses natural language processing to have a real back-and-forth chat to find a time that works, rather than just shouting a discount code.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-b border-border/50">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  What is the typical investment for an Unkommon engagement?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  We design custom infrastructure, so investment varies by complexity. However, most partners start with a one-time Deployment Fee (covering architecture & setup) ranging from $1,500–$3,000, and a monthly Maintenance Retainer starting at $500/mo.
                  <br /><br />
                  <strong>Note:</strong> This is roughly 15% of the cost of hiring a human employee for the same role.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-b-0">
                <AccordionTrigger className="text-left text-lg font-medium hover:no-underline py-6">
                  Are there hidden fees?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  Transparency is key. Your monthly package includes a set number of talk minutes (usually sufficient for 95% of businesses). If you have a massive surge in call volume, we offer simple pay-as-you-go rates for the extra usage—no surprise bills.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
