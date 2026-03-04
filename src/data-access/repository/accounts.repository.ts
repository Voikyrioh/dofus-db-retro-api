import { AccountEntity } from "../../domain/entities/account.entity";
import { resources } from "../database/MySQL/resources";

export class AccountsRepository {
    async findByUsername(username: string): Promise<AccountEntity | null> {
        const mysqlAccount = await resources.accounts.findByUsername(username);

        return mysqlAccount ? new AccountEntity({...mysqlAccount, passwordHash: mysqlAccount.password}) : null;
    }

    async save(account: AccountEntity) {
        await resources.accounts.insert({
            id: account.id,
            username: account.username,
            password: account.passwordHash,
            email: account.email,
            role: account.role
        });
    }
}
