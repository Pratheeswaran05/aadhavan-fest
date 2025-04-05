const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

router.post('/upload', authMiddleware, upload.single('video'), videoController.uploadVideo);
router.get('/', videoController.getAllVideos);

module.exports = router;
