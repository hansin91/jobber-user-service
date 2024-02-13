// import fs from 'fs';
import { winstonLogger } from '@hansin91/jobber-shared';
import { Logger } from 'winston';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@users/config';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug');
const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
  auth: {
    username: config.ELASTIC_SEARCH_USERNAME,
    password: config.ELASTIC_SEARCH_PASSWORD
  },
  // tls: {
  //   ca: fs.readFileSync('./ca.crt'),
  //   rejectUnauthorized: false
  // }
});

const checkConnection = async(): Promise<void> => {
  let isConnected = false;
  while (!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`UsersService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to Elasticsearch failed. Retrying...');
      log.log('error', 'UsersService checkConnection() method:', error);
    }
  }
};

export { checkConnection };