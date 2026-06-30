'use client';

import Link from 'next/link';
import { BLOG_POSTS } from './posts';

export default function BlogLandingPage() {
    return (
        <div className="w-full min-h-screen bg-white text-slate-900 flex flex-col justify-between selection:bg-slate-200">

            {/* MAIN MAIN CONTENT CONTAINER */}
            <main className="flex-grow">
                {/* Intro Title Header Canvas */}
                <div className=" mx-auto px-5 sm:px-9 lg:px-8 pt-20 pb-12 border-b border-slate-300">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
                        Blog
                    </span>
                    <h1 className="text-4xl sm:text-5xl font-black text-slate-950 font-light mb-4">
                        Notes from the field
                    </h1>
                    <p className="text-base sm:text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                        Short, opinionated essays from our instructors on learning, AI engineering, and the craft of shipping.
                    </p>
                </div>

                {/* Interactive Dynamic Grid Matrix */}
                <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col justify-between p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
                            >
                                <div className="space-y-4">
                                    {/* Post Metadata Row */}
                                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readingTime}</span>
                                    </div>

                                    {/* Heading Link */}
                                    <h2 className="text-xl font-bold text-slate-950 tracking-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Snippet Description Context */}
                                    <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed line-clamp-3">
                                        {post.description}
                                    </p>
                                </div>

                                {/* Call to Action Button Row */}
                                <div className="pt-6 mt-auto">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group/btn"
                                    >
                                        <span>Read post</span>
                                        <svg
                                            className="w-3.5 h-3.5 ml-1 transform group-hover/btn:translate-x-0.5 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    );
}