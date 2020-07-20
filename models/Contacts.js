const sequelize = require('../helpers/sequelize')
const { Model, DataTypes } = require('sequelize');

class Contacts extends Model {

}

Contacts.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

}, {
  sequelize,
  modelName: 'Contacts',
  tableName: 'contacts',
  timestamps: false,
});


module.exports = Contacts;
