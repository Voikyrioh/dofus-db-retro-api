import type { ItemEntity } from '../../domain/entities/item.entity'
import {
	type CraftEntity,
	craftEntitySchema,
} from '../../domain/entities/craft.entity'
import { resources } from '../database/MySQL/resources'
import { repository } from './index'
import assert from "node:assert";

export class CraftsRepository {
	async getCraftForItem(item: ItemEntity): Promise<CraftEntity | null> {
		const craft = await resources.recipes.byId(item.id)
		if (!craft) return null

		const realCraftList = []
		for (const { item: ingredient, quantity } of craft.craft) {
			const item = await repository.items.byId(ingredient)
			if (!item)
				throw new Error(`Item with id ${ingredient} not found in database`)
			realCraftList.push({ item, quantity })
		}

		return craftEntitySchema.parse(realCraftList)
	}

	async save(item: number, craft: { item: number; quantity: number }[]) {
		await resources.recipes.save(item, craft)
	}

	async list(page: number, count: number): Promise<{ item: ItemEntity, recipe: CraftEntity }[]> {
		const crafts = await resources.recipes.list(count, count * page - 1)
		const craftList: { item: ItemEntity, recipe: CraftEntity }[] = []

		for ( const craft of crafts ) {
			const item = await repository.items.byId(craft.id)
			assert(item, 'Item for craft does not exists')
			const recipe = [];
			for (const rec of craft.craft) {
				const i = await repository.items.byId(rec.item)
				if(!i) continue;

				recipe.push({ item: i, quantity: rec.quantity })
			}
			craftList.push({
				item,
				recipe: craftEntitySchema.parse(recipe)
			})
		}

		return craftList
	}
}
