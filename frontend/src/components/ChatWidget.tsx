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

  // Get API endpoint from environment or prop
  const API_URL =
    apiEndpoint || import.meta.env.VITE_API_URL || 'https://l243ksgsdl.execute-api.us-east-1.amazonaws.com/prod';

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
      // Call backend API
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationId: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to UI
      const assistantMessage: Message = {
        id: `assistant-${data.timestamp}`,
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setConversationId(data.conversationId);
    } catch (error) {
      console.error('Error sending message:', error);

      // Show error message to user
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content:
          "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at contact@unkommon.com or 718-500-1191.",
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
            className="fixed bottom-8 left-1/2 md:left-[38.7%] -translate-x-1/2 z-50 w-[340px] max-w-[90vw]"
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
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-6 z-50 w-[380px] sm:w-[420px] mb-6"
          >
            <Card className="flex flex-col h-[600px] backdrop-blur-2xl bg-slate-900/95 border border-slate-700/50 shadow-2xl overflow-hidden rounded-3xl">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-0 left-0 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>

              {/* Header */}
              <div className="relative flex items-center justify-between p-5 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30"
                    animate={{
                      boxShadow: ['0 0 20px rgba(255,255,255,0.3)', '0 0 30px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.3)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <MessageCircle className="h-6 w-6" />
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-lg">Business AI</h3>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <p className="text-xs text-blue-100 font-medium">Online • Ready to help</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="text-white hover:bg-white/20 text-xs font-semibold backdrop-blur-sm rounded-lg transition-all"
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
                    className="text-white hover:bg-white/20 p-2 backdrop-blur-sm rounded-lg transition-all"
                    aria-label="Close chat"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="relative flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-slate-800 to-slate-900" style={{ minHeight: 0 }}>
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
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white/20"
                        >
                          <MessageCircle className="h-4 w-4 text-white" />
                        </motion.div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 shadow-lg ${
                          message.role === 'user'
                            ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-blue-500/50'
                            : 'bg-slate-700/80 backdrop-blur-sm text-gray-100 shadow-black/50 border border-slate-600/50'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                        <p
                          className={`text-[10px] mt-1.5 ${
                            message.role === 'user' ? 'text-blue-200/80' : 'text-gray-400'
                          }`}
                        >
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
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-white/20">
                        <MessageCircle className="h-4 w-4 text-white" />
                      </div>
                      <div className="bg-slate-700/80 backdrop-blur-sm rounded-2xl px-5 py-3 flex items-center gap-3 shadow-lg border border-slate-600/50">
                        <div className="flex gap-1">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-400"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-indigo-400"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div
                            className="w-2 h-2 rounded-full bg-purple-400"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                        <span className="text-sm text-gray-300 font-medium">AI is typing</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="relative p-5 bg-gradient-to-t from-slate-900 via-slate-900 to-slate-800/50 border-t border-slate-700/50 backdrop-blur-sm">
                <div className="flex gap-3 items-end">
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
                      className="w-full bg-slate-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-slate-600/50 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 shadow-lg transition-all duration-200"
                    />
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="h-12 w-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 rounded-2xl shadow-lg shadow-blue-500/50 transition-all duration-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">Powered by AI • Responses may vary</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
