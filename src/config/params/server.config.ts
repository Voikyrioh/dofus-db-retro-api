import { z } from 'zod/v4'
import { customZod } from '../../../libraries/custom-zod-types'

export default {
	Port: {
		name: 'PORT',
		description: 'Port to run the server',
		default: {
			_: 3000,
			production: 8080,
		},
		validator: customZod.application.port,
	},
	Host: {
		name: 'HOSTNAME',
		description: 'Who to listen to',
		default: {
			_: '127.0.0.1',
			production: '0.0.0.0',
		},
		validator: z.ipv4(),
	},
	Domain: {
		name: 'DOMAIN',
		description: 'Domain to listen to',
		default: {
			_: 'localhost',
			production: undefined
		},
		validator: z.string(),
	},
	MySqlHost: {
		name: 'MYSQL_HOST',
		description: 'MySQL host for access to database',
		default: {
			_: 'localhost',
			production: undefined,
		},
		validator: z.string(),
	},
	MySqlUser: {
		name: 'MYSQL_USER',
		description: 'MySQL user for access to database',
		default: {
			_: 'dofus_user',
			production: undefined,
		},
		validator: z.string(),
	},
	MySqlPassword: {
		name: 'MYSQL_PASSWORD',
		description: 'MySQL password for access to database',
		default: {
			_: 'dofus_password',
			production: undefined,
		},
		validator: z.string(),
	},
	MySqlDatabase: {
		name: 'MYSQL_DATABASE',
		description: 'MySQL database for access to database',
		default: {
			_: 'dofus_db',
			production: undefined,
		},
		validator: z.string(),
	},
	MySqlPort: {
		name: 'MYSQL_PORT',
		description: 'MySQL port for access to database',
		default: {
			_: 33061,
			production: undefined,
		},
		validator: z.number().min(1).max(65535),
	},
	JwtSignKey: {
		name: 'JWT_PRIVATE_KEY',
		description: 'Path to private key for signing JWT token',
		default: {
			_: './.ssl/id_rsa',
			production: undefined,
		},
		validator: z.string().min(1),
	},
	JwtExpiresMs: {
		name: 'JWT_EXPIRATION_TIME_MS',
		description: 'Path to private key for signing JWT token',
		default: {
			_: 3_600_000,
			production: undefined,
		},
		validator: z.number().int(),
	}
}
