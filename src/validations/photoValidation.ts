import Joi from 'joi';

export const photoUploadValidation = Joi.object({
  file: Joi.object().required().messages({
    'any.required': 'Photo file is required.',
  }),
  caption: Joi.string().max(500).optional().messages({
    'string.base': 'Caption should be a string.',
    'string.max': 'Caption can be a maximum of 500 characters.',
  }),
});

export const photoIdValidation = Joi.object({
  id: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': 'Photo ID must be a valid UUID.',
    'any.required': 'Photo ID is required.',
  }),
});
