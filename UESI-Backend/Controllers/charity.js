const ExpressError = require("../utils/ExpressError");
const Charity = require("../models/charity");
const Stripe = require("stripe");
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envFilePath = path.join(__dirname, '../.env');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports.charity = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const userId = req.user._id; // Assuming authentication middleware

    if (!amount || amount < 1) {
      return res.status(400).json({ message: "Invalid amount. Must be at least ₹1." });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `http://localhost:5173/donation-success/{CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:5173/give",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Charity Donation",
              images: ["https://i.pinimg.com/736x/0d/6d/31/0d6d3176c986c0e103803509bf2a2354.jpg"],
            },
            unit_amount: amount, // Convert to paise
          },
          quantity: 1,
        },
      ],
    });

    // Store session ID in the database
    const newCharity = new Charity({
      user: userId,
      sessionId: session.id,
      amount: amount / 100, // Convert to paise
    });

    await newCharity.save();

    res.status(200).json({
      success: true,
      sessionId: session.id,
      message: "Session created successfully",
    });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.pollSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;


    if (!id) {
      console.log("Session ID is required.");
      return res.status(400).json({ message: "Session ID is required." });
    }

    // Retrieve session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(id);

    if (session.payment_status === "paid") {
      const paymentIntentId = session.payment_intent; // Retrieve Payment Intent ID

      // Update the charity record with paymentIntentId
      const updatedCharity = await Charity.findOneAndUpdate(
        { sessionId: id },
        { paymentIntentId, charity_date: new Date() },
        { new: true }
      ).populate("user");

      console.log(updatedCharity)

      return res.status(200).json({
        success: true,
        message: "Payment verified and charity saved.",
        charity: updatedCharity,
      });
    } else if (session.payment_status === "unpaid") {
      return res.status(202).json({
        success: false,
        message: "Payment is still pending.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment failed or session is incomplete.",
      });
    }
  } catch (error) {
    console.error("Error retrieving session status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.charityData = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      console.log("Session ID is required.");
      return res.status(400).json({ message: "Session ID is required." });
    }

    const charity = await Charity.findOne({ sessionId: id }).populate();

    if (!charity) {
      return res.status(404).json({ message: "Charity not found." });
    }
    res.status(200).json({ success: true, charity });
  } catch (err) {
  };
};


module.exports.required_amount_save = async (req, res) => {
  const { requireAmount } = req.body;
  console.log(requireAmount);

  try {
    let data = await fs.promises.readFile(envFilePath, 'utf8');
    let lines = data.split('\n');
    let found = false;

    // Update existing AMOUNT variable
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('AMOUNT=')) {
        lines[i] = `AMOUNT=${requireAmount}`;
        found = true;
        break;
      }
    }

    // If AMOUNT not found, add it
    if (!found) {
      lines.push(`AMOUNT=${requireAmount}`);
    }

    await fs.promises.writeFile(envFilePath, lines.join('\n'));
    console.log('✅ .env file updated successfully');

    res.status(200).json({ message: 'Amount updated successfully', requireAmount });
  } catch (error) {
    console.error('❌ Error updating .env file:', error);
    res.status(500).json({ message: 'Error updating .env file', error });
  }
};

module.exports.show_charity_detail = async (req, res) => {

  try {
    const totalAmount = await Charity.aggregate([
      {
        $group: {
          _id: null, // No grouping criteria, sum for all
          total: { $sum: "$amount" },
        },
      },
    ]);

    const amountReceived = totalAmount.length > 0 ? totalAmount[0].total : 0;
    res.status(200).json({totalAmount: amountReceived, required_amount: process.env.AMOUNT });
  } catch (error) {
    console.error("❌ Error fetching charity amount:", error);
    res.status(500).json({ message: "Error retrieving charity amount", error });
  }
}