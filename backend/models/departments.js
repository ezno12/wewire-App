'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Departments.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER

    },
    title: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    arTitle: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    imgUrl: {
      allowNull: true,
      unique: true,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Departments',
  });
  return Departments;
};