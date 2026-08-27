'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CourseDetailsPage() {
    const params = useParams();
    const courseId = params?.id as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'curriculum'>('overview');

    useEffect(() => {
        if (!courseId) return;

        async function fetchCourseDetails() {
            try {
                setLoading(true);
                const res = await fetch(`https://ai-learning-hub-server-side.onrender.com/api/v1/courses/${courseId}`);
                const result = await res.json();

                if (result.success) {
                    setCourse(result.data);
                }
            } catch (error) {
                console.error("Error fetching course details:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourseDetails();
    }, [courseId]);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-slate-500 font-bold">
                Loading course details...
            </div>
        );
    }

    if (!course) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center text-slate-500 font-bold">
                Course not found.
            </div>
        );
    }

    return (
        <div className="w-full bg-white text-slate-900 min-h-screen">
            {/* BREADCRUMB */}
            <div className="border-b border-slate-100 bg-slate-50/50">
                <div className="max-w-[1400px] mx-auto px-6 py-6 text-sm font-semibold text-slate-500 flex items-center space-x-2">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/courses" className="hover:text-slate-900 transition-colors">Courses</Link>
                    <span>/</span>
                    <span className="text-slate-900 font-bold truncate">{course.title}</span>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <main className="max-w-[1400px] mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                            {course.category || 'General'}
                        </span>
                        <span className="px-2.5 py-0.5 bg-slate-950 text-white rounded-md text-[10px] font-black tracking-widest uppercase">
                            {course.level || 'Beginner'}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight max-w-3xl">
                        {course.title}
                    </h1>

                    <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                        {course.description}
                    </p>

                    {/* STAT CHIPS */}
                    <div className="flex flex-wrap items-center gap-6 py-4 border-y border-slate-100 text-sm font-bold text-slate-600">
                        <div className="flex items-center space-x-1.5">
                            <span className="text-amber-500 text-lg">★</span>
                            <span className="text-slate-900">{course.rating || '4.8'}</span>
                            <span className="text-slate-400 font-medium">({course.reviews || 0} ratings)</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                        <div className="flex items-center space-x-2">
                            <span>Duration:</span>
                            <span className="text-slate-900">{course.duration || 'N/A'}</span>
                        </div>
                        <div className="h-4 w-px bg-slate-200 hidden sm:block" />
                        <div className="flex items-center space-x-2">
                            <span>Active Learners:</span>
                            <span className="text-slate-900">{course.students || 0}</span>
                        </div>
                    </div>

                    {/* TABS */}
                    <div className="space-y-6 pt-4">
                        <div className="flex space-x-6 border-b border-slate-200">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`pb-3.5 text-sm font-black tracking-wide border-b-2 transition-all ${activeTab === 'overview' ? 'border-slate-950 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={() => setActiveTab('curriculum')}
                                className={`pb-3.5 text-sm font-black tracking-wide border-b-2 transition-all ${activeTab === 'curriculum' ? 'border-slate-950 text-slate-900' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                Curriculum ({course.lessons?.length || 0})
                            </button>
                        </div>

                        {activeTab === 'overview' ? (
                            <div className="space-y-8 animate-in fade-in duration-200">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900">About this course</h3>
                                    <p className="text-slate-600 leading-relaxed text-base font-medium">
                                        {course.description}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in duration-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Syllabus breakdown</h3>
                                {course.lessons && course.lessons.length > 0 ? (
                                    course.lessons.map((lesson: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                                            <div className="flex items-center space-x-4">
                                                <span className="text-xs font-black text-slate-400 bg-slate-50 h-8 w-8 rounded-lg flex items-center justify-center border border-slate-100">
                                                    {i + 1}
                                                </span>
                                                <span className="font-bold text-sm text-slate-800">{lesson.title}</span>
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-100/70 px-2 py-1 rounded-md">
                                                {lesson.duration}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-500 text-sm">No lessons available yet.</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* SIDEBAR CARD */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
                    <div className="aspect-[16/10] bg-slate-950 flex items-center justify-center text-5xl font-black text-slate-700/60 select-none tracking-widest relative">
                        {course.initials || 'HUB'}
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm font-bold text-slate-400">Access Tier</span>
                            <span className="text-3xl font-black text-slate-900">{course.price || 'Free'}</span>
                        </div>

                        <Link
                            href={`/dashboard/courses/view?courseId=${course._id || course.id}`}
                            className="w-full py-4 bg-slate-950 hover:bg-slate-800 text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 group"
                        >
                            <span>Enroll in Course</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}