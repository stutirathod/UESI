const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const feedbackSchema = new Schema({
    content: String,
    rating:{
        type: Number,
        min: 1,
        max: 5
    },
    feedback_date: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Feedback = mongoose.model('Feedback',feedbackSchema);

module.exports = Feedback;