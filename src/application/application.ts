import { injectable, inject } from 'inversify';
import { Config, ConfigSchema } from '../shared/libs/config/index.js';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../models/component.enum.js';

@injectable()
class Application {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
  ) {}

  public async init() {
    this.logger.info('App initialized');
    this.logger.info(`Current port: ${this.config.get('PORT')}`);
  }
}

export { Application };
