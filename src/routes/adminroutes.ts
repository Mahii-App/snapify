import express from 'express';
import { getStats } from '../controllers/admin.controller';
import { isAuthenticated } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';

const router = express.Router();

router.get('/stats', isAuthenticated, isAdmin, getStats);

export default router;
