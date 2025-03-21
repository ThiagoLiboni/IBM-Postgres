'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      firstName: {
        type: Sequelize.STRING(25),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      phoneNumber: {
              type: Sequelize.STRING(13),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(75),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      brokerName: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      brokerCity: {
        type: Sequelize.STRING(25),
        allowNull: true
      },
      brokerState: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      brokerPhone: {
        type: Sequelize.STRING(13),
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('create-table-clients');
  }
};