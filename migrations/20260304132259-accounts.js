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

exports.up = (db) => db.runSql(`
    create table accounts
    (
      id       varchar(26)  not null comment 'account ID'
        primary key,
      username varchar(60)      null,
      password varchar(500)     null,
      email    tinytext         null,
      role     tinyint unsigned not null,
      created_at timestamp default CURRENT_TIMESTAMP not null,
      updated_at timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
      constraint accounts_unique_username
        unique (username)
    );
  `);

exports.down = (db) => db.runSql(`
  DROP TABLE IF EXISTS accounts;
`);

exports._meta = {
  "version": 1
};
