'use client';
import React from 'react';
import { Award, AlertTriangle, TrendingUp, AlertCircle, MoreHorizontal } from 'lucide-react';

export default function AnalyticsReport() {
    return (
        <div className="p-6 bg-[#f4f6f9] min-h-screen space-y-6 text-gray-700 font-sans">

            {/* --- TOP KPI METRIC CARDS --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-[#f0f4f8] border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
                    <h2 className="text-3xl font-bold text-gray-900">94.2%</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Task Completion Rate</p>
                </div>

                <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
                    <h2 className="text-3xl font-bold text-gray-900">2.4h</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Average Response Time</p>
                </div>

                <div className="bg-[#edf7ed] border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
                    <h2 className="text-3xl font-bold text-gray-900">18.5</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Team Velocity</p>
                </div>

                <div className="bg-[#fdf0f0] border border-gray-100 p-6 rounded-2xl shadow-sm text-center">
                    <h2 className="text-3xl font-bold text-gray-900">87%</h2>
                    <p className="text-xs text-gray-500 font-medium mt-1">Sprint Success Rate</p>
                </div>
            </div>

            {/* --- MID-SECTION: LINE CHART & COLUMN TRENDS --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Monthly Progress */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Monthly Progress</h3>
                            <p className="text-xs text-gray-400">Task completion trends over 6 months</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                    </div>

                    {/* Simulated Clean Chart Canvas Area */}
                    <div className="h-48 w-full mt-6 relative flex flex-col justify-between border-b border-gray-100">
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
                            <div className="border-b border-gray-200 w-full h-0"></div>
                            <div className="border-b border-gray-200 w-full h-0"></div>
                            <div className="border-b border-gray-200 w-full h-0"></div>
                        </div>

                        {/* Floating March Interactive Tooltip Popover Box */}
                        <div className="absolute left-[38%] top-[15%] bg-white border border-gray-100 p-3 rounded-xl shadow-xl z-10 text-xs">
                            <p className="font-bold text-gray-800 mb-1">March</p>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                Completed: <span className="font-semibold text-gray-800">70</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                                Created: <span className="font-semibold text-gray-700">29</span>
                            </div>
                        </div>

                        {/* Wave representation via CSS styling */}
                        <div className="w-full h-32 absolute bottom-0 bg-gradient-to-t from-blue-50/40 to-transparent border-t-2 border-blue-500 opacity-80 rounded-b-xl"></div>
                        <div className="w-full h-20 absolute bottom-0 border-t-2 border-blue-300 opacity-50"></div>
                    </div>

                    {/* X Axis Labels */}
                    <div className="flex justify-between text-xs text-gray-400 font-medium px-1 mt-3">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                </div>

                {/* Team Efficiency Trend */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Team Efficiency Trend</h3>
                            <p className="text-xs text-gray-400">Overall efficiency percentage over time</p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20} /></button>
                    </div>

                    {/* Columns Matrix Layout Container */}
                    <div className="h-48 flex items-end justify-between px-4 mt-6 relative border-b border-gray-100">
                        <div className="w-10 bg-gray-100 rounded-t-xl h-[65%] transition-all"></div>
                        <div className="w-10 bg-gray-100 rounded-t-xl h-[80%] transition-all"></div>
                        <div className="w-10 bg-gray-100 rounded-t-xl h-[40%] transition-all"></div>

                        {/* Highlighted April Active Column Item */}
                        <div className="w-10 bg-[#1552a2] rounded-t-xl h-[95%] relative transition-all">
                            <div className="absolute -top-16 -left-12 bg-white border border-gray-100 p-2.5 rounded-xl shadow-xl z-10 text-xs w-28 whitespace-nowrap">
                                <p className="font-bold text-gray-800 mb-0.5">April</p>
                                <div className="flex items-center gap-1.5 text-gray-500">
                                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                    Efficiency: <span className="font-bold text-gray-800">118</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-10 bg-gray-100 rounded-t-xl h-[70%] transition-all"></div>
                        <div className="w-10 bg-gray-100 rounded-t-xl h-[55%] transition-all"></div>
                    </div>

                    {/* X Axis Labels */}
                    <div className="flex justify-between text-xs text-gray-400 font-medium px-4 mt-3">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                    </div>
                </div>
            </div>

            {/* --- LOWER SECTION: CATEGORIES, INSIGHTS & DONUT --- */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* Tasks By Category List */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-6 lg:col-span-4 space-y-4">
                    <div>
                        <h3 className="font-bold text-gray-800 text-base">Tasks by Category</h3>
                        <p className="text-xs text-gray-400">Distribution across different work categories</p>
                    </div>

                    <div className="space-y-3 pt-2 text-xs font-medium">
                        <div>
                            <div className="flex justify-between text-gray-500 mb-1"><span>Development</span></div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full"><div className="bg-gray-300 h-2.5 rounded-full w-[85%]"></div></div>
                        </div>
                        <div className="relative">
                            <div className="flex justify-between text-gray-500 mb-1"><span>Design</span></div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full"><div className="bg-blue-600 h-2.5 rounded-full w-[65%]"></div></div>
                            <div className="absolute right-2 -top-1 bg-white border border-gray-100 px-2 py-1 rounded-lg shadow-md font-bold text-[10px] text-gray-700">
                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-600 mr-1"></span>Tasks: 42
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-gray-500 mb-1"><span>Testing</span></div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full"><div className="bg-gray-300 h-2.5 rounded-full w-[45%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-gray-500 mb-1"><span>Documentation</span></div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full"><div className="bg-gray-300 h-2.5 rounded-full w-[25%]"></div></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-gray-500 mb-1"><span>Planning</span></div>
                            <div className="w-full bg-gray-100 h-2.5 rounded-full"><div className="bg-gray-300 h-2.5 rounded-full w-[40%]"></div></div>
                        </div>
                    </div>
                </div>

                {/* Quick Insights List Feed Component */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-6 lg:col-span-4 space-y-4">
                    <h3 className="font-bold text-gray-800 text-base">Quick Insights</h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-1.5">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-full border border-gray-100"><Award size={16} /></div>
                            <div className="text-xs">
                                <h4 className="font-bold text-gray-800">Best day: Wednesday (95%)</h4>
                                <p className="text-gray-400 mt-0.5">Highest task completion rate recorded midweek.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-1.5">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-full border border-gray-100"><AlertTriangle size={16} /></div>
                            <div className="text-xs">
                                <h4 className="font-bold text-gray-800">Overdue Tasks Increased by 5%</h4>
                                <p className="text-gray-400 mt-0.5">Slight rise in delayed tasks compared to last week.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-1.5">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-full border border-gray-100"><TrendingUp size={16} /></div>
                            <div className="text-xs">
                                <h4 className="font-bold text-gray-800">Team Velocity Up 12% This Week</h4>
                                <p className="text-gray-400 mt-0.5">More tasks completed with improved efficiency.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-1.5">
                            <div className="p-2 bg-gray-50 text-gray-600 rounded-full border border-gray-100"><AlertCircle size={16} /></div>
                            <div className="text-xs">
                                <h4 className="font-bold text-gray-800">At-Risk Projects: 3 (+1)</h4>
                                <p className="text-gray-400 mt-0.5">Slight increase from previous period.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Productivity Trends Donut Representation */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm md:col-span-12 lg:col-span-4 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-gray-800 text-base">Productivity Trends</h3>
                    </div>

                    {/* Donut Render Box — Fixed Overlay logic */}
                    <div className="flex justify-center items-center my-4">
                        <div className="w-32 h-32 rounded-full border-[16px] border-blue-600 border-r-blue-400 border-b-blue-200 border-l-gray-300 rotate-45 relative flex items-center justify-center shadow-inner">
                            {/* Correctly sized and absolute centered Cutout circle */}
                            <div className="absolute w-[68px] h-[68px] bg-white rounded-full -rotate-45 flex flex-col items-center justify-center shadow-sm">
                                <span className="text-xs font-black text-gray-800 leading-none">84%</span>
                                <span className="text-[8px] text-gray-400 font-medium mt-0.5">Avg</span>
                            </div>
                        </div>
                    </div>

                    {/* Radial Indicators Key Legends */}
                    <div className="grid grid-cols-3 gap-y-2 text-[10px] text-gray-500 font-semibold pt-2 border-t border-gray-50">
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-800"></span>Sun: 87%</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Mon: 92%</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-300"></span>Tue: 92%</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-200"></span>Wed: 95%</div>
                        <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300"></span>Thu: 63%</div>
                    </div>
                </div>

            </div>
        </div>
    );
}