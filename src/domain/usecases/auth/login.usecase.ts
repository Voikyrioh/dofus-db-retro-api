import { UseCase } from '@Voikyrioh/observability'
import type { AccountInfo } from '../../entities/account.entity'
import { createToken, retrieveAccountFromUsername } from './auth.service'

export class LoginUseCase extends UseCase {
	async Execute(
		username: string,
		password: string,
	): Promise<{ token: string; userInfos: AccountInfo }> {
		const account = await this.runStep(
			'Get Account',
			retrieveAccountFromUsername.bind(null, username),
		)
		await this.runStep(
			'Assert account password',
			account.verifyPassword.bind(account, password),
		)
		const jwt = await this.runStep(
			'Create JWT Token',
			createToken.bind(null, account),
		)

		return {
			token: jwt,
			userInfos: account.getInfo(),
		}
	}
}
