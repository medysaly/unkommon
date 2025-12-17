import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import SpeedToLeadDemo from "@/components/SpeedToLeadDemo";
import "@/styles/pearl-button.css";

export default function SpeedToLead() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-6 leading-tight"
              data-testid="heading-page-title"
            >
              Turn New Inquiries Into Qualified Meetings in Minutes
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Instant, personalized responses to customer inquiries. Our AI ensures you
              never lose a lead due to slow response times.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                className="pearl-button"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✧</span>
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Demos - Moved to Top */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              See Speed-to-Lead In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch real case studies showing how AI responds instantly across different channels - before your competitors even see the inquiry
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                  <CheckCircle className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-light text-foreground tracking-tight mb-2">
                  Interactive Demos Available on Larger Screens
                </h3>
                <p className="text-muted-foreground">
                  To experience the live case study demos, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <SpeedToLeadDemo />
          </div>
        </div>
      </section>

      {/* Lead Qualifier Detailed Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              This agent connects directly to your existing lead sources—Facebook & Instagram Ads, Zillow, and website forms—to engage every new inquiry within seconds. It starts a real conversation via SMS, email, or phone to filter out spam and duplicates. Qualified prospects are scored and either booked straight onto your calendar or routed to a rep, with every interaction synced back into your CRM (like Salesforce, HubSpot, or GoHighLevel).
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* The Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-3xl font-semibold text-foreground mb-8">
                The Capabilities
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Instant Outreach</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Triggers immediate response to leads from Facebook, Zillow, chat widgets, and calls.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Automated Qualification</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Asks your key qualifying questions (budget, timeline, authority) using your custom rules.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Smart Routing</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Auto-books meetings directly to rep calendars based on lead score.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Persistent Follow-up</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Executes multi-touch nurture sequences over SMS, email, and voice.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">CRM Sync</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Updates Salesforce/HubSpot fields automatically and filters out spam/duplicates.
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Why This Works */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-3xl font-semibold text-foreground mb-8">
                The "Pipeline" Promise
              </h3>
              <div className="mb-8">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Never let a hot lead go cold again—every inquiry gets a fast response, clear qualification, and a path to a booked meeting, turning more of your marketing spend into real, forecastable pipeline.
                </p>
              </div>
              <h3 className="text-3xl font-semibold text-foreground mb-8 mt-12">
                Why This Works
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    CRM Enrichment
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "This bot keeps my Salesforce/HubSpot clean."
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Peak Intent
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    Uses marketing language that realtors and agencies understand.
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Integrates with Existing Sources
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "Removes the fear that they have to change their whole marketing strategy. It just plugs in."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-32 overflow-hidden bg-white dark:bg-black">

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-6"
              data-testid="heading-cta-section"
            >
              Ready to Never Miss
              <br />
              a Lead?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's set up your Speed-to-Lead automation and start converting more prospects into customers
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="pearl-button"
                data-testid="button-schedule-demo"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Schedule Your Demo Call
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>No Long-Term Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Results Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
