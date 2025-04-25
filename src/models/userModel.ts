
import { Sequelize, DataTypes } from 'sequelize';

const user = (sequelize : Sequelize ) => {
    return sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'user',
    },
  }, {
    schema : 'mahischema',
    tableName: 'users',
    timestamps: true 
  }
);
};

export default user;