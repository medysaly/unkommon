import { motion } from "framer-motion";
import { Briefcase, Calendar, Mail, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/lib/utils";

export default function ExecutiveAssistant() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent calendar management and meeting coordination",
    },
    {
      icon: Mail,
      title: "Email Management",
      description: "Prioritize and draft responses to important emails",
    },
    {
      icon: FileText,
      title: "Document Handling",
      description: "Organize and summarize important documents",
    },
    {
      icon: Briefcase,
      title: "Task Automation",
      description: "Automate routine executive tasks and workflows",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden bg-white dark:bg-black">

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
              AI-Powered{" "}
              <span className="text-foreground">
                Executive Assistant
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Your AI executive assistant handles scheduling, email management, and
              administrative tasks so you can focus on what matters most.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black shadow-2xl transition-all group font-light"
                data-testid="button-get-notified"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Notified When Available
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-foreground tracking-tight text-center mb-12"
          >
            Upcoming Features
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
                <Card className="h-full bg-card border-border">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mb-4 border border-border">
                      <feature.icon className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-lg font-light text-foreground tracking-tight mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
