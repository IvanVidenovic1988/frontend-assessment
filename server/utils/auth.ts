/* eslint-disable no-throw-literal */
import * as jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '../types';

const SESSION_SECRET = 'shhh';

export const sign = (user: User) => {
  return jwt.sign(user, SESSION_SECRET);
};

export const decode = (token: string | null) => {
  if (!token) throw 'Missing token';
  const user = jwt.decode(token.replace(`Bearer `, '')) as User;
  if (!user) throw 'Invalid token';
  return user;
};

export const extractJwt = (request: Request): string | null => {
  return request?.headers?.authorization || null;
};
