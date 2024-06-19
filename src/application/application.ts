import { injectable, inject } from 'inversify';
import type {
  Config,
  DBClient,
  Logger,
  ConfigSchema,
} from '../shared/libs/index.js';
import { Component } from '../models/component.enum.js';

@injectable()
class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
    @inject(Component.DBClient) private readonly dbClient: DBClient,
  ) {}

  public async init() {
    this.logger.info('App initialized');
    this.logger.info(`Current port: ${this.config.get('PORT')}`);

    this.logger.info('Initialize database…');
    await this.dbClient.connect();
    this.logger.info('Database initialized');
  }

  public async close() {
    await this.dbClient.disconnect();
    this.logger.info('Exited successfully!');
  }
}

export { Application };
