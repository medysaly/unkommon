import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CheckCheck, Play, Pause, RotateCcw, Calendar as CalendarIcon } from "lucide-react";

interface Message {
  id: number;
  sender: "customer" | "bot";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
}

interface WorkflowStep {
  id: number;
  label: string;
  status: "pending" | "active" | "completed";
}

const bookingScenario: Message[] = [
  { id: 1, sender: "customer", text: "Hi, I'd like to book an appointment", time: "10:23 AM", status: "read" },
  { id: 2, sender: "bot", text: "Hello! I'd be happy to help you schedule an appointment. What service are you looking for?", time: "10:23 AM", status: "read" },
  { id: 3, sender: "customer", text: "Haircut", time: "10:24 AM", status: "read" },
  { id: 4, sender: "bot", text: "Great! Let me check our availability. What day works best for you?", time: "10:24 AM", status: "read" },
  { id: 5, sender: "customer", text: "Next Thursday", time: "10:25 AM", status: "read" },
  { id: 6, sender: "bot", text: "Perfect! I have the following times available on Thursday, December 14th:\n\n• 10:00 AM\n• 2:00 PM\n• 4:30 PM\n\nWhich time works for you?", time: "10:25 AM", status: "read" },
  { id: 7, sender: "customer", text: "2:00 PM sounds good", time: "10:26 AM", status: "read" },
  { id: 8, sender: "bot", text: "Excellent! I just need your name and phone number to confirm the booking.", time: "10:26 AM", status: "read" },
  { id: 9, sender: "customer", text: "Sarah Johnson, 555-0123", time: "10:26 AM", status: "read" },
  { id: 10, sender: "bot", text: "✅ Appointment Confirmed!\n\nService: Haircut\nDate: Thursday, Dec 14\nTime: 2:00 PM\nCustomer: Sarah Johnson\n\nYou'll receive a reminder 24 hours before. See you then!", time: "10:27 AM", status: "read" },
];

const workflowSteps: WorkflowStep[] = [
  { id: 1, label: "Customer initiates booking", status: "pending" },
  { id: 2, label: "Identify service request", status: "pending" },
  { id: 3, label: "Check availability", status: "pending" },
  { id: 4, label: "Present time slots", status: "pending" },
  { id: 5, label: "Collect customer info", status: "pending" },
  { id: 6, label: "Confirm & book appointment", status: "pending" },
];

