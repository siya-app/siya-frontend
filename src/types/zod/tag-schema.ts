import { z } from "zod";

export const TagsSchema = z.object({
    cover: z.array(z.string()).optional(),
    dietary: z.array(z.string()).optional(),
    emotional: z.array(z.string()).optional(),
    food: z.array(z.string()).optional(),
    placement: z.array(z.string()).optional()
});