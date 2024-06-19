import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];

class UploadFileMiddleware implements Middleware {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) {}

  public async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          return callback(
            new HttpError(
              StatusCodes.UNSUPPORTED_MEDIA_TYPE,
              'File type is not allowed',
              `Allowed types: ${ALLOWED_MIME_TYPES.join(', ')}`,
            ),
            '',
          );
        }

        const fileExtention = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtention}`);
      },
    });

    const uploadSingleFileMiddleware = multer({ storage }).single(
      this.fieldName,
    );

    uploadSingleFileMiddleware(req, res, next);
  }
}

export { UploadFileMiddleware };
