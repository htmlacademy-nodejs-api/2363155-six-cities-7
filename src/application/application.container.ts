import { Container } from 'inversify';
import { Component } from '../shared/models/component.enum.js';
import {
  AppConfig,
  AppExceptionFilter,
  AppLogger,
  Config,
  ConfigSchema,
  DBClient,
  ExceptionFilter,
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
  container
    .bind<ExceptionFilter>(Component.ExceptionFilter)
    .to(AppExceptionFilter)
    .inSingletonScope();

  return container;
};

export { createApplicationContainer };
