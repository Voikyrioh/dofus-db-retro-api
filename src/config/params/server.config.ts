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
}
