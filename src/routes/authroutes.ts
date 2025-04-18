
import express from 'express';
import { login, register } from '../controllers/auth.controllers';
import { validateRegister, validateLogin } from '../validations/authValidation';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
