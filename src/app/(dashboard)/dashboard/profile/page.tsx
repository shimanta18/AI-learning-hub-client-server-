'use client';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account Settings</h1>
                <p className="text-sm text-slate-500">Update your account information and avatar data.</p>
            </div>

            {/* Main Modern Form Card */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">
                <h2 className="text-base font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">Personal Information</h2>

                {/* Photo Upload Section */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200 text-slate-400 text-xs font-medium shadow-sm overflow-hidden">
                        Photo placeholder
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-all shadow-sm">
                            Upload your photo
                        </button>
                        <button className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-xs font-semibold transition-all">
                            Delete
                        </button>
                    </div>
                </div>

                {/* Field Grid inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">First name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Last name</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                            placeholder="Doe"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Street address</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
                            placeholder="1234 Unknown Street"
                        />
                    </div>
                </div>

                {/* Action button container */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                    <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition-all">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}