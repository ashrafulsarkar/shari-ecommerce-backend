const mongoose = require('mongoose');

const AlbumSchema = mongoose.Schema({
  name:{
    type:String,
    required:false,
   },
  img:{
    type:String,
    required:false,
   },

},{
  timestamps: true
})

const Album = mongoose.model('Album',AlbumSchema);
module.exports = Album;