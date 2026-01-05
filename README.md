# AI Performance Marketer - Frontend

A professional Next.js frontend for the AI Performance Marketing Mentor application.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 19**

## Features

### Landing Page (/)
- Professional SaaS design with gradient hero section
- Sample questions for quick access
- Feature highlights
- Responsive layout

### Chat Page (/chat)
- Real-time chat interface with AI mentor
- User and AI message bubbles
- Loading indicators
- Error handling with graceful fallbacks
- Auto-scroll to latest message
- Keyboard shortcuts:
  - `Enter` - Send message
  - `Shift + Enter` - New line
- Pre-filled questions from URL parameters

## Project Structure

```
ai-performance-frontend/
├── app/
│   ├── page.tsx              # Landing page
│   ├── chat/
│   │   └── page.tsx          # Chat interface
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── ChatMessage.tsx       # Individual message component
│   ├── LoadingIndicator.tsx  # Loading animation
│   └── ErrorToast.tsx        # Error display
├── lib/
│   └── api.ts                # Backend API client
└── .env.local                # Environment variables
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
Create `.env.local` with:
```
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Backend Integration

The frontend communicates with a separate backend service:

### API Endpoint
- **POST** `/chat`
- **Request Body**: `{ "message": "user question" }`
- **Response**: `{ "reply": "AI response", "sources": [] }`

### Error Handling
- Network errors are caught and displayed to users
- Backend errors show appropriate error messages
- Graceful degradation if backend is unavailable

## Development

### Code Organization
- All AI logic is handled by the backend
- Frontend focuses purely on UI/UX
- Clean component structure
- TypeScript for type safety
- Commented code for maintainability

### Styling
- Tailwind CSS utility classes
- Responsive design (mobile-first)
- Professional color scheme (slate, blue, indigo)
- Smooth animations and transitions

## Build for Production

```bash
npm run build
npm start
```

## Notes

- No AI logic in frontend (all handled by backend)
- Production-ready code structure
- Fully responsive design
- Accessible UI components
- Clean, maintainable codebase
