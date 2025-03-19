import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { API_KEY, API_URL, MODEL } from '../config/gemini';

// Political context for the AI
const POLITICAL_CONTEXT = `
You are a specialized political advisor chatbot for a Smart Voting System. Your expertise includes:
1. Electoral processes and voting procedures
2. Political party information and ideologies
3. Democratic systems and governance
4. Current political landscape
5. Voter rights and responsibilities

When responding:
- Focus on factual, non-partisan information
- Avoid showing bias towards any political party
- Provide clear, concise explanations
- Include relevant statistics or data when appropriate
- Emphasize the importance of informed voting

Important: Keep responses focused on democratic processes and avoid any controversial political statements.
`;

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial bot message
  useEffect(() => {
    setMessages([
      {
        role: 'bot',
        content: 'Welcome! I\'m your political advisor for the Smart Voting System. I can help you understand:\n\n- Voting procedures\n- Political party information\n- Electoral processes\n- Voter rights and responsibilities\n\nWhat would you like to know about?'
      }
    ]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Format conversation history for the API
      const messageHistory = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content
      }));

      // Add system message with political context
      const apiMessages = [
        { role: 'system', content: POLITICAL_CONTEXT },
        ...messageHistory,
        { role: 'user', content: userMessage }
      ];

      // Call API
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `API error: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = data.choices[0].message.content;

      setMessages(prev => [...prev, { role: 'bot', content: botMessage }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      let errorMessage = 'I apologize, but I encountered an error connecting to the AI service. Please try again in a moment.';
      if (error instanceof Error) {
        const errorMsg = error.message.toLowerCase();
        if (errorMsg.includes('api key not valid') || errorMsg.includes('unauthorized')) {
          errorMessage = 'I apologize, but there seems to be an issue with the API configuration. Please contact support.';
        } else if (errorMsg.includes('quota') || errorMsg.includes('rate limit')) {
          errorMessage = 'I apologize, but we\'ve reached our API quota limit. Please try again later.';
        } else if (errorMsg.includes('not found') || errorMsg.includes('404')) {
          errorMessage = 'I apologize, but the AI service is temporarily unavailable. Please try again in a few moments.';
        } else if (errorMsg.includes('blocked') || errorMsg.includes('safety')) {
          errorMessage = 'I apologize, but I cannot provide information on that topic. Please ask about voting procedures, electoral processes, or general political information.';
        }
      }
      
      setMessages(prev => [...prev, {
        role: 'bot',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-orange-500" />
          <h2 className="text-lg font-semibold text-gray-800">Political Advisor</h2>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about voting, parties, or election procedures..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
