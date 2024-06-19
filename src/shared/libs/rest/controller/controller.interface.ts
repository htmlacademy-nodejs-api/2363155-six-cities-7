import type { Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Route } from '../types/route.interface.js';

interface Controller {
  router: Router;
  addRoute(route: Route): void;
  send<T>(res: Response, statusCode: StatusCodes, data: T): void;
  created<T>(res: Response, data: T): void;
  noContent<T>(res: Response, data: T): void;
  ok<T>(res: Response, data: T): void;
}

export type { Controller };
