import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface Payload {
  hash: string;
}

export default function(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(401).json({ error: 'No token provided' });
  }

  const parts = authorization.split(' ');
  if (parts.length !== 2) {
    return response.status(401).json({ error: 'Token error' });
  }

  const [schema, token] = parts;
  if (!/^Bearer$/i.test(schema)) {
    return response.status(401).json({ error: 'Token malformatted' });
  }

  jwt.verify(token, String(process.env.JWT_SECRET), (error, encoded) => {
    if (error) {
      return response.status(401).json({ error: 'Token invalid' });
    }
    const { hash } = encoded as Payload;

    request.user_hash = hash;

    next();
  });
}
