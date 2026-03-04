

var dbm
var type
var seed

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = (options, seedLink) => {
	dbm = options.dbmigrate
	type = dbm.dataType
	seed = seedLink
}

exports.up = (db) => db.runSql(
		`CREATE TABLE IF NOT EXISTS \`crafts\` ( \`id\` int(11) NOT NULL, \`craft\` text NOT NULL, UNIQUE KEY \`id\` (\`id\`));`,
	)

exports.down = (db) => db.runSql('DROP TABLE IF EXISTS `crafts`')

exports._meta = {
	version: 1,
}
