import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  Bot, 
  User, 
  Calendar as CalendarIcon, 
  Clock,
  CheckCircle,
  Database,
  MessageSquare,
  ArrowRight
} from "lucide-react";

interface Message {
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface WorkflowStep {
  id: number;
  label: string;
  icon: any;
  active: boolean;
  completed: boolean;
}

interface Appointment {
  name: string;
  date: Date;
  time: string;
  service: string;
}

export default function InteractiveDemo() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your AI receptionist. How can I help you today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: 1, label: "Receive Message", icon: MessageSquare, active: false, completed: false },
    { id: 2, label: "Process Request", icon: Bot, active: false, completed: false },
    { id: 3, label: "Check Availability", icon: Database, active: false, completed: false },
    { id: 4, label: "Create Appointment", icon: CalendarIcon, active: false, completed: false },
    { id: 5, label: "Confirm Booking", icon: CheckCircle, active: false, completed: false },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { name: "John Doe", date: new Date(2025, 9, 25, 10, 0), time: "10:00 AM", service: "Consultation" },
    { name: "Jane Smith", date: new Date(2025, 9, 26, 14, 0), time: "2:00 PM", service: "Follow-up" },
  ]);
  const [conversationStep, setConversationStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const demoFlow = [
    { user: "I'd like to book an appointment", bot: "I'd be happy to help! What service are you interested in?" },
    { user: "General consultation", bot: "Great! What's your preferred date? I have availability this week." },
    { user: "Tomorrow at 3 PM", bot: "Perfect! May I have your name please?" },
    { user: "Sarah Johnson", bot: "Thank you, Sarah! Let me check availability and book that for you..." },
  ];

  const handleSend = (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    // Trigger workflow animation
    animateWorkflow();

    // Add bot response after delay
    setTimeout(() => {
      if (conversationStep < demoFlow.length) {
        const botMessage: Message = {
          role: "bot",
          content: demoFlow[conversationStep].bot,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setConversationStep(prev => prev + 1);

        // If final step, create appointment
        if (conversationStep === 3) {
          setTimeout(() => {
            const newAppointment: Appointment = {
              name: "Sarah Johnson",
              date: new Date(2025, 9, 27, 15, 0),
              time: "3:00 PM",
              service: "General Consultation"
            };
            setAppointments(prev => [...prev, newAppointment]);
            
            const confirmMessage: Message = {
              role: "bot",
              content: "✅ Appointment confirmed for tomorrow at 3:00 PM. You'll receive a confirmation email shortly!",
              timestamp: new Date()
            };
            setMessages(prev => [...prev, confirmMessage]);
          }, 2000);
        }
      }
    }, 1500);
  };

  const animateWorkflow = () => {
    workflowSteps.forEach((step, index) => {
      setTimeout(() => {
        setWorkflowSteps(prev => 
          prev.map((s, i) => 
            i === index 
              ? { ...s, active: true, completed: false }
              : i < index
              ? { ...s, active: false, completed: true }
              : s
          )
        );

        if (index === workflowSteps.length - 1) {
          setTimeout(() => {
            setWorkflowSteps(prev => 
              prev.map(s => ({ ...s, active: false, completed: true }))
            );
          }, 500);
        }
      }, index * 400);
    });
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Chatbot - Left */}
      <Card className="lg:col-span-1 bg-slate-800 border-slate-700" data-testid="card-chatbot">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="flex items-center gap-2 text-white">
            <Bot className="w-5 h-5 text-blue-400" />
            AI Receptionist Chat
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4" data-testid="chat-messages">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${index}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-400" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-gray-200"
                    }`}
                  >
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-8 h-8 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-gray-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Quick Actions */}
          {conversationStep < demoFlow.length && (
            <div className="p-4 border-t border-slate-700 space-y-2">
              <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
              <Button
                size="sm"
                variant="outline"
                className="w-full text-left justify-start border-slate-600 text-gray-300"
                onClick={() => handleQuickAction(demoFlow[conversationStep].user)}
                data-testid="button-quick-action"
              >
                {demoFlow[conversationStep].user}
              </Button>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-slate-700 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="bg-slate-700 border-slate-600 text-white"
              data-testid="input-chat"
            />
            <Button 
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700"
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Workflow - Middle */}
      <Card className="lg:col-span-1 bg-slate-800 border-slate-700" data-testid="card-workflow">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="text-white">Automation Workflow</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className="relative"
                initial={{ opacity: 0.5 }}
                animate={{ 
                  opacity: step.active || step.completed ? 1 : 0.5,
                  scale: step.active ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
                data-testid={`workflow-step-${index}`}
              >
                <div
                  className={`p-4 rounded-lg border-2 transition-all ${
                    step.active
                      ? "border-blue-500 bg-blue-500/10"
                      : step.completed
                      ? "border-green-500 bg-green-500/10"
                      : "border-slate-700 bg-slate-700/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        step.active
                          ? "bg-blue-500/20"
                          : step.completed
                          ? "bg-green-500/20"
                          : "bg-slate-600"
                      }`}
                    >
                      <step.icon
                        className={`w-5 h-5 ${
                          step.active
                            ? "text-blue-400"
                            : step.completed
                            ? "text-green-400"
                            : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{step.label}</p>
                    </div>
                    {step.completed && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                    {step.active && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full"
                      />
                    )}
                  </div>
                </div>

                {index < workflowSteps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowRight className="w-4 h-4 text-gray-500 rotate-90" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Calendar - Right */}
      <Card className="lg:col-span-1 bg-slate-800 border-slate-700" data-testid="card-calendar">
        <CardHeader className="border-b border-slate-700">
          <CardTitle className="flex items-center gap-2 text-white">
            <CalendarIcon className="w-5 h-5 text-green-400" />
            Appointment Calendar
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-slate-700"
            data-testid="calendar-widget"
          />

          {/* Appointments List */}
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-semibold text-white mb-3">Upcoming Appointments</h4>
            <AnimatePresence>
              {appointments.map((apt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-3 rounded-lg bg-slate-700 border border-slate-600"
                  data-testid={`appointment-${index}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-white">{apt.name}</p>
                      <p className="text-sm text-gray-400">{apt.service}</p>
                    </div>
                    <Badge variant="outline" className="border-green-500/50 text-green-300">
                      {apt.time}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    {apt.date.toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
