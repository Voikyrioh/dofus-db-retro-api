import { type ItemEntity, itemEntitySchema } from '../../domain/entities/item.entity'
import { resources } from '../database/MySQL/resources'
import { parseStats } from '../database/MySQL/services/stats.service'
import type { MysqlItem } from '../database/MySQL/resources/items.resource'
import { IdsToItemTypes } from '../../domain/enums/items-types'

export class ItemsRepository {
	async find(search: string): Promise<ItemEntity[]> {
		const items = await resources.items.find(search)

		return items.map((i) => this.parseMysqlItem(i))
	}

	async byId(id: number): Promise<ItemEntity | null> {
		const item = await resources.items.byId(id)

		return item ? this.parseMysqlItem(item) : null
	}

	private parseMysqlItem(item: MysqlItem): ItemEntity {
		return itemEntitySchema.parse({
			...item,
			type: IdsToItemTypes[item.type],
			stats: item.statsTemplate !== '' ? parseStats(item.statsTemplate) : null,
			sprite: {
				category: item.type,
				sprite: item.gfxId || null,
			},
		})
	}
}
