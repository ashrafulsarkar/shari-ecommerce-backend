const fs = require("fs");
const { cloudinaryServices } = require("../services/cloudinary.service");

// add image
const saveImageCloudinary = async (req, res,next) => {
  // console.log(req.file)
  try {
    const result = await cloudinaryServices.cloudinaryImageUpload(
      req.file.buffer
    );
    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      data:{url:result.secure_url,id:result.public_id},
    });
  } catch (err) {
    console.log(err);
    next(err)
  }
};

// add image
const addMultipleImageCloudinary = async (req, res) => {
  try {
    const files = req.files;

    // Array to store Cloudinary image upload responses
    const uploadResults = [];

    for (const file of files) {
      // Upload image to Cloudinary
      const result = await cloudinaryServices.cloudinaryImageUpload(file.path);

      // Store the Cloudinary response in the array
      uploadResults.push(result);
    }

    // Delete temporary local files
    for (const file of files) {
      fs.unlinkSync(file.path);
    }

    res.status(200).json({
      success: true,
      message: "image uploaded successfully",
      data:
        uploadResults.length > 0
          ? uploadResults.map((res) => ({
              url: res.secure_url,
              id: res.public_id,
            }))
          : [],
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to upload image",
    });
  }
};

const mediaMultipleImageCloudinary = async (req, res) => {
  try {
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const uploadResults = [];

    for (const file of files) {
      if (!file.buffer) continue; // skip empty files

      const result = await cloudinaryServices.cloudinaryImageUpload(file.buffer); // ✅ buffer, not path

      uploadResults.push({
        secure_url: result.secure_url,
        public_id: result.public_id,
        asset_id: result.asset_id,
      });
    }

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      images: uploadResults,
    });
  } catch (err) {
    console.error("Error uploading to Cloudinary:", err);
    res.status(500).json({
      success: false,
      message: "Failed to upload images",
      error: err.message,
    });
  }
};



// cloudinary ImageDelete
// const cloudinaryDeleteController = async (req, res) => {
//   try {
//     const { folder_name, id } = req.query;
//     const public_id = `${folder_name}/${id}`;
//     const result = await cloudinaryServices.cloudinaryImageDelete(public_id);
//     res.status(200).json({
//       success: true,
//       message: "delete image successfully",
//       data: result,
//     });
//   } catch (err) {
//     res.status(500).send({
//       success: false,
//       message: "Failed to delete image",
//     });
//   }
// };
const cloudinaryDeleteController = async (req, res) => {
  try {
    const { public_id } = req.body; // get public_id directly from request body
    if (!public_id) {
      return res.status(400).json({ success: false, message: "public_id is required" });
    }

    const result = await cloudinaryServices.cloudinaryImageDelete(public_id);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: err.message,
    });
  }
};


exports.cloudinaryController = {
  cloudinaryDeleteController,
  saveImageCloudinary,
  addMultipleImageCloudinary,
  mediaMultipleImageCloudinary
};
