const { DataTypes } = require('sequelize');

const sequelize = require('../database/config');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, { tableName: 'roles' });

module.exports = Role;