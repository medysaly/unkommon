import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, MessageSquare, Database, Users, CheckCircle, Calendar, Zap, UserCheck } from "lucide-react";

type CaseStudy = "segmentation" | "outreach" | "booking";

interface SMSMessage {
  id: number;
  sender: "business" | "customer" | "system";
  text: string;
  time: string;
  type?: "message" | "action";
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
  segmentation: {
    title: "Smart Database Segmentation",
    subtitle: "AI-Powered Contact Analysis",
    description: "AI scans your dental practice management system to identify patients overdue for care and ready for reactivation.",
    messages: [
      { id: 1, sender: "system" as const, text: "Connecting to Dentrix patient database...", time: "9:00 AM", type: "action" as const },
      { id: 2, sender: "system" as const, text: "Scanning 2,847 patient records", time: "9:00 AM", type: "action" as const },
      { id: 3, sender: "system" as const, text: "Analyzing: Last visit dates, treatment plans, insurance status", time: "9:01 AM", type: "action" as const },
      { id: 4, sender: "system" as const, text: "Segment identified: \"Overdue 6+ months for cleaning\" - 342 patients", time: "9:01 AM", type: "action" as const },
      { id: 5, sender: "system" as const, text: "Segment identified: \"Incomplete treatment plans\" - 127 patients", time: "9:02 AM", type: "action" as const },
      { id: 6, sender: "system" as const, text: "Segment identified: \"Referred but never booked\" - 89 patients", time: "9:02 AM", type: "action" as const },
      { id: 7, sender: "system" as const, text: "Priority ranking complete: 558 reactivation candidates", time: "9:03 AM", type: "action" as const },
      { id: 8, sender: "system" as const, text: "Top 50 high-value patients ready for personalized outreach", time: "9:03 AM", type: "action" as const },
    ],
    workflow: [
      { id: 1, label: "Connect to CRM", status: "pending" as const },
      { id: 2, label: "Scan Records", status: "pending" as const },
      { id: 3, label: "Analyze Patterns", status: "pending" as const },
      { id: 4, label: "Create Segments", status: "pending" as const },
      { id: 5, label: "Rank by Value", status: "pending" as const },
      { id: 6, label: "Ready for Outreach", status: "pending" as const },
    ],
    analysisData: [
      { label: "Total Records Scanned", value: "2,847 patients", icon: Database },
      { label: "Overdue Patients Found", value: "558 (19.6%)", icon: Users },
      { label: "Incomplete Treatment Plans", value: "127 patients", icon: Zap },
      { label: "Est. Revenue Potential", value: "$47,200", icon: CheckCircle },
      { label: "Avg. Days Since Last Visit", value: "287 days", icon: Calendar },
    ]
  },
  outreach: {
    title: "Conversational SMS Outreach",
    subtitle: "Personalized Re-engagement",
    description: "AI sends natural, personalized texts—not generic blasts—to re-engage dormant customers.",
    messages: [
      { id: 1, sender: "system" as const, text: "Initiating personalized outreach to Sarah M. (Last cleaning: 8 months ago)", time: "10:15 AM", type: "action" as const },
      { id: 2, sender: "business" as const, text: "Hi Sarah, it's been 8 months since your last cleaning at Stamford Dental Spa. We have openings this week — reply YES to book or call us at (203) 555-0142.", time: "10:15 AM", type: "message" as const },
      { id: 3, sender: "customer" as const, text: "YES! I've been meaning to come in. What do you have this week?", time: "10:23 AM", type: "message" as const },
      { id: 4, sender: "system" as const, text: "Positive response detected - Engaging booking flow", time: "10:23 AM", type: "action" as const },
      { id: 5, sender: "business" as const, text: "Great to hear from you, Sarah! 😊 We have openings Thursday and Friday. Do mornings or afternoons work better?", time: "10:24 AM", type: "message" as const },
      { id: 6, sender: "customer" as const, text: "Afternoons are better for me, maybe Thursday or Friday?", time: "10:28 AM", type: "message" as const },
      { id: 7, sender: "business" as const, text: "Perfect! I have Thursday at 2:30 PM or Friday at 3:00 PM with Dr. Patel. Which works better?", time: "10:28 AM", type: "message" as const },
      { id: 8, sender: "customer" as const, text: "Thursday 2:30 works great!", time: "10:31 AM", type: "message" as const },
    ],
    workflow: [
      { id: 1, label: "Select Contact", status: "pending" as const },
      { id: 2, label: "Personalize Message", status: "pending" as const },
      { id: 3, label: "Send Initial Text", status: "pending" as const },
      { id: 4, label: "Analyze Response", status: "pending" as const },
      { id: 5, label: "Continue Conversation", status: "pending" as const },
      { id: 6, label: "Capture Intent", status: "pending" as const },
    ],
    analysisData: [
      { label: "Patient Status", value: "Overdue 8 months for cleaning", icon: Users },
      { label: "Response Time", value: "8 minutes", icon: Zap },
      { label: "Sentiment Detected", value: "Positive (92%)", icon: CheckCircle },
      { label: "Intent Identified", value: "Ready to book", icon: Calendar },
      { label: "Personalization Used", value: "Name, Doctor, History", icon: UserCheck },
    ]
  },
  booking: {
    title: "Autonomous Booking",
    subtitle: "Seamless Calendar Integration",
    description: "AI handles scheduling back-and-forth and books directly into your calendar system.",
    messages: [
      { id: 1, sender: "customer" as const, text: "Thursday 2:30 works great!", time: "10:31 AM", type: "message" as const },
      { id: 2, sender: "system" as const, text: "Checking calendar availability for Thursday 2:30 PM...", time: "10:31 AM", type: "action" as const },
      { id: 3, sender: "system" as const, text: "Slot available - Dr. Patel, Room 3", time: "10:31 AM", type: "action" as const },
      { id: 4, sender: "business" as const, text: "Awesome! You're booked for Thursday at 2:30 PM with Dr. Patel at Stamford Dental Spa, 789 Main St. See you then, Sarah!", time: "10:31 AM", type: "message" as const },
      { id: 5, sender: "system" as const, text: "Appointment created in Dentrix - ID: #APT-7823", time: "10:31 AM", type: "action" as const },
      { id: 6, sender: "customer" as const, text: "Thank you so much! Looking forward to it 😊", time: "10:33 AM", type: "message" as const },
      { id: 7, sender: "system" as const, text: "Confirmation SMS scheduled for Wednesday 10:00 AM", time: "10:33 AM", type: "action" as const },
      { id: 8, sender: "system" as const, text: "CRM updated: Sarah M. status changed to \"Active\"", time: "10:33 AM", type: "action" as const },
    ],
    workflow: [
      { id: 1, label: "Confirm Preference", status: "pending" as const },
      { id: 2, label: "Check Availability", status: "pending" as const },
      { id: 3, label: "Book Appointment", status: "pending" as const },
      { id: 4, label: "Confirm to Customer", status: "pending" as const },
      { id: 5, label: "Schedule Reminder", status: "pending" as const },
      { id: 6, label: "Update CRM Status", status: "pending" as const },
    ],
    analysisData: [
      { label: "Appointment Booked", value: "Thu 2:30 PM", icon: Calendar },
      { label: "Provider Assigned", value: "Dr. Patel", icon: UserCheck },
      { label: "Practice Management", value: "Dentrix", icon: Database },
      { label: "Reminder Scheduled", value: "24 hours before", icon: CheckCircle },
      { label: "Customer Status", value: "Reactivated ✓", icon: Zap },
    ]
  },
};

