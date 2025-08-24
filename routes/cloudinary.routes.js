const express = require('express');
const router = express.Router();
// internal
// const uploader = require('../middleware/uploder');
const { cloudinaryController } = require('../controller/cloudinary.controller');
const multer = require('multer');
const cloudinary = require("../utils/cloudinary");

const upload = multer();
const uploads = multer({ storage: multer.memoryStorage() });
//add image
router.post('/add-img',upload.single('image'), cloudinaryController.saveImageCloudinary);

//add image
router.post('/add-multiple-img',upload.array('images',5), cloudinaryController.addMultipleImageCloudinary);
router.post('/media-multiple-img',uploads.array('images',10), cloudinaryController.mediaMultipleImageCloudinary);

//delete image
router.delete('/img-delete', cloudinaryController.cloudinaryDeleteController);


router.get('/images', async (req, res) => {
  try {
    const { next_cursor } = req.query;

    const search = cloudinary.search
      .expression('resource_type:image') // Optional filter
      .max_results(50); // Set page size (20 images per page)

    if (next_cursor) search.next_cursor(next_cursor);

    const { resources, next_cursor: newCursor } = await search.execute();

    res.json({
      resources,
      next_cursor: newCursor || null, // return next page cursor
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

module.exports = router;