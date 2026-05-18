const mongoose = require("mongoose");
const Program = require("../models/programs");
const Article = require("../models/articles");
const Course = require("../models/courses");
const Feedback = require("../models/feedbacks");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/UESI");

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");

  // const locations = [
  //   "St. Peter's Church, Chennai",
  //   "St. George's Syro-Malabar Forane Church, Kochi",
  //   "Mahatma Mandir, Gandhinagar, India",
  //   "St. Thomas Church, Hisar, India",
  //   "Zion Church, Tharangambadi, India",
  //   "Infant Jesus Church, Bengaluru, India",
  //   "St. Paul's Cathedral, Kolkata, India",
  //   "Sacred Heart Cathedral, New Delhi, India",
  //   "All Saints' Cathedral, Prayagraj, India",
  //   "Christ Church, Shimla, India",
  //   "St. Francis Church, Kochi, India",
  //   "Medak Cathedral, Telangana, India",
  //   "St. Andrew's Basilica, Arthunkal, India",
  //   "The Basilica of Bom Jesus, Goa, India",
  //   "St. Mary's Church, Pune, India"
  // ];
  
  // const samplePrograms = Array.from({ length: 15 }, (_, i) => ({
  //   title: `Program ${i + 1}`,
  //   description: `This is the description for Program ${i + 1}. It's a comprehensive program designed to enhance skills and knowledge.`,
  //   start_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  //   end_date: new Date(2023, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 28) + 1),
  //   status: ["Pending", "Active", "Completed"][Math.floor(Math.random() * 3)],
  //   location: locations[i % locations.length], // Assign locations from the list
  // }));

  // const sampleArticles = Array.from({ length: 15 }, (_, i) => ({
  //   title: `Article Title ${i + 1}`,
  //   content: `This is the content of Article ${i + 1}. It covers interesting topics and insights.`,
  //   published_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  //   author: "6752acc93bd71e9f08cb7051"
  // }));

  const sampleCourses = Array.from({ length: 10 }, (_, i) => ({
    title: `Course ${i + 1}`,
    description: `This is the description for Course ${i + 1}. It covers essential topics and skills.`,
    published_date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
    instructor: `Instructor ${i + 1}`, // One sample instructors per course
  }));

  await Course.deleteMany({});
  await Course.insertMany(sampleCourses);

  console.log("10 sample records inserted into the Course collection");
// Clear existing data and insert new articles
  // await Article.deleteMany({});
  // await Article.insertMany(sampleArticles);

  // console.log("15 sample records inserted into the Article collection");

  // Clear existing data and insert new programs
  // await Program.deleteMany({});
  // await Program.insertMany(samplePrograms);

  // await Feedback.deleteMany({});

  // console.log("50 sample records inserted into the Program collection");
  mongoose.connection.close();

});

// If there's an error during connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
