import { z } from 'zod'
import { StatTypeKeys } from '../enums/stats-type'

export const statsEntitySchema = z.object({
	id: z.enum(StatTypeKeys),
	min: z.number(),
	max: z.number(),
})

export type StatsEntity = z.infer<typeof statsEntitySchema>

export class Statistics {
	// MAJOR
	public PM: { min: number; max: number } | undefined
	public PA: { min: number; max: number } | undefined
	public PO: { min: number; max: number } | undefined
	public CREATURE: { min: number; max: number } | undefined

	// RESI
	public R_TER: { min: number; max: number } | undefined
	public RP_TER: { min: number; max: number } | undefined
	public R_EAU: { min: number; max: number } | undefined
	public RP_EAU: { min: number; max: number } | undefined
	public R_AIR: { min: number; max: number } | undefined
	public RP_AIR: { min: number; max: number } | undefined
	public R_FEU: { min: number; max: number } | undefined
	public RP_FEU: { min: number; max: number } | undefined
	public R_NEU: { min: number; max: number } | undefined
	public RP_NEU: { min: number; max: number } | undefined

	// BASE
	public FORC: { min: number; max: number } | undefined
	public AGIL: { min: number; max: number } | undefined
	public CHAN: { min: number; max: number } | undefined
	public SAGE: { min: number; max: number } | undefined
	public VITA: { min: number; max: number } | undefined
	public INTE: { min: number; max: number } | undefined

	// EXT
	public PERDOM: { min: number; max: number } | undefined
	public PDOM: { min: number; max: number } | undefined
	public CC: { min: number; max: number } | undefined
	public PODS: { min: number; max: number } | undefined
	public INIT: { min: number; max: number } | undefined
	public PROS: { min: number; max: number } | undefined
	public SOIN: { min: number; max: number } | undefined
	public RETDOM: { min: number; max: number } | undefined
	public TRAPDOM: { min: number; max: number } | undefined
	public TRAPPER: { min: number; max: number } | undefined

	constructor(stats: StatsEntity[]) {
		for (const stat of stats) {
			if (stat.id.startsWith('ADD_')) {
				this[stat.id.replace('ADD_', '').replace('2', '') as keyof Statistics] =
					{ min: stat.min, max: stat.max }
			} else if (stat.id.startsWith('REM_')) {
				this[stat.id.replace('REM_', '').replace('2', '') as keyof Statistics] =
					{ min: stat.min * -1, max: stat.max * -1 }
			} else {
				this[stat.id as keyof Statistics] = { min: stat.min, max: stat.max }
			}
		}
	}
}
