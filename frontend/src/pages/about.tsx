import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import { ArrowRight, MapPin } from "lucide-react";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-5 h-5 bg-foreground rounded-full flex items-center justify-center text-white text-[10px]" aria-hidden="true">i</span>
            <span className="text-[13px] text-muted-foreground">Who We Are</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-4xl mb-8"
          >
            We build AI that runs your business, not the other way around.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-secondary-foreground leading-relaxed max-w-2xl"
          >
            Unkommon builds the website, wins the search and AI visibility, answers every enquiry that comes in,
            and automates the work behind it. Marketing and engineering in one team, so what gets recommended is
            what gets shipped. HIPAA-aware architecture on HIPAA-eligible AWS services, BAA-ready for healthcare
            and regulated industries.
          </motion.p>
        </div>
      </section>

      {/* What We're Not */}
      <section className="bg-border px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-10">
            What we're not.
          </h2>
          <div className="space-y-5">
            {[
              "Not a SaaS platform you subscribe to",
              "Not a chatbot builder with a drag-and-drop interface",
              "Not a template agency reselling other companies' tools",
              "Not a $99/month solution competing on price",
              "Not a vendor you replace after 6 months",
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 text-[17px] text-secondary-foreground"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2.5 flex-shrink-0" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>
          <p className="mt-10 text-[18px] text-foreground font-medium max-w-xl leading-relaxed">
            We're an engineering partner. The systems we build become infrastructure your business runs on.
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-normal tracking-tight mb-1">Mehdi Salhi</h3>
              <p className="text-[14px] text-white/60 mb-8">Founder & Lead Engineer</p>
              <div className="space-y-4 text-[15px] text-white/60 leading-relaxed">
                <p>
                  Unkommon was founded to fix a split that costs businesses real money. The SEO agency writes a list
                  of technical fixes it cannot implement. The development shop builds a fast site nobody can find.
                  Each blames the other, and the work sits still for months.
                </p>
                <p>
                  We do both halves. The person writing your content and the person shipping the code work in the same
                  room, so a recommendation becomes a deployment instead of a ticket. Everything is built and shipped
                  by the people who proposed it, not account managers reselling other people's tools.
                </p>
                <p className="text-white/80">
                  Based in Stamford, CT. Working with clients across the US and internationally.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/in/mehdi-salhi-work/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] text-white mt-6 hover:opacity-70 transition-opacity"
              >
                Connect on LinkedIn
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/7a75c6f87_mehdi.jpg"
                alt="Mehdi Salhi, Founder and Engineer at Unkommon"
                className="w-64 h-64 md:w-80 md:h-80 rounded-xl object-cover grayscale"
                width={320}
                height={320}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-foreground" />
            <h2 className="text-2xl md:text-3xl font-normal text-foreground tracking-tight">
              Based in Stamford, CT.
            </h2>
          </div>
          <p className="text-[17px] text-secondary-foreground leading-relaxed max-w-xl mx-auto">
            US-based. Available for remote engagements worldwide.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            Let's see where AI fits in your business.
          </h2>
          <CTAButton href={createPageUrl("BookACall")} variant="light" className="mt-4">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
