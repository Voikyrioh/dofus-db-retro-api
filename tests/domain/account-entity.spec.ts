import { expect } from 'chai'
import { ulid } from 'ulid'
import { AccountEntity } from '../../src/domain/entities/account.entity'
import { AppError } from '../../libraries/errors/app.error'

const validAccount = (overrides = {}) => ({
	id: ulid(),
	username: 'testuser',
	passwordHash: 'hashedpassword',
	email: 'test@example.com',
	role: 1 as const,
	...overrides,
})

describe('AccountEntity', () => {
	describe('constructor', () => {
		it('should create an instance with all fields assigned correctly', () => {
			const id = ulid()
			const entity = new AccountEntity({ id, username: 'testuser', passwordHash: 'hashedpassword', email: 'test@example.com', role: 1 })

			expect(entity.id).to.equal(id)
			expect(entity.username).to.equal('testuser')
			expect(entity.passwordHash).to.equal('hashedpassword')
			expect(entity.email).to.equal('test@example.com')
			expect(entity.role).to.equal(1)
		})

		it('should throw when id is not a valid ULID', () => {
			expect(() => new AccountEntity(validAccount({ id: 'not-a-ulid' }))).to.throw()
		})
	})

	describe('CreateAccount', () => {
		it('should resolve to an AccountEntity instance', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity).to.be.instanceOf(AccountEntity)
		})

		it('should assign a valid ULID as id', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity.id).to.match(/^[0-9A-HJKMNP-TV-Z]{26}$/)
		})

		it('should store username and email as-is', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity.username).to.equal('testuser')
			expect(entity.email).to.equal('test@example.com')
		})

		it('should store passwordHash as a non-empty string', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity.passwordHash).to.be.a('string').and.not.be.empty
		})

		it('should not store the plain-text password as passwordHash', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity.passwordHash).to.not.equal('password123')
		})

		it('should assign USER role (1) by default', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			expect(entity.role).to.equal(1)
		})
	})

	describe('changePassword', () => {
		it('should update passwordHash to the new value', () => {
			const entity = new AccountEntity(validAccount({ passwordHash: 'oldhash' }))

			entity.changePassword('newhash')

			expect(entity.passwordHash).to.equal('newhash')
		})

		it('should return the same instance to support chaining', () => {
			const entity = new AccountEntity(validAccount())

			const result = entity.changePassword('newhash')

			expect(result).to.equal(entity)
		})
	})

	describe('verifyPassword', () => {
		it('should resolve without throwing for the correct password', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			await entity.verifyPassword('password123')
		})

		it('should throw an AppError for an incorrect password', async () => {
			const entity = await AccountEntity.CreateAccount('testuser', 'password123', 'test@example.com')

			try {
				await entity.verifyPassword('wrongpassword')
				expect.fail('Expected verifyPassword to throw')
			} catch (err) {
				expect(err).to.be.instanceOf(AppError)
			}
		})
	})

	describe('setAsAdmin', () => {
		it('should set role to ADMIN (2)', () => {
			const entity = new AccountEntity(validAccount())

			entity.setAsAdmin()

			expect(entity.role).to.equal(2)
		})

		it('should return the same instance to support chaining', () => {
			const entity = new AccountEntity(validAccount())

			const result = entity.setAsAdmin()

			expect(result).to.equal(entity)
		})
	})

	describe('getInfo', () => {
		it('should return username and email', () => {
			const entity = new AccountEntity(validAccount())

			expect(entity.getInfo()).to.deep.equal({ username: 'testuser', email: 'test@example.com' })
		})

		it('should return a frozen object', () => {
			const entity = new AccountEntity(validAccount())

			expect(Object.isFrozen(entity.getInfo())).to.be.true
		})
	})

	describe('getInfoExt', () => {
		it('should return id, username, email, and role', () => {
			const id = ulid()
			const entity = new AccountEntity({ id, username: 'testuser', passwordHash: 'hash', email: 'test@example.com', role: 1 })

			expect(entity.getInfoExt()).to.deep.equal({ id, username: 'testuser', email: 'test@example.com', role: 1 })
		})

		it('should return a frozen object', () => {
			const entity = new AccountEntity(validAccount())

			expect(Object.isFrozen(entity.getInfoExt())).to.be.true
		})
	})
})
