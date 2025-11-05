import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Zap,
  Calendar,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const features = [
    {
      icon: Phone,
      title: "AI Receptionist",
      description:
        "24/7 intelligent phone answering with natural conversations, appointment booking, and call routing",
      status: "Available Now",
      color: "from-blue-500 to-indigo-500",
      page: "AIReceptionist",
    },
    {
      icon: Zap,
      title: "Speed-to-Lead",
      description:
        "Instant personalized responses to customer inquiries, capturing leads before competitors",
      status: "Available Now",
      color: "from-purple-500 to-pink-500",
      page: "SpeedToLead",
    },
    {
      icon: Calendar,
      title: "AI Booking System",
      description:
        "WhatsApp & SMS booking automation allowing customers to schedule appointments 24/7",
      status: "Available Now",
      color: "from-green-500 to-emerald-500",
      page: "AIBookingSystem",
    },
    {
      icon: MessageSquare,
      title: "Social Media Bot",
      description:
        "Automated Instagram & Facebook DM responses with instant replies and lead capture",
      status: "Available Now",
      color: "from-orange-500 to-red-500",
      page: "SocialMediaBot",
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss a customer call or inquiry",
    },
    {
      icon: DollarSign,
      title: "Reduce Costs",
      description: "Cut receptionist costs by up to 80%",
    },
    {
      icon: TrendingUp,
      title: "Increase Conversions",
      description: "Convert more leads with instant responses",
    },
    {
      icon: CheckCircle,
      title: "Improve Experience",
      description: "Provide consistent, professional service",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-32 min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background Video */}
        <div
          className="absolute inset-0 z-0"
          style={{ top: 0, left: 0, width: "100%", height: "100%" }}
        >
          <iframe
            src="https://player.cloudinary.com/embed/?cloud_name=ddegrzevr&public_id=Ai-Cpu-4K-2025-10-16-08-16-19-Utc_wb9wln&profile=cld-default&autoplay=true&muted=true&controls=false&showLogo=false&bigPlayButton=false&hideContextMenu=true"
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            allowFullScreen
            className="pointer-events-none"
            style={{
              border: "none",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            title="AI Background Video"
          ></iframe>
        </div>

        {/* Top Content - Text */}
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-blue-500/80 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/50"
              data-testid="badge-hero-tag"
            >
              <Zap className="w-4 h-4" />
              AI-Powered Business Automation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
              data-testid="heading-hero-title"
            >
              Transform Your Business with{" "}
              <span
                className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
                style={{ textShadow: "none" }}
              >
                Intelligent AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl leading-relaxed text-white max-w-3xl"
              style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.8)" }}
              data-testid="text-hero-description"
            >
              We design and deploy custom AI solutions that streamline
              operations, enhance customer experiences, and drive measurable
              growth for your business.
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom Content - Buttons */}
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex justify-center"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl text-lg px-8"
                data-testid="button-try-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Live Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900 text-lg px-8 backdrop-blur-sm"
                data-testid="button-schedule-consultation"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI Solutions for Every Business Need
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Powerful automation tools designed to transform how you interact
              with customers
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500 group bg-slate-800 border-slate-700" data-testid={`card-solution-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <feature.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-white" data-testid={`heading-solution-${index}`}>
                            {feature.title}
                          </h3>
                          <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full font-medium" data-testid={`badge-status-${index}`}>
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-gray-300 mb-4" data-testid={`text-solution-description-${index}`}>
                          {feature.description}
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-blue-400 group-hover:gap-2 transition-all"
                          data-testid={`link-demo-${feature.page.toLowerCase()}`}
                          onClick={() => window.location.href = createPageUrl(feature.page)}
                        >
                          See Live Demo
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Business Automated?
            </h2>
            <p className="text-xl text-gray-300">
              Real results that transform your business operations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30"
                  data-testid={`icon-benefit-${index}`}
                >
                  <benefit.icon className="w-8 h-8 text-blue-400" />
                </motion.div>
                <h3 className="text-lg font-bold text-white mb-2" data-testid={`heading-benefit-${index}`}>
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm" data-testid={`text-benefit-description-${index}`}>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Fixed Background Image - Desktop/Tablet */}
        <div
          className="absolute inset-0 bg-cover bg-fixed bg-no-repeat cta-bg-robot-head hidden sm:block"
          style={{
            backgroundImage:
              "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/45a4dfa4a_getty-images-fMx5M3lg8oI-unsplash.jpg')",
          }}
        ></div>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 hidden sm:block"></div>

        {/* Mobile Landscape (568px-767px): Two Column Layout */}
        <div className="max-w-7xl mx-auto relative z-10 hidden min-[568px]:flex md:hidden items-center gap-8">
          <div className="flex-1 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" data-testid="heading-cta-section">
              Ready to See AI Automation in Action?
            </h2>
            <p className="text-lg text-gray-200 mb-6">
              Experience our AI Receptionist live demo and discover how it can transform your business
            </p>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
                data-testid="button-try-interactive-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900"
                data-testid="button-schedule-setup-call"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Setup Call
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/45a4dfa4a_getty-images-fMx5M3lg8oI-unsplash.jpg"
              alt="AI Robot"
              className="w-full h-auto object-contain max-h-96"
            />
          </div>
        </div>

        {/* Mobile Portrait (<568px): Single Column, No Image */}
        <div className="max-w-full mx-auto text-center relative z-10 block min-[568px]:hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-4" data-testid="heading-cta-section">
              Ready to See AI Automation in Action?
            </h2>
            <p className="text-base text-gray-200 mb-6">
              Experience our AI Receptionist live demo and discover how it can transform your business
            </p>
            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
                data-testid="button-try-interactive-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900"
                data-testid="button-schedule-setup-call"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Setup Call
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet (≥768px): Text Over Background */}
        <div className="max-w-7xl mx-auto text-center relative z-10 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              data-testid="heading-cta-section"
            >
              Ready to See AI Automation in Action?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-gray-200 mb-8"
            >
              Experience our AI Receptionist live demo and discover how it can
              transform your business
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 shadow-xl"
                data-testid="button-try-interactive-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-white text-white bg-white/10 hover:bg-white hover:text-gray-900"
                data-testid="button-schedule-setup-call"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Setup Call
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
