

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
    CREATE TABLE IF NOT EXISTS \`monsters\` (
    \`id\` int(11) NOT NULL,
    \`name\` varchar(100) NOT NULL,
    \`gfxID\` int(11) NOT NULL,
    \`align\` int(11) NOT NULL,
    \`grades\` text NOT NULL,
    \`colors\` varchar(30) NOT NULL DEFAULT '-1,-1,-1',
    \`stats\` text NOT NULL COMMENT 'For,Sag,Int,Cha,Agi',
    \`spells\` text NOT NULL,
    \`pdvs\` varchar(200) NOT NULL DEFAULT '1|1|1|1|1|1|1|1|1|1',
    \`points\` varchar(200) NOT NULL DEFAULT '1;1|1;1|1;1|1;1|1;1|1;1|1;1|1;1|1;1|1;1',
    \`inits\` varchar(200) NOT NULL DEFAULT '1|1|1|1|1|1|1|1|1|1',
    \`minKamas\` int(11) NOT NULL DEFAULT '0',
    \`maxKamas\` int(11) NOT NULL DEFAULT '0',
    \`exps\` varchar(200) NOT NULL DEFAULT '1|1|1|1|1|1|1|1|1|1',
    \`AI_Type\` int(11) NOT NULL DEFAULT '1' COMMENT '0: poutch 1: Agressif 2: Fuyarde 3: Soutient 4: Spécial',
    \`capturable\` int(11) NOT NULL DEFAULT '1',
    UNIQUE KEY \`id\` (\`id\`)
  )`)

exports.down = (db) => db.runSql('DROP TABLE IF EXISTS \`monsters\`')

exports._meta = {
	version: 1,
}
