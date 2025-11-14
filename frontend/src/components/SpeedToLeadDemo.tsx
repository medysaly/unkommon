import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
  Zap,
  AlertCircle,
  Globe
} from "lucide-react";

interface Message {
  id: number;
  sender: "customer" | "ai";
  text: string;
  delay: number;
  timestamp?: string;
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
  activatesAt: number;
}

interface CaseStudy {
  id: number;
  title: string;
  channel: "Website Form" | "Email" | "Live Chat";
  channelIcon: any;
  problem: string;
  solution: string;
  company: {
    name: string;
    industry: string;
    responseTime: string;
  };
  initialContext: {
    source: string;
    urgency: string;
  };
  messages: Message[];
  workflowSteps: WorkflowStep[];
  finalLeadData: LeadData;
  results: string[];
  competitorDelay: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Website Contact Form → Instant Response",
    channel: "Website Form",
    channelIcon: Globe,
    problem: "Traditional businesses take 24-48 hours to respond to website inquiries. By then, the lead has already contacted 3-4 competitors and made a decision.",
    solution: "AI responds within 2 seconds of form submission, answers questions instantly, and books qualified leads into sales calendars before competitors even see the inquiry.",
    company: {
      name: "Premier Roofing Co",
      industry: "Home Services",
      responseTime: "2 seconds"
    },
    initialContext: {
      source: "Website Contact Form",
      urgency: "High - Storm damage"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "Customer submitted form:\n\nName: David Chen\nEmail: d.chen@email.com\nPhone: 555-0187\nMessage: 'Had some shingles blow off in last night's storm. Need estimate ASAP.'", 
        delay: 1,
        timestamp: "10:23:14 AM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "Hi David! Thanks for reaching out. I'm so sorry to hear about the storm damage. We can definitely help - we specialize in emergency storm repairs.\n\nI have availability for an inspection today at 2pm or 4pm. Which works better for you?", 
        delay: 2,
        timestamp: "10:23:16 AM (2 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "2pm would be great! How soon can you get the work done?", 
        delay: 3,
        timestamp: "10:24:30 AM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "Perfect! You're booked for 2pm today. For storm damage repairs, we typically complete the work within 48 hours of the estimate - often same day for emergency cases like yours.\n\nYou'll receive:\n• Confirmation text to 555-0187\n• Reminder 1 hour before\n• Inspector's name & photo\n\nAnything else I can help with?", 
        delay: 4,
        timestamp: "10:24:32 AM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "No that's perfect, thanks!", 
        delay: 5,
        timestamp: "10:25:01 AM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Form Submitted", active: false, activatesAt: 0 },
      { id: 2, label: "AI Reads Inquiry", active: false, activatesAt: 1 },
      { id: 3, label: "Check Availability", active: false, activatesAt: 1 },
      { id: 4, label: "Send Response", active: false, activatesAt: 1 },
      { id: 5, label: "Book Appointment", active: false, activatesAt: 3 },
      { id: 6, label: "CRM Updated", active: false, activatesAt: 4 }
    ],
    finalLeadData: {
      name: "David Chen",
      email: "d.chen@email.com",
      phone: "555-0187",
      interest: "Emergency Storm Damage Repair",
      additionalData: {
        "Source": "Website Contact Form",
        "Response Time": "2 seconds",
        "Appointment": "Today, 2:00 PM",
        "Urgency": "High - Storm Emergency",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "2-second response (vs 24-48 hour industry average)",
      "Appointment booked in under 2 minutes",
      "Lead captured before competitors responded"
    ],
    competitorDelay: "24-48 hours"
  },
  {
    id: 2,
    title: "Email Inquiry → Instant Answer",
    channel: "Email",
    channelIcon: Mail,
    problem: "Email inboxes overflow with inquiries. Sales teams manually respond during business hours only. Night and weekend leads go unanswered for 12+ hours.",
    solution: "AI monitors email 24/7, responds instantly with intelligent answers, and escalates qualified leads to sales team with full conversation context.",
    company: {
      name: "TechFlow Solutions",
      industry: "B2B Software",
      responseTime: "5 seconds"
    },
    initialContext: {
      source: "Sales Inquiry Email",
      urgency: "Medium - Evaluating vendors"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "Email received from: sarah.williams@innovatecorp.com\n\nSubject: Pricing for Team Plan\n\nHi,\n\nWe're a 25-person team looking to switch from our current project management tool. What's your pricing for our size? Do you offer migration support?\n\nBest,\nSarah Williams\nOperations Manager, InnovateCorp", 
        delay: 1,
        timestamp: "9:47:33 PM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "Hi Sarah,\n\nThanks for reaching out! Great timing - we'd love to help InnovateCorp make the switch.\n\nFor a 25-person team:\n• Professional Plan: $15/user/month ($375/month)\n• Includes: Unlimited projects, API access, priority support\n• Yes, we provide FREE migration support (data transfer + team training)\n\nI can schedule a 15-min demo call tomorrow to show you our migration process. Does 10am or 2pm EST work?", 
        delay: 2,
        timestamp: "9:47:38 PM (5 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "10am works! What info do you need from me?", 
        delay: 3,
        timestamp: "9:51:12 PM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "Perfect! You're all set for tomorrow at 10am EST.\n\nI'll need:\n✓ Your phone number (we'll send Zoom link)\n✓ Current tool you're using (helps us prep)\n✓ Any specific features you need\n\nCalendar invite + prep materials will hit your inbox in 60 seconds. Looking forward to it!", 
        delay: 4,
        timestamp: "9:51:15 PM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "555-0234, currently using Basecamp, mainly need better time tracking and reporting.", 
        delay: 5,
        timestamp: "9:52:48 PM"
      },
      { 
        id: 6, 
        sender: "ai", 
        text: "Excellent! I've added those details to your demo prep.\n\nOur time tracking and custom reports are exactly what Basecamp users love about switching. You're going to see some powerful stuff tomorrow at 10am.\n\nConfirmation sent to sarah.williams@innovatecorp.com. See you then! 🚀", 
        delay: 6,
        timestamp: "9:52:51 PM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Email Received", active: false, activatesAt: 0 },
      { id: 2, label: "AI Analyzes Intent", active: false, activatesAt: 1 },
      { id: 3, label: "Fetch Pricing Info", active: false, activatesAt: 1 },
      { id: 4, label: "Send Response", active: false, activatesAt: 1 },
      { id: 5, label: "Schedule Demo", active: false, activatesAt: 3 },
      { id: 6, label: "Notify Sales Team", active: false, activatesAt: 5 }
    ],
    finalLeadData: {
      name: "Sarah Williams",
      email: "sarah.williams@innovatecorp.com",
      phone: "555-0234",
      interest: "Professional Plan - 25 users",
      additionalData: {
        "Company": "InnovateCorp",
        "Role": "Operations Manager",
        "Current Tool": "Basecamp",
        "Team Size": "25 people",
        "Demo": "Tomorrow, 10am EST",
        "Lead Score": "Warm 🟡"
      }
    },
    results: [
      "5-second response at 9:47 PM (after hours)",
      "Demo booked in 5 minutes vs next-day manual follow-up",
      "Sales team notified with full context"
    ],
    competitorDelay: "12+ hours (next business day)"
  },
  {
    id: 3,
    title: "Live Chat → Instant Qualification",
    channel: "Live Chat",
    channelIcon: MessageSquare,
    problem: "Website visitors click away within 30 seconds if no one responds. Chat widgets sit empty during lunch breaks, after hours, and busy periods.",
    solution: "AI engages every visitor instantly, answers product questions, qualifies budget and timeline, and transfers hot leads to human sales reps with full context.",
    company: {
      name: "AutoNation Plus",
      industry: "Car Dealership",
      responseTime: "1 second"
    },
    initialContext: {
      source: "Website Live Chat",
      urgency: "High - Ready to buy"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "Hi, do you have any 2024 Toyota Camrys in stock?", 
        delay: 1,
        timestamp: "2:15:43 PM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "Hi there! 👋 Yes, we currently have 7 new 2024 Camrys in stock - several colors and trims available.\n\nAre you looking for a specific trim level (SE, XSE, TRD)?", 
        delay: 2,
        timestamp: "2:15:44 PM (1 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "XSE in white if possible. What's the price?", 
        delay: 3,
        timestamp: "2:16:12 PM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "Perfect! We have 2 white XSE models:\n• 2024 Camry XSE - $32,450\n• 2024 Camry XSE V6 - $36,900\n\nBoth include our current $2,000 dealer incentive. Are you trading in a vehicle?", 
        delay: 4,
        timestamp: "2:16:14 PM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "Yes, 2018 Honda Accord. What's my next step?", 
        delay: 5,
        timestamp: "2:17:01 PM"
      },
      { 
        id: 6, 
        sender: "ai", 
        text: "Great! Here's what I can do for you:\n\n1. Get your trade-in estimate (takes 2 min)\n2. Reserve the white XSE you want\n3. Schedule a test drive today\n\nWhat's your name and best phone number? I'll connect you with Michael (our sales manager) who's available right now.", 
        delay: 6,
        timestamp: "2:17:03 PM"
      },
      { 
        id: 7, 
        sender: "customer", 
        text: "Robert Kim, 555-0156", 
        delay: 7,
        timestamp: "2:17:41 PM"
      },
      { 
        id: 8, 
        sender: "ai", 
        text: "Perfect, Robert! Michael is calling you at 555-0156 in the next 60 seconds. He'll:\n✓ Get your Accord's trade-in value\n✓ Answer any questions\n✓ Get you scheduled for a test drive\n\nYou're going to love the white XSE! 🚗", 
        delay: 8,
        timestamp: "2:17:43 PM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Chat Initiated", active: false, activatesAt: 0 },
      { id: 2, label: "Check Inventory", active: false, activatesAt: 1 },
      { id: 3, label: "Qualify Budget", active: false, activatesAt: 3 },
      { id: 4, label: "Capture Lead", active: false, activatesAt: 6 },
      { id: 5, label: "Transfer to Sales", active: false, activatesAt: 7 }
    ],
    finalLeadData: {
      name: "Robert Kim",
      phone: "555-0156",
      interest: "2024 Camry XSE (White) + Trade-in",
      additionalData: {
        "Vehicle Interest": "2024 Toyota Camry XSE White",
        "Price Point": "$32,450",
        "Trade-In": "2018 Honda Accord",
        "Status": "Hot Lead - Transfer to Sales",
        "Response Time": "1 second",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "1-second initial response",
      "Lead qualified and transferred in 2 minutes",
      "Sales rep called with full context ready"
    ],
    competitorDelay: "No response (chat offline)"
  }
];

