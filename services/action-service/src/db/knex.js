const knexInstance = require('knex')({
  client: 'better-sqlite3',
  connection: {
    filename: ':memory:',
  },
  useNullAsDefault: true,
});

module.exports = knexInstance;
