import Link from 'next/link';

export default function HandsOnPage() {
  const practiceScenarios = [
    {
      title: "Fix Dropping ROAS",
      description: "Your Meta ads ROAS dropped from 4.2x to 2.1x over the past week. Get step-by-step guidance to diagnose and fix the issue.",
      difficulty: "Intermediate",
      time: "15-20 min",
      icon: "📉"
    },
    {
      title: "Launch Performance Max Campaign",
      description: "Set up your first Google Performance Max campaign with proper asset optimization and audience signals.",
      difficulty: "Beginner",
      time: "25-30 min",
      icon: "🚀"
    },
    {
      title: "Optimize Landing Page Conversion",
      description: "Your landing page converts at 1.2%. Learn how to identify issues and implement improvements for better performance.",
      difficulty: "Intermediate",
      time: "20-25 min",
      icon: "📈"
    },
    {
      title: "Set Up Attribution Tracking",
      description: "Implement proper tracking setup for iOS 14+ compliance and accurate attribution across channels.",
      difficulty: "Advanced",
      time: "30-40 min",
      icon: "🎯"
    }
  ];

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
              <h1 className="text-lg font-bold text-slate-900">Hands-On Practice</h1>
            </div>
            <Link 
              href="/learn"
              className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
            >
              ← Back to Learning
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl mb-6">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Hands-On Practice</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Solve real performance marketing challenges with step-by-step guidance. Get detailed walkthroughs with UI instructions and actionable solutions.
          </p>
        </div>

        {/* Practice Scenarios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {practiceScenarios.map((scenario, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 p-6 hover:border-purple-300 hover:shadow-lg transition-all">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">{scenario.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{scenario.title}</h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{scenario.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>{scenario.difficulty}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{scenario.time}</span>
                      </span>
                    </div>
                    <Link
                      href={`/hands-on/chat?scenario=${encodeURIComponent(scenario.title)}`}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                    >
                      Start Practice
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Open Practice Session */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Open Practice Session</h2>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Have a specific performance marketing challenge? Start an open practice session and get step-by-step guidance tailored to your situation.
          </p>
          <Link
            href="/hands-on/chat"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            Open Practice Session
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Step-by-Step Guidance</h4>
            <p className="text-sm text-slate-600">Detailed walkthroughs with numbered steps and clear instructions</p>
          </div>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">UI Instructions</h4>
            <p className="text-sm text-slate-600">Exact button locations and interface guidance for platforms</p>
          </div>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-lg">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-slate-900">Real Scenarios</h4>
            <p className="text-sm text-slate-600">Practice with actual performance marketing challenges</p>
          </div>
        </div>
      </div>
    </div>
  );
}