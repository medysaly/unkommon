import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Link } from "wouter";
import SpotlightCard from "./SpotlightCard";

interface LiquidGlassCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  colorScheme: "blue" | "purple" | "green" | "orange";
  index: number;
}

const colorSchemes = {
  blue: {
    primary: "oklch(0.75 0.25 240)",
    secondary: "oklch(0.65 0.3 220)",
    glow: "rgba(59, 130, 246, 0.8)",
    badge: "from-blue-500/20 to-cyan-500/20",
    text: "text-blue-400",
  },
  purple: {
    primary: "oklch(0.75 0.25 300)",
    secondary: "oklch(0.65 0.3 280)",
    glow: "rgba(168, 85, 247, 0.8)",
    badge: "from-purple-500/20 to-pink-500/20",
    text: "text-purple-400",
  },
  green: {
    primary: "oklch(0.75 0.25 150)",
    secondary: "oklch(0.65 0.3 130)",
    glow: "rgba(34, 197, 94, 0.8)",
    badge: "from-green-500/20 to-emerald-500/20",
    text: "text-green-400",
  },
  orange: {
    primary: "oklch(0.75 0.25 40)",
    secondary: "oklch(0.65 0.3 30)",
    glow: "rgba(249, 115, 22, 0.8)",
    badge: "from-orange-500/20 to-amber-500/20",
    text: "text-orange-400",
  },
};

export function LiquidGlassCard({
  title,
  description,
  icon,
  href,
  colorScheme,
  index,
}: LiquidGlassCardProps) {
  const colors = colorSchemes[colorScheme];
  const filterId = `liquid-${colorScheme}-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative group h-full"
    >
      <Link href={href}>
        <a className="block relative h-full">
          <SpotlightCard className="h-full flex flex-col" spotlightColor={colors.glow}>
            {/* Content */}
            <div className="mt-8 flex-1 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {title}
              </h3>

              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-6 flex-1">
                {description}
              </p>

              <div className="flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-300 mt-auto">
                Learn more
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </SpotlightCard>
        </a>
      </Link>
    </motion.div>
  );
}
