import { DocumentType, types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';

import { CommentService } from './comment-service.interface.js';
import { CommentEntity } from './comment.entity.js';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { Logger } from '../../libs/index.js';
import { Component } from '../../models/component.enum.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel)
    private readonly CommentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(
    dto: CreateCommentDto,
  ): Promise<DocumentType<CommentEntity>> {
    const Comment = new CommentEntity(dto);

    const result = await this.CommentModel.create(Comment);
    this.logger.info(`New comment created: ${result._id}`);

    return result;
  }

  public async findByOfferId(
    offerId: string,
  ): Promise<DocumentType<CommentEntity>[]> {
    return this.CommentModel.find({ offerId }).exec();
  }

  public async updateRating(
    commentId: string,
    rating: number,
  ): Promise<DocumentType<CommentEntity> | null> {
    return this.CommentModel.findByIdAndUpdate(
      commentId,
      {
        $push: { usersRatings: rating },
      },
      { new: true },
    ).exec();
  }
}
