import { AccountsResource } from "./accounts.resource";
import { ItemsResource } from './items.resource'
import { MobsRessource } from './mobs.resource'
import { RecipesRessource } from './recipes.resource'

class Ressources {
	items: Readonly<ItemsResource>
	mobs: Readonly<MobsRessource>
	recipes: Readonly<RecipesRessource>
	accounts: Readonly<AccountsResource>

	constructor() {
		this.items = new ItemsResource()
		this.mobs = new MobsRessource()
		this.recipes = new RecipesRessource()
		this.accounts = new AccountsResource()
	}
}

export const resources = new Ressources()
