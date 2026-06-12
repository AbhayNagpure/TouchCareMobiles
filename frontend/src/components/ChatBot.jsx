import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Mic, MicOff, Bot, User } from 'lucide-react';
import axios from 'axios';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm the MCT Assistant. How can I help you today? (Aap Hindi mein bhi pooch sakte hain!)", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Speech Recognition Setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'hi-IN'; // Better for Hinglish/Hindi
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + (prev ? ' ' : '') + transcript);
    };
  }

  const toggleListen = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { text: userText, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/v1/chat/message', { message: userText });
      if (response.data.success) {
        setMessages(prev => [...prev, { text: response.data.reply, isBot: true }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting to the server. Please try again later.", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 md:bottom-24 right-4 md:right-6 w-[calc(100vw-32px)] md:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MCT Assistant</h3>
                  <p className="text-[10px] text-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#0a0a0a]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 max-w-[85%] ${msg.isBot ? 'self-start' : 'self-end ml-auto flex-row-reverse'}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isBot ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                    {msg.isBot ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-tl-none text-slate-700 dark:text-slate-200' : 'bg-blue-600 text-white rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2 max-w-[85%] self-start">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Bot size={14} />
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-300 dark:bg-slate-500 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              {recognition && (
                <button
                  type="button"
                  onClick={toggleListen}
                  className={`p-2 rounded-full transition-colors flex-shrink-0 ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  {isListening ? <Mic size={20} /> : <MicOff size={20} />}
                </button>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about repairs..."
                className="flex-1 min-w-0 bg-slate-100 dark:bg-slate-800 text-sm px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-700 dark:text-slate-200"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2 bg-blue-600 text-white rounded-full flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
