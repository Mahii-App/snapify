import Joi from 'joi';

// Validation for common fields like email, password, etc.
export const emailValidation = Joi.string().email().required().messages({
  'string.base': 'Email should be a string.',
  'string.empty': 'Email is required.',
  'string.email': 'Email must be a valid email address.',
  'any.required': 'Email is required.',
});

export const passwordValidation = Joi.string().min(6).required().messages({
  'string.base': 'Password should be a string.',
  'string.empty': 'Password is required.',
  'string.min': 'Password should be at least 6 characters.',
  'any.required': 'Password is required.',
});

export const nameValidation = Joi.string().min(3).required().messages({
  'string.base': 'Name should be a string.',
  'string.empty': 'Name is required.',
  'string.min': 'Name should be at least 3 characters long.',
  'any.required': 'Name is required.',
});
