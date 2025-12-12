import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, Clock, Sparkles, ArrowRight } from "lucide-react";
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
import CurvedLoop from "@/components/CurvedLoop";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
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
      company: "",
      phone: "",
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

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "718-500-1191",
      link: "tel:+17185001191",
    },
    {
      icon: Mail,
      title: "Email",
      details: "contact@unkommon.com",
      link: "mailto:contact@unkommon.com",
    },
    {
      icon: MapPin,
      title: "Office",
      details: "New York, NY",
      link: null,
    },
  ];

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

      {/* Contact Form & Info */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <motion.div
                className="relative group"
                whileHover={{ scale: 1.005, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <div className="relative overflow-hidden rounded-[30px] p-8 md:p-10">
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

                  {/* Shadow layers */}
                  <div className="absolute inset-0 rounded-[30px] -z-10"
                       style={{
                         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                       }}
                  />

                  {/* Content wrapper */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                        <Send className="w-5 h-5 text-white dark:text-black" />
                      </div>
                      <h2 className="text-3xl font-light text-foreground tracking-tight">
                        Send us a message
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
                                <FormLabel className="text-muted-foreground font-medium">Email *</FormLabel>
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

                        <div className="grid md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground font-medium">Company</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Your Company Inc."
                                    className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
                                    data-testid="input-company"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-muted-foreground font-medium">Phone</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className="bg-card/50 border-border/50 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all h-12"
                                    data-testid="input-phone"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-muted-foreground font-medium">Message *</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Tell us about your project and automation needs..."
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
                          {isSubmitting ? "Sending..." : "Send Message"}
                          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="relative group cursor-pointer"
                >
                  <div className="relative overflow-hidden rounded-[30px] p-6 min-h-[70px] flex items-center gap-4"
                       style={{
                         transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                       }}
                  >
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

                    {/* Hover gradient overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-all duration-300 rounded-[30px]"></div>

                    {/* Shadow */}
                    <div className="absolute inset-0 rounded-[30px] -z-10 group-hover:shadow-[0_8px_25px_rgba(0,0,0,0.18)]"
                         style={{
                           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset',
                           transition: 'box-shadow 0.3s ease'
                         }}
                    />

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-white"></div>
                      <div className="absolute inset-0"
                           style={{
                             boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(255, 255, 255, 0.2) inset'
                           }}
                      />
                      <info.icon className="w-6 h-6 text-black relative z-10" />
                    </motion.div>

                    {/* Content */}
                    <div className="flex-1 relative min-w-0">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                        {info.title}
                      </div>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-foreground hover:text-muted-foreground transition-colors font-medium text-lg block truncate"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <div className="text-foreground font-medium text-lg">{info.details}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Business Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="relative group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[30px] p-6">
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

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-slate-900/5 rounded-[30px]"></div>

                  {/* Shadow */}
                  <div className="absolute inset-0 rounded-[30px] -z-10"
                       style={{
                         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(255, 255, 255, 0.1) inset'
                       }}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white dark:text-black" />
                      </div>
                      <h3 className="text-xl font-light text-foreground tracking-tight">
                        Business Hours
                      </h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-card/20 border border-border/50 backdrop-blur-sm">
                        <span className="text-muted-foreground font-medium">Monday - Friday</span>
                        <span className="text-foreground font-semibold">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-card/20 border border-border/50 backdrop-blur-sm">
                        <span className="text-muted-foreground font-medium">Saturday</span>
                        <span className="text-foreground font-semibold">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-card/20 border border-border/50 backdrop-blur-sm">
                        <span className="text-muted-foreground font-medium">Sunday</span>
                        <span className="text-muted-foreground/70 font-semibold">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
