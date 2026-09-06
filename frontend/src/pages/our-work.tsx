import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { createPageUrl } from "@/lib/utils";

export default function OurWork() {
  return (
    <div>
      <section className="bg-background px-6 lg:px-10 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-foreground/30" aria-hidden="true" />
            <span className="text-[13px] text-muted-foreground uppercase tracking-[0.12em]">
              Under construction
            </span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-6"
          >
            Our work is coming soon.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mb-10"
          >
            We're putting together the case studies: what we built, what it changed, and the numbers behind it.
            In the meantime, we're happy to walk you through recent projects on a call.
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

      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[clamp(1.25rem,2.8vw,1.75rem)] font-normal leading-[1.35] tracking-[-0.02em] text-white/70">
            Want to see something specific? Tell us your industry and we'll show you the closest thing we've built.
          </p>
        </div>
      </section>
    </div>
  );
}
