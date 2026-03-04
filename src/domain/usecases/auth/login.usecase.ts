import type { AccountEntity } from "../../entities/account.entity";
import { UseCase } from "../class/usecase.class";
import { retrieveAccountFromUsername } from "./auth.service";

export class LoginUseCase extends UseCase {
    async Execute(username: string, password: string): Promise<AccountEntity> {
        const account = await this.runStep('Get Account', retrieveAccountFromUsername.bind(null, username))
        await account.verifyPassword(password)

        return account
    }
}
