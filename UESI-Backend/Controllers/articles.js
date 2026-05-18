const ExpressError = require("../utils/ExpressError");
const Article = require("../models/articles");

module.exports.index = async (req, res) => {
  const allArticle = await Article.find().populate("author");
  // const allArticle = await Article.find({approved: true});
  res.json(allArticle);
};

module.exports.addArticle = async (req, res) => {
  const { path, filename } = req.file; // Get uploaded file details
  const articleData = req.body.article; // This is populated after validation middleware

  // Create a new article
  const newArticle = new Article({
    ...articleData,
    author: req.user._id,
    approved: false,
    image: { path, filename }, // Include image data
  });

  // Save the article to the database
  const savedArticle = await newArticle.save();
  console.log(savedArticle);
  res.json({ message: "Article created successfully", article: savedArticle });
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let isOwner = false;
  const article = await Article.findById(id)
    .populate({ path: "feedbacks", populate: { path: "author" } })
    .populate("author");
    
  if (!article) {
    req.flash("error", "This article Doesn't Exist");
    console.log("Error");
    res.redirect("/articles");
  } else {
    console.log(req.user);
    article.visited_count += 1;
    await article.save();
    if (req.isAuthenticated() && article.author.equals(req.user._id)) {
        isOwner = true;
    }
    res.json({ article, isOwner });
  }
};

module.exports.edit_save = async (req, res) => {
  console.log(req.user);
  if (!req.body.article) {
    throw new ExpressError(400, "Send valid data for articles");
  }

  let { id } = req.params;
  let article = await Article.findByIdAndUpdate(id, { ...req.body.article });
  article.image = req.file;
  console.log(article);
  let saved = await article.save();
  console.log(saved);
  console.log({ ...req.body.article });
  res.json({ message: "Article updated successfully" });
  // res.json(newarticle);
};

module.exports.delete = async (req, res) => {
  let { id } = req.params;
  let deleted = await Article.findByIdAndDelete(id);
  console.log(deleted);
  req.flash("success", "Article Deleted!");
  res.redirect("/articles");
};

module.exports.newPage = (req, res) => {
  console.log(req.user);
  res.send("Render new page hereeeee for ARTICLES");
};

module.exports.editPage = async (req, res) => {
  let { id } = req.params;
  const article = await Article.findById(id);
  if (!article) {
    req.flash("error", "This Listing Doesn't Exist");
    res.redirect("/articles");
  } else {
    let orignalImageUrl = article.image.path;
    orignalImageUrl = orignalImageUrl.replace("/upload", "/upload/w_250");
    res.json({ article, orignalImageUrl });
  }
};
