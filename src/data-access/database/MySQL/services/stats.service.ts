import { StatsEntity, statsEntitySchema } from "../../../../domain/entities/stats.entity";
import { IdToStatType } from "../../../../domain/enums/stats-type";


export function parseStats(dbStats: string): StatsEntity[] {
    const serializedStat = dbStats.split(',');
    const stats: StatsEntity[] = [];
    for ( let stat of serializedStat) {
        const [id, ...data] = stat.split('#');
        if ( !IdToStatType[parseInt(id, 16)] ) {
            continue
        }

        const jet = data[data.length - 1];
        const dice = jet.match(/(?<n>\d+)d(?<v>\d+)(\+(?<f>\d+))?/)?.groups as {n: string, v: string, f?: string}|null
        if (!dice) continue
        const { n, v, f } = { n: parseInt(dice.n), v: parseInt(dice.v), f: dice.f ? parseInt(dice.f) : 0 }

        const min = f + n
        const max = f + n * v

        stats.push(statsEntitySchema.parse({
            id: IdToStatType[parseInt(id, 16)],
            min,
            max
        }))
    }

    return stats
}
