import { inject, injectable } from 'inversify';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../models/index.js';
import { CreateUserRequest, LoginUserRequest } from './user-request.type.js';
import { UserService } from './user-service.interface.js';
import { Config, ConfigSchema } from '../../libs/config/index.js';
import { UserRdo } from './rdo/user.rdo.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { fillDTO } from '../../utils/service.js';
import { UserEndpoint } from './user-endpoint.enum.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config)
    private readonly configService: Config<ConfigSchema>,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController…');

    this.addRoute({
      path: UserEndpoint.SignUp,
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: UserEndpoint.LogIn,
      method: HttpMethod.Post,
      handler: this.login,
    });
    this.addRoute({
      path: UserEndpoint.LogOut,
      method: HttpMethod.Post,
      handler: this.logout,
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

  public async login(
    { body }: LoginUserRequest,
    _res: Response,
  ): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        `User with email ${body.email} not found.`,
        'UserController',
      );
    }

    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }

  public async logout(_req: object, _res: Response): Promise<void> {
    throw new HttpError(
      StatusCodes.NOT_IMPLEMENTED,
      'Not implemented',
      'UserController',
    );
  }
}
