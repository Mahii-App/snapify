
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/httpStatus'; // Assuming you have this constant for HTTP status codes


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'User registered successfully!',
    });
  } catch (error) {
    next(error); 
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    
    res.status(HttpStatus.OK).json({
      success: true,
      message: 'User logged in successfully!',
    });
  } catch (error) {
    next(error); 
  }
};
