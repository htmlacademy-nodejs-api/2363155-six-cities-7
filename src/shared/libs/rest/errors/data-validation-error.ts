import { StatusCodes } from 'http-status-codes';
import { ValidationErrorItem } from 'joi';

class DataValidationError extends Error {
  public statusCode = StatusCodes.BAD_REQUEST;

  constructor(
    public message: string,
    public detail: string,
    public constraints: ValidationErrorItem[],
    public reference?: string,
  ) {
    super(message);
  }
}

export { DataValidationError };
