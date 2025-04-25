import app from './app';
import { connectDB } from './config/db';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(` Server running on http://localhost:${PORT}`);
      logger.info(` Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error(' Failed to start server:', error);
    process.exit(1);
  }
})();

