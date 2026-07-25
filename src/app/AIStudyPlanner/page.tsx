'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { Sparkles, Clock, BookOpen, CheckCircle2, ArrowRight, Loader2, Lightbulb, ArrowLeft } from 'lucide-react';

interface Milestone {
    period: string;
    focusArea: string;
    tasks: string[];
    timeEstimate: string;
    proTip: string;
}

interface StudyPlan {
    planTitle: string;
    summary: string;
    milestones: Milestone[];
}

export default function AIStudyPlanner() {
    const router = useRouter();

    const [topic, setTopic] = useState('');
    const [duration, setDuration] = useState('7 Days');
    const [hoursPerDay, setHoursPerDay] = useState('2');
    const [experienceLevel, setExperienceLevel] = useState('Beginner');

    const [loading, setLoading] = useState(false);
    const [plan, setPlan] = useState<StudyPlan | null>(null);
    const [error, setError] = useState('');

    const handleGeneratePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setError('');
        setPlan(null);

        try {
            const auth = getAuth();
            const token = await auth.currentUser?.getIdToken();

            const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            const res = await fetch(`${API_BASE_URL}/api/v1/planner`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ topic, duration, hoursPerDay, experienceLevel })
            });

            const data = await res.json();
            if (data.success) {
                setPlan(data.plan);
            } else {
                throw new Error(data.message || 'Failed to generate study plan.');
            }
        } catch (err: any) {
            setError(err.message || 'Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-10 text-slate-900 dark:text-slate-100 font-sans">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all mb-6 cursor-pointer border border-slate-200 dark:border-slate-800"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
            </button>

            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Roadmap Generator</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-black">
                    Personalized Study Planner
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                    Enter what you want to learn and our AI will build a custom, structured schedule.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Form Controls */}
                <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                    <form onSubmit={handleGeneratePlan} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                What do you want to learn?
                            </label>
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="e.g., React & Next.js, Data Structures, Machine Learning"
                                required
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Timeline
                                </label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                                >
                                    <option value="3 Days">3 Days</option>
                                    <option value="7 Days">7 Days (1 Week)</option>
                                    <option value="14 Days">14 Days (2 Weeks)</option>
                                    <option value="1 Month">1 Month</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                    Hours / Day
                                </label>
                                <select
                                    value={hoursPerDay}
                                    onChange={(e) => setHoursPerDay(e.target.value)}
                                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white font-medium"
                                >
                                    <option value="1">1 hour</option>
                                    <option value="2">2 hours</option>
                                    <option value="4">4 hours</option>
                                    <option value="6">6+ hours</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                                Current Skill Level
                            </label>
                            <input
                                type="text"
                                value={experienceLevel}
                                onChange={(e) => setExperienceLevel(e.target.value)}
                                placeholder="e.g., Complete beginner, Intermediate programmer"
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !topic.trim()}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Generating Schedule...</span>
                                </>
                            ) : (
                                <>
                                    <span>Create Study Plan</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Roadmap Display */}
                <div className="lg:col-span-7 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {!plan && !loading && !error && (
                        <div className="min-h-[300px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-slate-900/20">
                            <BookOpen className="w-8 h-8 text-slate-400 mb-3" />
                            <h4 className="font-bold text-base mb-1">No Study Plan Generated Yet</h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                                Fill in your subject and goal on the left to generate your custom timeline.
                            </p>
                        </div>
                    )}

                    {loading && (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-20 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
                            <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
                        </div>
                    )}

                    {plan && !loading && (
                        <div className="space-y-6">
                            {/* Plan Title Header */}
                            <div className="bg-slate-950 text-white dark:bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
                                <h3 className="text-xl font-bold mb-1 text-white">{plan.planTitle}</h3>
                                <p className="text-slate-400 text-xs leading-relaxed">{plan.summary}</p>
                            </div>

                            {/* Timeline Items */}
                            <div className="space-y-4 relative before:absolute before:inset-0 before:left-4 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                                {plan.milestones.map((item, idx) => (
                                    <div key={idx} className="relative flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 z-10 mt-1">
                                            {idx + 1}
                                        </div>

                                        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm space-y-3">
                                            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                                                <div>
                                                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                                                        {item.period}
                                                    </span>
                                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                                                        {item.focusArea}
                                                    </h4>
                                                </div>
                                                <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                                                    <Clock className="w-3 h-3 text-slate-400" />
                                                    {item.timeEstimate}
                                                </span>
                                            </div>

                                            <ul className="space-y-1.5">
                                                {item.tasks.map((task, tIdx) => (
                                                    <li key={tIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                                                        <span>{task}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {item.proTip && (
                                                <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-start gap-1.5 text-[11px] bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 p-2 rounded-lg">
                                                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                                                    <span><strong>Tip:</strong> {item.proTip}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}