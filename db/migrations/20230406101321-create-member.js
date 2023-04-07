'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('member', {
      mbrid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      barcode_nmbr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      create_dt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      last_change_dt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      last_change_userid: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      first_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      home_phone: {
        type: Sequelize.STRING
      },
      work_phone: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      classification: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('member');
  }
};