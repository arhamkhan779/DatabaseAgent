import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const quickActions = [
    "Analyze my database",
    "Show me query examples",
    "Explain database structure",
    "Performance tips",
    "Data visualization",
    "Export data"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Set dark mode on HTML element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getDummyResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('database') || lowerMessage.includes('analyze')) {
      return `I've analyzed your database structure. Here's what I found:\n\n• **Total Tables**: 12\n• **Total Records**: 45,234\n• **Database Size**: 2.3 GB\n\nYour database appears to be well-structured with proper indexing on key columns. The main tables include Users, Orders, Products, and Transactions. Would you like me to dive deeper into any specific table or generate a query?`;
    } else if (lowerMessage.includes('query') || lowerMessage.includes('sql')) {
      return `Here are some example SQL queries you can use:\n\n\`\`\`sql\n-- Get top 10 customers by order value\nSELECT customer_id, SUM(total_amount) as total_spent\nFROM orders\nGROUP BY customer_id\nORDER BY total_spent DESC\nLIMIT 10;\n\`\`\`\n\nThis query will help you identify your most valuable customers. Would you like me to explain how it works or generate a different query?`;
    } else if (lowerMessage.includes('structure') || lowerMessage.includes('schema')) {
      return `Your database schema consists of the following main entities:\n\n**Users Table**\n- user_id (Primary Key)\n- username, email, created_at\n- Total records: 8,523\n\n**Orders Table**\n- order_id (Primary Key)\n- user_id (Foreign Key)\n- order_date, total_amount, status\n- Total records: 24,156\n\n**Products Table**\n- product_id (Primary Key)\n- name, price, category, stock\n- Total records: 1,234\n\nWould you like me to show the relationships between these tables?`;
    } else if (lowerMessage.includes('performance') || lowerMessage.includes('optimize')) {
      return `Here are some performance optimization tips for your database:\n\n1. **Indexing**: Add indexes on frequently queried columns (user_id, order_date)\n2. **Query Optimization**: Use EXPLAIN to analyze slow queries\n3. **Caching**: Implement Redis for frequently accessed data\n4. **Connection Pooling**: Configure connection pools to reduce overhead\n5. **Partitioning**: Consider table partitioning for large tables\n\nYour current query response time averages 120ms, which is good. Would you like me to analyze specific slow queries?`;
    } else if (lowerMessage.includes('visualization') || lowerMessage.includes('chart')) {
      return `I can help you visualize your data! Here are some visualization options:\n\n📊 **Available Charts**:\n- Sales trends over time (Line chart)\n- Revenue by category (Pie chart)\n- Customer distribution (Bar chart)\n- Order status breakdown (Donut chart)\n\n📈 **Key Metrics**:\n- Monthly growth rate: +12.5%\n- Average order value: $84.32\n- Customer retention: 68%\n\nWhich visualization would you like me to generate first?`;
    } else if (lowerMessage.includes('export') || lowerMessage.includes('download')) {
      return `I can export your data in multiple formats:\n\n**Available Export Formats**:\n✓ CSV (Comma-Separated Values)\n✓ JSON (JavaScript Object Notation)\n✓ Excel (.xlsx)\n✓ PDF Report\n\n**Export Options**:\n- Full database export\n- Filtered data by date range\n- Specific tables only\n- Query results export\n\nWhich format and data would you like to export?`;
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! 👋 I'm your Database Agent assistant. I'm here to help you with:\n\n• Database analysis and insights\n• SQL query generation\n• Performance optimization\n• Data visualization\n• Schema exploration\n• Export and reporting\n\nWhat would you like to explore today?`;
    } else {
      return `Thank you for your question! I understand you're asking about "${userMessage}".\n\nAs your Database Agent, I can help you with comprehensive database management tasks including:\n\n🔍 **Analysis**: Deep dive into your data structure and patterns\n📝 **Queries**: Generate and optimize SQL queries\n⚡ **Performance**: Identify bottlenecks and suggest improvements\n📊 **Insights**: Provide actionable insights from your data\n\nCould you provide more details about what specific aspect you'd like me to help with?`;
    }
  };

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputValue.trim();
    
    if (!textToSend) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getDummyResponse(textToSend),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Database Agent</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">AI-Powered Database Assistant</p>
          </div>
        </div>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 scrollbar-thin">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 sm:py-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Hi there. What should we dive into today?
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
                I'm your AI-powered database assistant. Ask me anything about your database, 
                and I'll help you analyze, optimize, and understand your data better.
              </p>
              
              {/* Quick Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full max-w-3xl mt-6">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action)}
                    className="px-4 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             rounded-xl border border-gray-200 dark:border-gray-700 
                             hover:border-blue-500 dark:hover:border-blue-500 
                             hover:shadow-lg transition-all duration-200 text-sm font-medium
                             hover:scale-105 active:scale-95"
                  >
                    {action}
                  </button>
                ))}
              </div>
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
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-green-400 to-blue-500'
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
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
                      className={`px-4 py-3 rounded-2xl shadow-sm ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="text-sm sm:text-base whitespace-pre-wrap break-words leading-relaxed">
                        {message.text}
                      </p>
                      <p
                        className={`text-xs mt-2 ${
                          message.sender === 'user'
                            ? 'text-blue-100'
                            : 'text-gray-500 dark:text-gray-400'
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4 shadow-lg">
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
                className="w-full px-4 py-3 pr-12 bg-gray-100 dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100 rounded-2xl 
                         border-2 border-transparent focus:border-blue-500 
                         focus:outline-none resize-none text-sm sm:text-base
                         placeholder-gray-500 dark:placeholder-gray-400
                         transition-all duration-200 min-h-[48px] max-h-[120px]"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
              />
              {inputValue && (
                <button
                  onClick={() => setInputValue('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
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
              className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-blue-600 
                       text-white rounded-2xl hover:from-blue-600 hover:to-blue-700 
                       disabled:opacity-50 disabled:cursor-not-allowed 
                       transition-all duration-200 shadow-lg hover:shadow-xl
                       hover:scale-105 active:scale-95"
              aria-label="Send message"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
