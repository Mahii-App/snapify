import sequelize from '../config/db';
import User from './userModel';
import Photo from './photoModel';

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log(' PostgreSQL connected successfully');
    await sequelize.sync({ alter: true }); 
    console.log(' Models synced successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { connectToDatabase, User, Photo };
