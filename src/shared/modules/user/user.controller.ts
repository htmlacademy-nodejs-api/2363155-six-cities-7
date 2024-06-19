import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../models/index.js';
import {
  AddFavoriteOfferRequest,
  CreateUserRequest,
  LoginUserRequest,
  RemoveFavoriteOfferRequest,
  RequestUserParams,
} from './user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, ConfigSchema } from '../../libs/config/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { fillDTO } from '../../utils/service.js';
import { UserEndpoint } from './user-endpoint.enum.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { loginUserDtoSchema } from './dto/login-user.schema.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { createUserDtoSchema } from './dto/create-user.schema.js';
import { UploadFileMiddleware } from '../../libs/rest/middleware/upload-file.middelware.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-object-id.middleware.js';
import { AddFavoriteOfferDto } from './dto/add-favorite-offer.dto.js';
import { addFavoriteOfferDtoSchema } from './dto/add-favorite-offer.schema.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { OfferReducedRdo } from '../offer/rdo/offer-reduced.rdo.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.AuthService) private readonly authService: AuthService,
    @inject(Component.Config)
    private readonly configService: Config<ConfigSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');
    this.addRoute({
      path: UserEndpoint.SignUp,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateDtoMiddleware(CreateUserDto, createUserDtoSchema),
      ],
    });
    this.addRoute({
      path: UserEndpoint.LogIn,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [
        new ValidateDtoMiddleware(LoginUserDto, loginUserDtoSchema),
      ],
    });
    this.addRoute({
      path: UserEndpoint.LogIn,
      method: HttpMethod.Get,
      handler: this.checkToken,
    });
    this.addRoute({
      path: UserEndpoint.LogOut,
      method: HttpMethod.Post,
      handler: this.logout,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: UserEndpoint.UploadAvatar,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new UploadFileMiddleware(
          this.configService.get('STATIC_DIR'),
          'avatar',
        ),
      ],
    });
    this.addRoute({
      path: UserEndpoint.UserFavorites,
      method: HttpMethod.Get,
      handler: this.showFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
      ],
    });
    this.addRoute({
      path: UserEndpoint.UserFavorites,
      method: HttpMethod.Post,
      handler: this.addOfferToFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId', 'body'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new DocumentExistsMiddleware(
          this.offerService,
          'offer',
          'offerId',
          'body',
        ),
        new ValidateDtoMiddleware(
          AddFavoriteOfferDto,
          addFavoriteOfferDtoSchema,
        ),
      ],
    });
    this.addRoute({
      path: UserEndpoint.RemoveFromFavorites,
      method: HttpMethod.Delete,
      handler: this.removeOfferFromFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new DocumentExistsMiddleware(
          this.offerService,
          'offer',
          'offerId',
          'params',
        ),
      ],
    });
  }

  public async create(
    { body }: CreateUserRequest,
    res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email "${body.email}" already exists.`,
        'UserController',
      );
    }

    const result = await this.userService.create(
      body,
      this.configService.get('SALT'),
    );
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, {
      email: user.email,
      token,
    });
    this.ok(res, responseData);
  }

  public async checkToken(
    { tokenPayload }: Request,
    res: Response,
  ): Promise<void> {
    this.ok(res, tokenPayload);
  }

  public async logout(_req: object, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async showFavorites(
    { params }: Request<RequestUserParams>,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.findFavorites(params.userId);
    this.ok(res, fillDTO(OfferReducedRdo, result));
  }

  public async addOfferToFavorites(
    { params, body }: AddFavoriteOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.addOfferToFavorites(
      params.userId,
      body.offerId,
    );
    this.ok(res, fillDTO(OfferReducedRdo, result));
  }

  public async removeOfferFromFavorites(
    { params }: RemoveFavoriteOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.removeOfferFromFavorites(
      params.userId,
      params.offerId,
    );
    this.ok(res, fillDTO(OfferReducedRdo, result));
  }

  public async uploadAvatar(
    { params, file }: Request<RequestUserParams>,
    res: Response,
  ) {
    const { userId } = params;
    const uploadDto: UpdateUserDto = { avatarUrl: file?.filename };
    await this.userService.updateById(userId, uploadDto);
    this.created(res, fillDTO(UploadUserAvatarRdo, uploadDto));
  }
}
