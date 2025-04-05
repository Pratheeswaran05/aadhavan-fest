// const express = require('express');
// const { loginAdmin, registerAdmin, getAdminProfile } = require('../controllers/adminController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { verifyAdmin } = require('../middleware/authMiddleware');


// router.post('/login', loginAdmin); // Use POST for login
// router.post('/register', registerAdmin);
// router.get('/me', authMiddleware, getAdminProfile);


// // Protected route
// router.get('/profile', verifyAdmin, getAdminProfile);


// module.exports = router;

const express = require('express');
const { loginAdmin, registerAdmin, getAdminProfile } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/authMiddleware'); // ✅ Correct import

const router = express.Router();

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);

// Protected routes
router.get('/me', verifyAdmin, getAdminProfile);
router.get('/profile', verifyAdmin, getAdminProfile); // You can keep one of these or both

module.exports = router;
