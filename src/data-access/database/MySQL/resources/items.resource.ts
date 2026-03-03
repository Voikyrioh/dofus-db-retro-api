import { z } from "zod";
import { mySql } from "../client.js";
import type { RowDataPacket } from "mysql2";

const mysqlItemSchema = z.object({
 id: z.number().int(),
 type: z.number().int(),
 name: z.string().max(50),
 level: z.number().int(),
 statsTemplate: z.string().max(300),
 pod: z.number().int(),
 panoplie: z.number().int(),
 prix: z.number().int(),
 condition: z.string().max(100),
 armesInfos: z.string().max(100)
});

export type MysqlItem = z.infer<typeof mysqlItemSchema>;

export class ItemsResource {
  async byId(id: number): Promise<MysqlItem | null> {
     const response = await mySql.query<RowDataPacket[]>('SELECT * FROM item WHERE id = ?', [id]);
     return response[0]?.[0] ? mysqlItemSchema.parse(response[0]?.[0]) : null;
  }

  async find(name: string): Promise<MysqlItem[]> {
      const results = await mySql.query<RowDataPacket[]>("SELECT * FROM item WHERE MATCH(name) AGAINST(?) LIMIT 5", [name]);
      return results[0].map((item) => mysqlItemSchema.parse(item));
  }

  async list(limit: number, offset: number): Promise<MysqlItem[]> {
   const results = await mySql.query<RowDataPacket[]>("SELECT * FROM item LIMIT ?, ?", [limit, offset]);

   return results[0].map((item) => mysqlItemSchema.parse(item));
  }
}
