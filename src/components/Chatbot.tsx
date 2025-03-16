import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getChatResponse, ChatHistory } from '../utils/gemini';
import '../styles/chatbot.css';

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  context: string;
}

const Chatbot: React.FC<ChatbotProps> = ({ context }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      type: 'bot', 
      content: `Hi! I can help you understand the ${context} model. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatChatHistory = (messages: ChatMessage[]): ChatHistory[] => {
    return messages.map(msg => ({
      role: msg.type === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);

    const userMessage: ChatMessage = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chatHistory = formatChatHistory(messages.slice(1));
      const response = await getChatResponse(input, context, chatHistory);

      const botMessage: ChatMessage = {
        type: 'bot',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  const renderMessage = (content: string, type: 'user' | 'bot') => {
    if (type === 'user') {
      return <div className="whitespace-pre-wrap">{content}</div>;
    }
    
    return (
      <div className="markdown-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            strong: ({ children }) => <strong className="font-bold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-md font-bold mb-2">{children}</h3>,
            code: ({ children }) => <code className="bg-gray-100 px-1 rounded">{children}</code>,
            pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-[450px] relative bg-white rounded-lg shadow-lg">
      <div className="bg-[#4A90E2] text-white p-3 rounded-t-lg sticky top-0 z-10">
        <h2 className="text-xl font-semibold">Interactive {context} Assistant</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div className="flex flex-col max-w-[80%] gap-1">
              <div className="flex items-center gap-2">
                {message.type === 'bot' ? (
                  <Bot className="h-5 w-5 text-[#4A90E2]" />
                ) : (
                  <User className="h-5 w-5 text-[#4A90E2]" />
                )}
                <span className="text-xs text-gray-500">
                  {format(message.timestamp, 'HH:mm')}
                </span>
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.type === 'user'
                    ? 'bg-[#4A90E2] text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {renderMessage(message.content, message.type)}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 text-gray-500">
            <Bot className="h-5 w-5" />
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center p-2 bg-red-50 rounded">
            {error}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 border-t bg-white p-3 mt-auto">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
            placeholder={`Ask about the ${context}...`}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className={`p-2 bg-[#4A90E2] text-white rounded-lg transition-colors duration-300 ${
              isTyping || !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#357ABD]'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;