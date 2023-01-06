'use strict';
const {
  Model, UniqueConstraintError
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    permission: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true
      }
    },
    isAdmin: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};