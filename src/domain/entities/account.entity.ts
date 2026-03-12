import { argon2id, hash, verify } from "argon2";
import { ulid } from "ulid";
import { z } from "zod";
import { AppError } from "@errors/app.error";

export interface AccountInfo {
    username: string;
    email: string;
}
export interface AccountInfoExtended {
    id: string;
    username: string;
    email: string;
}

enum Roles {
    USER = 1,
    ADMIN = 2
}

const accountValidator = z.object({
    id: z.ulid(),
    username: z.string(),
    passwordHash: z.string(),
    email: z.string(),
    role: z.enum(Roles)
})

type AccountType = z.infer<typeof accountValidator>

export class AccountEntity implements AccountType{
    id!: string;
    username!: string;
    passwordHash!: string;
    email!: string;
    role!: Roles


    constructor(accountInfos: AccountType) {
        const verifiedData = accountValidator.parse(accountInfos);

        Object.assign(this, verifiedData);
    }

    public static async CreateAccount(username: string, password: string, email: string): Promise<AccountEntity> {
        const id = ulid();
        return new AccountEntity({
            id,
            username,
            passwordHash: await AccountEntity.hashPassword(id, password),
            email,
            role: Roles.USER
        })
    }

    public changePassword(newPassword: string): AccountEntity {
        this.passwordHash = newPassword;
        return this;
    }

    private static async hashPassword(id: string, password: string): Promise<string> {
        return hash(password, {
            type: argon2id,
            salt: Buffer.from(id),
            memoryCost: 19,
            parallelism: 1,
            timeCost: 2
        });
    }

    public async verifyPassword(password: string): Promise<void> {
        const valid = await verify(this.passwordHash, password);
        if ( !valid ) throw new AppError('INVALID_PASSWORD', "Password is not correct");
    }

    public setAsAdmin(): AccountEntity {
        this.role = Roles.ADMIN;
        return this;
    }

    public getInfo(): AccountInfo {
        return Object.freeze({
            username: this.username,
            email: this.email
        })
    }

    public getInfoExt(): AccountInfoExtended {
        return Object.freeze({
            id: this.id,
            username: this.username,
            email: this.email,
            role: this.role
        })
    }
}
