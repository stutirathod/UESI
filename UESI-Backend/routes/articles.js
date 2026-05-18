const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const articleControllers = require("../Controllers/articles");
const {
  validateArticle,
  isLoggedin,
  isOwnerArticle,
} = require("../middleware");
const Article = require("../models/articles");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(articleControllers.index))
  .post(
    isLoggedin, // Ensure the user is logged in
    upload.single("article[image]"), // Handle file uploads first
    validateArticle, // Validate the `article` object
    wrapAsync(articleControllers.addArticle) // Process the request
  );

router.get("/new", isLoggedin, wrapAsync(articleControllers.newPage));

router
  .route("/:id")
  .get(wrapAsync(articleControllers.show))
  .put(
    isLoggedin,
    isOwnerArticle,
    upload.single("article[image]"), // ✅ Match frontend FormData field
    wrapAsync(articleControllers.edit_save)
  )
  .delete(isLoggedin, isOwnerArticle, wrapAsync(articleControllers.delete));

router.get("/:id/edit", isLoggedin, wrapAsync(articleControllers.editPage));

module.exports = router;
