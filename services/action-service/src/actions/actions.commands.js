const { ACTIONS_TBL } = require('../db/constant');

const createAction = async (args, db) => {
  const { sender, type, payload, timestamp } = args;

  const records = await db(ACTIONS_TBL).insert({
    type,
    sender,
    timestamp,
    payload,
  });

  return records[0];
};

module.exports = {
  createAction,
};
