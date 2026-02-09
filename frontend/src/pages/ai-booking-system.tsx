import { motion } from "framer-motion";
import { MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import ClientReactivatorDemo from "@/components/ClientReactivatorDemo";
import "@/styles/pearl-button.css";

export default function AIBookingSystem() {
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
              Unlock Revenue Hidden in Your Existing Database
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Automated Reactivation. Zero Ad Spend. 100% ROI.
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

      {/* Client Reactivator Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              See Client Reactivation In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch how AI scans your database, engages dormant customers, and books appointments automatically
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                  <MessageSquare className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-light text-foreground tracking-tight mb-2">
                  Interactive Demo Available on Larger Screens
                </h3>
                <p className="text-muted-foreground">
                  To experience the live reactivation demo, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <ClientReactivatorDemo />
          </div>
        </div>
      </section>

      {/* Client Reactivator Detailed Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              Your most profitable asset is the list of leads and clients you already paid to acquire. This agent connects to your CRM or patient management system (like Salesforce, ServiceTitan, or OpenDental) to identify dormant contacts. It launches personalized, natural SMS campaigns to re-engage them, reigniting old relationships and filling your calendar without spending a dime on new marketing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* The Capabilities */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-3xl font-semibold text-foreground mb-8">
                The Capabilities
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Smart Segmentation</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Scans your database to find high-value targets (e.g., "Patients overdue by 6 months" or "Leads who ghosted in 2024").
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Conversational Outreach</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Sends personalized, 2-way text messages—not generic "blasts"—that invite the client to book an appointment or claim an offer.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Autonomous Booking</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Handles the back-and-forth scheduling conversation and books the appointment directly into your calendar.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">List Hygiene</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Automatically flags disconnected numbers and updates client details, cleaning your database while it generates revenue.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Campaign Logic</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Runs specific plays for different goals: Annual Check-ups, Seasonal Promos, or "Unsold Estimate" follow-ups.
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
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-3xl font-semibold text-foreground mb-8">
                The "Revenue" Promise
              </h3>
              <div className="mb-8">
                <p className="text-xl text-muted-foreground leading-relaxed italic">
                  "Stop burning cash on new ads until you've monetized the leads you already own."
                </p>
              </div>
              <h3 className="text-3xl font-semibold text-foreground mb-8 mt-12">
                Why This Works
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Zero Ad Spend
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "This is the killer hook. Business owners hate rising ad costs."
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Specific Systems
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "Mentioning ServiceTitan (Trades) or OpenDental (Dentists) signals you understand their specific industry software."
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    List Hygiene
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "Tells them you will leave their database in better shape than you found it."
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
              Ready to Reactivate
              <br />
              Your Database?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's connect to your CRM and start turning dormant contacts into booked appointments
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
                <span>Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
