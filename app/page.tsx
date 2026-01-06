import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#1a1a1a]">
      {/* Hero Background Image - Full Screen */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/4964989.jpg)' }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
      </div>

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent z-30"></div>

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

      {/* Hero Content */}
      <div className="relative z-10 flex items-end min-h-[calc(100vh-120px)] pb-20">
        <div className="w-full max-w-7xl mx-auto px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            {/* Left Side - Main Heading */}
            <div className="space-y-8">
              <h1 className="text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight" style={{ color: 'rgb(255, 251, 228)' }}>
                let's Realize your
                <br />
                best marketing
                <br />
                performance
              </h1>
            </div>

            {/* Right Side - Description and CTA */}
            <div className="space-y-6 lg:pl-12 pb-8">
              <p className="text-white/90 text-base leading-relaxed font-light">
                We build more than just campaigns—we earn trust.
                <br />
                With expert guidance and a focus on results,
                <br />
                we deliver success on time, every time.
              </p>

              <Link 
                href="/chat"
                className="inline-flex items-center space-x-3 group"
              >
                <div className="w-14 h-14 rounded-full border-2 border-[#d4a574] flex items-center justify-center group-hover:bg-[#d4a574] transition-all">
                  <svg className="w-6 h-6 text-[#d4a574] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
                <span className="text-[#d4a574] text-lg font-semibold border-b-2 border-[#d4a574] pb-1 group-hover:text-white group-hover:border-white transition-all">
                  Get Consultation
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selection Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link href="/learn" className="group">
            <div className="bg-[#d4a574]/20 backdrop-blur-md rounded-2xl border-2 border-[#d4a574]/40 overflow-hidden hover:bg-[#d4a574]/30 hover:border-[#d4a574]/60 transition-all transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="p-8 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4a574]/30 backdrop-blur-sm rounded-xl">
                  <svg className="w-8 h-8" style={{ color: 'rgb(255, 251, 228)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold" style={{ color: 'rgb(255, 251, 228)' }}>Learn Basics</h3>
                <p className="text-white/90 text-lg leading-relaxed">Start with fundamentals. Learn concepts step-by-step with clear explanations and beginner-friendly guidance.</p>
                <div className="pt-4">
                  <span className="inline-flex items-center text-[#d4a574] font-semibold text-lg group-hover:text-white transition-colors">
                    Start Learning
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/hands-on" className="group">
            <div className="bg-[#d4a574]/20 backdrop-blur-md rounded-2xl border-2 border-[#d4a574]/40 overflow-hidden hover:bg-[#d4a574]/30 hover:border-[#d4a574]/60 transition-all transform hover:-translate-y-2 hover:shadow-2xl">
              <div className="p-8 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#d4a574]/30 backdrop-blur-sm rounded-xl">
                  <svg className="w-8 h-8" style={{ color: 'rgb(255, 251, 228)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold" style={{ color: 'rgb(255, 251, 228)' }}>Hands-On Practice</h3>
                <p className="text-white/90 text-lg leading-relaxed">Get step-by-step execution guidance. Solve real problems with detailed walkthroughs and UI instructions.</p>
                <div className="pt-4">
                  <span className="inline-flex items-center text-[#d4a574] font-semibold text-lg group-hover:text-white transition-colors">
                    Start Practicing
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20 z-10">
        <svg viewBox="0 0 100 100" className="text-[#d4a574]">
          <rect x="10" y="10" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="2"/>
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="2"/>
          <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-20">
        <Footer />
      </div>
    </main>
  );
}
