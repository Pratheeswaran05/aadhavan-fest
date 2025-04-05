// const express = require('express');
// const { uploadVideo } = require('../controllers/videoController');
// const upload = require('../middleware/uploadMiddleware');
// const verifyAdmin = require('../middleware/authMiddleware');

// const router = express.Router();

// router.post(
//   '/upload',
//   verifyAdmin,
//   upload.fields([
//     { name: 'videos', maxCount: 5 },
//     { name: 'thumbnails', maxCount: 5 },
//   ]),
//   uploadVideo
// );

// module.exports = router;


const express = require('express');
const { uploadVideo } = require('../controllers/videoController');
const upload = require('../middleware/uploadMiddleware');
const { verifyAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload',
    verifyAdmin, // ✅ This must be a function
    upload.fields([
        { name: 'videos', maxCount: 5 },
        { name: 'thumbnails', maxCount: 5 }
    ]),
    uploadVideo
);

module.exports = router; // ✅ Only export the router
