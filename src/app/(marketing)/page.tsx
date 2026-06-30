'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, ArrowRight, Star, Target, Trophy, Clock, Users } from 'lucide-react';

export default function Home() {
    const [activeTrack, setActiveTrack] = useState('LLMs & Agents');

    const tracks = [
        'Fundamentals', 'Machine Learning', 'Deep Learning',
        'LLMs & Agents', 'Computer Vision', 'MLOps',
        'Prompt Engineering', 'Data Science'
    ];

    const courses = [
        { id: 'AI', label: 'Fundamentals', badge: 'Beginner', title: 'AI Foundations: From Zero to Intuition', desc: 'Build a rock-solid mental model of how modern AI works.', rating: '4.8', reviews: '1,284', hours: '14h', learners: '18,420' },
        { id: 'PE', label: 'Prompt Engineering', badge: 'Intermediate', title: 'Prompt Engineering Pro', desc: 'Design prompts like a systems engineer.', rating: '4.9', reviews: '942', hours: '9h', learners: '12,810' },
        { id: 'LA', label: 'LLMs & Agents', badge: 'Advanced', title: 'Build Production LLM Agents', desc: 'From toy demos to agents that take real actions.', rating: '4.7', reviews: '612', hours: '18h', learners: '6,390' },
        { id: 'ML', label: 'Machine Learning', badge: 'Intermediate', title: 'Applied Machine Learning', desc: 'Take a messy dataset and ship a model that survives reality.', rating: '4.6', reviews: '1,108', hours: '16h', learners: '14,220' }
    ];

    // Filter courses that match the selected activeTrack state
    const filteredCourses = courses.filter(
        (course) => course.label.toLowerCase() === activeTrack.toLowerCase()
    );

    return (
        <div className="bg-white min-h-screen">
            {/* HERO SECTION */}
            <section className="max-w-[1400px] mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center space-x-2 text-xs font-bold tracking-wider text-slate-500 uppercase">
                        <span>AI-Powered Learning Hub</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl leading-[1.05] font-black text-slate-950">
                        Learn modern AI <br />
                        <span className="text-slate-400">without the hand-waving.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed">
                        Curated courses, a built-in AI tutor that answers your real questions, and quizzes that find your gaps.
                    </p>
                    <div className="pt-4 flex flex-wrap gap-4">
                        <Link href="/courses" className="px-6 py-3.5 bg-slate-950 text-white rounded-xl font-bold flex items-center space-x-2 hover:bg-slate-800 transition-colors shadow-sm">
                            <span>Browse courses</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <button className="px-6 py-3.5 bg-white border border-slate-200 text-slate-800 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-sm">
                            Try the AI tutor
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold text-sm">
                                <Bot className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-900">AI Tutor</h4>
                                <p className="text-xs text-slate-400">Online • answers in seconds</p>
                            </div>
                        </div>
                        <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold">Live</span>
                    </div>
                    <div className="space-y-4 text-sm">
                        <div className="flex justify-end">
                            <div className="bg-slate-100 text-slate-800 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%] font-medium">
                                What is overfitting, in plain English?
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <div className="bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[90%] leading-relaxed">
                                <strong>Tutor:</strong> Great question — let me unpack it step by step...
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHY PLATFORM FEATURES SECTION */}
            <section className="bg-white border-y border-slate-200 py-20">
                <div className="max-w-[1400px] mx-auto px-6 space-y-12">
                    <div className="space-y-2">
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block">Why LearningHub</span>
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900">A platform that respects your time</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-700">
                                <Bot className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900">AI tutor on every lesson</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Ask anything, get an answer grounded in the lesson.</p>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-700">
                                <Target className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900">Quizzes that find your gaps</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Auto-generated questions tuned to what you skimmed.</p>
                        </div>
                        <div className="bg-slate-50/50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm text-slate-700">
                                <Trophy className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900">Built by practitioners</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">Courses come from engineers shipping production AI.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRACK TRACKER INTERACTION */}
            <div className="w-full bg-white">
                <section className="max-w-[1400px] mx-auto px-6 py-20 space-y-8">
                    <div className="space-y-2">
                        <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block">Browse</span>
                        <h2 className="text-3xl font-black text-slate-900">Pick your track</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tracks.map((track) => (
                            <button
                                key={track}
                                onClick={() => setActiveTrack(track)}
                                className={`p-4 rounded-xl border text-left font-bold text-sm transition-all flex items-center justify-between shadow-sm ${activeTrack === track
                                        ? 'bg-slate-950 border-slate-950 text-white'
                                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                                    }`}
                            >
                                <span>{track}</span>
                                <ArrowRight className={`w-4 h-4 opacity-60 transition-transform ${activeTrack === track ? 'translate-x-0.5' : ''}`} />
                            </button>
                        ))}
                    </div>
                </section>
            </div>

            {/* MOST LOVED COURSES CARD GRID */}
            <section className="max-w-[1400px] mx-auto px-6 pb-24 space-y-8 bg-white">
                <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                        Most-loved courses this month
                    </h2>
                    <Link href="/courses" className="text-sm font-bold text-blue-600 hover:underline flex items-center space-x-1">
                        <span>See all</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {/* Check if there are courses matching the selected filter */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                        <p className="text-sm font-semibold text-slate-400">
                            No courses available for "{activeTrack}" yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <div key={course.id} className="bg-white border border-slate-200 rounded-2xl flex flex-col justify-between overflow-hidden shadow-sm group hover:shadow-md transition-shadow">
                                <div className="p-5 space-y-4">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="px-2.5 py-1 bg-slate-100 rounded-full font-medium text-slate-600">{course.label}</span>
                                        <span className="px-2.5 py-1 bg-slate-950 text-white rounded-full font-bold uppercase tracking-wider text-[9px]">{course.badge}</span>
                                    </div>
                                    <div className="h-32 bg-slate-100 rounded-xl flex items-center justify-center text-4xl font-black text-slate-400 select-none">
                                        {course.id}
                                    </div>
                                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1">
                                        {course.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{course.desc}</p>
                                </div>
                                <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                    <div className="flex items-center space-x-1">
                                        <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
                                        <span className="font-bold text-slate-800">{course.rating}</span>
                                        <span>({course.reviews})</span>
                                    </div>
                                    <div className="flex items-center space-x-3 font-medium">
                                        <span className="flex items-center space-x-1">
                                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{course.hours}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Users className="w-3.5 h-3.5 text-slate-400" />
                                            <span>{course.learners}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}