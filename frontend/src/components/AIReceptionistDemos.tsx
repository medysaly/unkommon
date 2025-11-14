import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Phone, Globe, Clock, Users, CheckCircle, AlertCircle, Calendar } from "lucide-react";

type CaseStudy = "routing" | "multilingual" | "afterhours";

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
  afterhours: {
    title: "After-Hours Handling",
    subtitle: "24/7 Emergency Response",
    description: "Customer calls at 11 PM with an urgent issue. AI assesses priority and escalates appropriately.",
    messages: [
      { id: 1, speaker: "ai" as const, text: "Thank you for calling Premier Plumbing. You've reached us after business hours. How may I assist you?", time: "11:03 PM", type: "speech" as const },
      { id: 2, speaker: "caller" as const, text: "Hi, I have a pipe that burst in my basement and water is flooding everywhere!", time: "11:03 PM", type: "speech" as const },
      { id: 3, speaker: "system" as const, text: "Urgency analysis: EMERGENCY - Water damage risk", time: "11:03 PM", type: "action" as const },
      { id: 4, speaker: "ai" as const, text: "I understand this is an emergency. First, do you know where your main water shutoff valve is located?", time: "11:03 PM", type: "speech" as const },
      { id: 5, speaker: "caller" as const, text: "Yes, I've already shut it off", time: "11:03 PM", type: "speech" as const },
      { id: 6, speaker: "ai" as const, text: "Excellent, that's the most important step. I'm contacting our on-call emergency technician right now. What's your address?", time: "11:04 PM", type: "speech" as const },
      { id: 7, speaker: "caller" as const, text: "742 Evergreen Terrace", time: "11:04 PM", type: "speech" as const },
      { id: 8, speaker: "system" as const, text: "Alert sent to on-call technician Mike Johnson - ETA 22 mins", time: "11:04 PM", type: "action" as const },
      { id: 9, speaker: "ai" as const, text: "I've dispatched Mike Johnson, our emergency technician. He's 22 minutes away and I've texted you his contact info and ETA. He'll call you in 2 minutes to confirm.", time: "11:04 PM", type: "speech" as const },
      { id: 10, speaker: "caller" as const, text: "Thank you so much!", time: "11:05 PM", type: "speech" as const },
    ],
    workflow: [
      { id: 1, label: "After-Hours Call", status: "pending" as const },
      { id: 2, label: "Assess Urgency", status: "pending" as const },
      { id: 3, label: "Emergency Protocol", status: "pending" as const },
      { id: 4, label: "Locate Address", status: "pending" as const },
      { id: 5, label: "Alert On-Call Tech", status: "pending" as const },
      { id: 6, label: "Send SMS Updates", status: "pending" as const },
    ],
    analysisData: [
      { label: "Call Time", value: "11:03 PM (After hours)", icon: Clock },
      { label: "Urgency Level", value: "EMERGENCY (9/10)", icon: AlertCircle },
      { label: "Issue Type", value: "Burst pipe flooding", icon: AlertCircle },
      { label: "Technician Alerted", value: "Mike Johnson", icon: Users },
      { label: "Response Time", value: "22 minutes ETA", icon: CheckCircle },
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
        <Button
          variant={selectedCase === "routing" ? "default" : "outline"}
          onClick={() => setSelectedCase("routing")}
          className={selectedCase === "routing" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-700"}
          data-testid="button-case-routing"
        >
          <Users className="w-4 h-4 mr-2" />
          Call Routing
        </Button>
        <Button
          variant={selectedCase === "multilingual" ? "default" : "outline"}
          onClick={() => setSelectedCase("multilingual")}
          className={selectedCase === "multilingual" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-700"}
          data-testid="button-case-multilingual"
        >
          <Globe className="w-4 h-4 mr-2" />
          Multi-Language
        </Button>
        <Button
          variant={selectedCase === "afterhours" ? "default" : "outline"}
          onClick={() => setSelectedCase("afterhours")}
          className={selectedCase === "afterhours" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-700"}
          data-testid="button-case-afterhours"
        >
          <Clock className="w-4 h-4 mr-2" />
          After-Hours
        </Button>
      </div>

      {/* Case Study Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{currentCase.title}</h3>
        <p className="text-blue-400 text-sm font-medium mb-2">{currentCase.subtitle}</p>
        <p className="text-gray-300">{currentCase.description}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Phone Call Interface */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            {/* Phone Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl p-4 flex items-center gap-3 -mx-6 -mt-6 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">AI Receptionist</div>
                <div className="text-blue-200 text-xs">Active Call</div>
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
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.speaker === "caller"
                          ? "bg-blue-600 text-white"
                          : message.speaker === "system"
                          ? "bg-slate-700 text-gray-300 italic"
                          : "bg-slate-600 text-white"
                      }`}
                    >
                      {message.speaker === "system" && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          System
                        </Badge>
                      )}
                      <p className="text-sm whitespace-pre-line" data-testid={`message-text-${message.id}`}>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1 text-right">{message.time}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-700">
              {!isPlaying ? (
                <Button
                  onClick={handlePlay}
                  variant="default"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  data-testid="button-play-demo"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentMessageIndex === -1 ? "Start Demo" : "Resume"}
                </Button>
              ) : (
                <Button
                  onClick={handlePause}
                  variant="outline"
                  className="flex-1"
                  data-testid="button-pause-demo"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-slate-700"
                data-testid={`button-reset-${selectedCase}`}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Workflow & Analysis */}
        <div className="space-y-6">
          {/* Workflow Visualization */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">AI Workflow</h4>
              <div className="space-y-3" data-testid="workflow-container">
                {workflow.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0.5 }}
                    animate={{ 
                      opacity: step.status === "pending" ? 0.5 : 1,
                      scale: step.status === "active" ? 1.02 : 1
                    }}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      step.status === "completed"
                        ? "bg-green-500/10 border border-green-500/20"
                        : step.status === "active"
                        ? "bg-blue-500/10 border border-blue-500/20"
                        : "bg-slate-900"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "active"
                        ? "bg-blue-500 animate-pulse"
                        : "bg-slate-700"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-medium ${
                      step.status === "pending" ? "text-gray-500" : "text-white"
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Analysis Data */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Call Analysis</h4>
              {currentMessageIndex >= 0 ? (
                <div className="space-y-3" data-testid="analysis-container">
                  {currentCase.analysisData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start justify-between gap-4 p-3 bg-slate-900 rounded-lg"
                      data-testid={`analysis-item-${index}`}
                    >
                      <div className="flex items-start gap-2">
                        {data.icon && <data.icon className="w-4 h-4 text-blue-400 mt-0.5" />}
                        <span className="text-sm text-gray-400" data-testid={`analysis-label-${index}`}>{data.label}</span>
                      </div>
                      <span className="text-sm text-white font-medium text-right" data-testid={`analysis-value-${index}`}>{data.value}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500 text-sm">
                    Call analysis will appear here as the demo runs
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
