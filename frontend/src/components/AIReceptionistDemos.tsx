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
    title: "Intelligent Call Routing",
    subtitle: "Smart Department Detection",
    description: "Customer calls with a billing question. AI detects topic, checks team availability, and routes intelligently.",
    messages: [
      { id: 1, speaker: "ai" as const, text: "Thank you for calling Acme Solutions. How may I help you today?", time: "2:15 PM", type: "speech" as const },
      { id: 2, speaker: "caller" as const, text: "Hi, I have a question about my last invoice. I was charged twice for the same service.", time: "2:15 PM", type: "speech" as const },
      { id: 3, speaker: "system" as const, text: "Analyzing: Billing issue detected - Routing to Accounting", time: "2:15 PM", type: "action" as const },
      { id: 4, speaker: "ai" as const, text: "I understand you're concerned about a duplicate charge on your invoice. Let me connect you with our accounting department right away.", time: "2:15 PM", type: "speech" as const },
      { id: 5, speaker: "system" as const, text: "Checking availability: Sarah Martinez (Accounting) - Available", time: "2:15 PM", type: "action" as const },
      { id: 6, speaker: "ai" as const, text: "I'm transferring you to Sarah Martinez in our accounting department. She'll have access to your account details and can resolve this immediately.", time: "2:16 PM", type: "speech" as const },
      { id: 7, speaker: "system" as const, text: "Transfer initiated - Call summary sent to Sarah", time: "2:16 PM", type: "transfer" as const },
      { id: 8, speaker: "caller" as const, text: "Great, thank you!", time: "2:16 PM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Call Received", status: "pending" as const },
      { id: 2, label: "Topic Analysis", status: "pending" as const },
      { id: 3, label: "Department Match", status: "pending" as const },
      { id: 4, label: "Check Availability", status: "pending" as const },
      { id: 5, label: "Prep Context", status: "pending" as const },
      { id: 6, label: "Transfer Call", status: "pending" as const },
    ],
    analysisData: [
      { label: "Topic Detected", value: "Billing inquiry", icon: CheckCircle },
      { label: "Department", value: "Accounting", icon: Users },
      { label: "Agent Assigned", value: "Sarah Martinez", icon: Users },
      { label: "Wait Time", value: "8 seconds", icon: Clock },
      { label: "Context Shared", value: "Duplicate charge issue", icon: CheckCircle },
    ]
  },
  multilingual: {
    title: "Multi-Language Support",
    subtitle: "Automatic Language Detection",
    description: "Customer calls speaking Spanish. AI detects language instantly and converses fluently in Spanish.",
    messages: [
      { id: 1, speaker: "ai" as const, text: "Thank you for calling Wellness Clinic. How may I help you?", time: "10:30 AM", type: "speech" as const },
      { id: 2, speaker: "caller" as const, text: "Hola, necesito hacer una cita con el doctor para mi hijo.", time: "10:30 AM", type: "speech" as const },
      { id: 3, speaker: "system" as const, text: "Language detected: Spanish - Switching to Spanish", time: "10:30 AM", type: "action" as const },
      { id: 4, speaker: "ai" as const, text: "¡Hola! Claro, con gusto le ayudo a programar una cita para su hijo. ¿Es para un chequeo general o algo específico?", time: "10:30 AM", type: "speech" as const },
      { id: 5, speaker: "caller" as const, text: "Tiene tos y fiebre desde ayer", time: "10:31 AM", type: "speech" as const },
      { id: 6, speaker: "ai" as const, text: "Entiendo. Tenemos disponibilidad hoy a las 3:00 PM con la Dra. García. ¿Le funciona ese horario?", time: "10:31 AM", type: "speech" as const },
      { id: 7, speaker: "caller" as const, text: "Sí, perfecto", time: "10:31 AM", type: "speech" as const },
      { id: 8, speaker: "ai" as const, text: "Excelente. He programado la cita para hoy a las 3:00 PM con la Dra. García. Le enviaré un mensaje de confirmación. ¿Cuál es su número de teléfono?", time: "10:31 AM", type: "speech" as const },
      { id: 9, speaker: "caller" as const, text: "555-0123", time: "10:32 AM", type: "speech" as const },
      { id: 10, speaker: "ai" as const, text: "Perfecto. Le he enviado la confirmación al 555-0123. Nos vemos hoy a las 3:00 PM. ¡Que se mejore su hijo!", time: "10:32 AM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Call Received", status: "pending" as const },
      { id: 2, label: "Language Detection", status: "pending" as const },
      { id: 3, label: "Switch to Spanish", status: "pending" as const },
      { id: 4, label: "Understand Request", status: "pending" as const },
      { id: 5, label: "Check Availability", status: "pending" as const },
      { id: 6, label: "Book Appointment", status: "pending" as const },
    ],
    analysisData: [
      { label: "Language Detected", value: "Spanish (ES-MX)", icon: Globe },
      { label: "Detection Time", value: "0.4 seconds", icon: Clock },
      { label: "Fluency Level", value: "Native (98%)", icon: CheckCircle },
      { label: "Appointment Booked", value: "Today 3:00 PM", icon: Calendar },
      { label: "Confirmation Sent", value: "SMS to 555-0123", icon: CheckCircle },
    ]
  },
  messaging: {
    title: "Omnichannel Messaging",
    subtitle: "WhatsApp & Instagram Integration",
    description: "Customer messages on WhatsApp asking about services. AI responds instantly, checks availability, and books an appointment — all through chat.",
    messages: [
      { id: 1, speaker: "caller" as const, text: "Hi! I saw your page on Instagram. Do you offer teeth whitening services?", time: "3:42 PM", type: "speech" as const },
      { id: 2, speaker: "system" as const, text: "WhatsApp message received - Intent: Service inquiry", time: "3:42 PM", type: "action" as const },
      { id: 3, speaker: "ai" as const, text: "Hi there! Yes, we offer professional teeth whitening with amazing results. We have two options: in-office whitening (1 hour, $299) and take-home kits ($149). Would you like to book a consultation?", time: "3:42 PM", type: "speech" as const },
      { id: 4, speaker: "caller" as const, text: "The in-office one sounds great. Do you have anything available this week?", time: "3:43 PM", type: "speech" as const },
      { id: 5, speaker: "system" as const, text: "Checking calendar availability for this week...", time: "3:43 PM", type: "action" as const },
      { id: 6, speaker: "ai" as const, text: "I have openings on Thursday at 2:00 PM and Friday at 10:00 AM. Which works better for you?", time: "3:43 PM", type: "speech" as const },
      { id: 7, speaker: "caller" as const, text: "Friday at 10 works! My name is Jessica Torres.", time: "3:44 PM", type: "speech" as const },
      { id: 8, speaker: "system" as const, text: "Booking confirmed - Calendar updated, confirmation sent", time: "3:44 PM", type: "action" as const },
      { id: 9, speaker: "ai" as const, text: "You're all set, Jessica! Your in-office teeth whitening appointment is booked for Friday at 10:00 AM. I've sent you a confirmation with our address and pre-appointment instructions. See you then!", time: "3:44 PM", type: "speech" as const },
      { id: 10, speaker: "caller" as const, text: "Perfect, thank you so much!", time: "3:44 PM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "Message Received", status: "pending" as const },
      { id: 2, label: "Detect Intent", status: "pending" as const },
      { id: 3, label: "Service Info Sent", status: "pending" as const },
      { id: 4, label: "Check Availability", status: "pending" as const },
      { id: 5, label: "Book Appointment", status: "pending" as const },
      { id: 6, label: "Send Confirmation", status: "pending" as const },
    ],
    analysisData: [
      { label: "Channel", value: "WhatsApp", icon: MessageCircle },
      { label: "Intent Detected", value: "Service inquiry + Booking", icon: CheckCircle },
      { label: "Response Time", value: "< 1 second", icon: Clock },
      { label: "Appointment Booked", value: "Friday 10:00 AM", icon: Calendar },
      { label: "Lead Captured", value: "Jessica Torres", icon: Users },
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
