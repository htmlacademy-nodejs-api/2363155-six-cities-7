import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToInstance } from 'class-transformer';

import { Middleware } from './middleware.interface.js';
import { Schema, ValidationError } from 'joi';
import { DataValidationError } from '../errors/data-validation-error.js';

const JOI_VALIDATION_ERROR_DOCS_URL =
  'https://joi.dev/api/?v=17.13.0#validationerror';

class ValidateDtoMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>,
    private schema: Schema,
  ) {}

  public async execute(
    { body }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const dtoInstance = plainToInstance(this.dto, body);

    try {
      await this.schema.validateAsync(dtoInstance, {
        abortEarly: false,
      });
    } catch (err) {
      const validationError = err as ValidationError;
      throw new DataValidationError(
        validationError.message,
        'ValidateDtoMiddleware',
        validationError.details,
        JOI_VALIDATION_ERROR_DOCS_URL,
      );
    }

    next();
  }
}

export { ValidateDtoMiddleware };
