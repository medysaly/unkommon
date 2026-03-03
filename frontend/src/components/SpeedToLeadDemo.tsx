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
    title: "Zillow Inquiry → Instant Response",
    channel: "Website Form",
    channelIcon: Globe,
    problem: "Buyers submit Zillow inquiries at all hours. Most agents respond the next morning — by then, the buyer has already booked showings with 3 other agents.",
    solution: "AI responds within 2 seconds of Zillow form submission, qualifies the buyer, answers listing questions, and books a showing before your competitors even see the lead.",
    company: {
      name: "Stamford Premier Realty",
      industry: "Real Estate",
      responseTime: "2 seconds"
    },
    initialContext: {
      source: "Zillow Contact Form",
      urgency: "High - Active buyer"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "Zillow inquiry received:\n\nName: David Chen\nEmail: d.chen@email.com\nPhone: 555-0187\nListing: 42 Riverside Dr, Stamford — $1.2M\nMessage: 'Is this still available? Would love to see it this week.'", 
        delay: 1,
        timestamp: "11:47:14 PM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "Hi David! Yes, 42 Riverside Dr is still available — beautiful 4-bed Colonial with the renovated kitchen. Great choice.\n\nI can get you in for a private showing. Are you pre-approved, and does Saturday morning or Sunday afternoon work better?", 
        delay: 2,
        timestamp: "11:47:16 PM (2 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "Saturday morning works! Yes, pre-approved up to $1.3M with Chase.", 
        delay: 3,
        timestamp: "11:48:30 PM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "Perfect! You're booked for Saturday at 10 AM at 42 Riverside Dr. Your agent will be Lisa Park — she knows this property inside out.\n\nYou'll receive:\n• Confirmation text to 555-0187\n• Property details & comparable sales\n• Lisa's direct number\n\nAnything else you'd like to know about the listing?", 
        delay: 4,
        timestamp: "11:48:32 PM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "No that's perfect, thanks!", 
        delay: 5,
        timestamp: "11:49:01 PM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Zillow Lead Received", active: false, activatesAt: 0 },
      { id: 2, label: "AI Qualifies Buyer", active: false, activatesAt: 1 },
      { id: 3, label: "Check Agent Availability", active: false, activatesAt: 1 },
      { id: 4, label: "Send Response", active: false, activatesAt: 1 },
      { id: 5, label: "Book Showing", active: false, activatesAt: 3 },
      { id: 6, label: "CRM Updated", active: false, activatesAt: 4 }
    ],
    finalLeadData: {
      name: "David Chen",
      email: "d.chen@email.com",
      phone: "555-0187",
      interest: "42 Riverside Dr, Stamford — $1.2M",
      additionalData: {
        "Source": "Zillow Inquiry",
        "Response Time": "2 seconds",
        "Showing": "Saturday, 10:00 AM",
        "Pre-Approval": "$1.3M — Chase",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "2-second response at 11:47 PM (competitors respond Monday)",
      "Showing booked in under 2 minutes",
      "Qualified buyer captured before other agents saw the lead"
    ],
    competitorDelay: "Next morning (12+ hours)"
  },
  {
    id: 2,
    title: "New Patient Form → Instant Booking",
    channel: "Website Form",
    channelIcon: Mail,
    problem: "New patients fill out website contact forms at night and on weekends. Front desk staff don't see them until Monday. By then, the patient has booked elsewhere.",
    solution: "AI responds instantly to every new patient inquiry, answers insurance and availability questions, and books their first appointment — even at 10 PM on a Sunday.",
    company: {
      name: "Stamford Dental Spa",
      industry: "Dental Practice",
      responseTime: "3 seconds"
    },
    initialContext: {
      source: "Website New Patient Form",
      urgency: "Medium - New patient seeking dentist"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "New patient form submitted:\n\nName: Sarah Williams\nEmail: sarah.w@email.com\nPhone: 203-555-0234\nMessage: 'Just moved to Stamford. Looking for a new dentist for my family. Do you accept Delta Dental insurance?'", 
        delay: 1,
        timestamp: "8:47:33 PM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "Hi Sarah! Welcome to Stamford! 🎉 Yes, we accept Delta Dental — you're all set on insurance.\n\nWe'd love to get you and your family in for cleanings. How many family members, and do mornings or afternoons work better?\n\nWe have openings this week!", 
        delay: 2,
        timestamp: "8:47:36 PM (3 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "It's me, my husband, and our 8-year-old. Mornings would be great!", 
        delay: 3,
        timestamp: "8:51:12 PM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "Perfect! I can book all three of you on Thursday morning:\n• 9:00 AM — Sarah (cleaning + exam)\n• 9:30 AM — Husband (cleaning + exam)\n• 10:00 AM — Child (pediatric cleaning)\n\nDr. Patel handles the whole family. Sound good?", 
        delay: 4,
        timestamp: "8:51:15 PM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "That's perfect! Thank you so much!", 
        delay: 5,
        timestamp: "8:52:48 PM"
      },
      { 
        id: 6, 
        sender: "ai", 
        text: "You're all booked! ✓ Confirmation texts sent to 203-555-0234.\n\nI'll also email new patient forms you can fill out ahead of time to save time at the office. We're at 789 Main St, Stamford. See you Thursday! 😊", 
        delay: 6,
        timestamp: "8:52:51 PM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Form Received", active: false, activatesAt: 0 },
      { id: 2, label: "Verify Insurance", active: false, activatesAt: 1 },
      { id: 3, label: "Check Availability", active: false, activatesAt: 1 },
      { id: 4, label: "Send Response", active: false, activatesAt: 1 },
      { id: 5, label: "Book Family Appointments", active: false, activatesAt: 3 },
      { id: 6, label: "Send New Patient Forms", active: false, activatesAt: 5 }
    ],
    finalLeadData: {
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      phone: "203-555-0234",
      interest: "Family Dental — 3 new patients",
      additionalData: {
        "Insurance": "Delta Dental (verified)",
        "Family Size": "3 patients",
        "Appointments": "Thursday AM (9:00, 9:30, 10:00)",
        "Response Time": "3 seconds",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "3-second response at 8:47 PM (after hours)",
      "3 family appointments booked in 5 minutes",
      "New patients captured before they called another dentist"
    ],
    competitorDelay: "Next business day (14+ hours)"
  },
  {
    id: 3,
    title: "Google Search → Instant Case Screening",
    channel: "Live Chat",
    channelIcon: MessageSquare,
    problem: "Someone injured in an accident searches for a lawyer at 11 PM. They fill out 5 contact forms. The first firm to respond gets the case.",
    solution: "AI engages instantly via live chat, asks qualifying questions about the case type, determines if it's a good fit, and books a consultation with the right attorney.",
    company: {
      name: "Fairfield Injury Law",
      industry: "Law Firm",
      responseTime: "1 second"
    },
    initialContext: {
      source: "Website Live Chat",
      urgency: "High - Injury case"
    },
    messages: [
      { 
        id: 1, 
        sender: "customer", 
        text: "Hi, I was in a car accident last week and I think I need a lawyer. The other driver ran a red light.", 
        delay: 1,
        timestamp: "11:15:43 PM"
      },
      { 
        id: 2, 
        sender: "ai", 
        text: "I'm sorry to hear about your accident. You've come to the right place — we handle car accident cases throughout Fairfield County.\n\nA few quick questions to get you connected with the right attorney: Were you injured, and have you seen a doctor?", 
        delay: 2,
        timestamp: "11:15:44 PM (1 sec)"
      },
      { 
        id: 3, 
        sender: "customer", 
        text: "Yes, I went to the ER. I have whiplash and my back is still hurting.", 
        delay: 3,
        timestamp: "11:16:12 PM"
      },
      { 
        id: 4, 
        sender: "ai", 
        text: "That's important — having medical documentation helps your case significantly. Two more questions:\n\n1. Do you have the other driver's insurance info?\n2. Has their insurance company contacted you yet?", 
        delay: 4,
        timestamp: "11:16:14 PM"
      },
      { 
        id: 5, 
        sender: "customer", 
        text: "Yes I have their info. Their insurance called today and offered me $5,000 but that seems low.", 
        delay: 5,
        timestamp: "11:17:01 PM"
      },
      { 
        id: 6, 
        sender: "ai", 
        text: "Good instinct — do NOT accept that offer. Early lowball offers are very common, and your case may be worth significantly more, especially with ongoing back pain.\n\nI'd like to get you a free consultation with Attorney James Park — he specializes in car accident injuries. He has availability tomorrow at 11 AM or 3 PM. Which works?", 
        delay: 6,
        timestamp: "11:17:03 PM"
      },
      { 
        id: 7, 
        sender: "customer", 
        text: "Robert Kim, 203-555-0156. 11 AM works.", 
        delay: 7,
        timestamp: "11:17:41 PM"
      },
      { 
        id: 8, 
        sender: "ai", 
        text: "You're booked, Robert. Tomorrow at 11 AM with Attorney Park.\n\n✓ Confirmation text sent to 203-555-0156\n✓ Reminder tomorrow morning\n✓ Free consultation — no obligation\n\nImportant: don't speak to the other insurance company again before your consultation. Take care.", 
        delay: 8,
        timestamp: "11:17:43 PM"
      }
    ],
    workflowSteps: [
      { id: 1, label: "Chat Initiated", active: false, activatesAt: 0 },
      { id: 2, label: "Case Type Detection", active: false, activatesAt: 1 },
      { id: 3, label: "Qualify Case", active: false, activatesAt: 3 },
      { id: 4, label: "Capture Lead", active: false, activatesAt: 6 },
      { id: 5, label: "Book Consultation", active: false, activatesAt: 7 }
    ],
    finalLeadData: {
      name: "Robert Kim",
      phone: "203-555-0156",
      interest: "Personal Injury — Car Accident",
      additionalData: {
        "Case Type": "Car Accident — Whiplash + Back Injury",
        "Liability": "Clear — Other driver ran red light",
        "Medical": "ER visit + ongoing treatment",
        "Insurance Status": "Lowball offer received ($5K)",
        "Consultation": "Tomorrow, 11:00 AM",
        "Lead Score": "Hot 🔥"
      }
    },
    results: [
      "1-second response at 11:15 PM",
      "Case qualified and consultation booked in 2 minutes",
      "Client advised not to accept lowball offer"
    ],
    competitorDelay: "No response (office closed)"
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
