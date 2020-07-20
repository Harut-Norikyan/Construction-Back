const {Model, DataTypes} = require("sequelize");
const sequelize = require("../helpers/sequelize");

class Users extends Model {

}

Users.init({
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("admin"),
            defaultValue: "admin"

        },
    },
    {
        sequelize,
        modelName: "Users",
        tableName: "users",
        timestamps: false,
    });
module.exports = Users;
