import type { Request } from 'express';
import { unknown } from 'zod';

declare global {
  namespace Express {
    interface Request {
      user?: unknown;
    }
  }
}
export interface UserSchema {
  username: string;

  age: Number;
  createdAt: Date;
  updatedAt: Date;
}
