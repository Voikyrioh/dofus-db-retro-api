import * as fs from "node:fs/promises";
import config from "@config";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";
import { repository } from "../../../data-access/repository";
import type { AccountEntity } from "../../entities/account.entity";
import { AppError } from "@errors/app.error";

export async function createToken(account: AccountEntity) {
    const key =  await fs.readFile(config.Server.JwtSignKey, { encoding: "base64" })

    return await sign({ id: account.id, role: account.role }, key)
}


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
        throw new AppError('NOT_FOUND', `Account with username ${ username } not found in database.`)
    }

    return account
}

export async function saveAccount(account: AccountEntity): Promise<void> {
    await repository.accounts.save(account);
}
