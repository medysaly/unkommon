import { motion } from "framer-motion";
import { Phone, Clock, Calendar, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import InteractiveDemo from "@/components/InteractiveDemo";

export default function AIReceptionist() {
  const features = [
    {
      icon: Phone,
      title: "Natural Conversations",
      description: "AI-powered conversations that feel human and professional",
    },
    {
      icon: Calendar,
      title: "Appointment Booking",
      description: "Automatically schedule appointments based on availability",
    },
    {
      icon: Users,
      title: "Call Routing",
      description: "Intelligently route calls to the right team member",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a call, even outside business hours",
    },
  ];

  const benefits = [
    "Reduce receptionist costs by up to 80%",
    "Handle unlimited calls simultaneously",
    "Integrate with your existing phone system",
    "Custom voice and personality options",
    "Real-time call transcripts and analytics",
    "Multi-language support",
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/30" data-testid="badge-page-tag">
              <Phone className="w-4 h-4" />
              AI Receptionist
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              Your 24/7 AI-Powered{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Receptionist
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8" data-testid="text-page-description">
              Never miss a call again. Our AI receptionist handles customer inquiries,
              books appointments, and routes calls with natural, professional conversations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-700 text-white hover:bg-slate-800"
                data-testid="button-watch-demo"
              >
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-demo-section">
              Try the Interactive Demo
            </h2>
            <p className="text-xl text-gray-300">
              See our AI receptionist in action - book a fake appointment and watch the automation workflow
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <InteractiveDemo />
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
                <Card className="h-full bg-slate-900 border-slate-700 hover:border-blue-500/50 transition-colors" data-testid={`card-feature-${index}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30" data-testid={`icon-feature-${index}`}>
                      <feature.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2" data-testid={`heading-feature-${index}`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm" data-testid={`text-feature-description-${index}`}>{feature.description}</p>
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
                Why Choose Our AI Receptionist?
              </h2>
              <p className="text-gray-300 mb-8">
                Transform your customer service with intelligent automation that
                works around the clock.
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
                  <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center">
                    <Phone className="w-32 h-32 text-blue-400/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Fixed Background Image - Desktop/Tablet */}
        <div
          className="absolute inset-0 bg-fixed bg-no-repeat cta-bg-robot-hand hidden sm:block"
          style={{
            backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/6656d163b_alex-shuper-uFCmJ6fiWGY-unsplash.png')",
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 hidden sm:block"></div>

        {/* Mobile Landscape (568px-767px): Two Column Layout */}
        <div className="max-w-7xl mx-auto relative z-10 hidden min-[568px]:flex md:hidden items-center gap-8">
          <div className="flex-1 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="heading-cta-section">
              Ready to Deploy Your AI Receptionist?
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Let us set up your AI receptionist. Professional implementation with full support.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-xl border-2 border-white/80"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
          <div className="flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/6656d163b_alex-shuper-uFCmJ6fiWGY-unsplash.png"
              alt="AI Robot Hand"
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>

        {/* Mobile Portrait (<568px): Single Column, No Image */}
        <div className="max-w-full mx-auto text-center relative z-10 block min-[568px]:hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4" data-testid="heading-cta-section">
              Ready to Deploy Your AI Receptionist?
            </h2>
            <p className="text-base text-blue-100 mb-6">
              Let us set up your AI receptionist. Professional implementation with full support.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-xl border-2 border-white/80"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
        </div>

        {/* Desktop/Tablet (≥768px): Text Over Background */}
        <div className="max-w-7xl mx-auto text-center relative z-10 hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Deploy Your AI Receptionist?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let us set up your AI receptionist. Professional implementation with full support.
            </p>
            <Button
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 shadow-xl border-2 border-white/80"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
