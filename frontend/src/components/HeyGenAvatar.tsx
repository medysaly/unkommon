import { useState, useEffect, useRef } from "react";
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
} from "@heygen/streaming-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, Video, VideoOff, Loader2 } from "lucide-react";

interface SessionData {
  session_id: string;
  [key: string]: any;
}

export default function HeyGenAvatar() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream>();
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);
  const conversationSessionId = useRef<string>("");

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
    // Reset conversation for fresh session
    conversationSessionId.current = "";
    
    try {
      const newToken = await fetchAccessToken();
      
      avatar.current = new StreamingAvatar({ token: newToken });
      
      // Set up event listeners
      avatar.current.on(StreamingEvents.AVATAR_START_TALKING, () => {
        console.log("Avatar started talking");
      });
      
      avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, () => {
        console.log("Avatar stopped talking");
      });
      
      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log("Stream disconnected");
        endSession();
      });
      
      avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
        console.log("Stream ready:", event.detail);
        setStream(event.detail);
      });

      // Listen for user speech during voice chat
      avatar.current.on("user_talking" as any, (event: any) => {
        console.log("User is talking");
      });

      avatar.current.on("user_stop_talking" as any, (event: any) => {
        console.log("User stopped talking");
      });

      // Process user speech text
      avatar.current.on("user_text" as any, async (event: any) => {
        const userText = event.detail.text;
        console.log("User said:", userText);
        
        if (!userText || userText.trim() === "") return;
        
        // Get current session ID from ref (always up to date)
        const currentSessionId = conversationSessionId.current;
        if (!currentSessionId) {
          console.error("No session ID available");
          setErrorMessage("Session error. Please restart the session.");
          return;
        }
        
        try {
          // Send to OpenAI for conversation with guaranteed session ID
          const response = await fetch("/api/heygen/conversation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userMessage: userText,
              sessionId: currentSessionId,
            }),
          });

          if (!response.ok) {
            throw new Error("Conversation request failed");
          }

          const data = await response.json();

          // Have avatar speak the AI response
          if (data.response && avatar.current) {
            await avatar.current.speak({
              text: data.response,
              taskType: TaskType.TALK,
              taskMode: TaskMode.SYNC,
            });
          }
        } catch (error) {
          console.error("Error processing user speech:", error);
          setErrorMessage("Failed to process your message. Please try speaking again.");
          // Clear error after 5 seconds
          setTimeout(() => setErrorMessage(""), 5000);
        }
      });

      // Start avatar session
      const sessionData: SessionData = await avatar.current.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: "Wayne_20240711", // Professional looking male avatar
        voice: {
          voiceId: "f38a635bee7a4d1f9b0a654a31d050d2", // Valid male English voice
          rate: 1.0,
          emotion: VoiceEmotion.FRIENDLY,
        },
        language: "en",
        disableIdleTimeout: false,
      });

      console.log("Session started:", sessionData);
      setIsSessionActive(true);
      
      // Store unique session ID for conversation tracking in ref (accessible in event handlers)
      const uniqueSessionId = sessionData.session_id || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      conversationSessionId.current = uniqueSessionId;
      console.log("Set conversation session ID:", uniqueSessionId);
      
      // Initial greeting
      await avatar.current.speak({
        text: "Hello! I'm your AI receptionist. I can help you book an appointment. Just let me know when you'd like to schedule a visit, and I'll take care of the rest!",
        taskType: TaskType.REPEAT,
        taskMode: TaskMode.SYNC,
      });
      
    } catch (error) {
      console.error("Error starting session:", error);
      setErrorMessage("Failed to start avatar session. Please try again.");
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function handleSpeak(text: string) {
    if (!avatar.current || !isSessionActive) {
      return;
    }
    
    setIsLoadingRepeat(true);
    try {
      await avatar.current.speak({
        text,
        taskType: TaskType.REPEAT,
        taskMode: TaskMode.SYNC,
      });
    } catch (error) {
      console.error("Error speaking:", error);
    } finally {
      setIsLoadingRepeat(false);
    }
  }

  async function startVoiceChat() {
    if (!avatar.current || !isSessionActive) return;
    
    try {
      await avatar.current.startVoiceChat();
      setIsVoiceChatActive(true);
    } catch (error) {
      console.error("Error starting voice chat:", error);
    }
  }

  async function closeVoiceChat() {
    if (!avatar.current || !isVoiceChatActive) return;
    
    try {
      await avatar.current.closeVoiceChat();
      setIsVoiceChatActive(false);
    } catch (error) {
      console.error("Error closing voice chat:", error);
    }
  }

  function toggleAudioMute() {
    if (!avatar.current || !isVoiceChatActive) return;
    
    if (isAudioMuted) {
      avatar.current.unmuteInputAudio();
    } else {
      avatar.current.muteInputAudio();
    }
    setIsAudioMuted(!isAudioMuted);
  }

  async function endSession() {
    if (!avatar.current) return;
    
    const sessionToEnd = conversationSessionId.current;
    
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
      
      // Clear local session ID
      conversationSessionId.current = "";
    } catch (error) {
      console.error("Error ending session:", error);
      setErrorMessage("Error ending session");
    }
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      endSession();
    };
  }, []);

  return (
    <Card className="bg-slate-800 border-slate-700" data-testid="card-heygen-avatar">
      <CardHeader className="border-b border-slate-700">
        <CardTitle className="flex items-center gap-2 text-white">
          <Video className="w-5 h-5 text-blue-400" />
          AI Receptionist Avatar
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Error Message */}
        {errorMessage && (
          <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg" data-testid="error-message">
            {errorMessage}
          </div>
        )}

        {/* Video Display */}
        <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
          {!stream ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {isLoadingSession ? (
                  <div className="space-y-3">
                    <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
                    <p className="text-gray-400">Starting avatar session...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <VideoOff className="w-16 h-16 text-gray-600 mx-auto" />
                    <p className="text-gray-400">Start a session to see your AI receptionist</p>
                  </div>
                )}
              </div>
            </div>
          ) : null}
          
          <video
            ref={mediaStream}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            data-testid="video-avatar-stream"
          >
            <track kind="captions" />
          </video>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-2">
          {!isSessionActive ? (
            <Button
              onClick={startSession}
              disabled={isLoadingSession}
              className="bg-blue-600 hover:bg-blue-700"
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
                  Start Session
                </>
              )}
            </Button>
          ) : (
            <>
              {!isVoiceChatActive ? (
                <Button
                  onClick={startVoiceChat}
                  className="bg-green-600 hover:bg-green-700"
                  data-testid="button-start-voice-chat"
                >
                  <Mic className="w-4 h-4 mr-2" />
                  Start Voice Chat
                </Button>
              ) : (
                <>
                  <Button
                    onClick={closeVoiceChat}
                    variant="destructive"
                    data-testid="button-stop-voice-chat"
                  >
                    <MicOff className="w-4 h-4 mr-2" />
                    Stop Voice Chat
                  </Button>
                  
                  <Button
                    onClick={toggleAudioMute}
                    variant="outline"
                    className="border-slate-600"
                    data-testid="button-toggle-mute"
                  >
                    {isAudioMuted ? (
                      <>
                        <MicOff className="w-4 h-4 mr-2" />
                        Unmute
                      </>
                    ) : (
                      <>
                        <Mic className="w-4 h-4 mr-2" />
                        Mute
                      </>
                    )}
                  </Button>
                </>
              )}
              
              <Button
                onClick={endSession}
                variant="outline"
                className="border-slate-600 text-white"
                data-testid="button-end-session"
              >
                <VideoOff className="w-4 h-4 mr-2" />
                End Session
              </Button>
            </>
          )}
        </div>

        {/* Quick Test Messages */}
        {isSessionActive && !isVoiceChatActive && (
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Quick test messages:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSpeak("I'd like to book an appointment for next Tuesday at 2 PM.")}
                disabled={isLoadingRepeat}
                className="border-slate-600 text-gray-300"
                data-testid="button-test-booking"
              >
                Book Appointment
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSpeak("What are your business hours?")}
                disabled={isLoadingRepeat}
                className="border-slate-600 text-gray-300"
                data-testid="button-test-hours"
              >
                Ask Hours
              </Button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-sm text-gray-400 bg-slate-900/50 rounded-lg p-3">
          <p className="font-semibold mb-2">How to use:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click "Start Session" to initialize the avatar</li>
            <li>Click "Start Voice Chat" to enable two-way conversation</li>
            <li>Speak naturally to book an appointment</li>
            <li>The avatar will guide you through the booking process</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
