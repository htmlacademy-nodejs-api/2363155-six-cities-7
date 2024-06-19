import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { RequestBody, RequestParams } from '../../libs/index.js';

type CreateUserRequest = Request<RequestParams, RequestBody, CreateUserDto>;
type LoginUserRequest = Request<RequestParams, RequestBody, LoginUserDto>;

export type { CreateUserRequest, LoginUserRequest };
