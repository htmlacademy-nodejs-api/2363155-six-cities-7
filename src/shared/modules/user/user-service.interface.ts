import { DocumentType } from '@typegoose/typegoose';

import type { UserEntity } from './user.entity.js';
import type { CreateUserDto } from './dto/create-user.dto.js';
import { DocumentExists } from '../../models/document-exists.interface.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { DocumentOwner } from '../../models/document-owner.interface.js';

export interface UserService extends DocumentExists, DocumentOwner {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  updateById(
    id: string,
    dto: UpdateUserDto,
  ): Promise<DocumentType<UserEntity> | null>;
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

