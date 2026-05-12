import { createPool } from 'mysql2/promise'
import { readFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const pool = createPool({
	host: process.env.MYSQL_HOST ?? 'localhost',
	user: process.env.MYSQL_USER ?? 'dofus_user',
	password: process.env.MYSQL_PASSWORD ?? 'dofus_password',
	database: process.env.MYSQL_DATABASE ?? 'dofus_db',
	port: parseInt(process.env.MYSQL_PORT ?? '33061'),
	multipleStatements: true,
})

const DUMPS = ['items.sql', 'mobs.sql', 'crafts.sql', 'items-gfx.sql']

async function main() {
	const [rows] = await pool.query('SELECT COUNT(*) as count FROM item') as [{ count: number }[], unknown]
	const count = rows[0].count

	if (count > 0) {
		console.log(`Seed skipped — ${count} items already in database.`)
		await pool.end()
		return
	}

	console.log('Database is empty. Running seed...')

	const dumpsDir = join(__dirname, '../migrations/dumps')

	for (const dump of DUMPS) {
		console.log(`  Loading ${dump}...`)
		const sql = await readFile(join(dumpsDir, dump), 'utf-8')
		await pool.query(sql)
		console.log(`  ${dump} done.`)
	}

	console.log('Seed complete.')
	await pool.end()
}

main().catch(err => {
	console.error('Seed failed:', err)
	process.exit(1)
})
