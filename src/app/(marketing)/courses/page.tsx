'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Course } from '@/data/courses';
export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [selectedLevel, setSelectedLevel] = useState('All levels');
    const [sortBy, setSortBy] = useState('Most popular');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    //  Fetch live courses from your MongoDB API endpoint on component load
    useEffect(() => {
        const fetchPublicCourses = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Could not fetch catalog data.');
                }

                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error rendering public catalog:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicCourses();
    }, []);

    //  Extract categories dynamically based on what items exist in the database
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(courses.map((c) => c.category)));
        return ['All categories', ...uniqueCategories];
    }, [courses]);

    const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];

    // Filter and sort computation logic calculated via active reactive variables
    const filteredAndSortedCourses = useMemo(() => {
        return courses
            .filter((course) => {
                const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    course.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory = selectedCategory === 'All categories' || course.category === selectedCategory;
                const matchesLevel = selectedLevel === 'All levels' || course.level === selectedLevel;
                return matchesSearch && matchesCategory && matchesLevel;
            })
            .sort((a, b) => {
                if (sortBy === 'Most popular') return b.students - a.students;
                if (sortBy === 'Highest rated') return b.rating - a.rating;
                if (sortBy === 'Price: Low to High') return a.numericPrice - b.numericPrice;
                if (sortBy === 'Price: High to Low') return b.numericPrice - a.numericPrice;
                return 0;
            });
    }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 selection:bg-slate-200">

            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 pb-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-3">
                    Explore
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-950 mb-4">
                    All courses
                </h1>
                <p className="text-sm sm:text-base text-slate-500 font-medium max-w-xl leading-relaxed">
                    {loading ? 'Loading catalog details...' : `${courses.length} hands-on courses across ${categories.length - 1} categories. Filter to find the one that fits your week.`}
                </p>
            </section>

            {/* FILTER SEARCH PANEL BAR */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-6">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-3">

                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses, e.g. transformers"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 transition-colors"
                        />
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-none focus:border-slate-300 transition-colors cursor-pointer font-medium"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="relative min-w-[140px]">
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-none focus:border-slate-300 transition-colors cursor-pointer font-medium"
                        >
                            {levels.map((lvl) => (
                                <option key={lvl} value={lvl}>{lvl}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                    <div className="relative min-w-[160px]">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-none focus:border-slate-300 transition-colors cursor-pointer font-medium"
                        >
                            <option value="Most popular">Most popular</option>
                            <option value="Highest rated">Highest rated</option>
                            <option value="Price: Low to High">Price: Low to High</option>
                            <option value="Price: High to Low">Price: High to Low</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" /></svg>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                    </div>

                </div>
            </section>

            {/* STATUS HEADER */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-6">
                <span className="text-xs font-bold text-slate-400">
                    {!loading && `${filteredAndSortedCourses.length} ${filteredAndSortedCourses.length === 1 ? 'course' : 'courses'} found`}
                </span>
            </section>

            {/* MAIN CONTAINER CARDS GRID */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-16">
                {loading ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
                        <div className="w-6 h-6 border-2 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm font-semibold text-slate-400">Updating catalog items...</p>
                    </div>
                ) : filteredAndSortedCourses.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 rounded-2xl">
                        <p className="text-sm font-semibold text-slate-400">No courses match your active criteria parameters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredAndSortedCourses.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between"
                            >
                                <div className="p-5 bg-slate-50/70 border-b border-slate-100 relative min-h-[160px] flex flex-col justify-between">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="px-2 py-0.5 border border-slate-200 rounded-md text-[10px] font-bold text-slate-500 bg-white shadow-2xs">
                                            {course.category}
                                        </span>
                                        <span className="px-2 py-0.5 bg-slate-950 rounded-md text-[10px] font-black tracking-wide text-white">
                                            {course.level}
                                        </span>
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                        <span className="text-5xl font-black tracking-tighter text-slate-800/85">
                                            {course.initials}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                    <div className="space-y-1.5">
                                        <h3 className="text-sm sm:text-base font-black text-slate-950 tracking-tight leading-tight">
                                            {course.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center space-x-4 text-[11px] font-bold text-slate-400 pt-1">
                                        <div className="flex items-center space-x-1 text-slate-950">
                                            <svg className="w-3.5 h-3.5 text-slate-950 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>{course.rating}</span>
                                            <span className="text-slate-400 font-medium">({course.reviews?.toLocaleString() || 0})</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span>{course.students?.toLocaleString() || 0}</span>
                                        </div>
                                    </div>

                                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between w-full">
                                        <span className="text-sm font-black text-slate-950 tracking-tight">
                                            {course.price}
                                        </span>
                                        <Link
                                            href={`/courses/${course.id}`}
                                            className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-950 text-[11px] font-bold rounded-xl transition-colors shadow-2xs"
                                        >
                                            View details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* COACH FOOTER */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center pb-20">
                <span className="text-xs text-slate-400 font-semibold">
                    Not sure where to start?{' '}
                    <Link href="/contact" className="text-blue-600 hover:underline transition-all font-bold">
                        Talk to a coach →
                    </Link>
                </span>
            </section>

        </div>
    );
}