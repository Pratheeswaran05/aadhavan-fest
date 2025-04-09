// // const { DataTypes } = require('sequelize');
// // const sequelize = require('../config/sequelize');
//     const { DataTypes } = require('sequelize');
//     const sequelize = require('../config/sequelize'); // ✅ your db connection
//     const AdminUser = require('./AdminUser');

    
//     const Video = sequelize.define('Video', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: true
//       },
//       videoPath: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       thumbnailPath: {
//         type: DataTypes.STRING,
//         allowNull: true
//       },
//       admin_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: 'admin_users', // ❗ use actual *table name* in DB (lowercase, snake_case if needed)
//           key: 'id'
//         }
//       }
//     }, {
//       tableName: 'videos', // ✅ Table name
//       timestamps: true
//     });
    
//     // Relation
//     Video.belongsTo(AdminUser, { foreignKey: 'admin_id' });
    
//     module.exports = Video;

// models/Video.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // adjust the path

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
