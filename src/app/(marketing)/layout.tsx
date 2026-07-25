'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import ThemeToggle from '@/components/ThemeToggle';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const resourcesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
                setResourcesOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            unsubscribe();
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            setDropdownOpen(false);
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    return (
        <>
            {/* NAVBAR */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white dark:border-slate-900 dark:bg-slate-950 transition-colors duration-200">
                <div className="max-w-[1400px] mx-auto h-20 px-6 flex items-center justify-between">

                    {/* LOGO */}
                    <Link href="/" className="flex items-center space-x-3 group z-50" onClick={() => setMobileMenuOpen(false)}>
                        <div className="w-10 h-10 rounded-xl bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950 flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-[1.02]">
                            <svg className="w-5 h-5 text-white dark:text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">LearningHub</span>
                    </Link>

                    {/* DESKTOP NAVIGATION */}
                    <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
                        <Link href="/courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">Courses</Link>
                        <Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link>
                        <Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>

                        {/* DESKTOP RESOURCES DROPDOWN */}
                        <div className="relative" ref={resourcesRef}>
                            <button onClick={() => setResourcesOpen(!resourcesOpen)} className="flex items-center space-x-1 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors py-2 focus:outline-none">
                                <span>Resources</span>
                                <span className={`text-[10px] text-slate-400 transition-transform duration-150 ${resourcesOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {resourcesOpen && (
                                <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
                                    <Link href="/faq" onClick={() => setResourcesOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Help & FAQ</Link>
                                    <Link href="/courses" onClick={() => setResourcesOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">All courses</Link>
                                    <Link href="/AIStudyPlanner" onClick={() => setResourcesOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white">Study Planner</Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* ACTIONS CONTAINER */}
                    <div className="flex items-center space-x-4 sm:space-x-6 z-50">
                        <ThemeToggle />

                        {loading ? (
                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                        ) : user ? (
                            /* PROFILE DROPDOWN */
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center border-2 border-white dark:border-slate-950 shadow-sm focus:outline-none transition-transform hover:scale-105">
                                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
                                        <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                                            <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{user.email}</p>
                                        </div>

                                        <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Dashboard
                                        </Link>

                                        <button onClick={handleLogOut} className="w-full text-left flex items-center gap-2.5 px-4 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-red-50/60 dark:hover:bg-red-950/30 transition-colors border-t border-slate-100 dark:border-slate-800">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* AUTH TRIGGER ACTIONS */
                            <div className="hidden sm:flex items-center space-x-6">
                                <Link href="/sign-in" className="text-sm font-bold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">Sign in</Link>
                                <Link href="/sign-up" className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-950 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold text-sm rounded-xl transition-all shadow-sm">Start learning</Link>
                            </div>
                        )}

                        {/* MOBILE HAMBURGER MENU BUTTON */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl border border-slate-100 text-slate-700 dark:border-slate-800 dark:text-slate-300 focus:outline-none"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU INTERFACING CONTAINER */}
                {mobileMenuOpen && (
                    <div className="md:hidden fixed inset-0 top-20 bg-white dark:bg-slate-950 z-40 px-6 py-8 flex flex-col space-y-6 animate-fadeIn">
                        <nav className="flex flex-col space-y-5 text-lg font-bold text-slate-900 dark:text-slate-100">
                            <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors">Courses</Link>
                            <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors">Blog</Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors">About</Link>
                            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 transition-colors">Contact</Link>
                            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />
                            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600">Help & FAQ</Link>
                            <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600">All courses</Link>
                        </nav>

                        {!user && (
                            <div className="flex flex-col space-y-4 pt-6 mt-auto">
                                <Link href="/sign-in" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center text-sm font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl">Sign in</Link>
                                <Link href="/sign-up" onClick={() => setMobileMenuOpen(false)} className="w-full py-3 text-center text-sm font-bold bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950 rounded-xl">Start learning</Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            {/* PAGE INTERNALS */}
            <main className="flex-1 flex flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
                {children}
            </main>

            {/* FOOTER */}
            <footer className="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 mt-auto transition-colors duration-200">
                <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
                        <div className="md:col-span-5 space-y-5">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-950 dark:bg-slate-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white dark:text-slate-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">LearningHub</span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                                An AI-powered learning hub for engineers, designers and curious individuals who want to build real systems.
                            </p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Learn</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <li><Link href="/courses" className="hover:text-slate-900 dark:hover:text-white transition-colors">All courses</Link></li>
                                    <li><Link href="/blog" className="hover:text-slate-900 dark:hover:text-white transition-colors">Blog</Link></li>
                                    <li><Link href="/faq" className="hover:text-slate-900 dark:hover:text-white transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Company</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <li><Link href="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors">About</Link></li>
                                    <li><Link href="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Contact</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                                    <li className="text-slate-600 dark:text-slate-300 break-all">hello@learninghub.edu</li>
                                    <li className="text-slate-400 dark:text-slate-500">Dhaka, Bangladesh</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400 dark:text-slate-500">
                        <div>© 2026 LearningHub. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </>
    );
}