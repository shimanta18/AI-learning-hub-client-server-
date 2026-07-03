'use client';
import { useState } from 'react';
import { getAuth } from 'firebase/auth'; // Adjust this import based on your frontend firebase config file

interface Message {
    role: 'user' | 'ai';
    content: string;
}

export default function AIChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hello! I am your AI Learning Assistant. How can I help you today?' }
    ]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const auth = getAuth();
        const userMsg: Message = { role: 'user', content: input };
        const newHistory = [...messages, userMsg];
        setMessages(newHistory);
        setInput('');
        setLoading(true);

        try {
            // Get the secure Firebase ID Token to pass through your auth middleware
            const token = await auth.currentUser?.getIdToken();

            // Dynamic base URL check (uses Render on Vercel, falls back to local testing)
            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const response = await fetch(`${API_BASE_URL}/api/v1/ai/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    message: userMsg.content,
                    history: messages.map(m => ({ role: m.role, content: m.content }))
                })
            });

            const data = await response.json();
            if (data.success) {
                setMessages([...newHistory, { role: 'ai', content: data.reply }]);
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            setMessages([...newHistory, { role: 'ai', content: 'Connection lost. Please try again.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            {isOpen ? (
                <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden transition-all duration-300">
                    {/* Header */}
                    <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                            <span className="font-bold text-sm">LearningHub AI</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-slate-300 hover:text-white text-xs">✕</button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
                        {messages.map((msg, i) => (
                            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`text-xs px-3 py-2 rounded-xl max-w-[85%] leading-relaxed ${msg.role === 'user'
                                    ? 'bg-blue-600 text-white rounded-br-none'
                                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-slate-200 text-slate-500 text-[10px] px-3 py-1.5 rounded-xl rounded-bl-none animate-pulse">
                                    AI is typing...
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={sendMessage} className="p-3 border-t border-slate-200 bg-white flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 text-sm outline-none px-3 py-2 bg-slate-100 rounded-lg focus:ring-2 focus:ring-blue-500/20 text-slate-800"
                        />
                        <button type="submit" disabled={loading} className="bg-slate-900 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors">
                            ↑
                        </button>
                    </form>
                </div>
            ) : (
                /* Floating Button Trigger */
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 group"
                >
                    <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                </button>
            )}
        </div>
    );
}