const { DataTypes } = require("sequelize");

const sequelize = require('../database/config');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    img: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    google: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
}, {
    getterMethods: {
        user() {
            const { password, id, ...user } = this.dataValues;
            user.uid = id;
            return user;
        }
    }, tableName: 'users'
});

module.exports = User;