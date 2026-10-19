import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";
import { MapPin } from "lucide-react";

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
            About Unkommon
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-secondary-foreground leading-relaxed max-w-2xl"
          >
            Unkommon is a technology studio founded by Mehdi Salhi, a computer science graduate and
            AWS-certified AI engineer based in Stamford, Connecticut.
          </motion.p>
          <p className="text-[17px] text-secondary-foreground leading-relaxed max-w-2xl mt-6">
            We design and develop digital products, custom software and AI-powered systems. Our work
            spans websites and applications, internal business tools, systems integration and workflow
            automation. Each engagement is shaped around the client’s business requirements and
            existing technology.
          </p>
        </div>
      </section>

      {/* Founder-led delivery */}
      <section className="bg-border px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-8">
              Founder-led delivery
            </h2>
            <div className="space-y-6 text-[17px] text-secondary-foreground leading-relaxed">
              <p>
                Mehdi leads each project, bringing together software development, cloud architecture and
                AI engineering. Clients work directly with him to define requirements, make technical
                decisions and carry the project through implementation and handover.
              </p>
              <p>
                His qualifications include a degree in Computer Science and AWS certifications in
                Solutions Architecture and Cloud Practitioner.
              </p>
            </div>
          </div>
          <figure className="w-full max-w-md mx-auto">
            <img
              src="/mehdi-salhi.jpg"
              alt="Mehdi Salhi, founder of Unkommon"
              width={1264}
              height={1568}
              loading="lazy"
              decoding="async"
              className="block w-full h-auto rounded-2xl"
            />
            <figcaption className="mt-4 text-[14px] text-secondary-foreground">
              Mehdi Salhi <span className="text-muted-foreground">· Founder, Unkommon</span>
            </figcaption>
          </figure>
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
            Serving clients locally and remotely.
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
