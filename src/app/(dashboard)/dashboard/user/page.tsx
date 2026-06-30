'use client';

import { useState } from 'react';
import { SIDEBAR_MENU, MOCK_TABLE_DATA, Role } from '../../../../data/dashboardData';
import { DashboardCharts } from '../../../../components/DashboardCharts';

export default function DashboardSystem() {
    // Current Active Role & Routing State management controls
    const [currentRole, setCurrentRole] = useState<Role>('Admin');
    const [currentView, setCurrentView] = useState('overview');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    // Profile Editable User Information fields states layout
    const [profileUser, setProfileUser] = useState({
        fullName: 'Aris Thorne',
        email: 'aris.thorne@learninghub.io',
        organization: 'Core Operations Division',
    });

    // Helper dynamically swapping placeholder icons without importing lucide heavy bundles
    const renderMenuIcon = (iconName: string) => {
        const paths: Record<string, React.ReactNode> = {
            LayoutDashboard: <path d="M3 3h7v9H3zm11 0h7v5h-7zm0 9h7v9h-7zm-11 4h7v5H3z" />,
            Briefcase: <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16M2 20h20M3 7h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" />,
            UserSettings: <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
            BarChart3: <path d="M3 3v18h18M18 17V9M13 17V5M8 17v-4" />,
            Users: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm13 10v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
            FileText: <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z M14 2v4a2 2 0 0 0 2 2h4 M10 9h4 M10 13h4M10 17h4" />
        };
        return (
            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {paths[iconName] || <circle cx="12" cy="12" r="10" />}
            </svg>
        );
    };

    // Filter sidebar menu links options strictly against active state role parameters permissions
    const accessibleMenu = SIDEBAR_MENU.filter(item => item.roles.includes(currentRole));

    return (
        <div className="w-full min-h-screen bg-slate-50/50 text-slate-900 flex selection:bg-slate-200">

            {/* SIDEBAR COMPONENT MATRIX */}
            <aside className="w-64 bg-white border-r border-slate-100 flex flex-col justify-between shrink-0">
                <div>
                    {/* Header Workspace Monogram Identifier Brand */}
                    <div className="p-6 border-b border-slate-100 flex items-center space-x-3">
                        <div className="w-7 h-7 bg-slate-950 text-white font-black text-xs rounded-lg flex items-center justify-center">LH</div>
                        <span className="font-black text-sm tracking-tight text-slate-950">LearningHub OS</span>
                    </div>

                    {/* Role Simulator Selector Action row */}
                    <div className="p-4 bg-slate-50/70 border-b border-slate-100 space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Simulator Role Selector</label>
                        <div className="grid grid-cols-3 gap-1 bg-white p-1 border border-slate-200/80 rounded-xl shadow-2xs">
                            {(['User', 'Manager', 'Admin'] as Role[]).map((r) => (
                                <button
                                    key={r}
                                    onClick={() => {
                                        setCurrentRole(r);
                                        setCurrentView('overview'); // Reset routing path safety protection mechanism
                                    }}
                                    className={`py-1 text-[10px] font-bold rounded-lg border transition-all ${currentRole === r
                                        ? 'bg-slate-950 text-white border-slate-950 shadow-xs'
                                        : 'text-slate-500 bg-white border-transparent hover:text-slate-900'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Left Permitted Navigation List Elements */}
                    <nav className="p-4 space-y-1">
                        {accessibleMenu.map((item) => (
                            <button
                                key={item.view}
                                onClick={() => setCurrentView(item.view)}
                                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === item.view
                                    ? 'bg-slate-50 border border-slate-100 text-blue-600'
                                    : 'text-slate-500 border border-transparent hover:text-slate-900 hover:bg-slate-50/40'
                                    }`}
                            >
                                {renderMenuIcon(item.icon)}
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Left Drawer Footer Status Panel Info */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-semibold text-slate-400">Current Token</span>
                        <span className="text-xs font-extrabold text-slate-950">{currentRole} Mode</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
            </aside>

            {/* MAIN LAYER SYSTEM INTERFACE CONTAINER */}
            <div className="flex-grow flex flex-col min-w-0">

                {/* GLOBAL NAVBAR TOP BAR MODULE */}
                <header className="h-16 bg-white border-b border-slate-100 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-40">
                    <h2 className="text-xs uppercase font-extrabold tracking-widest text-slate-400">
                        Workspace / <span className="text-slate-950 font-black">{currentView}</span>
                    </h2>

                    {/* RIGHT NAVBAR DROPDOWN CONTEXT INTERACTION LAYOUT */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                            className="flex items-center space-x-2.5 p-1.5 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50/50 transition-all focus:outline-none"
                        >
                            <div className="w-8 h-8 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center tracking-wide">
                                {profileUser.fullName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="hidden sm:flex flex-col text-left">
                                <span className="text-xs font-bold text-slate-950 tracking-tight leading-none">{profileUser.fullName}</span>
                                <span className="text-[10px] font-semibold text-slate-400 mt-0.5">{currentRole} Account</span>
                            </div>
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown Menu Overlay element interface */}
                        {isProfileDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsProfileDropdownOpen(false)} />
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-lg py-2 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signed in as</p>
                                        <p className="text-xs font-bold text-slate-950 truncate">{profileUser.email}</p>
                                    </div>
                                    <button
                                        onClick={() => { setCurrentView('profile'); setIsProfileDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-950 flex items-center space-x-2"
                                    >
                                        {renderMenuIcon('UserSettings')}
                                        <span>Edit Profile</span>
                                    </button>
                                    <div className="border-t border-slate-100 my-1" />
                                    <button
                                        onClick={() => alert('Simulator Session Destroyed: Logging Out...')}
                                        className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50/50 flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                                        <span>Logout Security</span>
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* WORKSPACE APP PANELS CORE LAYER ROUTING VIEW ROUTER ENGINE */}
                <main className="flex-grow p-6 sm:p-8 overflow-y-auto max-w-7xl w-full mx-auto">

                    {/* VIEW 1: OVERVIEW COMPONENT INTERFACE PATH */}
                    {currentView === 'overview' && (
                        <div className="space-y-6 animate-in fade-in duration-200">
                            {/* Three Metrics Row Overview Cards Matrix */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Operational Allocation Balance</span>
                                    <h3 className="text-3xl font-black text-slate-950 tracking-tight">$42,350.00</h3>
                                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600 px-1.5 py-0.5 bg-emerald-50 rounded-md">+12.4% this month</span>
                                </div>
                                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Active Execution Tracks</span>
                                    <h3 className="text-3xl font-black text-slate-950 tracking-tight">18 Core Paths</h3>
                                    <span className="inline-flex items-center text-[10px] font-bold text-blue-600 px-1.5 py-0.5 bg-blue-50 rounded-md">Optimal capacity operational</span>
                                </div>
                                <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm space-y-2">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Platform Server Load Matrix</span>
                                    <h3 className="text-3xl font-black text-slate-950 tracking-tight">99.94% Uptime</h3>
                                    <span className="inline-flex items-center text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-slate-50 rounded-md">Sync status stable</span>
                                </div>
                            </div>

                            {/* Charts Graphics Integration Display Canvas rendered without libraries */}
                            <DashboardCharts />

                            {/* Data Tables Content Log Layer Render Container */}
                            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-950 tracking-tight">Recent Execution Tracking Registry</h3>
                                    <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase bg-slate-50 border px-2 py-0.5 rounded-md">Live logs stream</span>
                                </div>
                                <div className="overflow-x-auto w-full">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-slate-50/50 border-b border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                                                <th className="p-4 pl-6">ID System Registry</th>
                                                <th className="p-4">Entity context operational task</th>
                                                <th className="p-4">Execution Flag</th>
                                                <th className="p-4">Updated timestamp</th>
                                                <th className="p-4 pr-6 text-right">Value Cost metrics</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                                            {MOCK_TABLE_DATA.map((row) => (
                                                <tr key={row.id} className="hover:bg-slate-50/30 transition-colors">
                                                    <td className="p-4 pl-6 font-bold text-slate-950">{row.id}</td>
                                                    <td className="p-4">{row.entity}</td>
                                                    <td className="p-4">
                                                        <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${row.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                            row.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                                'bg-amber-50 text-amber-700 border border-amber-100'
                                                            }`}>
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 text-slate-400 font-semibold">{row.date}</td>
                                                    <td className="p-4 pr-6 text-right font-bold text-slate-950">{row.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* VIEW 2: PROFILE PAGE VIEW RENDER CANVAS CONTROL (WITH EDITABLE FORM FIELDS ACTION) */}
                    {currentView === 'profile' && (
                        <div className="max-w-xl bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in duration-200">
                            <div className="border-b border-slate-100 pb-4">
                                <h3 className="text-base font-black text-slate-950 tracking-tight">Profile Settings</h3>
                                <p className="text-xs text-slate-400 font-semibold mt-0.5">Modify editable core information blocks cached inside this session storage context layout layer matrix.</p>
                            </div>

                            <form onSubmit={(e) => { e.preventDefault(); alert('Profile variables updated successfully!'); }} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-950 tracking-tight">Full Identity Name</label>
                                    <input
                                        type="text"
                                        value={profileUser.fullName}
                                        onChange={(e) => setProfileUser({ ...profileUser, fullName: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-300 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-950 tracking-tight">Email Endpoint Registry</label>
                                    <input
                                        type="email"
                                        value={profileUser.email}
                                        onChange={(e) => setProfileUser({ ...profileUser, email: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-300 font-medium"
                                        required
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-950 tracking-tight">Organization Node Unit</label>
                                    <input
                                        type="text"
                                        value={profileUser.organization}
                                        onChange={(e) => setProfileUser({ ...profileUser, organization: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-slate-300 font-medium"
                                        required
                                    />
                                </div>

                                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                                    >
                                        Save changes configuration
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* FALLBACK VIEW PLACEHOLDER FOR REMAINING ROUTED SIDEBAR TARGET TABS */}
                    {currentView !== 'overview' && currentView !== 'profile' && (
                        <div className="p-12 text-center border border-dashed border-slate-200 rounded-2xl bg-white space-y-3 animate-in fade-in duration-150">
                            <div className="w-10 h-10 bg-slate-50 border border-slate-100 text-slate-400 rounded-xl flex items-center justify-center mx-auto">
                                {renderMenuIcon('FileText')}
                            </div>
                            <h3 className="text-sm font-bold text-slate-950 tracking-tight capitalize">{currentView} Panel Workspace View</h3>
                            <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                                This screen represents the dynamic route interface view container placeholder for authorized role contexts belonging to your <span className="font-bold text-slate-950">{currentRole}</span> token mapping configuration layout.
                            </p>
                        </div>
                    )}

                </main>
            </div>

        </div>
    );
}