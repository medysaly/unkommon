import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, TrendingUp, Target, Sparkles } from "lucide-react";
import { Citation } from "@/components/Citation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface Benefit {
  id: number;
  icon: typeof Shield;
  title: string;
  description: React.ReactNode;
}

interface ColorScheme {
  primary: string;
  secondary: string;
  glow: string;
  border: string;
}

const colorSchemes: Record<string, ColorScheme> = {
  blue: {
    primary: "rgba(59, 130, 246, 0.5)",
    secondary: "rgba(96, 165, 250, 0.3)",
    glow: "rgba(59, 130, 246, 0.4)",
    border: "rgba(59, 130, 246, 0.5)",
  },
  purple: {
    primary: "rgba(168, 85, 247, 0.5)",
    secondary: "rgba(192, 132, 252, 0.3)",
    glow: "rgba(168, 85, 247, 0.4)",
    border: "rgba(168, 85, 247, 0.5)",
  },
  green: {
    primary: "rgba(34, 197, 94, 0.5)",
    secondary: "rgba(74, 222, 128, 0.3)",
    glow: "rgba(34, 197, 94, 0.4)",
    border: "rgba(34, 197, 94, 0.5)",
  },
  orange: {
    primary: "rgba(249, 115, 22, 0.5)",
    secondary: "rgba(251, 146, 60, 0.3)",
    glow: "rgba(249, 115, 22, 0.4)",
    border: "rgba(249, 115, 22, 0.5)",
  },
};

const initialBenefits: Benefit[] = [
  {
    id: 1,
    icon: Shield,
    title: "24/7 Availability",
    description: "Never miss a customer call or inquiry",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Reduce Costs",
    description: (
      <>
        Reduce labor costs by 50-70%<Citation statisticId="ai-cost-savings" />
      </>
    ),
  },
  {
    id: 3,
    icon: Target,
    title: "Increase Conversions",
    description: (
      <>
        Convert more leads with instant responses<Citation statisticId="first-responder-wins" />
      </>
    ),
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Improve Experience",
    description: "Provide consistent, professional service",
  },
];

const benefitColors = ["blue", "purple", "green", "orange"];

export function BenefitsSlideshow() {
  const stackingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const spacer = 30;

    // Clear any existing ScrollTriggers for this component
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];

    // Create ScrollTriggers for each card
    cards.forEach((card, index) => {
      if (!card) return;

      // Pin each card
      const pinTrigger = ScrollTrigger.create({
        trigger: card,
        start: `center-=${index * spacer} center`,
        endTrigger: stackingRef.current,
        end: "bottom center",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      });
      scrollTriggersRef.current.push(pinTrigger);

      // Scale animation
      const scaleValue = 0.85 + index * 0.05;
      const scaleTween = gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top center",
          end: "bottom center",
          scrub: true,
          invalidateOnRefresh: true,
        },
        scale: scaleValue,
      });

      // Store the scale trigger
      if (scaleTween.scrollTrigger) {
        scrollTriggersRef.current.push(scaleTween.scrollTrigger);
      }
    });

    // Cleanup - only kill ScrollTriggers created by this component
    return () => {
      scrollTriggersRef.current.forEach((trigger) => trigger.kill());
      scrollTriggersRef.current = [];
    };
  }, []);

  return (
    <div ref={stackingRef} className="stacking relative">
      {initialBenefits.map((benefit, index) => {
        const Icon = benefit.icon;
        const colorKey = benefitColors[index % benefitColors.length];
        const colors = colorSchemes[colorKey];

        return (
          <div
            key={benefit.id}
            ref={(el) => (cardsRef.current[index] = el)}
            className="stacking__card mx-auto my-[25vh] max-w-4xl relative"
            style={{ zIndex: 10 + index }}
          >
            <div
              className="relative w-full rounded-[2rem] border overflow-hidden backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Tsunami Wave Effect - SVG */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`wave-gradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,150 Q250,100 500,150 T1000,150 L1000,0 L0,0 Z"
                  fill={`url(#wave-gradient-${index})`}
                  className="animate-wave"
                  style={{
                    transformOrigin: 'center',
                    animation: `wave ${8 + index}s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`
                  }}
                />
                <path
                  d="M0,100 Q200,50 400,100 T800,100 L800,0 L0,0 Z"
                  fill="rgba(255, 255, 255, 0.05)"
                  className="animate-wave-slow"
                  style={{
                    transformOrigin: 'center',
                    animation: `wave ${10 + index}s ease-in-out infinite reverse`,
                    animationDelay: `${index * 0.3}s`
                  }}
                />
              </svg>

              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />

              <div className="relative p-8 md:p-16">
                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                  {benefit.title}
                </h3>

                {/* Description */}
                <div className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
                  {benefit.description}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
