const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminMiddleware = require('../middleware/authMiddleware');


router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.loginAdmin);
router.get('/profile', adminMiddleware, adminController.getProfile);

module.exports = router;
