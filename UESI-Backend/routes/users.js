const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../Controllers/users");


router.route("/signup")
    .get(userController.signUpPage)
    .post(wrapAsync(userController.signUp_save));

router.route("/login")
.post(
    passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), 
    wrapAsync(userController.login_save))
    
    .get(userController.loginPage);

router.get("/logout", userController.logout);

router.get('/status', userController.status);
router.get('/adminonly', userController.adminOnly);
router.post('/forget-password', userController.forgetPassword);
router.post('/reset/:token', userController.resetTokenPost);
router.get('/reset/:token', userController.resetTokenGet);

module.exports = router;