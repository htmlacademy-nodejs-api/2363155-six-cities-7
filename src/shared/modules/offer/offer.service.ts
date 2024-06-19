import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { Logger } from '../../libs/index.js';
import { Component } from '../../models/component.enum.js';
import { DEFAULT_OFFERS_LIMIT } from './offer.constants.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { SortType } from '../../models/sort-type.enum.js';
import { City } from '../../models/offer.interface.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel)
    private readonly OfferModel: types.ModelType<OfferEntity>,
  ) {}

  public async exists(id: string): Promise<boolean> {
    return (await this.OfferModel.exists({ _id: id })) !== null;
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.OfferModel.create(dto);
    this.logger.info(`New offer created: ${result._id}`);

    return result;
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findById(id).populate('userId').exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return this.OfferModel.find()
      .limit(DEFAULT_OFFERS_LIMIT)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async findFavorites(
    userId: string,
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.OfferModel.find({ usersFavorite: userId })
      .limit(DEFAULT_OFFERS_LIMIT)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async findPremiumsInCity(
    city: City,
  ): Promise<DocumentType<OfferEntity>[]> {
    return this.OfferModel.find({ city, premium: true })
      .limit(DEFAULT_OFFERS_LIMIT)
      .sort({ createdAt: SortType.Down })
      .exec();
  }

  public async updateById(
    id: string,
    dto: UpdateOfferDto,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findByIdAndUpdate(id, dto, { new: true })
      .populate(['userId'])
      .exec();
  }

  public async deleteById(
    id: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findByIdAndDelete(id).exec();
  }

  public async incCommentsAmount(
    id: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findByIdAndUpdate(
      id,
      {
        $inc: { commentsAmount: 1 },
      },
      { new: true },
    ).exec();
  }

  public async decCommentsAmount(
    id: string,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findByIdAndUpdate(
      id,
      {
        $inc: { commentsAmount: -1 },
      },
      { new: true },
    ).exec();
  }

  updateRating(
    offerId: string,
    rating: number,
  ): Promise<DocumentType<OfferEntity> | null> {
    return this.OfferModel.findByIdAndUpdate(
      offerId,
      {
        $push: { usersRatings: rating },
      },
      { new: true },
    ).exec();
  }
}
