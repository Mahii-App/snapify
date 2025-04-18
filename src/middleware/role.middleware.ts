import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/httpStatus';
import { ErrorMessages } from '../constants/errorMessage';

export const isAdmin = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    res.status(HttpStatus.FORBIDDEN).json({
      success: false,
      message: ErrorMessages.FORBIDDEN,
    });
    return;
  }
  next();
};
