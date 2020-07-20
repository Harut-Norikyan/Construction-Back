const sequelize = require('../helpers/sequelize')
const { Model, DataTypes } = require('sequelize');

class About extends Model {

}

About.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },
  longDesc: {
    type: DataTypes.TEXT("long"),
    allowNull: false,
  },

  // images: {
  //   type: DataTypes.STRING,
  //   allowNull: true,
  // },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
  },

}, {
  sequelize,
  modelName: 'About',
  tableName: 'about',
  timestamps: false,
});


module.exports = About;
