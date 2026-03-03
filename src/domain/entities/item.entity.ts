import { z } from "zod";
import { Statistics, statsEntitySchema } from "./stats.entity";
import { ItemTypesKeys } from "../enums/items-types";

export const itemEntitySchema = z.object({
    id: z.number(),
    name: z.string(),
    pod: z.number(),
    type: z.enum(ItemTypesKeys),
    level: z.number(),
    stats: z.array(statsEntitySchema).nullable(),
    sprite: z.object({
        category: z.number(),
        sprite: z.number().nullable()
    })
}).transform((item) => {
    return {
        ...item,
        stats: item.stats ? new Statistics(item.stats) : null
    }
})

export type ItemEntity = z.infer<typeof itemEntitySchema>;
