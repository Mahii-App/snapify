import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/httpStatus';
import { ErrorMessages } from '../constants/errorMessage';
import { string } from 'joi';
import { Photo, User } from '../config/db';
export const uploadPhoto = async (req: Request, res: Response): Promise<void> => {
  console.log(req);
  try {
    const { user } = req;
  
    const photo = await Photo.create({
      userId: User,
      imageUrl: 'https://cloudinary.com/your-photo' as string 
    });

    res.status(HttpStatus.CREATED).json({
      success: true,
      photo,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error uploading photo',
    });
  }
};

export const getAllPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const photos = await Photo.findAll();
    res.status(HttpStatus.OK).json({
      success: true,
      photos,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error fetching photos',
    });
  }
};

export const getPhotoById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const photo = await Photo.findByPk(req.params.id);
    if (!photo) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Photo not found',
      });
      return;
    }

    res.status(HttpStatus.OK).json({
      success: true,
      photo,
    });
  } catch (error) {
    next(error);
  }
};

export const deletePhoto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const deleted = await Photo.destroy({
      where: { id: req.params.id },
    });

    if (!deleted) {
      res.status(HttpStatus.NOT_FOUND).json({
        success: false,
        message: 'Photo not found',
      });
      return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    next(error);
  }
};