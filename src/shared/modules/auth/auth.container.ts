import { Container } from 'inversify';

import { AuthService } from './auth-service.interface.js';
import { Component } from '../../models/component.enum.js';
import { DefaultAuthService } from './auth.service.js';
import { AuthExceptionFilter } from '../../libs/index.js';

function createAuthContainer() {
  const authContainer = new Container();
  authContainer
    .bind<AuthService>(Component.AuthService)
    .to(DefaultAuthService)
    .inSingletonScope();
  authContainer
    .bind<AuthExceptionFilter>(Component.AuthExceptionFilter)
    .to(AuthExceptionFilter)
    .inSingletonScope();

  return authContainer;
}

export { createAuthContainer };
