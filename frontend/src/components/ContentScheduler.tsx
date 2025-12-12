import { motion } from "framer-motion";
import { Calendar, Clock, Image, FileText, BarChart3, CheckCircle2 } from "lucide-react";
import { SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ContentScheduler() {
  const platforms = [
    { name: "Instagram", icon: SiInstagram, color: "text-white", posts: 12 },
    { name: "Facebook", icon: SiFacebook, color: "text-white", posts: 8 },
    { name: "LinkedIn", icon: SiLinkedin, color: "text-white", posts: 6 },
    { name: "X (Twitter)", icon: SiX, color: "text-white", posts: 15 },
  ];

  const scheduledPosts = [
    {
      platform: "Instagram",
      icon: SiInstagram,
      color: "bg-white/10 text-white",
      time: "Today, 2:00 PM",
      content: "New product launch announcement",
      type: "Image + Caption",
      status: "Scheduled",
    },
    {
      platform: "Facebook",
      icon: SiFacebook,
      color: "bg-white/10 text-white",
      time: "Today, 4:30 PM",
      content: "Behind-the-scenes team photo",
      type: "Image + Caption",
      status: "Scheduled",
    },
    {
      platform: "LinkedIn",
      icon: SiLinkedin,
      color: "bg-white/10 text-white",
      time: "Tomorrow, 9:00 AM",
      content: "Industry insights article",
      type: "Link + Text",
      status: "Scheduled",
    },
  ];

  const features = [
    {
      icon: Calendar,
      title: "Visual Calendar",
      description: "See your entire content schedule at a glance",
    },
    {
      icon: Image,
      title: "Media Library",
      description: "Store and organize all your images and videos",
    },
    {
      icon: Clock,
      title: "Optimal Timing",
      description: "AI suggests best times to post for maximum engagement",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track engagement and refine your strategy",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Platform Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {platforms.map((platform, index) => {
          const Icon = platform.icon;
          return (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 hover:border-white/30 transition-colors" data-testid={`card-platform-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
                <CardContent className="p-4 text-center">
                  <Icon className={`w-8 h-8 ${platform.color} mx-auto mb-2`} />
                  <p className="text-sm text-gray-400 mb-1">{platform.name}</p>
                  <p className="text-2xl font-bold text-white" data-testid={`text-posts-count-${platform.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>{platform.posts}</p>
                  <p className="text-xs text-gray-500">Posts This Week</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Scheduled Posts Preview */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Upcoming Posts</h3>
          {scheduledPosts.map((post, index) => {
            const Icon = post.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50" data-testid={`card-post-${index}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${post.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm font-medium text-white">{post.platform}</p>
                          <Badge variant="outline" className="text-xs bg-white/10 text-white border-white/20">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            {post.status}
                          </Badge>
                        </div>
                        <p className="text-gray-300 text-sm mb-1">{post.content}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {post.type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Scheduling Features</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 h-full" data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <CardContent className="p-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-3 border border-white/20">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Calendar Preview */}
          <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-white">December 2025</h4>
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                  <div key={i} className="text-xs text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 4;
                  const hasPost = [2, 5, 9, 12, 16, 19, 23, 26].includes(day);
                  return day > 0 && day <= 31 ? (
                    <div
                      key={i}
                      className={`text-xs py-1 rounded ${
                        hasPost
                          ? "bg-white/20 text-white font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                  ) : (
                    <div key={i} className="text-xs text-gray-700">{""}</div>
                  );
                })}
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                <span className="inline-block w-2 h-2 bg-white/20 rounded-sm mr-1"></span>
                Days with scheduled posts
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
