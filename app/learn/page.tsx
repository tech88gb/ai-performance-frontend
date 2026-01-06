'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import ShaderBackground from '@/components/ShaderBackground';
import { Footer } from '@/components/footer';

const knowledgeModules = [
  {
    id: 'meta_ads',
    title: 'Meta Ads',
    description: 'Facebook and Instagram advertising',
    icon: '📱',
    topics: [
      { id: 'what_are_meta_ads', title: 'What are Meta Ads?' },
      { id: 'meta_ads_targeting', title: 'Meta Ads Targeting' }
    ]
  },
  {
    id: 'google_ads',
    title: 'Google Ads',
    description: 'Search and Performance Max',
    icon: '🔍',
    topics: [
      { id: 'google_ads_basics', title: 'Google Ads Fundamentals' },
      { id: 'performance_max_basics', title: 'Performance Max Campaigns' }
    ]
  },
  {
    id: 'analytics_tracking',
    title: 'Analytics & Tracking',
    description: 'Attribution and tracking',
    icon: '📊',
    topics: [
      { id: 'attribution_models_basics', title: 'Understanding Attribution' },
      { id: 'tracking_setup_basics', title: 'Tracking Setup Essentials' }
    ]
  },
  {
    id: 'conversion_optimization',
    title: 'Conversion Optimization',
    description: 'Landing page optimization',
    icon: '📈',
    topics: [
      { id: 'cro_fundamentals', title: 'CRO Basics' },
      { id: 'landing_page_basics', title: 'Landing Page Essentials' }
    ]
  }
];

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

function LearnContent() {
  const searchParams = useSearchParams();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
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
        body: JSON.stringify({ message: userMessage, mode: 'learn' }),
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

  return (
    <div className="min-h-screen relative">
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

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/85 backdrop-blur-md rounded-xl border border-black/20 p-6 lg:sticky lg:top-8">
              <h2 className="text-lg font-black uppercase mb-4 text-black">Learning Topics</h2>
              <div className="space-y-3">
                {knowledgeModules.map((module) => (
                  <div key={module.id}>
                    <button
                      onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                      className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-black/10 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{module.icon}</span>
                        <div>
                          <div className="font-black uppercase text-black">{module.title}</div>
                          <div className="text-xs text-black/70">{module.description}</div>
                        </div>
                      </div>
                      <svg className={`w-4 h-4 text-black/70 transition-transform ${selectedModule === module.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {selectedModule === module.id && (
                      <div className="ml-6 mt-2 space-y-1">
                        {module.topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => setInput(`Explain ${topic.title}`)}
                            className="block w-full text-left px-3 py-2 text-sm text-black/80 hover:text-black hover:bg-black/10 rounded transition-colors"
                          >
                            {topic.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white/85 backdrop-blur-md rounded-xl border border-black/20 h-[600px] flex flex-col">
              <div className="px-6 py-4 border-b border-black/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgb(230, 220, 200)' }}>
                    <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-black uppercase text-black">Learning Mode</h3>
                    <p className="text-sm text-black/70">Ask questions to learn step-by-step</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-black/20 backdrop-blur-sm rounded-full mb-4">
                      <svg className="w-8 h-8" style={{ color: 'rgb(255, 251, 228)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-black uppercase mb-2 text-black">Ready to learn?</h3>
                    <p className="text-black mb-4">Choose a topic or ask any question</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['What is ROAS?', 'How do Facebook ads work?', 'What is attribution?'].map((q) => (
                        <button key={q} onClick={() => setInput(q)} className="px-3 py-1 text-sm bg-black/20 backdrop-blur-sm text-black hover:bg-black/30 rounded-full transition-colors">
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-3xl rounded-2xl px-6 py-4 ${message.role === 'user' ? 'text-black' : 'bg-white/60 backdrop-blur-md border border-black/20 text-black'}`} style={message.role === 'user' ? { backgroundColor: 'rgb(230, 220, 200)' } : {}}>
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
                    <div className="rounded-2xl px-6 py-4 bg-white/60 backdrop-blur-md border border-black/20">
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
                      <p className="text-sm text-black">{error}</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t border-black/20 px-6 py-4">
                <div className="flex items-end space-x-3">
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about any performance marketing concept..."
                    rows={1}
                    className="flex-1 px-4 py-3 bg-white/60 backdrop-blur-sm border border-black/20 rounded-xl focus:outline-none focus:ring-2 resize-none text-black placeholder-black/50"
                    style={{ minHeight: '52px', maxHeight: '200px' }}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="px-6 py-3 text-black rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LearnContent />
    </Suspense>
  );
}
