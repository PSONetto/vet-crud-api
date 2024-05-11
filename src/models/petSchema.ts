import { Owner } from '@prisma/client';
import Joi from 'joi';

export default function validatePet(owner: Owner, requestType: string) {
  const schema = Joi.object({
    name: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 'latin letters')
      .min(2)
      .max(100)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    species: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 'latin letters')
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    breed: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/, 'latin letters')
      .optional(),
    age: Joi.number()
      .min(0)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    sex: Joi.string()
      .length(1)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    neuteredSpayed: Joi.boolean().alter({
      post: (schema) => schema.required(),
      patch: (schema) => schema.optional(),
    }),
    weight: Joi.number()
      .precision(2)
      .min(0)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    additionalNotes: Joi.string().trim().optional(),
    ownerId: Joi.number()
      .min(1)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.forbidden(),
      }),
  });

  return schema.tailor(requestType).validate(owner);
}
