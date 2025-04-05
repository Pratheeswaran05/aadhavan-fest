const Video = require('../models/Video');


exports.uploadVideo = async (req, res) => {
    try {
        if (!req.files || !req.files.videos || !req.files.thumbnails) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const adminId = req.admin.id; // Get admin ID from token
        const videoFiles = req.files.videos;
        const thumbnailFiles = req.files.thumbnails;

        const uploadedVideos = [];

        for (let i = 0; i < videoFiles.length; i++) {
            const newVideo = await Video.create({
                video_path: `/uploads/${videoFiles[i].filename}`,
                thumbnail_path: `/uploads/${thumbnailFiles[i].filename}`,
                uploaded_by: adminId
            });

            uploadedVideos.push(newVideo);
        }

        res.status(201).json({ message: 'Videos uploaded successfully', videos: uploadedVideos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
