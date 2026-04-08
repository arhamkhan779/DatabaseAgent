import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000').replace(/\/+$/, '');

interface ChatRequest {
  query: string;
}

interface ChatResponseMessage {
  data_analysis_output: string;
  visualization: string | null;
}

interface ChatResponse {
  success: boolean;
  message: ChatResponseMessage;
  status: number;
}

interface UserMessage {
  id: string;
  sender: 'user';
  text: string;
  timestamp: Date;
}

interface BotMessage {
  id: string;
  sender: 'bot';
  dataAnalysisOutput: string;
  visualization: string | null;
  timestamp: Date;
}

type Message = UserMessage | BotMessage;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : {};
      return user || {};
    } catch {
      return {};
    }
  };

  const user = getUser();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    
    if (!textToSend) return;

    // Add user message
    const userMessage: UserMessage = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const requestBody: ChatRequest = { query: textToSend };
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = (await response.json()) as Partial<ChatResponse> | null;
      const analysisOutput =
        typeof data?.message?.data_analysis_output === 'string'
          ? data.message.data_analysis_output
          : '';
      const visualizationOutput =
        typeof data?.message?.visualization === 'string' ? data.message.visualization : null;

      if (!response.ok || data?.success !== true) {
        throw new Error('Chat request failed');
      }

      const botResponse: BotMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        dataAnalysisOutput: analysisOutput,
        visualization: visualizationOutput,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorResponse: BotMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        dataAnalysisOutput: '<p>Sorry, I encountered an error while processing your request.</p>',
        visualization: null,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    navigate('/auth');
  };

  const isFullHtmlDocument = (html: string | null): boolean => {
    if (typeof html !== 'string') {
      return false;
    }

    const trimmedHtml = html.trim().toLowerCase();
    return trimmedHtml.startsWith('<!doctype html') || trimmedHtml.startsWith('<html');
  };

  const shouldRenderInIframe = (html: string | null): boolean => {
    if (typeof html !== 'string') {
      return false;
    }

    return /<script\b|<canvas\b/i.test(html) || isFullHtmlDocument(html);
  };

  const toVisualizationSrcDoc = (html: string): string => {
    if (isFullHtmlDocument(html)) {
      return html;
    }

    return `<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      html, body { margin: 0; padding: 0; background: #ffffff; color: #111827; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }
      body { padding: 12px; }
      canvas { display: block; max-width: 100%; }
    </style>
  </head>
  <body>
    ${html}
  </body>
</html>`;
  };

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-[#081016] text-[#f4efe7]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8rem] top-[-6rem] h-[24rem] w-[24rem] rounded-full bg-[#c48d3a]/12 blur-3xl" />
        <div className="absolute right-[-7rem] top-[8rem] h-[20rem] w-[20rem] rounded-full bg-[#8fb9aa]/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-[18%] h-[28rem] w-[28rem] rounded-full bg-[#5a6a7a]/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:96px_96px] opacity-20 [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]" />
      </div>

      <div className="relative flex h-full flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/5 sm:h-10 sm:w-10">
            <svg className="h-5 w-5 text-[#f1c27d] sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-[0.08em] text-white sm:text-xl">Database Agent</h1>
            <p className="hidden text-xs text-[#d2c9bd] sm:block">Ask. Inspect SQL. Visualize.</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-white/15 bg-white/5 p-2 transition hover:border-white/25 hover:bg-white/10"
            aria-label="Logout"
          >
            <svg className="h-5 w-5 text-[#f1c27d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8 scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 sm:py-20">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-2xl sm:h-20 sm:w-20">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-4xl">
                Hi {user.username || 'there'}. What should we dive into today?
              </h2>
              <p className="mb-8 max-w-2xl text-sm text-[#ddd6ca] sm:text-base">
                I'm your AI-powered database assistant. Ask me anything about your database, 
                and I'll help you analyze, optimize, and understand your data better.
              </p>
            </div>
          ) : (
            <div className="space-y-6 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] sm:max-w-[75%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                        message.sender === 'user'
                          ? 'bg-[#f1c27d]'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      {message.sender === 'user' ? (
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`overflow-hidden rounded-2xl px-4 py-3 shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-[#f1c27d] text-[#11151b]'
                          : 'border border-white/10 bg-[#0d151c]/95 text-[#f4efe7]'
                      }`}
                    >
                      {message.sender === 'bot' ? (
                        <div className="space-y-3 text-sm sm:text-base break-words leading-relaxed max-w-full">
                          <div className="overflow-x-auto" dangerouslySetInnerHTML={{ __html: message.dataAnalysisOutput || '<p>No analysis output returned.</p>' }} />
                          {typeof message.visualization === 'string' && message.visualization.trim() ? (
                            <div className="overflow-x-auto border-t border-white/10 pt-3">
                              {shouldRenderInIframe(message.visualization) ? (
                                <iframe
                                  title={`visualization-${message.id}`}
                                  srcDoc={toVisualizationSrcDoc(message.visualization)}
                                  sandbox="allow-scripts allow-same-origin"
                                  className="w-full min-h-[460px] rounded-lg border border-white/15 bg-white"
                                />
                              ) : (
                                <div dangerouslySetInnerHTML={{ __html: message.visualization }} />
                              )}
                            </div>
                          ) : null}
                        </div>
                      ) : (
                        <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                          {message.text}
                        </p>
                      )}
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === 'user'
                            ? 'text-[#332510]'
                            : 'text-[#b8a995]'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-[#0d151c]/95 px-4 py-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#b8a995]" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#b8a995]" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-[#b8a995]" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 bg-[#0c141b]/95 px-4 py-4 shadow-lg sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end space-x-2 sm:space-x-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Database Agent..."
                rows={1}
                className="w-full rounded-2xl border border-white/12 bg-white/5 px-4 py-3 pr-12
                         text-sm text-[#f4efe7] placeholder:text-[#9faab6] sm:text-base
                         focus:border-[#f1c27d]/60 focus:outline-none focus:ring-2 focus:ring-[#f1c27d]/30
                         resize-none
                         transition-all duration-200 min-h-[48px] max-h-[120px]"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9faab6] transition hover:text-[#f4efe7]"
                  aria-label="Clear input"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="flex-shrink-0 rounded-2xl bg-[#f1c27d] p-3 text-[#11151b]
                       transition disabled:cursor-not-allowed disabled:opacity-50
                       hover:bg-[#f5d39e]"
              aria-label="Send message"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <p className="mt-2 text-center text-xs text-[#a99c88]">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Chatbot;
