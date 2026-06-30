'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import SmartRecommendations from '@/components/SmartRecommendations';

type Role = 'User' | 'Admin';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role>('User');
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    // Dynamic base URL check (uses live production URL environment variable or local port fallback)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/login');
                return;
            }

            try {
                setUser(currentUser);
                const token = await currentUser.getIdToken();

                const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    const dbRole = result.role?.trim().toLowerCase();
                    setRole(dbRole === 'admin' ? 'Admin' : 'User');
                } else {
                    // Fallback to email validation if backend responds with an error status
                    const email = currentUser.email?.toLowerCase() || '';
                    setRole(email.includes('admin') ? 'Admin' : 'User');
                }
            } catch (error) {
                console.error("Failed to verify admin status from database:", error);
                // Fallback to email validation if network/server is completely unreachable
                const email = currentUser.email?.toLowerCase() || '';
                setRole(email.includes('admin') ? 'Admin' : 'User');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router, API_BASE_URL]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/login');
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const adminMenus = [
        { name: ' Overview Metrics', href: '/dashboard' },
        { name: ' Analytics & Reports', href: '/dashboard/analytics' },
        { name: ' Manage Courses', href: '/dashboard/courses' },
        { name: ' System Core Logs', href: '/dashboard/logs' },
        { name: ' Edit Profile', href: '/dashboard/profile' },
    ];

    const userMenus = [
        { name: ' Overview Metrics', href: '/dashboard' },
        { name: ' My Learning Progress', href: '/dashboard/learning' },
        { name: ' Edit Profile', href: '/dashboard/profile' },
    ];

    const currentMenus = role === 'Admin' ? adminMenus : userMenus;

    return (
        <div className="w-full min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            {/* Global Dashboard Header */}
            <header className="w-full border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center space-x-3">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-[1.02]">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-slate-900">LearningHub</span>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 font-medium">
                        Logged in as: <strong className="text-slate-700">{user?.email}</strong>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-xs bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-lg border border-red-200 transition-all font-semibold"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Layout Wrapper */}
            <div className="flex flex-1">
                {/* Context-Aware Sidebar */}
                <aside className="w-64 border-r border-slate-200 bg-white p-6 flex flex-col space-y-6">
                    <div className="space-y-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3">
                            {role} Panel
                        </span>
                        <nav className="space-y-1">
                            {currentMenus.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`w-full block px-3 py-2.5 text-xs font-semibold rounded-lg transition-all ${isActive
                                            ? 'bg-blue-50 text-blue-600 shadow-sm border-l-4 border-blue-600 rounded-l-none'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Primary Panel Content */}
                <main className="flex-1 p-8 overflow-y-auto">
                    {children}

                    {/* Dashboard-level Recommendation Extensions */}
                    {pathname === '/dashboard' && (
                        <div className="mt-8 pt-4 border-t border-slate-200">
                            <SmartRecommendations />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}