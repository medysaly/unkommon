import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Phone, Globe, Clock, Users, CheckCircle, AlertCircle, Calendar, MessageCircle } from "lucide-react";

type CaseStudy = "routing" | "multilingual" | "messaging";

interface CallMessage {
  id: number;
  speaker: "caller" | "ai" | "system";
  text: string;
  time: string;
  type?: "speech" | "action" | "transfer";
}

interface WorkflowStep {
  id: number;
  label: string;
  status: "pending" | "active" | "completed";
}

interface AnalysisData {
  label: string;
  value: string;
  icon?: any;
}

const caseStudyData = {
  routing: {
    title: "After-Hours Patient Booking",
    subtitle: "24/7 Dental Appointment Scheduling",
    description: "Patient calls at 9 PM with a toothache. AI handles the call, checks next-day availability, books an emergency slot, and sends a confirmation text.",
    messages: [
      { id: 1, speaker: "ai" as const, text: "Thank you for calling Stamford Dental Spa. How can I help you tonight?", time: "9:03 PM", type: "speech" as const },
      { id: 2, speaker: "caller" as const, text: "Hi, I've had really bad tooth pain all day. I need to see someone as soon as possible.", time: "9:03 PM", type: "speech" as const },
      { id: 3, speaker: "system" as const, text: "Analyzing: Emergency dental issue detected — checking next-day availability", time: "9:03 PM", type: "action" as const },
      { id: 4, speaker: "ai" as const, text: "I'm sorry to hear you're in pain. Let me check Dr. Patel's schedule for first thing tomorrow morning.", time: "9:03 PM", type: "speech" as const },
      { id: 5, speaker: "system" as const, text: "Availability found: Dr. Patel, 8:30 AM emergency slot open", time: "9:04 PM", type: "action" as const },
      { id: 6, speaker: "ai" as const, text: "Great news — I have an 8:30 AM emergency slot with Dr. Patel tomorrow. Can I book that for you? I'll also send a confirmation text with our address and pre-visit instructions.", time: "9:04 PM", type: "speech" as const },
      { id: 7, speaker: "caller" as const, text: "Yes, please! That would be amazing.", time: "9:04 PM", type: "speech" as const },
      { id: 8, speaker: "system" as const, text: "Appointment booked — confirmation SMS sent to patient", time: "9:04 PM", type: "action" as const },
      { id: 9, speaker: "ai" as const, text: "You're all set for tomorrow at 8:30 AM with Dr. Patel. I've sent a confirmation text with our address at 123 Main St, Stamford. In the meantime, ibuprofen can help with the pain. Feel better!", time: "9:05 PM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Call Received", status: "pending" as const },
      { id: 2, label: "Issue Detection", status: "pending" as const },
      { id: 3, label: "Check Availability", status: "pending" as const },
      { id: 4, label: "Book Emergency Slot", status: "pending" as const },
      { id: 5, label: "Send Confirmation", status: "pending" as const },
      { id: 6, label: "Update Records", status: "pending" as const },
    ],
    analysisData: [
      { label: "Topic Detected", value: "Emergency dental", icon: CheckCircle },
      { label: "Department", value: "Dr. Patel's office", icon: Users },
      { label: "Agent", value: "AI Receptionist", icon: Users },
      { label: "Wait Time", value: "0 seconds", icon: Clock },
      { label: "Context", value: "Toothache, needs next-day appointment", icon: CheckCircle },
    ]
  },
  multilingual: {
    title: "International Buyer Inquiry",
    subtitle: "Real Estate Multi-Language Support",
    description: "International buyer calls about a $1.8M listing in Greenwich. AI detects Mandarin, switches seamlessly, answers property questions, and schedules a showing.",
    messages: [
      { id: 1, speaker: "ai" as const, text: "Thank you for calling Greenwich Luxury Realty. How may I help you?", time: "10:30 AM", type: "speech" as const },
      { id: 2, speaker: "caller" as const, text: "你好，我想了解一下格林威治那套180万的房子。", time: "10:30 AM", type: "speech" as const },
      { id: 3, speaker: "system" as const, text: "Language detected: Mandarin Chinese — Switching language", time: "10:30 AM", type: "action" as const },
      { id: 4, speaker: "ai" as const, text: "你好！您说的是Riverside Drive那套180万美元的殖民地风格住宅吗？5间卧室，3间浴室，占地半英亩。请问您想了解哪些方面？", time: "10:30 AM", type: "speech" as const },
      { id: 5, speaker: "caller" as const, text: "对，就是那套。学区怎么样？能安排看房吗？", time: "10:31 AM", type: "speech" as const },
      { id: 6, speaker: "ai" as const, text: "该房产位于格林威治顶级学区，North Street小学评分10/10。我可以为您安排本周六下午2点的看房，由我们的双语经纪人陈先生接待。方便吗？", time: "10:31 AM", type: "speech" as const },
      { id: 7, speaker: "caller" as const, text: "好的，周六下午两点可以。", time: "10:31 AM", type: "speech" as const },
      { id: 8, speaker: "system" as const, text: "Showing scheduled — Confirmation sent in Mandarin", time: "10:32 AM", type: "action" as const },
      { id: 9, speaker: "ai" as const, text: "太好了！看房已安排在本周六下午2点。我会发送确认短信和房产详细资料到您的手机。请问您的电话号码是？", time: "10:32 AM", type: "speech" as const },
      { id: 10, speaker: "caller" as const, text: "917-555-0188", time: "10:32 AM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Call Received", status: "pending" as const },
      { id: 2, label: "Language Detection", status: "pending" as const },
      { id: 3, label: "Switch to Mandarin", status: "pending" as const },
      { id: 4, label: "Match Listing", status: "pending" as const },
      { id: 5, label: "Answer Questions", status: "pending" as const },
      { id: 6, label: "Schedule Showing", status: "pending" as const },
    ],
    analysisData: [
      { label: "Language Detected", value: "Mandarin Chinese", icon: Globe },
      { label: "Detection Time", value: "0.3 seconds", icon: Clock },
      { label: "Listing Matched", value: "$1.8M Colonial, Greenwich", icon: CheckCircle },
      { label: "Showing Booked", value: "Saturday 2:00 PM", icon: Calendar },
      { label: "Agent Assigned", value: "Bilingual agent (Chen)", icon: Users },
    ]
  },
  messaging: {
    title: "After-Hours Legal Intake",
    subtitle: "Law Firm Client Screening",
    description: "Potential client calls at 8 PM about a family law matter. AI provides empathetic intake, asks qualifying questions, and books a consultation with the right attorney.",
    messages: [
      { id: 1, speaker: "caller" as const, text: "Hi, I need to speak with someone about a divorce. My spouse just told me they want to separate.", time: "8:12 PM", type: "speech" as const },
      { id: 2, speaker: "system" as const, text: "After-hours call received — Intent: Family law intake", time: "8:12 PM", type: "action" as const },
      { id: 3, speaker: "ai" as const, text: "I'm sorry you're going through this — I understand it's a difficult time. You've reached Fairfield Family Law. I can help you get a consultation scheduled with one of our family law attorneys. Can I ask a few questions to make sure we connect you with the right person?", time: "8:12 PM", type: "speech" as const },
      { id: 4, speaker: "caller" as const, text: "Yes, of course.", time: "8:13 PM", type: "speech" as const },
      { id: 5, speaker: "ai" as const, text: "Are there any children involved, and do you and your spouse own property together?", time: "8:13 PM", type: "speech" as const },
      { id: 6, speaker: "caller" as const, text: "Yes, we have two kids and we own our home in Stamford.", time: "8:13 PM", type: "speech" as const },
      { id: 7, speaker: "system" as const, text: "Qualifying: Custody + property division — routing to Attorney Sarah Chen (family law specialist)", time: "8:13 PM", type: "action" as const },
      { id: 8, speaker: "ai" as const, text: "Thank you. Given that children and property are involved, I'd like to schedule you with Attorney Sarah Chen — she specializes in custody and property division cases. She has availability tomorrow at 10 AM or Thursday at 2 PM. Which works for you?", time: "8:14 PM", type: "speech" as const },
      { id: 9, speaker: "caller" as const, text: "Tomorrow at 10 would be great.", time: "8:14 PM", type: "speech" as const },
      { id: 10, speaker: "ai" as const, text: "You're booked for tomorrow at 10 AM with Attorney Chen. I'll send you a confirmation text with our office address and a list of documents to bring. The initial consultation is complimentary. Take care.", time: "8:14 PM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Call Received", status: "pending" as const },
      { id: 2, label: "Empathetic Intake", status: "pending" as const },
      { id: 3, label: "Qualifying Questions", status: "pending" as const },
      { id: 4, label: "Match Attorney", status: "pending" as const },
      { id: 5, label: "Book Consultation", status: "pending" as const },
      { id: 6, label: "Send Confirmation", status: "pending" as const },
    ],
    analysisData: [
      { label: "Practice Area", value: "Family Law — Divorce", icon: MessageCircle },
      { label: "Case Complexity", value: "Custody + Property Division", icon: CheckCircle },
      { label: "Response Time", value: "0 seconds (after-hours)", icon: Clock },
      { label: "Consultation Booked", value: "Tomorrow 10:00 AM", icon: Calendar },
      { label: "Attorney Matched", value: "Sarah Chen (Family Law)", icon: Users },
    ]
  },
};

