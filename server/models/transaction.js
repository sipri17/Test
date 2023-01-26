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
      Transaction.belongsTo(models.Company,{foreignKey : "companyId"})
      Transaction.belongsTo(models.User,{foreignKey : "authorId"})
      Transaction.belongsTo(models.Item,{foreignKey : "itemId"})

    }
  }
  Transaction.init({
    companyId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    totalItem: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};