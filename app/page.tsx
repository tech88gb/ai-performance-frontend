import Link from 'next/link';

export default function Home() {
  const sampleQuestions = [
    "Why is my ROAS dropping?",
    "How do I reduce CAC?",
    "Why is CTR low?",
    "What's the best way to optimize my ad spend?",
    "How can I improve my conversion rate?",
    "What metrics should I track for performance marketing?"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-slate-900">AI Performance Marketer</h1>
            <div className="flex items-center space-x-4">
              <Link 
                href="/learn"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Learn
              </Link>
              <Link 
                href="/hands-on"
                className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Hands-On
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
              Your AI Performance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Marketing Mentor
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Master performance marketing with two powerful learning modes: beginner-friendly lessons and hands-on practice sessions.
            </p>
          </div>

          {/* Mode Selection Cards */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Learn Mode */}
            <Link href="/learn" className="group">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Learn Basics
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Start with fundamentals. Learn concepts step-by-step with clear explanations, examples, and beginner-friendly guidance.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                      Start Learning
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Hands-On Mode */}
            <Link href="/hands-on" className="group">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-purple-300 hover:shadow-lg transition-all transform hover:-translate-y-1">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Hands-On Practice
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Get step-by-step execution guidance. Solve real problems with detailed walkthroughs and UI instructions.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center text-purple-600 font-semibold group-hover:text-purple-700">
                      Start Practicing
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Sample Questions Section */}
        <div className="mt-24">
          <h3 className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Popular Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleQuestions.map((question, index) => (
              <Link
                key={index}
                href={`/learn?q=${encodeURIComponent(question)}`}
                className="group p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3">
                  <svg 
                    className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <p className="text-slate-700 group-hover:text-slate-900 font-medium">
                    {question}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Two Learning Modes</h4>
            <p className="text-sm text-slate-600">Choose between beginner lessons or hands-on practice</p>
          </div>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Step-by-Step Guidance</h4>
            <p className="text-sm text-slate-600">Detailed walkthroughs with UI instructions</p>
          </div>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Real-World Practice</h4>
            <p className="text-sm text-slate-600">Solve actual performance marketing challenges</p>
          </div>
        </div>
      </div>
    </main>
  );
}
