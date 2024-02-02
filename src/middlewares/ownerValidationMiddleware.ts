import { NextFunction, Request, Response } from 'express';
import { failedValidationError } from '../errors/errors';

import validateOwner from '../models/ownerSchema';

export default function ownerValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = validateOwner(req.body, req.method.toLowerCase());
  const valid = error == null;

  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    console.error('error', message);

    res.status(422).json({ ...failedValidationError, message });
  }
}
