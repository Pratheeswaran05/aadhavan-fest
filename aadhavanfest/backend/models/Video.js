const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); 

const Video = sequelize.define('Video', {
  video_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  admin_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  categories: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  subcategories: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'videos',           // Important
  timestamps: true,              // Enable Sequelize timestamps
  createdAt: 'created_at',        // Map Sequelize's createdAt -> created_at
  updatedAt: 'updated_at',        // Map Sequelize's updatedAt -> updated_at
  underscored: true,              // (optional) makes Sequelize generated fields underscored (like created_at instead of createdAt)
});

module.exports = Video;
