import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatus } from '../constants/httpStatus';
import { ErrorMessages } from '../constants/errorMessage';


import  {User}  from '../config/db';

declare global {
  namespace Express {
    interface Request {
      user?: any ; 
    }
  }
}
export const isAuthenticated = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
): Promise<void> => { 
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
  
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: ErrorMessages.UNAUTHORIZED,
    });
    return; 
  }

  try {
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findByPk(decoded.userId);
    
    if (!user) {

      res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: ErrorMessages.UNAUTHORIZED,
      });
      return; 
    }

  
    req.user = user;

  
    next();
  } catch (error) {
    
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: ErrorMessages.UNAUTHORIZED,
    });
    return; 
  }
};
