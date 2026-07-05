import { AppError, DomainError } from '@errors/app.error'
import { ErrorsCodes } from '@errors/http.error'
import type { Context } from 'hono'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'
import { ZodError } from 'zod'

/** Generic (client-safe) messages for the hidden families. */
const GENERIC: Record<'domain' | 'service', string> = {
	domain: ErrorsCodes.INTERNAL_SERVER_ERROR,
	service: ErrorsCodes.BAD_GATEWAY,
}

/**
 * Centralised error handler (wired on app.onError). Only functional errors relay
 * their code + message (+ validation details); domain (500) and service (502)
 * answer a generic message. A raw ZodError is an internal parse (entity) → domain
 * (endpoint validation is converted to a FunctionalError by betterZodValidator).
 * Explicit HTTPException (deliberate responses) pass through unchanged.
 */
export function handleHttpErrors(error: unknown, c: Context) {
	if (error instanceof AppError) {
		if (error.family === 'functional') {
			return c.json(
				{
					code: error.code,
					message: error.message,
					...(error.details !== undefined ? { details: error.details } : {}),
				},
				error.httpCode as ContentfulStatusCode,
			)
		}
		return c.json(
			{ message: GENERIC[error.family as 'domain' | 'service'] },
			error.httpCode as ContentfulStatusCode,
		)
	}

	if (error instanceof HTTPException) return error.getResponse()

	if (error instanceof ZodError) {
		const domain = new DomainError('Unexpected schema violation', error)
		return c.json(
			{ message: GENERIC.domain },
			domain.httpCode as ContentfulStatusCode,
		)
	}

	const unknown = new DomainError('Unhandled error', error)
	return c.json(
		{ message: GENERIC.domain },
		unknown.httpCode as ContentfulStatusCode,
	)
}
