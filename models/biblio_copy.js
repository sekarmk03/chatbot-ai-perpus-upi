'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class biblio_copy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  biblio_copy.init({
    bibid: DataTypes.INTEGER,
    copyid: DataTypes.INTEGER,
    copy_desc: DataTypes.STRING,
    barcode_nmbr: DataTypes.STRING,
    status_cd: DataTypes.STRING,
    status_begin_dt: DataTypes.DATE,
    due_back_dt: DataTypes.DATE,
    mbrid: DataTypes.INTEGER,
    renewal_count: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'biblio_copy',
    tableName: 'biblio_copy',
    timestamps: false,
  });
  return biblio_copy;
};