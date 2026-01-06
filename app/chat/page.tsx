'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import ShaderBackground from '@/components/ShaderBackground';
import { Footer } from '@/components/footer';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ topic: string; content: string; relevance?: number }>;
}

type ChatMode = 'learn' | 'hands_on';

function formatMessage(content: string): string {
  return content
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '• $1');
}

function ChatContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<ChatMode>('learn');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const question = searchParams.get('q');
    if (question) {
      setInput(question);
      textareaRef.current?.focus();
    }
  }, [searchParams]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = input.trim();
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      if (!backendUrl) throw new Error('Backend URL not configured');

      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, mode }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply, sources: data.sources || [] }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleModeSwitch = (newMode: ChatMode) => {
    setMode(newMode);
    setMessages([]);
  };

  return (
    <div className="flex flex-col h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/4964989.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-12 py-8">
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-black tracking-tight text-black drop-shadow-lg">
            AI<br/>PERFORMANCE
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-12 text-xs font-black uppercase tracking-wider">
          <Link href="/" className="text-black hover:text-[#d4a574] transition-colors drop-shadow-md">Home</Link>
          <Link href="/learn" className="text-black hover:text-[#d4a574] transition-colors drop-shadow-md">Learn</Link>
          <Link href="/hands-on" className="text-black hover:text-[#d4a574] transition-colors drop-shadow-md">Hands-On</Link>
          <Link href="/chat" className="text-black hover:text-[#d4a574] transition-colors drop-shadow-md">Chat</Link>
        </div>

        <Link href="/chat" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#d4a574] transition-colors drop-shadow-md">
          Get Started
        </Link>
      </nav>
      
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col max-w-5xl w-full mx-auto my-6 px-4">
        {/* Chat Container with Border */}
        <div className="flex flex-col h-full bg-white/90 backdrop-blur-md rounded-2xl border-2 border-black/40 shadow-2xl overflow-hidden">
          {/* Mode Switcher */}
          <div className="px-4 py-3 bg-white/80 backdrop-blur-md border-b border-black/30">
            <div className="flex items-center justify-center space-x-1 bg-black/10 backdrop-blur-sm rounded-lg p-1 w-fit mx-auto">
              <button
                onClick={() => handleModeSwitch('learn')}
                className={`px-4 py-2 text-sm font-black uppercase rounded-md transition-all ${
                  mode === 'learn'
                    ? 'text-black shadow-sm'
                    : 'text-black/70 hover:text-black'
                }`}
                style={mode === 'learn' ? { backgroundColor: 'rgb(230, 220, 200)' } : {}}
              >
                Learn Mode
              </button>
              <button
                onClick={() => handleModeSwitch('hands_on')}
                className={`px-4 py-2 text-sm font-black uppercase rounded-md transition-all ${
                  mode === 'hands_on'
                    ? 'text-black shadow-sm'
                    : 'text-black/70 hover:text-black'
                }`}
                style={mode === 'hands_on' ? { backgroundColor: 'rgb(230, 220, 200)' } : {}}
              >
                Hands-On Mode
              </button>
            </div>
            <p className="text-sm text-center mt-2 text-black font-medium">
              {mode === 'learn' 
                ? 'Learning Mode: Ask questions to understand performance marketing concepts'
                : 'Hands-On Mode: Get detailed execution guidance with step-by-step instructions'
              }
            </p>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-white/50">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-black/20 backdrop-blur-sm">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mode === 'learn' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  )}
                </svg>
              </div>
              <h3 className="text-lg font-black uppercase mb-2 text-black">
                {mode === 'learn' ? 'Ready to learn?' : 'Ready for hands-on practice?'}
              </h3>
              <p className="text-black font-medium">
                {mode === 'learn' 
                  ? 'Ask your first question about performance marketing concepts'
                  : 'Describe your performance marketing challenge for step-by-step guidance'
                }
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-2xl px-6 py-4 ${
                message.role === 'user'
                  ? 'text-black'
                  : 'bg-white/80 backdrop-blur-md border border-black/30 text-black shadow-sm'
              }`} style={message.role === 'user' ? { backgroundColor: 'rgb(230, 220, 200)' } : {}}>
                <div className="whitespace-pre-wrap leading-relaxed" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-black/20">
                    <p className="text-xs text-black/70 mb-2">Sources:</p>
                    {message.sources.map((source, idx) => (
                      <p key={idx} className="text-xs text-black/80">• {source.topic}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-6 py-4 bg-white/80 backdrop-blur-md border border-black/30 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-black/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-black/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-black/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="rounded-lg px-4 py-3 bg-red-500/20 backdrop-blur-sm border border-red-500/30">
                <p className="text-sm text-white">{error}</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-black/30 bg-white/80 backdrop-blur-md px-4 py-4">
          <div className="max-w-4xl mx-auto flex items-end space-x-3">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={mode === 'learn' ? "Ask about any performance marketing concept..." : "Describe your performance marketing challenge..."}
              rows={1}
              className="flex-1 px-4 py-3 bg-white/70 backdrop-blur-sm border border-black/30 rounded-xl focus:outline-none focus:ring-2 resize-none text-black placeholder-black/50"
              style={{ minHeight: '52px', maxHeight: '200px' }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 text-black rounded-xl font-black uppercase disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              style={{ backgroundColor: 'rgb(230, 220, 200)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
}
