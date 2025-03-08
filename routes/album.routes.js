const express = require('express');
const router = express.Router();
const albumController = require("./../controller/album.controller");


router.get("/", albumController.getAlbumAll);
router.get("/:id", albumController.getAlbum);
router.post("/", albumController.createAlbum);
router.put("/:id", albumController.updateAlbum);
router.delete("/:id", albumController.deleteAlbum);

module.exports = router;
