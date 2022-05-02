import { Request, Response, NextFunction } from 'express';

import UserRepository from '../app/repositories/UserRepository';

export default async function(request: Request, response: Response, next: NextFunction) {
  const { user_hash } = request;

  const user = await UserRepository.findByHash(user_hash);
  if (!user) {
    return response.status(401).json({ error: 'Token invalid' });
  }

  request.user_id = user.id;

  next();
}
