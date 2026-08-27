'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import SmartRecommendations from '@/components/SmartRecommendations';

type Role = 'User' | 'Admin';

// Moved outside the component to prevent recreating on every render
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role>('User');
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (!currentUser) {
                router.push('/sign-in');
                return;
            }

            try {
                setUser(currentUser);
                const token = await currentUser.getIdToken();

                const response = await fetch(
                    `${API_BASE_URL}/api/v1/auth/me`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.ok) {
                    const result = await response.json();
                    const dbRole = result.role?.trim().toLowerCase();
                    setRole(dbRole === 'admin' ? 'Admin' : 'User');
                } else {
                    const email = currentUser.email?.toLowerCase() || '';
                    setRole(email.includes('admin') ? 'Admin' : 'User');
                }
            } catch (error) {
                console.error("Failed to verify admin status from database:", error);
                const email = currentUser.email?.toLowerCase() || '';
                setRole(email.includes('admin') ? 'Admin' : 'User');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push('/sign-in');
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
        <div className="w-full h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-hidden">

            {/* Global Dashboard Header */}
            <header className="w-full border-b border-slate-200 bg-white px-4 sm:px-6 py-4 flex items-center justify-between shadow-xs z-30 flex-shrink-0">
                <div className="flex items-center space-x-3">
                    {/* Mobile Hamburger Menu Toggle Trigger Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-1.5 md:hidden rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 focus:outline-none"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-[1.02]">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">LearningHub</span>
                    </Link>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4">
                    <span className="text-[11px] sm:text-xs text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-full border border-slate-200 font-medium max-w-[160px] sm:max-w-none truncate">
                        <span className="hidden xs:inline">Logged in as: </span>
                        <strong className="text-slate-700 font-bold">{user?.email}</strong>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-[11px] sm:text-xs bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg border border-red-200 transition-all font-semibold whitespace-nowrap"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Main Application Container Layout Frame */}
            <div className="flex flex-1 relative h-full overflow-hidden">

                {/* BACKDROP DIMMER SHEET */}
                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-20 md:hidden animate-in fade-in duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* SIDEBAR ACCORDION */}
                <aside className={`
                    fixed inset-y-0 left-0 w-64 bg-white p-6 border-r border-slate-200 z-20 flex flex-col space-y-6 flex-shrink-0
                    transform transition-transform duration-300 ease-in-out md:static md:transform-none
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <div className="space-y-2 pt-16 md:pt-0">
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
                                            ? 'bg-blue-50 text-blue-600 shadow-xs border-l-4 border-blue-600 rounded-l-none'
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

                {/* PRIMARY CANVAS LAYER */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto h-full">
                    <div className="max-w-7xl mx-auto w-full">
                        {children}

                        {/* Smart Recommendations Component injection */}
                        {pathname === '/dashboard' && (
                            <div className="mt-8 pt-4 border-t border-slate-200">
                                <SmartRecommendations />
                            </div>
                        )}
                    </div>
                </main>

            </div>
        </div>
    );
}