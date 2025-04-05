const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');
const { sequelize } = require('../config/db');


const Video = sequelize.define('Video', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
    video_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail_path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'videos',
    timestamps: false,
  });
  
  module.exports = Video;