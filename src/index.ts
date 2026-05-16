import { type ServerType, serve } from '@hono/node-server'
import app from './entry-point/app.js'
import process from 'node:process'
import Logger from '@logger'
import config from "@config";

let server: ServerType;
function graceFullStart() {
	return serve(
		{
			fetch: app.fetch,
			hostname: config.Server.Host,
			port: config.Server.Port,
		},
		(info) => {
			Logger.info('======== Server started ========')
			Logger.info(`Server is running on https://${config.Server.Host}:${info.port}`)
			Logger.info(`================================`)
		},
	)
}

function graceFullStop(errorCode: number) {
	server?.close((err) => {
		console.log(err);
		Logger.info('======== Server stopped ========')
		process.exit(errorCode)
	})
}
server = graceFullStart()
process.on('SIGINT', graceFullStop)
