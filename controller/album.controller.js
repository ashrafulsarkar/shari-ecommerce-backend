
const Album = require("../model/Album");

// Get All Album
exports.getAlbumAll = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

// Get Single Album
exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json(album);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Album
exports.createAlbum = async (req, res) => {
  try {
    const album = await Album.create(req.body);
    res.status(201).json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Album
exports.updateAlbum = async (req, res) => {
  try {
    let updateData = req.body;
    const album = await Album.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json(album);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete Album
exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ error: "Album not found" });
    res.json({ message: "Album deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
