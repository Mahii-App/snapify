import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import  logger  from '../utils/logger';
import {UploadedFile}  from 'express-fileupload';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const uploadToCloudinary = async (filePath: string) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'snapify_uploads',
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes,
      format: result.format,
      original_filename: result.original_filename,
    };
  } catch (error) {
    logger.error('Cloudinary Upload Failed:', error);
    throw new Error('Image upload failed');
  }
};

export const deleteFromCloudinary = async (publicId: string) => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    logger.error('Cloudinary Deletion Failed:', error);
    throw new Error('Image deletion failed');
  }
}; 

