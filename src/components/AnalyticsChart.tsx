'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', active: 400, completed: 240 },
    { name: 'Feb', active: 300, completed: 139 },
    { name: 'Mar', active: 200, completed: 980 },
    { name: 'Apr', active: 278, completed: 390 },
    { name: 'May', active: 189, completed: 480 },
];

export default function AnalyticsChart() {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-6">Engagement Overview</h3>
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} />
                        <YAxis fontSize={12} />
                        <Tooltip />
                        <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}