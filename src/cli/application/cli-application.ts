import {
  AppConfig,
  AppExceptionFilter,
  AuthExceptionFilter,
  MongoDBClient,
} from '../../shared/libs/index.js';
import { Application } from '../../application/application.js';
import { UserController } from '../../shared/modules/user/user.controller.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/default-offer.service.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { OfferController } from '../../shared/modules/offer/offer.controller.js';
import { CommentModel } from '../../shared/modules/comment/comment.entity.js';
import { DefaultCommentService } from '../../shared/modules/comment/default-comment.service.js';
import { CommentController } from '../../shared/modules/comment/comment.controller.js';
import { DefaultAuthService } from '../../shared/modules/auth/default-auth.service.js';

const configureApp = async () => {
  const logger = console;
  const config = new AppConfig();
  const dbClient = new MongoDBClient(config, logger);
  const userService = new DefaultUserService(logger, UserModel);
  const offerService = new DefaultOfferService(logger, OfferModel);
  const authService = new DefaultAuthService(logger, userService, config);
  const commentService = new DefaultCommentService(logger, CommentModel);
  const userController = new UserController(
    logger,
    config,
    userService,
    offerService,
    authService,
  );
  const offerController = new OfferController(
    logger,
    config,
    offerService,
    userService,
    commentService,
  );
  const commentController = new CommentController(
    logger,
    commentService,
    offerService,
  );
  const authExceptionFilter = new AuthExceptionFilter(logger);
  const exceptionFilter = new AppExceptionFilter(logger);
  const app = new Application(
    logger,
    config,
    dbClient,
    exceptionFilter,
    authExceptionFilter,
    userController,
    offerController,
    commentController,
  );
  await app.init();
  return app;
};

export { configureApp };

