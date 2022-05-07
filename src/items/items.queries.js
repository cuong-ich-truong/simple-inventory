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

module.exports = { getItemsQuery, getItemByIdQuery };
