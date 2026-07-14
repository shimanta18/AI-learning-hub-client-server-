'use client';

import { useState } from 'react';

interface Course {
    id: string;
    title: string;
    category: string;
    progress: number; // 0 to 100
    totalLessons: number;
    completedLessons: number;
    lastActive: string;
    nextTopic: string;
    tags: string[];
}

export default function LearningProgressPage() {
    const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');

    // Realistic default dashboard milestones
    const courses: Course[] = [
        {
            id: 'swiftcart-fullstack',
            title: 'SwiftCart E-Commerce System Integration',
            category: 'Full-Stack Web Development',
            progress: 90,
            totalLessons: 20,
            completedLessons: 18,
            lastActive: '2 hours ago',
            nextTopic: 'Secure Webhook Webhook Triggers & Stripe Listeners',
            tags: ['Vite', 'React', 'Node.js', 'Express', 'MongoDB'],
        },
        {
            id: 'competitive-programming',
            title: 'Advanced Algorithms & Data Structures',
            category: 'Competitive Programming',
            progress: 65,
            totalLessons: 40,
            completedLessons: 26,
            lastActive: 'Yesterday',
            nextTopic: 'Segment Trees & Dynamic Programming Optimizations',
            tags: ['C++', 'LeetCode', 'CodeChef', 'Complexity Theory'],
        },
        {
            id: 'etuition-sysdesign',
            title: 'eTuitionBd Monolithic vs Microservices Architecture',
            category: 'System Design',
            progress: 100,
            totalLessons: 12,
            completedLessons: 12,
            lastActive: '3 days ago',
            nextTopic: 'Completed - System Defense & Deployment Specs Published',
            tags: ['System Design', 'API Gateways', 'Database Design'],
        },
        {
            id: 'school-solver-core',
            title: 'School Solver Interactive Study Framework',
            category: 'Interactive Tools',
            progress: 40,
            totalLessons: 15,
            completedLessons: 6,
            lastActive: '5 days ago',
            nextTopic: 'Structuring Context Timelines dynamically with historical datasets',
            tags: ['React Native', 'Data Structures', 'UX Design'],
        }
    ];

    const filteredCourses = courses.filter(course => {
        if (activeTab === 'in-progress') return course.progress < 100;
        if (activeTab === 'completed') return course.progress === 100;
        return true;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-300">

            {/* Dynamic Welcoming Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                    My Learning Progress
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Track your course completion metrics, active development projects, and earned credentials.
                </p>
            </div>

            {/* Stats Summary Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Courses Active</p>
                        <p className="text-xl font-bold text-slate-800">3 Courses</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Completed Paths</p>
                        <p className="text-xl font-bold text-slate-800">1 Completed</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Weekly Streak</p>
                        <p className="text-xl font-bold text-slate-800">5 Days 🔥</p>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-4">
                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-slate-400 uppercase">Global Badges</p>
                        <p className="text-xl font-bold text-slate-800">2 Professional</p>
                    </div>
                </div>
            </div>

            {/* Main Grid Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Left Side: Course Management & Active Milestones (2/3 width on large) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Navigation Tab Panel */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex space-x-2">
                            {(['all', 'in-progress', 'completed'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all capitalize ${activeTab === tab
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                        }`}
                                >
                                    {tab === 'in-progress' ? 'In Progress' : tab}
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-slate-400">
                            Showing {filteredCourses.length} entries
                        </span>
                    </div>

                    {/* Courses / Projects List Grid */}
                    <div className="space-y-4">
                        {filteredCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 transition-all shadow-2xs space-y-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                            {course.category}
                                        </span>
                                        <h3 className="text-base font-bold text-slate-800 mt-1">{course.title}</h3>
                                    </div>
                                    <span className="text-xs text-slate-400 font-medium">Active {course.lastActive}</span>
                                </div>

                                {/* Micro Progress Bar Rendering */}
                                <div className="space-y-1.5">
                                    <div className="flex justify-between text-xs font-semibold">
                                        <span className="text-slate-500">
                                            Module Lessons: {course.completedLessons}/{course.totalLessons} ({course.progress}%)
                                        </span>
                                        <span className="text-slate-800 font-bold">{course.progress}%</span>
                                    </div>
                                    {/* daisyUI dynamic progress styling */}
                                    <progress
                                        className={`progress w-full h-2 ${course.progress === 100 ? 'progress-success' : 'progress-primary'}`}
                                        value={course.progress}
                                        max="100"
                                    />
                                </div>

                                {/* Tech tags list */}
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {course.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Core Next Target Step Indicator */}
                                {course.progress < 100 ? (
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center justify-between text-xs gap-3">
                                        <div className="flex items-center space-x-2 text-slate-600">
                                            <svg className="w-4 h-4 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                            </svg>
                                            <p className="truncate">
                                                <span className="font-bold text-slate-700">Next:</span> {course.nextTopic}
                                            </p>
                                        </div>
                                        <button className="text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                                            Resume
                                        </button>
                                    </div>
                                ) : (
                                    <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 flex items-center space-x-2 text-xs text-emerald-700">
                                        <svg className="w-4 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <p className="font-semibold">Course path fully completed & certified.</p>
                                    </div>
                                )}
                            </div>
                        ))}

                        {filteredCourses.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                                <p className="text-sm font-medium text-slate-500">No courses matching this status were found.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side Panels: Study Streak and Credentials (1/3 width) */}
                <div className="space-y-6">

                    {/* Calendar Heatmap/Study Streak Panel */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Study Streak Consistency</h3>
                        <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-400 font-bold border-b border-slate-100 pb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {/* Streak box renders showing continuous progress block indicators */}
                            <div className="aspect-square bg-slate-100 rounded-md" title="No activity"></div>
                            <div className="aspect-square bg-slate-100 rounded-md" title="No activity"></div>
                            <div className="aspect-square bg-emerald-200 rounded-md" title="Partial study session"></div>
                            <div className="aspect-square bg-emerald-400 rounded-md" title="Standard study session"></div>
                            <div className="aspect-square bg-emerald-600 rounded-md" title="High-intensity learning session"></div>
                            <div className="aspect-square bg-emerald-600 rounded-md" title="High-intensity learning session"></div>
                            <div className="aspect-square bg-emerald-600 rounded-md" title="High-intensity learning session"></div>
                            {/* Second Row representing current week */}
                            <div className="aspect-square bg-emerald-600 rounded-md" title="High-intensity learning session"></div>
                            <div className="aspect-square bg-emerald-600 rounded-md" title="Current session running"></div>
                            <div className="aspect-square bg-slate-100 rounded-md"></div>
                            <div className="aspect-square bg-slate-100 rounded-md"></div>
                            <div className="aspect-square bg-slate-100 rounded-md"></div>
                            <div className="aspect-square bg-slate-100 rounded-md"></div>
                            <div className="aspect-square bg-slate-100 rounded-md"></div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                            <span>Less</span>
                            <div className="flex space-x-1">
                                <span className="w-2.5 h-2.5 bg-slate-100 rounded-xs"></span>
                                <span className="w-2.5 h-2.5 bg-emerald-200 rounded-xs"></span>
                                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-xs"></span>
                                <span className="w-2.5 h-2.5 bg-emerald-600 rounded-xs"></span>
                            </div>
                            <span>More</span>
                        </div>
                    </div>

                    {/* Verification Credentials Display Block */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                        <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Verified Credentials</h3>
                        <div className="space-y-3">

                            {/* Credential Card: Google AI Intensive */}
                            <div className="p-3 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors rounded-xl flex items-start space-x-3">
                                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                    </svg>
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <p className="text-xs font-bold text-slate-800 truncate">Google AI Intensive Certification</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Issued Dec 2025 • Credential Valid</p>
                                    <a href="#" className="inline-block text-[10px] text-blue-600 hover:text-blue-700 font-bold hover:underline pt-1">
                                        Verify Certificate →
                                    </a>
                                </div>
                            </div>

                            {/* Credential Card: HP Life Ambassador */}
                            <div className="p-3 border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors rounded-xl flex items-start space-x-3">
                                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg flex-shrink-0">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <p className="text-xs font-bold text-slate-800 truncate">HP LIFE Ambassador Badge</p>
                                    <p className="text-[10px] text-slate-400 font-medium">Issued Jan 2026 • Verified Honor</p>
                                    <a href="#" className="inline-block text-[10px] text-blue-600 hover:text-blue-700 font-bold hover:underline pt-1">
                                        View Badge Portal →
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}