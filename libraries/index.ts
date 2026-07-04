// Erreurs unifiées : ré-exportées depuis la lib partagée (transition douce des
// consommateurs de @libraries).
export {
	AppError,
	DomainError,
	FunctionalError,
	ServiceError,
} from '@Voikyrioh/observability'
export { betterZodValidator } from './custom-zod-types/validator'
