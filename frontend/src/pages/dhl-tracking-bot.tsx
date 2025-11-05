import { motion } from "framer-motion";
import { Package, Bell, MapPin, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";

export default function DHLTrackingBot() {
  const features = [
    {
      icon: Package,
      title: "Auto-Tracking",
      description: "Automatically track all DHL shipments",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Proactive updates to customers",
    },
    {
      icon: MapPin,
      title: "Location Updates",
      description: "Real-time location tracking",
    },
    {
      icon: Truck,
      title: "Delivery ETAs",
      description: "Accurate delivery time estimates",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600/10 to-red-600/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-yellow-400/30">
              <Package className="w-4 h-4" />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              DHL{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                Tracking Bot
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Automated shipping notifications and tracking updates for your
              customers. Keep everyone informed with proactive communication.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-600 to-red-600 hover:from-yellow-700 hover:to-red-700"
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
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-slate-900 border-slate-700">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-yellow-500/30">
                      <feature.icon className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
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
