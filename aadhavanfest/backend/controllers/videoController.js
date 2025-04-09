const Video = require('../models/Video');

// const uploadVideo = async (req, res) => {
//   try {
//     const { title, description, adminId } = req.body;

//     const videoPath = req.files['video'] ? req.files['video'][0].path : null;
//     const thumbnailPath = req.files['thumbnail'] ? req.files['thumbnail'][0].path : null;

//     if (!videoPath) {
//       return res.status(400).json({ message: 'Video file is required' });
//     }

//     const newVideo = await Video.create({
//       title,
//       description,
//       videoPath,
//       thumbnailPath,
//       admin_id: adminId
//     });

//     res.status(201).json(newVideo);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Video upload failed' });
//   }
// };


const uploadVideo = async (req, res) => {


  try {

    console.log('Incoming request body:', req.body);

    const { admin_id, title, description, categories, subcategories, video_url, thumbnail_url } = req.body;

    const parsedCategories = typeof categories === 'string' ? JSON.parse(categories) : categories;
    const parsedSubcategories = typeof subcategories === 'string' ? JSON.parse(subcategories) : subcategories;

    if (!categories || !video_url) {
      return res.status(400).json({ message: 'categories and video_url are required!' });
    }

    const newVideo = await Video.create({
      admin_id,
      title,
      description,
      categories: parsedCategories,     
      subcategories: parsedSubcategories, 
      video_url,
      thumbnail_url,
    });

    res.status(201).json(newVideo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

module.exports = { uploadVideo };