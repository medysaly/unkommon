import { createPageUrl } from "@/lib/utils";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { HeroBackground } from "@/components/HeroBackground";
import { pillars, serviceListing } from "@/data/services";
import { IntegrationsDiagram } from "@/components/IntegrationsDiagram";

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
            Modernizing how businesses build and operate.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            We build AI agents, digital products, and connected systems that automate the work, improve how customers are served, and keep your business moving.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3"
          >
            <CTAButton href={createPageUrl("BookACall")}>
              Book a free 30-minute call
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* The two pillars */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-6 md:gap-12 items-start mb-12">
            <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground">
              <span className="block">The systems your business needs.</span>
              <span className="block">The operations that keep it moving.</span>
            </h2>
            <p className="text-[17px] text-secondary-foreground leading-relaxed md:pt-3">
              We build the tools your team and customers rely on, then automate the repetitive work happening behind the scenes.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Our Services
            </span>
            <span className="flex-1 h-px bg-border" aria-hidden="true" />
          </div>

          <div className="grid md:grid-cols-2 md:grid-rows-[auto_auto_1fr] gap-4">
            {pillars.map((pillar, i) => {
              const items = serviceListing.filter((s) => s.pillar === pillar.id);
              return (
                <motion.div
                  key={pillar.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group/card text-left p-8 bg-white rounded-xl border border-border transition-[border-color,box-shadow] duration-200 hover:border-foreground/40 hover:shadow-lg flex flex-col gap-y-3 md:grid md:row-span-3 md:grid-rows-subgrid md:gap-y-4"
                >
                  <Link
                    href={`/services#${pillar.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="group flex items-baseline gap-3"
                  >
                    <span className="text-[12px] font-mono text-muted-foreground tabular-nums">{pillar.number}</span>
                    <h3 className="text-[20px] font-medium text-foreground group-hover:text-foreground/70 transition-colors">
                      {pillar.name}
                      <ArrowRight className="inline-block w-4 h-4 ml-1.5 -mt-0.5 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </h3>
                  </Link>
                  <p className="text-[14px] text-secondary-foreground leading-relaxed">{pillar.promise}</p>
                  <ul className="flex flex-col gap-2">
                    {items.map((service) => (
                      <li key={service.name}>
                        {service.href ? (
                          <Link
                            href={service.href}
                            className="group -mx-2 px-2 py-1 rounded-md inline-flex items-center gap-1.5 text-[14px] text-foreground hover:bg-foreground/5 transition-colors"
                          >
                            {service.name}
                            <ArrowRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                          </Link>
                        ) : (
                          <span className="px-2 py-1 inline-flex text-[14px] text-foreground">{service.name}</span>
                        )}
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
      {/* Integrations */}
      <section id="integrations" className="bg-white px-6 lg:px-10 py-20 md:py-28 border-t border-border scroll-mt-20">
        <div className="max-w-[1200px] mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                Integrations
              </span>
              <span className="flex-1 h-px bg-border" aria-hidden="true" />
            </div>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-foreground mb-4">
              Wired into the tools you already use.
            </h2>
            <p className="text-[17px] text-secondary-foreground leading-relaxed max-w-md">
              We don't ask you to move off your stack. Bookings land on your calendar, leads land in your
              CRM, and orders and invoices stay where your team already works.
            </p>
          </div>

          <div className="mt-10 md:mt-14">
            <IntegrationsDiagram />
          </div>
        </div>
      </section>

      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.04em] mb-6">
            Our Mission
          </h2>
          <p className="text-[19px] md:text-[22px] text-white/70 leading-relaxed">
            To help small businesses run better by building modern digital products and automating the work behind them.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Let's make your business easier to run.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Bring us the bottleneck, the messy handoff, or the system you wish you had. We'll help you figure out what to build next.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
