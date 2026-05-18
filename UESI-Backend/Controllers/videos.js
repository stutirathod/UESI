const Course = require("../models/courses");
const Video = require("../models/videos");

module.exports.addCourseVideo = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!req.file) {
      console.log("No file received:", req.file);
      return res.status(400).json({ error: "No video file uploaded!" });
    }
    console.log("File received:", req.file);

    let newVideo = new Video({
      title: req.body.title,
      description: req.body.description,
      url: req.file.path,
    });

    course.videos.push(newVideo);
    await newVideo.save();
    await course.save();

    res.json({ message: "Video Uploaded Successfully", video: newVideo });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload video." });
  }
};

module.exports.deleteCourseVideo = async (req, res) => {
  let { id, videoId } = req.params;
  console.log("Deleting video with ID:", videoId);
  console.log("From course with ID:", id);
  await Course.findByIdAndUpdate(id, { $pull: { videos: videoId } });
  await Video.findByIdAndDelete(videoId);
  res.json({ message: "Video Deleted!" });
  console.log("Video deleted successfully");
};

module.exports.show = async (req, res) => {
  const {id, videoId} = req.params;
  video = await Video.findById(videoId);
  if (!video) {
    req.flash("error", "This video Doesn't Exist");
    console.log("Error");
    res.redirect(`/courses/${id}`);
  }
  video.views += 1;
  await video.save(); 
  res.json(video);
}