'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [topic, setTopic] = useState('General question');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle your message submission action logic here
        console.log({ name, email, topic, message });
    };

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 selection:bg-slate-200">

            {/* HERO INTRODUCTION HEADER */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 pb-12">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
                    Contact
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-semibold mb-4">
                    Let’s talk.
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                    Questions about a course, custom training for your team, or press? We reply within one business day.
                </p>
            </section>

            {/* TWO COLUMN INTERACTIVE FORM MATRIX */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT COLUMN: CONTACT INPUT FORM CARD */}
                    <div className="lg:col-span-7 bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Input: Name */}
                            <div className="space-y-1.5">
                                <label htmlFor="name" className="text-xs font-bold text-slate-950 tracking-tight">
                                    Your name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Ada Lovelace"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                                    required
                                />
                            </div>

                            {/* Input: Email */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="text-xs font-bold text-slate-950 tracking-tight">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="ada@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                                    required
                                />
                            </div>

                            {/* Input: Topic Selector Dropdown */}
                            <div className="space-y-1.5">
                                <label htmlFor="topic" className="text-xs font-bold text-slate-950 tracking-tight">
                                    Topic
                                </label>
                                <div className="relative">
                                    <select
                                        id="topic"
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 appearance-none focus:outline-none focus:border-slate-300 transition-colors cursor-pointer"
                                    >
                                        <option value="General question">General question</option>
                                        <option value="Custom team training">Custom team training</option>
                                        <option value="Course support">Course support</option>
                                        <option value="Press inquiry">Press inquiry</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                                        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Input: Message Textarea */}
                            <div className="space-y-1.5">
                                <label htmlFor="message" className="text-xs font-bold text-slate-950 tracking-tight">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="How can we help?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Submit Button Layout Row */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                                >
                                    Send message
                                </button>
                            </div>

                        </form>
                    </div>

                    {/* RIGHT COLUMN: DETAIL CARD STACK MODULES */}
                    <div className="lg:col-span-5 space-y-4">

                        {/* Info Block: Email */}
                        <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-3">
                            <div className="w-8 h-8 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs font-bold text-slate-950 tracking-tight">Email</span>
                                <a href="mailto:hello@learninghub.example" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                                    hello@learninghub.example
                                </a>
                                <a href="mailto:support@learninghub.example" className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                                    support@learninghub.example
                                </a>
                            </div>
                        </div>

                        {/* Info Block: Phone */}
                        <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-3">
                            <div className="w-8 h-8 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                            </div>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs font-bold text-slate-950 tracking-tight">Phone</span>
                                <span className="text-xs font-semibold text-slate-500">+1 (415) 555-0117</span>
                                <span className="text-[11px] text-slate-400 font-medium">Mon–Fri · 9am–6pm PT</span>
                            </div>
                        </div>

                        {/* Info Block: Office Address */}
                        <div className="p-5 border border-slate-100 rounded-2xl bg-white shadow-sm space-y-3">
                            <div className="w-8 h-8 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col space-y-0.5">
                                <span className="text-xs font-bold text-slate-950 tracking-tight">Office</span>
                                <span className="text-xs font-semibold text-slate-500">548 Market St</span>
                                <span className="text-xs font-semibold text-slate-500">San Francisco, CA 94104</span>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

        </div>
    );
}