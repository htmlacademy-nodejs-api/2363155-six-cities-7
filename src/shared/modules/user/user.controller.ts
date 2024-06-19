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
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { OfferReducedRdo } from '../offer/rdo/offer-reduced.rdo.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { AuthService } from '../auth/auth-service.interface.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UploadUserAvatarRdo } from './rdo/upload-user-avatar.rdo.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { OfferRdo } from '../offer/rdo/offer.rdo.js';
import { DocumentOwnerMiddleware } from '../../libs/rest/middleware/document-owner.middleware.js';
import { DocumentCollection } from '../../libs/rest/types/document-collection.enum.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Config)
    private readonly config: Config<ConfigSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.AuthService) private readonly authService: AuthService,
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
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('id', 'tokenPayload'),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          'id',
          'tokenPayload',
        ),
      ],
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
        new ValidateObjectIdMiddleware('userId'),
        new DocumentExistsMiddleware(this.userService, 'user', 'userId'),
        new DocumentOwnerMiddleware(this.userService, DocumentCollection.Users, 'userId'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIR'), 'avatar'),
      ],
    });
    this.addRoute({
      path: UserEndpoint.UserFavorites,
      method: HttpMethod.Get,
      handler: this.showFavorites,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: UserEndpoint.UserFavoritesDetailed,
      method: HttpMethod.Get,
      handler: this.showFavoritesDetailed,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: UserEndpoint.UserFavoriteOffer,
      method: HttpMethod.Post,
      handler: this.addOfferToFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateObjectIdMiddleware('id', 'tokenPayload'),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          'id',
          'tokenPayload',
        ),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ],
    });
    this.addRoute({
      path: UserEndpoint.UserFavoriteOffer,
      method: HttpMethod.Delete,
      handler: this.removeOfferFromFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateObjectIdMiddleware('id', 'tokenPayload'),
        new DocumentExistsMiddleware(
          this.userService,
          'User',
          'id',
          'tokenPayload',
        ),
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

    const result = await this.userService.create(body, this.config.get('SALT'));
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
    { tokenPayload }: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.findFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferReducedRdo, result));
  }

  public async showFavoritesDetailed(
    { tokenPayload }: Request,
    res: Response,
  ): Promise<void> {
    const result = await this.userService.findFavorites(tokenPayload.id);
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async addOfferToFavorites(
    { params, tokenPayload }: AddFavoriteOfferRequest,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${params.offerId}" not found`,
        'UserController',
      );
    }

    await this.userService.addOfferToFavorites(tokenPayload.id, offer.id);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async removeOfferFromFavorites(
    { params, tokenPayload }: RemoveFavoriteOfferRequest,
    res: Response,
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);

    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${params.offerId}" not found`,
        'UserController',
      );
    }

    const result = await this.userService.removeOfferFromFavorites(
      tokenPayload.id,
      offer.id,
    );
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async uploadAvatar(
    { params, file }: Request<RequestUserParams>,
    res: Response,
  ) {
    const uploadDto: UpdateUserDto = { avatarUrl: file?.filename };
    await this.userService.updateById(params.userId, uploadDto);
    this.created(res, fillDTO(UploadUserAvatarRdo, uploadDto));
  }
}

