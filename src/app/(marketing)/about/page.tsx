'use client';

import Link from 'next/link';
import { ShieldMinus, FlaskConical, Heart } from 'lucide-react';

export default function AboutPage() {
    // Team data matching your presentation pane matrix layout
    const team = [
        { name: 'Amelia Tan', role: 'Research', initials: 'AT' },
        { name: 'Jordan Park', role: 'Engineering', initials: 'JP' },
        { name: 'Mei Chen', role: 'Curriculum', initials: 'MC' },
        { name: 'Henrik Vald', role: 'ML', initials: 'HV' },
        { name: 'Noor Hassan', role: 'Vision', initials: 'NH' },
        { name: 'Carla Mendes', role: 'Platform', initials: 'CM' },
    ];

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 selection:bg-slate-200">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-8 pt-20 pb-16">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
                    About
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 max-w-4xl leading-[1.1] mb-6">
                    We teach AI the way we wish we’d learned it.
                </h1>
                <p className="text-base sm:text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
                    LearningHub was started in 2024 by a small team of engineers and educators
                    tired of picking between vague YouTube tutorials and academic firehoses. We
                    sit in the middle: rigorous, hands-on, and respectful of your time.
                </p>
            </section>

            {/* THREE-CARD PILLAR GRID */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 border-t border-slate-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Pillar 1: Our Mission */}
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                            <ShieldMinus className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="text-base font-bold text-slate-950 tracking-tight">Our mission</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                            Make modern AI understandable to anyone willing to put in the focused hours — and only the focused hours.
                        </p>
                    </div>

                    {/* Pillar 2: Our Method */}
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                            <FlaskConical className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="text-base font-bold text-slate-950 tracking-tight">Our method</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                            Short lessons, runnable projects, an AI tutor that knows the course, and quizzes that find your gaps.
                        </p>
                    </div>

                    {/* Pillar 3: Our Promise */}
                    <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-4">
                        <div className="w-9 h-9 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center justify-center text-slate-700">
                            <Heart className="w-5 h-5 stroke-[2]" />
                        </div>
                        <h3 className="text-base font-bold text-slate-950 tracking-tight">Our promise</h3>
                        <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
                            Every course is taught by someone who has shipped what they teach. No theatrical experts.
                        </p>
                    </div>

                </div>
            </section>

            {/* TEAM SECTION */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
                <div className="p-8 sm:p-12 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col lg:flex-row lg:items-start justify-between gap-12">

                    {/* Left text column */}
                    <div className="max-w-md space-y-4">
                        <h2 className="text-3xl font-black text-slate-950">The team</h2>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            We are a remote team of nine across San Francisco, Berlin and Singapore.
                            Most of us still ship production code on the side — including the AI features
                            that power this platform.
                        </p>
                    </div>

                    {/* Right profile cards grid */}
                    <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
                        {team.map((member, idx) => (
                            <div
                                key={idx}
                                className="flex items-center space-x-3.5 p-3.5 border border-slate-100 rounded-xl bg-white"
                            >
                                <div className="w-9 h-9 rounded-full bg-slate-950 text-white text-[11px] font-black tracking-wider flex items-center justify-center select-none flex-shrink-0">
                                    {member.initials}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs sm:text-sm font-bold text-slate-950 tracking-tight">{member.name}</span>
                                    <span className="text-[11px] text-slate-400 font-semibold">{member.role}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* DARK CALL TO ACTION PANELS */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-20">
                <div className="w-full bg-slate-950 text-white p-8 sm:p-16 rounded-3xl space-y-6 relative overflow-hidden shadow-xl">
                    {/* Minimal backlighting bloom effect */}
                    <div className="absolute -right-32 -bottom-32 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

                    <h2 className="text-3xl sm:text-4xl font-black z-10 relative">
                        Learn something this weekend.
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium z-10 relative max-w-xl">
                        Start with a free course. The AI tutor is included from minute one.
                    </p>

                    <div className="pt-2 z-10 relative">
                        <Link
                            href="/courses"
                            className="inline-flex py-2.5 px-5 bg-slate-50 hover:bg-slate-200 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md"
                        >
                            Browse courses
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}