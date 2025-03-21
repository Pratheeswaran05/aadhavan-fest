const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const pool = require('./config/db');

dotenv.config();
const app = express();

app.use(express.json()); // Parses JSON requests
app.use(cors()); // Enables CORS

app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
    try {
        await pool.connect();
        console.log(`Server running on port ${PORT}`);
        console.log("Connected to PostgreSQL");
    } catch (err) {
        console.error("Database connection error", err);
    }
});
