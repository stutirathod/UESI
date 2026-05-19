require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const User = require("./models/user");
const ejsmate = require("ejs-mate");
const cors = require("cors");
const bodyParser = require('body-parser');

// Routes
const programRoute = require("./routes/programs");
const articleRoute = require("./routes/articles");
const coursesRoute = require("./routes/courses");
const feedbackRoute = require("./routes/feedbacks");
const videoRoute = require("./routes/videos");
const userRoute = require("./routes/users");
const charityRoute = require("./routes/charity");

async function main() {
  await mongoose.connect("mongodb://localhost:27017/UESI");
}

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "200mb" }));  // Increase JSON payload limit
app.use(express.urlencoded({ extended: true, limit: "200mb" })); // For parsing application/json
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.engine("ejs", ejsmate);

const sessionOption = {
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : true,
  cookie : {
      exprires : Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 Days 
      maxAge : 7 * 24 * 60 * 60 * 1000,
      httpOnly : true
  }
};

app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/programs", programRoute);
app.use("/articles", articleRoute);
app.use("/courses", coursesRoute);
app.use("/", feedbackRoute);
app.use("/courses/:id", videoRoute);
app.use("/", userRoute);
app.use("/", charityRoute);

app.get("/", (req, res) => {
  res.send("I'm Root ");
});

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "An error Occur" } = err;
  res.status(status);

  if (message === "Page Not Found!") {
    res.send("Page Not Found!");
  } else {
    console.log(`Error [app.js:94] ==>  ${message}`);
  }
});

const server = app.listen(8080, () => {
  console.log("Server running on port 8080");
});

// Increase server timeout
server.timeout = 300000; // 5 minutes