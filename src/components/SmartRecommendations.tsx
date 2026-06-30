'use client';

import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, BookOpen, GraduationCap, AlertCircle, HelpCircle } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface Recommendation {
    id: string;
    title: string;
    reasoning: string;
}

export default function SmartRecommendations() {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Use Firebase state listener to guarantee user context has fully loaded
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                // If it's still loading initially, wait. Otherwise set error.
                setError("No active authentication session detected. Please log in.");
                setLoading(false);
                return;
            }

            try {
                setError(null); // Reset past errors
                const token = await currentUser.getIdToken(true); // Force refresh token to clear old claims

                // Dynamic base URL check (uses Render on Vercel, falls back to local testing)
                const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

                const res = await fetch(`${API_BASE_URL}/api/v1/ai/recommendations`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (data.success) {
                    setRecommendations(data.recommendations || []);
                } else {
                    setError(data.message || "Failed to generate recommendations.");
                }
            } catch (err: any) {
                console.error("Error loading recommendations:", err);
                setError("Could not connect to server gateway.");
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm animate-pulse space-y-3 my-4">
                <div className="h-4 w-1/4 bg-slate-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="h-24 bg-slate-100 rounded-xl"></div>
                    <div className="h-24 bg-slate-100 rounded-xl"></div>
                </div>
            </div>
        );
    }

    /* --- VISUAL DEBUG BLOCKS --- */
    if (error) {
        return (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-xs border border-red-200 flex items-start gap-2 my-4">
                <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                    <span className="font-bold">AI Gateway Status:</span> {error}
                </div>
            </div>
        );
    }

    if (recommendations.length === 0) {
        return (
            <div className="bg-amber-50 text-amber-700 p-4 rounded-xl text-xs border border-amber-200 flex items-start gap-2 my-4">
                <HelpCircle size={16} className="mt-0.5 flex-shrink-0" />
                <div>
                    <span className="font-bold">No suggestions generated:</span> The route responded successfully, but returned an empty dataset. Check if your database contains matching collections.
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 my-6">
            {/* Header Section */}
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
                    <Sparkles size={16} className="animate-pulse" />
                </div>
                <div>
                    <h3 className="font-bold text-slate-800 text-sm">AI Smart Recommendations</h3>
                    <p className="text-[11px] text-slate-400">Tailored learning paths processed directly by Gemini Core</p>
                </div>
            </div>

            {/* Recommendations Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.map((rec) => (
                    <div
                        key={rec.id}
                        className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-400 transition-all group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <div className="p-2 bg-slate-50 text-slate-700 rounded-xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    <BookOpen size={16} />
                                </div>
                                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                    Next Step
                                </span>
                            </div>
                            <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                                {rec.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                {rec.reasoning}
                            </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-blue-600 transition-colors cursor-pointer">
                            <span className="flex items-center gap-1">
                                <GraduationCap size={14} /> Start learning module
                            </span>
                            <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}