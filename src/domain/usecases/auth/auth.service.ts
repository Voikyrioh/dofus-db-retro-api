import { HTTPException } from "hono/http-exception";
import { repository } from "../../../data-access/repository";
import type { AccountEntity } from "../../entities/account.entity";

export async function checkAccountAlreadyExists(username: string): Promise<void> {
    const account = repository.accounts.findByUsername(username);

    if ( await account !== null ) {
        throw new HTTPException(400, {
            message: `Account with username ${ username } already exist`
        });
    }
}

export async function retrieveAccountFromUsername(username: string): Promise<AccountEntity> {
    const account = await repository.accounts.findByUsername(username);

    if ( account === null ) {
        throw new HTTPException(400, {
            message: `Account with username ${ username } does not exist`
        });
    }

    return account
}

export async function saveAccount(account: AccountEntity): Promise<void> {
    await repository.accounts.save(account);
}
