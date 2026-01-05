'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

// Knowledge modules structure
const knowledgeModules = [
  {
    id: 'meta_ads',
    title: 'Meta Ads',
    description: 'Facebook and Instagram advertising fundamentals',
    icon: '📱',
    topics: [
      { id: 'what_are_meta_ads', title: 'What are Meta Ads?' },
      { id: 'meta_ads_targeting', title: 'Meta Ads Targeting' }
    ]
  },
  {
    id: 'google_ads',
    title: 'Google Ads',
    description: 'Search and Performance Max campaigns',
    icon: '🔍',
    topics: [
      { id: 'google_ads_basics', title: 'Google Ads Fundamentals' },
      { id: 'performance_max_basics', title: 'Performance Max Campaigns' }
    ]
  },
  {
    id: 'analytics_tracking',
    title: 'Analytics & Tracking',
    description: 'Attribution models and tracking setup',
    icon: '📊',
    topics: [
      { id: 'attribution_models_basics', title: 'Understanding Attribution' },
      { id: 'tracking_setup_basics', title: 'Tracking Setup Essentials' }
    ]
  },
  {
    id: 'conversion_optimization',
    title: 'Conversion Rate Optimization',
    description: 'Landing page and funnel optimization',
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

function LearnContent() {
  const searchParams = useSearchParams();
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle pre-filled question from URL
  useEffect(() => {
    const question = searchParams.get('q');
    if (question) {
      setInput(question);
      textareaRef.current?.focus();
    }
  }, [searchParams]);

  // Send message to backend with learn mode
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message to chat
    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      if (!backendUrl) {
        throw new Error('Backend URL not configured');
      }

      const response = await fetch(`${backendUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          mode: 'learn' // Learning mode
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Server error: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Add AI response to chat
      const aiMessage: Message = {
        role: 'assistant',
        content: data.reply,
        sources: data.sources || [],
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span className="font-medium">Home</span>
              </Link>
              <div className="text-slate-400">•</div>
              <h1 className="text-lg font-bold text-slate-900">Learn Performance Marketing</h1>
            </div>
            <Link 
              href="/hands-on"
              className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
            >
              Try Hands-On Mode →
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Topics */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Learning Topics</h2>
              <div className="space-y-3">
                {knowledgeModules.map((module) => (
                  <div key={module.id}>
                    <button
                      onClick={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
                      className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{module.icon}</span>
                        <div>
                          <div className="font-medium text-slate-900">{module.title}</div>
                          <div className="text-xs text-slate-500">{module.description}</div>
                        </div>
                      </div>
                      <svg 
                        className={`w-4 h-4 text-slate-400 transition-transform ${selectedModule === module.id ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {selectedModule === module.id && (
                      <div className="ml-6 mt-2 space-y-1">
                        {module.topics.map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => setInput(`Explain ${topic.title}`)}
                            className="block w-full text-left px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded transition-colors"
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

          {/* Main Content - Chat */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Learning Mode</h3>
                    <p className="text-sm text-slate-500">Ask questions to learn step-by-step</p>
                  </div>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to learn?</h3>
                    <p className="text-slate-600 mb-4">Choose a topic from the sidebar or ask any question about performance marketing</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['What is ROAS?', 'How do Facebook ads work?', 'What is attribution?'].map((question) => (
                        <button
                          key={question}
                          onClick={() => setInput(question)}
                          className="px-3 py-1 text-sm bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-3xl rounded-2xl px-6 py-4 ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                          : 'bg-slate-50 border border-slate-200 text-slate-900'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {message.role === 'assistant' && (
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                          {message.sources && message.sources.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-slate-300">
                              <p className="text-xs text-slate-500 mb-2">Sources:</p>
                              <div className="space-y-1">
                                {message.sources.map((source, idx) => (
                                  <p key={idx} className="text-xs text-slate-600">• {source.topic}</p>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-3xl rounded-2xl px-6 py-4 bg-slate-50 border border-slate-200">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex justify-center">
                    <div className="max-w-md rounded-lg px-4 py-3 bg-red-50 border border-red-200">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 px-6 py-4">
                <div className="flex items-end space-x-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about any performance marketing concept..."
                      rows={1}
                      className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-400"
                      style={{ minHeight: '52px', maxHeight: '200px' }}
                    />
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
                  >
                    {isLoading ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
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