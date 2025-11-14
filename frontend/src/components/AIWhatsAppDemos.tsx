import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Camera, Mic, Globe, CheckCircle, AlertCircle, Package, MessageSquare } from "lucide-react";

type CaseStudy = "image" | "voice" | "translation";

interface Message {
  id: number;
  sender: "customer" | "ai";
  text: string;
  time: string;
  type?: "image" | "voice" | "text";
  imageUrl?: string;
  voiceDuration?: string;
  translatedFrom?: string;
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
  image: {
    title: "Image Analysis",
    subtitle: "AI Visual Assessment",
    description: "Customer sends damaged product photo. AI analyzes the image and offers instant solution.",
    messages: [
      { id: 1, sender: "customer" as const, text: "Hi, I received my order but the box is damaged", time: "2:14 PM", type: "text" as const },
      { id: 2, sender: "ai" as const, text: "I'm sorry to hear that! Can you please send me a photo of the damage?", time: "2:14 PM", type: "text" as const },
      { id: 3, sender: "customer" as const, text: "[Photo]", time: "2:15 PM", type: "image" as const, imageUrl: "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=400&h=400&fit=crop" },
      { id: 4, sender: "ai" as const, text: "Analyzing image...", time: "2:15 PM", type: "text" as const },
      { id: 5, sender: "ai" as const, text: "I can see the box has significant crushing damage on the top-right corner. I've assessed this as moderate shipping damage. Let me check if the product inside is affected.", time: "2:15 PM", type: "text" as const },
      { id: 6, sender: "customer" as const, text: "Yes, the laptop inside has a dent on the corner", time: "2:16 PM", type: "text" as const },
      { id: 7, sender: "ai" as const, text: "I understand your concern. Based on my analysis:\n\nDamage Level: Moderate-High\nProduct Affected: Yes\nClaim Approved: Automatically\n\nI'm immediately processing a full replacement. You'll receive:\n• New laptop shipped today\n• Prepaid return label via email\n• $50 credit for the inconvenience\n\nYour replacement tracking number: TRK-8472639", time: "2:16 PM", type: "text" as const },
      { id: 8, sender: "customer" as const, text: "Wow, that was fast! Thank you!", time: "2:17 PM", type: "text" as const },
    ],
    workflow: [
      { id: 1, label: "Image Received", status: "pending" as const },
      { id: 2, label: "AI Vision Analysis", status: "pending" as const },
      { id: 3, label: "Damage Assessment", status: "pending" as const },
      { id: 4, label: "Auto-Approve Claim", status: "pending" as const },
      { id: 5, label: "Process Replacement", status: "pending" as const },
      { id: 6, label: "Send Tracking", status: "pending" as const },
    ],
    analysisData: [
      { label: "Damage Detected", value: "Box crushing, corner impact", icon: AlertCircle },
      { label: "Severity Level", value: "Moderate-High (7.2/10)", icon: AlertCircle },
      { label: "Product Status", value: "Affected - Dent visible", icon: Package },
      { label: "Resolution Time", value: "2 minutes", icon: CheckCircle },
      { label: "Customer Sentiment", value: "Satisfied", icon: CheckCircle },
    ]
  },
  voice: {
    title: "Voice Message Processing",
    subtitle: "AI Audio Transcription",
    description: "Customer sends voice message. AI transcribes, understands intent, and responds intelligently.",
    messages: [
      { id: 1, sender: "customer" as const, text: "[Voice Message - 0:18]", time: "3:42 PM", type: "voice" as const, voiceDuration: "0:18" },
      { id: 2, sender: "ai" as const, text: "Transcribing voice message...", time: "3:42 PM", type: "text" as const },
      { id: 3, sender: "ai" as const, text: "Transcript: \"Hey, um, I'm trying to reset my password but I'm not getting the reset email. I've checked my spam folder and everything. Can you help? My email is sarah.johnson@email.com\"", time: "3:42 PM", type: "text" as const },
      { id: 4, sender: "ai" as const, text: "Hi Sarah! I heard your voice message and I'm here to help with the password reset issue. Let me check your account status...", time: "3:42 PM", type: "text" as const },
      { id: 5, sender: "ai" as const, text: "I found the issue! Your email was flagged by our system due to a typo in our records. I've corrected it and just sent a new password reset link to sarah.johnson@email.com. Can you check your inbox?", time: "3:43 PM", type: "text" as const },
      { id: 6, sender: "customer" as const, text: "Got it! Working now, thanks!", time: "3:44 PM", type: "text" as const },
      { id: 7, sender: "ai" as const, text: "Perfect! Your password should be reset now. Is there anything else I can help you with today?", time: "3:44 PM", type: "text" as const },
    ],
    workflow: [
      { id: 1, label: "Voice Msg Received", status: "pending" as const },
      { id: 2, label: "Audio Transcription", status: "pending" as const },
      { id: 3, label: "Intent Analysis", status: "pending" as const },
      { id: 4, label: "Account Lookup", status: "pending" as const },
      { id: 5, label: "Issue Identified", status: "pending" as const },
      { id: 6, label: "Auto-Resolve", status: "pending" as const },
    ],
    analysisData: [
      { label: "Audio Length", value: "18 seconds", icon: Mic },
      { label: "Transcription Time", value: "1.2 seconds", icon: CheckCircle },
      { label: "Intent Detected", value: "Password reset help", icon: CheckCircle },
      { label: "Issue Type", value: "Email typo in system", icon: AlertCircle },
      { label: "Resolution", value: "Auto-fixed & sent link", icon: CheckCircle },
    ]
  },
  translation: {
    title: "Language Translation",
    subtitle: "AI Multilingual Support",
    description: "Customer texts in Spanish. AI detects language, responds in Spanish while showing English to business.",
    messages: [
      { id: 1, sender: "customer" as const, text: "Hola, necesito cambiar mi cita del martes al jueves", time: "10:23 AM", type: "text" as const, translatedFrom: "es" },
      { id: 2, sender: "ai" as const, text: "Detected: Spanish - Auto-translating...", time: "10:23 AM", type: "text" as const },
      { id: 3, sender: "ai" as const, text: "¡Hola! Claro, con gusto te ayudo a cambiar tu cita. Déjame verificar la disponibilidad para el jueves...", time: "10:23 AM", type: "text" as const, translatedFrom: "es" },
      { id: 4, sender: "ai" as const, text: "Perfecto, tengo estos horarios disponibles el jueves:\n\n• 9:00 AM\n• 2:30 PM\n• 4:00 PM\n\n¿Cuál prefieres?", time: "10:23 AM", type: "text" as const, translatedFrom: "es" },
      { id: 5, sender: "customer" as const, text: "Las 2:30 PM está bien", time: "10:24 AM", type: "text" as const, translatedFrom: "es" },
      { id: 6, sender: "ai" as const, text: "¡Perfecto! He cambiado tu cita:\n\nJueves, 12 de Diciembre\n2:30 PM\n123 Main Street\n\nTe enviaré un recordatorio 24 horas antes. ¿Necesitas algo más?", time: "10:24 AM", type: "text" as const, translatedFrom: "es" },
      { id: 7, sender: "customer" as const, text: "No, eso es todo. ¡Gracias!", time: "10:25 AM", type: "text" as const, translatedFrom: "es" },
      { id: 8, sender: "ai" as const, text: "¡De nada! Nos vemos el jueves", time: "10:25 AM", type: "text" as const, translatedFrom: "es" },
    ],
    workflow: [
      { id: 1, label: "Message Received", status: "pending" as const },
      { id: 2, label: "Language Detection", status: "pending" as const },
      { id: 3, label: "Translate to English", status: "pending" as const },
      { id: 4, label: "Process Request", status: "pending" as const },
      { id: 5, label: "Generate Spanish Response", status: "pending" as const },
      { id: 6, label: "Send to Customer", status: "pending" as const },
    ],
    analysisData: [
      { label: "Language Detected", value: "Spanish (ES)", icon: Globe },
      { label: "Detection Time", value: "0.3 seconds", icon: CheckCircle },
      { label: "Translation Quality", value: "Native-level (98%)", icon: CheckCircle },
      { label: "Customer Language", value: "Spanish", icon: Globe },
      { label: "Business Sees", value: "English translation", icon: CheckCircle },
    ]
  },
};

