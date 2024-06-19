import { StatusCodes } from 'http-status-codes';
import { BaseAuthError } from './base-auth-error.js';

class UserInvalidCredentialsError extends BaseAuthError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, 'Incorrect email or password');
  }
}

export { UserInvalidCredentialsError };
