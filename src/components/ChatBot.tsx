import { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatState } from '../types/chat';
import { generateResponse } from '../services/cohere';
import { Send, Loader2, AlertCircle, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const MAX_MESSAGES = 10; // Increased limit for Hugging Face model

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatState.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || chatState.isLoading) return;

    // Check message limit
    if (chatState.messages.length >= MAX_MESSAGES) {
      setChatState(prev => ({
        ...prev,
        error: 'You have reached the maximum number of messages. Please start a new conversation.',
      }));
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    setInput('');

    try {
      const response = await generateResponse([...chatState.messages, userMessage]);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  const retryLastMessage = async () => {
    if (chatState.messages.length === 0 || chatState.isLoading) return;

    const lastUserMessage = [...chatState.messages].reverse().find(msg => msg.role === 'user');
    if (!lastUserMessage) return;

    setChatState(prev => ({
      ...prev,
      messages: prev.messages.filter(msg => msg.id !== lastUserMessage.id),
      isLoading: true,
      error: null,
    }));

    try {
      const response = await generateResponse(chatState.messages.filter(msg => msg.id !== lastUserMessage.id));
      
      const assistantMessage: ChatMessage = {
        id: Date.now().toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, lastUserMessage, assistantMessage],
        isLoading: false,
      }));
    } catch (error) {
      setChatState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      }));
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatState.messages.length >= MAX_MESSAGES - 1 && (
          <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
            <Info className="w-4 h-4 text-yellow-500" />
            <p className="text-sm text-yellow-700">
              You have {MAX_MESSAGES - chatState.messages.length} message(s) remaining.
            </p>
          </div>
        )}
        {chatState.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {chatState.isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <Loader2 className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        {chatState.error && (
          <div className="flex flex-col items-center space-y-2 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600 text-sm">{chatState.error}</p>
            <button
              onClick={retryLastMessage}
              className="text-sm text-blue-500 hover:text-blue-600"
            >
              Retry
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={chatState.isLoading || chatState.messages.length >= MAX_MESSAGES}
          />
          <button
            type="submit"
            disabled={!input.trim() || chatState.isLoading || chatState.messages.length >= MAX_MESSAGES}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
