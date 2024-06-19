import { DocumentType } from '@typegoose/typegoose';

import type { OfferEntity } from './offer.entity.js';
import type { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { City } from '../../models/offer.interface.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  findPremiumsInCity(city: City): Promise<DocumentType<OfferEntity>[]>;
  updateById(
    offerId: string,
    dto: UpdateOfferDto,
  ): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  incCommentsAmount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  decCommentsAmount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  addToFavorites(
    offerId: string,
    userId: string,
  ): Promise<DocumentType<OfferEntity> | null>;
  removeFromFavorites(
    offerId: string,
    userId: string,
  ): Promise<DocumentType<OfferEntity> | null>;
  updateRating(
    offerId: string,
    rating: number,
  ): Promise<DocumentType<OfferEntity> | null>;
}
