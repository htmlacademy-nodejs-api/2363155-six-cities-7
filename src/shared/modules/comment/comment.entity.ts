import {
  defaultClasses,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { UserEntity } from '../user/user.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { calculateAggregateRating } from '../../utils/rating.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
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
  public userId: CreateCommentDto['userId'];

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId: CreateCommentDto['offerId'];

  @prop({ required: true, type: Array, default: [] })
  public usersRatings = [];

  public get rating(): number {
    return calculateAggregateRating(this.usersRatings);
  }

  constructor(dto: CreateCommentDto) {
    super();

    this.text = dto.text;
    this.offerId = dto.offerId;
    this.userId = dto.userId;
  }
}

export const CommentModel = getModelForClass(CommentEntity);
