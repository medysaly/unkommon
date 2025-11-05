import { motion } from "framer-motion";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Zap,
  Calendar,
  MessageSquare,
  Briefcase,
  Brain,
  FileText,
  Linkedin,
  TrendingUp,
  Package,
  ArrowRight,
} from "lucide-react";

export default function AgentLibrary() {
  const agents = [
    {
      icon: Phone,
      title: "AI Receptionist",
      description: "24/7 intelligent phone answering with natural conversations",
      color: "from-blue-500 to-indigo-500",
      page: "AIReceptionist",
      status: "Available",
    },
    {
      icon: Zap,
      title: "Speed-to-Lead",
      description: "Instant personalized responses to customer inquiries",
      color: "from-purple-500 to-pink-500",
      page: "SpeedToLead",
      status: "Available",
    },
    {
      icon: Calendar,
      title: "AI Booking System",
      description: "WhatsApp & SMS booking automation",
      color: "from-green-500 to-emerald-500",
      page: "AIBookingSystem",
      status: "Available",
    },
    {
      icon: MessageSquare,
      title: "Social Media Bot",
      description: "Automated Instagram & Facebook DM responses",
      color: "from-orange-500 to-red-500",
      page: "SocialMediaBot",
      status: "Available",
    },
    {
      icon: Briefcase,
      title: "Executive Assistant",
      description: "AI-powered executive scheduling and task management",
      color: "from-blue-600 to-purple-600",
      page: "ExecutiveAssistant",
      status: "Coming Soon",
    },
    {
      icon: Brain,
      title: "Company Knowledge Bot",
      description: "Instant answers from your company documentation",
      color: "from-cyan-500 to-blue-500",
      page: "CompanyKnowledgeBot",
      status: "Coming Soon",
    },
    {
      icon: FileText,
      title: "Content Factory",
      description: "Automated content generation for marketing",
      color: "from-pink-500 to-rose-500",
      page: "ContentFactory",
      status: "Coming Soon",
    },
    {
      icon: Linkedin,
      title: "LinkedIn Automation",
      description: "Automated LinkedIn outreach and engagement",
      color: "from-blue-700 to-blue-500",
      page: "LinkedInAutomation",
      status: "Coming Soon",
    },
    {
      icon: TrendingUp,
      title: "SEO Rank Tracker",
      description: "Monitor and improve your search rankings",
      color: "from-green-600 to-teal-500",
      page: "SEORankTracker",
      status: "Coming Soon",
    },
    {
      icon: Package,
      title: "DHL Tracking Bot",
      description: "Automated shipping notifications and tracking",
      color: "from-yellow-600 to-red-600",
      page: "DHLTrackingBot",
      status: "Coming Soon",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              AI Agent{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Library
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore our collection of AI-powered automation agents designed to
              transform every aspect of your business operations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full bg-slate-800 border-slate-700 hover:border-blue-500/50 transition-all hover:shadow-xl group" data-testid={`card-agent-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-br ${agent.color} rounded-xl flex items-center justify-center shadow-lg`}
                        data-testid={`icon-agent-${index}`}
                      >
                        <agent.icon className="w-6 h-6 text-white" />
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${
                          agent.status === "Available"
                            ? "bg-green-500/20 text-green-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                        data-testid={`badge-status-${index}`}
                      >
                        {agent.status}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2" data-testid={`heading-agent-${index}`}>
                      {agent.title}
                    </h3>
                    <p className="text-gray-400 mb-4 text-sm" data-testid={`text-agent-description-${index}`}>
                      {agent.description}
                    </p>
                    
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-400 group-hover:gap-2 transition-all"
                      data-testid={`link-${agent.page.toLowerCase()}`}
                      onClick={() => window.location.href = createPageUrl(agent.page)}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss which AI agents are right for your business
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              data-testid="button-contact-us"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Contact Us
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
