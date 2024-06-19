import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';
import { ExceptionFilter } from './exception-filter.interface.js';
import { Logger } from '../../logger/logger.interface.js';
import { Component } from '../../../models/component.enum.js';
import { BaseAuthError } from '../../../modules/auth/errors/base-auth-error.js';

@injectable()
class AuthExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(
    error: unknown,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (!(error instanceof BaseAuthError)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.statusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}

export { AuthExceptionFilter };
