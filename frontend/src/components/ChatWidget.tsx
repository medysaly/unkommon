import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Loader2, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ===== TYPES =====
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatWidgetProps {
  apiEndpoint?: string;
}

// ===== MAIN COMPONENT =====
export default function ChatWidget({ apiEndpoint }: ChatWidgetProps) {
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // For floating search bar
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get API endpoints from environment or prop
  const API_URL =
    apiEndpoint || import.meta.env.VITE_API_URL || 'https://pqg65kdk63.execute-api.us-east-1.amazonaws.com/Prod';

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Load conversation from localStorage on mount
  useEffect(() => {
    const savedConversationId = localStorage.getItem('chatbot_conversation_id');
    const savedMessages = localStorage.getItem('chatbot_messages');

    if (savedConversationId) {
      setConversationId(savedConversationId);
    }

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    } else {
      // Show welcome message if no conversation exists
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content:
          "👋 Hi! I'm the Unkommon AI assistant. How can I help you today?\n\nI can tell you about:\n• AI Receptionist\n• Speed-to-Lead\n• AI Booking System\n• Social Media Bot",
        timestamp: Date.now(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Save conversation to localStorage whenever it changes
  useEffect(() => {
    if (conversationId) {
      localStorage.setItem('chatbot_conversation_id', conversationId);
    }
    if (messages.length > 0) {
      localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }
  }, [conversationId, messages]);

  // Handle sending a message
  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    // Add user message to UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      const fullText = data.response;
      const assistantMsgId = `assistant-${data.timestamp}`;

      // Add empty message then stream text in word by word
      setMessages((prev) => [...prev, {
        id: assistantMsgId,
        role: 'assistant' as const,
        content: '',
        timestamp: data.timestamp,
      }]);
      setIsLoading(false);
      setConversationId(data.conversationId);

      // Simulate streaming — reveal text word by word
      const words = fullText.split(' ');
      let displayed = '';
      for (let i = 0; i < words.length; i++) {
        displayed += (i === 0 ? '' : ' ') + words[i];
        const current = displayed;
        setMessages((prev) =>
          prev.map((m) => m.id === assistantMsgId ? { ...m, content: current } : m)
        );
        await new Promise((r) => setTimeout(r, 30));
      }
    } catch (error) {
      console.error('Error sending message:', error);

      // Show error message to user
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at contact@unkommon.ai or (203) 680-9629.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear conversation (reset)
  const handleClear = () => {
    setMessages([]);
    setConversationId(null);
    localStorage.removeItem('chatbot_conversation_id');
    localStorage.removeItem('chatbot_messages');

    // Show welcome message again
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content:
        "👋 Hi! I'm the Unkommon AI assistant. How can I help you today?\n\nI can tell you about:\n• AI Receptionist\n• Speed-to-Lead\n• AI Booking System\n• Social Media Bot",
      timestamp: Date.now(),
    };
    setMessages([welcomeMessage]);
  };

  return (
    <>
      {/* Floating Search Bar - Bottom Center */}
      <AnimatePresence>
        {!isOpen && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-8 left-[12%] md:left-[38.7%] -translate-x-1/2 z-50 w-[340px] max-w-[90vw]"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.05 }}
              className="relative border border-white/35 rounded-full shadow-2xl"
              style={{
                background: 'rgba(0, 0, 0, 0.01)',
                backdropFilter: 'blur(1px) saturate(105%)',
                WebkitBackdropFilter: 'blur(1px) saturate(105%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2), inset 0 1px 2px 0 rgba(255, 255, 255, 0.25)'
              }}
            >
              <div className="relative flex items-center gap-2 px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputValue.trim()) {
                      setIsExpanded(true);
                      setIsOpen(true);
                      handleSend();
                    }
                  }}
                  className="flex-1 bg-transparent text-white placeholder-gray-200 text-sm focus:outline-none"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    if (inputValue.trim()) {
                      setIsExpanded(true);
                      setIsOpen(true);
                      handleSend();
                    }
                  }}
                  className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-all backdrop-blur-sm"
                  aria-label="Send message"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-white" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: '100%', scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-6 z-50 w-[380px] sm:w-[420px] mb-6"
          >
            {/* Subtle outer glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-white/5 via-white/3 to-white/5 rounded-[28px] blur-md opacity-40" />

            <Card
              className="relative flex flex-col h-[600px] overflow-hidden rounded-[26px] border border-white/10 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02))',
                backdropFilter: 'blur(40px) saturate(120%)',
                WebkitBackdropFilter: 'blur(40px) saturate(120%)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Subtle animated background gradient */}
              <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
                <motion.div
                  className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-white to-gray-400 rounded-full blur-3xl"
                  animate={{
                    x: [0, 20, 0],
                    y: [0, 15, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-400 to-white rounded-full blur-3xl"
                  animate={{
                    x: [0, -20, 0],
                    y: [0, -15, 0],
                    scale: [1, 1.08, 1]
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

              {/* Header with minimal glass effect */}
              <div
                className="relative flex items-center justify-between p-5 text-white border-b border-white/5"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                {/* Subtle top shine */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center border border-white/10 relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)'
                    }}
                  >
                    <MessageCircle className="h-5 w-5 text-white/90" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base tracking-tight text-white/95">Unkommon AI</h3>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-400/80"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-[10px] text-white/60 font-medium">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="text-white/70 hover:text-white/90 hover:bg-white/5 text-xs font-medium rounded-lg transition-all h-7 px-2"
                  >
                    Clear
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setIsExpanded(false), 300);
                    }}
                    className="text-white/70 hover:text-white/90 hover:bg-white/5 p-1.5 rounded-lg transition-all h-7 w-7"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="relative flex-1 overflow-y-auto p-5 space-y-4" style={{ minHeight: 0 }}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Avatar */}
                      {message.role === 'assistant' && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)'
                          }}
                        >
                          <MessageCircle className="h-3.5 w-3.5 text-white/70" />
                        </motion.div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-2.5 relative overflow-hidden group/message ${
                          message.role === 'user'
                            ? 'text-white border border-white/10'
                            : 'text-white/90 border border-white/5'
                        }`}
                        style={
                          message.role === 'user'
                            ? {
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                                backdropFilter: 'blur(20px) saturate(120%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
                              }
                            : {
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))',
                                backdropFilter: 'blur(20px) saturate(120%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
                              }
                        }
                      >
                        {/* Subtle shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover/message:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent" />
                        </div>

                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed relative z-10">{message.content}</p>
                        <p className="text-[10px] mt-1 relative z-10 text-white/40">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="flex gap-2">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border border-white/10"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))',
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)'
                        }}
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-white/70" />
                      </div>
                      <div
                        className="rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-white/5"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))',
                          backdropFilter: 'blur(20px) saturate(120%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(120%)',
                          boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
                        }}
                      >
                        <div className="flex gap-1">
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                          />
                          <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-white/60"
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                          />
                        </div>
                        <span className="text-xs text-white/60 font-medium">typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div
                className="relative p-4 border-t border-white/5"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02))',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)'
                }}
              >
                {/* Subtle top shine */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="flex gap-2 items-end">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="w-full text-white/90 placeholder-white/40 border border-white/10 rounded-xl px-4 py-2.5 focus:outline-none focus:border-white/20 disabled:opacity-50 transition-all duration-200 text-sm"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03))',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: '0 1px 4px 0 rgba(0, 0, 0, 0.1), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)'
                      }}
                    />
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isLoading}
                      className="h-10 w-10 rounded-xl transition-all duration-200 disabled:opacity-40 flex items-center justify-center border border-white/10 relative overflow-hidden group/send p-0"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.06))',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
                      }}
                    >
                      {/* Hover shine */}
                      <div className="absolute inset-0 opacity-0 group-hover/send:opacity-100 transition-opacity duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      </div>

                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white/80" />
                      ) : (
                        <Send className="h-4 w-4 text-white/80" />
                      )}
                    </Button>
                  </motion.div>
                </div>
                <p className="text-[10px] text-white/30 mt-2.5 text-center">Powered by AI</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
