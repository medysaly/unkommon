import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Vapi from "@vapi-ai/web";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Loader2,
  MessageSquare,
  CheckCircle,
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
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="border-b border-zinc-700 px-8 py-6">
          <h3 className="text-2xl font-light text-white tracking-tight">
            AI Voice Assistant
          </h3>
          <p className="text-sm text-zinc-500 mt-1">
            Experience real-time conversation with our AI receptionist
          </p>
        </div>

        <div className="p-8 md:p-12">
          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-zinc-900 border border-zinc-800 rounded-xl"
            >
              <p className="text-zinc-400 text-sm">{errorMessage}</p>
            </motion.div>
          )}

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Left: Call Controls */}
            <div className="flex flex-col items-center justify-center py-8">
              {/* Main Call Button */}
              <div className="relative mb-8">
                {isCallActive && volumeLevel > 0 && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/5"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                <button
                  onClick={isCallActive ? endCall : startCall}
                  disabled={isConnecting}
                  className={`
                    relative z-10 w-28 h-28 rounded-full
                    transition-all duration-300
                    flex items-center justify-center
                    ${isCallActive
                      ? 'bg-white hover:bg-zinc-100'
                      : 'bg-white hover:bg-zinc-100'
                    }
                    ${isConnecting ? 'opacity-60' : ''}
                    ${assistantSpeaking ? 'ring-4 ring-white/20' : ''}
                    disabled:opacity-40 disabled:cursor-not-allowed
                  `}
                >
                  {isConnecting ? (
                    <Loader2 className="w-12 h-12 animate-spin text-black" />
                  ) : isCallActive ? (
                    <PhoneOff className="w-12 h-12 text-black" />
                  ) : (
                    <Phone className="w-12 h-12 text-black" />
                  )}
                </button>
              </div>

              {/* Call Status */}
              <div className="text-center space-y-3">
                {isConnecting && (
                  <div className="text-sm text-zinc-400 font-light">
                    Connecting...
                  </div>
                )}
                {isCallActive && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 justify-center">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <span className="text-sm text-white font-light">Live</span>
                    </div>
                    <div className="text-2xl font-mono text-zinc-400 tracking-wider">
                      {formatDuration(callDuration)}
                    </div>
                  </div>
                )}
                {!isCallActive && !isConnecting && (
                  <div className="text-sm text-zinc-500 font-light">
                    Click to start call
                  </div>
                )}
              </div>

              {/* Secondary Controls */}
              {isCallActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <button
                    onClick={toggleMute}
                    className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full transition-colors text-sm text-zinc-300 flex items-center gap-2"
                  >
                    {isMuted ? (
                      <>
                        <MicOff className="w-4 h-4" />
                        <span>Unmute</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4" />
                        <span>Mute</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>

            {/* Right: Transcript */}
            <div className="flex flex-col h-[400px]">
              <div className="mb-4">
                <h4 className="text-sm font-light text-zinc-400 uppercase tracking-wider">
                  Transcript
                </h4>
              </div>

              <div className="flex-1 bg-zinc-950/60 border border-zinc-700/60 rounded-2xl p-6 overflow-y-auto">
                {transcript.length === 0 && !isCallActive ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <MessageSquare className="w-10 h-10 text-zinc-700 mx-auto" />
                      <p className="text-sm text-zinc-600 font-light">
                        Start a call to see the conversation
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transcript.map((msg, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-1"
                      >
                        <div className="flex items-center gap-2">
                          {msg.role === "assistant" && (
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                              <Phone className="w-3 h-3 text-zinc-400" />
                            </div>
                          )}
                          {msg.role === "user" && (
                            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                              <User className="w-3 h-3 text-zinc-400" />
                            </div>
                          )}
                          <span className="text-xs text-zinc-600 uppercase tracking-wider font-light">
                            {msg.role === "user" ? "You" : msg.role === "assistant" ? "AI" : "System"}
                          </span>
                        </div>
                        <p className={`text-sm leading-relaxed pl-7 ${
                          msg.role === "system"
                            ? "text-zinc-600 italic"
                            : "text-zinc-300"
                        }`}>
                          {msg.content}
                        </p>
                      </motion.div>
                    ))}

                    {assistantSpeaking && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-zinc-500 pl-7"
                      >
                        <div className="flex gap-1">
                          <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                        <span className="font-light">AI is responding...</span>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          {!isCallActive && !isConnecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-8 border-t border-zinc-700/60"
            >
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                    <Phone className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-xs text-zinc-500 font-light">
                    Click to connect with AI
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                    <MessageSquare className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-xs text-zinc-500 font-light">
                    Speak naturally about your needs
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-5 h-5 text-zinc-500" />
                  </div>
                  <p className="text-xs text-zinc-500 font-light">
                    Book appointments instantly
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
