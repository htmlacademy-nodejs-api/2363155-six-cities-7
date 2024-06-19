import { HttpError } from '../../../libs/rest/errors/http-error.js';

class BaseAuthError extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}

export { BaseAuthError };
