import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import { ExceptionFilter } from './exception-filter.interface.js';
import { Logger } from '../../logger/index.js';
import { HttpError } from '../errors/index.js';
import { Component } from '../../../models/component.enum.js';
import { createErrorObject } from '../../../utils/service.js';
import { DataValidationError } from '../errors/data-validation-error.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    this.logger.info('Register AppExceptionFilter');
  }

  private handleHttpError(
    error: HttpError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    this.logger.error(
      `[${error.detail}]: ${error.statusCode} — ${error.message}`,
      error,
    );
    res.status(error.statusCode).json(
      createErrorObject({
        title: error.message,
        detail: error.detail,
        reference: error.reference,
      }),
    );
  }

  private handleValidationError(
    error: DataValidationError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    this.logger.error(
      `[${error.detail}]: ${error.statusCode} — ${error.message}`,
      error,
    );
    res.status(error.statusCode).json(
      createErrorObject({
        title: error.message,
        detail: error.detail,
        constraints: error.constraints,
        reference: error.reference,
      }),
    );
  }

  private handleOtherError(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject({ title: error.message }));
  }

  public catch(
    error: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    if (error instanceof HttpError) {
      return this.handleHttpError(error, req, res, next);
    }

    if (error instanceof DataValidationError) {
      return this.handleValidationError(error, req, res, next);
    }

    this.handleOtherError(error, req, res, next);
  }
}
