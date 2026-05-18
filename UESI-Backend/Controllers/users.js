const { isAdmin } = require("../middleware");
const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

module.exports.signUpPage = (req, res) => {
  // res.render("users/signup.ejs");
  res.send("Render a SignUp form here...");
};

module.exports.signUp_save = async (req, res, next) => {
  try {
    const {
      email,
      username,
      password,
      first_name,
      last_name,
      phone_number,
      address,
      gender,
      pincode,
      newAdmin,
    } = req.body;
    let isAdmin = false;
    console.log(req.body);
    if (newAdmin === "true") {
      isAdmin = true;
    }
    const newUser = new User({
      email,
      username,
      first_name,
      last_name,
      phone_number,
      address,
      gender,
      pincode,
      isAdmin,
    });
    console.log(newUser);
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to UESI!");
      res.redirect("/programs");
    });
  } catch (err) {
    console.log(err);
    res.json({error: err.errmsg});
  }
};

module.exports.loginPage = (req, res) => {
  // res.render("users/login.ejs");
  console.log("Login Page");
  res.send("Render a Login Page form here...");
};

module.exports.login_save = async (req, res) => {
  // console.log("User logged in successfully:", req.user); // req.user should not be undefined
  if (!req.user) {
    return res.status(401).json({ error: "Authentication failed" });
  }
  res.status(200).json({ message: "Login successful!", user: req.user });
};

module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are Logged out now!");
    res.redirect("/programs");
  });
};

module.exports.status = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ loggedIn: true, user: req.user });
  }
  else{
    return res.json({ loggedIn: false });
  }
};

module.exports.adminOnly = (req, res) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    console.log(req.user);
    console.log("admin only");
    return res.json({ isAdmin: true });
  } else {
    return res.json({ isAdmin: false });
  }
};

module.exports.forgetPassword = async (req, res) => {
// POST: User requests a password reset
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "No account found with that email." });
  }

  // Generate a random token
  const token = crypto.randomBytes(20).toString("hex");
  console.log(token);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  console.log(user);

  // Save the token and expiration time (1 hour)
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  console.log(user);
  await user.save();

  // Set up email transport (using Gmail example)
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: "Reset Your Password",
    text: `Hello,
  
  We received a request to reset your password. Click the link below to set a new password:
  
  Reset Password: http://localhost:5173/reset/${token}
  
  This link will expire in 1 hour. If you didn't request this change, you can safely ignore this email.
  
  For your security, do not share this link with anyone.
  
  Best,  
  Union of Evangelical Students of India`,
  };
  

  // Send email
  await transporter.sendMail(mailOptions);
  res.json({ message: `An email has been sent to ${user.email} with instructions.` });
}

module.exports.resetTokenGet = async (req, res) => {

  const checkTokenInDatabase = async (token) => {
    try {
      const user = await User.findOne({ resetPasswordToken: token }); // Adjust according to your schema
      return !!user; // Returns true if token exists, false otherwise
    } catch (error) {
      console.error("Error checking token:", error);
      return false;
    }
  };

  
  const { token } = req.params;
  console.log("Token:", token);
  const isValid = await checkTokenInDatabase(token); // Your logic to check token
  if (isValid) {
    res.json({ valid: true });
  } else {
    res.status(400).json({ valid: false, error: "Invalid or expired token." });
  }
}

module.exports.resetTokenPost = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;

  console.log(req.body);
  console.log(confirmPassword, newPassword);

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match." });
  }

  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ error: "Token is invalid or expired." });
  }

  // Set new password
  user.setPassword(newPassword, async (err) => {
    if (err) throw err;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    console.log(user);
    await user.save();
    res.json({ message: "Password has been updated successfully." });
  });
}