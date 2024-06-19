import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../models/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { fillDTO } from '../../utils/service.js';
import { OfferEndpoint } from './offer-endpoint.enum.js';
import {
  CreateOfferRequest,
  RequestOfferParams,
  UpdateOfferRequest,
} from './offer-request.type.js';
import { DocumentExistsMiddleware } from '../../libs/rest/middleware/document-exists.middleware.js';
import { ValidateObjectIdMiddleware } from '../../libs/rest/middleware/validate-object-id.middleware.js';
import { ValidateDtoMiddleware } from '../../libs/rest/middleware/validate-dto.middleware.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { createOfferDtoSchema } from './dto/create-offer.schema.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { updateOfferDtoSchema } from './dto/update-offer.schema.js';
import { UserService } from '../user/user-service.interface.js';
import { OfferReducedRdo } from './rdo/offer-reduced.rdo.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');
    const privateRouteMiddleware = new PrivateRouteMiddleware();
    const validateUserIdMiddleware = new ValidateObjectIdMiddleware(
      'userId',
      'body',
    );
    const validateOfferIdMiddleware = new ValidateObjectIdMiddleware('offerId');
    const userExistsMiddleware = new DocumentExistsMiddleware(
      this.userService,
      'user',
      'userId',
      'body',
    );
    const offerExistsMiddleware = new DocumentExistsMiddleware(
      this.offerService,
      'offer',
      'offerId',
    );

    this.addRoute({
      path: OfferEndpoint.Index,
      method: HttpMethod.Get,
      handler: this.index,
    });
    this.addRoute({
      path: OfferEndpoint.Index,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        privateRouteMiddleware,
        validateUserIdMiddleware,
        new ValidateDtoMiddleware(CreateOfferDto, createOfferDtoSchema),
        userExistsMiddleware,
      ],
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [validateOfferIdMiddleware, offerExistsMiddleware],
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        privateRouteMiddleware,
        validateOfferIdMiddleware,
        new ValidateDtoMiddleware(UpdateOfferDto, updateOfferDtoSchema),
        offerExistsMiddleware,
      ],
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        privateRouteMiddleware,
        validateOfferIdMiddleware,
        offerExistsMiddleware,
      ],
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.find();
    this.ok(res, fillDTO(OfferReducedRdo, result));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async show(
    { params }: Request<RequestOfferParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.findById(offerId);

    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async update(
    { body, params }: UpdateOfferRequest,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const updatedOffer = await this.offerService.updateById(
      offerId as string,
      body,
    );

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete(
    { params }: Request<RequestOfferParams>,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    await this.offerService.deleteById(offerId);

    this.noContent(res);
  }
}
