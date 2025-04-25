import  {Request} from 'express';
import  Photo from '../models/photoModel';
import cloudinary from '../config/cloudinary';
export const uploadPhoto = async (req: Request) => {
  const { caption } = req.body;
  const file = req.files;

  const result = await cloudinary.uploader.upload(file.path);

  const photo = await Photo.create({
    fileName: result.original_filename,
    size: result.bytes,
    path: result.secure_url,
    caption,
    userId: req.user.id,
  });

  return photo;
};

export const getPhotosByUser = async (req: Request) => {
  return await Photo.findAll({ where: { userId: req.user.id } });
};

export const getPhotoById = async (id: string) => {
  return await Photo.findByPk(id);
};

export const deletePhoto = async (req: Request) => {
  const photo = await Photo.findByPk(req.params.id);
  if (!photo || photo.userId !== req.user.id) {
    throw new Error('Unauthorized or not found');
  }

  await photo.destroy();

};
