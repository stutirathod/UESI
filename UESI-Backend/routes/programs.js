const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const programControllers = require("../Controllers/programs");
const { validateProgram, isLoggedin, isAdmin } = require("../middleware");
const Program = require("../models/programs");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(programControllers.index))
  .post(
    isLoggedin,
    upload.single("program[image]"),
    validateProgram,
    isAdmin,
    wrapAsync(programControllers.addProgram)
  );

router
  .route("/:id")
  .get(wrapAsync(programControllers.show))
  .put(
    isLoggedin,
    isAdmin,
    upload.single("program[image]"), // Upload first
    validateProgram, // Then validate
    wrapAsync(programControllers.edit_save)
  )
  .delete(isLoggedin, isAdmin, wrapAsync(programControllers.delete));

router.get("/:id/edit", wrapAsync(programControllers.editPage));
router.get(
  "/:id/registeredUsers",
  isLoggedin,
  wrapAsync(programControllers.registeredUsers)
);

module.exports = router;
