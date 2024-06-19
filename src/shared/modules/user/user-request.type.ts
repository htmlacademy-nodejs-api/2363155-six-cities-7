import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { RequestBody, RequestParams } from '../../libs/index.js';

type RequestUserParams =
  | {
      userId: string;
    }
  | ParamsDictionary;

type RequestFavoriteOfferParams =
  | {
      offerId: string;
    }
  | ParamsDictionary;

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;
type AddFavoriteOfferRequest = Request<RequestFavoriteOfferParams, RequestBody>;
type RemoveFavoriteOfferRequest = Request<
  RequestFavoriteOfferParams,
  RequestBody
>;

export type {
  CreateUserRequest,
  LoginUserRequest,
  AddFavoriteOfferRequest,
  RemoveFavoriteOfferRequest,
  RequestUserParams,
};

