const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateVideo, isLoggedin, isAdmin } = require("../middleware");
const videoControllers = require("../Controllers/videos");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })

// ADD Video
router.post(
  "/videos",
  isLoggedin,
  isAdmin,
  upload.single("video"), // ✅ Match with the frontend field name
  validateVideo,
  wrapAsync(videoControllers.addCourseVideo)
);

//DELETE Video
router
  .route("/videos/:videoId")
  .delete(isLoggedin, isAdmin, wrapAsync(videoControllers.deleteCourseVideo))
  .get(wrapAsync(videoControllers.show));

module.exports = router;
