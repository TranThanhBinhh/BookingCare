'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Markdown.belongsTo(models.User, { foreignKey: 'doctorId' });
      Markdown.belongsTo(models.Clinic, { foreignKey: 'clinicId' });
      Markdown.belongsTo(models.Specialty, { foreignKey: 'specialtyId' });
      Markdown.belongsTo(models.Allcode,{foreignKey:'priceId',targetKey:'keyMap', as:'priceData'});
      Markdown.belongsTo(models.Allcode,{foreignKey:'paymentId',targetKey:'keyMap',as:'paymentData'});

    }
  }
  Markdown.init({
    contentHTML: DataTypes.TEXT('long'),
    contentMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    count: DataTypes.INTEGER,
    
    
  }, {
    sequelize,
    modelName: 'Markdown',
  });
  return Markdown;
};


