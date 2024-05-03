import { Owner } from '@prisma/client';
import Joi from 'joi';

export default function validateOwner(owner: Owner, requestType: string) {
  const schema = Joi.object({
    firstName: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/)
      .min(2)
      .max(100)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    lastName: Joi.string()
      .trim()
      .pattern(/^[A-Za-zÀ-ÖØ-öø-ÿ\-' ]+$/)
      .min(2)
      .max(155)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    emailAddress: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      })
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    phoneNumber: Joi.string()
      .trim()
      .pattern(/^\d{10}$/)
      .length(10)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    alternativePhoneNumber: Joi.string()
      .trim()
      .pattern(/^\d{10}$/, 'numbers')
      .length(10)
      .allow('')
      .optional(),
    preferredContactMethod: Joi.string()
      .trim()
      .alphanum()
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    idNumber: Joi.string()
      .trim()
      .pattern(/^\d{9}$/)
      .allow('')
      .optional(),
    occupation: Joi.string().trim().alphanum().allow('').optional(),
    additionalNotes: Joi.string().trim().allow('').optional(),
    acceptUpdates: Joi.boolean().alter({
      post: (schema) => schema.required(),
      patch: (schema) => schema.optional(),
    }),
    acceptMarketing: Joi.boolean().alter({
      post: (schema) => schema.required(),
      patch: (schema) => schema.optional(),
    }),
    referralSource: Joi.string().trim().optional(),
    treatmentAuthorization: Joi.boolean().alter({
      post: (schema) => schema.required(),
      patch: (schema) => schema.optional(),
    }),
    street: Joi.string()
      .trim()
      .pattern(
        /^\d+\s+[\w\s]+\s+\w+?.+(\s+[NSEW]\.)?\s*(?:\b(?:Apartment|Unit|Suite|Room)\s+[A-Za-z0-9#-]+)?$/,
      )
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    city: Joi.string()
      .trim()
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    state: Joi.string()
      .trim()
      .length(2)
      .alter({
        post: (schema) => schema.required(),
        patch: (schema) => schema.optional(),
      }),
    zipCode: Joi.string()
      .trim()
      .min(5)
      .max(9)
      .pattern(/^\d{5}(?:\d{4})?$/)
      .allow('')
      .optional(),
  });

  return schema.tailor(requestType).validate(owner);
}
