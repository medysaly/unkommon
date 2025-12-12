import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";
import { ExpandableBenefits } from "@/components/ExpandableBenefits";
import "@/styles/pearl-button.css";
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  TrendingUp,
  Brain,
  Workflow,
  ArrowRight,
  CheckCircle2,
  Zap,
  Linkedin,
  LucideIcon,
  Clock,
  Target,
  Shield,
  BarChart3,
  Headphones,
  Settings,
} from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  lead: string;
  icon: LucideIcon;
  color: string;
  image: string;
  description: string;
  details: string[];
}

interface Founder {
  name: string;
  role: string;
  icon: LucideIcon;
  gradient: string;
  image: string;
  linkedin: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  goal: string;
}

export default function About() {
  const processSteps: ProcessStep[] = [
    {
      number: "01",
      title: "Discovery & Strategy",
      lead: "Both Co-Founders",
      icon: Lightbulb,
      color: "from-blue-500 to-cyan-500",
      image: "/images/about/Discovery & strategy.jpeg",
      description: "We conduct strategy calls to understand your goals, current systems, and challenges. We identify AI and automation opportunities that enhance performance and efficiency.",
      details: [
        "Understand client goals and challenges",
        "Identify AI & automation opportunities",
        "Define scope and measurable outcomes",
        "Develop tailored roadmap"
      ]
    },
    {
      number: "02",
      title: "Solution Design",
      lead: "AI + Automation",
      icon: Palette,
      color: "from-purple-500 to-pink-500",
      image: "/images/about/Solution Design.jpeg",
      description: "Mehdi designs the AI architecture while Carlton maps automation workflows. Together, we create a seamless blueprint for your solution.",
      details: [
        "Design AI application architecture",
        "Map integration and workflow automations",
        "Create wireframes and prototypes",
        "Align AI design with automation blueprint"
      ]
    },
    {
      number: "03",
      title: "Development & Integration",
      lead: "Building Your Solution",
      icon: Code,
      color: "from-green-500 to-emerald-500",
      image: "/images/about/Development & Integration.jpeg",
      description: "Mehdi develops the AI-powered app while Carlton builds automation workflows. Continuous collaboration ensures everything works harmoniously.",
      details: [
        "Develop AI features and functionalities",
        "Build automation workflows and integrations",
        "Connect AI to CRM, email, SMS, and data tools",
        "Ensure seamless data exchange"
      ]
    },
    {
      number: "04",
      title: "Testing & Optimization",
      lead: "Both Co-Founders",
      icon: TestTube,
      color: "from-orange-500 to-red-500",
      image: "/images/about/Testing & Optimization.jpeg",
      description: "End-to-end testing with real-world simulations using your data. We refine and optimize based on performance and your feedback.",
      details: [
        "Test AI logic and app functionality",
        "Validate automation performance",
        "Run real-world simulations",
        "Iterate based on feedback"
      ]
    },
    {
      number: "05",
      title: "Deployment & Training",
      lead: "Launch & Onboard",
      icon: Rocket,
      color: "from-indigo-500 to-purple-500",
      image: "/images/about/Deployment & Training.jpeg",
      description: "We deploy your AI solution and launch all automations. Your team receives comprehensive training and documentation.",
      details: [
        "Deploy AI to production",
        "Launch integrated automations",
        "Provide onboarding sessions",
        "Train team on usage and maintenance"
      ]
    },
    {
      number: "06",
      title: "Support & Growth",
      lead: "Both Co-Founders",
      icon: TrendingUp,
      color: "from-pink-500 to-rose-500",
      image: "/images/about/Support & Growth.jpeg",
      description: "Ongoing support, maintenance, and updates. We help you grow with new features and optimizations as your business evolves.",
      details: [
        "Continuous support and maintenance",
        "Collect usage data and feedback",
        "Identify new optimization opportunities",
        "Propose feature expansions"
      ]
    }
  ];

  const founders: Founder[] = [
    {
      name: "Mehdi Salhi",
      role: "Co-Founder | AI Developer",
      icon: Brain,
      gradient: "from-blue-600 to-indigo-600",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/7a75c6f87_mehdi.jpg",
      linkedin: "https://www.linkedin.com/in/mehdi-salhi-work/",
      description: "Leads the design and development of AI-driven applications, creating intelligent, scalable solutions that deliver real business value.",
      responsibilities: [
        "AI Application Development",
        "App Design & Architecture",
        "Machine Learning Integration",
        "Technical Leadership"
      ],
      skills: [
        "Python, JavaScript, React, Node.js",
        "Machine Learning (TensorFlow, PyTorch)",
        "Prompt Engineering & AI Integration",
        "Cloud Deployment (AWS, Azure, GCP)"
      ],
      goal: "To lead innovation by developing custom AI applications that become the foundation for each client's digital transformation."
    },
    {
      name: "Carlton Harrison",
      role: "Co-Founder | Automation Engineer",
      icon: Workflow,
      gradient: "from-purple-600 to-pink-600",
      image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/c93dc8162_preview.jpg",
      linkedin: "https://www.linkedin.com/in/carlton-harrison-a0387418/",
      description: "Oversees automated workflows that enhance business efficiency, connecting AI solutions with real-world operations through smart integrations.",
      responsibilities: [
        "Automation Development",
        "System Integration",
        "Process Engineering",
        "Client Implementation & Training"
      ],
      skills: [
        "Zapier, Make, n8n, Airtable",
        "API Integration & Webhooks",
        "CRM Systems (HubSpot, GoHighLevel)",
        "Workflow Design & Optimization"
      ],
      goal: "To ensure every AI product becomes an operationally efficient, integrated solution that delivers measurable outcomes for clients."
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "Custom AI Solutions",
      description: "Tailored AI applications designed specifically for your business needs and objectives",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Zap,
      title: "Complete Automation",
      description: "End-to-end workflow automation that eliminates repetitive tasks and saves hours daily",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Settings,
      title: "Seamless Integration",
      description: "Full integration with your existing tools, CRMs, and business systems",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Insights",
      description: "Real-time analytics and reporting to track performance and optimize operations",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "AI-powered systems that work around the clock without breaks or downtime",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Target,
      title: "Measurable ROI",
      description: "Clear metrics and KPIs that demonstrate real business value and cost savings",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols to protect your data and customer information",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      icon: Headphones,
      title: "Ongoing Support",
      description: "Dedicated support, maintenance, and continuous optimization from our team",
      gradient: "from-teal-500 to-cyan-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6" data-testid="heading-page-title">
              AI Innovation Meets{" "}
              <span className="text-foreground">
                Automation Mastery
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed" data-testid="text-hero-description">
              We combine the power of AI development and automation engineering to create intelligent,
              fully integrated solutions that transform businesses and deliver real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4" data-testid="heading-process-section">
              Our Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-process-description">
              From discovery to deployment, we guide you through every step of your AI transformation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden" data-testid={`card-process-step-${index}`}>
                    <CardContent className="p-6">
                      {/* Image */}
                      <div className="relative overflow-hidden mb-4 rounded-lg">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <p className="text-muted-foreground leading-relaxed text-sm" data-testid={`text-step-description-${index}`}>{step.description}</p>

                        <div className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2" data-testid={`item-step-detail-${index}-${idx}`}>
                              <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-muted-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* What You'll Receive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-5xl font-light text-foreground tracking-tight mb-4" data-testid="heading-benefits">
                What You'll Receive
              </h3>
              <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
                A comprehensive AI and automation solution designed to transform every aspect of your business operations
              </p>
            </div>

            <ExpandableBenefits benefits={benefits} />

            {/* Additional Value Props */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="inline-flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                  <span className="text-muted-foreground">Expert Team</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                  <span className="text-muted-foreground">Cloud-Based</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
                  <span className="text-muted-foreground">Cutting-Edge Tech</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-foreground tracking-tight mb-4" data-testid="heading-team-section">
              Meet the Team
            </h2>
            <p className="text-xl text-muted-foreground" data-testid="text-team-description">
              Two experts working together to deliver complete AI solutions
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {founders.map((founder, index) => {
              const Icon = founder.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card className="bg-card border-border hover:shadow-2xl transition-all duration-300 h-full" data-testid={`card-founder-${index}`}>
                    <CardContent className="p-8">
                      {/* Header with Image */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className={`relative w-32 h-32 rounded-full object-cover shadow-xl ${
                              founder.name === "Mehdi Salhi" ? "border-4 border-blue-600 dark:border-white" : "border-4 border-purple-600 dark:border-zinc-700"
                            }`}
                            data-testid={`img-founder-${index}`}
                          />
                        </div>

                        <div className="text-center mb-4">
                          <h3 className="text-2xl font-light text-foreground tracking-tight mb-1" data-testid={`heading-founder-name-${index}`}>{founder.name}</h3>
                          <p className="text-foreground font-medium mb-3">{founder.role}</p>
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`link-founder-linkedin-${index}`}
                          >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm">Connect on LinkedIn</span>
                          </a>
                        </div>

                        <p className="text-muted-foreground text-center mb-6" data-testid={`text-founder-description-${index}`}>{founder.description}</p>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                          Key Responsibilities
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {founder.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start gap-2" data-testid={`item-responsibility-${index}-${idx}`}>
                              <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">
                          Skills & Expertise
                        </h4>
                        <div className="space-y-2">
                          {founder.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-start gap-2" data-testid={`item-skill-${index}-${idx}`}>
                              <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Goal */}
                      <div className="bg-blue-50 dark:bg-white/5 p-4 rounded-xl border border-blue-100 dark:border-white/10">
                        <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                          Mission
                        </h4>
                        <p className="text-sm text-muted-foreground italic" data-testid={`text-founder-goal-${index}`}>{founder.goal}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-32 relative overflow-hidden bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-16 text-center"
          >
                  {/* Headline */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-foreground tracking-tight mb-6"
                    data-testid="heading-cta"
                  >
                    Ready to Transform
                    <br />
                    Your Business?
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
                  >
                    Let's discuss how AI and automation can solve your biggest challenges
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <button
                      className="pearl-button"
                      data-testid="button-get-started"
                      onClick={() => window.location.href = createPageUrl("Contact")}
                    >
                      <div className="wrap">
                        <p>
                          <span>✦</span>
                          Get Started Today
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
                    className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-foreground" />
                      <span>Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-foreground" />
                      <span>Custom Solutions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-foreground" />
                      <span>Ongoing Support</span>
                    </div>
              </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
