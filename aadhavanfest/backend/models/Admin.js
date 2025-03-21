const pool = require('../config/db');

const findAdminByEmail = async (email) => {
    const result = await pool.query(
        'SELECT id, email, password_hash FROM admin_users WHERE email = $1', 
        [email]
    );
    console.log("Query Result:", result.rows); // Debugging
    return result.rows[0]; 
};



const insertAdmin = async (email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
        [email, hashedPassword]  
    );
    console.log("Inserted Admin:", result.rows[0]); // Debugging
    return result.rows[0]; 
};


module.exports = { findAdminByEmail, insertAdmin }; 
