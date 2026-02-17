import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Phone, Mail, MessageSquare, MessageCircle, Smartphone } from "lucide-react";
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
              One AI Receptionist. Every Channel. 24/7.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
              data-testid="text-page-description"
            >
              Phone calls, WhatsApp, Instagram DMs, SMS — one AI handles them all. Book appointments, answer questions, and capture leads across every channel automatically.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-10"
            >
              <div className="flex flex-col items-center gap-1.5">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Phone</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <span className="text-xs text-muted-foreground">WhatsApp</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                <span className="text-xs text-muted-foreground">Instagram</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Smartphone className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">SMS</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <MessageCircle className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Messenger</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Email</span>
              </div>
            </motion.div>

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
                      Handles phone calls, WhatsApp, Instagram DMs, SMS, and email from one unified AI — identifying intent and responding instantly across every channel.
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
