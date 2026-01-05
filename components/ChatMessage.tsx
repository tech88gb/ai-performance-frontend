/**
 * ChatMessage Component
 * Displays individual chat messages with role-based styling
 */

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

export default function ChatMessage({ role, content, sources }: ChatMessageProps) {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-3xl rounded-2xl px-6 py-4 ${
          role === 'user'
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
            : 'bg-white border border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-start space-x-3">
          {role === 'assistant' && (
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          )}
          <div className="flex-1">
            <p className="whitespace-pre-wrap leading-relaxed">{content}</p>
            {sources && sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200">
                <p className="text-xs text-slate-500 mb-2">Sources:</p>
                <div className="space-y-1">
                  {sources.map((source, idx) => (
                    <p key={idx} className="text-xs text-slate-600">• {source}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