export default function SpeedToLeadDemo() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const currentCase = caseStudies[currentCaseIndex];

  useEffect(() => {
    setWorkflowSteps(currentCase.workflowSteps);
    setDisplayedMessages([]);
    setCurrentMessageIndex(0);
    setIsPlaying(false);
  }, [currentCaseIndex]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [displayedMessages]);

  useEffect(() => {
    if (!isPlaying || currentMessageIndex >= currentCase.messages.length) {
      if (currentMessageIndex >= currentCase.messages.length) {
        setIsPlaying(false);
      }
      return;
    }

    const nextMessage = currentCase.messages[currentMessageIndex];
    const timer = setTimeout(() => {
      setDisplayedMessages(prev => [...prev, nextMessage]);
      
      const updatedSteps = workflowSteps.map(step => {
        if (step.activatesAt === currentMessageIndex) {
          return { ...step, active: true };
        }
        return step;
      });
      setWorkflowSteps(updatedSteps);
      
      setCurrentMessageIndex(prev => prev + 1);
    }, nextMessage.delay * 1000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentMessageIndex, currentCase.messages, workflowSteps]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    setWorkflowSteps(currentCase.workflowSteps);
  };

  const handlePrevCase = () => {
    setCurrentCaseIndex((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1));
  };

  const handleNextCase = () => {
    setCurrentCaseIndex((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1));
  };

  const handleStart = () => {
    if (currentMessageIndex === 0) {
      setIsPlaying(true);
    }
  };

  const ChannelIcon = currentCase.channelIcon;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            onClick={handlePrevCase}
            variant="outline"
            size="icon"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            data-testid="button-prev-case"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <ChannelIcon className="w-5 h-5 text-purple-400" />
              {currentCase.title}
            </h3>
            <p className="text-sm text-gray-400">
              Case Study {currentCaseIndex + 1} of {caseStudies.length}
            </p>
          </div>
          
          <Button
            onClick={handleNextCase}
            variant="outline"
            size="icon"
            className="border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
            data-testid="button-next-case"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleStart}
            disabled={isPlaying || currentMessageIndex > 0}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            data-testid="button-demo-start"
          >
            {currentMessageIndex === 0 ? "Start Demo" : "Demo In Progress"}
            <Play className="w-4 h-4 ml-2" />
          </Button>
          <Button
            onClick={handlePlayPause}
            disabled={currentMessageIndex === 0 || currentMessageIndex >= currentCase.messages.length}
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
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
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-purple-400 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                The Problem
              </h4>
              <p className="text-sm text-gray-300">{currentCase.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-green-400 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Our Solution
              </h4>
              <p className="text-sm text-gray-300">{currentCase.solution}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 p-4 bg-slate-900 rounded-lg border border-slate-700">
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Company</p>
              <p className="text-sm font-semibold text-white">{currentCase.company.name}</p>
              <p className="text-xs text-gray-500">{currentCase.company.industry}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">Channel</p>
              <p className="text-sm font-semibold text-purple-400">{currentCase.channel}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-400 mb-1">AI Response Time</p>
              <p className="text-sm font-semibold text-green-400">{currentCase.company.responseTime}</p>
              <p className="text-xs text-red-400">vs {currentCase.competitorDelay}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                {currentCase.channel} Conversation
              </h3>
              
              <div className="h-[450px] overflow-y-auto space-y-4 p-4 bg-slate-900 rounded-lg" data-testid="container-chat">
                <AnimatePresence>
                  {displayedMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                      data-testid={`message-${message.id}`}
                    >
                      <div className={`max-w-[85%] ${message.sender === "customer" ? "order-2" : "order-1"}`}>
                        <div
                          className={`rounded-lg p-4 ${
                            message.sender === "customer"
                              ? "bg-purple-600/20 border border-purple-500/30"
                              : "bg-slate-700 border border-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {message.sender === "ai" ? (
                              <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-green-400" />
                                <span className="text-xs font-semibold text-green-400">AI Agent</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-purple-400" />
                                <span className="text-xs font-semibold text-purple-400">Customer</span>
                              </div>
                            )}
                            {message.timestamp && (
                              <span className="text-xs text-gray-500 ml-auto">{message.timestamp}</span>
                            )}
                          </div>
                          <p className="text-sm text-gray-200 whitespace-pre-line">{message.text}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                Automation Workflow
              </h3>
              <div className="space-y-3">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      step.active ? "bg-purple-500/10 border border-purple-500/30" : "bg-slate-900"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.active ? "bg-purple-500" : "bg-slate-700"
                    }`}>
                      {step.active ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-xs text-gray-400">{step.id}</span>
                      )}
                    </div>
                    <p className={`text-sm flex-1 ${
                      step.active ? "text-white font-medium" : "text-gray-400"
                    }`}>
                      {step.label}
                    </p>
                    {step.active && (
                      <Clock className="w-4 h-4 text-purple-400" />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-purple-400" />
                Lead Information
              </h3>
              
              {displayedMessages.length >= currentCase.messages.length ? (
                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Name</p>
                    <p className="text-sm text-white font-medium">{currentCase.finalLeadData.name}</p>
                  </div>
                  {currentCase.finalLeadData.email && (
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Email</p>
                      <p className="text-sm text-white font-medium">{currentCase.finalLeadData.email}</p>
                    </div>
                  )}
                  {currentCase.finalLeadData.phone && (
                    <div className="p-3 bg-slate-900 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Phone</p>
                      <p className="text-sm text-white font-medium">{currentCase.finalLeadData.phone}</p>
                    </div>
                  )}
                  <div className="p-3 bg-slate-900 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Interest</p>
                    <p className="text-sm text-white font-medium">{currentCase.finalLeadData.interest}</p>
                  </div>
                  {currentCase.finalLeadData.additionalData && Object.entries(currentCase.finalLeadData.additionalData).map(([key, value]) => (
                    <div key={key} className="p-3 bg-slate-900 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">{key}</p>
                      <p className="text-sm text-white font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <User className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Lead data will appear here as the conversation progresses...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {displayedMessages.length >= currentCase.messages.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/30">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Results
                  </h3>
                  <ul className="space-y-2">
                    {currentCase.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-200">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
