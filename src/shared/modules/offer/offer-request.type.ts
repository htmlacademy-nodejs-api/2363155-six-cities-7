import { Request } from 'express';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { RequestBody, RequestParams } from '../../libs/index.js';

type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
type UpdateOfferRequest = Request<RequestParams, RequestBody, UpdateOfferDto>;

export type { CreateOfferRequest, UpdateOfferRequest };
