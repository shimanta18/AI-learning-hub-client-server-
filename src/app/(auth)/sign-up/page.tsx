'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function SignUpPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthError('');
        setIsSubmitting(true);

        try {
            //  Create the authentication profile in Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            //  Update the user profile display name with their full name
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: name,
                });
            }

            //  Redirect the newly registered user straight to the dashboard workspace
            router.push('/dashboard');

        } catch (err: any) {
            // Parse common Firebase errors into clean messaging
            if (err.code === 'auth/email-already-in-use') {
                setAuthError('This email is already registered.');
            } else if (err.code === 'auth/weak-password') {
                setAuthError('Password should be at least 6 characters.');
            } else {
                setAuthError(err.message || 'An error occurred during registration.');
            }
            setIsSubmitting(false);
        }
    };

    return (
        // Explicit flex split container to enforce absolute side-by-side consistency
        <div className="w-full h-screen flex bg-white text-slate-900 overflow-hidden">

            {/* LEFT CONTENT COL: Register inputs canvas */}
            <div className="w-full lg:w-1/2 h-full px-8 sm:px-16 lg:px-24 py-12 flex flex-col justify-between overflow-y-auto bg-white">

                {/* Brand Token Header */}
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-950 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.795M21 3L3 11.795h7.518L9.813 15.904z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight">LearningHub</span>
                </div>

                {/* Input Card Container */}
                <div className="w-full max-w-sm mx-auto my-auto py-6 space-y-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create your account</h1>
                        <p className="text-xs text-slate-500">Get instant access to curated AI roadmaps.</p>
                    </div>

                    {/* Authentication Error Banner */}
                    {authError && (
                        <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl text-[11px] font-bold text-rose-600 animate-in fade-in duration-150">
                            {authError}
                        </div>
                    )}

                    {/* Social OAuth Stack */}
                    <div className="space-y-2.5">
                        <button type="button" className="w-full py-2 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors shadow-2xs">
                            <span>Sign up with Google</span>
                        </button>
                        <button type="button" className="w-full py-2 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors shadow-2xs">
                            <span>Sign up with GitHub</span>
                        </button>
                    </div>

                    <div className="relative flex py-1 items-center text-[11px] text-slate-400 font-medium">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink mx-3 font-normal text-slate-400/80">or with email</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    {/* Core Registration Fields Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-800 tracking-wide block" htmlFor="name">Full Name</label>
                            <input
                                id="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-800 tracking-wide block" htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                required
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-50"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-800 tracking-wide block" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isSubmitting}
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-50"
                            />
                        </div>

                        <div className="text-[11px] text-slate-500 leading-normal">
                            By hitting submit, you consent to our{' '}
                            <Link href="/terms" className="underline hover:text-slate-800">Terms of Service</Link> and{' '}
                            <Link href="/privacy" className="underline hover:text-slate-800">Privacy Policy</Link>.
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-md mt-1 flex items-center justify-center disabled:bg-slate-800"
                        >
                            {isSubmitting ? 'Provisioning Account...' : 'Create account'}
                        </button>
                    </form>
                </div>

                {/* Bottom Navigation Redirect Toggle */}
                <div className="text-center text-xs text-slate-500 font-medium flex-shrink-0">
                    Already have an account? <Link href="/sign-in" className="text-slate-900 font-bold underline">Sign in</Link>
                </div>
            </div>

            {/* RIGHT PANEL COL: Synchronized Dark Value Presentation Pane */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-slate-950 text-white px-16 lg:px-24 py-12 flex-col justify-between relative overflow-hidden">

                {/* Soft Radial Backlighting Gradient */}
                <div className="absolute -right-24 bottom-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="z-10">
                    <Link href="/" className="inline-flex items-center text-[11px] font-bold text-slate-400 hover:text-white transition-colors">
                        Back to site
                    </Link>
                </div>

                <div className="my-auto max-w-md space-y-6 z-10">
                    <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                        Built for serious learners.
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        120+ project-first courses. An AI tutor that knows the material. Quizzes that find the gaps you didn't know you had.
                    </p>

                    <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
                        <li className="flex items-center space-x-2">
                            <span>Lifetime access to enrolled courses</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>AI tutor support active on every lesson</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span>Adaptive automated review metrics</span>
                        </li>
                    </ul>
                </div>

                <div className="text-[11px] text-slate-600 font-semibold tracking-wide z-10 select-none">
                    © 2026 LearningHub
                </div>
            </div>

        </div>
    );
}