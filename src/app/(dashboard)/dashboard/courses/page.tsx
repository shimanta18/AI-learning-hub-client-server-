'use client';

import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Course } from '../../../../data/courses';

export default function ManageCoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLevel, setSelectedLevel] = useState<string>('All');

    // Dynamic base URL check (uses Render on live build, falls back to local port)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Modal UI states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        level: 'Beginner',
        description: '',
        duration: '',
        price: '',
        numericPrice: 0,
    });

    // Helper to close and clear modal safely
    const closeAndResetModal = () => {
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({
            title: '',
            category: '',
            level: 'Beginner',
            description: '',
            duration: '',
            price: '',
            numericPrice: 0
        });
    };

    // Open modal in Edit Mode prefilled with the course data
    const handleEditClick = (course: Course) => {
        setEditingId(course.id || null);
        setFormData({
            title: course.title || '',
            category: course.category || '',
            level: course.level || 'Beginner',
            description: course.description || '',
            duration: course.duration || '',
            price: course.price || '',
            numericPrice: course.numericPrice ?? 0,
        });
        setIsModalOpen(true);
    };

    // 1. Fetch live courses
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                setErrorMessage('You must be logged in to view these management utilities.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setErrorMessage('');
                const token = await user.getIdToken();

                const response = await fetch(`${API_BASE_URL}/api/v1/courses`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to load courses from database.');
                }

                const data = await response.json();
                setCourses(data);
            } catch (error: any) {
                console.error("Fetch error:", error);
                setErrorMessage('Unable to connect to the server. Displaying empty list.');
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [API_BASE_URL]);

    // 2. Handle deleting a course
    const handleDeleteCourse = async (id: string) => {
        if (!confirm('Are you sure you want to permanently delete this course?')) return;

        try {
            const token = await auth.currentUser?.getIdToken(true);
            if (!token) return alert('Auth session missing. Please log in again.');

            const response = await fetch(`${API_BASE_URL}/api/v1/courses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setCourses(prevCourses => prevCourses.filter(course => course.id !== id));
            } else {
                alert('Failed to delete course from the backend server.');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('A network error occurred while trying to delete the course.');
        }
    };

    // 3. Combined Submit Handler (Handles both POST Create and PUT Update)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const token = await auth.currentUser?.getIdToken(true);
            if (!token) {
                alert('Auth session missing. Please log in again.');
                setSubmitting(false);
                return;
            }

            const isEditing = !!editingId;
            const url = isEditing
                ? `${API_BASE_URL}/api/v1/courses/${editingId}`
                : `${API_BASE_URL}/api/v1/courses`;

            const response = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'Unknown server error');
                throw new Error(`Server returned status ${response.status}: ${errorText}`);
            }

            const result = await response.json();

            if (result.success) {
                if (isEditing) {
                    setCourses(prev => prev.map(c => c.id === editingId ? result.data : c));
                } else {
                    setCourses(prev => [result.data, ...prev]);
                }
                closeAndResetModal();
            } else {
                alert(result.message || 'Failed to save course changes.');
            }
        } catch (error: any) {
            console.error('Submit error:', error);
            alert(error.message || 'A network error occurred during saving.');
        } finally {
            setSubmitting(false);
        }
    };

    // Filter courses logic
    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.category?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
        return matchesSearch && matchesLevel;
    });

    const totalCourses = courses.length;
    const totalStudents = courses.reduce((acc, curr) => acc + (curr.students || 0), 0);
    const freeCoursesCount = courses.filter(c => c.numericPrice === 0).length;

    return (
        <div className="space-y-8 relative">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Manage Courses</h1>
                    <p className="text-sm text-slate-500">Create, edit, or remove courses from the LearningHub platform catalogs.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all self-start sm:self-center shadow-sm"
                >
                    + Add New Course
                </button>
            </div>

            {/* Error Message banner */}
            {errorMessage && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-semibold border border-red-100">
                    {errorMessage}
                </div>
            )}

            {/* Metrics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center space-x-4 shadow-sm">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">📚</div>
                    <div>
                        <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Active Courses</span>
                        <span className="text-2xl font-bold text-slate-800">{loading ? '...' : totalCourses}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center space-x-4 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">👥</div>
                    <div>
                        <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Total Enrolled</span>
                        <span className="text-2xl font-bold text-slate-800">{loading ? '...' : totalStudents.toLocaleString()}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center space-x-4 shadow-sm">
                    <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">🏷️</div>
                    <div>
                        <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Free Access</span>
                        <span className="text-2xl font-bold text-slate-800">{loading ? '...' : `${freeCoursesCount} Courses`}</span>
                    </div>
                </div>
            </div>

            {/* Main Course Table Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-lg font-bold text-slate-900">Course List</h2>

                    <div className="flex flex-wrap items-center gap-3">
                        <input
                            type="text"
                            placeholder="Search title or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 text-slate-800"
                        />
                        <select
                            value={selectedLevel}
                            onChange={(e) => setSelectedLevel(e.target.value)}
                            className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
                        >
                            <option value="All">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    {loading ? (
                        <div className="p-12 text-center text-slate-400 text-xs font-medium">
                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            Loading courses from database...
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                                    <th className="py-4 px-6 w-12 text-center">#</th>
                                    <th className="py-4 px-6">Title</th>
                                    <th className="py-4 px-6">Category</th>
                                    <th className="py-4 px-6">Level</th>
                                    <th className="py-4 px-6">Price</th>
                                    <th className="py-4 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                {filteredCourses.length > 0 ? (
                                    filteredCourses.map((course, index) => (
                                        <tr key={course.id || index} className="hover:bg-slate-50/70 transition-colors">
                                            <td className="py-4 px-6 text-center text-slate-400 font-semibold">{index + 1}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] uppercase">
                                                        {course.initials || course.title?.slice(0, 2) || 'CH'}
                                                    </div>
                                                    <div>
                                                        <span className="block font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">{course.title}</span>
                                                        <span className="text-[11px] text-slate-400 block font-normal line-clamp-1">{course.description}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-[11px] font-semibold border border-blue-100/50">
                                                    {course.category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${course.level === 'Beginner' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                                                    course.level === 'Intermediate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                                                        'bg-rose-50 text-rose-700 border border-rose-200'
                                                    }`}>
                                                    {course.level}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 font-bold text-slate-900">
                                                {course.price}
                                            </td>
                                            <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleEditClick(course)}
                                                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-md font-semibold transition-all"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => course.id && handleDeleteCourse(course.id)}
                                                    className="text-[11px] bg-red-50 hover:bg-red-100 text-red-600 px-2.5 py-1.5 rounded-md font-semibold border border-red-100 transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12 text-slate-400 font-normal">
                                            No courses found matching criteria.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm transition-opacity p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-bold text-slate-900">
                                    {editingId ? 'Edit Course Document' : 'Add New Catalog Course'}
                                </h2>
                                <p className="text-[11px] text-slate-400 font-medium">Fills document objects directly inside MongoDB database collection.</p>
                            </div>
                            <button
                                onClick={closeAndResetModal}
                                className="text-slate-400 hover:text-slate-600 font-bold text-sm p-1.5 hover:bg-slate-50 rounded-lg transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-slate-800">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., Full Stack React Native Masterclass"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., Development, Design"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Target Level</label>
                                    <select
                                        value={formData.level}
                                        onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 font-medium"
                                    >
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Course Duration</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g., 14h 30m or 6 Weeks"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Display Price String</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., $49.00 or Free"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Numeric Metric Price ($)</label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        placeholder="49"
                                        value={formData.numericPrice === 0 ? 0 : (formData.numericPrice || '')}
                                        onChange={(e) => setFormData({ ...formData, numericPrice: Number(e.target.value) })}
                                        className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Description Brief</label>
                                <textarea
                                    rows={3}
                                    required
                                    placeholder="Provide clear learning objectives for students browsing your frontend store catalog..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full text-xs border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={closeAndResetModal}
                                    className="text-xs font-bold text-slate-500 hover:bg-slate-100 px-4 py-2.5 rounded-xl transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm flex items-center disabled:opacity-50"
                                >
                                    {submitting ? 'Saving...' : editingId ? 'Update Course' : 'Confirm Publish'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}