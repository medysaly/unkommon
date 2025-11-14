import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, Calendar, Users, CheckCircle, ArrowRight, MessageSquare, Languages, Voicemail, FileText, CalendarClock, HelpCircle, Video, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import VapiDemo from "@/components/VapiDemo";
import LiveDemo from "@/components/LiveDemo";
import AIReceptionistDemos from "@/components/AIReceptionistDemos";
import receptionistImg from "@assets/openart-image_U2SOc8Ou_1762412405276_raw_1762412459397.jpg";
import { Citation } from "@/components/Citation";

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
    <>Reduce labor costs by 50-70%<Citation statisticId="ai-cost-savings" /></>,
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

      {/* Live AI Receptionist Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900 relative z-10">
        <div className="max-w-7xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-avatar-section">
              Experience the Live AI Receptionist
            </h2>
            <p className="text-xl text-gray-300">
              Speak with our AI avatar to book an appointment - watch the automation workflow in real-time
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {/* Mobile Notice */}
            <div className="md:hidden">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Phone className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Interactive Demo Available on Larger Screens
                  </h3>
                  <p className="text-gray-300">
                    To experience the live AI receptionist demo, please view this page on a tablet, laptop, or desktop computer.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Demo - Tabbed Interface */}
            <div className="hidden md:block">
              <Tabs defaultValue="voice" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 bg-slate-800 border border-slate-700">
                  <TabsTrigger
                    value="voice"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    data-testid="tab-voice-call"
                  >
                    <Mic className="w-4 h-4" />
                    Voice Call
                  </TabsTrigger>
                  <TabsTrigger
                    value="video"
                    className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                    data-testid="tab-video-avatar"
                  >
                    <Video className="w-4 h-4" />
                    Video Avatar
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="voice" className="mt-0">
                  <VapiDemo />
                </TabsContent>
                <TabsContent value="video" className="mt-0">
                  <LiveDemo />
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Receptionist Capability Demos */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Advanced AI Capabilities
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how our AI receptionist handles real-world scenarios with intelligent routing, 
              multi-language support, and 24/7 availability
            </p>
          </motion.div>

          <AIReceptionistDemos />
        </div>
      </section>

      {/* Additional Capabilities Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Office Automation Suite
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Additional capabilities to run your entire office operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* FAQ & Information Handling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <HelpCircle className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    FAQ & Information
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Instantly answers common questions about hours, services, pricing, and policies from your knowledge base.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Instant accurate responses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Reduces repetitive staff questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>24/7 information availability</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Appointment Changes */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <CalendarClock className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Appointment Management
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Handles rescheduling, cancellations, and modifications automatically with calendar integration.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Verify caller identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Real-time availability checking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Automated confirmation sending</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Voicemail Transcription */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <Voicemail className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Voicemail Intelligence
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Transcribes messages, extracts key information, and categorizes by urgency for efficient follow-up.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Accurate transcription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Searchable message records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Priority-based organization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* CRM Integration */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <FileText className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    CRM Integration
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Automatically logs calls, updates contact records, and syncs with your existing CRM system.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Automatic call logging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Contact history tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Real-time data synchronization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Message Taking */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <MessageSquare className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Intelligent Message Taking
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Captures detailed messages with caller information, reason for call, and preferred callback time.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Complete message details</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Instant email/SMS delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Callback scheduling</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Multi-Language Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-colors">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                    <Languages className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    50+ Languages
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Supports conversations in over 50 languages with automatic detection and native-level fluency.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Automatic language detection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Natural conversation flow</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>Cultural context awareness</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-800">
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
                <CardContent className="p-0">
                  <img
                    src={receptionistImg}
                    alt="Professional receptionist at corporate front desk"
                    className="w-full h-full object-cover rounded-lg"
                  />
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
