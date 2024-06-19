import { inject, injectable } from 'inversify';
import { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseController, HttpMethod } from '../../libs/rest/index.js';
import { Logger } from '../../libs/logger/index.js';
import { Component } from '../../models/index.js';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { HttpError } from '../../libs/rest/errors/index.js';
import { fillDTO } from '../../utils/service.js';
import { OfferEndpoint } from './offer-endpoint.enum.js';
import {
  CreateOfferRequest,
  UpdateOfferRequest,
} from './offer-request.type.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);
    this.logger.info('Register routes for OfferController…');

    this.addRoute({
      path: OfferEndpoint.Index,
      method: HttpMethod.Get,
      handler: this.getOffersList,
    });
    this.addRoute({
      path: OfferEndpoint.Index,
      method: HttpMethod.Post,
      handler: this.create,
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Get,
      handler: this.getDetailedOffer,
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Put,
      handler: this.update,
    });
    this.addRoute({
      path: OfferEndpoint.Offer,
      method: HttpMethod.Delete,
      handler: this.delete,
    });
  }

  public async getOffersList(_req: Request, res: Response): Promise<void> {
    const result = await this.offerService.find();
    this.ok(res, fillDTO(OfferRdo, result));
  }

  public async create(
    { body }: CreateOfferRequest,
    res: Response,
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async getDetailedOffer(
    { params }: Request,
    res: Response,
  ): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.findById(offerId as string);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${offerId}" not found`,
        'OfferController',
      );
    }

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

    if (!updatedOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${offerId}" not found`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, updatedOffer));
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const { offerId } = params;
    const result = await this.offerService.deleteById(offerId as string);

    if (!result) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id "${offerId}" not found`,
        'OfferController',
      );
    }

    this.noContent(res, fillDTO(OfferRdo, result));
  }
}
