import { ItemsResource } from './items.resource'
import { MobsRessource } from './mobs.resource'
import { RecipesRessource } from './recipes.resource'

class Ressources {
	items: Readonly<ItemsResource>
	mobs: Readonly<MobsRessource>
	recipes: Readonly<RecipesRessource>

	constructor() {
		this.items = new ItemsResource()
		this.mobs = new MobsRessource()
		this.recipes = new RecipesRessource()
	}
}

export const resources = new Ressources()
