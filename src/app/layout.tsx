// app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import AIChatWidget from '@/components/AIChatWidget'; // Adjust this path if your components folder is located elsewhere

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'LearningHub',
    description: 'An AI-powered learning platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen selection:bg-slate-200 flex flex-col`}>
                {/* All pages, navbars, and footers pass through here safely */}
                {children}

                {/* This injects the floating AI button globally on every page */}
                <AIChatWidget />
            </body>
        </html>
    );
}