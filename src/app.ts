import express, { Application } from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.middleware';
import { swaggerServe, swaggerSetup } from './config/swagger';
import authRoutes from './routes/authroutes';
import photoRoutes from './routes/photoroutes';
import listEndpoints from 'express-list-endpoints';
import adminRoutes from './routes/adminroutes'
const app: Application = express();

// app.use(helmet());
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use('/api/v1', routes);
app.use('/api-docs', swaggerServe, swaggerSetup);
app.use('/auth', authRoutes);
app.use('/photos', photoRoutes);

app.use(errorMiddleware);

app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Log all registered routes
console.log('Registered routes:', listEndpoints(app));

export default app;