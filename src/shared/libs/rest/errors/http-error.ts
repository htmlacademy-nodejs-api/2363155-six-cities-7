import { StatusCodes } from 'http-status-codes';

class HttpError extends Error {
  public statusCode!: StatusCodes;
  public detail?: string;
  public reference: string;

  constructor(statusCode: StatusCodes, message: string, detail?: string) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.detail = detail;
    this.reference = `https://httpstatuses.com/${statusCode}`;
  }
}

export { HttpError };
