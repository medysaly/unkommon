import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  User,
  MessageSquare,
  Instagram,
  Facebook,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
  delay: number; // seconds before showing this message
}

interface LeadData {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  additionalData?: Record<string, string>;
}

interface WorkflowStep {
  id: number;
  label: string;
  active: boolean;
  activatesAt: number; // message index that activates this step
}

interface CaseStudy {
  id: number;
  title: string;
  problem: string;
  solution: string;
  company: {
    name: string;
    industry: string;
    followers: string;
    logo: string;
  };
  socialPost: {
    platform: "Instagram" | "Facebook";
    type: string;
    caption: string;
    engagement: string;
  };
  persona: {
    name: string;
    context: string;
  };
  messages: Message[];
  workflowSteps: WorkflowStep[];
  finalLeadData: LeadData;
  results: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "DM Lead Capture & Qualification",
    problem: "Small businesses get hundreds of DMs daily. Owners spend 3-4 hours manually responding, many leads go cold due to delayed responses, and there's no systematic way to capture contact info.",
    solution: "Social Media Bot instantly responds to every DM, answers questions intelligently, naturally collects contact info, and saves qualified leads to your CRM automatically.",
    company: {
      name: "Sunset Threads",
      industry: "Fashion Boutique",
      followers: "15K",
      logo: "ST"
    },
    socialPost: {
      platform: "Instagram",
      type: "Product Showcase",
      caption: "☀️ NEW ARRIVAL: Summer vibes are here! 🌺 Our breezy maxi dresses just dropped. Link in bio or DM us 'SUMMER' for first look! 💬",
      engagement: "450 likes, 89 comments"
    },
    persona: {
      name: "Jessica Martinez",
      context: "28, saw post while scrolling, interested in maxi dress for upcoming vacation"
    },
    messages: [
      { id: 1, sender: "user", text: "Hi! I saw your post about the maxi dresses 😍", delay: 1 },
      { id: 2, sender: "bot", text: "Hi there! 👋 So glad you loved them! Which style caught your eye?", delay: 2 },
      { id: 3, sender: "user", text: "The blue floral one! Do you have it in medium?", delay: 3 },
      { id: 4, sender: "bot", text: "Great choice! ✨ Yes, we have the blue floral in medium. Where are you located so I can check shipping options?", delay: 4 },
      { id: 5, sender: "user", text: "I'm in Miami. Need it by next Friday for my trip!", delay: 5 },
      { id: 6, sender: "bot", text: "Perfect! We can do 3-day shipping to Miami. Can I get your email to send the checkout link?", delay: 6 },
      { id: 7, sender: "user", text: "Sure! jessica.m.2024@gmail.com", delay: 7 },
      { id: 8, sender: "bot", text: "Awesome! 🎉 I've sent the link to jessica.m.2024@gmail.com. You'll get it by Thursday. Thanks Jessica!", delay: 8 }
    ],
    workflowSteps: [
      { id: 1, label: "Receive DM", active: false, activatesAt: 0 },
      { id: 2, label: "AI Processing", active: false, activatesAt: 1 },
      { id: 3, label: "Extract Intent", active: false, activatesAt: 2 },
      { id: 4, label: "Capture Lead", active: false, activatesAt: 6 },
      { id: 5, label: "CRM Update", active: false, activatesAt: 7 }
    ],
    finalLeadData: {
      name: "Jessica Martinez",
      email: "jessica.m.2024@gmail.com",
      interest: "Blue Floral Maxi Dress (Medium)",
      additionalData: {
        "Location": "Miami",
        "Urgency": "High (needs by Friday)",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "2-second response time (vs 4+ hours manual)",
      "Lead captured with full contact info",
      "Sale closed in under 2 minutes"
    ]
  },
  {
    id: 2,
    title: "Comment-to-DM Automation",
    problem: "Posts get 50-200 comments. Manually asking everyone to 'DM us' is impossible. Potential customers commenting publicly get no response and competitors swoop in.",
    solution: "Bot monitors comments for keywords, automatically sends personalized DMs to interested people, and converts public engagement into private sales conversations.",
    company: {
      name: "CoreFit Studio",
      industry: "Boutique Fitness",
      followers: "3K",
      logo: "CF"
    },
    socialPost: {
      platform: "Facebook",
      type: "Flash Sale Video",
      caption: "🔥 FLASH SALE: First month FREE for new members! Limited to 20 spots. Comment 'FIT' to claim yours before they're gone! ⏰ Offer ends Sunday.",
      engagement: "120 reactions, 45 shares"
    },
    persona: {
      name: "Marcus Johnson",
      context: "35, lives nearby, been thinking about joining a gym, flash sale pushed him to act"
    },
    messages: [
      { id: 1, sender: "user", text: "Marcus commented 'FIT' on your post", delay: 1 },
      { id: 2, sender: "bot", text: "Hey Marcus! 👋 Thanks for commenting on our flash sale post! The free month offer is still available. What are your fitness goals?", delay: 2 },
      { id: 3, sender: "user", text: "Mainly looking to lose weight. Do you have morning classes?", delay: 3 },
      { id: 4, sender: "bot", text: "Perfect! We have HIIT classes at 6am and 9am that are amazing for weight loss. Would you like to book a free trial class?", delay: 4 },
      { id: 5, sender: "user", text: "Yeah! 9am works better for me. What do I need to do?", delay: 5 },
      { id: 6, sender: "bot", text: "Great! I just need your name, email, and phone number to get you booked for a 9am trial class.", delay: 6 },
      { id: 7, sender: "user", text: "Marcus Johnson, marcus.j.85@gmail.com, 555-0123", delay: 7 },
      { id: 8, sender: "bot", text: "You're all set, Marcus! 🎉 Expect a confirmation text shortly. See you at 9am!", delay: 8 }
    ],
    workflowSteps: [
      { id: 1, label: "Monitor Comment", active: false, activatesAt: 0 },
      { id: 2, label: "Detect Keyword", active: false, activatesAt: 0 },
      { id: 3, label: "Auto-Send DM", active: false, activatesAt: 1 },
      { id: 4, label: "Qualify Lead", active: false, activatesAt: 3 },
      { id: 5, label: "Book Trial", active: false, activatesAt: 7 }
    ],
    finalLeadData: {
      name: "Marcus Johnson",
      email: "marcus.j.85@gmail.com",
      phone: "555-0123",
      interest: "9am HIIT Class - Weight Loss",
      additionalData: {
        "Fitness Goal": "Weight Loss",
        "Preferred Time": "Morning (9am)",
        "Lead Score": "Warm 🟡"
      }
    },
    results: [
      "Comment converted to booked trial in 3 minutes",
      "100% of comment engagers receive instant DM",
      "No manual outreach needed"
    ]
  },
  {
    id: 3,
    title: "DM Appointment Booking",
    problem: "Service businesses play phone tag for days trying to book appointments. DM conversations go back-and-forth 10+ times. Double-bookings happen with manual calendars.",
    solution: "Bot checks real calendar availability instantly, offers time slots in chat, books appointments automatically, and sends confirmation + reminder SMS.",
    company: {
      name: "Glow Beauty Spa",
      industry: "Beauty & Wellness",
      followers: "5K",
      logo: "GB"
    },
    socialPost: {
      platform: "Instagram",
      type: "Before/After Results",
      caption: "✨ Radiant skin in just one session! Our signature facial is pure magic. DM us to book your glow-up! 💆‍♀️",
      engagement: "320 likes, 67 comments"
    },
    persona: {
      name: "Alicia Brown",
      context: "31, special event coming up, needs facial appointment this week"
    },
    messages: [
      { id: 1, sender: "user", text: "Hi! Can I book a facial for this week?", delay: 1 },
      { id: 2, sender: "bot", text: "Absolutely! 💆‍♀️ Let me check our availability... We have openings: Tuesday 2pm, Wednesday 10am, or Thursday 4pm. Which works best?", delay: 2 },
      { id: 3, sender: "user", text: "Thursday at 4pm would be perfect!", delay: 3 },
      { id: 4, sender: "bot", text: "Great choice! Thursday 4pm it is. Can I get your name and phone number for the booking?", delay: 4 },
      { id: 5, sender: "user", text: "Alicia Brown, 555-0199", delay: 5 },
      { id: 6, sender: "bot", text: "Perfect, Alicia! ✅ You're booked for Thursday at 4pm. You'll receive a confirmation text at 555-0199 shortly. See you then!", delay: 6 }
    ],
    workflowSteps: [
      { id: 1, label: "Request Received", active: false, activatesAt: 0 },
      { id: 2, label: "Check Calendar", active: false, activatesAt: 1 },
      { id: 3, label: "Offer Slots", active: false, activatesAt: 1 },
      { id: 4, label: "Confirm Booking", active: false, activatesAt: 5 },
      { id: 5, label: "Send Reminder", active: false, activatesAt: 5 }
    ],
    finalLeadData: {
      name: "Alicia Brown",
      phone: "555-0199",
      interest: "Signature Facial - Thursday 4pm",
      additionalData: {
        "Appointment": "Thursday, 4:00 PM",
        "Service": "Signature Facial",
        "Status": "Confirmed ✓"
      }
    },
    results: [
      "Booking completed in 90 seconds (vs 2 days of back-and-forth)",
      "Zero double-bookings with real-time calendar sync",
      "Automated confirmation + reminder sent"
    ]
  }
];

