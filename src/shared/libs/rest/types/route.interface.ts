import { RequestHandler } from 'express';
import { HttpMethod } from './http-method.enum.js';
import { Middleware } from '../middleware/index.js';

interface Route {
  method: HttpMethod;
  path: string;
  handler: RequestHandler;
  middlewares?: Middleware[];
}

export type { Route };
