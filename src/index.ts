import { type ServerType, serve } from '@hono/node-server'
import app from './entry-point/app.js'

async function start() {
	return serve(
		{
			fetch: app.fetch,
			port: 3000,
		},
		(info) => {
			console.log(`Server is running on http://localhost:${info.port}`)
		},
	)
}
async function gracefulShutdown(server: ServerType) {
	server.close()
}

start().then((server) => {
	process.on('SIGINT', () => gracefulShutdown(server))
})
