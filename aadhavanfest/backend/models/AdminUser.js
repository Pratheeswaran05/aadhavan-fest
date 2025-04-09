const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const AdminUser = sequelize.define('AdminUser', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  module.exports = AdminUser;