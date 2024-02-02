import { APIError } from '../errors/APIError';

export const failedValidationError = new APIError('failed_validation');

export const notFoundError = new APIError(
  'not_found',
  'The resource data was not found',
);

export const invalidOwnerIdError = new APIError(
  'invalid_owner_id',
  'The provided Owner ID is not valid',
);

export const emailConflictError = new APIError(
  'email_conflict',
  'The e-mail is already in use',
);
