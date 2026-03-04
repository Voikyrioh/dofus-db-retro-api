import { AccountsRepository } from "./accounts.repository";
import { CraftsRepository } from './crafts.repository'
import { ItemsRepository } from './items.repository'
import { MobsRepository } from './mobs.repository'

class Repository {
	readonly items: ItemsRepository
	readonly crafts: CraftsRepository
	readonly mobs: MobsRepository
	readonly accounts: AccountsRepository

	constructor() {
		this.items = new ItemsRepository()
		this.crafts = new CraftsRepository()
		this.mobs = new MobsRepository()
		this.accounts = new AccountsRepository()
	}
}

export const repository = Object.freeze(new Repository())
