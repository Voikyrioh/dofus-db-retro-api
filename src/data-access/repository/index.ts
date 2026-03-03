import { MobsRepository } from "./mobs.repository";
import { CraftsRepository } from "./crafts.repository";
import { ItemsRepository } from "./items.repository";

class Repository {
    readonly items: ItemsRepository;
    readonly crafts: CraftsRepository;
    readonly mobs: MobsRepository;

    constructor() {
        this.items = new ItemsRepository();
        this.crafts = new CraftsRepository();
        this.mobs = new MobsRepository();
    }
}

export const repository = Object.freeze(new Repository());
