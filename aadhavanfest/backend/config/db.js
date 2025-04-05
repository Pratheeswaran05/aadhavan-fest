// require('dotenv').config();
// const { Pool } = require('pg');
// const { Sequelize } = require('sequelize');



// // console.log("Database Config: ", process.env.DB_USER, process.env.DB_PASS); // Debugging

// // PostgreSQL Pool for raw queries if needed
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//   });

// // Sequelize instance for ORM
// const sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS, 
//     {
//       host: process.env.DB_HOST,
//       dialect: 'postgres',
//     }
//   );

// module.exports =  { pool, sequelize };


// backend/config/db.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Optional: turn off SQL logs
  }
);

module.exports = { sequelize };
