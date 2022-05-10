const { ACTIONS_TBL } = require('../db/constant');

const getActions = async (args, db) => {
  const records = await db(ACTIONS_TBL).select('*');
  return records.map((record) => ({
    ...record,
    payload: record.payload ? JSON.parse(record.payload) : {},
  }));
};

module.exports = {
  getActions,
};
