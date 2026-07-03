import { HttpCodes } from '@errors/http.error'
import Logger from '@logger'

/**
 * Three error families, each with a deterministic HTTP + logging behaviour:
 *  - functional: an expected error (input checks, expected outcomes). Its code +
 *    message (+ per-field details for validation) are relayed to the client.
 *  - domain: invalid data broke an entity → the domain can't process the request.
 *    Answers 500, hidden from the client.
 *  - service: an unexpected failure from a third party (API, DB, SDK) the consumer
 *    chose not to handle. Answers 502, hidden from the client.
 *
 * Rule: never wrap an AppError inside another AppError — it propagates as-is.
 * Only domain/service wrap a native cause. This guarantees one log per incident.
 */
export type ErrorFamily = 'functional' | 'domain' | 'service'

/** Functional codes map to 4xx only (500/502 belong to domain/service). */
export type FunctionalCode =
	| 'no-data'
	| 'not-found'
	| 'invalid-payload'
	| 'unauthorized'
	| 'forbidden'
	| 'conflict'
	| 'service-unavailable'

const FUNCTIONAL_HTTP: Record<FunctionalCode, HttpCodes> = {
	'no-data': HttpCodes.NO_CONTENT,
	'not-found': HttpCodes.NOT_FOUND,
	'invalid-payload': HttpCodes.BAD_REQUEST,
	unauthorized: HttpCodes.UNAUTHORIZED,
	forbidden: HttpCodes.FORBIDDEN,
	conflict: HttpCodes.CONFLICT,
	'service-unavailable': HttpCodes.SERVICE_UNAVAILABLE,
}

/** Serialise a native cause (message + stack) for the single log entry. */
function flattenCause(
	cause: unknown,
): { message: string; stack?: string } | undefined {
	if (cause === undefined || cause === null) return undefined
	if (cause instanceof Error) return { message: cause.message, stack: cause.stack }
	return { message: String(cause) }
}

interface AppErrorParams {
	family: ErrorFamily
	httpCode: HttpCodes
	message: string
	code?: FunctionalCode
	details?: unknown
	cause?: unknown
}

export abstract class AppError extends Error {
	readonly family: ErrorFamily
	readonly httpCode: HttpCodes
	readonly code?: FunctionalCode
	readonly details?: unknown

	protected constructor(params: AppErrorParams) {
		super(params.message, { cause: params.cause })
		this.name = new.target.name
		this.family = params.family
		this.httpCode = params.httpCode
		this.code = params.code
		this.details = params.details

		// One structured log per incident, at construction, level by family.
		const payload = {
			family: this.family,
			code: this.code,
			cause: flattenCause(params.cause),
		}
		if (this.family === 'functional') Logger.info(payload, this.message)
		else Logger.error(payload, this.message)
	}
}

/** Expected error relayed to the client (code + message [+ per-field details]). */
export class FunctionalError extends AppError {
	constructor(code: FunctionalCode, message: string, details?: unknown) {
		super({ family: 'functional', httpCode: FUNCTIONAL_HTTP[code], code, message, details })
	}
}

/** Invalid data broke an entity → 500, hidden from the client. */
export class DomainError extends AppError {
	constructor(message: string, cause?: unknown) {
		super({
			family: 'domain',
			httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
			message,
			cause,
		})
	}
}

/** Unexpected third-party failure → 502, hidden from the client. */
export class ServiceError extends AppError {
	constructor(message: string, cause: unknown) {
		super({ family: 'service', httpCode: HttpCodes.BAD_GATEWAY, message, cause })
	}
}
