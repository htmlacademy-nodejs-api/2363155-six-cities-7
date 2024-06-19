import { Request } from 'express';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { RequestBody } from '../../libs/index.js';
import { RequestOfferParams } from '../offer/offer-request.type.js';

type CreateCommentRequest = Request<
  RequestOfferParams,
  RequestBody,
  CreateCommentDto
>;

export type { CreateCommentRequest };
