const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// Register Admin
const registerAdmin = async (req, res) => {
    try {
        const client = await pool.connect();
        const { email, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await client.query({
            text: 'SELECT id FROM admin_users WHERE email = $1',
            values: [email]
        });

        if (existingAdmin.rows.length > 0) {
            client.release();
            return res.status(400).json({ success: false, message: 'Admin already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new admin
        const newAdmin = await client.query({
            text: 'INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
            values: [email, hashedPassword]
        });

        client.release();
        res.status(201).json({ success: true, message: "Admin registered successfully", admin: newAdmin.rows[0] });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

// Login Admin
const loginAdmin = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Check what is received

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        const trimmedEmail = email.trim(); // Prevents extra spaces

        const client = await pool.connect();
        const result = await client.query({
            text: 'SELECT id, email, password_hash FROM admin_users WHERE email = $1',
            values: [trimmedEmail]
        });

        client.release();

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, message: 'Email not found' });
        }

        const admin = result.rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password_hash);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Incorrect password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ success: true, message: 'Login successful', token, admin: { id: admin.id, email: admin.email } });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const getAdminProfile = async (req, res) => {
    try {
        console.log("Received request for admin profile with user ID:", req.user.id); // Log user ID

        const client = await pool.connect();
        const adminId = req.user.id;

        const result = await client.query({
            text: 'SELECT id, name, email FROM admin_users WHERE id = $1',
            values: [adminId]
        });

        client.release();

        if (result.rows.length === 0) {
            console.error("Admin not found for ID:", adminId);
            return res.status(404).json({ success: false, message: 'Admin not found' });
        }

        console.log("Admin profile fetched successfully:", result.rows[0]);
        res.json({ success: true, admin: result.rows[0] });
    } catch (error) {
        console.error("Error fetching admin profile:", error); // Log full error
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


module.exports = { registerAdmin, loginAdmin, getAdminProfile};
