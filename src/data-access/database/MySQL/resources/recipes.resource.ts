import { z } from 'zod'
import { mySql } from '../client.js'
import type { QueryResult, ResultSetHeader, RowDataPacket } from 'mysql2'

const mysqlRecipeSchema = z.object({
	id: z.number().int(),
	craft: z.preprocess(
		(value) => {
			if (typeof value === 'string') {
				return value.split(';').map((c) => {
					const [item, quantity] = c.split('*')
					return { item: item, quantity: quantity }
				})
			}
			return value
		},
		z.array(
			z.object({
				item: z.coerce.number().int(),
				quantity: z.coerce.number().min(1),
			}),
		),
	),
})

export type MysqlRecipe = z.infer<typeof mysqlRecipeSchema>

export class RecipesRessource {
	async byId(id: number): Promise<MysqlRecipe | null> {
		const response = await mySql.query<RowDataPacket[]>(
			'SELECT * FROM crafts WHERE id = ?',
			[id],
		)
		return mysqlRecipeSchema.parse(response[0]?.[0]) ?? null
	}

	async save(id: number, recipe: { item: number; quantity: number }[]) {
		const craftToString = recipe
			.map(({ item, quantity }) => `${item}*${quantity}`)
			.join(';')

		const [result] = await mySql.query<ResultSetHeader>(
			'INSERT INTO crafts (id, craft) VALUES (?, ?) ON DUPLICATE KEY UPDATE craft = VALUES(craft)',
			[id, craftToString],
		)
		if (result.affectedRows === 0)
			throw new Error(`No recipe found for id: ${id}`)
	}

	async list(limit: number, offset: number) {
		const [crafts] = await mySql.query<RowDataPacket[]>(
			'SELECT * FROM crafts LIMIT ?, ?', [limit, offset],
		)

		return crafts.map((craft) => mysqlRecipeSchema.parse(craft))
	}
}
