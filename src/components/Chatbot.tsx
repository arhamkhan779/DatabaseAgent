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
        dataAnalysisOutput: '<div class="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 font-bold text-sm">Error processing request. Please check your connection.</div>',
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

  const shouldRenderInIframe = (html: string | null): boolean => {
    if (typeof html !== 'string') return false;
    return /<script\b|<canvas\b/i.test(html) || html.trim().toLowerCase().startsWith('<!doctype html');
  };

  const toVisualizationSrcDoc = (html: string): string => {
    if (html.trim().toLowerCase().startsWith('<!doctype html')) return html;
    return `<!doctype html><html><head><meta charset="UTF-8" /><style>body { margin: 0; padding: 20px; font-family: sans-serif; }</style></head><body>${html}</body></html>`;
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E3A8A] selection:bg-blue-100 overflow-hidden font-sans">
      {/* Structural Accents */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-50/50 rounded-full blur-[100px]" />
      </div>

      {/* Sidebar - Analytics Navigation */}
      <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200 p-8 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3 mb-12 px-2 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-all">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <ellipse cx="12" cy="6" rx="7" ry="3" />
              <path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" />
              <path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tighter leading-none">DatabaseAgent</span>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-1">Analytics Lab</span>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 px-2">Recent Queries</div>
          {messages.filter(m => m.sender === 'user').map((m, i) => (
            <div key={i} className="p-3 rounded-xl hover:bg-white text-sm font-bold text-slate-600 truncate cursor-pointer transition-colors border border-transparent hover:border-slate-100">
               {m.text}
            </div>
          ))}
          {messages.length === 0 && (
             <div className="px-2 text-xs font-bold text-slate-400 italic">No history yet...</div>
          )}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-cta/10 flex items-center justify-center text-cta font-black text-xs">
                {user.username?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="text-xs font-black text-slate-700 truncate max-w-[100px]">{user.username || 'User'}</div>
            </div>
            <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative h-full">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white/80 backdrop-blur-lg border-bottom border-slate-200 flex items-center justify-between px-6 z-20">
           <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-cta rounded-lg flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6" /><path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6" /></svg>
              </div>
              <span className="font-extrabold text-lg tracking-tight">Analytics Lab</span>
           </div>
           <button onClick={handleLogout} className="text-slate-400 font-bold text-xs uppercase tracking-widest">Logout</button>
        </header>

        {/* Scrollable Space */}
        <div className="flex-1 overflow-y-auto pt-10 pb-32 scrollbar-thin">
          <div className="max-w-4xl mx-auto px-6">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center pt-10 text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center mb-8 relative">
                   <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 border-4 border-white rounded-full" />
                </div>
                <h2 className="text-5xl font-black mb-4 tracking-tighter">
                   <span className="text-[#1E3A8A]">Database</span><span className="text-orange-500">Agent</span>
                </h2>
                <p className="max-w-xl text-slate-500 font-medium leading-relaxed mb-12">
                  Welcome to your autonomous analytics engine. Ask any data question in plain English, and I'll handle the SQL, analysis, and visualization.
                </p>

                {/* Quick Insights Row - Subtle Blue */}
                <div className="w-full flex items-center justify-center gap-4 mb-12">
                   {[
                     { l: 'DB Connection', v: 'Active Northwind', c: 'text-emerald-500' },
                     { l: 'Analysis Ready', v: '100%', c: 'text-blue-500' },
                     { l: 'Agent Status', v: 'Idle', c: 'text-slate-400' }
                   ].map((stat, i) => (
                     <div key={i} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-center">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.l}</div>
                        <div className={`text-xs font-black ${stat.c}`}>{stat.v}</div>
                     </div>
                   ))}
                </div>
                
                <div className="w-full grid sm:grid-cols-2 gap-4 max-w-5xl pb-48 font-sans">
                  {[
                    { t: 'Sales Analysis', q: 'Show total sales amount by product category in Northwind, highest to lowest. Include category name and total sales.' },
                    { t: 'Revenue Trends', q: 'Show monthly revenue trend over time in Northwind using order date. Include month and revenue, sorted by month.' },
                    { t: 'Logistics Insight', q: 'Show top 5 shipping countries by number of orders in Northwind. Include country and order count.' },
                    { t: 'Product Insights', q: 'Show top 10 products by total sales in Northwind. Include product name and total sales.' }
                  ].map((s, i) => (
                    <button 
                      key={i} 
                      onClick={() => handleSendMessage(s.q)}
                      className="group text-left p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all active:scale-[0.98]"
                    >
                      <div className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 group-hover:text-blue-600">{s.t}</div>
                      <div className="font-bold text-sm text-slate-700 leading-snug">"{s.q}"</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {messages.map((message) => (
                  <div key={message.id} className="animate-fade-in-up">
                    {message.sender === 'user' ? (
                       <div className="flex justify-end mb-4">
                          <div className="max-w-[80%] bg-gradient-to-br from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-[2rem] rounded-tr-none shadow-lg shadow-blue-900/10 font-bold text-sm leading-relaxed">
                            {message.text}
                          </div>
                       </div>
                    ) : (
                       <div className="space-y-6">
                          <div className="flex items-center gap-3 mb-2">
                             <div className="w-8 h-8 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                             </div>
                             <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Analysis Engine</span>
                          </div>
                          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden prose prose-slate prose-sm max-w-none font-sans">
                             <div dangerouslySetInnerHTML={{ __html: message.dataAnalysisOutput }} />
                             
                             {message.visualization && (
                                <div className="mt-10 pt-10 border-t border-slate-100">
                                   <div className="flex items-center justify-between mb-8">
                                      <h4 className="text-xl font-black tracking-tight">Visual Insight</h4>
                                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Rendered Live</span>
                                   </div>
                                   <div className="rounded-2xl border border-slate-100 bg-slate-50/50 p-2 overflow-hidden shadow-inner viz-container">
                                      {shouldRenderInIframe(message.visualization) ? (
                                         <iframe title="viz" srcDoc={toVisualizationSrcDoc(message.visualization)} className="w-full min-h-[600px] border-none bg-white rounded-xl shadow-soft-sm" sandbox="allow-scripts allow-same-origin" />
                                      ) : (
                                         <div className="bg-white p-6 rounded-xl shadow-soft-sm min-h-[600px] flex items-center justify-center" dangerouslySetInnerHTML={{ __html: message.visualization }} />
                                      )}
                                   </div>
                                </div>
                             )}
                          </div>
                       </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                   <div className="flex items-center gap-4 animate-fade-in">
                      <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                         <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                         </svg>
                      </div>
                      <div className="flex items-center gap-1.5">
                         <span className="text-xs font-black text-blue-500 uppercase tracking-widest">Agent Analyzing</span>
                         <div className="flex gap-1">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                         </div>
                      </div>
                   </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Updated Chart Rendering logic */}
        <style dangerouslySetInnerHTML={{ __html: `
          .viz-container iframe { min-height: 600px !important; }
        ` }} />


        {/* Floating Input Area */}
        <div className="absolute bottom-10 left-0 right-0 z-30 pointer-events-none">
          <div className="max-w-4xl mx-auto px-6 pointer-events-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-25 transition duration-700" />
              <div className="relative flex items-end gap-2 bg-white border border-slate-200 p-4 rounded-[2.2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)]">
                 <textarea
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    rows={1}
                    placeholder="Ask about your data..."
                    className="flex-1 bg-transparent border-none outline-none ring-0 focus:ring-0 p-4 font-bold text-[#1E3A8A] placeholder:text-slate-300 min-h-[56px] max-h-48 resize-none scrollbar-none"
                 />
                 <button 
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    className="w-14 h-14 rounded-2xl bg-[#1E3A8A] text-white flex items-center justify-center hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed group/btn"
                 >
                    <svg className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                 </button>
              </div>
            </div>
            <div className="mt-4 text-center">
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Press Enter to analyze and visualize</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;
