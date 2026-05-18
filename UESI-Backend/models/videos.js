const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: String,
  description: String,
  uploaded_date: {
    type: Date,
    default: Date.now(),
  },
  url: {
    type: String, // ✅ Expect a string instead of an object
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
});

  


const Video = mongoose.model("Video", videoSchema);

module.exports = Video;