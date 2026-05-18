const Feedback = require("../models/feedbacks");
const Program = require("../models/programs");
const Article = require("../models/articles");
const Course = require("../models/courses");

module.exports.addProgramFeedback = ( async(req,res) => {
    let program = await Program.findById(req.params.id);
    let newFeedback = new Feedback(req.body.feedback);
    console.log(req.user._id);
    newFeedback.author = req.user._id;
    console.log(newFeedback);
    program.feedbacks.push(newFeedback);
    await newFeedback.save();
    await program.save();
    req.flash("success","Feedback Save Successfully!!");
    res.redirect(`/programs/${program._id}`);
});

module.exports.deleteProgramFeedback = (async(req,res) =>  {
    let {id,feedbackId} = req.params;
    await Program.findByIdAndUpdate(id, {$pull : {feedbacks : feedbackId}});
    await Feedback.findByIdAndDelete(feedbackId);
    req.flash("success","Feedback Deleted!");
    res.redirect(`/programs/${id}`);
});

module.exports.addCourseFeedback = ( async(req,res) => {
    
    let course = await Course.findById(req.params.id);
    let newFeedback = new Feedback(req.body.feedback);
    console.log(req.user._id);
    newFeedback.author = req.user._id;
    course.feedbacks.push(newFeedback);
    await newFeedback.save();
    await course.save();
    req.flash("success","Feedback Save Successfully!!");
    res.redirect(`/courses/${course._id}`);
});

module.exports.deleteCourseFeedback = (async(req,res) =>  {
    let {id,feedbackId} = req.params;
    await Course.findByIdAndUpdate(id, {$pull : {feedbacks : feedbackId}});
    await Feedback.findByIdAndDelete(feedbackId);
    res.json({message : "Feedback Deleted!"})
});

module.exports.addArticleFeedback = ( async(req,res) => {
    let article = await Article.findById(req.params.id);
    let newFeedback = new Feedback(req.body.feedback);
    console.log(req.user._id);
    newFeedback.author = req.user._id;
    console.log(newFeedback);
    article.feedbacks.push(newFeedback);
    await newFeedback.save();
    await article.save();
    req.flash("success","Feedback Save Successfully!!");
    res.redirect(`/articles/${article._id}`);
});

module.exports.deleteArticleFeedback = (async(req,res) =>  {
    let {id,feedbackId} = req.params;
    await Article.findByIdAndUpdate(id, {$pull : {feedbacks : feedbackId}});
    await Feedback.findByIdAndDelete(feedbackId);
    req.flash("success","Feedback Deleted!");
    console.log("Feedback Deleted!");
    // res.redirect(`/articles/${id}`);
});

