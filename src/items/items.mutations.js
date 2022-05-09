const { ITEMS_TBL } = require('../constant');
const { sendEventMessage } = require('../services/message-producer.service');

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

  if (newRecords.length < 1) {
    return null;
  }

  sendEventMessage({
    event: 'ItemAdded',
    args: { id: newRecords[0] },
  });

  return newRecords[0];
};

module.exports = { addItemMutation };
