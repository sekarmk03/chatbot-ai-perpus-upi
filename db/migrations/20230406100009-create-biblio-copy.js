'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('biblio_copy', {
      bibid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      copyid: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      copy_desc: {
        type: Sequelize.STRING
      },
      barcode_nmbr: {
        allowNull: false,
        type: Sequelize.STRING
      },
      status_cd: {
        allowNull: false,
        type: Sequelize.CHAR
      },
      status_begin_dt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      due_back_dt: {
        type: Sequelize.DATEONLY
      },
      mbrid: {
        type: Sequelize.INTEGER
      },
      renewal_count: {
        allowNull: false,
        type: Sequelize.TINYINT
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('biblio_copy');
  }
};