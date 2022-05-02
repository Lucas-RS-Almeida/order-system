import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  error: Error, _: Request, response: Response, next: NextFunction,
) {
  console.log(error);
  response.sendStatus(500);
}
