import { ItemEntity, itemEntitySchema } from "../../domain/entities/item.entity";
import { resources } from "../database/MySQL/resources";

export class ItemsRepository {
    async find(search: string): Promise<ItemEntity[]> {
        const items = await resources.items.find(search);

        return items.map(i => itemEntitySchema.parse(i));
    }

    async byId(id: number): Promise<ItemEntity | null> {
        const item = await resources.items.byId(id);

        return item ? itemEntitySchema.parse(item) : null;
    }
}
