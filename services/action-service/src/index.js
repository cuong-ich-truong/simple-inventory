const amqp = require('amqplib/callback_api');
const { RABBITMQ_URL, MESSAGE_EXCHANGE_NAME } = require('./config');

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
          },
          {
            noAck: true,
          },
        );
      },
    );
  });
});
