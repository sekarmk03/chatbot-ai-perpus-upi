'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  member.init({
    mbrid: DataTypes.INTEGER,
    barcode_nmbr: DataTypes.STRING,
    create_dt: DataTypes.DATE,
    last_change_dt: DataTypes.DATE,
    last_change_userid: DataTypes.INTEGER,
    last_name: DataTypes.STRING,
    first_name: DataTypes.STRING,
    address: DataTypes.TEXT,
    home_phone: DataTypes.STRING,
    work_phone: DataTypes.STRING,
    email: DataTypes.STRING,
    classification: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'member',
    tableName: 'member',
    timestamps: false,
  });
  return member;
};