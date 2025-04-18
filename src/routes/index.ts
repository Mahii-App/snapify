import express from 'express';
import authRoutes from './authroutes';
import photoRoutes from './photoroutes';
import adminRoutes from './adminroutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/photos', photoRoutes);
router.use('/admin', adminRoutes);

export default router;
