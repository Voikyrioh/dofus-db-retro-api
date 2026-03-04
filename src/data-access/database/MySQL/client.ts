import config from '@config'
import * as mysql from 'mysql2/promise'

const pool = mysql.createPool({
	host: config.Server.MySqlHost,
	user: config.Server.MySqlUser,
	password: config.Server.MySqlPassword,
	database: config.Server.MySqlDatabase,
	port: config.Server.MySqlPort,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

pool.query('SELECT 1+1 FROM DUAL').catch(() => {
	throw new Error('Cannot connect to database: ')
})

export const mySql = Object.freeze(pool)
