
import { Sequelize } from 'sequelize';
import user from '../models/userModel';
import { photo } from '../models/photoModel';
// import { photo } from '../models/photoModel';

import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string ,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,  
    define: {
      schema : process.env.DB_SCHEMA
    },
  }
);
const User = user(sequelize) ;
const Photo = photo(sequelize);

User.hasMany(Photo, {foreignKey: 'userId', as: 'photos'});
Photo.belongsTo(User, {foreignKey: 'userId', as: 'user'});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
  } catch (error) {
    console.error(' Unable to connect to PostgreSQL:', error);
    process.exit(1);
  }
};

export {User, Photo, sequelize};

