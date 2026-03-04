

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

exports.up = (db) => db.runSql(`ALTER TABLE item ADD COLUMN gfxId INT`)

exports.down = (db) => db.runSql(`ALTER TABLE item DROP COLUMN gfxId`)

exports._meta = {
	version: 1,
}
