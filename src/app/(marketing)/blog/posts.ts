export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    description: string;
    date: string;
    readingTime: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'how-to-pick-an-ai-course-in-2026',
        title: 'How to pick an AI course in 2026',
        description: 'A short, opinionated framework for choosing what to learn next without wasting six weekends.',
        date: 'May 20, 2026',
        readingTime: '6 min read'
    },
    {
        id: '2',
        slug: 'evals-are-the-real-prompt-engineering',
        title: 'Evals are the real prompt engineering',
        description: 'Anyone can write a prompt that works once. Shipping requires measuring it.',
        date: 'April 2, 2026',
        readingTime: '8 min read'
    },
    {
        id: '3',
        slug: 'building-agents-without-tears',
        title: 'Building agents without tears',
        description: "The three failure modes that kill 90% of agent projects, and the cheap fixes.",
        date: 'March 11, 2026',
        readingTime: '7 min read'
    }
];