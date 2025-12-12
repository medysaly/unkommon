import { motion } from "framer-motion";
import { Calendar, MessageSquare, Clock, Smartphone, CheckCircle, ArrowRight, Camera, Mic, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import WhatsAppDemo from "@/components/WhatsAppDemo";
import AIWhatsAppDemos from "@/components/AIWhatsAppDemos";
import { LuminousCard } from "@/components/LuminousCard";
import "@/styles/pearl-button.css";

export default function AIBookingSystem() {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp & SMS",
      description: "Customers book via their preferred messaging app",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI manages availability and prevents double-booking",
    },
    {
      icon: Clock,
      title: "24/7 Booking",
      description: "Accept appointments anytime, anywhere",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Optimized for on-the-go booking experiences",
    },
  ];

  const benefits = [
    "Reduce no-shows with automated reminders",
    "Sync with Google Calendar, Outlook, and more",
    "Custom booking rules and availability",
    "Multi-location support",
    "Payment integration",
    "Real-time availability updates",
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
              className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-6 leading-tight"
              data-testid="heading-page-title"
            >
              Automated Booking via{" "}
              <span className="text-foreground">
                WhatsApp & SMS
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Let customers schedule appointments 24/7 through WhatsApp and SMS. Our AI
              handles the entire booking process automatically.
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

      {/* WhatsApp Booking Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              See WhatsApp Booking In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch how customers book appointments through WhatsApp with AI-powered automation
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
                  To experience the live WhatsApp booking demo, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <WhatsAppDemo />
          </div>
        </div>
      </section>

      {/* Advanced AI Capabilities */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Beyond appointment booking, our AI handles complex scenarios that traditionally require human intervention
            </p>

            {/* Capability Cards */}
            <div className="grid md:grid-cols-3 gap-6 justify-items-center mb-16">
              {[
                { icon: Camera, title: "Visual Analysis", description: "AI analyzes photos of products, damage, receipts, or issues to provide instant assessment and solutions" },
                { icon: Mic, title: "Voice Processing", description: "Customers send voice messages, AI transcribes and understands intent to resolve issues automatically" },
                { icon: Globe, title: "Multilingual Support", description: "AI detects and responds in customer's language while your team sees everything in English" }
              ].map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <LuminousCard
                    icon={<capability.icon />}
                    title={capability.title}
                    description={capability.description}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                  <MessageSquare className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-light text-foreground tracking-tight mb-2">
                  Interactive Demos Available on Larger Screens
                </h3>
                <p className="text-muted-foreground">
                  To experience the advanced AI capability demos, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demos */}
          <div className="hidden md:block">
            <AIWhatsAppDemos />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for seamless appointment management
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <LuminousCard
                  icon={<feature.icon />}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI booking system integrates seamlessly with your existing tools and workflows
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              Ready to Enable
              <br />
              Text Booking?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's set up WhatsApp & SMS booking for your business and start accepting appointments 24/7
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
