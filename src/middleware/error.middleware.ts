import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { HttpStatus } from '../constants/httpStatus';
import { ErrorMessages } from '../constants/errorMessage';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.stack || err.message);

  const statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const message = err.message || ErrorMessages.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
  });
};
