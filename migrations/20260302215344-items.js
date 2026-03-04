

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

exports.up = (db) => db.runSql(`
    CREATE TABLE IF NOT EXISTS \`item\`
    (
      \`id\`            int(11)                                          NOT NULL DEFAULT '-1',
      \`type\`          int(11)                                          NOT NULL DEFAULT '-1',
      \`name\`          varchar(50) CHARACTER SET utf8 COLLATE utf8_bin  NOT NULL DEFAULT '',
      \`level\`         int(11)                                          NOT NULL DEFAULT '1',
      \`statsTemplate\` varchar(300) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
      \`pod\`           int(11)                                          NOT NULL DEFAULT '0',
      \`panoplie\`      int(11)                                          NOT NULL DEFAULT '-1',
      \`prix\`          int(11)                                          NOT NULL DEFAULT '0' COMMENT 'prix de vente PAR un Npc',
      \`condition\`     varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
      \`armesInfos\`    varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
      KEY \`id\` (\`id\`)
    )
  `)

exports.down = (db) => db.runSql('DROP TABLE IF EXISTS `item`')

exports._meta = {
	version: 1,
}
