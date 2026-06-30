export type Role = 'User' | 'Manager' | 'Admin';

export interface MenuItem {
    label: string;
    view: string;
    icon: string;
    roles: Role[];
}

export const SIDEBAR_MENU: MenuItem[] = [
    // Shared / User View Access (Minimum 3 items)
    { label: 'Overview', view: 'overview', icon: 'LayoutDashboard', roles: ['User', 'Manager', 'Admin'] },
    { label: 'My Projects', view: 'projects', icon: 'Briefcase', roles: ['User', 'Manager', 'Admin'] },
    { label: 'Profile Settings', view: 'profile', icon: 'UserSettings', roles: ['User', 'Manager', 'Admin'] },

    // Manager View Access Addition
    { label: 'Team Analytics', view: 'analytics', icon: 'BarChart3', roles: ['Manager', 'Admin'] },

    // Admin View Access Additions (Minimum 5 items total)
    { label: 'User Management', view: 'users', icon: 'Users', roles: ['Admin'] },
    { label: 'System Logs', view: 'logs', icon: 'FileText', roles: ['Admin'] },
];

export const MOCK_TABLE_DATA = [
    { id: 'TX-1001', entity: 'Alpha Project Deploy', status: 'Completed', date: '2026-06-20', amount: '$1,200' },
    { id: 'TX-1002', entity: 'Beta API Integration', status: 'In Progress', date: '2026-06-22', amount: '$850' },
    { id: 'TX-1003', entity: 'Database Cluster Scaling', status: 'Pending', date: '2026-06-24', amount: '$3,400' },
    { id: 'TX-1004', entity: 'UI/UX Design Audit', status: 'Completed', date: '2026-06-25', amount: '$450' },
];

export const CHART_DATA = [
    { label: 'Jan', value: 40 },
    { label: 'Feb', value: 75 },
    { label: 'Mar', value: 50 },
    { label: 'Apr', value: 95 },
    { label: 'May', value: 60 },
    { label: 'Jun', value: 85 },
];