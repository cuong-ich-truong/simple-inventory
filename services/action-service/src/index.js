const amqp = require('amqplib/callback_api');
const express = require('express');
const { RABBITMQ_URL, MESSAGE_EXCHANGE_NAME } = require('./config');
const ActionDatabase = require('./db/database');
const knexInstance = require('./db/knex');
const { getActions } = require('./actions/actions.queries');
const { createAction } = require('./actions/actions.commands');

const actionDb = new ActionDatabase(knexInstance);
actionDb.runSeed();

const app = express();
const port = 4001;

app.get('/actions', (req, res, next) => {
  getActions({}, actionDb.knex)
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

app.listen(port, () => {
  console.log(`Microservice listening on port ${port}`);
});

amqp.connect(RABBITMQ_URL, (connectionError, connection) => {
  if (connectionError) {
    throw connectionError;
  }
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }

    const msgExchange = MESSAGE_EXCHANGE_NAME;
    const msgType = 'ACTION';
    channel.assertExchange(msgExchange, 'direct', {
      durable: true,
    });

    channel.assertQueue(
      'ACTION_QUEUE',
      { exclusive: true },
      (queueError, q) => {
        if (queueError) {
          throw queueError;
        }
        console.log(
          `Microservice is waiting for messages with type ${msgType}. To exit press CTRL+C`,
        );

        channel.bindQueue(q.queue, msgExchange, msgType);

        channel.consume(
          q.queue,
          (msg) => {
            console.log(`[${Date.now()}] Received ${msg.content.toString()}`);
            try {
              createAction(JSON.parse(msg.content), actionDb.knex);
            } catch (error) {
              console.log(error);
            }
          },
          {
            noAck: true,
          },
        );
      },
    );
  });
});
