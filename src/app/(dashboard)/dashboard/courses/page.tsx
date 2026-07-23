'use client';

import { useState, ChangeEvent } from 'react';
import Link from 'next/link';

export interface Course {
    id: string;
    title: string;
    category: string;
    price: string;
    students: number;
    status: 'Published' | 'Draft';
    updatedAt: string;
}

const INITIAL_COURSES: Course[] = [
    {
        id: '1',
        title: 'Full-Stack Web Development with MERN',
        category: 'Web Development',
        price: '$99.99',
        students: 1420,
        status: 'Published',
        updatedAt: '2026-03-15',
    },
    {
        id: '2',
        title: 'Mastering AI Agent Development with Gemini',
        category: 'Artificial Intelligence',
        price: '$129.99',
        students: 850,
        status: 'Published',
        updatedAt: '2026-03-20',
    },
    {
        id: '3',
        title: 'Next.js 14 & Tailwind CSS Masterclass',
        category: 'Frontend',
        price: '$79.99',
        students: 0,
        status: 'Draft',
        updatedAt: '2026-03-22',
    },
    {
        id: '4',
        title: 'Data Structures & Algorithms in C++',
        category: 'Competitive Programming',
        price: 'Free',
        students: 3100,
        status: 'Published',
        updatedAt: '2026-02-10',
    },
];

export default function ManageCoursesPage() {
    const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('All');

    const filteredCourses = courses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.category.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
            selectedStatus === 'All' || course.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const handleDelete = (id: string): void => {
        if (confirm('Are you sure you want to delete this course?')) {
            setCourses((prev) => prev.filter((course) => course.id !== id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-8 space-y-8 text-slate-800">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Course Management
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Overview of your active curriculum, student enrollments, and status.
                    </p>
                </div>
                <Link
                    href="/dashboard/courses/create"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all duration-150 gap-2"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    Create New Course
                </Link>
            </div>

            {/* Modern Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            Total Courses
                        </span>
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mt-3">{courses.length}</p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            Published
                        </span>
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-emerald-600 mt-3">
                        {courses.filter((c) => c.status === 'Published').length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            Drafts
                        </span>
                        <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-amber-600 mt-3">
                        {courses.filter((c) => c.status === 'Draft').length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-colors">
                    <div className="flex items-center justify-between text-slate-500">
                        <span className="text-xs font-semibold uppercase tracking-wider">
                            Total Enrolled
                        </span>
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mt-3">
                        {courses.reduce((acc, curr) => acc + curr.students, 0).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Control Bar: Search & Filter */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:w-96">
                    <input
                        type="text"
                        placeholder="Search by title or category..."
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                    <svg
                        className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>

                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Filter Status:</span>
                    <select
                        value={selectedStatus}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all font-medium cursor-pointer"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Clean Table Container */}
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50/80 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200/80">
                            <tr>
                                <th className="px-6 py-4">Course Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Price</th>
                                <th className="px-6 py-4">Students</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredCourses.length > 0 ? (
                                filteredCourses.map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50/60 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-900 max-w-xs truncate">
                                            {course.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-800">{course.price}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {course.students.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${course.status === 'Published'
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                                        : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                                                    }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full ${course.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'
                                                        }`}
                                                />
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Link
                                                href={`/dashboard/courses/edit/${course.id}`}
                                                className="inline-flex items-center px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium text-xs transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(course.id)}
                                                className="inline-flex items-center px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg font-medium text-xs transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                                        No courses match your search criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}