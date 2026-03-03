import { z } from "zod";

export const itemEntitySchema = z.object({
    id: z.number(),
    name: z.string(),
    pod: z.number(),
    type: z.number(),
    level: z.number()
})

export type ItemEntity = z.infer<typeof itemEntitySchema>;
