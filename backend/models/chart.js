'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chart extends Model {
    static associate(models) {
      // define association here
      Chart.hasMany(models.ChartData, {
        foreignKey: 'dataId',
      })
    }
  }
  Chart.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    title: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING
    },
    Type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    departements: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Chart',
  });
  return Chart;

  
};