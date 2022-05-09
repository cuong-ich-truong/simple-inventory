const { ITEMS_TBL } = require('../constant');
const { itemMapper } = require('./items');

const getItemsQuery = async (db) => {
  const records = await db(ITEMS_TBL).select('*');

  return records.map((record) => itemMapper(record));
};

const getItemByIdQuery = async (args, db) => {
  const { id } = args;
  const records = await db(ITEMS_TBL).select('*').where({ id: id });

  return records.length > 0 ? itemMapper(records[0]) : undefined;
};

const filterItemsQuery = async (args, db) => {
  const { name, description, priceFrom, priceTo } = args;
  const records = await db(ITEMS_TBL)
    .select('*')
    .modify((queryBuilder) => {
      if (name && name.length > 0) {
        queryBuilder.whereLike('name', `%${name}%`);
      }
      if (description && description.length > 0) {
        queryBuilder.andWhereLike('description', `%${description}%`);
      }
      if (priceFrom && priceFrom > 0) {
        queryBuilder.andWhere('price', '>=', priceFrom);
      }
      if (priceTo && priceTo > 0) {
        queryBuilder.andWhere('price', '<=', priceTo);
      }
    });

  return records.map((record) => itemMapper(record));
};

module.exports = { getItemsQuery, getItemByIdQuery, filterItemsQuery };
