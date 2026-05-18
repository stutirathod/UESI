const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const charityController = require("../Controllers/charity");
const { isLoggedin, isAdmin } = require("../middleware");

router.route("/give").post(isLoggedin, wrapAsync(charityController.charity)); // Endpoint to create a charity session

router
  .route("/donation-success/:id")
  .get(isLoggedin, wrapAsync(charityController.pollSessionStatus)); // Endpoint to check the session payment status

router
  .route("/charitydata/:id")
  .get(isLoggedin, wrapAsync(charityController.charityData)); // Endpoint to get charity data

router
  .route("/require-amount")
  .get(wrapAsync(charityController.show_charity_detail))
  .post(isLoggedin, isAdmin, wrapAsync(charityController.required_amount_save)); // Endpoint to check if the user has donated
  
module.exports = router;
