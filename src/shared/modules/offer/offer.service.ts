import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { Logger } from '../../libs/index.js';
import { Component } from '../../../models/component.enum.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly OfferModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const Offer = new OfferEntity(dto);

    const result = await this.OfferModel.create(Offer);
    this.logger.info(`New offer created: ${result._id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findById(id).exec();
  }
}
