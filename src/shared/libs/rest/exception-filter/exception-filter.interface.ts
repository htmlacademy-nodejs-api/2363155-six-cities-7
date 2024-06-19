import { NextFunction, Request, Response } from 'express';

interface ExceptionFilter {
  catch(error: Error, req: Request, res: Response, next: NextFunction): void;
}

export type { ExceptionFilter };
