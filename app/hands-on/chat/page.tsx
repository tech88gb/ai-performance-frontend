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

function formatMessage(content: string): string {
  return content
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '• $1');
}

function HandsOnChatContent() {
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0) scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const scenario = searchParams.get('scenario');
    if (scenario) {
      setInput(`Help me with: ${scenario}`);
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
        body: JSON.stringify({ message: userMessage, mode: 'hands_on' }),
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

  const quickActions = [
    "My ROAS dropped from 4x to 2x, help me fix it",
    "Walk me through setting up a Performance Max campaign",
    "My landing page converts at 1%, how do I improve it?",
    "Help me set up proper attribution tracking"
  ];

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

        <Link href="/hands-on" className="text-xs font-black uppercase tracking-wider text-black hover:text-[#d4a574] transition-colors drop-shadow-md">
          ← Back to Scenarios
        </Link>
      </nav>
      
      <div className="relative z-10 flex-1 overflow-hidden flex flex-col max-w-5xl w-full mx-auto my-6">
        {/* Chat Container with Border */}
        <div className="flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-purple-400/40 shadow-2xl overflow-hidden">
          {/* Info Banner */}
          <div className="px-4 py-3 bg-purple-500/20 backdrop-blur-md border-b border-purple-500/30">
            <p className="text-sm text-center text-white">
              Describe your performance marketing challenge and get detailed, step-by-step execution guidance.
            </p>
          </div>

        {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 backdrop-blur-sm rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ready for hands-on practice?</h3>
              <p className="text-white/80 mb-6">Describe your challenge and get step-by-step guidance</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-4xl mx-auto">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(action)}
                    className="p-4 text-left bg-white/10 backdrop-blur-md border border-white/20 rounded-lg hover:bg-white/20 hover:border-white/30 transition-all"
                  >
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                      <p className="text-sm text-white font-medium">{action}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-4xl rounded-2xl px-6 py-4 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                  : 'bg-white/20 backdrop-blur-md border border-white/20 text-white shadow-sm'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed font-mono text-sm" dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                {message.sources && message.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs text-white/70 mb-2">Sources:</p>
                    {message.sources.map((source, idx) => (
                      <p key={idx} className="text-xs text-white/80">• {source.topic}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-6 py-4 bg-white/20 backdrop-blur-md border border-white/20 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
          <div className="border-t border-white/20 bg-white/10 backdrop-blur-md px-4 py-4">
            <div className="max-w-4xl mx-auto flex items-end space-x-3">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your performance marketing challenge..."
                rows={1}
                className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-white placeholder-white/50"
                style={{ minHeight: '52px', maxHeight: '200px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HandsOnChatPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HandsOnChatContent />
    </Suspense>
  );
}
