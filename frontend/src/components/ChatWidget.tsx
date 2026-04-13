import { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Send, Loader2, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ChatWidgetProps {
  apiEndpoint?: string;
}

export default function ChatWidget({ apiEndpoint }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const API_URL = apiEndpoint || import.meta.env.VITE_API_URL;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  // Load persisted state
  useEffect(() => {
    const savedConversationId = localStorage.getItem('chatbot_conversation_id');
    const savedMessages = localStorage.getItem('chatbot_messages');

    if (savedConversationId) setConversationId(savedConversationId);

    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to parse saved messages', e);
      }
    } else {
      setMessages([createWelcomeMessage()]);
    }
  }, []);

  // Debounced localStorage persistence
  useEffect(() => {
    if (conversationId) localStorage.setItem('chatbot_conversation_id', conversationId);
    if (messages.length > 0) {
      clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem('chatbot_messages', JSON.stringify(messages));
      }, 1000);
    }
    return () => clearTimeout(saveTimeoutRef.current);
  }, [conversationId, messages]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setTimeout(() => setIsExpanded(false), 300);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const createWelcomeMessage = (): Message => ({
    id: 'welcome',
    role: 'assistant',
    content: "Hi! I'm the Unkommon AI assistant. How can I help you today?\n\n\u2022 Custom RAG Systems\n\u2022 AI Agent Development\n\u2022 ML Consulting & Integration\n\u2022 AI Infrastructure & Deployment\n\u2022 How our engineering process works",
    timestamp: Date.now(),
  });

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: inputValue.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
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

      setMessages((prev) => [...prev, {
        id: assistantMsgId,
        role: 'assistant' as const,
        content: '',
        timestamp: data.timestamp,
      }]);
      setIsLoading(false);
      setConversationId(data.conversationId);

      // Batched typing animation — 3 words per frame at 50ms
      const words = fullText.split(' ');
      let wordIndex = 0;
      let displayed = '';

      const typeNextBatch = () => {
        const batchSize = 3;
        for (let j = 0; j < batchSize && wordIndex < words.length; j++, wordIndex++) {
          displayed += (wordIndex === 0 ? '' : ' ') + words[wordIndex];
        }
        const current = displayed;
        setMessages((prev) =>
          prev.map((m) => m.id === assistantMsgId ? { ...m, content: current } : m)
        );
        if (wordIndex < words.length) {
          setTimeout(typeNextBatch, 50);
        }
      };
      typeNextBatch();
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [...prev, {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at contact@unkommon.ai or (203) 680-9629.",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading, API_URL, conversationId]);

  const handleClear = () => {
    setMessages([]);
    setConversationId(null);
    localStorage.removeItem('chatbot_conversation_id');
    localStorage.removeItem('chatbot_messages');
    setMessages([createWelcomeMessage()]);
  };

  return (
    <>
      {/* Floating Search Bar */}
      <AnimatePresence>
        {!isOpen && !isExpanded && (
          <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="w-[340px] max-w-full pointer-events-auto"
            >
              <div className="relative bg-foreground rounded-full shadow-xl border border-foreground/80">
                <div className="flex items-center gap-2 px-4 py-2.5">
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
                    className="flex-1 bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
                    aria-label="Ask a question"
                  />
                  <button
                    onClick={() => {
                      if (inputValue.trim()) {
                        setIsExpanded(true);
                        setIsOpen(true);
                        handleSend();
                      }
                    }}
                    className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0"
                    aria-label="Send message"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[420px]"
            role="dialog"
            aria-label="Chat with Unkommon AI"
          >
            <div className="flex flex-col h-[100dvh] sm:h-[600px] overflow-hidden sm:rounded-2xl bg-white border border-border shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-foreground rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-medium text-foreground">Unkommon AI</h3>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="text-[10px] text-muted-foreground">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    className="text-[12px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setIsExpanded(false), 300);
                    }}
                    className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-muted transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ minHeight: 0 }}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {message.role === 'assistant' && (
                        <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                          <MessageCircle className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-4 py-2.5 ${
                          message.role === 'user'
                            ? 'bg-foreground text-white'
                            : 'bg-background text-foreground border border-border'
                        }`}
                      >
                        <p className="text-[13px] whitespace-pre-wrap break-words leading-relaxed">{message.content}</p>
                        <p className={`text-[10px] mt-1 ${message.role === 'user' ? 'text-white/50' : 'text-muted-foreground/70'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                    <div className="flex gap-2">
                      <div className="w-6 h-6 bg-foreground rounded-full flex items-center justify-center flex-shrink-0 mt-1" aria-hidden="true">
                        <MessageCircle className="w-3 h-3 text-white" />
                      </div>
                      <div className="bg-background rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-border">
                        <div className="flex gap-1" role="status" aria-label="Typing">
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }} />
                          <motion.div className="w-1.5 h-1.5 rounded-full bg-muted-foreground" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }} />
                        </div>
                        <span className="text-[11px] text-muted-foreground">typing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border pb-[calc(1rem+env(safe-area-inset-bottom))]">
                <div className="flex gap-2 items-end">
                  <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                        if (inputRef.current) inputRef.current.style.height = 'auto';
                      }
                    }}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    rows={1}
                    className="flex-1 min-w-0 bg-background text-foreground placeholder-muted-foreground border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-50 transition-colors text-[13px] resize-none overflow-y-auto break-words"
                    style={{ maxHeight: 120 }}
                    aria-label="Type your message"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center hover:bg-foreground/80 transition-colors disabled:opacity-30 flex-shrink-0"
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Send className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2 text-center">Powered by AI</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
