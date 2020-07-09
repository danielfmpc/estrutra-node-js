import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

export default function ensureAuthentidated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authHeader.split(' ');
  const decoded = verify(token, auth.jwt.secret);
}
