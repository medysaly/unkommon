import { createPageUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { HeroBackground } from "@/components/HeroBackground";
import { pillars, services } from "@/data/services";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-background px-6 lg:px-10 pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-8"
          >
            Modernizing how businesses market, build, and operate.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            We build high-converting websites and apps, drive rank across Google and AI search, and deploy smart automations to turn manual workflows into instant, automated systems.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CTAButton href={createPageUrl("BookACall")}>
              Let's talk
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* The three pillars */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-start mb-12">
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground">
              <span className="block">Most agencies can't build.</span>
              <span className="block">Most developers can't rank.</span>
            </h2>
            <p className="text-[17px] text-secondary-foreground leading-relaxed md:pt-2">
              Marketing and engineering shouldn't be separate vendors. We put code, search visibility, and AI automation under one roof so you get a fast system that actually drives revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 md:grid-rows-[auto_auto_1fr] gap-4">
            {pillars.map((pillar, i) => {
              const items = services.filter((s) => s.pillar === pillar.id);
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="text-left p-8 bg-white rounded-xl border border-border flex flex-col gap-y-3 md:grid md:row-span-3 md:grid-rows-subgrid md:gap-y-4"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-[12px] font-mono text-muted-foreground tabular-nums">{pillar.number}</span>
                    <h3 className="text-[20px] font-medium text-foreground">{pillar.name}</h3>
                  </div>
                  <p className="text-[14px] text-secondary-foreground leading-relaxed">{pillar.promise}</p>
                  <ul className="flex flex-col gap-2">
                    {items.map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={`/solutions/${service.slug}`}
                          className="group inline-flex items-center gap-1.5 text-[14px] text-foreground hover:text-foreground/70 transition-colors"
                        >
                          {service.subtitle}
                          <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why one team */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6 max-w-3xl">
            Most agencies can't build. Most developers can't rank.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed max-w-2xl mb-4">
            Marketing and engineering keep getting sold as separate things, so you end up with a fast site nobody can find, or good rankings on a site that can't take a booking. The two problems share the same root: whether machines can read your business correctly.
          </p>
          <p className="text-[17px] text-white/60 leading-relaxed max-w-2xl">
            We do both. The person writing your content and the person shipping the code work in the same room, which means the recommendation and the implementation never get lost between two vendors.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Find out where you're losing them.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. We'll look at how you show up in search and AI, how fast enquiries get answered, and where the manual work is going. No pitch, no obligation.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
