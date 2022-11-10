import { Request, Response } from 'express';
import { User } from '../types';
import { decode, extractJwt } from './auth';

export type RequestHandler = (
  req: Request,
  res: Response,
  user?: User | null
) => Promise<void>;

export const createHandler =
  (handler: RequestHandler, authProtected?: boolean) =>
  (req: Request, res: Response) => {
    if (!authProtected) return handler(req, res, null);
    let user: User | null = null;
    try {
      user = decode(extractJwt(req));
    } catch (e) {
      res.status(401);
      return res.json({ message: 'Unauthorized' });
    }
    if (user) return handler(req, res, user);
    res.status(400);
    return res.json({ message: 'We could not process your request' });
  };
