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
  Globe,
  Target
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
    if (chatEndRef.current && chatEndRef.current.parentElement) {
      const chatContainer = chatEndRef.current.parentElement;
      chatContainer.scrollTop = chatContainer.scrollHeight;
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
    <div className="space-y-8">
      {/* Case Study Selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setCurrentCaseIndex(0)}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            currentCaseIndex === 0
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-website"
        >
          <Globe className="w-4 h-4 mr-2 inline" />
          Website Form
        </button>
        <button
          onClick={() => setCurrentCaseIndex(1)}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            currentCaseIndex === 1
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-email"
        >
          <Mail className="w-4 h-4 mr-2 inline" />
          Email
        </button>
        <button
          onClick={() => setCurrentCaseIndex(2)}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            currentCaseIndex === 2
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-chat"
        >
          <MessageSquare className="w-4 h-4 mr-2 inline" />
          Live Chat
        </button>
      </div>

      {/* Case Study Header */}
      <div className="text-center">
        <h3 className="text-2xl font-light text-white mb-2 tracking-tight">{currentCase.title}</h3>
        <p className="text-zinc-500 text-sm font-light mb-2">{currentCase.company.name} • {currentCase.company.industry}</p>
        <p className="text-zinc-400 font-light">{currentCase.solution}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Conversation Interface */}
        <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="p-6">
            {/* Channel Header */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ChannelIcon className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <div className="text-white font-light">{currentCase.channel}</div>
                <div className="text-zinc-500 text-xs font-light">Response: {currentCase.company.responseTime}</div>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto" data-testid="container-chat">
              <AnimatePresence mode="popLayout">
                {displayedMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${message.id}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.sender === "customer"
                          ? "bg-white text-black"
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {message.sender === "ai" ? (
                          <Zap className="w-3 h-3 text-zinc-400" />
                        ) : (
                          <User className="w-3 h-3 text-zinc-400" />
                        )}
                        <span className="text-xs font-light opacity-75">
                          {message.sender === "ai" ? "AI Agent" : "Customer"}
                        </span>
                        {message.timestamp && (
                          <span className="text-xs opacity-50 ml-auto">{message.timestamp}</span>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-line font-light">{message.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-700/60">
              {!isPlaying && currentMessageIndex === 0 ? (
                <button
                  onClick={handleStart}
                  className="flex-1 bg-white hover:bg-zinc-100 text-black py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2"
                  data-testid="button-demo-start"
                >
                  <Play className="w-4 h-4" />
                  Start Demo
                </button>
              ) : !isPlaying ? (
                <button
                  onClick={handlePlayPause}
                  className="flex-1 bg-white hover:bg-zinc-100 text-black py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2"
                  data-testid="button-demo-resume"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={handlePlayPause}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2 border border-zinc-800"
                  data-testid="button-demo-pause"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 py-3 px-4 rounded-full border border-zinc-800 transition-all"
                data-testid="button-demo-reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow & Lead Data */}
        <div className="space-y-6">
          {/* Workflow Visualization */}
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h4 className="text-lg font-light text-white mb-4 tracking-tight">Automation Workflow</h4>
              <div className="space-y-3" data-testid="workflow-container">
                {workflowSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: step.active ? 1 : 0.5,
                      scale: step.active ? 1.02 : 1
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      step.active
                        ? "bg-zinc-800 border border-zinc-700"
                        : "bg-zinc-950 border border-zinc-800"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.active
                        ? "bg-white text-black"
                        : "bg-zinc-800"
                    }`}>
                      {step.active ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-zinc-400 text-xs font-light">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-light ${
                      step.active ? "text-zinc-200" : "text-zinc-600"
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Analysis Data */}
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h4 className="text-lg font-light text-white mb-4 tracking-tight">Lead Information</h4>
              {displayedMessages.length >= currentCase.messages.length ? (
                <div className="space-y-3" data-testid="lead-data-container">
                  <div className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-zinc-500 mt-0.5" />
                      <span className="text-sm text-zinc-500 font-light">Name</span>
                    </div>
                    <span className="text-sm text-zinc-200 font-light text-right">{currentCase.finalLeadData.name}</span>
                  </div>
                  {currentCase.finalLeadData.email && (
                    <div className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <div className="flex items-start gap-2">
                        <Mail className="w-4 h-4 text-zinc-500 mt-0.5" />
                        <span className="text-sm text-zinc-500 font-light">Email</span>
                      </div>
                      <span className="text-sm text-zinc-200 font-light text-right">{currentCase.finalLeadData.email}</span>
                    </div>
                  )}
                  {currentCase.finalLeadData.phone && (
                    <div className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <div className="flex items-start gap-2">
                        <Phone className="w-4 h-4 text-zinc-500 mt-0.5" />
                        <span className="text-sm text-zinc-500 font-light">Phone</span>
                      </div>
                      <span className="text-sm text-zinc-200 font-light text-right">{currentCase.finalLeadData.phone}</span>
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                    <div className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-zinc-500 mt-0.5" />
                      <span className="text-sm text-zinc-500 font-light">Interest</span>
                    </div>
                    <span className="text-sm text-zinc-200 font-light text-right">{currentCase.finalLeadData.interest}</span>
                  </div>
                  {currentCase.finalLeadData.additionalData && Object.entries(currentCase.finalLeadData.additionalData).map(([key, value]) => (
                    <div key={key} className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                      <span className="text-sm text-zinc-500 font-light">{key}</span>
                      <span className="text-sm text-zinc-200 font-light text-right">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-zinc-600 text-sm font-light">
                    Lead data will appear here as the conversation progresses
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
