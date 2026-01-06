import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

interface NavbarProps {
  activeHref?: string;
  transparent?: boolean;
}

export function Navbar({ activeHref = '/', transparent = false }: NavbarProps) {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Learn', href: '/learn' },
    { label: 'Hands-On', href: '/hands-on' },
    { label: 'Chat', href: '/chat' }
  ];

  return (
    <nav className={`relative z-20 flex items-center justify-between px-8 py-6 ${
      transparent ? '' : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700'
    }`}>
      <Link href="/" className="flex items-center space-x-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          transparent ? 'bg-white' : 'bg-slate-900 dark:bg-white'
        }`}>
          <svg className={`w-6 h-6 ${transparent ? 'text-black' : 'text-white dark:text-black'}`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className={`text-xl font-bold ${transparent ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
          AI Performance Mentor
        </span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`font-medium transition-colors ${
              transparent
                ? activeHref === item.href
                  ? 'text-white'
                  : 'text-white/70 hover:text-white'
                : activeHref === item.href
                  ? 'text-slate-900 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <Link
          href="/chat"
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            transparent
              ? 'bg-white text-black hover:bg-gray-100'
              : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-gray-100'
          }`}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
