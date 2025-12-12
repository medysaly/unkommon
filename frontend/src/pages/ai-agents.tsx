import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { AgentCard } from "@/components/AgentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./ai-agents.css";
import "@/styles/pearl-button.css";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function AIAgents() {
  const lenisRef = useRef<Lenis | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 372; // width of card (340) + gap (32)
      const currentScroll = carouselRef.current.scrollLeft;
      carouselRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // GSAP Scroll Animations
    gsap.to(".image-motion", {
      transform: "rotateX(0deg)",
      scrollTrigger: {
        trigger: ".section2",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.fromTo(".section3 h1",
      {
        transform: "translateX(100%)",
      },
      {
        transform: "translateX(-100%)",
        scrollTrigger: {
          trigger: ".section3",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      }
    );

    gsap.from(".section3 .content p", {
      y: 100,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".section3",
        start: "top center",
        end: "bottom center",
        scrub: 1,
      },
    });

    // Cleanup
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const agents = [
    {
      id: 1,
      name: "AI Receptionist",
      description: "24/7 intelligent phone answering with natural conversations and appointment booking",
      image: "/images/backgrounds/Receptionist.jpg",
      page: "AIReceptionist",
      stats: { users: 850, features: 24 }
    },
    {
      id: 2,
      name: "Speed-to-Lead",
      description: "Instant personalized responses to capture leads before your competitors",
      image: "/images/backgrounds/speed.jpg",
      page: "SpeedToLead",
      stats: { users: 720, features: 18 }
    },
    {
      id: 3,
      name: "AI Booking System",
      description: "WhatsApp & SMS booking automation for 24/7 appointment scheduling",
      image: "/images/backgrounds/Booking.jpg",
      page: "AIBookingSystem",
      stats: { users: 690, features: 22 }
    },
  ];

  return (
    <div className="bg-white dark:bg-black text-foreground overflow-x-hidden">
      {/* Hero Section with Carousel */}
      <section className="loop-images relative min-h-screen flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black" />

        <div className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 px-4"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-foreground tracking-tight">
              Our AI Agents
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover our suite of intelligent AI solutions designed to transform your business operations
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-8 h-8 text-foreground" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-8 h-8 text-foreground" />
              </button>

              {/* Carousel */}
              <div
                ref={carouselRef}
                className="overflow-hidden w-full"
              >
                <div className="flex gap-8 pl-8 animate-scroll-left-fast">
                  {/* Duplicate agents array multiple times for seamless infinite scroll */}
                  {[...agents, ...agents, ...agents, ...agents].map((agent, index) => (
                    <div
                      key={`${agent.id}-${index}`}
                      className="flex-shrink-0"
                    >
                      <AgentCard
                        name={agent.name}
                        description={agent.description}
                        image={agent.image}
                        page={agent.page}
                        stats={agent.stats}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Content Section */}
      <section className="section3 relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-white dark:bg-black" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-20 overflow-hidden">
            <h1 className="text-[40px] md:text-[60px] lg:text-[80px] font-black whitespace-nowrap text-foreground leading-none">
              TRANSFORM YOUR BUSINESS
            </h1>
          </div>

          <div className="content grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Our AI agents work seamlessly together to create a comprehensive automation ecosystem
                for your business. Each agent is designed to excel in its specific role while
                integrating perfectly with the others.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                From answering customer calls to managing bookings and engaging on social media,
                our AI solutions handle it all with intelligence and precision.
              </p>
            </div>
            <div>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Experience the future of business automation with AI agents that never sleep,
                never miss an opportunity, and constantly learn to serve your customers better.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Choose individual agents or combine them for a complete AI-powered transformation
                of your business operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Schedule a consultation to discover how our AI agents can transform your business
            </p>
            <button
              className="pearl-button"
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
      </section>
    </div>
  );
}
