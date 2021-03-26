import { User } from './features/users/';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    tokenId?: number;
  }
}
