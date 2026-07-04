import { UseCase } from '@Voikyrioh/observability'
import { AccountEntity, type AccountInfo } from '../../entities/account.entity'
import { checkAccountAlreadyExists, saveAccount } from './auth.service'

export class RegisterAccountUseCase extends UseCase {
	async Execute(accountInfos: {
		username: string
		password: string
		email: string
	}): Promise<void> {
		await this.runStep(
			'Check Account Already Exists',
			checkAccountAlreadyExists.bind(null, accountInfos.username),
		)
		const account = await this.runStep(
			'Create Account',
			AccountEntity.CreateAccount.bind(
				null,
				accountInfos.username,
				accountInfos.password,
				accountInfos.email,
			),
		)
		await this.runStep('Register Account', saveAccount.bind(null, account))
	}
}
