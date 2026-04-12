import { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function BookACall() {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div>
      {/* Hero — Single focused CTA */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground mb-6"
          >
            Book a call.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-[17px] text-muted-foreground max-w-lg mx-auto leading-relaxed"
          >
            Pick a time for a free 30-minute architecture review. We'll assess your AI opportunity and outline a technical approach.
          </motion.p>
        </div>
      </section>

      {/* Cal.com Embed */}
      <section className="bg-background px-6 lg:px-10 pb-20 md:pb-28">
        <div className="max-w-[1000px] mx-auto">
          <div className="bg-white rounded-2xl border border-border shadow-sm relative overflow-hidden">
            {/* Loading skeleton */}
            {!iframeLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-2xl z-10">
                <div className="text-center">
                  <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-[14px] text-muted-foreground">Loading calendar...</p>
                </div>
              </div>
            )}
            <iframe
              src="https://cal.com/medysaly/30min?embed=true&theme=light&hideEventTypeDetails=false&layout=month_view"
              style={{
                width: '100%',
                minHeight: '500px',
                height: '80vh',
                maxHeight: '750px',
                border: 'none',
                background: 'transparent',
                borderRadius: '16px',
              }}
              title="Book a 30-minute call with Unkommon"
              onLoad={() => setIframeLoaded(true)}
            />
          </div>
        </div>
      </section>

      {/* Minimal phone fallback */}
      <section className="bg-white px-6 lg:px-10 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Phone className="w-5 h-5 text-foreground" />
            <p className="text-[15px] text-secondary-foreground">
              Prefer to call?
            </p>
          </div>
          <a href="tel:+12036809629" className="inline-block group">
            <span className="text-2xl font-normal text-foreground tracking-tight group-hover:opacity-60 transition-opacity">
              +1 (203) 680-9629
            </span>
          </a>
          <p className="text-[12px] text-muted-foreground mt-2">
            AI agent, available 24/7 &middot; contact@unkommon.ai
          </p>
        </div>
      </section>
    </div>
  );
}
