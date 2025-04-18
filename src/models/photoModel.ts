
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db';
import User from './userModel';  

class Photo extends Model {
  public id!: number;
  public userId!: number;
  public fileName!: string;
  public fileSize!: number;
  public caption!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Photo',
    tableName: 'photos',
  }
);

User.hasMany(Photo, { foreignKey: 'userId' });
Photo.belongsTo(User, { foreignKey: 'userId' });

export default Photo;
