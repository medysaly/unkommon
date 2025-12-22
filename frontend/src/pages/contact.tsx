import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, Sparkles, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CurvedLoop from "@/components/CurvedLoop";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyUrl: z.string().url("Please enter a valid company URL").optional().or(z.literal("")),
  primaryBottleneck: z.string().min(1, "Please select a primary bottleneck"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      companyUrl: "",
      primaryBottleneck: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'https://l243ksgsdl.execute-api.us-east-1.amazonaws.com/prod';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Thank you for contacting us. We'll get back to you soon!",
        });
        form.reset();
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-white dark:bg-black">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-white dark:bg-black"></div>

      {/* Hero Section */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-foreground tracking-tight mb-6 leading-tight"
              data-testid="heading-page-title"
            >
              Let's{" "}
              <span className="text-foreground">
                Connect
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to transform your business with AI? We're here to help you achieve your automation goals.
            </motion.p>

            {/* Curved Loop Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-16 -mx-4"
              style={{ height: '150px' }}
            >
              <CurvedLoop
                marqueeText="24/7 Support • <1hr Response • 100% Custom • "
                speed={2}
                curveAmount={100}
                direction="left"
                interactive={true}
                className="curved-loop-text"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Proof of Concept - Demo Number */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.005, y: -2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-[30px] p-10 md:p-12 text-center">
              {/* Liquid glass background */}
              <div className="absolute inset-0 bg-white/10"
                   style={{
                     WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                     backdropFilter: 'blur(40px) saturate(180%)'
                   }}
              />

              {/* Border gradient */}
              <div className="absolute -inset-[1px] rounded-[30px] transition-opacity duration-300 group-hover:opacity-90"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.15) 100%)',
                     border: '0.5px solid rgba(255,255,255,0.15)',
                     filter: 'blur(0.5px)',
                     opacity: 0.7,
                     zIndex: -1
                   }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-[30px] pointer-events-none"
                   style={{
                     background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                     opacity: 0.8
                   }}
              />

              {/* Shadow */}
              <div className="absolute inset-0 rounded-[30px] -z-10"
                   style={{
                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                   }}
              />

              {/* Content */}
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
                  <Phone className="w-8 h-8 text-white dark:text-black" />
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">
                  Don't just email us. Test us.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  Experience the speed and natural voice of the Unkommon AI Receptionist firsthand. Call the number below to interact with our demo agent. Try to book an appointment, ask about pricing, or stump it with complex questions.
                </p>

                <a
                  href="tel:+12035551234"
                  className="inline-block"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-5xl md:text-6xl font-light text-foreground mb-3 hover:text-blue-500 transition-colors cursor-pointer"
                  >
                    (203) XXX-XXXX
                  </motion.div>
                </a>

                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  Live Demo Agent • Active 24/7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: The Audit - Booking Widget */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.005, y: -2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-[30px] p-10 md:p-12">
              {/* Liquid glass background */}
              <div className="absolute inset-0 bg-white/10"
                   style={{
                     WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                     backdropFilter: 'blur(40px) saturate(180%)'
                   }}
              />

              {/* Border gradient */}
              <div className="absolute -inset-[1px] rounded-[30px] transition-opacity duration-300 group-hover:opacity-90"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.15) 100%)',
                     border: '0.5px solid rgba(255,255,255,0.15)',
                     filter: 'blur(0.5px)',
                     opacity: 0.7,
                     zIndex: -1
                   }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-[30px] pointer-events-none"
                   style={{
                     background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                     opacity: 0.8
                   }}
              />

              {/* Shadow */}
              <div className="absolute inset-0 rounded-[30px] -z-10"
                   style={{
                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                   }}
              />

              {/* Content */}
              <div className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
                  <Calendar className="w-8 h-8 text-white dark:text-black" />
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">
                  Schedule Your Efficiency Audit.
                </h2>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  We are currently accepting new clients for Q1 deployment. Select a time below for a 30-minute architectural review with a solution engineer. We will discuss your current bottlenecks and map out a custom automation strategy.
                </p>

                {/* Calendly Embed Placeholder */}
                <div className="bg-card/30 border border-border/50 rounded-2xl p-12 backdrop-blur-sm">
                  <p className="text-muted-foreground mb-4">
                    [Calendly Booking Widget Embed Here]
                  </p>
                  <Button
                    size="lg"
                    className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black shadow-xl transition-all group font-light h-14 text-lg"
                  >
                    Book Your Audit Call
                    <Calendar className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    30-Minute Strategy Session • No Obligation
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Direct Inquiry - Contact Form */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.005, y: -2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-[30px] p-10 md:p-12">
              {/* Liquid glass background */}
              <div className="absolute inset-0 bg-white/10"
                   style={{
                     WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                     backdropFilter: 'blur(40px) saturate(180%)'
                   }}
              />

              {/* Border gradient */}
              <div className="absolute -inset-[1px] rounded-[30px] transition-opacity duration-300 group-hover:opacity-90"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.15) 100%)',
                     border: '0.5px solid rgba(255,255,255,0.15)',
                     filter: 'blur(0.5px)',
                     opacity: 0.7,
                     zIndex: -1
                   }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-[30px] pointer-events-none"
                   style={{
                     background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                     opacity: 0.8
                   }}
              />

              {/* Shadow */}
              <div className="absolute inset-0 rounded-[30px] -z-10"
                   style={{
                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                   }}
              />

              {/* Content */}
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center">
                    <Send className="w-6 h-6 text-white dark:text-black" />
                  </div>
                  <h2 className="text-4xl font-light text-foreground tracking-tight">
                    Direct Inquiry
                  </h2>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground font-medium">Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="John Doe"
                                className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-muted-foreground font-medium">Work Email *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="john@company.com"
                                className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="companyUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-medium">Company URL</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="https://yourcompany.com"
                              className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
                              data-testid="input-company-url"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="primaryBottleneck"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-medium">Primary Bottleneck *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-card/50 border-border/50 text-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12">
                                <SelectValue placeholder="Select your main challenge" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="missed-calls">Missed Calls / Front Desk Overwhelm</SelectItem>
                              <SelectItem value="slow-lead-response">Slow Lead Response Time</SelectItem>
                              <SelectItem value="database-reactivation">Database Reactivation</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground font-medium">Message *</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Tell us about your automation needs and current challenges..."
                              rows={6}
                              className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black shadow-2xl transition-all group font-light h-14 text-lg"
                      data-testid="button-submit"
                    >
                      {isSubmitting ? "Sending..." : "Submit Inquiry"}
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Physical Presence - Headquarters */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-16 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.005, y: -2 }}
            className="relative group"
          >
            <div className="relative overflow-hidden rounded-[30px] p-10 md:p-12 text-center">
              {/* Liquid glass background */}
              <div className="absolute inset-0 bg-white/10"
                   style={{
                     WebkitBackdropFilter: 'blur(20px) saturate(100%)',
                     backdropFilter: 'blur(40px) saturate(180%)'
                   }}
              />

              {/* Border gradient */}
              <div className="absolute -inset-[1px] rounded-[30px] transition-opacity duration-300 group-hover:opacity-90"
                   style={{
                     background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 30%, transparent 50%, rgba(255,255,255,0.05) 70%, rgba(255,255,255,0.15) 100%)',
                     border: '0.5px solid rgba(255,255,255,0.15)',
                     filter: 'blur(0.5px)',
                     opacity: 0.7,
                     zIndex: -1
                   }}
              />

              {/* Shine effect */}
              <div className="absolute inset-0 rounded-[30px] pointer-events-none"
                   style={{
                     background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                     opacity: 0.8
                   }}
              />

              {/* Shadow */}
              <div className="absolute inset-0 rounded-[30px] -z-10"
                   style={{
                     boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                   }}
              />

              {/* Content */}
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black dark:bg-white rounded-2xl mb-6">
                  <MapPin className="w-8 h-8 text-white dark:text-black" />
                </div>

                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-6">
                  Locations
                </h2>

                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-xl text-foreground font-medium mb-2">
                        New York City
                      </div>
                      <div className="text-base text-muted-foreground">
                        NYC, NY<br />
                        United States
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl text-foreground font-medium mb-2">
                        Stamford
                      </div>
                      <div className="text-base text-muted-foreground">
                        Stamford, CT<br />
                        United States
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl text-foreground font-medium mb-2">
                        Orlando
                      </div>
                      <div className="text-base text-muted-foreground">
                        Orlando, FL<br />
                        United States
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-xl text-foreground font-medium mb-2">
                        Vancouver Island
                      </div>
                      <div className="text-base text-muted-foreground">
                        Vancouver Island, BC<br />
                        Canada
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground mb-2">For general inquiries:</p>
                    <a
                      href="mailto:hello@unkommon.com"
                      className="text-lg text-foreground hover:text-blue-500 transition-colors font-medium"
                    >
                      hello@unkommon.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
