import { motion } from "framer-motion";
import { Calendar, MessageSquare, Clock, Smartphone, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";

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
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-400/30" data-testid="badge-page-tag">
              <Calendar className="w-4 h-4" />
              AI Booking System
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              Automated Booking via{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                WhatsApp & SMS
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Let customers schedule appointments 24/7 through WhatsApp and SMS. Our AI
              handles the entire booking process automatically.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
          >
            Powerful Features
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-900 border-slate-700 hover:border-green-500/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center mb-4 border border-green-500/30">
                      <feature.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Everything You Need
              </h2>
              <p className="text-gray-300 mb-8">
                Our AI booking system integrates seamlessly with your existing tools
                and workflows.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-32 h-32 text-green-400/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        {/* Desktop/Tablet (≥768px): Card with animated WhatsApp */}
        <div className="max-w-7xl mx-auto hidden md:block">
          <Card className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-500/30 p-12 relative overflow-hidden">
            {/* Sliding WhatsApp Icon */}
            <motion.div
              initial={{ x: -200, opacity: 0 }}
              whileInView={{
                x: [null, 950, 850],
                opacity: [1, 1, 1]
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                times: [0, 0.8, 1]
              }}
              className="absolute left-10 top-4 w-64 h-64 pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/6ebd3f4fc_whatsApp.png"
                alt="WhatsApp"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Enable Text Booking?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                Let's set up WhatsApp & SMS booking for your business.
              </p>
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                data-testid="button-schedule-demo"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Demo Call
              </Button>
            </div>
          </Card>
        </div>

        {/* Mobile Landscape (568px-767px): Two Column Layout */}
        <div className="max-w-7xl mx-auto hidden min-[568px]:flex md:hidden items-center gap-8">
          <div className="flex-1 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Enable Text Booking?
            </h2>
            <p className="text-lg text-green-100 mb-6">
              Let's set up WhatsApp & SMS booking for your business.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
          <div className="flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/6ebd3f4fc_whatsApp.png"
              alt="WhatsApp"
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>

        {/* Mobile Portrait (<568px): Single Column, No Image */}
        <div className="max-w-full mx-auto text-center block min-[568px]:hidden">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl p-8 border border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Enable Text Booking?
            </h2>
            <p className="text-base text-green-100 mb-6">
              Let's set up WhatsApp & SMS booking for your business.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
