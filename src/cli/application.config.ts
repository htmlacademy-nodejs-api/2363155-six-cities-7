import { AppConfig, MongoDBClient } from '../shared/libs/index.js';
import { Application } from '../application/application.js';

const configureApp = async () => {
  const logger = console;
  const config = new AppConfig();
  const dbClient = new MongoDBClient(config, logger);
  const app = new Application(logger, config, dbClient);
  await app.init();
  return app;
};

export { configureApp };
