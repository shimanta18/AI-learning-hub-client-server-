'use client';

import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

// 1. HELPER: Safely extracts the 11-character YouTube ID from a full URL or raw ID
const extractYouTubeId = (urlOrId?: string): string => {
    if (!urlOrId) return '';
    // If it's already just an ID (no slashes or URL params)
    if (!urlOrId.includes('/') && !urlOrId.includes('=')) return urlOrId;

    // Regex to pull the ID out of youtu.be, youtube.com/watch, or youtube.com/embed
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
};

interface Lesson {
    _id: string;
    title: string;
    description?: string;
    youtubeVideoId: string;
    duration?: string;
    completed?: boolean;
}

interface Course {
    _id: string;
    title: string;
    description: string;
    category: string;
    youtubeVideoId?: string; // Added to match your MongoDB schema
    lessons?: Lesson[];      // Made optional
}

type TabType = 'summary' | 'files' | 'resources' | 'qa';

function CourseContent() {
    const params = useParams();
    const searchParams = useSearchParams();

    const rawParamId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const courseId = searchParams.get('courseId') || rawParamId || '';

    const [course, setCourse] = useState<Course | null>(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<TabType>('summary');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!courseId) {
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        async function fetchCourse() {
            try {
                setIsLoading(true);
                setError(null);

                // 2. FIX: Added a fallback to localhost:5000 or your render URL so it doesn't query port 3000
                const apiBase = 'https://ai-learning-hub-server-side.onrender.com';
                const res = await fetch(`${apiBase}/api/v1/courses/${courseId}`, {
                    signal: controller.signal,
                });

                if (!res.ok) {
                    throw new Error(`Course not found (Status: ${res.status})`);
                }

                const data: Course = await res.json();
                console.log("API Data received:", data);
                setCourse(data);
            } catch (err: unknown) {
                if ((err as Error).name !== 'AbortError') {
                    console.error('Failed to load course:', err);
                    setError('Unable to load course content. Please check your API connection.');
                    setCourse(null);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchCourse();

        return () => controller.abort();
    }, [courseId]);

    // 3. FIX: Normalize data structure. If the course has no `lessons` array but has a root video URL, 
    // we transform the course itself into a 1-item "lesson" array so the UI renders perfectly.
    const courseLessons: Lesson[] = useMemo(() => {
        if (course?.lessons && course.lessons.length > 0) {
            return course.lessons;
        }
        if (course?.youtubeVideoId) {
            return [{
                _id: course._id,
                title: course.title,
                description: course.description,
                youtubeVideoId: course.youtubeVideoId,
                duration: 'Course Overview'
            }];
        }
        return [];
    }, [course]);

    const progressPercent = useMemo(() => {
        if (!courseLessons.length) return 0;
        return Math.round(((activeLessonIndex + 1) / courseLessons.length) * 100);
    }, [activeLessonIndex, courseLessons.length]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
            </div>
        );
    }

    if (error || !course || courseLessons.length === 0) {
        return (
            <div className="p-8 text-center text-slate-500 max-w-md mx-auto my-12 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <p className="text-lg font-medium text-slate-800">
                    {error || 'Course content not found or no video available.'}
                </p>
            </div>
        );
    }

    const currentLesson = courseLessons[activeLessonIndex];

    // Process the ID for the iframe
    const parsedVideoId = extractYouTubeId(currentLesson.youtubeVideoId);

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                        {course.title}
                    </h1>
                    <div className="flex items-center gap-3 text-sm text-slate-500 mt-2 flex-wrap">
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                            👤 {course.category}
                        </span>
                        <span>•</span>
                        <span>📖 {courseLessons.length} Lesson{courseLessons.length > 1 ? 's' : ''}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button type="button" className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition shadow-sm">
                        🔖
                    </button>
                    <button type="button" className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm">
                        <span>🔗</span> Share
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* Fixed Video Player */}
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-200">
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${parsedVideoId}`}
                            title={currentLesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    <nav role="tablist" className="flex border-b border-slate-200 gap-6 text-sm font-medium text-slate-500">
                        {(['summary', 'files', 'resources', 'qa'] as const).map((tab) => (
                            <button
                                key={tab}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-3 capitalize transition-all ${activeTab === tab ? 'border-b-2 border-indigo-600 text-indigo-600 font-semibold' : 'hover:text-slate-800'}`}
                            >
                                {tab === 'qa' ? 'Q&A' : tab}
                            </button>
                        ))}
                    </nav>

                    <section className="pt-2">
                        {activeTab === 'summary' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900 mb-2">Lesson Recap</h2>
                                    <p className="text-slate-600 leading-relaxed text-sm lg:text-base">
                                        {currentLesson.description || `In this lesson, we explore the fundamental concepts of ${currentLesson.title}.`}
                                    </p>
                                </div>
                            </div>
                        )}
                        {/* Other Tabs remain unchanged */}
                        {activeTab === 'files' && <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-white text-center text-slate-500 text-sm">📁 No downloadable project files.</div>}
                        {activeTab === 'resources' && <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-white text-center text-slate-500 text-sm">🔗 Check out the official documentation.</div>}
                        {activeTab === 'qa' && <div className="p-6 rounded-2xl border border-dashed border-slate-300 bg-white text-center text-slate-500 text-sm">💬 Questions & Answers section coming soon!</div>}
                    </section>
                </div>

                <aside className="space-y-6">
                    <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900 text-base">Study Progress</h2>
                            <p className="text-xs text-slate-500 mt-1">
                                {activeLessonIndex + 1} of {courseLessons.length} lessons completed
                            </p>
                        </div>
                        <div className="w-14 h-14 flex items-center justify-center rounded-full border-4 border-indigo-600 text-indigo-600 font-bold text-xs bg-indigo-50">
                            {progressPercent}%
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="font-bold text-slate-900 text-lg">Course Content</h2>
                        <div className="space-y-2">
                            {courseLessons.map((lesson, idx) => {
                                const isActive = idx === activeLessonIndex;
                                const isCompleted = lesson.completed || idx < activeLessonIndex;

                                return (
                                    <button
                                        key={lesson._id || idx}
                                        type="button"
                                        onClick={() => setActiveLessonIndex(idx)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl text-left transition-all border ${isActive ? 'border-indigo-600 bg-white shadow-md ring-1 ring-indigo-600' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                                {idx + 1}
                                            </span>
                                            <div>
                                                <h3 className={`text-sm font-semibold ${isActive ? 'text-indigo-600' : 'text-slate-800'}`}>
                                                    {lesson.title}
                                                </h3>
                                                <span className="text-xs text-slate-400">
                                                    {lesson.duration || '10:00'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${isCompleted ? 'border-indigo-600 text-indigo-600 bg-indigo-50' : 'border-slate-200 text-slate-300'}`}>
                                            {isCompleted ? '✓' : '0%'}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default function CourseDetailPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" /></div>}>
            <CourseContent />
        </Suspense>
    );
}