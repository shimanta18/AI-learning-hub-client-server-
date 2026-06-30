
export interface Course {
    id: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    initials: string;
    title: string;
    description: string;
    rating: number;
    reviews: number;
    duration: string;
    students: number;
    price: string;
    numericPrice: number;
}