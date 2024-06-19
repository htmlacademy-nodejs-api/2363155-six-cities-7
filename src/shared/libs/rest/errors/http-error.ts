import { StatusCodes } from 'http-status-codes';

class HttpError extends Error {
  public statusCode!: StatusCodes;
  public detail?: string;

  constructor(statusCode: StatusCodes, message: string, detail?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
  }
}

export { HttpError };
