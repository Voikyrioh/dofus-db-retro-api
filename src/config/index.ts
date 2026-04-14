import { generateConfig } from './generate-config'
import ServerConfig from './params/server.config'

export default {
	Server: generateConfig<
		typeof ServerConfig,
		{
			Environment: string
			WebsiteUrl: string
			Host: string
			Port: number
			MySqlHost: string
			MySqlUser: string
			MySqlPassword: string
			MySqlDatabase: string
			MySqlPort: number,
			JwtSignKey: string
			JwtPubKey: string
			Domain: string
			JwtExpiresMs: string
			LogFile: string|null
		}
	>(ServerConfig),
}
