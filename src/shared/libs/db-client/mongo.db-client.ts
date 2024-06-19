import { inject, injectable } from 'inversify';
import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { DBClient } from './db-client.interface.js';
import { Component } from '../../../models/component.enum.js';
import { Config } from '../config/config.interface.js';
import { ConfigSchema } from '../config/config.schema.js';
import { Logger } from '../logger/logger.interface.js';
import { getMongoURI } from '../../../utils/database.js';

const RETRIES_LIMIT = 3;
const RETRY_DELAY = 2000;

@injectable()
class MongoDBClient implements DBClient {
  private mongoose: typeof Mongoose | null = null;

  private get databaseURI(): string {
    return getMongoURI({
      host: this.config.get('DB_HOST'),
      port: this.config.get('DB_PORT'),
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      dbName: this.config.get('DB_NAME'),
    });
  }

  private get connected(): boolean {
    return this.mongoose?.connection.readyState === 1;
  }

  constructor(
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
    @inject(Component.Logger) private readonly logger: Logger,
  ) {}

  async connect() {
    if (this.connected) {
      throw new Error('MongoDBClient is already connected to database!');
    }

    this.logger.info('Initialize connection...');

    let retries = 0;
    while (retries < RETRIES_LIMIT) {
      try {
        this.logger.info(
          `Trying to connect to MongoDB (attempt ${retries + 1} of ${RETRIES_LIMIT})...`,
        );
        this.mongoose = await Mongoose.connect(this.databaseURI);
        this.logger.info('Database connection established');

        break;
      } catch (error) {
        this.logger.error('Failed to connect to MongoDB: ', error as Error);
        retries++;
        this.logger.info(`Retrying in ${RETRY_DELAY} ms...`);
        await setTimeout(RETRY_DELAY);
      }

      throw new Error(
        `Failed to connect to MongoDB after ${RETRIES_LIMIT} attempts!`,
      );
    }
  }

  async disconnect() {
    if (!this.connected || !this.mongoose) {
      throw new Error('MongoDBClient not connected to database!');
    }
    this.logger.info('Disconnecting from MongoDB...');
    await this.mongoose.disconnect();
    this.mongoose = null;
    this.logger.info('Database connection closed.');
  }
}

export { MongoDBClient };
