import { z } from 'zod';

export const LocationSchema = z.object({
    id: z.number(),
    name: z.string(),
    type: z.string(),
    dimension: z.string(),
    residents: z.array(z.string()),
    url: z.string(),
    created: z.string(),
});

export type Location = z.infer<typeof LocationSchema>;
