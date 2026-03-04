import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { z } from "zod";
import { mySql } from "../client";

const mysqlAccountSchema = z.object({
    id: z.ulid(),
    username: z.string().max(60),
    password: z.string().max(500),
    email: z.email(),
    role: z.number().max(255)
})

type MySqlAccount = z.infer<typeof mysqlAccountSchema>;

export class AccountsResource {
    async insert(account: MySqlAccount) {
        const [result] = await mySql.query<ResultSetHeader>(`
            INSERT INTO accounts (id, username, password, email, role)
            VALUES (?, ?, ?, ?, ?)
        `, [account.id, account.username, account.password, account.email, account.role])

        if ( !result.affectedRows ) {
            throw new Error(`Error: Could not insert account into database.`)
        }
    }

    async findByUsername(username: string): Promise<MySqlAccount|null> {
        const [result] = await mySql.query<RowDataPacket[]>(`SELECT * FROM accounts WHERE username = ?`, [username]);
        return result.length > 0 ? mysqlAccountSchema.parse(result[0]) : null;
    }
}
