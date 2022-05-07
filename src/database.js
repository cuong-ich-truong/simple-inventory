const { SQLDataSource } = require('datasource-sql');
const { ITEMS_TBL } = require('./constant');

class InventoryDatabase extends SQLDataSource {
  async runSeed() {
    await this.knex.schema.createTable(ITEMS_TBL, (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('description');
      table.string('tags');
      table.float('price');
      table.string('currency');
    });

    await this.knex.table(ITEMS_TBL).insert({
      name: 'Sony X85J 65" 4K UHD HDR LED Smart Google TV',
      description:
        'Experience your favourite movies, video games, and sports in true-to-life clarity with this 65" Sony 4K UHD smart TV.',
      price: 1097.98,
      currency: 'USD',
    });

    await this.knex.table(ITEMS_TBL).insert({
      name: 'Samsung 60" 4K UHD HDR QLED Tizen Smart TV',
      description:
        'Get ready for a spectacular visual experience with this Samsung 60" 4K smart TV.',
      price: 1099.99,
      currency: 'USD',
      tags: '4K|Samsung|QLED',
    });

    await this.knex.table(ITEMS_TBL).insert({
      name: 'LG 65" 4K UHD HDR OLED webOS Smart TV',
      description:
        'Bring the cinematic experience right to your home with the LG 65" HDR smart TV.',
      price: 2197.98,
      currency: 'USD',
      tags: '4K|LG|OLED',
    });
  }
}

module.exports = InventoryDatabase;
