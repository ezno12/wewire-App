'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChartData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChartData.init({
    xField: {
      allowNull: false,
      type: DataTypes.STRING
    },
    yField: {
      allowNull: false,
      type: DataTypes.STRING
    },
    zField: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'ChartData',
  });
  return ChartData;
};