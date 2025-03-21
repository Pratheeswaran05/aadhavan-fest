require('dotenv').config();
const { Pool } = require('pg');

// console.log("Database Config: ", process.env.DB_USER, process.env.DB_PASS); // Debugging

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

module.exports = pool;
