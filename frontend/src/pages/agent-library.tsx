import { motion } from "framer-motion";
import { createPageUrl } from "@/lib/utils";
import { Phone, Zap, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import "@/styles/pearl-button.css";

const solutions = [
  {
    icon: Phone,
    title: "AI Receptionist",
    subtitle: "Every call. Every channel. 24/7.",
    description:
      "Answers phone calls, WhatsApp, Instagram DMs, and SMS automatically. Books appointments, routes inquiries, and captures leads across every channel — so you never miss an opportunity.",
    features: [
      "Omnichannel — phone, WhatsApp, Instagram, SMS, email",
      "Autonomous appointment booking & rescheduling",
      "Intelligent call routing to the right department",
      "50+ language support with instant detection",
    ],
    page: "AIReceptionist",
  },
  {
    icon: Zap,
    title: "Speed-to-Lead",
    subtitle: "Respond in seconds, not hours.",
    description:
      "The moment a lead comes in — from a form, ad, or inquiry — your AI qualifies them, sends a personalized response, and books a meeting before your competitors even check their inbox.",
    features: [
      "Instant response to every new inquiry",
      "AI-powered lead qualification & scoring",
      "Personalized follow-up sequences",
      "Direct calendar booking integration",
    ],
    page: "SpeedToLead",
  },
  {
    icon: Calendar,
    title: "Client Reactivator",
    subtitle: "Unlock revenue from your existing database.",
    description:
      "Automatically re-engages past clients and dormant leads with personalized outreach via WhatsApp, SMS, and email — turning your existing database into a revenue machine.",
    features: [
      "Automated reactivation campaigns",
      "WhatsApp & SMS outreach at scale",
      "Smart segmentation of dormant clients",
      "Appointment booking built in",
    ],
    page: "AIBookingSystem",
  },
];

export default function AgentLibrary() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 bg-white dark:bg-black">
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
              Our AI Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Three purpose-built AI agents that handle your front office, qualify your leads, and reactivate your past clients — all on autopilot.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-6xl mx-auto space-y-24">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "md:direction-rtl" : ""
              }`}
            >
              {/* Text Side */}
              <div className={index % 2 === 1 ? "md:order-2" : ""}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
                    <solution.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                    {solution.subtitle}
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4">
                  {solution.title}
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {solution.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {solution.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all group"
                  onClick={() =>
                    (window.location.href = createPageUrl(solution.page))
                  }
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Visual Side */}
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <div className="bg-gradient-to-b from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-black border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
                      <solution.icon className="w-8 h-8 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-light text-foreground tracking-tight">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      {solution.subtitle}
                    </p>
                    <button
                      className="pearl-button mt-4"
                      onClick={() =>
                        (window.location.href = createPageUrl(solution.page))
                      }
                    >
                      <div className="wrap">
                        <p>
                          <span>✧</span>
                          Explore
                          <ArrowRight className="w-5 h-5" />
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
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
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-foreground tracking-tight"
            >
              Not Sure Which Solution
              <br />
              Is Right for You?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Book a free consultation and we'll map the right AI stack for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <button
                className="pearl-button"
                data-testid="button-schedule-demo"
                onClick={() =>
                  (window.location.href = createPageUrl("Contact"))
                }
              >
                <div className="wrap">
                  <p>
                    <span>✦</span>
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </p>
                </div>
              </button>
            </motion.div>

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
