const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const charitySchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sessionId: { type: String, required: true },
  paymentIntentId: { type: String }, // Store Stripe Payment ID
  amount: { type: Number, required: true },
  charity_date: { type: Date, default: Date.now },
});

const CharitySchema = mongoose.model("Charity", charitySchema);

module.exports = CharitySchema;
