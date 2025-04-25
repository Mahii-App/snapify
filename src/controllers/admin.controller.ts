import { Request, Response } from 'express';
import { getAdminStats } from '../services/adminService';
import  {HttpStatus}  from '../constants/httpStatus';

export const getStats = async (req: Request, res: Response) => {
  const stats = await getAdminStats();
  res.status(HttpStatus.OK).json({ success: true, data: stats });
};
