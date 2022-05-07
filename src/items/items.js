/**
 * Maps the database record to the Item object
 * @param {Item} DatabaseRecord
 * @returns Item
 */
const itemMapper = (record) => {
  return {
    ...record,
    tags: record.tags ? record.tags.split('|') : [],
  };
};

module.exports = { itemMapper };