export default function SocialMediaDemo() {
  const [currentCase, setCurrentCase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [activeSteps, setActiveSteps] = useState<number[]>([]);
  const [leadData, setLeadData] = useState<LeadData>({});
  const [showCompliance, setShowCompliance] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const messageIndexRef = useRef(0);

  const currentStudy = caseStudies[currentCase];

  // Reset demo when case study changes
  useEffect(() => {
    resetDemo();
  }, [currentCase]);

  const resetDemo = () => {
    setIsPlaying(false);
    setCurrentMessageIndex(0);
    messageIndexRef.current = 0;
    setDisplayedMessages([]);
    setActiveSteps([]);
    setLeadData({});
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const playDemo = () => {
    if (messageIndexRef.current >= currentStudy.messages.length) {
      resetDemo();
      return;
    }
    setIsPlaying(true);
    showNextMessage();
  };

  const pauseDemo = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const showNextMessage = () => {
    if (messageIndexRef.current >= currentStudy.messages.length) {
      setIsPlaying(false);
      return;
    }

    const nextMessage = currentStudy.messages[messageIndexRef.current];
    const currentIndex = messageIndexRef.current;
    
    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    timerRef.current = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, nextMessage]);
      
      // Activate workflow steps
      const stepsToActivate = currentStudy.workflowSteps
        .filter(step => step.activatesAt === currentIndex)
        .map(step => step.id);
      
      setActiveSteps(prev => Array.from(new Set([...prev, ...stepsToActivate])));

      // Update lead data progressively
      if (currentIndex === currentStudy.messages.length - 1) {
        setLeadData(currentStudy.finalLeadData);
      }

      // Increment index
      messageIndexRef.current = currentIndex + 1;
      setCurrentMessageIndex(currentIndex + 1);

      if (messageIndexRef.current < currentStudy.messages.length) {
        showNextMessage();
      } else {
        setIsPlaying(false);
      }
    }, nextMessage.delay * 1000);
  };

  const goToNextCase = () => {
    if (currentCase < caseStudies.length - 1) {
      setCurrentCase(currentCase + 1);
    }
  };

  const goToPrevCase = () => {
    if (currentCase > 0) {
      setCurrentCase(currentCase - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Compliance Button - Top Right */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCompliance(true)}
          className="gap-2"
          data-testid="button-compliance"
        >
          <ShieldCheck className="w-4 h-4" />
          Platform Compliance
        </Button>
      </div>

      {/* Case Study Header */}
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">Case Study {currentCase + 1} of {caseStudies.length}</p>
          <h2 className="text-3xl font-bold text-white mb-4">{currentStudy.title}</h2>
        </div>

        {/* Problem Section */}
        <Card className="bg-red-950/30 border-red-800/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">The Problem</h3>
                <p className="text-gray-300">{currentStudy.problem}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solution Section */}
        <Card className="bg-blue-950/30 border-blue-800/50">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-blue-300 mb-2">The Solution</h3>
                <p className="text-gray-300">{currentStudy.solution}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Context */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{currentStudy.company.logo}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{currentStudy.company.name}</h3>
                  <p className="text-sm text-gray-400">{currentStudy.company.industry} • {currentStudy.company.followers} followers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                {currentStudy.socialPost.platform === "Instagram" ? (
                  <Instagram className="w-5 h-5 text-pink-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Facebook className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 mb-1">{currentStudy.socialPost.platform} Post</h3>
                  <p className="text-sm text-gray-300 mb-2">"{currentStudy.socialPost.caption}"</p>
                  <p className="text-xs text-gray-500">{currentStudy.socialPost.engagement}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Demo Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={isPlaying ? pauseDemo : playDemo}
          size="lg"
          className="gap-2"
          data-testid="button-play-pause"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              {currentMessageIndex === 0 ? "Play Demo" : "Resume"}
            </>
          )}
        </Button>
        <Button
          onClick={resetDemo}
          variant="outline"
          size="lg"
          className="gap-2"
          data-testid="button-restart"
        >
          <RotateCcw className="w-5 h-5" />
          Restart
        </Button>
      </div>

      {/* Demo Interface */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Chat Interface - 40% */}
        <div className="lg:col-span-2">
          <Card className="bg-slate-900 border-slate-700 h-[600px] flex flex-col">
            <CardContent className="p-0 flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-700 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{currentStudy.company.logo}</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">{currentStudy.company.name}</h4>
                  <p className="text-xs text-gray-400">Direct Message</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <AnimatePresence>
                  {displayedMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                            : "bg-slate-800 text-gray-200"
                        }`}
                      >
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isPlaying && displayedMessages.length > 0 && currentMessageIndex < currentStudy.messages.length && (
                  <div className="flex justify-start">
                    <div className="bg-slate-800 rounded-2xl px-4 py-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow & Lead Data - 60% */}
        <div className="lg:col-span-3 space-y-6">
          {/* Workflow Visualization */}
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Automation Workflow</h3>
              <div className="space-y-3">
                {currentStudy.workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.3 }}
                    animate={{ 
                      opacity: activeSteps.includes(step.id) ? 1 : 0.3,
                      scale: activeSteps.includes(step.id) ? 1.02 : 1
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      activeSteps.includes(step.id) 
                        ? "bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30" 
                        : "bg-slate-800/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activeSteps.includes(step.id) ? "bg-orange-500 text-white" : "bg-slate-700 text-gray-400"
                    }`}>
                      {activeSteps.includes(step.id) ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    <span className={activeSteps.includes(step.id) ? "text-white font-medium" : "text-gray-400"}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lead Capture Panel */}
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Lead Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 w-24">Name:</span>
                  <span className="text-white font-medium">{leadData.name || "—"}</span>
                </div>
                {leadData.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 w-24">Email:</span>
                    <span className="text-white font-medium">{leadData.email}</span>
                  </div>
                )}
                {leadData.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 w-24">Phone:</span>
                    <span className="text-white font-medium">{leadData.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-400 w-24">Interest:</span>
                  <span className="text-white font-medium">{leadData.interest || "—"}</span>
                </div>

                {leadData.additionalData && Object.entries(leadData.additionalData).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-400 w-24">{key}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              {leadData.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-green-950/30 border border-green-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Lead Captured Successfully!</span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Results Section */}
      {currentMessageIndex >= currentStudy.messages.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-green-950/30 border-green-800/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-green-300 mb-4">The Results</h3>
              <ul className="space-y-2">
                {currentStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={goToPrevCase}
          disabled={currentCase === 0}
          variant="outline"
          className="gap-2"
          data-testid="button-prev-case"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Case
        </Button>

        <div className="flex gap-2">
          {caseStudies.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentCase(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentCase ? "bg-orange-500" : "bg-slate-600"
              }`}
              data-testid={`button-case-${index + 1}`}
            />
          ))}
        </div>

        <Button
          onClick={goToNextCase}
          disabled={currentCase === caseStudies.length - 1}
          variant="outline"
          className="gap-2"
          data-testid="button-next-case"
        >
          Next Case
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Compliance Modal */}
      <Dialog open={showCompliance} onOpenChange={setShowCompliance}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              Platform Compliance & Bot Capabilities
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">✅ What Social Media Bots CAN Do (Fully Automated)</h3>
              <div className="space-y-3 pl-4">
                <div>
                  <h4 className="font-semibold text-green-400">Direct Message (DM) Automation</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Instagram and Facebook APIs fully support automated DM responses</li>
                    <li>Bot can send and respond to DMs automatically - no human needed</li>
                    <li>Full conversations can happen without human intervention</li>
                    <li>This is the PRIMARY use case and where bots excel</li>
                    <li>100% compliant with platform policies</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-green-400">Comment Monitoring & Auto-DM</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Bot can monitor ALL comments on your posts in real-time</li>
                    <li>Detects keywords ("INFO", "INTERESTED", "PRICE", etc.)</li>
                    <li>When someone comments with a keyword → Bot automatically sends them a DM</li>
                    <li>All the actual conversation happens in DMs (where full automation is allowed)</li>
                    <li>This is a compliant workaround and widely used by businesses</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-green-400">Lead Capture & CRM Integration</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Automatically extract contact info (name, email, phone) from conversations</li>
                    <li>Save qualified leads to your CRM in real-time</li>
                    <li>Track conversation history and lead quality scores</li>
                    <li>Schedule appointments and send confirmations automatically</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">⚠️ What Bots CANNOT Do (Platform Restrictions)</h3>
              <div className="space-y-3 pl-4">
                <div>
                  <h4 className="font-semibold text-red-400">Auto-Posting Comment Responses</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Instagram severely restricts automated comment responses (anti-spam measures)</li>
                    <li>Facebook allows limited automation but with strict rate limits</li>
                    <li>Posting automated comments can flag your account, leading to restrictions or bans</li>
                    <li><strong>Solution:</strong> Bot monitors comments and auto-sends DMs instead (fully compliant)</li>
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="font-semibold text-yellow-400">Comment Response Assistance (Human-in-Loop)</h4>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Bot CAN read and analyze comments</li>
                    <li>Bot CAN generate intelligent response suggestions</li>
                    <li>But a HUMAN must review and click "post" for the response to go live</li>
                    <li>This is comment assistance, not comment automation</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">🎯 How Businesses Actually Use Social Media Bots</h3>
              <div className="space-y-2 pl-4">
                <p><strong>Step 1:</strong> Post on Instagram/Facebook with CTA: "Comment INTERESTED and we'll DM you!"</p>
                <p><strong>Step 2:</strong> Bot monitors for keyword comments ("INTERESTED", "INFO", etc.)</p>
                <p><strong>Step 3:</strong> When someone comments → Bot automatically sends them a personalized DM</p>
                <p><strong>Step 4:</strong> Full automated conversation happens in DMs (asking questions, qualifying, capturing contact info)</p>
                <p><strong>Step 5:</strong> Lead data saved to CRM, follow-up actions triggered automatically</p>
                <p className="mt-3 text-green-400"><strong>Result:</strong> 100% automated, fully compliant, zero manual work required</p>
              </div>
            </div>

            <div className="bg-blue-950/30 border border-blue-800/50 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-blue-300 mb-2">Bottom Line</h4>
              <p>All three case studies you see on this page represent <strong>100% automated workflows</strong> that are fully compliant with Instagram and Facebook policies. No human intervention needed once the bot is set up.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
