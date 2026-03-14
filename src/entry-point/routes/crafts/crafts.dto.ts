import { z } from 'zod'

export const idParams = z.object({ id: z.coerce.number().int().positive() })
export const listQueries = z.object({
    page: z.coerce.number().int().positive().optional().default(1),
    count: z.coerce.number().int().positive().optional().default(10),
})
