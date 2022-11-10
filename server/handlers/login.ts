import { RequestHandler } from '../utils/createHandler';
import { takeANap } from '../utils/take-a-nap';
import { mockUsers } from '../mock-data';
import { sign } from '../utils/auth';

export const login: RequestHandler = async (req, res) => {
  const { username, password }: Record<'username' | 'password', string> =
    req.body;
  const errors = [];
  if (!username) errors.push(['username', 'Field username is required']);
  if (username && username.trim().length < 8)
    errors.push([
      'username',
      'Field username have must me longer then 8 chars',
    ]);
  if (!password) errors.push(['password', 'Field password is required']);
  if (password && password.trim().length < 8)
    errors.push([
      'password',
      'Field password have must me longer then 8 chars',
    ]);

  await takeANap();

  if (errors.length) {
    res.status(422);
    res.json({
      message: 'Invalid Payload',
      errors: Object.fromEntries(errors),
    });
    return;
  }

  const user = mockUsers.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    res.status(400);
    res.json({
      message: "Invalid credentials or you don't have an account",
    });
  } else {
    const { password: _, ...rest } = user;
    res.status(200);
    res.json({ token: sign(rest) });
  }
};
