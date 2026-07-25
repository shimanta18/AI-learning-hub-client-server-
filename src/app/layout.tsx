
import { Inter } from 'next/font/google';
import './globals.css';
import AIChatWidget from '@/components/AIChatWidget';
import { ThemeProvider } from '@/components/ThemeProvider';
import AIStudyPlanner from '../app/AIStudyPlanner/page';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'LearningHub',
    description: 'An AI-powered learning platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className="transition-colors duration-200">
            {/* Added transition-colors to html element to animate background flips */}
            <body className={`${inter.className} bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50 min-h-screen selection:bg-slate-200 dark:selection:bg-slate-800 flex flex-col transition-colors duration-200`}>
                <ThemeProvider>
                    {/* All pages, navbars, and footers pass through here safely */}
                    {children}

                    {/* This injects the floating AI button globally on every page */}
                    <AIChatWidget />

                </ThemeProvider>
            </body>
        </html>
    );
}