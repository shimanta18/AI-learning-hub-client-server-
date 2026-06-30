'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AnalyticsChart from '../../../components/AnalyticsChart';
import SmartRecommendations from '../../../components/SmartRecommendations';
type Role = 'User' | 'Admin';

export default function DashboardPage() {
    const [role, setRole] = useState<Role>('User');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const email = currentUser.email?.toLowerCase() || '';
                setRole(email.includes('admin') ? 'Admin' : 'User');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) return null;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Title section */}
            <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight uppercase">
                    Workspace / <span className="text-slate-500 font-medium">{role} View</span>
                </h1>
                <p className="text-xs text-slate-500 mt-1">Welcome back! Here is your performance overview.</p>
            </div>

            {/* Clean White Chart Container */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <AnalyticsChart />
            </div>

            {/*  Conditionally display AI course insights only to regular users */}
            {role === 'User' && <SmartRecommendations />}

            {/* Role-Based Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {role === 'Admin' ? (
                    <>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Balance</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">$42,350.00</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Execution Tracks</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">18 Paths</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Server Matrix Load</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">99.94%</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Enrolled Courses</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">4 Active Paths</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Lessons</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">28 / 45</p>
                        </div>
                        <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Support Tokens</p>
                            <p className="text-2xl font-black text-slate-900 mt-1">14 Tokens</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}