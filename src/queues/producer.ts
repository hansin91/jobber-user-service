import { DirectMessage, winstonLogger } from '@hansin91/jobber-shared';
import { config } from '@users/config';
import { Channel } from 'amqplib';
import { Logger } from 'winston';
import { createConnection } from '@users/queues/connection';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'usersServiceProducer', 'debug');

export const publishDirectMessage = async (payload: DirectMessage): Promise<void> => {
  let {channel} = payload;
  const {exchangeName, routingKey, logMessage, message} = payload;
  try {
    if (!channel) {channel = await createConnection() as Channel;}
    await channel.assertExchange(exchangeName, 'direct');
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log('error', 'UsersService publishDirectMessage() method error', error);
  }
};
