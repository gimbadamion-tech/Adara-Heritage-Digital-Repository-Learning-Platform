
import React, { useState, useEffect, useRef } from 'react';
import { User, CommunityMessage } from '../types';

interface CommunityChatProps {
  user: User;
  village: string;
}

const CommunityChat: React.FC<CommunityChatProps> = ({ user, village }) => {
  const [messages, setMessages] = useState<CommunityMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial mock messages
    const mockMessages: CommunityMessage[] = [
      { id: '1', senderId: '0', senderName: 'Heritage Bot', text: `Welcome to the ${village} community chat. Connect with your kin!`, timestamp: Date.now() - 100000, village },
    ];
    setMessages(mockMessages);
  }, [village]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage: CommunityMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      text: input,
      timestamp: Date.now(),
      village
    };
    
    setMessages([...messages, newMessage]);
    setInput('');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl flex flex-col h-[500px] overflow-hidden">
      <div className="bg-slate-50 px-4 py-3 border-b flex items-center justify-between">
        <h3 className="font-bold text-emerald-800 flex items-center">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          {village} Discussion
        </h3>
        <span className="text-xs text-slate-500">Live</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.senderId === user.id ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-slate-400 mb-1 px-1">{msg.senderName}</span>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.senderId === user.id 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-400 mt-1">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t bg-slate-50 flex space-x-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button 
          onClick={handleSend}
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CommunityChat;
