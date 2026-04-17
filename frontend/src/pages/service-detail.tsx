import { useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CTAButton } from "@/components/CTAButton";
import { getServiceBySlug } from "@/data/services";
import NotFound from "@/pages/not-found";

export default function ServiceDetail() {
  const [, params] = useRoute<{ slug: string }>("/solutions/:slug");
  const slug = params?.slug ?? "";
  const service = getServiceBySlug(slug);

  useEffect(() => {
    if (!service) return;
    const prevTitle = document.title;
    const prevDesc = document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content");
    document.title = service.metaTitle;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute("content", service.metaDescription);
    return () => {
      document.title = prevTitle;
      if (descTag && prevDesc) descTag.setAttribute("content", prevDesc);
    };
  }, [service]);

  if (!service) return <NotFound />;

  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-20 md:pt-24 md:pb-24">
        <div className="max-w-[1400px] mx-auto">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
            All Solutions
          </Link>
          <p className="text-[12px] text-muted-foreground uppercase tracking-wider mb-4">
            {service.subtitle}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1] tracking-[-0.05em] text-foreground max-w-[900px] mb-6"
          >
            {service.heroHeadline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[18px] text-muted-foreground max-w-2xl leading-relaxed mb-10"
          >
            {service.heroSubhead}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <CTAButton href="/book-a-call">Book a free 30-minute call</CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Problem + Solution */}
      <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="text-[12px] text-muted-foreground uppercase tracking-wider mb-4">
              {service.problemLabel}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-foreground mb-6">
              Why this matters.
            </h2>
            <p className="text-[16px] text-secondary-foreground leading-relaxed">
              {service.problem}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground uppercase tracking-wider mb-4">
              What we build
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] text-foreground mb-6">
              The solution.
            </h2>
            <p className="text-[16px] text-secondary-foreground leading-relaxed">
              {service.solution}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-background px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-12 max-w-3xl">
            What you get.
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-xl border border-border">
              <h3 className="text-xl font-medium text-foreground mb-4">Capabilities</h3>
              <ul className="space-y-3">
                {service.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="text-[15px] text-secondary-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-foreground mt-0.5">·</span>
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 bg-white rounded-xl border border-border">
              <h3 className="text-xl font-medium text-foreground mb-4">Deliverables</h3>
              <ul className="space-y-3">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="text-[15px] text-secondary-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-foreground mt-0.5">·</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-12 text-[17px] text-foreground font-medium max-w-3xl leading-relaxed">
            {service.outcome}
          </p>
        </div>
      </section>

      {/* Tech Stack + Industries */}
      <section className="bg-black text-white px-6 lg:px-10 py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
          <div>
            <p className="text-[12px] text-white/60 uppercase tracking-wider mb-4">
              Tech stack
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] mb-6">
              Built on proven tools.
            </h2>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((t) => (
                <span
                  key={t}
                  className="text-[13px] text-white/80 bg-white/5 px-3 py-1.5 rounded-full border border-white/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[12px] text-white/60 uppercase tracking-wider mb-4">
              Who this is for
            </p>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.03em] mb-6">
              Industries we serve.
            </h2>
            <ul className="space-y-2.5">
              {service.industries.map((ind) => (
                <li
                  key={ind}
                  className="text-[15px] text-white/70 flex items-start gap-2 leading-relaxed"
                >
                  <span className="text-white/40 mt-0.5">·</span>
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="bg-white px-6 lg:px-10 py-20 md:py-28">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-12">
              Frequently asked.
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="text-left text-[16px] font-medium text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15px] text-secondary-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-foreground text-white px-6 lg:px-10 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.04em] mb-6">
            See where this fits in your business.
          </h2>
          <p className="text-[17px] text-white/60 leading-relaxed mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. We'll look at where this could cut costs, save hours, or open new revenue — no pitch, no obligation.
          </p>
          <CTAButton href="/book-a-call" variant="light">
            Book a free 30-minute call
          </CTAButton>
        </div>
      </section>
    </div>
  );
}
