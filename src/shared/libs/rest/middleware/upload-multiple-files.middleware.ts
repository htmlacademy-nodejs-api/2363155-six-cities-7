import { NextFunction, Request, Response } from 'express';
import multer, { diskStorage } from 'multer';
import { extension } from 'mime-types';
import { nanoid } from 'nanoid';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/http-error.js';
import { OFFER_IMAGES_AMOUNT } from '../../../constants/offer.js';
import { checkFileMimeType } from '../../../utils/service.js';

class UploadMultipleFilesMiddleware implements Middleware {
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
        const fileExtention = extension(file.mimetype);
        const filename = nanoid();
        callback(null, `${filename}.${fileExtention}`);
      },
    });

    const uploadMultipleFilesMiddleware = multer({
      storage,
      fileFilter: (_req, file, cb) => {
        try {
          const result = checkFileMimeType(file.mimetype);
          return cb(null, result);
        } catch (error) {
          const err = error as HttpError;
          return cb(err);
        }
      },
    }).array(this.fieldName, OFFER_IMAGES_AMOUNT);

    uploadMultipleFilesMiddleware(req, res, next);
  }
}

export { UploadMultipleFilesMiddleware };
