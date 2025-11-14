import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Loader2,
  MessageSquare,
  CheckCircle,
  Clock,
  User
} from "lucide-react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export default function VapiDemo() {
  const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || 'c255164f-83e2-42ee-9fb6-570fcffe29d6';
  const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || 'b19322bc-441b-42b4-929b-89709ee9204a';

  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const vapiRef = useRef<Vapi | null>(null);
  const callStartTime = useRef<number>(0);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize Vapi
    vapiRef.current = new Vapi(VAPI_PUBLIC_KEY);

    // Set up event listeners
    vapiRef.current.on("call-start", () => {
      console.log("Call started");
      setIsCallActive(true);
      setIsConnecting(false);
      callStartTime.current = Date.now();

      // Start duration timer
      durationInterval.current = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000));
      }, 1000);
    });

    vapiRef.current.on("call-end", () => {
      console.log("Call ended");
      setIsCallActive(false);
      setIsConnecting(false);
      setAssistantSpeaking(false);

      // Clear duration timer
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
        durationInterval.current = null;
      }
    });

    vapiRef.current.on("speech-start", () => {
      console.log("Assistant started speaking");
      setAssistantSpeaking(true);
    });

    vapiRef.current.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setAssistantSpeaking(false);
    });

    vapiRef.current.on("volume-level", (level: number) => {
      setVolumeLevel(level);
    });

    vapiRef.current.on("message", (message: any) => {
      console.log("Message received:", message);

      // Add transcript messages
      if (message.type === "transcript" && message.transcript) {
        const newMessage: Message = {
          role: message.role || "assistant",
          content: message.transcript,
          timestamp: new Date()
        };
        setTranscript(prev => [...prev, newMessage]);
      }

      // Handle user speech
      if (message.type === "speech-update" && message.role === "user") {
        const userMessage: Message = {
          role: "user",
          content: message.transcript || "",
          timestamp: new Date()
        };
        setTranscript(prev => {
          // Replace last user message or add new one
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.role === "user") {
            return [...prev.slice(0, -1), userMessage];
          }
          return [...prev, userMessage];
        });
      }
    });

    vapiRef.current.on("error", (error: any) => {
      console.error("Vapi error:", error);
      setErrorMessage(error.message || "An error occurred");
      setIsConnecting(false);
      setIsCallActive(false);
    });

    // Cleanup
    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, [VAPI_PUBLIC_KEY]);

  const startCall = async () => {
    if (!vapiRef.current) return;

    setIsConnecting(true);
    setErrorMessage("");
    setTranscript([{
      role: "system",
      content: "Connecting to BA AI Receptionist...",
      timestamp: new Date()
    }]);

    try {
      await vapiRef.current.start(VAPI_ASSISTANT_ID);
    } catch (error: any) {
      console.error("Failed to start call:", error);
      setErrorMessage(error.message || "Failed to start call");
      setIsConnecting(false);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setCallDuration(0);
      setTranscript([]);
    }
  };

  const toggleMute = () => {
    if (vapiRef.current) {
      vapiRef.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-400" />
            Talk to BA AI Receptionist
          </CardTitle>
          <p className="text-sm text-gray-400">
            Click the button below to start a voice conversation with our AI receptionist
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <p className="text-red-400 text-sm">{errorMessage}</p>
            </motion.div>
          )}

          {/* Call Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Main Call Button */}
            <div className="relative">
              {isCallActive && volumeLevel > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-blue-500/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              )}

              <Button
                size="lg"
                onClick={isCallActive ? endCall : startCall}
                disabled={isConnecting}
                className={`
                  relative z-10 w-24 h-24 rounded-full text-white font-semibold transition-all
                  ${isCallActive
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                  }
                  ${assistantSpeaking ? 'ring-4 ring-blue-400/50' : ''}
                `}
              >
                {isConnecting ? (
                  <Loader2 className="w-10 h-10 animate-spin" />
                ) : isCallActive ? (
                  <PhoneOff className="w-10 h-10" />
                ) : (
                  <Phone className="w-10 h-10" />
                )}
              </Button>
            </div>

            {/* Call Status */}
            <div className="text-center">
              {isConnecting && (
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                  Connecting...
                </Badge>
              )}
              {isCallActive && (
                <div className="space-y-1">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2" />
                    Call Active
                  </Badge>
                  <p className="text-sm text-gray-400 flex items-center gap-1 justify-center">
                    <Clock className="w-3 h-3" />
                    {formatDuration(callDuration)}
                  </p>
                </div>
              )}
              {!isCallActive && !isConnecting && (
                <Badge variant="secondary" className="bg-slate-700 text-gray-400">
                  Ready to Call
                </Badge>
              )}
            </div>

            {/* Secondary Controls */}
            {isCallActive && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <Button
                  size="sm"
                  variant="outline"
                  onClick={toggleMute}
                  className="border-slate-600 hover:bg-slate-700"
                >
                  {isMuted ? (
                    <MicOff className="w-4 h-4 mr-2 text-red-400" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2 text-blue-400" />
                  )}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
              </motion.div>
            )}
          </div>

          {/* Transcript */}
          {transcript.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Conversation</h3>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4 max-h-64 overflow-y-auto space-y-3">
                {transcript.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-3 h-3 text-blue-400" />
                      </div>
                    )}

                    <div className={`
                      max-w-[80%] rounded-lg p-3 text-sm
                      ${msg.role === "user"
                        ? "bg-blue-600/20 text-blue-100"
                        : msg.role === "system"
                        ? "bg-slate-700/50 text-gray-400 text-center italic"
                        : "bg-slate-700/50 text-gray-200"
                      }
                    `}>
                      {msg.content}
                    </div>

                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-green-400" />
                      </div>
                    )}
                  </motion.div>
                ))}

                {assistantSpeaking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 items-center text-sm text-gray-400"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    BA AI is speaking...
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Instructions */}
          {!isCallActive && !isConnecting && (
            <div className="bg-slate-900/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                How it works:
              </h4>
              <ul className="text-sm text-gray-400 space-y-1 ml-6 list-disc">
                <li>Click the phone button to start talking</li>
                <li>Speak naturally - the AI will listen and respond</li>
                <li>You can ask about our services or book an appointment</li>
                <li>Click the red button to end the call anytime</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
