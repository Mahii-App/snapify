import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { HttpStatus } from '../constants/httpStatus';

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Validate request body using Joi schema
  const { error } = registerSchema.validate(req.body);
  
  // If validation fails, send a response with a validation error and terminate the request
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.details[0].message,
    });
    return; // No need to return the Response object, just terminate execution
  }

  
  next();
};
export const validateLogin = (req: any, res: any, next: any) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: error.details[0].message,
    });
  }
  next();
};

