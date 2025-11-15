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
  Play,
} from "lucide-react";
import { motion } from "framer-motion";
import { Citation } from "@/components/Citation";

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
      title: "Social Media Automation",
      description:
        "Complete social media automation: Instant DM/comment responses and multi-platform post scheduling",
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
      description: (
        <>
          Reduce labor costs by 50-70%<Citation statisticId="ai-cost-savings" />
        </>
      ),
    },
    {
      icon: TrendingUp,
      title: "Increase Conversions",
      description: (
        <>
          Convert more leads with instant responses<Citation statisticId="first-responder-wins" />
        </>
      ),
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
      <section className="relative px-4 sm:px-6 lg:px-8 pt-40 pb-32 md:pt-48 md:pb-40">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8 hover:border-primary/30 transition-all"
              data-testid="badge-hero-tag"
            >
              <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center">
                <Zap className="w-3 h-3" strokeWidth={2} />
              </div>
              AI-Powered Business Automation
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              data-testid="heading-hero-title"
            >
              Transform Your Business with{" "}
              <span className="text-primary">
                Intelligent AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed text-muted-foreground max-w-3xl mx-auto mb-10"
              data-testid="text-hero-description"
            >
              We design and deploy custom AI solutions that streamline
              operations, enhance customer experiences, and drive measurable
              growth for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="text-base px-8"
                data-testid="button-try-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Live Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8"
                data-testid="button-schedule-consultation"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              AI Solutions for Every Business Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                <Card className="h-full hover:border-primary/50 transition-all duration-300 group relative overflow-hidden" data-testid={`card-solution-${index}`}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="relative">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-all">
                          <feature.icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                        </div>
                        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-xl font-semibold" data-testid={`heading-solution-${index}`}>
                            {feature.title}
                          </h3>
                          <span className="bg-green-500/10 text-green-400 text-xs px-3 py-1 rounded-full font-medium border border-green-500/20" data-testid={`badge-status-${index}`}>
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed" data-testid={`text-solution-description-${index}`}>
                          {feature.description}
                        </p>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto text-primary hover:text-primary/80 group-hover:gap-2 transition-all font-medium"
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
      <section className="px-4 sm:px-6 lg:px-8 py-32 bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose Business Automated?
            </h2>
            <p className="text-xl text-muted-foreground">
              Real results that transform your business operations
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="relative inline-flex mb-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-primary/10 group-hover:border-primary/30 transition-all group-hover:scale-110 duration-300" data-testid={`icon-benefit-${index}`}>
                    <benefit.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-lg font-semibold mb-2" data-testid={`heading-benefit-${index}`}>
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-benefit-description-${index}`}>{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="border border-border rounded-2xl p-12 bg-card/50"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold mb-4"
              data-testid="heading-cta-section"
            >
              Ready to See AI Automation in Action?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8"
            >
              Experience our AI Receptionist live demo and discover how it can
              transform your business
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="text-base px-8"
                data-testid="button-try-interactive-demo"
                onClick={() => window.location.href = createPageUrl("AIReceptionist")}
              >
                Try Interactive Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8"
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
