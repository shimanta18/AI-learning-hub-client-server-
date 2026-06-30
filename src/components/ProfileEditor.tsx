'use client';

import { useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function ProfileEditor() {
    const [name, setName] = useState('');
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        const user = auth.currentUser;
        if (user) {
            await updateDoc(doc(db, 'users', user.uid), { displayName: name });
        }
        setSaving(false);
        alert('Profile Updated!');
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <h3 className="font-bold text-lg">Edit Profile</h3>
            <input
                type="text"
                placeholder="Display Name"
                className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                onChange={(e) => setName(e.target.value)}
            />
            <button
                onClick={handleSave}
                className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold"
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </button>
        </div>
    );
}