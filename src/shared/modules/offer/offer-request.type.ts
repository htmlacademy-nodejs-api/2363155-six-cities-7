import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { RequestBody, RequestParams } from '../../libs/index.js';

type RequestOfferParams =
  | {
      offerId: string;
    }
  | ParamsDictionary;
type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOfferDto>;
type UpdateOfferRequest = Request<
  RequestOfferParams,
  RequestBody,
  UpdateOfferDto
>;

export type { CreateOfferRequest, UpdateOfferRequest, RequestOfferParams };
