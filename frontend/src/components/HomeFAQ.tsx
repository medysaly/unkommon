import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaqs } from "@/data/home-faqs";

export function HomeFAQ() {
  return (
    <section id="faq" aria-labelledby="home-faq-heading" className="bg-white px-6 lg:px-10 py-20 md:py-28 border-y border-border scroll-mt-24">
      <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] gap-10 lg:gap-20 items-start">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-5">Frequently asked</p>
          <h2 id="home-faq-heading" className="text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.1] tracking-[-0.04em] text-foreground mb-5">Before we get started.</h2>
          <p className="text-[16px] text-secondary-foreground leading-relaxed mb-6">A few things you might be wondering about working with us.</p>
          <Link href="/book-a-call" className="inline-flex items-center gap-2 text-[14px] text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            Book a free 30-minute call <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <Accordion type="single" collapsible defaultValue="home-faq-0" className="min-w-0 border-t border-border">
          {homeFaqs.map((faq, index) => (
            <AccordionItem key={faq.q} value={`home-faq-${index}`} className="border-border">
              <AccordionTrigger className="gap-5 py-6 text-left text-[16px] md:text-[17px] font-medium leading-relaxed hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:rounded-sm">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[15px] text-secondary-foreground leading-[1.8] pb-6 pr-5">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
