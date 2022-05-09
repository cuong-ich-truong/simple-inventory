var amqp = require('amqplib/callback_api');
const { RABBITMQ_URL, MESSAGE_EXCHANGE_NAME } = require('../config');

/**
 *
 * @param {object} payload
 * @param {string} route 'ACTION' | 'EVENT'
 */
const sendMessage = (payload, messageType) => {
  try {
    amqp.connect(RABBITMQ_URL, (connectionError, connection) => {
      if (connectionError) {
        throw connectionError;
      }

      connection.createChannel((channelError, channel) => {
        if (channelError) {
          throw channelError;
        }

        const msgExchange = MESSAGE_EXCHANGE_NAME;
        const msg = {
          source: 'InventoryService',
          type: messageType,
          payload,
          timestamp: Date.now(),
        };
        const msgStr = JSON.stringify(msg);

        // Get the message exchange
        channel.assertExchange(msgExchange, 'direct', {
          durable: true,
        });

        // eslint-disable-next-line no-undef
        channel.publish(msgExchange, messageType, Buffer.from(msgStr), {
          persistent: true,
        });

        console.log(
          `[${Date.now()}] Sent an ${messageType} message:[${msgStr}] to exchange:[${msgExchange}]`,
        );
      });

      setTimeout(() => {
        connection.close();
      }, 500);
    });
  } catch (error) {
    console.log(error);
  }
};

const sendActionMessage = (payload) => sendMessage(payload, 'ACTION');

const sendEventMessage = (payload) => sendMessage(payload, 'EVENT');

module.exports = { sendActionMessage, sendEventMessage };
