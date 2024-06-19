import Joi from 'joi';
import { CreateCommentDto } from './create-comment.dto.js';

import { CommentLength } from '../../../constants/comment.js';
import { Rate } from '../../../constants/offer.js';

const createCommentDtoSchema: Joi.Schema<
  InstanceType<typeof CreateCommentDto>
> = Joi.object<InstanceType<typeof CreateCommentDto>>({
  text: Joi.string()
    .required()
    .ruleset.min(CommentLength.MIN)
    .max(CommentLength.MAX)
    .rule({
      message: `Comment length must be between ${CommentLength.MIN} and ${CommentLength.MAX} characters`,
    }),
  rating: Joi.number().required().min(Rate.MIN).max(Rate.MAX),
});

export { createCommentDtoSchema };

