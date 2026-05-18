const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const { validateFeedback, isLoggedin, isFeedbackAuthor } = require("../middleware");
const feedbackControllers = require("../Controllers/feedbacks");

// ADD REVIEW
router.post("/programs/:id/feedbacks", isLoggedin, validateFeedback, wrapAsync(feedbackControllers.addProgramFeedback));
router.post("/articles/:id/feedbacks", isLoggedin, validateFeedback, wrapAsync(feedbackControllers.addArticleFeedback));
router.post("/courses/:id/feedbacks", isLoggedin, validateFeedback, wrapAsync(feedbackControllers.addCourseFeedback));

//DELETE REVIEW
router.delete("/programs/:id/feedbacks/:feedbackId", isLoggedin, isFeedbackAuthor, wrapAsync(feedbackControllers.deleteProgramFeedback));
router.delete("/articles/:id/feedbacks/:feedbackId", isLoggedin, isFeedbackAuthor, wrapAsync(feedbackControllers.deleteArticleFeedback));
router.delete("/courses/:id/feedbacks/:feedbackId", isLoggedin, isFeedbackAuthor, wrapAsync(feedbackControllers.deleteCourseFeedback));

module.exports = router;