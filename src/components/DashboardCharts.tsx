'use client';

import React from 'react';
import { CHART_DATA } from '@/data/dashboardData';

export function DashboardCharts() {
    const maxValue = Math.max(...CHART_DATA.map(d => d.value));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dynamic Bar Chart Card */}
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-950 tracking-tight mb-6">Activity Volume (Bar)</h3>
                <div className="h-48 flex items-end justify-between gap-2 pt-4">
                    {CHART_DATA.map((item, index) => {
                        const barHeight = `${(item.value / maxValue) * 100}%`;
                        return (
                            <div key={index} className="flex flex-col items-center flex-grow group">
                                <div className="w-full bg-slate-50 border border-slate-100 rounded-t-lg relative flex items-end h-40">
                                    <div
                                        style={{ height: barHeight }}
                                        className="w-full bg-slate-950 group-hover:bg-blue-600 transition-all duration-300 rounded-t-md"
                                    />
                                    {/* Tooltip */}
                                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                        {item.value}%
                                    </span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-wider">{item.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic Spark Line Chart Card */}
            <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h3 className="text-sm font-bold text-slate-950 tracking-tight mb-6">Performance Trajectory (Line)</h3>
                <div className="h-48 flex flex-col justify-between relative pt-4">
                    <svg className="w-full h-36 overflow-visible" viewBox="0 0 600 100" preserveAspectRatio="none">
                        {/* Area Fill Gradient under the line curve path */}
                        <defs>
                            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M 0,60 L 100,25 L 200,50 L 300,5 L 400,40 L 500,15 L 600,15"
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="3"
                            strokeLinecap="round"
                        />
                        <path
                            d="M 0,60 L 100,25 L 200,50 L 300,5 L 400,40 L 500,15 L 600,15 L 600,100 L 0,100 Z"
                            fill="url(#chartGrad)"
                        />
                        {/* Interactive Node Coordinates dots mapping layout */}
                        <circle cx="0" cy="60" r="4" className="fill-blue-600 stroke-white stroke-2" />
                        <circle cx="100" cy="25" r="4" className="fill-blue-600 stroke-white stroke-2" />
                        <circle cx="200" cy="50" r="4" className="fill-blue-600 stroke-white stroke-2" />
                        <circle cx="300" cy="5" r="4" className="fill-blue-600 stroke-white stroke-2" />
                        <circle cx="400" cy="40" r="4" className="fill-blue-600 stroke-white stroke-2" />
                        <circle cx="500" cy="15" r="4" className="fill-blue-600 stroke-white stroke-2" />
                    </svg>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
                        {CHART_DATA.map((d, i) => <span key={i}>{d.label}</span>)}
                    </div>
                </div>
            </div>
        </div>
    );
}