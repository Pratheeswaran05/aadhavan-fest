const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Video = sequelize.define('Video', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    filename: { type: DataTypes.STRING, allowNull: false },
}, {
    tableName: 'videos',
    timestamps: true
});

module.exports = Video;
