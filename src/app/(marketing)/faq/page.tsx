'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: "Do I need a math background?",
        answer: "No advanced math degree is required. We break down complex concepts into plain English, focus on intuitive visual explanations, and only introduce foundational mathematical ideas exactly when and where they matter to implementation."
    },
    {
        question: "Are the courses self-paced?",
        answer: "Yes, 100%. Once enrolled, you receive lifetime access to all learning paths, text modules, and sandbox environments so you can learn entirely on your own schedule."
    },
    {
        question: "What is the AI Tutor?",
        answer: "The AI Tutor is your built-in, context-aware digital instructor. Operating right alongside your coursework, it answers clarifying code questions, unpicks complex architecture diagrams, and dynamically spins up custom diagnostic quizzes to catch knowledge gaps."
    },
    {
        question: "Can I get a certificate?",
        answer: "Yes. Upon completing a specific learning track and hitting a target mastery milestone across the integrated module quizzes, you will generate a secure, shareable digital certificate."
    },
    {
        question: "What if a course is not for me?",
        answer: "We want to ensure you are fully confident in your experience. We provide a complete 14-day money-back guarantee—no hoops, no friction. Just send a quick note over to our support channels."
    },
    {
        question: "Do you offer team or school pricing?",
        answer: "Absolutely. We offer scalable tier discounts and centralized seat dashboards for corporate engineering teams, bootcamps, and academic institutions looking to level up their production capabilities."
    }
];

export default function FAQPage() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="w-full min-h-screen bg-white text-slate-900 selection:bg-slate-200 dark:bg-slate-950 dark:text-slate-50 dark:selection:bg-slate-800 transition-colors duration-200">

            {/* HERO FAQ HEADER */}
            <section className="max-w-4xl mx-auto px-6 sm:px-8 pt-20 pb-12">
                <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 dark:text-slate-500 block mb-3">
                    Help
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-slate-950 dark:text-white tracking-tight mb-4">
                    Frequently asked questions
                </h1>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    Can't find what you need? <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Reach out</Link>, we usually reply within a day.
                </p>
            </section>

            {/* ACCORDION MATRIX CONTAINER */}
            <section className="max-w-4xl mx-auto px-6 sm:px-8 pb-24">
                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden dark:bg-slate-900 dark:border-slate-800/60">
                    {FAQ_DATA.map((faq, index) => {
                        const isOpen = activeIndex === index;
                        const isLast = index === FAQ_DATA.length - 1;

                        return (
                            <div
                                key={index}
                                className={`w-full ${!isLast ? 'border-b border-slate-100 dark:border-slate-800/60' : ''}`}
                            >
                                {/* Accordion Header Button */}
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-950/30 transition-colors duration-150 group"
                                    aria-expanded={isOpen}
                                >
                                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-slate-400 dark:text-slate-500 transform transition-transform duration-200 ease-out flex-shrink-0 ml-4 ${isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                                            }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Accordion Content Body */}
                                <div
                                    className={`grid transition-all duration-200 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-3xl">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

        </div>
    );
}