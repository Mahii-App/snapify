import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User  from '../models/userModel';
import { HttpStatus } from '../constants/httpStatus';

export const register = async (data: any) => {
  const { name, email, password } = data;

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    const error: any = new Error('User already exists');
    error.statusCode = HttpStatus.CONFLICT;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const login = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error: any = new Error('Invalid credentials');
    error.statusCode = HttpStatus.UNAUTHORIZED;
    throw error;
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    const error: any = new Error('Invalid credentials');
    error.statusCode = HttpStatus.UNAUTHORIZED;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  return token;
};
