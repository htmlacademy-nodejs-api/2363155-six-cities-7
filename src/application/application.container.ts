import { Container } from 'inversify';
import { Component } from '../models/component.enum.js';
import {
  AppConfig,
  AppLogger,
  Config,
  ConfigSchema,
  DBClient,
  Logger,
  MongoDBClient,
} from '../shared/libs/index.js';
import { Application } from './application.js';

const createApplicationContainer = () => {
  const container = new Container();
  container
    .bind<Application>(Component.Application)
    .to(Application)
    .inSingletonScope();
  container.bind<Logger>(Component.Logger).to(AppLogger).inSingletonScope();
  container
    .bind<Config<ConfigSchema>>(Component.Config)
    .to(AppConfig)
    .inSingletonScope();
  container
    .bind<DBClient>(Component.DBClient)
    .to(MongoDBClient)
    .inSingletonScope();

  return container;
};

export { createApplicationContainer };
