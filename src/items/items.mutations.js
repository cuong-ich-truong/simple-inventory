const { ITEMS_TBL } = require('../constant');

/**
 * Add a new record to Items table
 * @param {object} args name, description, tags, price, currency
 * @param {knex} db
 * @returns Id of the new record
 */
const addItemMutation = async (args, db) => {
  const { name, description, tags, price, currency } = args;
  const tagString = Array.isArray(tags) ? tags.join('|') : tags;

  const newRecords = await db(ITEMS_TBL).insert({
    name,
    description,
    tags: tagString,
    price,
    currency,
  });

  return newRecords.length > 0 ? newRecords[0] : null;
};

module.exports = { addItemMutation };
