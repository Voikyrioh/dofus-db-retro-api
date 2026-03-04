import { z } from 'zod'

const mysqlMobSchema = z.object({
	id: z.number().int(),
	name: z.string().max(100),
	gfxID: z.number().int(),
	align: z.number().int(),
	grades: z.string(),
	colors: z.string().max(30),
	stats: z.string(),
	spells: z.string(),
	pdvs: z.string().max(200),
	points: z.string().max(200),
})

export type MysqlMob = z.infer<typeof mysqlMobSchema>

export class MobsRessource {}
