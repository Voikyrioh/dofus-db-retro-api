import { FunctionalError, HttpCodes } from '@Voikyrioh/observability'
import config from '@config'
import { betterZodValidator } from '@libraries'
import { Hono } from 'hono'
import { deleteCookie, setCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import { usecases } from '../../../domain/usecases'
import { authMiddleware } from '../../middlewares/auth'
import { loginSchema, registerSchema } from './auth.dto'

const router = new Hono()

router.post(
	'/register',
	betterZodValidator('json', registerSchema),
	async (c) => {
		const account = c.req.valid('json')

		return c.json(await usecases.auth.register.Execute(account))
	},
)

router.post('/login', betterZodValidator('json', loginSchema), async (c) => {
	const account = c.req.valid('json')
	try {
		const { token, userInfos } = await usecases.auth.login.Execute(
			account.username,
			account.password,
		)

		setCookie(c, 'access-token', token, {
			domain: config.Server.Domain,
			expires: new Date(Date.now() + config.Server.JwtExpiresMs),
		})

		return c.json({ ...userInfos, token })
	} catch (e) {
		if (
			e instanceof FunctionalError &&
			['unauthorized', 'not-found'].includes(e.code ?? '')
		)
			throw new HTTPException(HttpCodes.BAD_REQUEST, {
				message: 'INVALID_CREDENTIALS',
			})
		else throw e
	}
})

router.get('/logout', authMiddleware(), async (c) => {
	deleteCookie(c, 'access-token')

	return c.text('Logged out successfully')
})

export default router
