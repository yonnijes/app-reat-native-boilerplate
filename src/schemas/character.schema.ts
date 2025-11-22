import { z } from 'zod';

export const CharacterSchema = z.object({
    id: z.number(),
    name: z.string().min(1, 'Name is required'),
    status: z.string(),
    species: z.string(),
    type: z.string(),
    gender: z.string(),
    image: z.string().url().optional(),
    // We can add more fields as needed, but these are the main ones
});

export type Character = z.infer<typeof CharacterSchema>;
