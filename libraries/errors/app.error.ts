export type ErrorCodes =
	'NO_DATA' |
	'NOT_FOUND' |
	'INVALID_PASSWORD' |
	'INTERNAL_SERVER_ERROR' |
	'FATAL_ERROR' |
	'UNKNOWN_ERROR'

export class AppError extends Error {
	name = 'AppError'
	type: ErrorCodes
	constructor(type: ErrorCodes, message: string) {
		super(message)
		this.type = type
	}
}
