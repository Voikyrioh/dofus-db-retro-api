'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = (options, seedLink) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = (db) => {
  return db.runSql(`create fulltext index item_name_index on item (name);`);
};

exports.down = (db) => {
  return db.runSql(`drop index item_name_index ON item;`);
};

exports._meta = {
  "version": 1
};
