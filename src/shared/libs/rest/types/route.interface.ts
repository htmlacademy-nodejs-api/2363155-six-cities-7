import { RequestHandler } from 'express';
import { HttpMethod } from './http-method.enum.js';

interface Route {
  method: HttpMethod;
  path: string;
  handler: RequestHandler;
}

export type { Route };
