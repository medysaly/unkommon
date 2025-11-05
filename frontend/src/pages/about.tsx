import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
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
} from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  lead: string;
  icon: LucideIcon;
  color: string;
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
    "Automates repetitive tasks",
    "Enhances decision-making",
    "Improves customer engagement",
    "Saves time and increases ROI"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-400/30" data-testid="badge-about-page">
              <Zap className="w-4 h-4" />
              About Business Automated
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              AI Innovation Meets{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Automation Mastery
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed" data-testid="text-hero-description">
              We combine the power of AI development and automation engineering to create intelligent,
              fully integrated solutions that transform businesses and deliver real impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-process-section">
              Our Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-process-description">
              From discovery to deployment, we guide you through every step of your AI transformation
            </p>
          </motion.div>

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800 border-slate-700 hover:shadow-xl transition-all duration-300 overflow-hidden" data-testid={`card-process-step-${index}`}>
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Number & Icon */}
                        <div className={`bg-gradient-to-br ${step.color} p-8 flex flex-col items-center justify-center text-center`}>
                          <div className="text-6xl font-bold text-white/30 mb-4" data-testid={`text-step-number-${index}`}>{step.number}</div>
                          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                            <Icon className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2" data-testid={`heading-step-title-${index}`}>{step.title}</h3>
                          <p className="text-sm text-white/80">Led by: {step.lead}</p>
                        </div>

                        {/* Content */}
                        <div className="md:col-span-2 p-8">
                          <p className="text-gray-300 mb-6 leading-relaxed" data-testid={`text-step-description-${index}`}>{step.description}</p>

                          <div className="grid sm:grid-cols-2 gap-3">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start gap-2" data-testid={`item-step-detail-${index}-${idx}`}>
                                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-300">{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* End Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center" data-testid="heading-benefits">
                  What You'll Receive
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center"
                      data-testid={`item-benefit-${index}`}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-white font-medium">{benefit}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-testid="heading-team-section">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300" data-testid="text-team-description">
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
                  <Card className="bg-slate-800 border-slate-700 hover:shadow-2xl transition-all duration-300 h-full" data-testid={`card-founder-${index}`}>
                    <CardContent className="p-8">
                      {/* Header with Image */}
                      <div className="flex flex-col items-center mb-6">
                        <div className="relative mb-4">
                          <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} rounded-full blur-xl opacity-50`}></div>
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className={`relative w-32 h-32 rounded-full object-cover shadow-xl ${
                              founder.name === "Mehdi Salhi" ? "border-4 border-white" : "border-4 border-slate-700"
                            }`}
                            data-testid={`img-founder-${index}`}
                          />
                        </div>

                        <div className="text-center mb-4">
                          <h3 className="text-2xl font-bold text-white mb-1" data-testid={`heading-founder-name-${index}`}>{founder.name}</h3>
                          <p className="text-blue-400 font-medium mb-3">{founder.role}</p>
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                            data-testid={`link-founder-linkedin-${index}`}
                          >
                            <Linkedin className="w-5 h-5" />
                            <span className="text-sm">Connect on LinkedIn</span>
                          </a>
                        </div>

                        <p className="text-gray-300 text-center mb-6" data-testid={`text-founder-description-${index}`}>{founder.description}</p>
                      </div>

                      {/* Responsibilities */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                          Key Responsibilities
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {founder.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start gap-2" data-testid={`item-responsibility-${index}-${idx}`}>
                              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                          Skills & Expertise
                        </h4>
                        <div className="space-y-2">
                          {founder.skills.map((skill, idx) => (
                            <div key={idx} className="flex items-start gap-2" data-testid={`item-skill-${index}-${idx}`}>
                              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-300">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Goal */}
                      <div className={`bg-gradient-to-br ${founder.gradient} p-4 rounded-xl`}>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                          Mission
                        </h4>
                        <p className="text-sm text-white/90 italic" data-testid={`text-founder-goal-${index}`}>{founder.goal}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Working Together Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-white mb-4 text-center" data-testid="heading-working-together">
                  Working Together
                </h3>
                <p className="text-gray-300 text-center leading-relaxed" data-testid="text-working-together">
                  Both partners collaborate to deliver AI-powered, automation-driven digital transformation solutions. Mehdi focuses on building and innovating AI applications, while Carlton ensures these solutions are strategically integrated and automated across business systems to deliver measurable outcomes.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="heading-cta">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how AI and automation can solve your biggest challenges
            </p>
            <Link href={createPageUrl("Contact")}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
                data-testid="button-get-started"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
