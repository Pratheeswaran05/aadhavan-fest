const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/adminController');
const router = express.Router();

router.post('/login', loginAdmin); // Use POST for login
router.post('/register', registerAdmin);

module.exports = router;

