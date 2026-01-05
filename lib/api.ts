/**
 * API Client for Backend Communication
 * Handles all requests to the AI Performance Marketer backend
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  reply: string;
  sources?: string[];
}

/**
 * Send a chat message to the backend
 * @param message - User's message
 * @returns AI response with optional sources
 */
export async function sendChatMessage(message: string): Promise<ChatResponse> {
  if (!BACKEND_URL) {
    throw new Error('Backend URL is not configured. Please set NEXT_PUBLIC_BACKEND_URL in .env.local');
  }

  const response = await fetch(`${BACKEND_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message } as ChatRequest),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new Error(`Backend error (${response.status}): ${errorText}`);
  }

  const data: ChatResponse = await response.json();
  return data;
}
