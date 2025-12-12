import { motion } from "framer-motion";
import {
  MessageSquare,
  Instagram,
  Facebook,
  Zap,
  CheckCircle,
  ArrowRight,
  Calendar,
  Sparkles,
  TrendingUp,
  BarChart3,
  Users,
  Search,
  Hash,
  Globe,
  RefreshCw,
  Shield,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { createPageUrl } from "@/lib/utils";
import { SiInstagram, SiFacebook } from "react-icons/si";
import SocialMediaDemo from "@/components/SocialMediaDemo";
import ContentScheduler from "@/components/ContentScheduler";
import AIContentCreator from "@/components/AIContentCreator";
import VisualContentCalendar from "@/components/VisualContentCalendar";
import { LuminousCard } from "@/components/LuminousCard";

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
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 leading-tight text-foreground tracking-tight"
              data-testid="heading-page-title"
            >
              Automate Your Social Presence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              Complete social media automation: Engage with DMs and comments instantly, schedule posts across platforms, and grow your audience while you focus on your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                size="lg"
                className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black text-lg px-8 shadow-2xl transition-all group font-light"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Case Studies Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              See It In Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch how engagement automation handles real scenarios - from lead capture to appointment booking
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                  <MessageSquare className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2 tracking-tight">
                  Interactive Demo Available on Larger Screens
                </h3>
                <p className="text-muted-foreground">
                  To experience the live social media automation demo, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <SocialMediaDemo />
          </div>
        </div>
      </section>

      {/* AI Content Creator Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              AI-Powered Content Creation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Watch AI transform a single image into optimized, platform-specific content with captions, hashtags, and posting recommendations
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                  <Sparkles className="w-8 h-8 text-foreground" />
                </div>
                <h3 className="text-xl font-light text-foreground mb-2 tracking-tight">
                  Interactive Demo Available on Larger Screens
                </h3>
                <p className="text-muted-foreground">
                  To experience the AI content creation demo, please view this page on a tablet, laptop, or desktop computer.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Demo */}
          <div className="hidden md:block">
            <AIContentCreator />
          </div>
        </div>
      </section>

      {/* Content Scheduling Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Content Scheduling
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Schedule posts across all platforms from one dashboard. Plan weeks ahead, maintain consistency, and never miss a posting opportunity.
            </p>
          </motion.div>

          <ContentScheduler />

          {/* Visual Content Calendar Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl md:text-3xl font-light text-foreground text-center mb-8 tracking-tight">
              Visual Content Calendar
            </h3>
            <p className="text-lg text-muted-foreground text-center mb-8 max-w-3xl mx-auto">
              Interactive calendar view showing all scheduled posts across platforms. Click any date to see what's going live.
            </p>

            {/* Mobile Notice for Calendar */}
            <div className="md:hidden">
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-2xl flex items-center justify-center border border-border">
                    <Calendar className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-light text-foreground mb-2 tracking-tight">
                    Interactive Calendar Available on Larger Screens
                  </h3>
                  <p className="text-muted-foreground">
                    To explore the visual content calendar, please view this page on a tablet, laptop, or desktop computer.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Desktop Calendar */}
            <div className="hidden md:block">
              <VisualContentCalendar />
            </div>
          </motion.div>

          {/* Additional Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-6"
          >
            <Card className="bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mx-auto mb-4 border border-border">
                  <Calendar className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2 tracking-tight">Bulk Scheduling</h3>
                <p className="text-muted-foreground text-sm">
                  Upload and schedule up to 100 posts at once with CSV import
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mx-auto mb-4 border border-border">
                  <Zap className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2 tracking-tight">Auto-Posting</h3>
                <p className="text-muted-foreground text-sm">
                  Set it and forget it - posts go live automatically at scheduled times
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-card rounded-xl flex items-center justify-center mx-auto mb-4 border border-border">
                  <CheckCircle className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2 tracking-tight">Multi-Platform</h3>
                <p className="text-muted-foreground text-sm">
                  Post to Instagram, Facebook, LinkedIn, and Twitter simultaneously
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Complete Capabilities Overview */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Complete Social Media Automation Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to automate your social media presence - from content creation to engagement, scheduling, analytics, and more
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mb-12">
            {[
              {
                title: "AI Content Creation",
                items: [
                  "Platform-specific caption generation",
                  "Smart hashtag suggestions",
                  "Multi-language translation",
                  "Content repurposing (blog → posts)",
                  "Brand voice learning",
                  "Trend-based content ideas"
                ]
              },
              {
                title: "Engagement & Community",
                items: [
                  "Auto-respond to DMs & comments",
                  "Lead capture & qualification",
                  "Sentiment analysis",
                  "Spam filtering & moderation",
                  "Unified inbox (all platforms)",
                  "Message routing to team members"
                ]
              },
              {
                title: "Scheduling & Publishing",
                items: [
                  "Multi-platform scheduling",
                  "Bulk upload (CSV, 350+ posts)",
                  "Best-time posting (AI-powered)",
                  "Post recycling (evergreen content)",
                  "RSS feed automation",
                  "Queue systems & drip campaigns"
                ]
              },
              {
                title: "Social Listening",
                items: [
                  "Brand mention tracking",
                  "Competitor monitoring",
                  "Keyword & hashtag tracking",
                  "Crisis detection (sentiment spikes)",
                  "Trend identification",
                  "Real-time alerts"
                ]
              },
              {
                title: "Analytics & Reporting",
                items: [
                  "Automated weekly/monthly reports",
                  "Competitor benchmarking",
                  "ROI tracking (social → sales)",
                  "Predictive analytics",
                  "Content performance analysis",
                  "White-label client reports"
                ]
              },
              {
                title: "Team Collaboration",
                items: [
                  "Approval workflows",
                  "Role-based permissions",
                  "Collision detection (duplicate replies)",
                  "Team assignment rules",
                  "Shared media library",
                  "Campaign management"
                ]
              },
              {
                title: "Multi-Platform Support",
                items: [
                  "Instagram (posts, stories, reels)",
                  "Facebook (pages, groups)",
                  "LinkedIn (personal & company)",
                  "X/Twitter (posts, threads)",
                  "TikTok integration",
                  "YouTube & Pinterest"
                ]
              },
              {
                title: "Advanced Optimization",
                items: [
                  "A/B testing automation",
                  "Dynamic campaign optimization",
                  "Audience segmentation",
                  "Content bucketing by theme",
                  "Engagement prediction",
                  "CRM & email integration"
                ]
              }
            ].map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <LuminousCard
                  className="social-media-card"
                  title={capability.title}
                  description={
                    <ul className="space-y-1">
                      {capability.items.map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Automation Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Engagement Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Instantly respond to DMs and comments, capture leads, and convert social engagement into sales opportunities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
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
                  <LuminousCard
                    icon={<Icon />}
                    title={feature.title}
                    description={feature.description}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light mb-6 text-foreground tracking-tight">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Turn social media interactions into business opportunities with intelligent automation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="h-full bg-card backdrop-blur-sm border-border hover:border-foreground/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-32 overflow-hidden bg-white dark:bg-black">

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-foreground tracking-tight"
              data-testid="heading-cta-section"
            >
              Ready to Automate Your
              <br />
              Social Media?
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Let's set up your Instagram & Facebook bot to engage with followers 24/7 and never miss a lead
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className="bg-black hover:bg-zinc-900 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-black text-lg px-10 py-7 shadow-2xl transition-all group font-light"
                data-testid="button-schedule-demo"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Demo Call
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Free Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-foreground" />
                <span>Cancel Anytime</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
