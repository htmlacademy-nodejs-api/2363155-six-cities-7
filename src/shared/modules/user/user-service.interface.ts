import { DocumentType } from '@typegoose/typegoose';

import type { UserEntity } from './user.entity.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { DocumentExists } from '../../models/document-exists.interface.js';
import { OfferEntity } from '../offer/offer.entity.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[] | null>;
  addOfferToFavorites(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<OfferEntity>[] | null>;
  removeOfferFromFavorites(
    userId: string,
    offerId: string,
  ): Promise<DocumentType<OfferEntity>[] | null>;
}
