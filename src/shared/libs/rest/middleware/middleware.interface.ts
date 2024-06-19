import { NextFunction, Request, Response } from 'express';

interface Middleware {
  execute(req: Request, res: Response, next: NextFunction): void;
}

export type { Middleware };