export default function WhatsAppDemo() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [workflow, setWorkflow] = useState<WorkflowStep[]>(workflowSteps);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    if (!isPlaying || currentMessageIndex >= bookingScenario.length) {
      if (currentMessageIndex >= bookingScenario.length) {
        setIsPlaying(false);
      }
      return;
    }

    const timer = setTimeout(() => {
      const nextMessage = bookingScenario[currentMessageIndex];
      setDisplayedMessages(prev => [...prev, nextMessage]);
      setCurrentMessageIndex(prev => prev + 1);

      updateWorkflow(currentMessageIndex + 1);
      updateCalendar(currentMessageIndex + 1);
    }, 1500);

    return () => clearTimeout(timer);
  }, [isPlaying, currentMessageIndex]);

  const updateWorkflow = (messageCount: number) => {
    const updatedWorkflow = workflowSteps.map(step => {
      if (messageCount >= 2 && step.id === 1) return { ...step, status: "completed" as const };
      if (messageCount >= 3 && step.id === 2) return { ...step, status: "completed" as const };
      if (messageCount >= 5 && step.id === 3) return { ...step, status: "completed" as const };
      if (messageCount >= 6 && step.id === 4) return { ...step, status: "completed" as const };
      if (messageCount >= 9 && step.id === 5) return { ...step, status: "completed" as const };
      if (messageCount >= 10 && step.id === 6) return { ...step, status: "completed" as const };
      
      if (messageCount === 1 && step.id === 1) return { ...step, status: "active" as const };
      if (messageCount === 2 && step.id === 2) return { ...step, status: "active" as const };
      if ((messageCount === 3 || messageCount === 4) && step.id === 3) return { ...step, status: "active" as const };
      if (messageCount === 5 && step.id === 4) return { ...step, status: "active" as const };
      if ((messageCount === 6 || messageCount === 7 || messageCount === 8) && step.id === 5) return { ...step, status: "active" as const };
      if (messageCount === 9 && step.id === 6) return { ...step, status: "active" as const };

      return step;
    });
    setWorkflow(updatedWorkflow);
  };

  const updateCalendar = (messageCount: number) => {
    if (messageCount >= 7) {
      setSelectedDate(14);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentMessageIndex(0);
    setDisplayedMessages([]);
    setWorkflow(workflowSteps);
    setSelectedDate(null);
  };

  const handleStart = () => {
    if (currentMessageIndex === 0) {
      setIsPlaying(true);
    }
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        <Button
          onClick={handleStart}
          disabled={isPlaying || currentMessageIndex > 0}
          className="bg-white hover:bg-zinc-100 text-black font-light disabled:opacity-50"
          data-testid="button-demo-start"
        >
          {currentMessageIndex === 0 ? "Start Demo" : "Demo In Progress"}
          <Play className="w-4 h-4 ml-2" />
        </Button>
        <Button
          onClick={handlePlayPause}
          disabled={currentMessageIndex === 0 || currentMessageIndex >= bookingScenario.length}
          variant="outline"
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-light disabled:opacity-50"
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
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-light"
          data-testid="button-demo-reset"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-0">
              <div className="bg-zinc-950 border-b border-zinc-700 p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black font-light">
                  AI
                </div>
                <div className="flex-1">
                  <h3 className="font-light text-white tracking-tight">Business Salon</h3>
                  <p className="text-xs text-zinc-400">Online</p>
                </div>
              </div>

              <div className="h-[500px] overflow-y-auto bg-zinc-950/60 p-6 space-y-3" data-testid="container-whatsapp-chat">
                <AnimatePresence>
                  {displayedMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                      data-testid={`message-${message.id}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-xl p-3 ${
                          message.sender === "customer"
                            ? "bg-white text-black"
                            : "bg-zinc-800 text-zinc-200 border border-zinc-700"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{message.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <span className="text-xs opacity-60">{message.time}</span>
                          {message.sender === "customer" && message.status === "read" && (
                            <CheckCheck className="w-4 h-4 opacity-60" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h3 className="font-light text-white tracking-tight mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                Automation Workflow
              </h3>
              <div className="space-y-3">
                {workflow.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                    data-testid={`workflow-step-${step.id}`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.status === "completed" ? "bg-white text-black" :
                      step.status === "active" ? "bg-white/80 text-black animate-pulse" :
                      "bg-zinc-800"
                    }`}>
                      {step.status === "completed" && (
                        <Check className="w-4 h-4" />
                      )}
                      {step.status === "active" && (
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm font-light ${
                        step.status === "pending" ? "text-zinc-500" : "text-white"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                    {step.status === "completed" && (
                      <Badge className="bg-white/10 text-white border-white/20 font-light">
                        Done
                      </Badge>
                    )}
                    {step.status === "active" && (
                      <Badge className="bg-white/10 text-white border-white/20 font-light">
                        Active
                      </Badge>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="p-6">
              <h3 className="font-light text-white tracking-tight mb-4 flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-white" />
                December 2024
              </h3>
              <div className="grid grid-cols-7 gap-2">
                <div className="text-center text-xs font-light text-zinc-400 py-2">Sun</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Mon</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Tue</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Wed</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Thu</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Fri</div>
                <div className="text-center text-xs font-light text-zinc-400 py-2">Sat</div>

                {daysInMonth.map((day) => (
                  <motion.div
                    key={day}
                    initial={{ scale: 1 }}
                    animate={selectedDate === day ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-light ${
                      selectedDate === day
                        ? "bg-white text-black ring-2 ring-white/50"
                        : "text-zinc-300 hover:bg-zinc-800"
                    }`}
                    data-testid={`calendar-day-${day}`}
                  >
                    {day}
                  </motion.div>
                ))}
              </div>
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-white/10 border border-white/20 rounded-lg"
                >
                  <p className="text-sm text-white font-light">
                    ✓ Appointment booked for December {selectedDate} at 2:00 PM
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
