import { motion } from "framer-motion";
import { Zap, MessageCircle, Target, TrendingUp, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import SpeedToLeadDemo from "@/components/SpeedToLeadDemo";
import { Citation } from "@/components/Citation";
import { LuminousCard } from "@/components/LuminousCard";
import "@/styles/pearl-button.css";

export default function SpeedToLead() {
  const features = [
    {
      icon: Zap,
      title: "Instant Response",
      description: "Respond to leads in seconds, not hours",
    },
    {
      icon: MessageCircle,
      title: "Personalized Messages",
      description: "AI-crafted responses tailored to each inquiry",
    },
    {
      icon: Target,
      title: "Lead Qualification",
      description: "Automatically qualify and prioritize leads",
    },
    {
      icon: TrendingUp,
      title: "Higher Conversion",
      description: "Convert more leads with immediate engagement",
    },
  ];

  const stats = [
    { 
      value: "21x", 
      label: "Higher Qualification Rate",
      citation: "lead-response-5min",
      description: "Responding within 5 min vs 30 min"
    },
    { 
      value: "78%", 
      label: "Buy From First Responder",
      citation: "first-responder-wins",
      description: "Speed is critical in competitive markets"
    },
    { value: "24/7", label: "Always Available" },
    { 
      value: "391%", 
      label: "Conversion Increase",
      citation: "lead-response-1min",
      description: "With 1-minute response time"
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
              className="text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-6 leading-tight"
              data-testid="heading-page-title"
            >
              Capture Leads Before Your{" "}
              <span className="text-foreground">
                Competition
              </span>
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
                  <Zap className="w-8 h-8 text-foreground" />
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

      {/* Features Section - Lightning-Fast Lead Response */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
              Lightning-Fast Lead Response
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our AI responds instantly across all channels, qualifying and engaging leads before your competition even sees them
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

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4">
              The Power of Speed
            </h2>
            <p className="text-muted-foreground text-lg">Real data that proves speed wins in lead conversion</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
                data-testid={`stat-card-${index}`}
              >
                <Card className="h-full bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform">
                      {stat.value}
                      {stat.citation && <Citation statisticId={stat.citation} />}
                    </div>
                    <div className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</div>
                    {stat.description && (
                      <div className="text-muted-foreground text-xs mt-1">{stat.description}</div>
                    )}
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