export default function ClientReactivatorDemo() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>("segmentation");
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
          onClick={() => setSelectedCase("segmentation")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "segmentation"
              ? "bg-foreground text-background"
              : "bg-card text-muted-foreground hover:bg-muted border border-border"
          }`}
          data-testid="button-case-segmentation"
        >
          <Database className="w-4 h-4 mr-2 inline" />
          Database Scan
        </button>
        <button
          onClick={() => setSelectedCase("outreach")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "outreach"
              ? "bg-foreground text-background"
              : "bg-card text-muted-foreground hover:bg-muted border border-border"
          }`}
          data-testid="button-case-outreach"
        >
          <MessageSquare className="w-4 h-4 mr-2 inline" />
          SMS Outreach
        </button>
        <button
          onClick={() => setSelectedCase("booking")}
          className={`px-6 py-3 rounded-full text-sm font-light transition-all ${
            selectedCase === "booking"
              ? "bg-foreground text-background"
              : "bg-card text-muted-foreground hover:bg-muted border border-border"
          }`}
          data-testid="button-case-booking"
        >
          <Calendar className="w-4 h-4 mr-2 inline" />
          Autonomous Booking
        </button>
      </div>

      {/* Case Study Header */}
      <div className="text-center">
        <h3 className="text-2xl font-light text-foreground mb-2 tracking-tight">{currentCase.title}</h3>
        <p className="text-muted-foreground/70 text-sm font-light mb-2">{currentCase.subtitle}</p>
        <p className="text-muted-foreground font-light">{currentCase.description}</p>
      </div>

      {/* Main Demo Area */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* SMS Interface */}
        <div className="bg-gradient-to-b from-muted/50 to-background border border-border rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6">
            {/* SMS Header */}
            <div className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <div className="text-foreground font-light">Client Reactivator AI</div>
                <div className="text-muted-foreground/70 text-xs font-light">
                  {selectedCase === "segmentation" ? "Database Analysis" : "SMS Conversation"}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-3 min-h-[400px] max-h-[500px] overflow-y-auto" data-testid="sms-messages-container">
              <AnimatePresence mode="popLayout">
                {visibleMessages.map((message) => (
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
                          ? "bg-foreground text-background"
                          : message.sender === "system"
                          ? "bg-muted text-muted-foreground italic border border-border"
                          : "bg-card text-foreground border border-border"
                      }`}
                    >
                      {message.sender === "system" && (
                        <div className="mb-2 text-xs text-muted-foreground/70 flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          AI Processing
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
            <div className="flex gap-2 mt-4 pt-4 border-t border-border">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="flex-1 bg-foreground hover:bg-foreground/90 text-background py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2"
                  data-testid="button-play-demo"
                >
                  <Play className="w-4 h-4" />
                  {currentMessageIndex === -1 ? "Start Demo" : "Resume"}
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex-1 bg-muted hover:bg-muted/80 text-muted-foreground py-3 px-4 rounded-full text-sm font-light transition-all flex items-center justify-center gap-2 border border-border"
                  data-testid="button-pause-demo"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              )}
              <button
                onClick={handleReset}
                className="bg-muted hover:bg-muted/80 text-muted-foreground py-3 px-4 rounded-full border border-border transition-all"
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
          <div className="bg-gradient-to-b from-muted/50 to-background border border-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <h4 className="text-lg font-light text-foreground mb-4 tracking-tight">AI Workflow</h4>
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
                        ? "bg-muted border border-border"
                        : step.status === "active"
                        ? "bg-muted border border-foreground/20"
                        : "bg-card border border-border"
                    }`}
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step.status === "completed"
                        ? "bg-foreground text-background"
                        : step.status === "active"
                        ? "bg-foreground/50 animate-pulse"
                        : "bg-muted"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-muted-foreground text-xs font-light">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm font-light ${
                      step.status === "pending" ? "text-muted-foreground/50" : "text-foreground"
                    }`}>
                      {step.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Analysis Data */}
          <div className="bg-gradient-to-b from-muted/50 to-background border border-border rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6">
              <h4 className="text-lg font-light text-foreground mb-4 tracking-tight">
                {selectedCase === "segmentation" ? "Database Analysis" : "Campaign Analysis"}
              </h4>
              {currentMessageIndex >= 0 ? (
                <div className="space-y-3" data-testid="analysis-container">
                  {currentCase.analysisData.map((data, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start justify-between gap-4 p-3 bg-card border border-border rounded-xl"
                      data-testid={`analysis-item-${index}`}
                    >
                      <div className="flex items-start gap-2">
                        {data.icon && <data.icon className="w-4 h-4 text-muted-foreground mt-0.5" />}
                        <span className="text-sm text-muted-foreground font-light" data-testid={`analysis-label-${index}`}>{data.label}</span>
                      </div>
                      <span className="text-sm text-foreground font-light text-right" data-testid={`analysis-value-${index}`}>{data.value}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground/50 text-sm font-light">
                    Analysis will appear here as the demo runs
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
