const wrapAsync = require("./utils/wrapAsync");
const Article = require("./models/articles");
const Feedback = require("./models/feedbacks");
const Course = require("./models/courses");
const Program = require("./models/programs");
const {
  articleSchema,
  courseSchema,
  programSchema,
  feedbackSchema,
  videoSchema,
} = require("./schema");
const ExpressError = require("./utils/ExpressError");

module.exports.validateArticle = (req, res, next) => {
    // Restructure `req.body` to include the `article` object
    const articleData = {
      title: req.body.article.title,
      content: req.body.article.content,
    };
  
    // Re-assign `req.body.article` so it matches the Joi schema
    req.body.article = articleData;
  
    // Validate using Joi schema
    const { error } = articleSchema.validate({ article: req.body.article });
    if (error) {
      const errMsg = error.details.map((el) => el.message).join(", ");
      throw new ExpressError(400, errMsg);
    }
    next();
  };
  

module.exports.validateCourse = (req, res, next) => {
  const result = courseSchema.validate(req.body);
  let { error } = result;
  // console.log(result);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateProgram = (req, res, next) => {

  const programData = {
    title: req.body.program.title,
    description: req.body.program.description,
    start_date: req.body.program.start_date,
    end_date: req.body.program.end_date,
    status: req.body.program.status,
    location: req.body.program.location,
  };
  
  const result = programSchema.validate({ program: programData });
  let { error } = result;
  // console.log(result);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateFeedback = (req, res, next) => {
  const result = feedbackSchema.validate(req.body);
  let { error } = result;
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.validateVideo = (req, res, next) => {
  const { error } = videoSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isLoggedin = (req, res, next) => {
  console.log("User is authenticated:", req.isAuthenticated());
  if (!req.isAuthenticated()) {
    console.log("User not authenticated. Redirecting to login.");
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to access this page");
    return res.redirect("/login");
  }
  console.log("User authenticated. Proceeding to next middleware.");
  next();
};

module.exports.isOwnerArticle = wrapAsync(async (req, res, next) => {
  let { id } = req.params;
  let article = await Article.findById(id);
  // console.log(req.user);
  if (!article.author.equals(req.user._id)) {
    req.flash("error", `You don't have Permisson of ${article.title}`);
    return res.redirect(`/articles/${id}`);
  }
  next();
});

module.exports.isFeedbackAuthor = wrapAsync(async (req, res, next) => {
  let { feedbackId } = req.params;
  let feedback = await Feedback.findById(feedbackId);
  if (!feedback.author.equals(req.user._id)) {
    req.flash("error", `You don't have Permission to delete this review`);
    return res.redirect(`/programs`);
  }
  next();
});

module.exports.isAdmin = wrapAsync(async (req, res, next) => {
  if (!req.user.isAdmin) {
    req.flash("error", `You don't have Permission to delete this.`);
    return res.redirect(`/programs`);
  }
  next();
});

module.exports.isEnrolled = wrapAsync(async (req, res, next) => {
  let course = Course.findOne(req.params.course);
  if (!course.enrollerd_users.includes(req.user._id)) {
    req.flash("error", `You are not enrolled in this course.`);
    return res.redirect(`/courses/${req.params.course}`);
  }
});
