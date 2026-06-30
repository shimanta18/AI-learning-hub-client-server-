'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailsPage() {
    const params = useParams();
    const courseId = params?.id as string;

    // Hardcoded dataset matching your Home array for seamless lookups
    const coursesData: Record<string, any> = {
        'AI': { id: 'AI', label: 'Fundamentals', badge: 'Beginner', title: 'AI Foundations: From Zero to Intuition', desc: 'Build a rock-solid mental model of how modern AI works.', rating: '4.8', reviews: '1,284', hours: '14h', learners: '18,420', fullDesc: 'Go from absolute zero background to a clear, conceptual understanding of neural networks, transformers, and large language models. This course intentionally skips dense academic jargon and focuses strictly on intuition, visual structures, and underlying logic.', outcomes: ['Understand how deep neural networks process information', 'Grasp the core mechanics of Transformers and self-attention', 'Evaluate AI model gaps and performance drop-offs confidently'], price: 'Free' },
        'PE': { id: 'PE', label: 'Prompt Engineering', badge: 'Intermediate', title: 'Prompt Engineering Pro', desc: 'Design prompts like a systems engineer.', rating: '4.9', reviews: '942', hours: '9h', learners: '12,810', fullDesc: 'Prompting isn\'t just typing instructions; it\'s configuration engineering. Learn how to write advanced structural templates, design stable system messages, leverage few-shot parsing, and construct precise programmatic schemas for real software integration.', outcomes: ['Build robust, system-grade instructions for production models', 'Implement reliable Chain-of-Thought reasoning schemas', 'Control deterministic JSON output structures natively'], price: '$49' },
        'LA': { id: 'LA', label: 'LLMs & Agents', badge: 'Advanced', title: 'Build Production LLM Agents', desc: 'From toy demos to agents that take real actions.', rating: '4.7', reviews: '612', hours: '18h', learners: '6,390', fullDesc: 'Move beyond simple text completion loops. This course guides you step-by-step through architecting full-fledged AI autonomous agents capable of state preservation, programmatic tool selection, multi-agent debate setups, and external API execution.', outcomes: ['Architect production-ready autonomous agent loops from scratch', 'Integrate memory states and reliable external API routing layers', 'Deconstruct complex multi-agent frameworks cleanly'], price: '$99' },
        'ML': { id: 'ML', label: 'Machine Learning', badge: 'Intermediate', title: 'Applied Machine Learning', desc: 'Take a messy dataset and ship a model that survives reality.', rating: '4.6', reviews: '1,108', hours: '16h', learners: '14,220', fullDesc: 'Real-world data is deeply fragmented, inconsistent, and messy. Learn how to parse production pipelines, run robust validation testing, catch training distributions early, and confidently package functional machine learning models into production servers.', outcomes: ['Transform chaotic raw inputs into valid production feature sets', 'Diagnose complex dataset shifts and model degradation errors', 'Build microservice containers to wrap live ML inferences'], price: '$79' }
    };

    // Grab specific course data fallback safely
    const course = coursesData[courseId?.toUpperCase()] || coursesData['AI'];

    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');

    return (
        <div className="w-full bg-white text-slate-900 min-h-screen">
            {/*  BREADCRUMB / ACCENT BACKGROUND */}
            <div className="border-b border-slate-100 bg-slate-50/50">
                <div className="max-w-[1400px] mx-auto px-6 py-6 text-sm font-semibold text-slate-500 flex items-center space-x-2">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-bold truncate">{course.title}</span>
                </div>
            </div>

            {/*  CONTENT HERO GRID */}
            <main className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                {/* LEFT: MAIN SCHEMATICS */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">{course.label}</span>
                        <span className="px-2.5 py-0.5 bg-slate-950 text-white rounded-md text-[10px] font-black tracking-widest uppercase">{course.badge}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl">
                        {course.title}
                    </h1>

                    <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                        {course.desc}
                    </p>

                    {/* STAT CHIPS */}
                    <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 text-sm font-bold text-slate-600">
                        <div className="flex items-center space-x-1.5">
                            <span className="text-amber-500 text-lg">★</span>
                            <span className="text-slate-900">{course.rating}</span>
                            <span className="text-slate-400 font-medium">({course.reviews} ratings)</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                        <div className="flex items-center space-x-2">
                            <span>Duration:</span>
                            <span className="text-slate-900">{course.hours}</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                        <div className="flex items-center space-x-2">
                            <span> Active Learners:</span>
                            <span className="text-slate-900">{course.learners}</span>
                        </div>
                    </div>

                    {/* CONTENT SEPARATION TABS */}
                    <div className="space-y-6 pt-4">
                        <div className="flex space-x-6 border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-3.5 text-sm font-black tracking-wide border-b-2 transition-all ${activeTab === 'overview' ? 'border-slate-950 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('curriculum')}
                                className={`pb-3.5 text-sm font-black tracking-wide border-b-2 transition-all ${activeTab === 'curriculum' ? 'border-slate-950 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Curriculum
                            </button>
                        </div>

                        {activeTab === 'overview' ? (
                            <div className="space-y-8 animate-in fade-in duration-200">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed text-base font-medium">{course.fullDesc}</p>
                                </div>
                                <div className="space-y-4 bg-slate-50/60 border border-slate-200/60 rounded-2xl p-6">
                                    <h3 className="text-base font-black text-slate-900 uppercase tracking-wider">What you will build & learn</h3>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-bold text-slate-700">
                                        {course.outcomes.map((outcome: string, index: number) => (
                                            <li key={index} className="flex items-start space-x-2.5">
                                                <span className="text-blue-600 mt-0.5">✔</span>
                                                <span className="font-semibold text-slate-600 leading-normal">{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in duration-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Syllabus breakdown</h3>
                                {[
                                    { step: '01', title: 'Foundations & Architecture Setups', count: '4 lessons' },
                                    { step: '02', title: 'Deep-Dive Execution Frameworks', count: '6 lessons' },
                                    { step: '03', title: 'Production Edge Deployment & Testing', count: '3 lessons' }
                                ].map((module, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white shadow-sm">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-xs font-black text-slate-400 bg-slate-50 h-8 w-8 rounded-lg flex items-center justify-center border border-slate-100">{module.step}</span>
                                            <span className="font-bold text-sm text-slate-800">{module.title}</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100/70 px-2 py-1 rounded-md">{module.count}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: FLOATING CHECKOUT CARD */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-[16/10] bg-slate-950 flex items-center justify-center text-5xl font-black text-slate-700/60 select-none tracking-widest relative">
                        {course.id}
                        <div className="absolute top-4 left-4 flex items-center space-x-1.5 bg-white/10 backdrop-blur-md text-white rounded-lg px-2.5 py-1 text-[11px] font-bold">
                            <span> Live Interactive Sandbox</span>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-bold text-slate-400">Access Tier</span>
                            <span className="text-3xl font-black text-slate-900">{course.price}</span>
                        </div>

                        <button className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-black text-sm rounded-xl transition-all shadow-md transform active:scale-[0.99] flex items-center justify-center space-x-2">
                            <span>Enroll in Course</span>
                            <span></span>
                        </button>

                        <div className="space-y-3.5 text-xs font-bold text-slate-500 pt-2 border-t border-slate-100">
                            <div className="flex items-center space-x-2">
                                <span></span>
                                <span>100% online self-paced program</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span></span>
                                <span>Verified Course Completion Certificate</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span></span>
                                <span>Direct 24/7 access to built-in AI Systems Tutor</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}