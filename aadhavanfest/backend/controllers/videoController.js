const Video = require('../models/Video');

const uploadVideo = async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);

    const { adminId, title, description, categories, subcategories } = req.body;

    // 🔥 Parse stringified JSON fields
    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    const parsedSubcategories = typeof subcategories === 'string' ? JSON.parse(subcategories) : subcategories;

    // 🔥 Handle optional file uploads or URLs
    const videoUrl = req.body.video_url || (req.files?.video && req.files.video[0]?.path);
    const thumbnailUrl = req.body.thumbnail_url || (req.files?.thumbnail && req.files.thumbnail[0]?.path);

    if (!parsedCategories || !videoUrl) {
      return res.status(400).json({ message: 'categories and video_url are required!' });
    }

    const newVideo = await Video.create({
      admin_id: adminId,
      title,
      description,
      categories: parsedCategories,
      subcategories: parsedSubcategories,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
    });

    res.status(201).json(newVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

module.exports = { uploadVideo };
