import { DocumentType } from '@typegoose/typegoose';

import type { CommentEntity } from './comment.entity.js';
import type { CreateCommentDto } from './dto/create-comment.dto.js';
import * as mongoose from 'mongoose';

export interface CommentService {
  create(
    dto: CreateCommentDto,
    offerId: string,
    userId: string,
  ): Promise<DocumentType<CommentEntity>>;
  findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  updateRating(
    commentId: string,
    rating: number,
  ): Promise<DocumentType<CommentEntity> | null>;
  deleteByOfferId(offerId: string): Promise<mongoose.mongo.DeleteResult>;
}

