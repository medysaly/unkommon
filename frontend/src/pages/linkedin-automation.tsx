import { motion } from "framer-motion";
import { Linkedin, Users, MessageCircle, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { SiLinkedin } from "react-icons/si";

export default function LinkedInAutomation() {
  const features = [
    {
      icon: Users,
      title: "Connection Requests",
      description: "Automated, personalized connection requests",
    },
    {
      icon: MessageCircle,
      title: "Message Sequences",
      description: "Multi-step outreach campaigns",
    },
    {
      icon: TrendingUp,
      title: "Lead Generation",
      description: "Identify and engage potential clients",
    },
    {
      icon: SiLinkedin,
      title: "Profile Optimization",
      description: "AI-powered profile improvements",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 to-blue-500/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-400/30">
              <Linkedin className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              LinkedIn{" "}
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Automation
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Automate your LinkedIn outreach and engagement. Build meaningful
              connections and generate leads on autopilot.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-800 hover:to-blue-600"
                data-testid="button-get-notified"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Notified When Available
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
            Upcoming Features
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
                  <Card className="h-full bg-slate-900 border-slate-700">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-700/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4 border border-blue-500/30">
                        <Icon className="w-6 h-6 text-blue-400" />
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
    </div>
  );
}
