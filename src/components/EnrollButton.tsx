'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EnrollButtonProps {
    courseId: string;
    userId: string;
}

interface APIResponse {
    success?: boolean;
    error?: string;
    message?: string;
}

export default function EnrollButton({ courseId, userId }: EnrollButtonProps) {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

    const handleEnrollmentFlow = async (): Promise<void> => {
        setIsRedirecting(true);

        try {
            const response = await fetch('/api/courses/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, userId })
            });

            const data: APIResponse = await response.json();

            if (!response.ok) throw new Error(data.error || 'Network request failed');

            router.push(`/dashboard/courses/${courseId}`);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'An error occurred';
            alert(msg);
            setIsRedirecting(false);
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Tier Heading Row */}
            <div className="flex justify-between items-center py-2">
                <span className="text-sm font-semibold text-slate-400">Access Tier</span>
                <span className="text-2xl font-black text-slate-900">Free</span>
            </div>

            {/* Action Submit Button */}
            <button
                onClick={handleEnrollmentFlow}
                disabled={isRedirecting}
                className="w-full bg-[#090D16] hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all shadow-sm flex items-center justify-center space-x-2"
            >
                {isRedirecting ? (
                    <>
                        {/* Simple spinner element using standard styling */}
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                        <span>Opening Classroom...</span>
                    </>
                ) : (
                    <span>Enroll in Course</span>
                )}
            </button>
        </div>
    );
}