import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import { pillars, serviceListing } from "@/data/services";

/** "Get Built" -> "get-built", so the homepage cards can deep-link here. */
export const pillarAnchor = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">◆</span>
            <span className="text-[13px] text-muted-foreground">Our Services</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-6"
          >
            We meet you where you are.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            Whether you're building your first product from scratch or scaling an established business, we engineer the exact layer of tech, visibility, or automation you need right now.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <CTAButton href={createPageUrl("BookACall")}>Let's chat</CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Services by pillar */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-20 md:gap-28">
          {pillars.map((pillar) => {
            const items = serviceListing.filter((s) => s.pillar === pillar.id);
            if (items.length === 0) return null;

            return (
              <div key={pillar.id} id={pillarAnchor(pillar.name)} className="scroll-mt-24">
                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 md:gap-16">
                  {/* Pillar header */}
                  <div className="md:sticky md:top-24 md:self-start">
                    <div className="flex items-baseline gap-3 mb-3">
                      <span className="text-[13px] font-mono text-muted-foreground tabular-nums">{pillar.number} /</span>
                      <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal tracking-[-0.03em] text-foreground">
                        {pillar.name}
                      </h2>
                    </div>
                    <p className="text-[16px] text-secondary-foreground leading-relaxed max-w-md">
                      {pillar.promise}
                    </p>
                  </div>

                  {/* Services in this pillar */}
                  <ul className="flex flex-col">
                    {items.map((service, i) => {
                      const body = (
                        <>
                          <h3 className="text-[18px] font-medium text-foreground mb-2 leading-snug">
                            {service.name}
                            {service.href && (
                              <ArrowRight className="inline-block w-4 h-4 ml-1.5 -mt-0.5 opacity-30 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </h3>
                          <p className="text-[15px] text-secondary-foreground leading-relaxed">
                            {service.blurb}
                          </p>
                        </>
                      );

                      return (
                        <motion.li
                          key={service.name}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 }}
                          className="border-t border-border first:border-t-0 py-6 first:pt-0"
                        >
                          {service.href ? (
                            <Link href={service.href} className="group block -mx-4 px-4 py-2 -my-2 rounded-lg hover:bg-foreground/[0.04] transition-colors">
                              {body}
                            </Link>
                          ) : (
                            body
                          )}
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Positioning statement */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[clamp(1.375rem,3.2vw,2.125rem)] font-normal leading-[1.3] tracking-[-0.02em] text-balance">
            Most agencies build sites that nobody can find. Most marketers build traffic to sites that can't convert.{" "}
            <span className="font-bold">We do both.</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Let's chat about how we can grow your business.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Grab 30 minutes with us. We'll take a look at your website and apps, see how you show up across Google and AI search, and spot the manual tasks slowing down your team.
          </p>
          <CTAButton href={createPageUrl("BookACall")} variant="light">
            Let's chat
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
