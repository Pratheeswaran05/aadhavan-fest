const express = require('express');
const { loginAdmin, registerAdmin, getAdminProfile } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
const jwt = require('jsonwebtoken');


router.post('/login', loginAdmin); // Use POST for login
router.post('/register', registerAdmin);
router.get('/me', authMiddleware, getAdminProfile);


module.exports = router;