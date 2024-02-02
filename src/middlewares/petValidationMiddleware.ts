import { NextFunction, Request, Response } from 'express';

import { failedValidationError } from '../errors/errors';
import validatePet from '../models/petSchema';

export default function petValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { error } = validatePet(req.body, req.method.toLowerCase());
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