export default function AIReceptionistDemos() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>("routing");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(caseStudyData[selectedCase].workflow);

  const currentCase = caseStudyData[selectedCase];
  const visibleMessages = currentCase.messages.slice(0, currentMessageIndex + 1);

  useEffect(() => {
    setWorkflow(caseStudyData[selectedCase].workflow);
    setCurrentMessageIndex(-1);
    setIsPlaying(false);
  }, [selectedCase]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentMessageIndex >= currentCase.messages.length - 1) {
      setIsPlaying(false);
      return;
    }

    const timer = setTimeout(() => {
      setCurrentMessageIndex(prev => prev + 1);
      
      const nextIndex = currentMessageIndex + 1;
      const updatedWorkflow = workflow.map((step, idx) => {
        if (idx < Math.floor((nextIndex / currentCase.messages.length) * workflow.length)) {
          return { ...step, status: "completed" as const };
        } else if (idx === Math.floor((nextIndex / currentCase.messages.length) * workflow.length)) {
          return { ...step, status: "active" as const };
        }
        return step;
      });
      setWorkflow(updatedWorkflow);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, currentMessageIndex, currentCase.messages.length, workflow]);

  const handlePlay = () => {
    if (currentMessageIndex === -1) {
      setCurrentMessageIndex(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentMessageIndex(-1);
    setIsPlaying(false);
    setWorkflow(caseStudyData[selectedCase].workflow.map(step => ({ ...step, status: "pending" as const })));
  };

  return (
    <div className="space-y-8">
      {/* Case Study Selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => setSelectedCase("routing")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "routing"
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-routing"
        >
          <Users className="w-4 h-4 mr-2 inline" />
          Call Routing
        </button>
        <button
          onClick={() => setSelectedCase("multilingual")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "multilingual"
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-multilingual"
        >
          <Globe className="w-4 h-4 mr-2 inline" />
          Multi-Language
        </button>
        <button
          onClick={() => setSelectedCase("messaging")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "messaging"
              ? "bg-white text-black"
              : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 border border-zinc-800"
          }`}
          data-testid="button-case-messaging"
        >
          <MessageCircle className="w-4 h-4 mr-2 inline" />
          Messaging
        </button>
      </div>

      {/* Case Study Header */}
      <div className="text-center">
        <h3 className="text-2xl font-light text-white mb-2 tracking-tight">{currentCase.title}</h3>
        <p className="text-zinc-500 text-sm font-light mb-2">{currentCase.subtitle}</p>
        <p className="text-zinc-400 font-light">{currentCase.description}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Phone Call Interface */}
        <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
          <div className="p-6">
            {/* Phone Header */}
            <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                {selectedCase === "messaging" ? (
                  <MessageCircle className="w-6 h-6 text-zinc-400" />
                ) : (
                  <Phone className="w-6 h-6 text-zinc-400" />
                )}
              </div>
              <div>
                <div className="text-white font-light">
                  {selectedCase === "messaging" ? "WhatsApp Chat" : "AI Receptionist"}
                </div>
                <div className="text-zinc-500 text-xs font-light">
                  {selectedCase === "messaging" ? "Active Chat" : "Active Call"}
                </div>
              </div>
            </div>

            {/* Call Messages */}
            <div className="space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto" data-testid="call-messages-container">
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.speaker === "caller" ? "justify-end" : "justify-start"}`}
                    data-testid={`message-${message.id}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl p-3 ${
                        message.speaker === "caller"
                          ? "bg-white text-black"
                          : message.speaker === "system"
                          ? "bg-zinc-800 text-zinc-400 italic border border-zinc-700"
                          : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                      }`}
                    >
                      {message.speaker === "system" && (
                        <div className="mb-2 text-xs text-zinc-500 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          System
                        </div>
                      )}
                      <p className="text-sm whitespace-pre-line font-light" data-testid={`message-text-${message.id}`}>{message.text}</p>
                      <p className="text-xs opacity-50 mt-1 text-right font-light">{message.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-zinc-700/60">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="flex-1 bg-white hover:bg-zinc-100 text-black py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2"
                  data-testid="button-play-demo"
                >
                  <Play className="w-4 h-4" />
                  {currentMessageIndex === -1 ? "Start Demo" : "Resume"}
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2 border border-zinc-800"
                  data-testid="button-pause-demo"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-zinc-900 hover:bg-zinc-800 text-zinc-400 py-3 px-4 rounded-full border border-zinc-800 transition-all"
                data-testid={`button-reset-${selectedCase}`}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Workflow & Analysis */}
        <div className="space-y-6">
          {/* Workflow Visualization */}
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h4 className="text-lg font-light text-white mb-4 tracking-tight">AI Workflow</h4>
              <div className="space-y-3" data-testid="workflow-container">
                {workflow.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{
                      opacity: step.status === "pending" ? 0.5 : 1,
                      scale: step.status === "active" ? 1.02 : 1
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      step.status === "completed"
                        ? "bg-zinc-800 border border-zinc-700"
                        : step.status === "active"
                        ? "bg-zinc-800 border border-zinc-600"
                        : "bg-zinc-950 border border-zinc-800"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-white text-black"
                        : step.status === "active"
                        ? "bg-zinc-600 animate-pulse"
                        : "bg-zinc-800"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-zinc-400 text-xs font-light">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-light ${
                      step.status === "pending" ? "text-zinc-600" : "text-zinc-200"
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis Data */}
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h4 className="text-lg font-light text-white mb-4 tracking-tight">
                {selectedCase === "messaging" ? "Chat Analysis" : "Call Analysis"}
              </h4>
              {currentMessageIndex >= 0 ? (
                <div className="space-y-3" data-testid="analysis-container">
                  {currentCase.analysisData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start justify-between gap-4 p-3 bg-zinc-950 border border-zinc-800 rounded-xl"
                      data-testid={`analysis-item-${index}`}
                    >
                      <div className="flex items-start gap-2">
                        {data.icon && <data.icon className="w-4 h-4 text-zinc-500 mt-0.5" />}
                        <span className="text-sm text-zinc-500 font-light" data-testid={`analysis-label-${index}`}>{data.label}</span>
                      </div>
                      <span className="text-sm text-zinc-200 font-light text-right" data-testid={`analysis-value-${index}`}>{data.value}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-zinc-600 text-sm font-light">
                    Call analysis will appear here as the demo runs
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
