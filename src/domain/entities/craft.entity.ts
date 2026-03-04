import { z } from 'zod'
import { itemEntitySchema } from './item.entity'

export const craftEntitySchema = z.array(
	z.object({
		item: itemEntitySchema,
		quantity: z.number(),
	}),
)

export type CraftEntity = z.infer<typeof craftEntitySchema>
