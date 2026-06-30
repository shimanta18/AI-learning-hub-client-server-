'use client';

import { useState, useEffect, useCallback } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

interface LogEntry {
    timestamp: string;
    message: string;
}

export default function SystemLogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Dynamic base URL check (uses live build environment variable or local fallback)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    // Core log fetching logic
    const fetchLogs = useCallback(async (isManualRefresh = false) => {
        try {
            if (isManualRefresh) setRefreshing(true);
            setErrorMessage('');

            const user = auth.currentUser;
            if (!user) {
                setErrorMessage('Authorization missing. Please wait or log in again.');
                return;
            }

            const token = await user.getIdToken();
            const response = await fetch(`${API_BASE_URL}/api/v1/admin/logs`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Server status error: ${response.status}`);
            }

            const data = await response.json();

            if (data.success && Array.isArray(data.logs)) {
                // Map incoming raw strings to structural objects with a permanent fetch timestamp
                const formattedLogs: LogEntry[] = data.logs.map((log: string) => ({
                    timestamp: new Date().toLocaleTimeString(),
                    message: log
                }));
                setLogs(formattedLogs);
            } else {
                setErrorMessage(data.message || 'Failed to retrieve structured system logs.');
            }
        } catch (err: any) {
            console.error('Failed to fetch core logs:', err);
            setErrorMessage('Unable to connect to log server. Verify backend status.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [API_BASE_URL]);

    // Handle Firebase Auth lifecycle securely on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchLogs();
            } else {
                setErrorMessage('Admin privileges required. Access denied.');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [fetchLogs]);

    return (
        <div className="p-8 space-y-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">System Core Logs</h1>
                    <p className="text-sm text-slate-500">Monitor live backend interactions, API calls, and infrastructure state metrics.</p>
                </div>
                <button
                    onClick={() => fetchLogs(true)}
                    disabled={loading || refreshing}
                    className="bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all self-start sm:self-center shadow-sm flex items-center gap-2"
                >
                    {refreshing ? (
                        <>
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Refreshing...
                        </>
                    ) : (
                        '🔄 Refresh Logs'
                    )}
                </button>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-semibold border border-red-100/60 transition-all">
                    ⚠️ {errorMessage}
                </div>
            )}

            {/* Terminal Window View */}
            <div className="bg-slate-950 text-emerald-400 p-6 rounded-2xl font-mono text-xs overflow-auto h-[65vh] shadow-xl border border-slate-800 relative selection:bg-emerald-500/20 selection:text-emerald-300">
                {/* Simulated Terminal Header */}
                <div className="sticky top-0 bg-slate-950/90 backdrop-blur-xs pb-3 mb-3 border-b border-slate-800/60 flex items-center justify-between text-slate-500 select-none">
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                        <span className="pl-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">bash — core_system.log</span>
                    </div>
                    <span className="text-[10px] font-medium font-sans">UTF-8</span>
                </div>

                {/* Log Line Streams */}
                {loading ? (
                    <div className="flex items-center space-x-2 text-slate-400 h-32 justify-center">
                        <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        <span>Establishing link stream securely...</span>
                    </div>
                ) : logs.length > 0 ? (
                    <div className="space-y-1.5 selection:bg-emerald-900/50">
                        {logs.map((log, i) => (
                            <p key={i} className="leading-relaxed hover:bg-slate-900/60 px-1.5 py-0.5 rounded transition-colors break-all">
                                <span className="text-amber-500/90 font-semibold select-none mr-2">[{log.timestamp}]</span>
                                <span className="text-slate-300">{log.message}</span>
                            </p>
                        ))}
                        {/* Terminal blinking prompt indicator */}
                        <div className="pt-2 flex items-center text-slate-500">
                            <span>learninghub-root@admin:~#</span>
                            <span className="ml-1.5 w-1.5 h-3.5 bg-emerald-400 animate-pulse"></span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        No operations or execution logs currently stored in database buffer stack.
                    </div>
                )}
            </div>
        </div>
    );
}