import { RequestHandler } from '../utils/createHandler';
import { takeANap } from '../utils/take-a-nap';

export const me: RequestHandler = async (req, res, user) => {
  await takeANap();

  res.status(200);
  res.json(user);
};
