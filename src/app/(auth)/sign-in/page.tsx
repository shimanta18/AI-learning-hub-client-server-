'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../../../lib/firebase';

export default function SignInPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const fillDemoCredentials = () => {
        setEmail('demo@learninghub.example');
        setPassword('LearnerPro2026!');
    };

    // Firebase Email/Password Sign-In
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
            setIsSubmitting(false);
        }
    };

    // Firebase Social Auth (Google / GitHub) Popups
    const handleSocialLogin = async (provider: 'google' | 'github') => {
        setError('');
        try {
            const selectedProvider = provider === 'google' ? googleProvider : githubProvider;
            await signInWithPopup(auth, selectedProvider);
            router.push('/dashboard'); // <-- Updated to your actual workspace route
        } catch (err: any) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div className="w-full h-screen flex bg-white text-slate-900 overflow-hidden">

            {/* LEFT CONTENT COL */}
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
                <div className="w-full max-w-sm mx-auto my-auto py-8 space-y-6">
                    <div className="space-y-1">
                        <h1 className="text-2xl font-black text-slate-900">Welcome back</h1>
                        <p className="text-xs text-slate-500">Sign in to continue your path.</p>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs font-semibold leading-relaxed">
                            ⚠️ {error}
                        </div>
                    )}

                    {/* Social Stack */}
                    <div className="space-y-2.5">
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('google')}
                            className="w-full py-2 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <span className="text-red-500 font-extrabold text-sm mr-1">G</span>
                            <span>Continue with Google</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSocialLogin('github')}
                            className="w-full py-2 px-4 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-700 flex items-center justify-center space-x-2 hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            <span className="text-slate-900 text-sm mr-1">🐙</span>
                            <span>Continue with GitHub</span>
                        </button>
                    </div>

                    <div className="relative flex py-1 items-center text-[11px] text-slate-400 font-medium">
                        <div className="flex-grow border-t border-slate-100"></div>
                        <span className="flex-shrink mx-3 font-normal text-slate-400">or with email</span>
                        <div className="flex-grow border-t border-slate-100"></div>
                    </div>

                    {/* Form Actions */}
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-60"
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
                                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 text-slate-900 focus:outline-none focus:border-slate-400 focus:bg-white transition-colors disabled:opacity-60"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm mt-1 disabled:bg-slate-800"
                        >
                            {isSubmitting ? 'Authenticating...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Demo Button */}
                    <div className="flex justify-center pt-1">
                        <button
                            type="button"
                            onClick={fillDemoCredentials}
                            className="inline-flex items-center space-x-1.5 text-[11px] font-bold text-slate-700 hover:text-slate-950 border border-slate-200 px-3 py-1.5 bg-white rounded-xl shadow-sm transition-all"
                        >
                            <span>✉️</span>
                            <span>Use demo credentials</span>
                        </button>
                    </div>
                </div>

                {/* Bottom Navigation Prompt */}
                <div className="text-center text-xs text-slate-500 font-medium flex-shrink-0">
                    New here? <Link href="/sign-up" className="text-slate-900 font-bold underline">Create account</Link>
                </div>
            </div>

            {/* RIGHT PANEL COL */}
            <div className="hidden lg:flex lg:w-1/2 h-full bg-slate-950 text-white px-16 lg:px-24 py-12 flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-24 bottom-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="z-10">
                    <Link href="/" className="inline-flex items-center text-[11px] font-bold text-slate-400 hover:text-white transition-colors">
                        ← Back to site
                    </Link>
                </div>

                <div className="my-auto max-w-md space-y-6 z-10">
                    <h2 className="text-3xl lg:text-4xl font-black">
                        Built for serious learners.
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                        120+ project-first courses. An AI tutor that knows the material. Quizzes that find the gaps you didn't know you had.
                    </p>

                    <ul className="space-y-2.5 text-xs font-semibold text-slate-300">
                        <li className="flex items-center space-x-2">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span>Lifetime access to enrolled courses</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="text-blue-500 font-bold">✓</span>
                            <span>AI tutor support active on every lesson</span>
                        </li>
                        <li className="flex items-center space-x-2">
                            <span className="text-blue-500 font-bold">✓</span>
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