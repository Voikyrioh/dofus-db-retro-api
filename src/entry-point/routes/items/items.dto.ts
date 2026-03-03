import { z } from "zod";

export const itemSeachQuery = z.object({
    search: z.string().min(3)
})
