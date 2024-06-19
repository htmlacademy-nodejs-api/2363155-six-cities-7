import { DocumentType } from '@typegoose/typegoose';

import type { UserEntity } from './user.entity.js';
import type { CreateUserDto } from './dto/create-user.dto.js';

export interface UserService {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findOrCreate(
    dto: CreateUserDto,
    salt: string,
  ): Promise<DocumentType<UserEntity>>;
}
