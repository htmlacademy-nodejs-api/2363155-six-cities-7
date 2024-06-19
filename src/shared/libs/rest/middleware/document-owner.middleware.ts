import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Middleware } from './middleware.interface.js';
import { HttpError } from '../errors/index.js';
import { DocumentOwner } from '../../../models/document-owner.interface.js';
import { DocumentCollection } from '../types/document-collection.enum.js';

class DocumentOwnerMiddleware implements Middleware {
  constructor(
    private readonly service: DocumentOwner,
    private readonly collectionName: DocumentCollection,
    private readonly paramName: string,
    private readonly target: 'params' | 'body' = 'params',
  ) {}

  public async execute(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const documentId = req[this.target][this.paramName];
    const userId = req.tokenPayload.id;
    const isOwner = await this.service.isOwner(documentId, userId);
    if (!isOwner) {
      throw new HttpError(
        StatusCodes.FORBIDDEN,
        `User ${userId} is not the owner of the document ${documentId} in  ${this.collectionName} collection.`,
        'DocumentOwnerMiddleware',
      );
    }

    next();
  }
}

export { DocumentOwnerMiddleware };

