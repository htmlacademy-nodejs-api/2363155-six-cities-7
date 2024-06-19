import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';

import { AuthService } from './auth-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Config, ConfigSchema } from '../../libs/config/index.js';

import { Component } from '../../models/component.enum.js';
import { UserService } from '../user/user-service.interface.js';
import { UserEntity } from '../user/user.entity.js';
import { TokenPayload } from '../../models/token-payload.type.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from '../../constants/auth.js';
import { LoginUserDto } from '../user/dto/login-user.dto.js';
import {
  UserNotFoundError,
  UserInvalidCredentialsError,
} from './errors/index.js';

@injectable()
class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<ConfigSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({ alg: JWT_ALGORITHM })
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`User with ${dto.email} not found`);
      throw new UserNotFoundError();
    }

    if (!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserInvalidCredentialsError();
    }

    return user;
  }
}

export { DefaultAuthService };
