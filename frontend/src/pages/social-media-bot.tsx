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
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-orange-400/30" data-testid="badge-page-tag">
              <MessageSquare className="w-4 h-4" />
              Social Media Automation
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6" data-testid="heading-page-title">
              Automate Your{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Social Presence
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Complete social media automation: Engage with DMs and comments instantly, schedule posts across platforms, and grow your audience while you focus on your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                data-testid="button-get-started"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Capabilities Overview */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Social Media Automation Platform
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to automate your social media presence - from content creation to engagement, scheduling, analytics, and more
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <Sparkles className="w-8 h-8 text-purple-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">AI Content Creation</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Platform-specific caption generation</li>
                    <li>• Smart hashtag suggestions</li>
                    <li>• Multi-language translation</li>
                    <li>• Content repurposing (blog → posts)</li>
                    <li>• Brand voice learning</li>
                    <li>• Trend-based content ideas</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <MessageSquare className="w-8 h-8 text-orange-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Engagement & Community</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Auto-respond to DMs & comments</li>
                    <li>• Lead capture & qualification</li>
                    <li>• Sentiment analysis</li>
                    <li>• Spam filtering & moderation</li>
                    <li>• Unified inbox (all platforms)</li>
                    <li>• Message routing to team members</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <Calendar className="w-8 h-8 text-green-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Scheduling & Publishing</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Multi-platform scheduling</li>
                    <li>• Bulk upload (CSV, 350+ posts)</li>
                    <li>• Best-time posting (AI-powered)</li>
                    <li>• Post recycling (evergreen content)</li>
                    <li>• RSS feed automation</li>
                    <li>• Queue systems & drip campaigns</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <Search className="w-8 h-8 text-blue-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Social Listening</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Brand mention tracking</li>
                    <li>• Competitor monitoring</li>
                    <li>• Keyword & hashtag tracking</li>
                    <li>• Crisis detection (sentiment spikes)</li>
                    <li>• Trend identification</li>
                    <li>• Real-time alerts</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <BarChart3 className="w-8 h-8 text-yellow-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Analytics & Reporting</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Automated weekly/monthly reports</li>
                    <li>• Competitor benchmarking</li>
                    <li>• ROI tracking (social → sales)</li>
                    <li>• Predictive analytics</li>
                    <li>• Content performance analysis</li>
                    <li>• White-label client reports</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-pink-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Team Collaboration</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Approval workflows</li>
                    <li>• Role-based permissions</li>
                    <li>• Collision detection (duplicate replies)</li>
                    <li>• Team assignment rules</li>
                    <li>• Shared media library</li>
                    <li>• Campaign management</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <Globe className="w-8 h-8 text-cyan-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Multi-Platform Support</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Instagram (posts, stories, reels)</li>
                    <li>• Facebook (pages, groups)</li>
                    <li>• LinkedIn (personal & company)</li>
                    <li>• X/Twitter (posts, threads)</li>
                    <li>• TikTok integration</li>
                    <li>• YouTube & Pinterest</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.7 }}>
              <Card className="bg-slate-800 border-slate-700 h-full">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-red-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Advanced Optimization</h3>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• A/B testing automation</li>
                    <li>• Dynamic campaign optimization</li>
                    <li>• Audience segmentation</li>
                    <li>• Content bucketing by theme</li>
                    <li>• Engagement prediction</li>
                    <li>• CRM & email integration</li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Automation Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Part 1: Engagement Automation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Instantly respond to DMs and comments, capture leads, and convert social engagement into sales opportunities
            </p>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
          >
            Engagement Features
          </motion.h3>
          
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
                  <Card className="h-full bg-slate-900 border-slate-700 hover:border-orange-500/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mb-4 border border-orange-500/30">
                        <Icon className="w-6 h-6 text-orange-400" />
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

      {/* Benefits Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 pb-[175px]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Engage Your Audience 24/7
              </h2>
              <p className="text-gray-300 mb-8">
                Turn social media interactions into business opportunities with
                intelligent automation.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-slate-800 border-slate-700 overflow-hidden">
                <CardContent className="p-8">
                  <div className="aspect-square bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl flex items-center justify-center">
                    <MessageSquare className="w-32 h-32 text-orange-400/50" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Case Studies Demo */}
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              See It In Action
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch how engagement automation handles real scenarios - from lead capture to appointment booking
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-8 text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-orange-400" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Interactive Demo Available on Larger Screens
                </h3>
                <p className="text-gray-300">
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
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              AI-Powered Content Creation
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Watch AI transform a single image into optimized, platform-specific content with captions, hashtags, and posting recommendations
            </p>
          </motion.div>

          {/* Mobile Notice */}
          <div className="md:hidden">
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-8 text-center">
                <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                <h3 className="text-xl font-semibold text-white mb-2">
                  Interactive Demo Available on Larger Screens
                </h3>
                <p className="text-gray-300">
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
      <section className="px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Part 2: Content Scheduling
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
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
            <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
              Visual Content Calendar
            </h3>
            <p className="text-lg text-gray-300 text-center mb-8 max-w-3xl mx-auto">
              Interactive calendar view showing all scheduled posts across platforms. Click any date to see what's going live.
            </p>
            
            {/* Mobile Notice for Calendar */}
            <div className="md:hidden">
              <Card className="bg-slate-900 border-slate-700">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Interactive Calendar Available on Larger Screens
                  </h3>
                  <p className="text-gray-300">
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
            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                  <Calendar className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Bulk Scheduling</h3>
                <p className="text-gray-400 text-sm">
                  Upload and schedule up to 100 posts at once with CSV import
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Auto-Posting</h3>
                <p className="text-gray-400 text-sm">
                  Set it and forget it - posts go live automatically at scheduled times
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-700">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-orange-500/30">
                  <CheckCircle className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Platform</h3>
                <p className="text-gray-400 text-sm">
                  Post to Instagram, Facebook, LinkedIn, and Twitter simultaneously
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 pb-[50px] overflow-hidden">
        {/* Desktop/Tablet (≥768px): Background image */}
        <div className="max-w-7xl mx-auto hidden md:block">
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <div
              className="absolute inset-0 bg-fixed bg-no-repeat cta-bg-social-icons"
              style={{
                backgroundImage: "url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/a01fd465d_socialIcons.jpg')",
              }}
            ></div>
            <div className="absolute inset-0 bg-black/50"></div>

            <div className="relative z-10 p-12 text-center" style={{ transform: 'translateX(-150px)' }}>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Automate Your Social Media?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-2xl mx-auto">
                Let's set up your Instagram & Facebook bot to never miss a lead.
              </p>
              <Button
                size="lg"
                className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                data-testid="button-schedule-demo"
                onClick={() => window.location.href = createPageUrl("Contact")}
              >
                Schedule Your Demo Call
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Landscape (568px-767px): Two Column Layout */}
        <div className="max-w-7xl mx-auto hidden min-[568px]:flex md:hidden items-center gap-8">
          <div className="flex-1 bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Automate Your Social Media?
            </h2>
            <p className="text-lg text-pink-100 mb-6">
              Let's set up your Instagram & Facebook bot to never miss a lead.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
          <div className="flex-1">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68f71348cde45a754e241ed6/a01fd465d_socialIcons.jpg"
              alt="Social Media Icons"
              className="w-full h-auto object-contain max-h-96 rounded-lg"
            />
          </div>
        </div>

        {/* Mobile Portrait (<568px): Single Column, No Image */}
        <div className="max-w-full mx-auto text-center block min-[568px]:hidden">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-orange-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Automate Your Social Media?
            </h2>
            <p className="text-base text-pink-100 mb-6">
              Let's set up your Instagram & Facebook bot to never miss a lead.
            </p>
            <Button
              size="lg"
              className="w-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              data-testid="button-schedule-demo"
              onClick={() => window.location.href = createPageUrl("Contact")}
            >
              Schedule Your Demo Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
