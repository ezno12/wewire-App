'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ChartData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dataId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Charts',
          key: 'id'
        }
      },
      xField: {
        allowNull: false,
        type: Sequelize.STRING
      },
      yField: {
        allowNull: false,
        type: Sequelize.STRING
      },
      zField: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ChartData');
  }
};