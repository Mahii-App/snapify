import express from 'express';
import {
  uploadPhoto,
  getAllPhotos,
  getPhotoById,
  deletePhoto,
} from '../controllers/photo.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import upload from '../middleware/multer.middleware';

const router = express.Router();

router.post('/upload', isAuthenticated, upload.single('image'), uploadPhoto);

router.get('/photos', isAuthenticated, getAllPhotos);

router.get('/photos/:id', isAuthenticated, getPhotoById);

router.delete('/photos/:id', isAuthenticated, deletePhoto);

export default router;
