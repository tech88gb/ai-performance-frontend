import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function HandsOnPage() {

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
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4a574]/40 backdrop-blur-sm rounded-xl mb-6">
            <svg className="w-8 h-8" style={{ color: 'rgb(255, 251, 228)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black uppercase mb-6" style={{ color: 'rgb(255, 251, 228)' }}>Hands-On Practice</h1>
        </div>

        {/* Open Practice Session */}
        <div className="bg-[#d4a574]/30 backdrop-blur-md rounded-2xl border-2 border-[#d4a574]/60 overflow-hidden hover:bg-[#d4a574]/40 hover:border-[#d4a574]/80 transition-all transform hover:-translate-y-2 hover:shadow-2xl p-8 lg:p-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4a574]/40 backdrop-blur-sm rounded-xl mb-6">
            <svg className="w-8 h-8" style={{ color: 'rgb(255, 251, 228)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black uppercase mb-6" style={{ color: 'rgb(255, 251, 228)' }}>Start Practice Session</h2>
          <p className="text-white/90 text-base lg:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Have a specific challenge? Start a practice session and get step-by-step guidance tailored to your situation.
          </p>
          <Link
            href="/hands-on/chat"
            className="inline-flex items-center space-x-3 group"
          >
            <div className="w-14 h-14 rounded-full border-2 border-[#d4a574] flex items-center justify-center group-hover:bg-[#d4a574] transition-all">
              <svg className="w-6 h-6 text-[#d4a574] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
            <span className="text-[#d4a574] text-lg font-semibold border-b-2 border-[#d4a574] pb-1 group-hover:text-white group-hover:border-white transition-all">
              Start Practice Session
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
