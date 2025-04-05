const Video = require('../models/Video');

exports.uploadVideo = async (req, res) => {
    try {
        const { title } = req.body;
        const filename = req.file.filename;

        const video = await Video.create({ title, filename });

        res.status(201).json(video);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.findAll();
        res.json(videos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
