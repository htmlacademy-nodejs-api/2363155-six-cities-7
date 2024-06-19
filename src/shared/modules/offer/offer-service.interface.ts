import { DocumentType } from '@typegoose/typegoose';

import type { OfferEntity } from './offer.entity.js';
import type { CreateOfferDto } from './dto/create-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
