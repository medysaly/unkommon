import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { createPageUrl } from "@/lib/utils";
import VapiDemo from "@/components/VapiDemo";
import AIReceptionistDemos from "@/components/AIReceptionistDemos";
import { Citation } from "@/components/Citation";
import { DetailsAccordion } from "@/components/DetailsAccordion";
import "@/styles/pearl-button.css";

export default function AIReceptionist() {
  const accordionBenefits = [
    {
      title: "Massive Cost Reduction",
      content: (
        <>
          <p>
            Reduce labor costs by 50-70%<Citation statisticId="ai-cost-savings" /> by automating routine receptionist tasks.
            Our AI receptionist works 24/7 without breaks, sick days, or overtime pay, providing consistent service
            at a fraction of the cost of traditional staffing.
          </p>
          <p>
            Say goodbye to expensive staffing agencies and the costs associated with hiring, training, and managing
            human receptionists. Your AI receptionist is ready to work from day one.
          </p>
        </>
      ),
    },
    {
      title: "Unlimited Concurrent Calls",
      content: (
        <>
          <p>
            Handle unlimited calls simultaneously without ever putting customers on hold. Whether you receive 10 or
            1,000 calls at the same time, each caller gets immediate, personalized attention.
          </p>
          <p>
            No more busy signals, no more frustrated customers waiting in queue. Scale your call handling capacity
            instantly during peak times, seasonal rushes, or marketing campaigns without adding staff.
          </p>
        </>
      ),
    },
    {
      title: "Seamless System Integration",
      content: (
        <>
          <p>
            Integrate seamlessly with your existing phone system, CRM, calendar, and business tools. Our AI receptionist
            works with popular platforms like Salesforce, HubSpot, Google Calendar, Microsoft Teams, and more.
          </p>
          <p>
            No need to replace your current infrastructure. We connect to what you already use, syncing data in real-time
            and maintaining a single source of truth across all your business systems.
          </p>
        </>
      ),
    },
    {
      title: "Custom Voice & Personality",
      content: (
        <>
          <p>
            Choose from multiple voice options and customize your AI receptionist's personality to match your brand.
            Whether you need a professional corporate tone, friendly casual style, or industry-specific approach,
            we'll tailor the experience.
          </p>
          <p>
            Set custom greetings, scripted responses for common scenarios, and even adjust speaking pace and tone.
            Your AI receptionist becomes a true extension of your brand identity.
          </p>
        </>
      ),
    },
    {
      title: "Real-Time Intelligence",
      content: (
        <>
          <p>
            Access real-time call transcripts, analytics, and insights from every conversation. See what customers
            are asking about, track appointment bookings, monitor call duration, and identify trends in customer inquiries.
          </p>
          <p>
            Our dashboard provides actionable data to improve your business operations, from frequently asked questions
            to peak call times. Make data-driven decisions with comprehensive reporting and analytics.
          </p>
        </>
      ),
    },
    {
      title: "50+ Language Support",
      content: (
        <>
          <p>
            Serve customers in over 50 languages with automatic language detection and native-level fluency.
            Your AI receptionist seamlessly switches between languages mid-conversation, breaking down communication barriers.
          </p>
          <p>
            Expand your market reach globally without hiring multilingual staff. From Spanish and Mandarin to Arabic
            and Portuguese, provide excellent service to diverse customer bases with cultural context awareness.
          </p>
        </>
      ),
    },
  ];

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
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground tracking-tight"
              data-testid="heading-page-title"
            >
              AI Receptionist That Answers Every Call, 24/7
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
              data-testid="text-page-description"
            >
              Book appointments, route calls, and handle FAQs automatically so your team can focus on real customers, not ringing phones.
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

      {/* Live AI Receptionist Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black relative z-10">
        <div className="max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4 tracking-tight" data-testid="heading-avatar-section">
              Experience the Live AI Receptionist
            </h2>
            <p className="text-xl text-muted-foreground">
              Speak with our AI avatar to book an appointment - watch the automation workflow in real-time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <VapiDemo />
          </motion.div>
        </div>
      </section>

      {/* AI Receptionist Detailed Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our AI receptionist greets every caller instantly, understands what they need, and takes action whether that is booking, rescheduling, or canceling an appointment, answering common questions, or routing them to the right person. It connects directly to your calendar and tools to keep your schedule full, reduce no-shows, and log key details without manual data entry. By handling routine calls and after-hours inquiries, it frees your staff to focus on complex conversations and high-value clients, while ensuring no opportunity is missed.
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
                    <h4 className="text-lg font-semibold text-foreground mb-2">Omnichannel Response</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Answers calls and messages instantly, identifying intent (booking, cancellation, pricing) immediately.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Full Calendar Management</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Autonomous booking, rescheduling, and cancellations directly into your system.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Custom Brand Persona</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      We design the agent's personality to match your brand voice—whether that is professional and clinical, or warm and casual.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Strict Guardrails</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Built with rigid safety protocols. The agent operates within your specific business rules and never goes "off-script."
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Intelligent Routing</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Solves routine problems solo and surgically routes complex matters to the right human department
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-2 h-2 rounded-full bg-foreground mt-2" />
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-2">Revenue & Upsells</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      Suggests relevant add-ons or service upgrades during the booking process to increase average order value.
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
                Why This Works
              </h3>
              <div className="space-y-8">
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Smart Qualification
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "I won't waste your time with spam."
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Revenue & Upsells
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "This bot makes me money."
                  </p>
                </div>
                <div className="border-l-4 border-foreground pl-6">
                  <p className="text-lg text-foreground font-semibold mb-2">
                    Instant Support
                  </p>
                  <p className="text-base text-muted-foreground leading-relaxed italic">
                    "This bot saves me time on boring admin tasks."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Receptionist Capability Demos */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              See how our AI receptionist handles real-world scenarios with intelligent routing,
              multi-language support, and 24/7 availability
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <AIReceptionistDemos />
          </motion.div>
        </div>
      </section>

      {/* Why Choose Our AI Receptionist - Accordion Section */}
      <section className="px-0 py-20 relative overflow-hidden bg-white dark:bg-black">
        <div className="mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <DetailsAccordion
              items={accordionBenefits}
              title="Why Choose Our AI Receptionist?"
              subtitle="Transform your customer service with intelligent automation that works around the clock"
            />
          </motion.div>
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
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-foreground tracking-tight"
              data-testid="heading-cta-section"
            >
              Ready to Deploy Your
              <br />
              AI Receptionist?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let us set up your AI receptionist. Professional implementation with full support and ongoing optimization.
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
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Quick Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
