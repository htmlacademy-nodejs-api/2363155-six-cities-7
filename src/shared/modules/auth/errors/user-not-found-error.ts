import { StatusCodes } from 'http-status-codes';
import { BaseAuthError } from './base-auth-error.js';

class UserNotFoundError extends BaseAuthError {
  constructor() {
    super(StatusCodes.NOT_FOUND, 'User not found');
  }
}

export { UserNotFoundError };
