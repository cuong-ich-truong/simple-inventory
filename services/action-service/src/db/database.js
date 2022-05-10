const { SQLDataSource } = require('datasource-sql');
const { ACTIONS_TBL } = require('./constant');

class ActionDatabase extends SQLDataSource {
  async runSeed() {
    await this.knex.schema.createTable(ACTIONS_TBL, (table) => {
      table.increments('id').primary();
      table.string('type').notNullable();
      table.string('sender');
      table.string('payload');
      table.integer('timestamp');
    });
  }
}

module.exports = ActionDatabase;
