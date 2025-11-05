import { motion } from "framer-motion";
import { MessageSquare, Instagram, Facebook, Zap, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { SiInstagram, SiFacebook } from "react-icons/si";

export default function SocialMediaBot() {
  const features = [
    {
      icon: SiInstagram,
      title: "Instagram DMs",
      description: "Instant responses to Instagram direct messages",
    },
    {
      icon: SiFacebook,
      title: "Facebook Messages",
      description: "Automated Facebook Messenger replies",
    },
    {
      icon: Zap,
      title: "Instant Replies",
      description: "Response times under 1 second",
    },
    {
      icon: MessageSquare,
      title: "Lead Capture",
      description: "Automatically collect and qualify leads",
    },
  ];

  const benefits = [
    "Respond to DMs 24/7, even while you sleep",
    "Maintain consistent brand voice",
    "Qualify leads automatically",
    "Integrate with your CRM",
    "Multi-language support",
    "Custom response templates",
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-400/30" data-testid="badge-page-tag">
              <MessageSquare className="w-4 h-4" />
              Social Media Bot
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              Never Miss a{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Social DM
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Automated Instagram and Facebook DM responses with instant replies and
              intelligent lead capture. Engage your audience 24/7.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
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
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full bg-slate-900 border-slate-700 hover:border-orange-500/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-orange-500/30">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
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
                Engage Your Audience 24/7
              </h2>
              <p className="text-gray-300 mb-8">
                Turn social media interactions into business opportunities with
                intelligent automation.
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
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
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
                  <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-32 h-32 text-orange-400/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Desktop/Tablet (≥768px): Background image */}
        <div className="max-w-7xl mx-auto hidden md:block">
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <div
              className="absolute inset-0 bg-fixed bg-no-repeat cta-bg-social-icons"
              style={{
                backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/a01fd465d_socialIcons.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Automate Your Social Media?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Let's set up your Instagram & Facebook bot to never miss a lead.
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
          </div>
        </div>

        {/* Mobile Landscape (568px-767px): Two Column Layout */}
        <div className="max-w-7xl mx-auto hidden min-[568px]:flex md:hidden items-center gap-8">
          <div className="flex-1 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Automate Your Social Media?
            </h2>
            <p className="text-lg text-pink-100 mb-6">
              Let's set up your Instagram & Facebook bot to never miss a lead.
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
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/a01fd465d_socialIcons.jpg"
              alt="Social Media Icons"
              className="w-full h-auto object-contain max-h-96 rounded-lg"
            />
          </div>
        </div>

        {/* Mobile Portrait (<568px): Single Column, No Image */}
        <div className="max-w-full mx-auto text-center block min-[568px]:hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Automate Your Social Media?
            </h2>
            <p className="text-base text-pink-100 mb-6">
              Let's set up your Instagram & Facebook bot to never miss a lead.
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
