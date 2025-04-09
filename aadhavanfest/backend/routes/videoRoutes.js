const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const upload = require('../middleware/uploadMiddleware'); // multer middleware

// Handle both video and thumbnail uploads
router.post('/upload',
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  videoController.uploadVideo
);

module.exports = router;
