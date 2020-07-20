const sequelize = require('../helpers/sequelize')
const { Model, DataTypes } = require('sequelize');

class Projects extends Model {

}

Projects.init({
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
  modelName: 'Projects',
  tableName: 'projects',
  timestamps: false,
});


module.exports = Projects;
