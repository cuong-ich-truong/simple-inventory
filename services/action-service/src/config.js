/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  MESSAGE_EXCHANGE_NAME: process.env.MESSAGE_EXCHANGE_NAME,
  RABBITMQ_URL: process.env.RABBITMQ_URL,
};
