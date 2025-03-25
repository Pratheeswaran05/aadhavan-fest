const express = require('express');
const { loginAdmin, registerAdmin, getAdminProfile } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/login', loginAdmin); // Use POST for login
router.post('/register', registerAdmin);
router.get('/me', authMiddleware, getAdminProfile);

// router.get('/me', async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1]; // Extract token
//         if (!token) return res.status(401).json({ message: "Unauthorized" });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const adminId = decoded.id;

//         const result = await pool.query('SELECT name FROM admin_users WHERE id = $1', [adminId]);
//         if (result.rows.length === 0) return res.status(404).json({ message: "Admin not found" });

//         res.json({ name: result.rows[0].name });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });


module.exports = router;