import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { calculateAggregateRating } from '../../utils/rating.js';
import { DocumentCollection } from '../../libs/rest/types/document-collection.enum.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: DocumentCollection.Comments,
    timestamps: true,
  },
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({ type: String, required: true, trim: true })
  public text: CreateCommentDto['text'];

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: mongoose.Types.ObjectId;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId: mongoose.Types.ObjectId;

  @prop({ required: true, type: Array, default: [] })
  public usersRatings: number[] = [];

  public get rating(): number {
    return calculateAggregateRating(this.usersRatings);
  }

  constructor(dto: CreateCommentDto, offerId: mongoose.Types.ObjectId) {
    super();

    this.text = dto.text;
    this.offerId = offerId;
    this.userId = dto.userId;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
