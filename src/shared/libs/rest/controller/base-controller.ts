import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { Response, Router } from 'express';
import asyncHandler from 'express-async-handler';

import { Logger } from '../../logger/logger.interface.js';
import { Controller } from './controller.interface.js';
import { Route } from '../types/route.interface.js';
import { Component } from '../../../models/component.enum.js';
import { PathTransformer } from '../transform/path-transformer.js';

@injectable()
export abstract class BaseController implements Controller {
  private readonly DEFAULT_CONTENT_TYPE = 'application/json';
  private readonly _router: Router;
  @inject(Component.PathTransformer)
  private pathTransformer!: PathTransformer;

  constructor(
    @inject(Component.Logger)
    protected readonly logger: Logger,
  ) {
    this._router = Router({ mergeParams: true });
  }

  get router() {
    return this._router;
  }

  public addRoute(route: Route) {
    const wrapperAsyncHandler = asyncHandler(route.handler.bind(this));
    const handlers = [];
    route.middlewares?.forEach((middleware) => {
      handlers.push(asyncHandler(middleware.execute.bind(middleware)));
    });
    handlers.push(wrapperAsyncHandler);
    this._router[route.method](route.path, handlers);

    this.logger.info(
      `Route registered: ${route.method.toUpperCase()} ${route.path}`,
    );
  }

  public send<T>(res: Response, statusCode: number, data?: T): void {
    const modifiedData = this.pathTransformer.execute(
      data as Record<string, unknown>,
    );
    res.type(this.DEFAULT_CONTENT_TYPE).status(statusCode).json(modifiedData);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent(res: Response): void {
    this.send(res, StatusCodes.NO_CONTENT);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }
}
