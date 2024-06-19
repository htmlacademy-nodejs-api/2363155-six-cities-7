import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

import { Middleware } from './middleware.interface.js';
import { DataValidationError } from '../errors/data-validation-error.js';

const MONGO_OBJECT_ID_DOCS_URL =
  'https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid';

class ValidateObjectIdMiddleware implements Middleware {
  constructor(
    private param: string,
    private target: 'params' | 'body' = 'params',
  ) {}

  public execute(req: Request, _res: Response, next: NextFunction): void {
    const objectId = req[this.target][this.param];
    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new DataValidationError(
      `${objectId} is not valid ObjectID`,
      'ValidateObjectIdMiddleware',
      [
        {
          path: [this.param],
          type: 'objectId.base',
          context: {
            key: this.param,
            label: this.param,
            value: objectId,
          },
          message: `${this.param} must be valid ObjectID`,
        },
      ],
      MONGO_OBJECT_ID_DOCS_URL,
    );
  }
}

export { ValidateObjectIdMiddleware };
