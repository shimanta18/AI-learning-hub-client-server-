'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [resourcesOpen, setResourcesOpen] = useState(false);

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
            {/*  NAVBAR */}
            <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
                <div className="max-w-[1400px] mx-auto h-20 px-6 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-[1.02]">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight text-slate-900">LearningHub</span>
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
                        <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
                        <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
                        <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
                        <Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link>

                        <div className="relative" ref={resourcesRef}>
                            <button onClick={() => setResourcesOpen(!resourcesOpen)} className="flex items-center space-x-1 cursor-pointer hover:text-slate-900 transition-colors py-2 focus:outline-none">
                                <span>Resources</span>
                                <span className={`text-[10px] text-slate-400 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {resourcesOpen && (
                                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                                    <Link href="/faq" onClick={() => setResourcesOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">Help & FAQ</Link>
                                    <Link href="/tutorials" onClick={() => setResourcesOpen(false)} className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900">Tutorials</Link>
                                </div>
                            )}
                        </div>
                    </nav>

                    <div className="flex items-center space-x-6">
                        {loading ? (
                            <div className="h-10 w-10 rounded-full bg-slate-100 animate-pulse" />
                        ) : user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center border-2 border-white shadow-sm focus:outline-none transition-transform hover:scale-105">
                                    {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                                        <div className="px-4 py-2.5 border-b border-slate-100">
                                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                                            <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                                        </div>
                                        <Link href="/dashboard" onClick={() => setDropdownOpen(false)} className="w-full text-left flex items-center px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors">📊 Dashboard</Link>
                                        <button onClick={handleLogOut} className="w-full text-left flex items-center px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50/60 transition-colors border-t border-slate-100">🇲 Sign Out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link href="/sign-in" className="text-sm font-bold text-slate-700 hover:text-slate-900 transition-colors">Sign in</Link>
                                <Link href="/sign-up" className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm">Start learning</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/*  PAGE INTERNALS */}
            <main className="flex-1 flex flex-col">
                {children}
            </main>

            {/*  FOOTER */}
            <footer className="w-full bg-white border-t border-slate-200 mt-auto">
                <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
                        <div className="md:col-span-5 space-y-5">
                            <div className="flex items-center space-x-3">
                                <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                                <span className="text-lg font-bold text-slate-900 tracking-tight">LearningHub</span>
                            </div>
                            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
                                An AI-powered learning hub for engineers, designers and curious individuals who want to build real systems.
                            </p>
                        </div>
                        <div className="md:col-span-7 grid grid-cols-3 gap-6">
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 tracking-wide">Learn</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                                    <li><Link href="/courses" className="hover:text-slate-900 transition-colors">All courses</Link></li>
                                    <li><Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link></li>
                                    <li><Link href="/faq" className="hover:text-slate-900 transition-colors">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 tracking-wide">Company</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                                    <li><Link href="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
                                    <li><Link href="/contact" className="hover:text-slate-900 transition-colors">Contact</Link></li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-slate-900 tracking-wide">Contact</h4>
                                <ul className="space-y-2.5 text-sm font-medium text-slate-500">
                                    <li className="text-slate-600 break-all">hello@learninghub.edu</li>
                                    <li className="text-slate-400">Dhaka, Bangladesh</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
                        <div>© 2026 LearningHub. All rights reserved.</div>
                    </div>
                </div>
            </footer>
        </>
    );
}