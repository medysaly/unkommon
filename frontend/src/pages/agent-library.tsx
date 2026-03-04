import { motion } from "framer-motion";
import { createPageUrl } from "@/lib/utils";
import { Phone, Zap, Calendar, ArrowRight, CheckCircle, Wrench, Shield, Brain, Server, Sparkles } from "lucide-react";
import "@/styles/pearl-button.css";

const solutions = [
  {
    icon: Phone,
    title: "AI Receptionist",
    subtitle: "Every call. Every channel. 24/7.",
    description:
      "Never miss another patient call, buyer inquiry, or potential case. Your AI receptionist answers every call 24/7, books appointments, routes to the right person, and speaks 50+ languages — so your front desk never drops the ball.",
    features: [
      "Dental scheduling — cleanings, emergencies, follow-ups",
      "Real estate inquiry handling — listings, showings, buyer qualification",
      "Legal intake — case screening, attorney matching, consultation booking",
      "50+ language support with instant detection",
    ],
    page: "AIReceptionist",
    image: "/images/backgrounds/AI receptionist.jpg",
  },
  {
    icon: Zap,
    title: "Speed-to-Lead",
    subtitle: "Respond in seconds, not hours.",
    description:
      "The moment a buyer submits a Zillow inquiry, a patient fills out your contact form, or someone searches for an attorney — your AI qualifies them, sends a personalized response, and books a meeting. All within 90 seconds.",
    features: [
      "Real estate lead capture — Zillow, Realtor.com, website forms",
      "Dental new patient booking — insurance verification, family scheduling",
      "Law firm case qualification — practice area matching, consultation booking",
      "Direct calendar booking integration",
    ],
    page: "SpeedToLead",
    image: "/images/backgrounds/Speed to lead.png",
  },
  {
    icon: Calendar,
    title: "Client Reactivator",
    subtitle: "Unlock revenue from your existing database.",
    description:
      "Your patient database is full of people who haven't been in 6+ months. Your CRM has hundreds of past clients who went cold. We turn that dormant data into booked appointments and recovered revenue with personalized AI outreach.",
    features: [
      "Dental recall — overdue cleanings, incomplete treatment plans",
      "Real estate past client nurture — market updates, home value alerts",
      "Law firm client re-engagement — case follow-ups, referral requests",
      "Appointment booking built in",
    ],
    page: "AIBookingSystem",
    image: "/images/backgrounds/the client reactivator .png",
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
                <div
                  className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl aspect-[4/3] group cursor-pointer"
                  onClick={() =>
                    (window.location.href = createPageUrl(solution.page))
                  }
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-2xl font-light text-white tracking-tight mb-2">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      {solution.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Custom Solutions Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white dark:bg-black border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-foreground" />
              </div>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                Beyond the three
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Something Else?
              <br />
              We'll Build It.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every business is different. If your bottleneck doesn't fit neatly into one of our three solutions — tell us the problem, we'll build the solution. Custom AI agents designed around YOUR specific workflow.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Brain, title: "Insurance Verification", desc: "Automate insurance checks and pre-authorizations before patients walk in." },
              { icon: Sparkles, title: "Review Management", desc: "Automatically request and respond to Google reviews after every appointment." },
              { icon: Wrench, title: "Document Automation", desc: "Generate lease agreements, intake forms, or engagement letters in seconds." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"
              >
                <item.icon className="w-8 h-8 text-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              These are just examples. If you can describe the problem, we can automate it.
            </p>
            <button
              className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all group"
              onClick={() => (window.location.href = createPageUrl("Contact"))}
            >
              Tell us your bottleneck
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Private AI Assistant Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-foreground/5 dark:bg-white/10 flex items-center justify-center">
                  <Server className="w-5 h-5 text-foreground" />
                </div>
                <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  Enterprise-grade
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-6">
                Your Own Private
                <br />
                AI Assistant
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Imagine hiring a senior employee who never sleeps, never forgets, and costs a fraction of a salary. We deploy a private AI assistant inside your business — hosted in a dedicated, isolated cloud environment, trained on your data, accessible to your entire team 24/7.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  { icon: Shield, text: "Hosted in a dedicated, isolated cloud environment — your data stays yours, nobody else has access" },
                  { icon: Brain, text: "Trained on your documents, processes, and institutional knowledge" },
                  { icon: Sparkles, text: "Handles emails, scheduling, customer inquiries, internal Q&A — whatever you need" },
                  { icon: CheckCircle, text: "Your team interacts with it naturally — like messaging a coworker" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <item.icon className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className="inline-flex items-center gap-2 text-foreground font-medium hover:gap-3 transition-all group"
                onClick={() => (window.location.href = createPageUrl("Contact"))}
              >
                Learn more
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-2xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium text-foreground">Private AI — Online</span>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <p className="text-sm text-muted-foreground mb-1">You</p>
                    <p className="text-foreground text-sm">What appointments do we have open this Thursday afternoon?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
                    <p className="text-sm text-muted-foreground mb-1">AI Assistant</p>
                    <p className="text-foreground text-sm">Thursday afternoon has 3 open slots: 1:00 PM, 2:30 PM, and 4:00 PM. Dr. Patel is in all day. Should I book a patient into one of these?</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                    <p className="text-sm text-muted-foreground mb-1">You</p>
                    <p className="text-foreground text-sm">Yes, book Sarah Chen at 2:30 for a cleaning.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800">
                    <p className="text-sm text-muted-foreground mb-1">AI Assistant</p>
                    <p className="text-foreground text-sm">Done. Sarah Chen is booked for Thursday at 2:30 PM with Dr. Patel. Confirmation text sent to her. Anything else?</p>
                  </div>
                </div>
              </motion.div>
            </div>
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
