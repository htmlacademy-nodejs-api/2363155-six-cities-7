import {
  AppConfig,
  AppExceptionFilter,
  MongoDBClient,
} from '../../shared/libs/index.js';
import { Application } from '../../application/application.js';
import { UserController } from '../../shared/modules/user/user.controller.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/offer.service.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { OfferController } from '../../shared/modules/offer/offer.controller.js';

const configureApp = async () => {
  const logger = console;
  const config = new AppConfig();
  const dbClient = new MongoDBClient(config, logger);
  const userService = new DefaultUserService(logger, UserModel);
  const userController = new UserController(logger, userService, config);
  const offerService = new DefaultOfferService(logger, OfferModel);
  const offerController = new OfferController(logger, offerService);
  const exceptionFilter = new AppExceptionFilter(logger);
  const app = new Application(
    logger,
    config,
    dbClient,
    exceptionFilter,
    userController,
    offerController,
  );
  await app.init();
  return app;
};

export { configureApp };
