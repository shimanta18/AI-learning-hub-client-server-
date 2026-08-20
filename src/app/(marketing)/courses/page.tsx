'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

export interface Course {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    category?: string;
    track?: string;
    level?: string;
    price?: string | number;
    numericPrice?: number;
    rating?: number;
    reviews?: number;
    duration?: string;
    students?: number;
    initials?: string;
}

// Helper to safely extract numeric values for price sorting
const parsePrice = (price?: string | number, numericPrice?: number): number => {
    if (typeof numericPrice === 'number' && !isNaN(numericPrice)) return numericPrice;
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
        const parsed = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All categories');
    const [selectedLevel, setSelectedLevel] = useState('All levels');
    const [sortBy, setSortBy] = useState('Most popular');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        const fetchPublicCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) {
                    throw new Error('Could not fetch catalog data from server.');
                }

                const data = await response.json();

                // Safely extract array whether response is [{...}] or { success: true, data: [{...}] }
                const courseList = Array.isArray(data) ? data : (data.data || []);
                setCourses(courseList);
            } catch (err: unknown) {
                console.error('Error rendering public catalog:', err);
                const errorMessage = err instanceof Error ? err.message : 'Failed to connect to backend.';
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchPublicCourses();
    }, [API_BASE_URL]);

    // Extract dynamic categories safely
    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(courses.map((c) => c.category || c.track || 'General'))
        );
        return ['All categories', ...uniqueCategories];
    }, [courses]);

    const levels = ['All levels', 'Beginner', 'Intermediate', 'Advanced'];

    // Filter and sort catalog
    const filteredAndSortedCourses = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return courses
            .filter((course) => {
                const courseCategory = course.category || course.track || 'General';
                const courseLevel = course.level || 'Beginner';

                const matchesSearch =
                    !query ||
                    course.title.toLowerCase().includes(query) ||
                    course.description.toLowerCase().includes(query);
                const matchesCategory =
                    selectedCategory === 'All categories' || courseCategory === selectedCategory;
                const matchesLevel =
                    selectedLevel === 'All levels' || courseLevel === selectedLevel;

                return matchesSearch && matchesCategory && matchesLevel;
            })
            .sort((a, b) => {
                const studentsA = a.students || 0;
                const studentsB = b.students || 0;
                const ratingA = a.rating || 0;
                const ratingB = b.rating || 0;
                const priceA = parsePrice(a.price, a.numericPrice);
                const priceB = parsePrice(b.price, b.numericPrice);

                if (sortBy === 'Most popular') return studentsB - studentsA;
                if (sortBy === 'Highest rated') return ratingB - ratingA;
                if (sortBy === 'Price: Low to High') return priceA - priceB;
                if (sortBy === 'Price: High to Low') return priceB - priceA;
                return 0;
            });
    }, [courses, searchQuery, selectedCategory, selectedLevel, sortBy]);

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 selection:bg-slate-200 dark:selection:bg-slate-800 transition-colors duration-200">
            {/* HERO SECTION */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 pb-10">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 block mb-3">
                    Explore
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white mb-4">
                    All courses
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium max-w-xl leading-relaxed">
                    {loading
                        ? 'Loading catalog details...'
                        : `${courses.length} hands-on courses across ${Math.max(categories.length - 1, 0)} categories. Filter to find the one that fits your week.`}
                </p>
            </section>

            {/* FILTER SEARCH PANEL BAR */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-6">
                <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-xs dark:bg-slate-900 dark:border-slate-800 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                    {/* SEARCH INPUT */}
                    <div className="relative flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses, e.g. transformers"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-white dark:placeholder:text-slate-600 dark:focus:border-slate-700 transition-colors"
                        />
                    </div>

                    {/* CATEGORY SELECT */}
                    <div className="relative min-w-[160px]">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-hidden focus:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:focus:border-slate-700 transition-colors cursor-pointer font-medium"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat} className="dark:bg-slate-950 dark:text-white">
                                    {cat}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 dark:text-slate-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* LEVEL SELECT */}
                    <div className="relative min-w-[140px]">
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="w-full pl-4 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-hidden focus:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:focus:border-slate-700 transition-colors cursor-pointer font-medium"
                        >
                            {levels.map((lvl) => (
                                <option key={lvl} value={lvl} className="dark:bg-slate-950 dark:text-white">
                                    {lvl}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 dark:text-slate-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* SORT BY SELECT */}
                    <div className="relative min-w-[160px]">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full pl-9 pr-10 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 appearance-none focus:outline-hidden focus:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:focus:border-slate-700 transition-colors cursor-pointer font-medium"
                        >
                            <option value="Most popular" className="dark:bg-slate-950 dark:text-white">Most popular</option>
                            <option value="Highest rated" className="dark:bg-slate-950 dark:text-white">Highest rated</option>
                            <option value="Price: Low to High" className="dark:bg-slate-950 dark:text-white">Price: Low to High</option>
                            <option value="Price: High to Low" className="dark:bg-slate-950 dark:text-white">Price: High to Low</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400 dark:text-slate-500">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATUS HEADER */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 mb-6">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    {!loading && !error && `${filteredAndSortedCourses.length} ${filteredAndSortedCourses.length === 1 ? 'course' : 'courses'} found`}
                </span>
            </section>

            {/* MAIN CONTAINER CARDS GRID */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-16">
                {loading ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <div className="w-6 h-6 border-2 border-slate-900 dark:border-slate-100 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">Updating catalog items...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 border border-dashed border-red-200 dark:border-red-900/40 rounded-2xl bg-red-50/50 dark:bg-red-950/10">
                        <p className="text-sm font-bold text-red-600 dark:text-red-400 mb-2">Could not load courses</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-slate-900 text-white dark:bg-white dark:text-slate-950 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                        >
                            Try Again
                        </button>
                    </div>
                ) : filteredAndSortedCourses.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                        <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">No courses match your active criteria parameters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredAndSortedCourses.map((course, idx) => {
                            const courseId = course._id || course.id || `course-${idx}`;
                            const courseCategory = course.category || course.track || 'General';
                            const courseLevel = course.level || 'Beginner';
                            const initials = course.initials || course.title.slice(0, 2).toUpperCase();
                            const displayPrice = course.price !== undefined ? (typeof course.price === 'number' ? `$${course.price}` : course.price) : 'Free';

                            return (
                                <div
                                    key={courseId}
                                    className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between dark:bg-slate-900 dark:border-slate-800 transition-colors"
                                >
                                    {/* Top Banner */}
                                    <div className="p-5 bg-slate-50/70 border-b border-slate-100 dark:bg-slate-950/40 dark:border-slate-800 relative min-h-[160px] flex flex-col justify-between">
                                        <div className="flex items-center justify-between w-full z-10">
                                            <span className="px-2 py-0.5 border border-slate-200 rounded-md text-[10px] font-bold text-slate-500 bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400 shadow-2xs">
                                                {courseCategory}
                                            </span>
                                            <span className="px-2 py-0.5 bg-slate-950 rounded-md text-[10px] font-black tracking-wide text-white dark:bg-slate-50 dark:text-slate-950">
                                                {courseLevel}
                                            </span>
                                        </div>

                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                                            <span className="text-5xl font-black tracking-tighter text-slate-200 dark:text-slate-800/40 transition-colors">
                                                {initials}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Details */}
                                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                                        <div className="space-y-1.5">
                                            <h3 className="text-sm sm:text-base font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                                                {course.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">
                                                {course.description}
                                            </p>
                                        </div>

                                        {/* Ratings and Stats */}
                                        <div className="flex items-center space-x-4 text-[11px] font-bold text-slate-400 dark:text-slate-500 pt-1">
                                            <div className="flex items-center space-x-1 text-slate-950 dark:text-slate-200">
                                                <svg className="w-3.5 h-3.5 text-slate-950 dark:text-amber-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span>{course.rating ?? 0}</span>
                                                <span className="text-slate-400 dark:text-slate-500 font-medium">({course.reviews?.toLocaleString() || 0})</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{course.duration || 'Self-paced'}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                <span>{course.students?.toLocaleString() || 0}</span>
                                            </div>
                                        </div>

                                        {/* Card Action Footer */}
                                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between w-full">
                                            <span className="text-sm font-black text-slate-950 dark:text-white tracking-tight">
                                                {displayPrice}
                                            </span>
                                            <Link
                                                href={`/courses/${courseId}`}
                                                className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-950 text-[11px] font-bold rounded-xl dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 dark:text-white transition-colors shadow-2xs"
                                            >
                                                View details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* COACH FOOTER */}
            <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 text-center pb-20">
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">
                    Not sure where to start?{' '}
                    <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline transition-all font-bold">
                        Talk to a coach →
                    </Link>
                </span>
            </section>
        </div>
    );
}