export default function AIWhatsAppDemos() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>("image");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(-1);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(caseStudyData.image.workflow);

  const currentCase = caseStudyData[selectedCase];
  const visibleMessages = currentMessageIndex >= 0 ? currentCase.messages.slice(0, currentMessageIndex + 1) : [];

  useEffect(() => {
    setCurrentMessageIndex(-1);
    setWorkflow(caseStudyData[selectedCase].workflow.map(step => ({ ...step, status: "pending" })));
    setIsPlaying(false);
  }, [selectedCase]);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentMessageIndex < currentCase.messages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
        
        const messageProgress = (currentMessageIndex + 1) / currentCase.messages.length;
        const workflowIndex = Math.floor(messageProgress * workflow.length);
        
        setWorkflow(prev => prev.map((step, idx) => ({
          ...step,
          status: idx < workflowIndex ? "completed" : idx === workflowIndex ? "active" : "pending"
        })));
      }, selectedCase === "image" && currentMessageIndex === 2 ? 2000 : 
         selectedCase === "voice" && currentMessageIndex === 0 ? 2000 :
         selectedCase === "translation" && currentMessageIndex === 0 ? 1500 : 1800);

      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
      setWorkflow(prev => prev.map(step => ({ ...step, status: "completed" })));
    }
  }, [isPlaying, currentMessageIndex, currentCase.messages.length, workflow.length, selectedCase]);

  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentMessageIndex(-1);
    setWorkflow(caseStudyData[selectedCase].workflow.map(step => ({ ...step, status: "pending" })));
  };

  return (
    <div className="space-y-8">
      {/* Case Study Selector */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          variant={selectedCase === "image" ? "default" : "outline"}
          onClick={() => setSelectedCase("image")}
          className={selectedCase === "image" ? "bg-green-600 hover:bg-green-700" : ""}
          data-testid="button-case-image"
        >
          <Camera className="w-4 h-4 mr-2" />
          Image Analysis
        </Button>
        <Button
          variant={selectedCase === "voice" ? "default" : "outline"}
          onClick={() => setSelectedCase("voice")}
          className={selectedCase === "voice" ? "bg-green-600 hover:bg-green-700" : ""}
          data-testid="button-case-voice"
        >
          <Mic className="w-4 h-4 mr-2" />
          Voice Message
        </Button>
        <Button
          variant={selectedCase === "translation" ? "default" : "outline"}
          onClick={() => setSelectedCase("translation")}
          className={selectedCase === "translation" ? "bg-green-600 hover:bg-green-700" : ""}
          data-testid="button-case-translation"
        >
          <Globe className="w-4 h-4 mr-2" />
          Translation
        </Button>
      </div>

      {/* Case Study Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{currentCase.title}</h3>
        <p className="text-green-400 text-sm font-medium mb-2">{currentCase.subtitle}</p>
        <p className="text-gray-300">{currentCase.description}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* WhatsApp Chat Interface */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            {/* WhatsApp Header */}
            <div className="bg-[#075E54] rounded-t-2xl p-4 flex items-center gap-3 -mx-6 -mt-6 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">AI Assistant</div>
                <div className="text-green-200 text-xs">Online</div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto">
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] rounded-lg p-3 ${
                        message.sender === "customer"
                          ? "bg-[#DCF8C6]"
                          : "bg-white"
                      }`}
                    >
                      {message.type === "image" && message.imageUrl && (
                        <img
                          src={message.imageUrl}
                          alt="Customer upload"
                          className="rounded-lg mb-2 w-full"
                        />
                      )}
                      {message.type === "voice" && message.voiceDuration && (
                        <div className="flex items-center gap-2 bg-green-100 p-2 rounded-lg mb-2">
                          <Mic className="w-4 h-4 text-green-600" />
                          <div className="flex-1 h-8 bg-green-200 rounded-full relative overflow-hidden">
                            <motion.div
                              className="h-full bg-green-500"
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1.5 }}
                            />
                          </div>
                          <span className="text-xs text-green-700 font-medium">{message.voiceDuration}</span>
                        </div>
                      )}
                      {'translatedFrom' in message && message.translatedFrom && (
                        <Badge variant="secondary" className="mb-2 text-xs">
                          <Globe className="w-3 h-3 mr-1" />
                          Spanish
                        </Badge>
                      )}
                      <p className="text-sm text-gray-800 whitespace-pre-line">{message.text}</p>
                      <p className="text-xs text-gray-500 mt-1 text-right">{message.time}</p>
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
                  className="flex-1 bg-green-600 hover:bg-green-700"
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
                data-testid="button-reset-demo"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workflow & Analysis */}
        <div className="space-y-6">
          {/* Workflow Visualization */}
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <h4 className="text-lg font-semibold text-white mb-4">AI Workflow</h4>
              <div className="space-y-3">
                {workflow.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      step.status === "completed" ? "bg-green-500 border-green-500" :
                      step.status === "active" ? "bg-yellow-500 border-yellow-500 animate-pulse" :
                      "bg-slate-700 border-slate-600"
                    }`}>
                      {step.status === "completed" && <CheckCircle className="w-4 h-4 text-white" />}
                      {step.status === "active" && <div className="w-2 h-2 bg-white rounded-full" />}
                      {step.status === "pending" && <div className="w-2 h-2 bg-slate-500 rounded-full" />}
                    </div>
                    <span className={`text-sm ${
                      step.status === "completed" ? "text-green-400" :
                      step.status === "active" ? "text-yellow-400" :
                      "text-gray-500"
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
              <h4 className="text-lg font-semibold text-white mb-4">Analysis Data</h4>
              {currentMessageIndex >= 0 ? (
                <div className="space-y-3">
                  {currentCase.analysisData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start justify-between gap-4 p-3 bg-slate-900 rounded-lg"
                    >
                      <div className="flex items-start gap-2">
                        {data.icon && <data.icon className="w-4 h-4 text-green-400 mt-0.5" />}
                        <span className="text-sm text-gray-400">{data.label}</span>
                      </div>
                      <span className="text-sm text-white font-medium text-right">{data.value}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-gray-500 text-sm">
                    Analysis data will appear here as the demo runs
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Translation Note */}
      {selectedCase === "translation" && (
        <Card className="bg-blue-900/20 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-white font-semibold mb-2">How It Works</h4>
                <p className="text-blue-200 text-sm">
                  The customer sees and types in <strong>Spanish</strong>. Your business dashboard shows everything in <strong>English</strong>. The AI handles all translation in real-time, maintaining natural conversation flow in both languages.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
