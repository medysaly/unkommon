import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  User, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Loader2,
  MessageSquare,
  Database,
  Calendar as CalendarIcon,
  CheckCircle,
  ArrowRight,
  Send,
  RotateCcw,
  Clock
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

interface TimeSlot {
  time: string;
  hour: number;
  available: boolean;
}

interface SessionData {
  session_id: string;
  [key: string]: any;
}

export default function LiveDemo() {
  // Avatar state
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const conversationSessionId = useRef<string>("");
  const recognition = useRef<any>(null);

  // Demo state
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "Hello! I'm your AI receptionist. How can I help you today?", timestamp: new Date() }
  ]);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    { id: 1, label: "Receive Message", icon: MessageSquare, active: false, completed: false },
    { id: 2, label: "Process Request", icon: Bot, active: false, completed: false },
    { id: 3, label: "Check Availability", icon: Database, active: false, completed: false },
    { id: 4, label: "Create Appointment", icon: CalendarIcon, active: false, completed: false },
    { id: 5, label: "Confirm Booking", icon: CheckCircle, active: false, completed: false },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    { name: "Mike Johnson", date: new Date(2025, 10, 7, 9, 0), time: "9:00 AM", service: "Consultation" },
    { name: "Emily Davis", date: new Date(2025, 10, 7, 14, 0), time: "2:00 PM", service: "Consultation" },
    { name: "Robert Brown", date: new Date(2025, 10, 10, 11, 0), time: "11:00 AM", service: "Follow-up" },
    { name: "Lisa Wilson", date: new Date(2025, 10, 12, 10, 0), time: "10:00 AM", service: "Consultation" },
  ]);
  const [calendarView, setCalendarView] = useState<'month' | 'day'>('month');
  const [dayViewDate, setDayViewDate] = useState<Date | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<{ date: Date; time: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [textInput, setTextInput] = useState<string>("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Helper function to check if a date has appointments
  const hasAppointments = (date: Date): boolean => {
    return appointments.some(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  };

  // Helper function to get time slots for a date
  const getTimeSlotsForDate = (date: Date): TimeSlot[] => {
    const slots: TimeSlot[] = [
      { time: "9:00 AM", hour: 9, available: true },
      { time: "10:00 AM", hour: 10, available: true },
      { time: "11:00 AM", hour: 11, available: true },
      { time: "1:00 PM", hour: 13, available: true },
      { time: "2:00 PM", hour: 14, available: true },
      { time: "3:00 PM", hour: 15, available: true },
      { time: "4:00 PM", hour: 16, available: true },
    ];

    // Mark slots as unavailable if there's an appointment
    const dateStr = date.toDateString();
    appointments.forEach(apt => {
      if (apt.date.toDateString() === dateStr) {
        const slot = slots.find(s => s.time === apt.time);
        if (slot) slot.available = false;
      }
    });

    return slots;
  };

  // Helper function to parse date strings
  function parseDateString(dateStr: string): Date | null {
    try {
      // Handle YYYY-MM-DD format
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
      }
      
      // Handle descriptive dates like "next Tuesday"
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  // Workflow animation function
  function animateWorkflow(numSteps: number) {
    for (let index = 0; index < numSteps; index++) {
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

        if (index === numSteps - 1) {
          setTimeout(() => {
            setWorkflowSteps(prev => 
              prev.map((s, i) => 
                i < numSteps
                  ? { ...s, active: false, completed: true }
                  : s
              )
            );
          }, 500);
        }
      }, index * 400);
    }
  }

  // Avatar functions
  async function fetchAccessToken() {
    try {
      const response = await fetch("/api/heygen/token", {
        method: "POST",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch access token");
      }
      
      const data = await response.json();
      return data.data.token;
    } catch (error) {
      console.error("Error fetching access token:", error);
      throw error;
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    setErrorMessage("");
    conversationSessionId.current = "";
    
    try {
      const newToken = await fetchAccessToken();
      
      avatar.current = new StreamingAvatar({ token: newToken });
      
      // Set up event listeners
      avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
        console.log("Stream ready:", event.detail);
        setStream(event.detail);
      });

      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
        endSession();
      });

      // Start avatar session (NO HeyGen voice chat - we use our own Web Speech API)
      const sessionData: SessionData = await avatar.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: "Wayne_20240711",
        voice: {
          voiceId: "f38a635bee7a4d1f9b0a654a31d050d2",
          rate: 0.85,
          emotion: VoiceEmotion.SOOTHING,
        },
        language: "en",
        disableIdleTimeout: false,
      });

      console.log("Session started:", sessionData);
      setIsSessionActive(true);
      
      const uniqueSessionId = sessionData.session_id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      conversationSessionId.current = uniqueSessionId;
      console.log("Set conversation session ID:", uniqueSessionId);
      
      // Initial greeting - add to chat transcript
      const greeting = "Hello! I'm your AI receptionist. I can help you book an appointment. What name should I put down for the appointment?";
      
      const greetingMessage: Message = {
        role: "bot",
        content: greeting,
        timestamp: new Date()
      };
      setMessages([greetingMessage]);
      
      await avatar.current.speak({
        text: greeting,
        taskType: TaskType.REPEAT, // REPEAT = just speak our text, don't process through HeyGen
        taskMode: TaskMode.SYNC,
      });
      
    } catch (error) {
      console.error("Error starting session:", error);
      setErrorMessage("Failed to start avatar session. Please try again.");
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function toggleVoiceChat() {
    if (!isSessionActive) return;
    
    try {
      if (isVoiceChatActive) {
        // Stop our custom speech recognition
        if (recognition.current) {
          recognition.current.stop();
        }
        setIsVoiceChatActive(false);
      } else {
        // Start our custom speech recognition (Web Speech API)
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
          setErrorMessage("Speech recognition not supported in this browser. Please use Chrome, Edge, or Safari.");
          return;
        }
        
        recognition.current = new SpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = false;
        recognition.current.lang = 'en-US';
        
        recognition.current.onresult = async (event: any) => {
          const transcript = event.results[event.results.length - 1][0].transcript;
          console.log("User said (via speech):", transcript);
          
          // Send through our backend (same as text input)
          await processUserMessage(transcript);
        };
        
        recognition.current.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          if (event.error !== 'no-speech') {
            setErrorMessage(`Speech recognition error: ${event.error}`);
          }
        };
        
        recognition.current.onend = () => {
          // Restart if still active
          if (isVoiceChatActive && recognition.current) {
            recognition.current.start();
          }
        };
        
        recognition.current.start();
        setIsVoiceChatActive(true);
      }
    } catch (error) {
      console.error("Error toggling voice chat:", error);
      setErrorMessage("Failed to start voice recognition");
    }
  }

  async function endSession() {
    if (!avatar.current) return;
    
    const sessionToEnd = conversationSessionId.current;
    
    // Stop our custom speech recognition if active
    if (recognition.current) {
      recognition.current.stop();
      recognition.current = null;
    }
    
    try {
      await avatar.current.stopAvatar();
      setIsSessionActive(false);
      setIsVoiceChatActive(false);
      setStream(undefined);
      setErrorMessage("");
      
      // Clear conversation history on backend
      if (sessionToEnd) {
        try {
          await fetch("/api/heygen/conversation/clear", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ sessionId: sessionToEnd }),
          });
        } catch (clearError) {
          console.error("Error clearing conversation history:", clearError);
        }
      }
      
      conversationSessionId.current = "";
    } catch (error) {
      console.error("Error ending session:", error);
      setErrorMessage("Error ending session");
    }
  }

  // Process user message (from voice or text)
  async function processUserMessage(userText: string) {
    if (!userText.trim()) return;
    
    setIsSendingMessage(true);
    setErrorMessage("");
    
    try {
      // Add user message to chat
      const userMessage: Message = {
        role: "user",
        content: userText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Get or create session ID
      let sessionId = conversationSessionId.current;
      if (!sessionId || sessionId === "") {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        conversationSessionId.current = sessionId;
        console.log("Created conversation session ID:", sessionId);
      }
      
      // Send to backend
      const response = await fetch("/api/heygen/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: userText,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error("Conversation request failed");
      }

      const data = await response.json();

      // Add bot response to chat
      if (data.response) {
        const botMessage: Message = {
          role: "bot",
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);

        // Trigger progressive workflow animations based on conversation content
        const lowerText = userText.toLowerCase();
        const lowerResponse = data.response.toLowerCase();
        
        // Always animate first two steps (receive + process)
        animateWorkflow(2);
        
        // Step 3: Check availability - if date/time mentioned
        if (lowerText.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|next|am|pm|\d+\s*am|\d+\s*pm)\b/) ||
            lowerResponse.match(/\b(available|schedule|time slot|appointment)\b/)) {
          setTimeout(() => animateWorkflow(3), 600);
          
          // Try to parse date and switch calendar to day view
          const dateMatch = lowerText.match(/\b(monday|tuesday|wednesday|thursday|friday|saturday|sunday|tomorrow|next\s+\w+|november\s+\d+|december\s+\d+)\b/);
          if (dateMatch) {
            const requestedDate = parseDateString(dateMatch[0]);
            if (requestedDate) {
              setDayViewDate(requestedDate);
              setCalendarView('day');
            }
          }
        }

        // Process booking if created
        if (data.bookingCreated && data.bookingDetails) {
          const booking = data.bookingDetails;
          console.log("Booking created:", booking);
          
          // Trigger full workflow animation
          animateWorkflow(5);
          
          // Parse date and time
          const appointmentDate = parseDateString(booking.appointmentDate);
          const appointmentTime = booking.appointmentTime || "Not specified";
          
          if (appointmentDate) {
            // Add appointment to list
            const newAppointment: Appointment = {
              name: booking.customerName,
              date: appointmentDate,
              time: appointmentTime,
              service: booking.reason || "Consultation"
            };
            setAppointments(prev => [...prev, newAppointment]);
            
            // Update calendar
            setConfirmedBooking({ date: appointmentDate, time: appointmentTime });
            setTimeout(() => {
              setCalendarView('month');
            }, 1500);
          }
        }

        // Have avatar speak our backend response (using REPEAT so it doesn't process through HeyGen's LLM)
        if (avatar.current && isSessionActive) {
          try {
            await avatar.current.speak({
              text: data.response,
              taskType: TaskType.REPEAT, // REPEAT = just speak our text, don't process it
              taskMode: TaskMode.SYNC,
            });
          } catch (speakError) {
            console.error("Error making avatar speak:", speakError);
            // Continue even if avatar can't speak
          }
        }
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setErrorMessage("Failed to process your message. Please try again.");
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSendingMessage(false);
    }
  }

  // Handle text message submission
  async function sendTextMessage(e?: React.FormEvent) {
    e?.preventDefault();
    
    if (!textInput.trim() || isSendingMessage) return;
    
    const userText = textInput.trim();
    setTextInput("");
    
    await processUserMessage(userText);
  }

  // Effect to update video stream
  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    } else if (!stream && mediaStream.current) {
      // Clear video when stream ends
      mediaStream.current.srcObject = null;
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (avatar.current) {
        endSession();
      }
    };
  }, []);

  function handleReset() {
    // Reset chat messages
    setMessages([
      { role: "bot", content: "Hello! I'm your AI receptionist. How can I help you today?", timestamp: new Date() }
    ]);
    
    // Reset workflow steps
    setWorkflowSteps([
      { id: 1, label: "Receive Message", icon: MessageSquare, active: false, completed: false },
      { id: 2, label: "Process Request", icon: Bot, active: false, completed: false },
      { id: 3, label: "Check Availability", icon: Database, active: false, completed: false },
      { id: 4, label: "Create Appointment", icon: CalendarIcon, active: false, completed: false },
      { id: 5, label: "Confirm Booking", icon: CheckCircle, active: false, completed: false },
    ]);
    
    // Reset calendar
    setCalendarView('month');
    setDayViewDate(null);
    setConfirmedBooking(null);
    
    // Reset appointments (keep pre-populated ones only)
    setAppointments([
      { name: "Mike Johnson", date: new Date(2025, 10, 7, 9, 0), time: "9:00 AM", service: "Consultation" },
      { name: "Emily Davis", date: new Date(2025, 10, 7, 14, 0), time: "2:00 PM", service: "Consultation" },
      { name: "Robert Brown", date: new Date(2025, 10, 10, 11, 0), time: "11:00 AM", service: "Follow-up" },
      { name: "Lisa Wilson", date: new Date(2025, 10, 12, 10, 0), time: "10:00 AM", service: "Consultation" },
    ]);
    
    // End avatar session if active
    if (isSessionActive) {
      endSession();
    }
  }

  return (
    <div className="flex gap-6 min-h-[800px]">
      {/* Left Column - Avatar & Chat (40%) */}
      <div className="w-2/5 flex flex-col gap-4">
        {/* Avatar Video */}
        <Card className="bg-slate-800 border-slate-700 flex-shrink-0" data-testid="card-avatar">
          <CardHeader className="border-b border-slate-700 pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Video className="w-5 h-5 text-green-400" />
              Live AI Receptionist
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative bg-black aspect-video">
              <video
                ref={mediaStream}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
                data-testid="avatar-video"
              >
                <track kind="captions" />
              </video>
              
              {!isSessionActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Button
                    onClick={startSession}
                    disabled={isLoadingSession}
                    className="bg-green-600 hover:bg-green-700"
                    data-testid="button-start-session"
                  >
                    {isLoadingSession ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Starting...
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4 mr-2" />
                        Start Avatar Demo
                      </>
                    )}
                  </Button>
                </div>
              )}
              
              {isSessionActive && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  <Button
                    size="sm"
                    variant={isVoiceChatActive ? "default" : "outline"}
                    onClick={toggleVoiceChat}
                    className="bg-blue-600 hover:bg-blue-700"
                    data-testid="button-toggle-voice"
                  >
                    {isVoiceChatActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={endSession}
                    className="bg-red-600 hover:bg-red-700 text-white"
                    data-testid="button-end-session"
                  >
                    <VideoOff className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chat Transcript */}
        <Card className="bg-slate-800 border-slate-700 flex-1 flex flex-col" data-testid="card-chat-transcript">
          <CardHeader className="border-b border-slate-700 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-white text-base">
                <Bot className="w-5 h-5 text-blue-400" />
                Conversation
              </CardTitle>
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                className="border-slate-600 text-gray-300 h-8"
                data-testid="button-reset-demo"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chat-messages">
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
                      <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-blue-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-gray-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-gray-500/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Error Message */}
            {errorMessage && (
              <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/30">
                <p className="text-sm text-red-400" data-testid="text-error-message">{errorMessage}</p>
              </div>
            )}
            
            {/* Text Input */}
            <div className="border-t border-slate-700 p-3">
              <form onSubmit={sendTextMessage} className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type a message to the AI receptionist..."
                  className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  disabled={isSendingMessage}
                  data-testid="input-text-message"
                />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!textInput.trim() || isSendingMessage}
                  className="bg-blue-600 hover:bg-blue-700"
                  data-testid="button-send-message"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Workflow & Calendar (60%) */}
      <div className="w-3/5 flex flex-col gap-4">
        {/* Workflow */}
        <Card className="bg-slate-800 border-slate-700 flex-1" data-testid="card-workflow">
          <CardHeader className="border-b border-slate-700 py-3">
            <CardTitle className="text-white text-base">Automation Workflow</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative"
                  initial={{ opacity: 0.5 }}
                  animate={{
                    opacity: step.active || step.completed ? 1 : 0.5,
                  }}
                >
                  <div
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      step.active
                        ? "bg-blue-500/10 border border-blue-500/30"
                        : step.completed
                        ? "bg-green-500/10 border border-green-500/30"
                        : "bg-slate-700/30 border border-slate-600"
                    }`}
                    data-testid={`workflow-step-${index}`}
                  >
                    <div className="flex-shrink-0">
                      <step.icon
                        className={`w-5 h-5 ${
                          step.active
                            ? "text-blue-400"
                            : step.completed
                            ? "text-green-400"
                            : "text-gray-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{step.label}</p>
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

                  {index < workflowSteps.length - 1 && (
                    <div className="flex justify-center py-1">
                      <ArrowRight className="w-4 h-4 text-gray-500 rotate-90" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="bg-slate-800 border-slate-700 flex-1" data-testid="card-calendar">
          <CardHeader className="border-b border-slate-700 py-3">
            <CardTitle className="flex items-center gap-2 text-white text-base">
              <CalendarIcon className="w-5 h-5 text-green-400" />
              Appointment Calendar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <AnimatePresence mode="wait">
              {calendarView === 'month' ? (
                <motion.div
                  key="month-view"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-slate-700"
                    data-testid="calendar-widget"
                    modifiers={{
                      booked: (date) => hasAppointments(date),
                      confirmed: (date) => confirmedBooking ? date.toDateString() === confirmedBooking.date.toDateString() : false,
                    }}
                    modifiersStyles={{
                      booked: { 
                        fontWeight: 'bold',
                        position: 'relative',
                      },
                    }}
                    modifiersClassNames={{
                      booked: 'relative after:content-[""] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-400 after:rounded-full',
                      confirmed: 'bg-green-500/20 border-green-500',
                    }}
                  />
                  {confirmedBooking && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center mt-2 text-xs text-green-400"
                    >
                      {confirmedBooking.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {confirmedBooking.time}
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="day-view"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="text-center border-b border-slate-700 pb-2">
                    <h3 className="text-base font-semibold text-white">
                      {dayViewDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">Available Time Slots</p>
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {dayViewDate && getTimeSlotsForDate(dayViewDate).map((slot, index) => (
                      <motion.div
                        key={slot.time}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-2 rounded-lg border-2 flex items-center justify-between ${
                          slot.available
                            ? "border-slate-600 bg-slate-700/50"
                            : "border-red-500/50 bg-red-500/10"
                        }`}
                        data-testid={`timeslot-${index}`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${slot.available ? 'text-green-400' : 'text-red-400'}`} />
                          <span className={`font-medium text-sm ${slot.available ? 'text-white' : 'text-gray-400'}`}>
                            {slot.time}
                          </span>
                        </div>
                        {slot.available ? (
                          <Badge variant="outline" className="border-green-500/50 text-green-300 text-xs">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-500/50 text-red-300 text-xs">
                            Booked
                          </Badge>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
