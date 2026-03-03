import { ItemEntity } from "../../domain/entities/item.entity";
import { CraftEntity, craftEntitySchema } from "../../domain/entities/craft.entity";
import { resources } from "../database/MySQL/resources";
import { repository } from "./index";

export class CraftsRepository {
    async getCraftForItem(item: ItemEntity): Promise<CraftEntity|null> {
        const craft = await resources.recipes.byId(item.id);
        if ( !craft ) return null;

        const realCraftList = []
        for (const {item: ingredient, quantity} of craft.craft) {
            const item = await repository.items.byId(ingredient)
            if ( !item ) throw new Error(`Item with id ${ingredient} not found in database`);
            realCraftList.push({item, quantity});
        }

        return craftEntitySchema.parse(realCraftList);
    }

    async save(item: number, craft: {item: number; quantity: number}[]) {
        await resources.recipes.save(item, craft);
    }
}
