import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { RequestBody, RequestParams } from '../../libs/index.js';
import { AddFavoriteOfferDto } from './dto/add-favorite-offer.dto.js';

type RequestUserParams =
  | {
      userId: string;
    }
  | ParamsDictionary;

type RequestUserOfferParams =
  | {
      userId: string;
      offerId: string;
    }
  | ParamsDictionary;

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
type AddFavoriteOfferRequest = Request<
  RequestUserParams,
  RequestBody,
  AddFavoriteOfferDto
>;
type RemoveFavoriteOfferRequest = Request<RequestUserOfferParams, RequestBody>;

export type {
  CreateUserRequest,
  LoginUserRequest,
  AddFavoriteOfferRequest,
  RemoveFavoriteOfferRequest,
  RequestUserParams,
};
