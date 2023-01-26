'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Company,{foreignKey : companyId})
      Transaction.belongsTo(models.Users,{foreignKey : authorId})

    }
  }
  Transaction.init({
    companyId: DataTypes.INTEGER,
    itemName: DataTypes.STRING,
    totalItem: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};