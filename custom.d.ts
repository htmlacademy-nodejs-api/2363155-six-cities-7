import { TokenPayload } from './src/shared/models/token-payload.type.ts';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayload;
  }
}
