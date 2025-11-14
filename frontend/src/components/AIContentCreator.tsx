import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Pause, 
  RotateCcw,
  Upload,
  Sparkles,
  Hash,
  Clock,
  CheckCircle2,
  Image as ImageIcon
} from "lucide-react";
import { SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";

interface PlatformCaption {
  platform: string;
  icon: any;
  color: string;
  caption: string;
  hashtags: string[];
  tone: string;
  charLimit: string;
}

const demoImage = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400";
const demoImageAlt = "Red Nike sneakers product photo";

const platformCaptions: PlatformCaption[] = [
  {
    platform: "Instagram",
    icon: SiInstagram,
    color: "text-pink-400",
    caption: "Just dropped! 🔥 These classics never go out of style. Tag someone who needs new kicks! 👟✨",
    hashtags: ["#SneakerHead", "#FreshKicks", "#StreetStyle", "#SneakerCommunity", "#OOTD"],
    tone: "Fun & Casual",
    charLimit: "2,200 chars"
  },
  {
    platform: "Facebook",
    icon: SiFacebook,
    color: "text-blue-400",
    caption: "New Arrival Alert! These timeless sneakers combine classic design with modern comfort. Perfect for any occasion - from casual Fridays to weekend adventures. Available now in select sizes. Visit our store or shop online today!",
    hashtags: ["#NewArrivals", "#Sneakers", "#ComfortableStyle"],
    tone: "Informative & Friendly",
    charLimit: "63,206 chars"
  },
  {
    platform: "LinkedIn",
    icon: SiLinkedin,
    color: "text-blue-500",
    caption: "Product Innovation Spotlight: Our latest footwear line demonstrates how classic design principles meet contemporary manufacturing techniques. This release showcases our commitment to quality craftsmanship and sustainable materials. Learn more about our design process and values on our website.",
    hashtags: ["#Innovation", "#ProductDesign", "#Sustainability"],
    tone: "Professional",
    charLimit: "3,000 chars"
  },
  {
    platform: "X (Twitter)",
    icon: SiX,
    color: "text-gray-300",
    caption: "Fresh drops 🔥 Classic style, all-day comfort. Shop now 👟",
    hashtags: ["#Sneakers", "#NewDrop"],
    tone: "Short & Punchy",
    charLimit: "280 chars"
  }
];

const workflowSteps = [
  { id: 1, label: "Upload Image", delay: 0 },
  { id: 2, label: "AI Analyzes Content", delay: 1 },
  { id: 3, label: "Generate Captions", delay: 2 },
  { id: 4, label: "Suggest Hashtags", delay: 3 },
  { id: 5, label: "Optimize for Each Platform", delay: 4 }
];

export default function AIContentCreator() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleCaptions, setVisibleCaptions] = useState<number[]>([]);
  const [imageUploaded, setImageUploaded] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setImageUploaded(true);
        setCurrentStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (currentStep > 0 && currentStep < workflowSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }

    if (currentStep === workflowSteps.length && visibleCaptions.length < platformCaptions.length) {
      const timer = setTimeout(() => {
        setVisibleCaptions(prev => [...prev, prev.length]);
      }, 800);
      return () => clearTimeout(timer);
    }

    if (currentStep === workflowSteps.length && visibleCaptions.length === platformCaptions.length) {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, visibleCaptions.length]);

  const handleStart = () => {
    if (currentStep === 0 && !imageUploaded) {
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setVisibleCaptions([]);
    setImageUploaded(false);
  };

  const bestPostingTimes = [
    { platform: "Instagram", time: "Today, 7:00 PM", reason: "Peak engagement time" },
    { platform: "Facebook", time: "Tomorrow, 1:00 PM", reason: "Lunch hour browsing" },
    { platform: "LinkedIn", time: "Tomorrow, 8:00 AM", reason: "Morning commute" },
    { platform: "X", time: "Today, 6:30 PM", reason: "After-work activity" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button
          onClick={handleStart}
          disabled={isPlaying || imageUploaded}
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
          data-testid="button-demo-start"
        >
          {!imageUploaded ? "Start AI Content Creator" : "Demo In Progress"}
          <Play className="w-4 h-4 ml-2" />
        </Button>
        <Button
          onClick={handlePlayPause}
          disabled={!imageUploaded || (currentStep === workflowSteps.length && visibleCaptions.length === platformCaptions.length)}
          variant="outline"
          className="border-orange-500 text-orange-400 hover:bg-orange-500/10"
          data-testid="button-demo-pause"
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Resume
            </>
          )}
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
          data-testid="button-demo-reset"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-orange-400" />
                Image Upload
              </h3>
              
              {!imageUploaded ? (
                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                  <Upload className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <p className="text-gray-400 mb-2">Click "Start" to upload demo image</p>
                  <p className="text-xs text-gray-500">AI will analyze and create platform-specific content</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative"
                >
                  <img 
                    src={demoImage} 
                    alt={demoImageAlt}
                    className="w-full rounded-lg"
                  />
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Uploaded
                  </Badge>
                </motion.div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                AI Processing Workflow
              </h3>
              <div className="space-y-3">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      currentStep >= index + 1 ? "bg-orange-500/10 border border-orange-500/30" : "bg-slate-900"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      currentStep >= index + 1 ? "bg-orange-500" : "bg-slate-700"
                    }`}>
                      {currentStep >= index + 1 ? (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-xs text-gray-400">{step.id}</span>
                      )}
                    </div>
                    <p className={`text-sm flex-1 ${
                      currentStep >= index + 1 ? "text-white font-medium" : "text-gray-400"
                    }`}>
                      {step.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <Hash className="w-5 h-5 text-orange-400" />
                AI-Generated Captions
              </h3>
              
              {visibleCaptions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Platform-specific captions will appear here...</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  <AnimatePresence>
                    {visibleCaptions.map((captionIndex) => {
                      const caption = platformCaptions[captionIndex];
                      const Icon = caption.icon;
                      return (
                        <motion.div
                          key={captionIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-slate-900 rounded-lg p-4 border border-slate-700"
                          data-testid={`caption-${caption.platform.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-5 h-5 ${caption.color}`} />
                              <span className="font-semibold text-white">{caption.platform}</span>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {caption.tone}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-300 mb-3 leading-relaxed">
                            {caption.caption}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {caption.hashtags.map((tag, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-orange-500/10 text-orange-400 border-orange-500/30">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-slate-700">
                            <span>Max: {caption.charLimit}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {bestPostingTimes[captionIndex].time}
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>

          {visibleCaptions.length === platformCaptions.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-orange-500/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    AI-Recommended Posting Times
                  </h3>
                  <div className="space-y-2">
                    {bestPostingTimes.map((time, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">{time.platform}:</span>
                        <div className="text-right">
                          <p className="text-white font-medium">{time.time}</p>
                          <p className="text-xs text-gray-400">{time.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-orange-600 hover:bg-orange-700"
                    data-testid="button-schedule-posts"
                  >
                    Schedule All Posts
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
