import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import { pillars, services } from "@/data/services";

const symptoms = [
  {
    title: "You're invisible to the AI people ask",
    description:
      "Buyers now shortlist inside ChatGPT and Perplexity before they ever visit a website, and close to half of Google searches trigger an AI Overview. If the assistant doesn't name you, you're not in the running. Most businesses have never checked whether they're cited at all.",
    outcomes: ["AI visibility audit", "Citation tracking", "Structured data", "Crawler access"],
  },
  {
    title: "Enquiries arrive and nobody gets to them",
    description:
      "The call comes in during a job. The form lands at 9pm. The average reply time in some industries runs to 47 hours, while most customers now expect an answer within one. The lead was never bad. Nobody reached it in time.",
    outcomes: ["24/7 call answering", "Sub-minute first response", "Qualification", "Real bookings"],
  },
  {
    title: "Your team is doing work a system should do",
    description:
      "Someone re-keys orders between systems. Someone updates hundreds of product pages by hand. Someone rebuilds the same report every Monday. It never shows up as a line item, and it's the first thing that breaks when you get busy.",
    outcomes: ["System integration", "Document processing", "Bulk content", "Automated reporting"],
  },
];

export default function Solutions() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-6"
          >
            Get built. Get found. Get running.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground mb-10 max-w-2xl leading-relaxed"
          >
            We build the website, win the search and AI visibility, answer every enquiry that comes in, and automate the work behind it. One team instead of three vendors.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <CTAButton href={createPageUrl("BookACall")}>
              Let's talk
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Symptoms: let buyers self-identify before the menu */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-black text-[10px]" aria-hidden="true">1</span>
            <span className="text-[13px] text-white/60">Where It Usually Hurts</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-12 max-w-3xl">
            Does this sound like you?
          </h2>

          <div className="space-y-6">
            {symptoms.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 rounded-xl border border-white/20"
              >
                <h3 className="text-2xl md:text-3xl font-normal tracking-tight mb-3">{s.title}</h3>
                <p className="text-[15px] text-white/60 leading-relaxed mb-6 max-w-2xl">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.outcomes.map((o) => (
                    <span key={o} className="text-[12px] text-white/80 bg-white/5 px-3 py-1 rounded-full border border-white/20">
                      {o}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services, grouped by pillar */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">2</span>
            <span className="text-[13px] text-muted-foreground">What We Do</span>
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-4">
            Pick where you want to start.
          </h2>
          <p className="text-[17px] text-secondary-foreground leading-relaxed mb-16 max-w-2xl">
            Most clients start with one and add the next once it's paying for itself. Click any service for deliverables, stack, and the industries we work in.
          </p>

          <div className="space-y-16">
            {pillars.map((pillar) => {
              const items = services.filter((s) => s.pillar === pillar.id);
              if (items.length === 0) return null;

              return (
                <div key={pillar.id}>
                  <div className="border-t border-border pt-6 mb-8">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span className="text-[12px] font-mono text-muted-foreground tabular-nums">{pillar.number}</span>
                      <h3 className="text-[22px] md:text-[26px] font-normal tracking-[-0.03em] text-foreground">
                        {pillar.name}
                      </h3>
                    </div>
                    <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
                      {pillar.promise}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {items.map((service, i) => (
                      <motion.div
                        key={service.slug}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                      >
                        <Link
                          href={`/solutions/${service.slug}`}
                          className="group block p-7 bg-background rounded-xl border border-border hover:border-foreground/30 hover:shadow-sm transition-all h-full"
                        >
                          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-3">{service.subtitle}</p>
                          <h4 className="text-[19px] font-medium text-foreground mb-3 leading-snug">{service.title}</h4>
                          <p className="text-[14px] text-secondary-foreground leading-relaxed mb-5">{service.outcome}</p>
                          <span className="inline-flex items-center gap-1.5 text-[13px] text-foreground font-medium group-hover:gap-2 transition-all">
                            Learn more
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
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
