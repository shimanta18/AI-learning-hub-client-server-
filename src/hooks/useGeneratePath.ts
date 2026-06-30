import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

// Define the validation schema with Zod
export const promptSchema = z.object({
    prompt: z
        .string()
        .min(3, { message: 'The topic must be at least 3 characters long' })
        .max(100, { message: 'Keep the topic brief and under 100 characters' }),
});

export type PromptFormValues = z.infer<typeof promptSchema>;

interface AskResponse {
    success: boolean;
    data: string; // Tailored matching your AI execution response payload structure
}

export const useGeneratePath = () => {
    // Dynamic base URL check (uses live build environment variable or local port fallback)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    return useMutation({
        mutationFn: async (prompt: string) => {
            // Points dynamically to your running backend API instance
            const { data } = await axios.post<AskResponse>(
                `${API_BASE_URL}/api/v1/ai/ask`,
                { prompt },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return data;
        },
    });
};