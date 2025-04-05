const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AdminUser = sequelize.define('AdminUser', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'admin_users',
    timestamps: false
});

module.exports = AdminUser;
