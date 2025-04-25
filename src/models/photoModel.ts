
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../config/db';
import user from './userModel';  
import { timeStamp } from 'console';

export const photo = (sequelize: any) => {
  return sequelize.define(
    'photo',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users', 
          key: 'id',
        },
      },
      image_url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      schema: 'mahischema',
      tableName: 'photos',
      timestamps: true,
    }
  );
};