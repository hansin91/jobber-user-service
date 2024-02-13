import { databaseConnection } from '@users/database';
import express, { Express } from 'express';
import { start } from '@users/server';

const initialize = (): void => {
  databaseConnection();
  const app: Express = express();
  start(app);
};

initialize();