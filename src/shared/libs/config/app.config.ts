import dotenv from 'dotenv';
import { injectable } from 'inversify';
import { Config } from './config.interface.js';
import { ConfigSchema, configSchema } from './config.schema.js';
import { DEFAULT_ENVIRONMENT } from '../../../utils/env.js';

@injectable()
class AppConfig implements Config<ConfigSchema> {
  private readonly config: ConfigSchema;

  constructor() {
    const mode = process.env.NODE_ENV || DEFAULT_ENVIRONMENT;
    const { parsed, error } = dotenv.config({ path: `.env.${mode}` });

    if (error) {
      throw error;
    }

    configSchema.load(parsed);
    configSchema.validate({ allowed: 'strict' });

    this.config = configSchema.getProperties();
  }

  public get: Config<ConfigSchema>['get'] = (key) => this.config[key];
}

export { AppConfig };
